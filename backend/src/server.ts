import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { requireAuth } from './middleware/auth';
import { log } from 'console';
import meetingRoutes from './routes/meetings';
import analyticsRoutes from './routes/analytics';
import calendarRoutes from './routes/calendar';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Socket } from 'dgram';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:300',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) =>{
  console.log('A user connected:', socket.id);

  socket.on('join-meeting', (meetingId)=>{
    socket.join(meetingId);
    console.log(`User ${socket.id} joined meeting ${meetingId}`);
});

  socket.on('update-agenda', (meetingId, agenda)=>{
    io.to(meetingId).emit('agenda-updated', agenda);
    console.log(`Agenda updated for meeting ${meetingId}`);
  });
  socket.on('disconnect', ()=>{
    console.log('A user disconnected:', socket.id);
  })
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/calendar', calendarRoutes);
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