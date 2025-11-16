export type AssessmentType = 'mcq' | 'text' | 'video';
export type ProficiencyLevel = 'expert' | 'intermediate' | 'novice';

export interface Assessment {
  id: string;
  moduleId: string;
  title: string;
  type: AssessmentType;
  duration?: number; // in minutes
  totalQuestions?: number;
  passingScore?: number;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
}

export interface MCQAssessment extends Assessment {
  type: 'mcq';
  questions: MCQQuestion[];
}

export interface TextAssessment extends Assessment {
  type: 'text';
  prompt: string;
  maxCharacters?: number;
}

export interface VideoAssessment extends Assessment {
  type: 'video';
  prompt: string;
  maxDuration?: number; // in seconds
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  studentId: string;
  score: number; // percentage
  proficiencyLevel: ProficiencyLevel;
  rank?: number;
  totalParticipants?: number;
  completedAt: string;
  answers?: AssessmentAnswer[];
  feedback?: string;
}

export interface AssessmentAnswer {
  questionId: string;
  selectedAnswer: number | string;
  isCorrect?: boolean;
  correctAnswer?: number | string;
}
