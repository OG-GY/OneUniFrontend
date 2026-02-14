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
  CreditCard,
  School,
  Briefcase,
  GraduationCap,
  Bell
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
}

export const navConfig: Record<string, NavItem[]> = {
  student: [
    { title: "Dashboard", href: "/student", icon: LayoutDashboard },
    { title: "Explore", href: "/student/explore", icon: School },
    { title: "Applications", href: "/student/applications", icon: FileText },
    { title: "Eligibility", href: "/student/eligibility", icon: ClipboardCheck },
    { title: "My Sessions", href: "/student/mentors", icon: Users },
    // { title: "Documents", href: "/student/documents", icon: FolderOpen },
    // { title: "Schedule", href: "/student/calendar", icon: Calendar },
    // { title: "Messages", href: "/student/messages", icon: MessageSquare },
    // { title: "Financials", href: "/student/payments", icon: CreditCard },
  ],
  mentor: [
    { title: "Dashboard", href: "/mentor", icon: LayoutDashboard },
    { title: "My Students", href: "/mentor/students", icon: Users },
    { title: "Sessions", href: "/mentor/sessions", icon: Calendar },
    { title: "Reviews", href: "/mentor/reviews", icon: Star },
    { title: "Messages", href: "/mentor/messages", icon: MessageSquare },
    { title: "Earnings", href: "/mentor/earnings", icon: DollarSign },
  ],
  admin: [
    { title: "Overview", href: "/admin", icon: LayoutDashboard },
    { title: "Students", href: "/admin/students", icon: Users },
    { title: "Mentors", href: "/admin/mentors", icon: Briefcase },
    { title: "Institutions", href: "/admin/institutions", icon: School },
    { title: "Admissions", href: "/admin/admissions", icon: GraduationCap },
    { title: "Notifications", href: "/admin/notifications", icon: Bell },
    { title: "Settings", href: "/admin/settings", icon: Settings },
  ]
};
