"use client";

import React from 'react';
import { StatsCard } from '@/components/cards/stats-card';
import { SessionCard } from '@/components/cards/session-card';
import { MentorCard } from '@/components/cards/mentor-card';
import { MOCK_SESSIONS, MOCK_MENTORS, MENTEE_STATS } from '@/lib/dummy-data';
import { CheckCircle, Wallet, Calendar } from 'lucide-react';
import Button from '@/components/ui/button';
import Link from 'next/link';

export default function MenteeDashboard() {
  const upcomingSessions = MOCK_SESSIONS.filter(s => s.status === 'scheduled');
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
         <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah! 👋</h1>
         <p className="text-gray-500 mt-1">Here's what's happening with your applications today.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Completed Sessions" 
          value={MENTEE_STATS.completedSessions} 
          icon={CheckCircle}
        />
         <StatsCard 
          label="Upcoming Sessions" 
          value={MENTEE_STATS.upcomingSessions} 
          icon={Calendar} 
        />
         <StatsCard 
          label="Available Credits" 
          value={`Rs. ${MENTEE_STATS.credits}`} 
          icon={Wallet} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column: Schedule & Mentors */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Schedule */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Your Schedule</h2>
              <Button variant="link" className="text-primary p-0">View Calendar</Button>
            </div>
            
            <div className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map(session => (
                    <SessionCard key={session.sessionId} session={session} role="student" />
                ))
              ) : (
                <div className="p-8 border border-dashed border-gray-200 rounded-xl text-center bg-gray-50">
                  <p className="text-gray-500">No upcoming sessions.</p>
                  <Button variant="outline" className="mt-4">Book a Session</Button>
                </div>
              )}
            </div>
          </section>

           {/* Recommended Mentors */}
           <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recommended for You</h2>
              <Link href="/mentors" className="text-primary text-sm font-medium hover:underline">Browse All</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {MOCK_MENTORS.slice(0, 2).map(mentor => (
                 <MentorCard key={mentor.mentorId} mentor={mentor} />
               ))}
            </div>
          </section>

        </div>

        {/* Right Column: Mini Widgets */}
        <div className="space-y-6">
           {/* Next Up Widget */}
           <div className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-6 text-white shadow-lg">
              <h3 className="font-semibold text-blue-100 uppercase text-xs tracking-wider mb-4">Next Session</h3>
              {upcomingSessions[0] ? (
                 <div>
                   <div className="text-3xl font-bold mb-1">
                      {new Date(upcomingSessions[0].scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
                   </div>
                   <div className="text-blue-200 mb-6">
                      {new Date(upcomingSessions[0].scheduledAt).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric'})}
                   </div>
                   
                   <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                         {upcomingSessions[0].mentor?.user.fullName.charAt(0)}
                      </div>
                      <div>
                         <p className="font-semibold">{upcomingSessions[0].mentor?.user.fullName}</p>
                         <p className="text-xs text-blue-200">{upcomingSessions[0].topic}</p>
                      </div>
                   </div>

                   <Button className="w-full bg-white text-primary hover:bg-blue-50">
                      Join Meeting
                   </Button>
                 </div>
              ) : (
                 <div className="text-center py-4 text-blue-200">
                   No immediate sessions.
                 </div>
              )}
           </div>

           {/* Progress / To-do */}
           <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Application Progress</h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                       <CheckCircle className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm line-through text-gray-400">Profile Complete</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                       <span className="text-xs font-bold">2</span>
                    </div>
                    <span className="text-sm text-gray-700">Find a Mentor</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                       <span className="text-xs font-bold">3</span>
                    </div>
                    <span className="text-sm text-gray-500">Book First Session</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
