"use client";

import React, { useState } from 'react';
import { Search, Filter, MessageSquare, Calendar, MoreVertical, Users, GraduationCap, ChevronRight } from 'lucide-react';
import { MOCK_USERS, MOCK_SESSIONS } from '@/lib/dummy-data';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Enhanced mock student data for this specific screen
const MOCK_STUDENTS = [
  {
    id: 'u3',
    fullName: 'Fatima Noor',
    email: 'fatima@example.com',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    university: 'NUST',
    major: 'Computer Science',
    totalSessions: 5,
    lastSession: '2026-01-28',
    status: 'active'
  },
  {
    id: 'u6',
    fullName: 'Ahmed Hassan',
    email: 'ahmed.h@example.com',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    university: 'LUMS',
    major: 'Economics',
    totalSessions: 3,
    lastSession: '2026-01-25',
    status: 'active'
  },
  {
    id: 'u7',
    fullName: 'Zainab Qureshi',
    email: 'z.qureshi@example.com',
    profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    university: 'FAST ISB',
    major: 'Software Engineering',
    totalSessions: 1,
    lastSession: '2026-01-30',
    status: 'new'
  },
  {
    id: 'u8',
    fullName: 'Bilal Khan',
    email: 'bilal.k@example.com',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    university: 'GIKI',
    major: 'Mechanical Engineering',
    totalSessions: 8,
    lastSession: '2026-01-15',
    status: 'inactive'
  }
];

export default function MentorStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(student => 
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Students</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage and track the progress of everyone you're mentoring.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2a2f91] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or uni..."
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-[#2a2f91]/5 focus:border-[#2a2f91]/40 transition-all w-[280px] font-medium shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-slate-200 text-slate-600 bg-white gap-2 h-[42px]">
            <Filter size={18} />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Mentees', value: '12', icon: Users, color: 'blue' },
          { label: 'Active This Week', value: '4', icon: Calendar, color: 'green' },
          { label: 'Completed Reviews', value: '28', icon: GraduationCap, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-5">
            <div className={cn(
              "p-3 rounded-xl",
              stat.color === 'blue' ? "bg-blue-50 text-blue-600" :
              stat.color === 'green' ? "bg-emerald-50 text-emerald-600" :
              "bg-purple-50 text-purple-600"
            )}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Students List Table/Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Student Roster</h3>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2">Sort by:</span>
            <select className="text-sm font-bold text-slate-700 bg-transparent border-none focus:ring-0 cursor-pointer">
              <option>Recent Activity</option>
              <option>Alphabetical</option>
              <option>Total Sessions</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Student</th>
                <th className="px-6 py-4">Course/Major</th>
                <th className="px-6 py-4 text-center">Sessions</th>
                <th className="px-6 py-4">Last Interaction</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-8 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={student.profilePicture} 
                          alt={student.fullName} 
                          className="h-11 w-11 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-blue-100 transition-all shadow-sm"
                        />
                        <div className={cn(
                          "absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full",
                          student.status === 'active' ? "bg-green-500" : student.status === 'inactive' ? "bg-slate-300" : "bg-blue-500"
                        )} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-none mb-1.5">{student.fullName}</p>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <GraduationCap size={12} className="text-slate-400" />
                          {student.university}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-slate-600">{student.major}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="inline-flex items-center justify-center h-8 w-12 rounded-lg bg-slate-100 text-[#2a2f91] font-bold text-sm">
                      {student.totalSessions}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">
                    {new Date(student.lastSession).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter",
                      student.status === 'active' ? "bg-green-50 text-green-600 border border-green-100" : 
                      student.status === 'inactive' ? "bg-slate-50 text-slate-500 border border-slate-100" : 
                      "bg-blue-50 text-blue-600 border border-blue-100"
                    )}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-[#2a2f91] hover:bg-blue-50 rounded-lg transition-all shadow-sm shrink-0">
                        <MessageSquare size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all shadow-sm shrink-0">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination/Footer */}
        <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {filteredStudents.length} of 12 Students</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-400 shadow-none h-9 px-3" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-white border-slate-200 text-[#2a2f91] shadow-none h-9 px-3">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
