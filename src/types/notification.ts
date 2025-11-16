export type NotificationType = 'assessment' | 'announcement' | 'mentorship' | 'task';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string; // ISO date string
  isRead: boolean;
  actionUrl?: string;
}
