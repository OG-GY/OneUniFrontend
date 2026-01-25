"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { StatsCard } from '@/components/cards/stats-card';
import { SessionCard } from '@/components/cards/session-card';
import { MOCK_SESSIONS, MENTOR_STATS } from '@/lib/dummy-data';
import { Users, Star, DollarSign, Clock } from 'lucide-react';
import Button from '@/components/ui/button';

export default function MentorDashboard() {
  const upcomingSessions = MOCK_SESSIONS.filter(s => s.status === 'scheduled');
  // Include completed in list for demo of different states
  const allSessions = MOCK_SESSIONS; 

  return (
    <DashboardLayout type="mentor">
      <div className="space-y-8">
        
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Mentor Dashboard</h1>
               <p className="text-gray-500 mt-1">Manage your sessions and students.</p>
            </div>
            <Button className="bg-primary text-white hover:bg-primary/90">
                Set Availability
            </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            label="Total Sessions" 
            value={MENTOR_STATS.totalSessions} 
            icon={Clock}
            trend={{ value: 12, isPositive: true }}
          />
           <StatsCard 
            label="Profile Views" 
            value={MENTOR_STATS.profileViews} 
            icon={Users} 
            trend={{ value: 5, isPositive: true }}
          />
           <StatsCard 
            label="Avg. Rating" 
            value={MENTOR_STATS.averageRating} 
            icon={Star} 
          />
           <StatsCard 
            label="Earnings (Dec)" 
            value={`Rs. ${MENTOR_STATS.earningsThisMonth}`} 
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column: Sessions */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Session Requests */}
            {MENTOR_STATS.pendingRequests > 0 && (
                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                             <Users className="h-4 w-4" />
                        </div>
                        <div>
                             <p className="font-semibold text-yellow-900">You have {MENTOR_STATS.pendingRequests} new session requests!</p>
                             <p className="text-xs text-yellow-700">Review them to fill your schedule.</p>
                        </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-yellow-200 text-yellow-800 hover:bg-yellow-100">Review Requests</Button>
                </div>
            )}

            {/* Upcoming Schedule */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Upcoming Sessions</h2>
                <Button variant="link" className="text-primary p-0">View Calendar</Button>
              </div>
              
              <div className="space-y-4">
                {upcomingSessions.map(session => (
                    <SessionCard key={session.sessionId} session={session} role="mentor" />
                ))}
              </div>
            </section>
            
             {/* Recent Activity / Completed */}
             <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent History</h2>
              <div className="space-y-4 opacity-75">
                 {MOCK_SESSIONS.filter(s => s.status === 'completed').map(session => (
                    <SessionCard key={session.sessionId} session={session} role="mentor" />
                ))}
              </div>
             </section>

          </div>

          {/* Right Column: Mini Widgets */}
          <div className="space-y-6">
             
             {/* Availability Snapshot */}
             <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Today's Availability</h3>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">2:00 PM - 3:00 PM</span>
                        <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-1 rounded">Open</span>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">4:00 PM - 5:00 PM</span>
                        <span className="text-gray-400 font-medium text-xs">Booked</span>
                    </div>
                     <div className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">7:00 PM - 8:00 PM</span>
                        <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-1 rounded">Open</span>
                    </div>
                </div>
                <Button variant="outline" className="w-full mt-4 text-xs">Edit Schedule</Button>
             </div>

             {/* Quick Actions */}
             <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                 <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-primary hover:bg-primary/5">
                        <Users className="h-4 w-4 mr-2" /> View My Students
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-primary hover:bg-primary/5">
                        <DollarSign className="h-4 w-4 mr-2" /> Payment Settings
                    </Button>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
