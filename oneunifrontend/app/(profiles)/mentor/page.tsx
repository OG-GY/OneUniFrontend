"use client";

import React from 'react';
import { StatsCard } from '@/components/cards/stats-card';
import { SessionCard } from '@/components/cards/session-card';
import { MOCK_SESSIONS, MOCK_USERS } from '@/lib/dummy-data';
import { 
  Users, 
  Clock, 
  DollarSign, 
  ListTodo, 
  GraduationCap, 
  ChevronRight, 
  MessageSquare, 
  ArrowRight,
  ClipboardCheck
} from 'lucide-react';
import Button from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function MentorDashboard() {
  const upcomingSessions = MOCK_SESSIONS.filter(s => s.status === 'scheduled').slice(0, 3);
  const activeStudents = MOCK_USERS.slice(2, 5);
  const pendingReviews = [
    { id: 'rev1', student: 'Fatima Noor', type: 'Resume Review', deadline: 'Today' },
    { id: 'rev2', student: 'Zain Malik', type: 'Personal Statement', deadline: 'Tomorrow' },
  ];

  return (
    <div className="flex flex-col gap-8 px-6 lg:px-10 py-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, Mentor! 👋
        </h1>
        <p className="text-slate-500">
          Here is an overview of your mentorship activities and what requires attention.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Today's Earnings" 
          value="Rs. 4,500" 
          icon={DollarSign}
          color="bg-emerald-500"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          label="Active Students" 
          value={activeStudents.length} 
          icon={Users} 
          color="bg-blue-500"
        />
        <StatsCard 
          label="Pending Reviews" 
          value={pendingReviews.length} 
          icon={ListTodo} 
          color="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column: Sessions & Reviews */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Upcoming Sessions */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Clock className="text-primary" size={20} />
                Upcoming Sessions
              </h2>
              <Link href="/dashboard/mentor/sessions" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                View Schedule <ChevronRight size={14} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map(session => (
                    <SessionCard key={session.sessionId} session={session} role="mentor" />
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-lg bg-slate-50/50">
                  <p className="text-slate-500 text-sm">No scheduled sessions</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Pending Reviews */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <ClipboardCheck className="text-primary" size={20} />
                Action Required
              </h2>
            </div>
            
            <div className="divide-y divide-slate-100">
              {pendingReviews.map((rev) => (
                <div key={rev.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 font-bold border border-slate-100">
                      {rev.student.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{rev.type}</p>
                      <p className="text-xs text-slate-500">For {rev.student} • Due {rev.deadline}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar Column: Quick Stats & Mentees */}
        <div className="flex flex-col gap-8">
          {/* Active Mentees Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6">Active Mentees</h3>
            <div className="space-y-4">
              {activeStudents.map((student) => (
                <div key={student.userId} className="flex items-center gap-3">
                  <img 
                    src={student.profilePictureUrl} 
                    alt={student.fullName} 
                    className="h-10 w-10 rounded-lg object-cover border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{student.fullName}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-medium">Mentee</p>
                  </div>
                  <button className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors">
                    <MessageSquare size={16} />
                  </button>
                </div>
              ))}
            </div>
            <Link href="/dashboard/mentor/students" className="block w-full mt-6">
              <Button variant="ghost" className="w-full text-xs font-bold text-slate-500 hover:text-primary">
                VIEW ALL STUDENTS
              </Button>
            </Link>
          </motion.div>

          {/* Branded Action Card (Matching Student Dashboard Style) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white flex flex-col gap-6"
          >
            <div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 text-white">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Grow Your Impact</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Update your profile and availability to reach more students seeking your expertise.
              </p>
            </div>
            <Button 
               className="bg-white text-primary hover:bg-slate-50 border-none w-full font-bold"
               size="md"
               iconRight={<ArrowRight size={18} />}
            >
              Update Availability
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
