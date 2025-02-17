const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';

export interface Meeting {
  _id: string;
  title: string;
  participants: string[];
  duration: number;
  efficiencyScore: number;
  startTime: string;
  outcomes: string;
}

export interface Stats {
  totalMeetings: number;
  averageDuration: number;
  averageEfficiency: number;
}

export const fetchMeetings = async () => {
  const response = await fetch(`${API_BASE_URL}/api/meetings`);
  return response.json();
};

export const createMeeting = async (meeting: Omit<Meeting, '_id' | 'efficiencyScore'>) => {
  const response = await fetch(`${API_BASE_URL}/api/meetings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(meeting)
  });
  return response.json();
};

// Analytics API
export const fetchStats = async () => {
  const response = await fetch(`${API_BASE_URL}/api/analytics`);
  return response.json();
};

// Auth API
export const login = async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};