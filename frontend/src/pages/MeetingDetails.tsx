import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Meeting } from "../types/meetings";
import LoadingSpinner from "../components/LoadingSpinner";

const MeetingDetails =()=> {
    const{id} = useParams<{id:string}>();
    const [meeting, setMeeting] = useState<Meeting | null>(null);

    useEffect(()=>{
        const fetchMeeting = async()=>{
            try{
                const response = await fetch(`/api/meetings/${id}`);
                const data = await response.json();
                setMeeting(data);
            } catch(error){
                console.error('Error fetching meetings:', error);
            }
        };
        fetchMeeting();
    }, [id]);

    if (!meeting) return <LoadingSpinner />;

    return(
        <div className="container">
            <h1>{meeting.title}</h1>
            <div className="meeting-details">
                <p><strong>Duration:</strong>{meeting.duration}minutes</p>
                <p><strong>Efficiency Score:</strong>{meeting.efficiencyScore}%</p>
                <p><strong>Participants:</strong>{meeting.participants.join(', ')}</p>
                <p><strong>Outcomes:</strong>{meeting.outcomes}</p>
            </div>
        </div>
    );
};

export default MeetingDetails;
