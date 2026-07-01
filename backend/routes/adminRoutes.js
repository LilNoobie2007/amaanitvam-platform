import express from 'express';
import { verifyFirebaseToken, requireAdmin } from '../middleware/verifyFirebaseToken.js';
import { requireAllowedIP } from '../middleware/ipRestriction.js';
import User from '../models/user.js';
import { getCampaigns, createCampaign, updateCampaign, deleteCampaign } from "../controllers/campaignController.js";
import {
    getMe,
    updateMe,
    getDashboardStats,
    getCandidates,
    updateCandidateStatus,
    getMembers,
    addMember,
    updateMember,
    updateMemberRole,
    deactivateMember,
    uploadCertificateFile,
    deleteMember,
    getDonations,
    getCertificates,
    generateCertificate,
    revokeCertificate,
    downloadCertificate,
    getReports,
    getSettings,
    updateSettings,
    getAuditLogs
} from '../controllers/adminController.js';

const router = express.Router();

// Unprotected route so you can seed the DB from your browser!
router.get('/seed', async (req, res) => {
    try {
        const ADMIN_EMAIL = "tech.amaanitvam@gmail.com";
        const existing = await User.findOne({ email: ADMIN_EMAIL });
        if (existing) {
            existing.role = 'admin';
            existing.status = 'active';
            await existing.save();
            return res.json({ success: true, message: "User already existed and was updated to admin" });
        }
        const adminUser = new User({
            name: "Amaanitvam Admin",
            email: ADMIN_EMAIL,
            role: "admin",
            status: "active",
            department: "Technology"
        });
        await adminUser.save();
        res.json({ success: true, message: "Super admin created successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.use(verifyFirebaseToken);

router.get('/me', getMe);
router.put('/me', updateMe);

// Backward-compatible aliases for older admin portal builds.
// The previous frontend called /api/admin/update-profile, which caused 404.
router.post('/update-profile', updateMe);
router.put('/update-profile', updateMe);
router.get('/stats', requireAdmin, requireAllowedIP, getDashboardStats);
router.get(
  "/reports",
  requireAdmin,
  requireAllowedIP,
  getReports
);
router.get('/candidates', requireAdmin, requireAllowedIP, getCandidates);
router.put('/candidates/:id/status', requireAdmin, requireAllowedIP, updateCandidateStatus);
router.get('/members', requireAdmin, requireAllowedIP, getMembers);
router.post('/members', requireAdmin, requireAllowedIP, addMember);
router.put('/members/:id', requireAdmin, requireAllowedIP, updateMember);
router.put('/members/:id/role', requireAdmin, requireAllowedIP, updateMemberRole);
router.put('/members/:id/deactivate', requireAdmin, requireAllowedIP, deactivateMember);
router.delete('/members/:id', requireAdmin, requireAllowedIP, deleteMember);

router.get('/donations', requireAdmin, requireAllowedIP, getDonations);
router.get(
    "/campaigns",
    requireAdmin,
    requireAllowedIP,
    getCampaigns
);

router.post(
    "/campaigns",
    requireAdmin,
    requireAllowedIP,
    createCampaign
); router.put( "/campaigns/:id", requireAdmin, requireAllowedIP, updateCampaign ); router.delete( "/campaigns/:id", requireAdmin, requireAllowedIP, deleteCampaign );

router.get('/certificates', requireAdmin, requireAllowedIP, getCertificates);

router.put('/certificates/:id/revoke', requireAdmin, requireAllowedIP, revokeCertificate);
router.get(
  "/certificates/:id/download",
  requireAdmin,
  requireAllowedIP,
  downloadCertificate
);
router.get('/settings', requireAdmin, requireAllowedIP, getSettings);
router.put('/settings', requireAdmin, requireAllowedIP, updateSettings);

router.get('/audit-logs', requireAdmin, requireAllowedIP, getAuditLogs);

import multer from 'multer';
import mongoose from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import Gallery from '../models/gallery.js';

const BUCKET_NAME = 'galleryMedia';
const MAX_GALLERY_MEDIA_SIZE = 100 * 1024 * 1024; // 100MB per file
const MAX_GALLERY_MEDIA_FILES = 100;

const getBucket = () => new GridFSBucket(mongoose.connection.db, { bucketName: BUCKET_NAME });
const getGalleryMediaUrl = (id) => `/api/gallery/media/${id}`;
const getMediaType = (mimetype = '') => (mimetype.startsWith('video/') ? 'video' : 'image');

const serializeGalleryItem = (item) => {
  const doc = item.toObject ? item.toObject() : item;
  delete doc.imageBuffer;
  return {
    ...doc,
    imageUrl: getGalleryMediaUrl(doc._id),
  };
};

const uploadBufferToGridFS = (file) => new Promise((resolve, reject) => {
  const bucket = getBucket();
  const uploadStream = bucket.openUploadStream(file.originalname || `gallery-${Date.now()}`, {
    contentType: file.mimetype,
    metadata: {
      originalName: file.originalname,
      size: file.size,
      mediaType: getMediaType(file.mimetype),
    },
  });

  uploadStream.once('error', reject);
  uploadStream.once('finish', () => resolve(uploadStream.id));
  uploadStream.end(file.buffer);
});

const deleteGridFSFile = async (fileId) => {
  if (!fileId) return;

  try {
    const objectId = fileId instanceof ObjectId ? fileId : new ObjectId(fileId);
    await getBucket().delete(objectId);
  } catch (error) {
    // Ignore missing GridFS chunks/files during delete/update cleanup.
    if (error?.code !== 'ENOENT') {
      console.warn('GridFS cleanup warning:', error.message);
    }
  }
};

const galleryUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_GALLERY_MEDIA_SIZE,
    files: MAX_GALLERY_MEDIA_FILES,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype?.startsWith('image/') || file.mimetype?.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed.'));
    }
  },
});

const galleryMediaUpload = galleryUpload.fields([
  { name: 'media', maxCount: MAX_GALLERY_MEDIA_FILES },
  { name: 'images', maxCount: MAX_GALLERY_MEDIA_FILES }, // Backward compatible with old frontend field name.
  { name: 'image', maxCount: 1 },
]);

const getUploadedMediaFiles = (req) => [
  ...(req.files?.media || []),
  ...(req.files?.images || []),
  ...(req.files?.image || []),
];

const createGalleryMedia = async ({ file, title }) => {
  const fileId = await uploadBufferToGridFS(file);
  const image = await Gallery.create({
    title,
    imageUrl: '/api/gallery/media/pending',
    fileId,
    contentType: file.mimetype,
    mediaType: getMediaType(file.mimetype),
    originalName: file.originalname || '',
    size: file.size || 0,
  });

  image.imageUrl = getGalleryMediaUrl(image._id);
  await image.save();
  return image;
};

const certificateUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF certificate files are allowed.'));
    }
  },
});

router.post('/certificates', requireAdmin, requireAllowedIP, certificateUpload.single('certificate'), generateCertificate);

router.put(
  '/certificates/:id/file',
  requireAdmin,
  requireAllowedIP,
  certificateUpload.single('certificate'),
  uploadCertificateFile
);

router.post('/gallery', requireAdmin, requireAllowedIP, galleryMediaUpload, async (req, res) => {
  try {
    const [file] = getUploadedMediaFiles(req);

    if (!file) {
      return res.status(400).json({ success: false, message: 'No photo or video uploaded' });
    }

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const image = await createGalleryMedia({ file, title });
    res.status(201).json({ success: true, image: serializeGalleryItem(image) });
  } catch (error) {
    console.error('Gallery upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post(
  '/gallery/bulk',
  requireAdmin,
  requireAllowedIP,
  galleryMediaUpload,
  async (req, res) => {
    try {
      const files = getUploadedMediaFiles(req);

      if (!files.length) {
        return res.status(400).json({ success: false, message: 'No photos or videos uploaded' });
      }

      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
      }

      const createdImages = [];

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const itemTitle = files.length === 1 ? title : `${title} ${i + 1}`;
        const image = await createGalleryMedia({ file, title: itemTitle });
        createdImages.push(serializeGalleryItem(image));
      }

      res.status(201).json({
        success: true,
        message: `${createdImages.length} gallery media item(s) uploaded successfully`,
        images: createdImages,
      });
    } catch (error) {
      console.error('Gallery bulk upload error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.delete('/gallery/:id', requireAdmin, requireAllowedIP, async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Gallery media not found' });
    }

    await deleteGridFSFile(image.fileId);
    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Gallery media deleted successfully' });
  } catch (error) {
    console.error('Gallery delete error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/gallery/:id', requireAdmin, requireAllowedIP, galleryMediaUpload, async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Gallery media not found' });
    }

    if (req.body.title) {
      image.title = req.body.title;
    }

    const [file] = getUploadedMediaFiles(req);

    if (file) {
      await deleteGridFSFile(image.fileId);
      image.fileId = await uploadBufferToGridFS(file);
      image.imageUrl = getGalleryMediaUrl(image._id);
      image.contentType = file.mimetype;
      image.mediaType = getMediaType(file.mimetype);
      image.originalName = file.originalname || '';
      image.size = file.size || 0;
      image.imageBuffer = undefined;
    }

    await image.save();
    res.status(200).json({ success: true, image: serializeGalleryItem(image) });
  } catch (error) {
    console.error('Gallery update error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
