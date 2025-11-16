import React, { createContext, useContext, ReactNode } from 'react';
import { mockDataService } from '../services/mockDataService';
import type {
  Student,
  Course,
  Module,
  Chapter,
  Assessment,
  Task,
  MentorshipSession,
  Mentor,
  LeaderboardEntry,
  Resume,
  AssessmentResult,
  Notification,
} from '../types';

interface DataContextType {
  // Students
  getCurrentStudent: () => Student;
  getStudentById: (id: string) => Student | undefined;

  // Courses
  getAllCourses: () => Course[];
  getCourseById: (id: string) => Course | undefined;

  // Modules
  getModuleById: (id: string) => Module | undefined;
  getModulesByCourseId: (courseId: string) => Module[];

  // Chapters
  getChapterById: (id: string) => Chapter | undefined;
  getChaptersByModuleId: (moduleId: string) => Chapter[];

  // Assessments
  getAllAssessments: () => Assessment[];
  getAssessmentById: (id: string) => Assessment | undefined;
  getAssessmentsByModuleId: (moduleId: string) => Assessment[];

  // Tasks
  getAllTasks: () => Task[];
  getTaskById: (id: string) => Task | undefined;
  getPendingTasks: (limit?: number) => Task[];
  getTasksByStatus: (status: string) => Task[];

  // Mentorships
  getAllMentorshipSessions: () => MentorshipSession[];
  getMentorshipSessionById: (id: string) => MentorshipSession | undefined;
  getUpcomingMentorshipSessions: () => MentorshipSession[];
  getPastMentorshipSessions: () => MentorshipSession[];

  // Mentors
  getAllMentors: () => Mentor[];
  getMentorById: (id: string) => Mentor | undefined;

  // Leaderboard
  getLeaderboard: () => LeaderboardEntry[];
  getTopLeaderboard: (limit?: number) => LeaderboardEntry[];
  getCurrentUserRank: () => number;

  // Resumes
  getAllResumes: () => Resume[];
  getResumeById: (id: string) => Resume | undefined;

  // Assessment Results
  getAllAssessmentResults: () => AssessmentResult[];
  getAssessmentResultById: (id: string) => AssessmentResult | undefined;
  getAssessmentResultsByStudentId: (studentId: string) => AssessmentResult[];

  // Notifications
  getAllNotifications: () => Notification[];
  getUnreadNotifications: () => Notification[];
  getNotificationById: (id: string) => Notification | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const value: DataContextType = {
    // Students
    getCurrentStudent: () => mockDataService.getCurrentStudent(),
    getStudentById: (id: string) => mockDataService.getStudentById(id),

    // Courses
    getAllCourses: () => mockDataService.getAllCourses(),
    getCourseById: (id: string) => mockDataService.getCourseById(id),

    // Modules
    getModuleById: (id: string) => mockDataService.getModuleById(id),
    getModulesByCourseId: (courseId: string) => mockDataService.getModulesByCourseId(courseId),

    // Chapters
    getChapterById: (id: string) => mockDataService.getChapterById(id),
    getChaptersByModuleId: (moduleId: string) => mockDataService.getChaptersByModuleId(moduleId),

    // Assessments
    getAllAssessments: () => mockDataService.getAllAssessments(),
    getAssessmentById: (id: string) => mockDataService.getAssessmentById(id),
    getAssessmentsByModuleId: (moduleId: string) => mockDataService.getAssessmentsByModuleId(moduleId),

    // Tasks
    getAllTasks: () => mockDataService.getAllTasks(),
    getTaskById: (id: string) => mockDataService.getTaskById(id),
    getPendingTasks: (limit?: number) => mockDataService.getPendingTasks(limit),
    getTasksByStatus: (status: string) => mockDataService.getTasksByStatus(status),

    // Mentorships
    getAllMentorshipSessions: () => mockDataService.getAllMentorshipSessions(),
    getMentorshipSessionById: (id: string) => mockDataService.getMentorshipSessionById(id),
    getUpcomingMentorshipSessions: () => mockDataService.getUpcomingMentorshipSessions(),
    getPastMentorshipSessions: () => mockDataService.getPastMentorshipSessions(),

    // Mentors
    getAllMentors: () => mockDataService.getAllMentors(),
    getMentorById: (id: string) => mockDataService.getMentorById(id),

    // Leaderboard
    getLeaderboard: () => mockDataService.getLeaderboard(),
    getTopLeaderboard: (limit?: number) => mockDataService.getTopLeaderboard(limit),
    getCurrentUserRank: () => mockDataService.getCurrentUserRank(),

    // Resumes
    getAllResumes: () => mockDataService.getAllResumes(),
    getResumeById: (id: string) => mockDataService.getResumeById(id),

    // Assessment Results
    getAllAssessmentResults: () => mockDataService.getAllAssessmentResults(),
    getAssessmentResultById: (id: string) => mockDataService.getAssessmentResultById(id),
    getAssessmentResultsByStudentId: (studentId: string) =>
      mockDataService.getAssessmentResultsByStudentId(studentId),

    // Notifications
    getAllNotifications: () => mockDataService.getAllNotifications(),
    getUnreadNotifications: () => mockDataService.getUnreadNotifications(),
    getNotificationById: (id: string) => mockDataService.getNotificationById(id),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
