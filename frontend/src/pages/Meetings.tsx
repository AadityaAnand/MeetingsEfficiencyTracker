import { useEffect, useState } from "react";
import { Meeting } from "../types/meetings";
import LoadingSpinner from "../components/LoadingSpinner";
import MeetingList from "../components/MeetingList";

const Meetings = () => {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchMeetings = async () =>{
            try{
                const response = await fetch('/api/meetings');
                const data = await response.json();
                setMeetings(data);
            } catch (error){
                console.error('Error fetching meetings:', error);
            } finally{
                setLoading(false);
            }
        };
        fetchMeetings();
    }, []);
    if (loading) return <LoadingSpinner />

    return(
        <div className="conatiner">
            <h1> All Meetings</h1>
            <MeetingList meetings={meetings}/>
        </div>
    );
};

export default Meetings;
