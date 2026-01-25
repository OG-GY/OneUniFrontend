import { LucideIcon, BookOpen, Clock, Calendar, Star, Users, Briefcase, GraduationCap } from 'lucide-react';

// Types based on SQL schema
export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type SessionStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';
export type SessionType = 'free' | 'paid';

export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  profilePictureUrl?: string;
}

export interface Mentor {
  mentorId: string;
  userId: string;
  user: User;
  designation: string;
  currentInstitution: string;
  graduationYear: number;
  fieldOfStudy: string;
  experienceYears: number;
  bio: string;
  specializations: string[];
  hourlyRate: number;
  totalSessions: number;
  averageRating: number;
  verificationStatus: VerificationStatus;
  availabilityHours?: any; // Simplified for UI
  linkedinUrl?: string;
}

export interface MentorshipSession {
  sessionId: string;
  mentorId: string;
  studentId: string;
  mentor?: Mentor;
  student?: User;
  sessionType: SessionType;
  scheduledAt: string; // ISO date string
  durationMinutes: number;
  status: SessionStatus;
  topic: string;
  feeAmount: number;
  meetingLink?: string;
}

// Mock Data

export const MOCK_USERS: User[] = [
  {
    userId: 'u1',
    fullName: 'Sarah Ahmed',
    email: 'sarah@example.com',
    role: 'mentor',
    profilePictureUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    userId: 'u2',
    fullName: 'Ali Khan',
    email: 'ali@example.com',
    role: 'mentor',
    profilePictureUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    userId: 'u3',
    fullName: 'Fatima Noor',
    email: 'fatima@example.com',
    role: 'student',
    profilePictureUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    userId: 'u4',
    fullName: 'Zain Malik',
    email: 'zain@example.com',
    role: 'mentor',
    profilePictureUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    userId: 'u5',
    fullName: 'Dr. Ayesha Siddiqui',
    email: 'ayesha@example.com',
    role: 'mentor',
    profilePictureUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
];

export const MOCK_MENTORS: Mentor[] = [
  {
    mentorId: 'm1',
    userId: 'u1',
    user: MOCK_USERS[0],
    designation: 'Senior Software Engineer',
    currentInstitution: 'TechCorp Pakistan',
    graduationYear: 2018,
    fieldOfStudy: 'Computer Science',
    experienceYears: 5,
    bio: 'Passionate about helping students navigate the tech industry. I specialize in career guidance, resume reviews, and mock interviews for software engineering roles.',
    specializations: ['Career Guidance', 'Software Engineering', 'Resume Review', 'Study Abroad'],
    hourlyRate: 2500,
    totalSessions: 45,
    averageRating: 4.8,
    verificationStatus: 'verified',
    linkedinUrl: 'https://linkedin.com',
  },
  {
    mentorId: 'm2',
    userId: 'u2',
    user: MOCK_USERS[1],
    designation: 'Medical Resident',
    currentInstitution: 'Aga Khan University Hospital',
    graduationYear: 2020,
    fieldOfStudy: 'Medicine (MBBS)',
    experienceYears: 3,
    bio: 'Helping aspiring doctors clear the MDCAT and navigate medical school applications. I can share my journey from FSc to AKU.',
    specializations: ['MDCAT Prep', 'Medical Narratives', 'Biology'],
    hourlyRate: 1500,
    totalSessions: 120,
    averageRating: 4.9,
    verificationStatus: 'verified',
  },
  {
    mentorId: 'm3',
    userId: 'u4',
    user: MOCK_USERS[3],
    designation: 'Business Analyst',
    currentInstitution: 'McKinsey & Company',
    graduationYear: 2019,
    fieldOfStudy: 'Economics (LUMS)',
    experienceYears: 4,
    bio: 'LUMS Gold Medalist available to guide you on LCAT preparation and business school applications.',
    specializations: ['LUMS Admissions', 'Business Strategy', 'Personal Statement'],
    hourlyRate: 3000,
    totalSessions: 30,
    averageRating: 5.0,
    verificationStatus: 'verified',
  },
  {
    mentorId: 'm4',
    userId: 'u5',
    user: MOCK_USERS[4],
    designation: 'Associate Professor',
    currentInstitution: 'NUST',
    graduationYear: 2010,
    fieldOfStudy: 'Electrical Engineering',
    experienceYears: 12,
    bio: 'Expert in NUST NET preparation and engineering queries. I help students choose the right engineering discipline.',
    specializations: ['NUST NET', 'Engineering', 'Academic Counseling'],
    hourlyRate: 2000,
    totalSessions: 200,
    averageRating: 4.7,
    verificationStatus: 'verified',
  },
];

const TOMORROW = new Date();
TOMORROW.setDate(TOMORROW.getDate() + 1);
TOMORROW.setHours(14, 0, 0, 0);

const NEXT_WEEK = new Date();
NEXT_WEEK.setDate(NEXT_WEEK.getDate() + 7);
NEXT_WEEK.setHours(10, 0, 0, 0);

export const MOCK_SESSIONS: MentorshipSession[] = [
  {
    sessionId: 's1',
    mentorId: 'm1',
    studentId: 'u3',
    mentor: MOCK_MENTORS[0],
    student: MOCK_USERS[2],
    sessionType: 'paid',
    scheduledAt: TOMORROW.toISOString(),
    durationMinutes: 60,
    status: 'scheduled',
    topic: 'Career Roadmap & Resume Review',
    feeAmount: 2500,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
  },
  {
    sessionId: 's2',
    mentorId: 'm2',
    studentId: 'u3',
    mentor: MOCK_MENTORS[1],
    student: MOCK_USERS[2],
    sessionType: 'free',
    scheduledAt: NEXT_WEEK.toISOString(),
    durationMinutes: 30,
    status: 'scheduled',
    topic: 'Introductory Call - Medical School',
    feeAmount: 0,
    meetingLink: 'https://meet.google.com/xyz-uvw-rst',
  },
  {
    sessionId: 's3',
    mentorId: 'm1',
    studentId: 'u3',
    mentor: MOCK_MENTORS[0],
    student: MOCK_USERS[2],
    sessionType: 'paid',
    scheduledAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    durationMinutes: 60,
    status: 'completed',
    topic: 'Mock Interview',
    feeAmount: 2500,
  },
];

export const MENTOR_STATS = {
  totalSessions: 45,
  profileViews: 1250,
  averageRating: 4.8,
  pendingRequests: 3,
  earningsThisMonth: 12500,
};

export const MENTEE_STATS = {
  completedSessions: 5,
  upcomingSessions: 2,
  credits: 500,
};
