import studentsData from '../data/students.json';
import coursesData from '../data/courses.json';
import assessmentsData from '../data/assessments.json';
import tasksData from '../data/tasks.json';
import mentorshipsData from '../data/mentorships.json';
import mentorsData from '../data/mentors.json';
import leaderboardData from '../data/leaderboard.json';
import resumesData from '../data/resumes.json';
import assessmentResultsData from '../data/assessmentResults.json';
import notificationsData from '../data/notifications.json';

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

class MockDataService {
  // Students
  getStudentById(id: string): Student | undefined {
    return studentsData.find((student) => student.id === id) as Student | undefined;
  }

  getCurrentStudent(): Student {
    // For demo purposes, return the first student
    return studentsData[0] as Student;
  }

  // Courses
  getAllCourses(): Course[] {
    return coursesData as Course[];
  }

  getCourseById(id: string): Course | undefined {
    return coursesData.find((course) => course.id === id) as Course | undefined;
  }

  // Modules
  getModuleById(id: string): Module | undefined {
    for (const course of coursesData) {
      const module = course.modules.find((m) => m.id === id);
      if (module) return module as Module;
    }
    return undefined;
  }

  getModulesByCourseId(courseId: string): Module[] {
    const course = this.getCourseById(courseId);
    return course?.modules as Module[] || [];
  }

  // Chapters
  getChapterById(id: string): Chapter | undefined {
    for (const course of coursesData) {
      for (const module of course.modules) {
        const chapter = module.chapters.find((c) => c.id === id);
        if (chapter) return chapter as Chapter;
      }
    }
    return undefined;
  }

  getChaptersByModuleId(moduleId: string): Chapter[] {
    const module = this.getModuleById(moduleId);
    return module?.chapters as Chapter[] || [];
  }

  // Assessments
  getAllAssessments(): Assessment[] {
    return assessmentsData as Assessment[];
  }

  getAssessmentById(id: string): Assessment | undefined {
    return assessmentsData.find((assessment) => assessment.id === id) as Assessment | undefined;
  }

  getAssessmentsByModuleId(moduleId: string): Assessment[] {
    return assessmentsData.filter((assessment) => assessment.moduleId === moduleId) as Assessment[];
  }

  // Tasks
  getAllTasks(): Task[] {
    return tasksData as Task[];
  }

  getTaskById(id: string): Task | undefined {
    return tasksData.find((task) => task.id === id) as Task | undefined;
  }

  getPendingTasks(limit?: number): Task[] {
    const pending = tasksData.filter((task) => task.status === 'pending' || task.status === 'in-progress') as Task[];
    return limit ? pending.slice(0, limit) : pending;
  }

  getTasksByStatus(status: string): Task[] {
    if (status === 'all') return tasksData as Task[];
    return tasksData.filter((task) => task.status === status) as Task[];
  }

  // Mentorships
  getAllMentorshipSessions(): MentorshipSession[] {
    return mentorshipsData as MentorshipSession[];
  }

  getMentorshipSessionById(id: string): MentorshipSession | undefined {
    return mentorshipsData.find((session) => session.id === id) as MentorshipSession | undefined;
  }

  getUpcomingMentorshipSessions(): MentorshipSession[] {
    return mentorshipsData.filter((session) => session.status === 'upcoming') as MentorshipSession[];
  }

  getPastMentorshipSessions(): MentorshipSession[] {
    return mentorshipsData.filter((session) => session.status === 'completed') as MentorshipSession[];
  }

  // Mentors
  getAllMentors(): Mentor[] {
    return mentorsData as Mentor[];
  }

  getMentorById(id: string): Mentor | undefined {
    return mentorsData.find((mentor) => mentor.id === id) as Mentor | undefined;
  }

  // Leaderboard
  getLeaderboard(): LeaderboardEntry[] {
    return leaderboardData as LeaderboardEntry[];
  }

  getTopLeaderboard(limit: number = 3): LeaderboardEntry[] {
    return leaderboardData.slice(0, limit) as LeaderboardEntry[];
  }

  getCurrentUserRank(): number {
    const currentStudent = this.getCurrentStudent();
    const entry = leaderboardData.find((e) => e.studentId === currentStudent.id);
    return entry?.rank || 0;
  }

  // Resumes
  getAllResumes(): Resume[] {
    return resumesData as Resume[];
  }

  getResumeById(id: string): Resume | undefined {
    return resumesData.find((resume) => resume.id === id) as Resume | undefined;
  }

  // Assessment Results
  getAllAssessmentResults(): AssessmentResult[] {
    return assessmentResultsData as AssessmentResult[];
  }

  getAssessmentResultById(id: string): AssessmentResult | undefined {
    return assessmentResultsData.find((result) => result.id === id) as AssessmentResult | undefined;
  }

  getAssessmentResultsByStudentId(studentId: string): AssessmentResult[] {
    return assessmentResultsData.filter((result) => result.studentId === studentId) as AssessmentResult[];
  }

  // Notifications
  getAllNotifications(): Notification[] {
    return notificationsData as Notification[];
  }

  getUnreadNotifications(): Notification[] {
    return notificationsData.filter((notif) => !notif.isRead) as Notification[];
  }

  getNotificationById(id: string): Notification | undefined {
    return notificationsData.find((notif) => notif.id === id) as Notification | undefined;
  }
}

export const mockDataService = new MockDataService();
