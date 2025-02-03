import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { requireAuth } from './middleware/auth';
import { log } from 'console';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.get('/api/protected', requireAuth, (req, res)=>{
  res.json({message:`Hello User ${req.user!.userId}`});
});

mongoose.connect(process.env.MONGO_URI!)
  .then(()=> console.log('MongoDB Connected'))
  .catch(err=> console.error('Connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});