import { Request, Response } from "express";
import Meeting from '../models/Meeting';

export const createmeeting = async(req: Request, res: Response) =>{
    try{
        const meeting = new Meeting({
            ...req.body,
            organizer: req.user!.userId
        });
        await meeting.save();
        res.status(201).json(meeting);
    }catch(error){
        res.status(400).json({error: 'Invalid meeting data'});   
    }
};

export const getmeetings = async(req: Request, res:Response)=>{
    try{
        const meetings = await Meeting.find({organizer: req.user!.userId});
        res.json(meetings);
    }catch(error){
        res.status(500).json({error: 'Server error'});
    }
};