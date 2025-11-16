export type LeaderboardFilter = 'overall' | 'weekly' | 'monthly';

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  profilePicture?: string;
  points: number;
  proficiency: {
    expert: number;
    intermediate: number;
    novice: number;
  };
  college?: string;
}

export interface Leaderboard {
  filter: LeaderboardFilter;
  entries: LeaderboardEntry[];
  currentUserRank?: number;
}
