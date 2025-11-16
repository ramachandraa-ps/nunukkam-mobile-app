export interface Resume {
  id: string;
  studentId: string;
  title: string;
  lastEdited: string; // ISO date string
  thumbnail?: string;
  sections: ResumeSection[];
}

export interface ResumeSection {
  type: ResumeSectionType;
  data: any;
}

export type ResumeSectionType = 
  | 'summary'
  | 'qualifications'
  | 'internships'
  | 'workExperience'
  | 'projects'
  | 'certifications'
  | 'skills';

export interface ResumeSummary {
  text: string;
}

export interface Qualification {
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  isCurrentRole?: boolean;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}
