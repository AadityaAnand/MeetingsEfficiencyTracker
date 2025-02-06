import {Request, Response} from 'express';
import Meeting from '../models/Meeting';

export const getMeetingStats = async(req: Request, res: Response)=>{
    try{
        const meetings = await Meeting.aggregate([
            { $match: {organizer: req.user!.userId}},
            {$group:{
                _id:{ $dateToString: { format:"%Y-%m-%d", date: "$startTime"}},
                totalMinutes: {$sum: "$duration"},
                meetingCount: {$sum: 1}
            }}
        ]);
        res.json(meetings);
    } catch(error){
        res.status(500).json({error: 'Failed to fetch analysis'});
    }  
};