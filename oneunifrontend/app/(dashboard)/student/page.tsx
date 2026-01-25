"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getMe, type User } from "@/lib/api/auth";
import { FileText, Calendar, Clock, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function StudentOverviewPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch((err) => console.error("Failed to load user", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
     return <div className="h-[50vh] flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold text-text-main">
          Welcome back, {user?.name?.split(' ')[0] || user?.email.split('@')[0] || 'Student'}! 👋
        </h1>
        <p className="text-text-muted">
          Here's what's happening with your applications today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
           label="Total Applications" 
           value="0" 
           icon={FileText} 
           color="bg-blue-500" 
        />
        <StatsCard 
           label="Pending Actions" 
           value="0" 
           icon={Clock} 
           color="bg-orange-500" 
        />
        <StatsCard 
           label="Scheduled Sessions" 
           value="0" 
           icon={Calendar} 
           color="bg-purple-500" 
        />
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
               <button className="text-sm text-primary font-medium hover:underline">View All</button>
            </div>
            
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-100 rounded-lg bg-slate-50/50">
               <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <Clock className="text-slate-400" size={20} />
               </div>
               <p className="text-text-body font-medium">No recent activity</p>
               <p className="text-sm text-text-muted mt-1">Your recent actions will appear here</p>
            </div>
         </motion.div>

         {/* Explore Card */}
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
                  Discover top-ranked universities and find the perfect program for your future career.
               </p>
            </div>
            <Link 
               href="/student/explore" 
               className="flex items-center justify-center gap-2 w-full py-3 bg-white text-primary rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
               Start Exploring
               <ArrowRight size={18} />
            </Link>
         </motion.div>
      </div>
    </div>
  );
}

function StatsCard({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-all"
    >
       <div className={`p-4 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`${color.replace('bg-', 'text-')}`} size={24} />
       </div>
       <div>
          <p className="text-sm text-text-muted font-medium">{label}</p>
          <p className="text-2xl font-bold text-text-main mt-0.5">{value}</p>
       </div>
    </motion.div>
  );
}
