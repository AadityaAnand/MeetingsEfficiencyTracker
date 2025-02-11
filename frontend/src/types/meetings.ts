export interface Meeting{
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