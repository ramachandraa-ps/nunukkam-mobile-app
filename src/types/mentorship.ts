export type SessionStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Mentor {
  id: string;
  name: string;
  title: string;
  profilePicture?: string;
  expertise: string[];
  availableSlots?: TimeSlot[];
}

export interface TimeSlot {
  date: string; // ISO date string
  time: string; // e.g., "10:00 AM"
  isAvailable: boolean;
}

export interface MentorshipSession {
  id: string;
  mentorId: string;
  mentor: Mentor;
  studentId: string;
  date: string; // ISO date string
  time: string;
  duration: number; // in minutes
  status: SessionStatus;
  meetingLink?: string;
  notes?: SessionNotes;
  cancellationReason?: string;
}

export interface SessionNotes {
  discussionPoints: string[];
  actionItems: ActionItem[];
  attachments?: Attachment[];
}

export interface ActionItem {
  id: string;
  description: string;
  isCompleted: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
}
