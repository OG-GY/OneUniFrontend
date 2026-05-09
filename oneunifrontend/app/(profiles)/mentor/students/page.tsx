"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Calendar, 
  MoreHorizontal, 
  Users, 
  GraduationCap, 
  ExternalLink,
  Mail,
  Clock,
  CheckCircle2
} from 'lucide-react';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { students } from '@/lib/mockData';

export default function MentorStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const roster = students.map((student, index) => ({
    id: student.id,
    fullName: student.fullName,
    email: student.email,
    profilePicture: student.profilePictureUrl,
    university: student.interestedCity,
    major: student.interests[0] || "General",
    totalSessions: 2 + index,
    lastSession: "2026-02-10",
    status: index === 0 ? "Active" : index === 1 ? "New" : "Completed",
    progress: student.completionPercentage,
  }));

  const filteredStudents = roster.filter(student => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8 pb-20 px-6 lg:px-10 py-8">
      {/* Header & Stats Banner */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Student Roster</h1>
          <p className="text-slate-500 font-medium text-sm">You have {roster.length} active mentees across multiple universities.</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Hours</span>
            <span className="text-xl font-bold text-slate-900 leading-none">124.5 h</span>
          </div>
          <div className="w-[1px] h-10 bg-slate-100 hidden sm:block" />
          <div className="flex flex-col gap-0.5 text-emerald-600">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Feedback Rate</span>
            <span className="text-xl font-bold leading-none">4.9 / 5.0</span>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Filters & Search Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative group flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search by name or university..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="hidden sm:flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
              {['All', 'Active', 'New', 'Completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                    statusFilter === status 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <Button variant="ghost" className="text-slate-500 font-bold text-xs gap-2">
            <Filter size={16} />
            Advanced Filters
          </Button>
        </div>

        {/* Table Roster */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-slate-400 text-[10px] font-bold uppercase tracking-[0.1em] border-b border-slate-100">
                <th className="px-8 py-5">Full Name & Institution</th>
                <th className="px-6 py-5">Academic Field</th>
                <th className="px-6 py-5">Last Interactive</th>
                <th className="px-6 py-5">Progress</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          <img 
                            src={student.profilePicture} 
                            alt={student.fullName} 
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                          />
                          <div className={cn(
                            "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full shadow-sm",
                            student.status === 'Active' ? "bg-emerald-500" : 
                            student.status === 'New' ? "bg-blue-500" : "bg-slate-300"
                          )} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-bold text-slate-900 leading-none group-hover:text-primary transition-colors">
                            {student.fullName}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                            <GraduationCap size={12} className="text-slate-300" />
                            {student.university}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-bold text-slate-700">{student.major}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-0.5 text-xs text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-slate-400" />
                          <span>{new Date(student.lastSession).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 ml-[18px]">{student.totalSessions} total sessions</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 min-w-[140px]">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                          <span>{student.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-500",
                              student.progress === 100 ? "bg-emerald-500" : "bg-primary"
                            )}
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={cn(
                        "text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-tight",
                        student.status === 'Active' ? "bg-emerald-50 text-emerald-600 outline outline-1 outline-emerald-100" : 
                        student.status === 'Completed' ? "bg-slate-100 text-slate-600" : 
                        "bg-blue-50 text-blue-600 outline outline-1 outline-blue-100"
                      )}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 pr-2">
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Send Message">
                          <MessageSquare size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all" title="View Profile">
                          <ExternalLink size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <Users size={32} />
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No students found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Improved Footer */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Roster Page 1 of 1</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 text-xs font-bold text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 shadow-sm">Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
}
