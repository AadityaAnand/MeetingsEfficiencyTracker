import { useEffect, useState } from "react";
import { Stats } from "../types/meetings";
import LoadingSpinner from "./LoadingSpinner";

const Dashboard = () => {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(()=>{
        const fetchStats = async () =>{
            try {
                const response = await fetch('/api/stats');
                const data  = await response.json();
                setStats(data)
            } catch (error){
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    if (!stats) return <LoadingSpinner/>;

    return(
        <div className="stats-container">
            <div className="stat-card">
                <h3>Total Meetings</h3>
                <p>{stats.totalMeetings}</p>
            </div>
            <div className="stat-card">
                <h3>Average Duration</h3>
                <p>{stats.averageDuration}m</p>
            </div>
            <div className="stat-card">
                <h3>Average Efficiency</h3>
                <p>{stats.averageEfficiency}%</p>
            </div>
        </div>   
    );
};

export default Dashboard;