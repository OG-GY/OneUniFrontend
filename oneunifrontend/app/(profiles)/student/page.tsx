"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { getCurrentUser, getUserProfile } from "@/lib/auth";
import { applications, sessions, studentStats } from "@/lib/mockData";
import { FileText, Calendar, Clock, ArrowRight, GraduationCap, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/cards/stats-card";

export default function StudentOverviewPage() {
  const currentUser = getCurrentUser();
  const studentProfile = getUserProfile();
  const mySessions = useMemo(() => {
    if (!studentProfile?.id) return [];
    return sessions.filter((session) => session.student?.id === studentProfile.id);
  }, [studentProfile]);
  const recentApplications = applications.slice(0, 3);
  const applicationsInProcess = applications.filter(
    (application) => application.status === "In Process"
  ).length;

  const iconMap = {
    file: FileText,
    calendar: Calendar,
    bookmark: GraduationCap,
    user: Clock,
  } as const;

  return (
    <div className="flex flex-col gap-8 pb-20 px-6 lg:px-10 py-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold text-text-main">
          Welcome back, {studentProfile?.fullName?.split(" ")[0] || currentUser?.email?.split("@")[0] || "Student"}! 👋
        </h1>
        <p className="text-text-muted">
          Here's what's happening with your applications today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {studentStats.slice(0, 3).map((stat) => {
          const Icon = iconMap[stat.icon as keyof typeof iconMap] || FileText;
          return (
            <StatsCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={Icon}
              color="bg-blue-500"
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Recent Activity */}
         <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-6"
         >
            <div className="flex items-center justify-between">
               <h2 className="text-lg font-semibold text-text-main">Recent Activity</h2>
               <Link href="/student/applications" className="text-sm text-primary font-medium hover:underline">View All</Link>
            </div>
            <div className="flex flex-col gap-3">
              {recentApplications.map((application) => (
                <div key={application.id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
                  <p className="text-sm font-semibold text-text-main">{application.university}</p>
                  <p className="text-xs text-text-muted">{application.program}</p>
                  <p className="mt-1 text-xs text-text-muted">Status: {application.status}</p>
                </div>
              ))}
            </div>
         </motion.div>

         {/* Explore Card */}
         <div className="flex flex-col gap-6">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white flex flex-col justify-between gap-6"
            >
               <div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                     <GraduationCap className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Explore Universities</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                     Discover top-ranked universities and find the perfect program.
                  </p>
               </div>
               <Link 
                  href="/student/university" 
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-primary rounded-lg font-semibold hover:bg-slate-50 transition-colors"
               >
                  Start Exploring
                  <ArrowRight size={18} />
               </Link>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3 }}
               className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between gap-6 shadow-sm"
            >
               <div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                     <ClipboardCheck className="text-secondary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-2">Eligibility Checker</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                     You have {applicationsInProcess} application(s) currently in process and {mySessions.length} mentorship session(s).
                  </p>
               </div>
               <Link 
                  href="/student/eligibility" 
                  className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-text-main border border-slate-200 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
               >
                  Check Eligibility
                  <ArrowRight size={18} />
               </Link>
            </motion.div>
         </div>
      </div>
    </div>
  );
}

