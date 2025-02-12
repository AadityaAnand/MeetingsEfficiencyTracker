import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Meeting } from "../types/meetings";

const MeetingForm = () =>{
    const [formData, setFormData] = useState<Omit<Meeting, '_id' | 'efficiencyScore'>>({
        title:'',
        participants: [],
        duration: 0,
        startTime: new Date().toISOString(),
        outcomes: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch('/api/meetings', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            if (response.ok) navigate('/meetings');
        } catch (error){
            console.error('Error creating meeting:', error);
        }
    };

    return(
        <form className="meeting-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Meeting Title</label>
                <input 
                className="form-input"
                type="text"
                required
                value={formData.title}
                onChange={e=>setFormData({...formData, title: e.target.value})}
                />
            </div>
            <div className="form-group">
                <label> Participants (comma separated)</label>
                <input 
                className="form-input"
                type="text"
                required
                value={formData.participants.join(', ')}
                onChange={e => setFormData({
                    ...formData, participants: e.target.value.split(',').map(p=>p.trim())
                })}
                />
            </div>
            <div className="form-group">
                <label>Duration (minutes)</label>
                <input 
                className="form-input"
                type="number"
                required
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: Number(e.target.value)})}
                />
            </div>
            <button type ="submit" className="submit-button">
                Create Meeting
            </button>

        </form>
    );

};

export default MeetingForm;