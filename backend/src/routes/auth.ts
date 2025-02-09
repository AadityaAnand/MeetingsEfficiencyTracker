import express from 'express';
import { register, login, verifyEmail } from '../controllers/auth';

const router = express.Router();

router.post('/register', register); 
router.post('/verify-email', verifyEmail);
router.post('/login', login); 

export default router;
