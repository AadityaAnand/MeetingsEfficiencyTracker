import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/User';


const generateVerificationCode = () => crypto.randomBytes(20).toString('hex');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
export const register: RequestHandler = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }
  
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        const conflictField = existingUser.username === username ? 'username' : 'email';
        res.status(409).json({ error: `${conflictField} already exists` });
        return;
      }
  
      const verificationCode = generateVerificationCode();
      const user = new User({ username, email, password, verificationCode });
      await user.save();
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email',
        html: `<p>Your verification code: <strong>${verificationCode}</strong></p>`
      });
  
      res.status(201).json({ message: 'Verification email sent' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  };
  
  export const verifyEmail: RequestHandler = async (req, res, next) => {
    try {
      const { email, code } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      if (user.verificationCode !== code || user.verificationCode === '') {
        res.status(400).json({ error: 'Invalid verification code' });
        return;
      }
      user.isVerified = true;
      user.verificationCode = '';
      await user.save();
      res.json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({ error: 'Verification failed' });
    }
  };
  
  export const login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;  
    }
      if (!user.isVerified) {
        res.status(403).json({ error: 'Email not verified' });
        return;
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );
      res.json({ token, username: user.username });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  };
