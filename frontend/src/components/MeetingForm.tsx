import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMeeting, Meeting } from '../services/api';

const MeetingForm = () => {
  const [formData, setFormData] = useState<Omit<Meeting, '_id' | 'efficiencyScore'>>({
    title: '',
    participants: [],
    duration: 0,
    startTime: new Date().toISOString(),
    outcomes: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMeeting(formData);
      navigate('/meetings');
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('Failed to create meeting');
    }
  };

  return (
    <form className="meeting-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          required
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Participants</label>
        <input
          required
          value={formData.participants.join(', ')}
          onChange={e => setFormData({
            ...formData,
            participants: e.target.value.split(',').map(p => p.trim())
          })}
        />
      </div>
      <button type="submit">Create Meeting</button>
    </form>
  );
};

export default MeetingForm;