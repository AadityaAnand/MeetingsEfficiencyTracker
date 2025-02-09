import { Request, Response } from "express";
import { google } from "googleapis";
import Meeting from "../models/Meeting";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export const syncWithGoogleCaledar = async (req: Request, res: Response)=>{
    try{
        const {code} = req.body;
        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        const calendar = google.calendar({version: 'v3', auth: oauth2Client});
        const meetings = await Meeting.find({ organizer: req.user!.userId});

        for (const meeting of meetings){
            await calendar.events.insert({
                calendarId: 'primary',
                requestBody: {
                    summary: meeting.title,
                    start: { dateTime: meeting.startTime.toISOString()},
                    end: {dateTime: new Date(meeting.startTime.getTime()+ meeting.duration*60000).toISOString()}
                }
            });
        }
        res.json({message: 'Meetings synced with Google Calendar'});
    } catch(error){
        res.status(500).json({error: 'Failed to sunc with Google Calendar'});
    }
};