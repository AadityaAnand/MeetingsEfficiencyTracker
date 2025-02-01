import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import nodemailer from 'nodemailer'; 
import { error } from 'console';

const generateVerificationCode = ()=> crypto.randomBytes(20).toString('hex');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
});

export const register = async(req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email ||!password){
            return res.status(400).json({error: 'All fields are required'});
        }
        const existingUser = await User.findOne({$or: [{username}, {email}]});
        if (existingUser){
            const conflictField = existingUser.username===username ? 'username':'email';
            return res.status(409).json({error: '${conflictField} already exists'});
        }
        const verificationCode = generateVerificationCode();
        const user = new User({username, email, password, verificationCode});
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify Your Email',
            html: 'Your verification code: <strong>${verificationCode}</strong>'
        });

        res.status(201).json({message: 'Verfocation Email Sent'});
    }
    catch(error){
        res.status(500).json({error: 'Registration failed'});
    }
};


