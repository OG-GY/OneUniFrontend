"use client";

import React from 'react';
import { StatsCard } from '@/components/cards/stats-card';
import { SessionCard } from '@/components/cards/session-card';
import { MOCK_SESSIONS, MENTOR_STATS, MOCK_USERS } from '@/lib/dummy-data';
import { Users, Clock, DollarSign, ClipboardCheck, GraduationCap, ChevronRight, MessageSquare, ListTodo } from 'lucide-react';
import Button from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function MentorDashboard() {
  const upcomingSessions = MOCK_SESSIONS.filter(s => s.status === 'scheduled');
  
  // Local mocks for operational overview
  const activeStudents = MOCK_USERS.slice(2, 5); // 3 students for demo
  const pendingReviews = [
    { id: 'rev1', student: 'Fatima Noor', type: 'Resume Review', deadline: 'Today' },
    { id: 'rev2', student: 'Zain Malik', type: 'Personal Statement', deadline: 'Tomorrow' },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome & Dashboard Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Operational Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Welcome back, Mentor! Here is what requires your attention today.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-200 text-slate-600 bg-white">
                View Schedule
            </Button>
            <Button className="bg-[#2a2f91] text-white hover:bg-[#202470] shadow-md">
                Set Availability
            </Button>
        </div>
      </div>

      {/* 1. Earnings Snapshot & Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Today's Earnings" 
          value={`Rs. 4,500`} 
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
         <StatsCard 
          label="Active Students" 
          value={activeStudents.length} 
          icon={Users} 
        />
         <StatsCard 
          label="Upcoming Sessions" 
          value={upcomingSessions.length} 
          icon={Clock} 
        />
         <StatsCard 
          label="Pending Reviews" 
          value={pendingReviews.length} 
          icon={ClipboardCheck}
          className="ring-2 ring-yellow-400/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* 2. Upcoming Sessions */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Clock size={18} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Upcoming Sessions</h2>
              </div>
              <Link href="/dashboard/mentor/sessions" className="text-[13px] font-bold text-[#2a2f91] hover:underline flex items-center gap-1">
                SEE FULL CALENDAR <ChevronRight size={14} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingSessions.map(session => (
                  <SessionCard key={session.sessionId} session={session} role="mentor" />
              ))}
            </div>
          </section>

          {/* 3. Pending Reviews - Direct Action Items */}
          <section>
             <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                  <ListTodo size={18} strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Pending Reviews</h2>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-100">
                    {pendingReviews.map((rev) => (
                        <div key={rev.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                                    {rev.student.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-slate-900 leading-none mb-1">{rev.type}</p>
                                    <p className="text-xs text-slate-500 font-medium italic">For {rev.student}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={cn(
                                    "text-[10px] font-bold px-2 py-1 rounded-full",
                                    rev.deadline === 'Today' ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600"
                                )}>
                                    DUE {rev.deadline.toUpperCase()}
                                </span>
                                <Button size="sm" className="bg-[#2a2f91] text-white text-[12px] px-4">Review</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
           
           {/* 4. Active Students List */}
           <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Active Students</h3>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">{activeStudents.length} TOTAL</span>
              </div>
              <div className="space-y-4">
                {activeStudents.map((student) => (
                  <div key={student.userId} className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative">
                        <img 
                          src={student.profilePictureUrl} 
                          alt={student.fullName} 
                          className="h-10 w-10 rounded-xl object-cover border border-slate-100 ring-2 ring-transparent group-hover:ring-blue-100 transition-all"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate leading-none mb-1">{student.fullName}</p>
                      <p className="text-[11px] text-slate-500 font-medium">3 Upcoming Sessions</p>
                    </div>
                    <button className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#2a2f91] hover:bg-blue-50 transition-colors">
                        <MessageSquare size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-xs font-bold text-slate-500 hover:text-slate-900 p-0">
                  VIEW ALL STUDENTS
              </Button>
           </div>

           {/* Quick Actions (Simplified) */}
           <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200/50">
              <h3 className="font-bold mb-4 text-slate-400 text-xs uppercase tracking-widest">Earnings Insight</h3>
              <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold">Rs. 12,500</p>
                    <p className="text-[11px] text-slate-400 font-medium">Available for withdrawal</p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-sm font-bold">Pending</span>
                        <span className="text-[11px] text-slate-400">Rs. 4,200</span>
                     </div>
                     <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100 text-[12px] h-8 px-4">Withdraw</Button>
                  </div>
              </div>
           </div>

           {/* Need Help? */}
           <div className="bg-gradient-to-br from-[#2a2f91] to-[#1a1d5a] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="font-bold mb-1">Facing Issues?</p>
                <p className="text-[12px] text-blue-200 mb-4 opacity-80">Our mentor success team is here to help you 24/7.</p>
                <Button size="sm" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white w-full text-[12px]">Contact Support</Button>
              </div>
              <div className="absolute -right-6 -bottom-6 text-white/5 transform rotate-12">
                <GraduationCap size={120} />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
