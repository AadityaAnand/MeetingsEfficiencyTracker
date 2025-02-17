import { useState, useEffect } from 'react';
import { fetchStats, Stats } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard">
      <div className="stat-card">
        <h3>Total Meetings</h3>
        <p>{stats?.totalMeetings}</p>
      </div>
      <div className="stat-card">
        <h3>Average Duration</h3>
        <p>{stats?.averageDuration} mins</p>
      </div>
      <div className="stat-card">
        <h3>Average Efficiency</h3>
        <p>{stats?.averageEfficiency}%</p>
      </div>
    </div>
  );
};

export default Dashboard;