"use client";

import React, { useState } from 'react';
import { 
  Star, 
  Search, 
  Filter, 
  MessageSquare, 
  Quote, 
  TrendingUp, 
  Users, 
  CheckCircle,
  ChevronDown,
  ThumbsUp,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/button';

// Mock Reviews Data
const MOCK_REVIEWS = [
  {
    id: 'rev1',
    student: {
      name: 'Fatima Noor',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      university: 'NUST'
    },
    rating: 5,
    comment: 'Exceptional guidance! The resume review session was a game-changer for my application. Highly recommend for any CS aspirant.',
    date: '2026-01-28',
    sessionTopic: 'Resume Review & Career Roadmap'
  },
  {
    id: 'rev2',
    student: {
      name: 'Ahmed Hassan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      university: 'LUMS'
    },
    rating: 4,
    comment: 'Very helpful session on LCAT prep. Great tips on time management and specific section strategies.',
    date: '2026-01-20',
    sessionTopic: 'LCAT Preparation Strategy'
  },
  {
    id: 'rev3',
    student: {
      name: 'Zainab Qureshi',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      university: 'FAST ISB'
    },
    rating: 5,
    comment: 'The mock interview was incredibly realistic. The feedback I received helped me build confidence for the actual University interview.',
    date: '2026-01-15',
    sessionTopic: 'Mock Interview Practice'
  },
  {
    id: 'rev4',
    student: {
      name: 'Bilal Khan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      university: 'GIKI'
    },
    rating: 5,
    comment: 'Clear, concise, and professional. OneUni mentors are truly top-tier. Helped me understand the engineering roadmap perfectly.',
    date: '2026-01-05',
    sessionTopic: 'Engineering Discipline Selection'
  }
];

export default function MentorReviewsPage() {
  const [filterRating, setFilterRating] = useState('all');

  const filteredReviews = filterRating === 'all' 
    ? MOCK_REVIEWS 
    : MOCK_REVIEWS.filter(r => r.rating === parseInt(filterRating));

  const averageRating = 4.8;
  const totalReviews = 45;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 px-6 lg:px-10 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reviews & Guidance</h1>
          <p className="text-slate-500 mt-1 font-medium">Track your performance through student feedback and ratings.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-200 text-base font-bold text-slate-600 bg-white gap-2 px-6 h-12 rounded-2xl shadow-sm">
             Share Profile
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Rating Card */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Star size={80} fill="currentColor" className="text-yellow-400" />
            </div>
            <div className="mb-4 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} fill={s <= Math.floor(averageRating) ? "#f6a21e" : "transparent"} className={s <= Math.floor(averageRating) ? "text-[#f6a21e]" : "text-slate-200"} />
                ))}
            </div>
            <h3 className="text-4xl font-black text-slate-900 leading-none mb-2">{averageRating}</h3>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Average Rating</p>
        </div>

        {/* Total Reviews */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm flex flex-col items-center text-center group">
            <div className="mb-4 h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2a2f91] group-hover:scale-110 transition-transform">
                <Users size={24} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 leading-none mb-2">{totalReviews}</h3>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Students</p>
        </div>

        {/* Recommended Card */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm flex flex-col items-center text-center group">
            <div className="mb-4 h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <ThumbsUp size={24} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 leading-none mb-2">98%</h3>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Recommended</p>
        </div>

        {/* Mentor Rank */}
        <div className="bg-slate-900 p-8 rounded-[32px] shadow-xl shadow-slate-200/50 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award size={60} className="text-blue-400" />
            </div>
            <div className="mb-4 h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-300">
                <Award size={24} />
            </div>
            <h3 className="text-xl font-bold text-white leading-none mb-2">Gold Tier</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mentor Achievement</p>
        </div>
      </div>

      {/* Main Review List Area */}
      <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden pb-10">
        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Student Feedback</h2>
              <span className="text-[11px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-lg uppercase tracking-widest">{MOCK_REVIEWS.length} New Feedback</span>
          </div>

          <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Filter:</span>
                  <select 
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="text-sm font-bold text-slate-700 bg-slate-50 border-none rounded-xl px-4 py-2 focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer"
                  >
                      <option value="all">All Ratings</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                  </select>
              </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
            {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                    <div key={review.id} className="p-8 bg-slate-50/50 hover:bg-white rounded-3xl border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-300 relative group">
                        <div className="absolute top-8 left-8 text-[#2a2f91]/10 pointer-events-none">
                            <Quote size={80} />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img 
                                          src={review.student.avatar} 
                                          alt={review.student.name} 
                                          className="h-14 w-14 rounded-2xl object-cover ring-4 ring-white shadow-md"
                                        />
                                        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-lg shadow-sm">
                                            <CheckCircle size={14} className="text-blue-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 leading-none mb-1.5">{review.student.name}</h4>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{review.student.university} • Student</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} size={16} fill={s <= review.rating ? "#f6a21e" : "transparent"} className={s <= review.rating ? "text-[#f6a21e]" : "text-slate-200"} />
                                        ))}
                                    </div>
                                    <span className="text-[11px] font-black text-slate-400 tracking-tighter">{new Date(review.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </div>

                            <p className="text-lg text-slate-700 leading-relaxed font-medium mb-8 italic">
                                "{review.comment}"
                            </p>

                            <div className="pt-6 border-t border-slate-200/50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        SESSION: {review.sessionTopic}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" className="text-xs font-bold text-slate-400 hover:text-[#2a2f91] p-0">
                                        Report Feedback
                                    </Button>
                                    <div className="w-1 h-1 bg-slate-300 rounded-full mx-1" />
                                    <Button variant="ghost" className="text-xs font-bold text-slate-400 hover:text-[#2a2f91] p-0">
                                        Thank Student
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                        <Star size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">No matching reviews found</h3>
                    <p className="text-slate-500 mt-2 font-medium">Try adjusting your filters to see more results.</p>
                </div>
            )}
        </div>
      </div>

    </div>
  );
}
