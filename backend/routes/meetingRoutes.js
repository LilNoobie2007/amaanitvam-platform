import express from 'express';
import {
    createMeeting,
    getMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting
} from '../controllers/meetingController.js';
import { verifyFirebaseToken, requireAdmin } from '../middleware/verifyFirebaseToken.js';

const meetingRouter = express.Router();
meetingRouter.use(verifyFirebaseToken);

// Create Meeting
meetingRouter.post('/create', requireAdmin, createMeeting);

// Get All Meetings
meetingRouter.get('/', getMeetings);

// Get Single Meeting by ID
meetingRouter.get('/:id', getMeetingById);

// Update Meeting
meetingRouter.put('/:id', requireAdmin, updateMeeting);

// Delete Meeting
meetingRouter.delete('/:id', requireAdmin, deleteMeeting);

export default meetingRouter;

