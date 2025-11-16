export interface Course {
  id: string;
  name: string;
  description: string;
  modules: Module[];
  duration: string;
  thumbnail?: string;
}

export interface Module {
  id: string;
  courseId: string;
  name: string;
  description: string;
  duration: string;
  progress: number; // 0-100
  isLocked: boolean;
  chapters: Chapter[];
  assessments: string[]; // Assessment IDs
  thumbnail?: string;
}

export interface Chapter {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  thumbnail?: string;
  videoUrl?: string;
  notesUrl?: string;
  order: number;
}
