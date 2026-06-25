import express from 'express';
import {
    createAnnouncement,
    getAnnouncements,
    getAnnouncementsByCategory,
    getAnnouncementsByPriority,
    getAnnouncementById,
    updateAnnouncement,
    deactivateAnnouncement,
    deleteAnnouncement
} from '../controllers/announcementController.js';
import { verifyFirebaseToken, requireAdmin } from '../middleware/verifyFirebaseToken.js';

const announcementRouter = express.Router();
announcementRouter.use(verifyFirebaseToken);

// Create Announcement
announcementRouter.post('/create', requireAdmin, createAnnouncement);

// Get All Announcements
announcementRouter.get('/', getAnnouncements);

// Get Announcements by Category
announcementRouter.get('/category/:category', getAnnouncementsByCategory);

// Get Announcements by Priority
announcementRouter.get('/priority/:priority', getAnnouncementsByPriority);

// Get Single Announcement by ID
announcementRouter.get('/:id', getAnnouncementById);

// Update Announcement
announcementRouter.put('/:id', requireAdmin, updateAnnouncement);

// Deactivate Announcement
announcementRouter.patch('/:id/deactivate', requireAdmin, deactivateAnnouncement);

// Delete Announcement
announcementRouter.delete('/:id', requireAdmin, deleteAnnouncement);

export default announcementRouter;
