import express from 'express';
import { createmeeting, getmeetings } from '../controllers/meetings';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.post('/', requireAuth, createmeeting);
router.get('/', requireAuth, getmeetings);

export default router;
