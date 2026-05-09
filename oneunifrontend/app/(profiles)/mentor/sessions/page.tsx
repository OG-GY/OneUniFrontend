"use client";

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  History, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Video,
  AlertCircle,
  X,
  CheckCircle2
} from 'lucide-react';
import { mentors, sessions } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function MentorSessionsPage() {
  const currentUser = getCurrentUser();
  const [activeTab, setActiveTab] = useState<'calendar' | 'upcoming' | 'history'>('calendar');
  const currentMentor = mentors.find(
    (mentor) => mentor.email.toLowerCase() === (currentUser?.email || "").toLowerCase()
  ) || mentors[0];
  const mentorSessions = sessions.filter((session) => session.mentor.id === currentMentor.id);
  const upcomingSessions = mentorSessions.filter((session) => session.status === "scheduled");
  const pastSessions = mentorSessions.filter(
    (session) => session.status === "completed" || session.status === "cancelled"
  );
  const availability = currentMentor.availability;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-full px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sessions & Scheduling</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your time, availability, and mentorship meetings.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="bg-[#2a2f91] text-white hover:bg-[#202470] shadow-md gap-2 h-11 px-6 rounded-xl font-bold">
            <Plus size={18} />
            Block Time
          </Button>
        </div>
      </div>

      {/* Main Content: Flex Layout for better stability */}
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* Left: Main Control Area */}
        <div className="flex-1 min-w-0 w-full space-y-8">
          
          {/* View Toggles */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/50 rounded-2xl w-fit">
            {[
              { id: 'calendar', label: 'Calendar View', icon: CalendarIcon },
              { id: 'upcoming', label: 'Upcoming', icon: Clock },
              { id: 'history', label: 'History', icon: History },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap",
                  activeTab === tab.id 
                    ? "bg-white text-[#2a2f91] shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content Area */}
          <div className="w-full">
            {activeTab === 'calendar' && (
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden border-separate">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-slate-900">February 2026</h3>
                    <div className="flex items-center gap-1">
                      <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-500 transition-all border border-transparent hover:border-slate-100">
                        <ChevronLeft size={20} />
                      </button>
                      <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-500 transition-all border border-transparent hover:border-slate-100">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 text-blue-600">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" /> 
                      Session
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200" /> 
                      Blocked
                    </span>
                  </div>
                </div>
                
                {/* Calendar Grid - Fixed Width Table or Flex for better control */}
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[700px]">
                        <div className="grid grid-cols-7 bg-slate-50/50 border-b border-slate-100">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                                <div key={d} className="py-3 text-center text-[10px] font-black text-slate-400 tracking-widest">{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 border-b border-slate-100">
                            {Array.from({ length: 35 }).map((_, i) => {
                                const day = i - 2; 
                                const isCurrentMonth = day > 0 && day <= 28;
                                const hasEvent = day === 5 || day === 12;
                                
                                return (
                                    <div key={i} className={cn(
                                        "min-h-[120px] p-3 transition-colors group",
                                        isCurrentMonth ? "bg-white hover:bg-slate-50/30" : "bg-slate-50/80"
                                    )}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={cn(
                                                "text-sm font-bold",
                                                isCurrentMonth ? "text-slate-900" : "text-slate-300"
                                            )}>{isCurrentMonth ? day : ''}</span>
                                            {isCurrentMonth && (
                                                <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-blue-600 transition-all">
                                                    <Plus size={14} />
                                                </button>
                                            )}
                                        </div>
                                        
                                        {hasEvent && (
                                            <div className="space-y-1.5">
                                                <div className="p-2 bg-blue-50 border-l-[3px] border-blue-500 rounded-lg text-[10px] font-bold text-blue-700 shadow-sm leading-tight cursor-pointer hover:bg-blue-100 transition-colors">
                                                    02:00 PM • Fatima N.
                                                </div>
                                                {day === 12 && (
                                                    <div className="p-2 bg-purple-50 border-l-[3px] border-purple-500 rounded-lg text-[10px] font-bold text-purple-700 shadow-sm leading-tight cursor-pointer hover:bg-purple-100 transition-colors">
                                                        04:30 PM • Ahmed H.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'upcoming' && (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.sessionId} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 shrink-0 shadow-inner">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">FEB</span>
                        <span className="text-xl font-black text-slate-900 leading-none">05</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg mb-1">{session.topic}</h4>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                          <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
                            <Clock size={15} className="text-blue-500" /> 02:00 PM (60 min)
                          </span>
                          <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
                            <Video size={15} className="text-blue-500" /> Google Meet
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" className="border-slate-200 text-slate-600 h-10 px-5 rounded-xl font-bold">Reschedule</Button>
                      <Button className="bg-[#2a2f91] text-white hover:bg-[#202470] h-10 px-6 rounded-xl font-bold shadow-md">Join Session</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                                <th className="pl-8 pr-4 py-5">Topic & Student</th>
                                <th className="px-6 py-5">Date & Time</th>
                                <th className="px-6 py-5 text-center">Fee</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="pl-4 pr-8 py-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {pastSessions.map((session) => (
                                <tr key={session.sessionId} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="pl-8 pr-4 py-5">
                                        <p className="font-bold text-slate-900 truncate max-w-[200px]">{session.topic}</p>
                                        <p className="text-xs text-slate-500 font-medium italic">with {session.student?.fullName || 'Fatima Noor'}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-bold text-slate-700">Jan 28, 2026</p>
                                        <p className="text-[11px] text-slate-400 font-bold uppercase">60 Minutes</p>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-bold">Rs. {session.feeAmount}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                                            session.status === 'completed' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
                                        )}>
                                            {session.status === 'completed' ? <CheckCircle2 size={12} /> : <X size={12} />}
                                            {session.status}
                                        </div>
                                    </td>
                                    <td className="pl-4 pr-8 py-5">
                                        <button className="text-[#2a2f91] text-xs font-bold flex items-center gap-1.5 hover:underline whitespace-nowrap">
                                            <Video size={14} /> PLAY RECORDING
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Sidebar Management (Fixed Width) */}
        <div className="w-full xl:w-[400px] space-y-8 flex-shrink-0">
          
          {/* Availability Status Card */}
          <div className="bg-[#1a1c4b] rounded-[32px] p-8 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
                    <CalendarIcon size={24} className="text-blue-300" />
                  </div>
                  <div className="px-3.5 py-1 bg-emerald-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/50">
                    Live
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Weekly Availability</h3>
                <p className="text-slate-300 text-[13px] leading-relaxed mb-8 opacity-80">Students can see and book these slots in their portal. Syncs automatically with your calendar.</p>
                <Button className="w-full bg-white text-[#1a1c4b] hover:bg-blue-50 font-bold h-12 rounded-2xl shadow-lg transition-all active:scale-95">Edit All Slots</Button>
             </div>
             {/* Abstract background elements */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -ml-12 -mb-12" />
          </div>

          {/* Quick Slot Preview */}
          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 tracking-tight text-lg">Current Slots</h3>
              <button className="text-[11px] font-black text-[#2a2f91] hover:text-[#1a1c4b] transition-colors bg-blue-50 px-3 py-1.5 rounded-full tracking-widest uppercase">Sync</button>
            </div>
            <div className="space-y-6">
              {availability.map((item) => (
                <div key={item.day} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2a2f91]" />
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.day}</p>
                  </div>
                  <div className="space-y-2">
                    {item.slots.map((slot, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group group-hover:cursor-default">
                        <span className="text-[13px] font-bold text-slate-700 tracking-tight">{slot}</span>
                        <button className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 scale-90 hover:scale-110">
                            <X size={16} />
                        </button>
                        </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-8 text-xs font-black text-slate-400 hover:text-[#2a2f91] hover:bg-blue-50 p-4 rounded-2xl border-2 border-dashed border-slate-100 hover:border-blue-200 transition-all uppercase tracking-widest">
               + Add Availability Slot
            </Button>
          </div>

          {/* Actionable Alert */}
          <div className="p-6 bg-amber-50/50 border border-amber-100/60 rounded-[32px] overflow-hidden relative">
            <div className="flex gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <AlertCircle size={22} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-amber-900 leading-tight">Link missing!</p>
                <p className="text-sm text-amber-700/80 mt-1 font-medium leading-relaxed">2 sessions for tomorrow are missing meeting links. Add them to ensure a smooth experience.</p>
                <button className="text-sm font-black text-amber-900 mt-4 underline decoration-amber-300 underline-offset-4 hover:decoration-amber-500 transition-all uppercase tracking-tighter">Fix links now</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
