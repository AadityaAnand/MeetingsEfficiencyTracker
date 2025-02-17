import { useState, useEffect } from 'react';
import { fetchMeetings, Meeting } from '../services/api';
import MeetingList from '../components/MeetingList';
import LoadingSpinner from '../components/LoadingSpinner';

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const data = await fetchMeetings();
        setMeetings(data);
      } catch (error) {
        console.error('Error loading meetings:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMeetings();
  }, []);

  return (
    <div className="meetings-page">
      <h1>All Meetings</h1>
      {loading ? <LoadingSpinner /> : <MeetingList meetings={meetings} />}
    </div>
  );
};

export default Meetings;