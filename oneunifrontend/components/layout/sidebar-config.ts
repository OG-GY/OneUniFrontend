import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText,
  Star,
  DollarSign,
  MessageSquare,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FolderOpen,
  CreditCard
} from "lucide-react";

export type Role = "student" | "mentor" | "university_representative" | "mentee";

export interface MenuItem {
  title: string;
  href: string;
  icon: any;
}

// Student's menu configuration
export const studentMenu: MenuItem[] = [
  { title: "Dashboard", href: "/dashboard/mentee", icon: LayoutDashboard },
  { title: "Applications", href: "/student/applications", icon: FileText },
  { title: "Eligibility Checker", href: "/student/eligibility", icon: ClipboardCheck },
  { title: "Mentors", href: "/student/mentors", icon: Users },
  { title: "Documents", href: "/student/documents", icon: FolderOpen },
  { title: "Calendar", href: "/student/calendar", icon: Calendar },
  { title: "Messages", href: "/student/messages", icon: MessageSquare },
  { title: "Payments", href: "/student/payments", icon: CreditCard },
];

// Mentor's menu configuration
export const mentorMenu: MenuItem[] = [
  { title: "Dashboard", href: "/dashboard/mentor", icon: LayoutDashboard },
  { title: "My Students", href: "/dashboard/mentor/students", icon: Users },
  { title: "Sessions", href: "/dashboard/mentor/sessions", icon: Calendar },
  { title: "Reviews & Guidance", href: "/dashboard/mentor/reviews", icon: Star },
  { title: "Messages", href: "/dashboard/mentor/messages", icon: MessageSquare },
  { title: "Earnings", href: "/dashboard/mentor/earnings", icon: DollarSign },
];

export const universityMenu: MenuItem[] = [
  { title: "Admin Portal", href: "/dashboard/admin", icon: LayoutDashboard },
  { title: "Manage Students", href: "/dashboard/admin/students", icon: Users },
  { title: "University Profile", href: "/dashboard/admin/profile", icon: FileText },
];

// Master configuration mapping
export const MENU_CONFIG: Record<string, MenuItem[]> = {
  student: studentMenu,
  mentee: studentMenu,
  mentor: mentorMenu,
  university_representative: universityMenu,
};
