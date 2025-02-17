import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
import {requireAuth} from './middleware/auth';
import meetingRoutes from './routes/meetings';
import analyticsRoutes from './routes/analytics';
import calendarRoutes from './routes/calendar';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Socket } from 'dgram';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

const io  = new Server(httpServer, {
  cors: corsOptions
});

const connectDB = async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB Connected');
  } catch (err){
    console.error('MongoDB Connection Error:',err);
    process.exit(1);
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

io.on('connection', (socket)=>{
  console.log('A user connected:', socket.id);

  socket.on('join-meeting', (meetingId)=>{
    socket.join(meetingId);
    console.log(`User ${socket.id} joined meeting ${meetingId}`);
  });
  socket.on('update-agenda', (meetingId, agenda) => {
    io.to(meetingId).emit('agenda-updated', agenda);
    console.log(`Agenda updated for meeting ${meetingId}`);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/calendar', calendarRoutes);

app.get('/api/protected', requireAuth, (req, res) => {
  res.json({ message: `Hello User ${req.user!.userId}` });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const startServer = async () => {
  await connectDB();
  
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Socket.IO endpoint: http://localhost:${PORT}`);
  });
};

httpServer.on('error', (error) => {
  console.error('Server Error:', error);
});

startServer();