import express from 'express';
import { getMeetingStats } from '../controllers/analytics';
import { requireAuth } from '../middleware/auth';

const router = express.Router();
router.get('/stats', requireAuth, getMeetingStats);
export default router;

