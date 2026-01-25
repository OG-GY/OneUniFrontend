"use client";

import React, { useState } from 'react';
import Button from '@/components/ui/button';
import { MentorCard } from '@/components/cards/mentor-card';
import { MOCK_MENTORS } from '@/lib/dummy-data';
import { Search, Filter, SlidersHorizontal, MapPin } from 'lucide-react';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simple filter logic for demo
  const filteredMentors = MOCK_MENTORS.filter(mentor => 
    mentor.user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.specializations.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
    mentor.currentInstitution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
       <Header />

       {/* Hero Section */}
       <section className="bg-primary text-white py-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-primary/50 z-0"></div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Mentor</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Connect with students and alumni from top universities who have walked the path you're on. Get personalized guidance for your admission journey.
            </p>

            {/* Search Bar (Floating) */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2">
               <div className="flex-1 relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                 <input 
                   type="text"
                   placeholder="Search by name, university, or field (e.g. 'NUST', 'Medical', 'Ali')"
                   className="w-full h-12 pl-12 pr-4 rounded-xl border-none bg-transparent focus:ring-0 text-gray-900 placeholder:text-gray-400"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
               <div className="flex items-center gap-2">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="lg" className="h-12 border-0 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl px-6">
                         <Filter className="h-4 w-4 mr-2" />
                         Filters
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>Filter by Price</DropdownMenuLabel>
                      <DropdownMenuItem>Under 1000/hr</DropdownMenuItem>
                      <DropdownMenuItem>1000 - 2000/hr</DropdownMenuItem>
                      <DropdownMenuItem>2000+/hr</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Availability</DropdownMenuLabel>
                      <DropdownMenuItem>Available Today</DropdownMenuItem>
                      <DropdownMenuItem>Available This Week</DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>

                 <Button size="lg" className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl shadow-lg shadow-yellow-500/20">
                   Search
                 </Button>
               </div>
            </div>
         </div>
       </section>

       {/* Main Content */}
       <main className="flex-1 container mx-auto px-4 py-12">
          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8 border-b border-gray-200 pb-6">
             <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-xl">{filteredMentors.length} Mentors Available</span>
             </div>
             <div className="flex items-center gap-4 text-sm text-gray-500">
               <span>Sort by:</span>
               <select className="bg-transparent font-medium text-gray-900 cursor-pointer focus:outline-none">
                 <option>Recommended</option>
                 <option>Highest Rated</option>
                 <option>Price: Low to High</option>
                 <option>Price: High to Low</option>
               </select>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMentors.map((mentor) => (
              <div key={mentor.mentorId} className="h-full">
                <MentorCard mentor={mentor} />
              </div>
            ))}
          </div>

          {filteredMentors.length === 0 && (
            <div className="text-center py-20">
               <div className="bg-gray-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                 <Search className="h-8 w-8 text-gray-400" />
               </div>
               <h3 className="text-xl font-bold text-gray-900">No mentors found</h3>
               <p className="text-gray-500 mt-2">Try adjusting your search terms or filters.</p>
               <Button 
                variant="link" 
                className="mt-4 text-primary"
                onClick={() => setSearchQuery('')}
               >
                 Clear all filters
               </Button>
            </div>
          )}
       </main>

       <Footer />
    </div>
  );
}
