import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  // Kept only for old records that already stored binary data directly.
  imageBuffer: {
    type: Buffer,
  },
  contentType: {
    type: String,
    default: 'image/jpeg',
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    default: 'image',
  },
  originalName: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
