import express from 'express';
import { syncWithGoogleCaledar } from '../controllers/calendar';
import { requireAuth } from '../middleware/auth';

const router = express.Router();
router.post('/sync', requireAuth, syncWithGoogleCaledar);
export default router;

