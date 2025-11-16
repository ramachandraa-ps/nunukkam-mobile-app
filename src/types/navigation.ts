import type { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

// Home Stack
export type HomeStackParamList = {
  HomeDashboard: undefined;
};

// Journey Stack
export type JourneyStackParamList = {
  LearningJourney: undefined;
  CoreSkills: undefined;
  ModuleDetail: { moduleId: string };
  TaskDetail: { taskId?: string };
  ChapterView: { chapterId: string };
  AssessmentMCQ: { assessmentId: string };
  AssessmentText: { assessmentId: string };
  AssessmentVideo: { assessmentId: string };
  AssessmentResults: { resultId: string };
  YourPerformance: undefined;
};

// Resume Stack
export type ResumeStackParamList = {
  ResumeDashboard: undefined;
  ResumeBuilder: { resumeId?: string };
};

// Mentorship Stack
export type MentorshipStackParamList = {
  MentorshipDashboard: undefined;
  BookSession: undefined;
  SessionNotes: { sessionId: string };
  CancelSession: { sessionId: string };
};

// Leaderboard Stack
export type LeaderboardStackParamList = {
  LeaderboardMain: undefined;
  FullLeaderboard: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Journey: NavigatorScreenParams<JourneyStackParamList>;
  Resume: NavigatorScreenParams<ResumeStackParamList>;
  Mentors: NavigatorScreenParams<MentorshipStackParamList>;
  Ranks: NavigatorScreenParams<LeaderboardStackParamList>;
};

// Root Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  UserProfile: undefined;
};
