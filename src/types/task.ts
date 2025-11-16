export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskType = 'chapter' | 'assessment' | 'assignment';

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string; // ISO date string
  progress: number; // 0-100
  moduleId?: string;
  chapterId?: string;
  assessmentId?: string;
  actionLabel: string; // e.g., "Start", "Resume", "Retake"
}
