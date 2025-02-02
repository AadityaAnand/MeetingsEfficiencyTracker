import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { timeStamp } from "console";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength:[3, 'Username must be at least 3 characters.'],
        maxlength: [20, 'Username cannot exceed 20 characters.']
    },
    email: {
        type: String,
        required: [true, 'Email is requires'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email format"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    isVerified: {
        type: Boolean,
        default:false
    },
    verificationCode: {
        type: String,
        default: ''
    }
}); 

userSchema.pre('save', async function(next) {
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export default mongoose.model('User', userSchema);
