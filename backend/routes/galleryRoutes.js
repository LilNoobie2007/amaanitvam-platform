import express from 'express';
import mongoose from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import Gallery from '../models/gallery.js';

const router = express.Router();
const BUCKET_NAME = 'galleryMedia';

const getBucket = () => new GridFSBucket(mongoose.connection.db, { bucketName: BUCKET_NAME });
const getGalleryMediaUrl = (id) => `/api/gallery/media/${id}`;

const serializeGalleryItem = (item) => {
  const doc = item.toObject ? item.toObject() : item;
  delete doc.imageBuffer;
  return {
    ...doc,
    imageUrl: getGalleryMediaUrl(doc._id),
  };
};

router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, images: images.map(serializeGalleryItem) });
  } catch (error) {
    console.error('Gallery fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching gallery.' });
  }
});

const streamGalleryMedia = async (req, res) => {
  try {
    const media = await Gallery.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    res.set('Content-Type', media.contentType || 'application/octet-stream');
    res.set('Content-Disposition', `inline; filename="${encodeURIComponent(media.originalName || media.title || 'gallery-media')}"`);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.set('Accept-Ranges', 'bytes');

    if (media.fileId) {
      const fileObjectId = media.fileId instanceof ObjectId ? media.fileId : new ObjectId(media.fileId);
      const fileDoc = await mongoose.connection.db
        .collection(`${BUCKET_NAME}.files`)
        .findOne({ _id: fileObjectId });

      if (!fileDoc) {
        return res.status(404).json({ success: false, message: 'Media file not found in MongoDB' });
      }

      const totalSize = fileDoc.length;
      const range = req.headers.range;

      if (range) {
        const match = range.match(/bytes=(\d*)-(\d*)/);
        const start = match?.[1] ? Number.parseInt(match[1], 10) : 0;
        const end = match?.[2] ? Math.min(Number.parseInt(match[2], 10), totalSize - 1) : totalSize - 1;

        if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= totalSize) {
          res.set('Content-Range', `bytes */${totalSize}`);
          return res.status(416).end();
        }

        res.status(206);
        res.set('Content-Range', `bytes ${start}-${end}/${totalSize}`);
        res.set('Content-Length', String(end - start + 1));
        return getBucket().openDownloadStream(fileObjectId, { start, end: end + 1 }).pipe(res);
      }

      res.set('Content-Length', String(totalSize));
      return getBucket().openDownloadStream(fileObjectId).pipe(res);
    }

    // Legacy support for old DB records that stored small image buffers directly.
    if (media.imageBuffer) {
      res.set('Content-Length', String(media.imageBuffer.length));
      return res.send(media.imageBuffer);
    }

    return res.status(404).json({ success: false, message: 'Media binary not found in MongoDB' });
  } catch (error) {
    console.error('Gallery media stream error:', error);
    return res.status(500).json({ success: false, message: 'Server error streaming gallery media' });
  }
};

router.get('/media/:id', streamGalleryMedia);

// Backward-compatible URL shape, but no local filesystem fallback.
router.get('/images/:id', streamGalleryMedia);

router.get('/seed', async (req, res) => {
  res.status(410).json({
    success: false,
    message: 'Local filesystem gallery seeding is disabled. Upload gallery photos/videos from the admin portal so they are stored in MongoDB Atlas/GridFS.',
  });
});

export default router;
