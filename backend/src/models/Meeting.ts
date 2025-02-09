import mongoose from 'mongoose';
const meetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    startTime: {
        type: Date,
        required: [true, 'Start time is required']
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
        min: [15, 'Minimum meeting duration is 15 minutes']
    },
    participation: [{
        type: String,
        required: [true, 'Participant email is required']
    }],
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

export default mongoose.model('Meeting', meetingSchema)
