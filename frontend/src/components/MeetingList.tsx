import { Meeting } from "../types/meetings";
import { Link } from "react-router-dom";

interface MeetingListProps{
    meetings: Meeting[];
}

const MeetingList = ({meetings}: MeetingListProps)=>{
    return (
        <div className="meeting-list">
            {meetings.map((meeting)=>(
                <div key={meeting._id} className="meeting-card">
                    <h3>
                        <Link to={`/meetings/${meeting._id}`}>{meeting.title}</Link>
                    </h3>
                    <p><strong>Duration:</strong>{meeting.duration} minutes</p>
                    <p><strong>Efficiency Score</strong>{meeting.efficiencyScore}%</p>
                    <p><strong>Participants:</strong>{meeting.participants.join(',')}</p>
                  </div>  
            ))}
        </div>
    );
};

export default MeetingList;