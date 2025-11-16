export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  college: string;
  profilePicture?: string;
  bio?: string;
  progress: {
    modulesCompleted: number;
    totalModules: number;
    chaptersCompleted: number;
    totalChapters: number;
    assessmentsCompleted: number;
    totalAssessments: number;
  };
  attendance: AttendanceRecord[];
  badges: Badge[];
  rank?: number;
  points?: number;
  proficiency: {
    expert: number;
    intermediate: number;
    novice: number;
  };
}

export interface AttendanceRecord {
  date: string; // ISO date string
  status: 'present' | 'absent' | 'leave';
  sessionDetails?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  earnedDate: string;
  description?: string;
}
