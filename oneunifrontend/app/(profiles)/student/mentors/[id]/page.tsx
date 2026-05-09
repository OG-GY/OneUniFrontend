"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mentors } from "@/lib/mockData";
import { ArrowLeft, Star, MapPin, Calendar, Mail, Clock, CheckCircle, Building2, Briefcase } from "lucide-react";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Input from "@/components/ui/input";
import { motion } from "framer-motion";

export default function MentorProfilePage() {
  const params = useParams();
  const mentor = mentors.find((m) => m.id === params.id);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Not found</p>
      </div>
    );
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
        setIsEmailModalOpen(false);
      }, 2000);
    }, 1000);
  };

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setBookingSent(true);
      setTimeout(() => {
        setBookingSent(false);
        setIsBookingModalOpen(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-indigo-100" />
            
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg mb-4 relative z-10 bg-white">
              <img src={mentor.user.profilePictureUrl} alt={mentor.user.fullName} className="w-full h-full object-cover" />
            </div>
            
            <div className="relative z-10 w-full">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">{mentor.user.fullName}</h1>
              <p className="text-primary font-medium text-sm bg-primary/5 py-1 px-3 rounded-full inline-block mb-4 border border-primary/10">
                {mentor.designation}
              </p>
              
              <div className="flex flex-col gap-3 w-full text-sm text-slate-600 mb-6">
                 <div className="flex items-center justify-center gap-2">
                    <Building2 size={16} className="text-slate-400" />
                    <span className="font-medium">{mentor.currentInstitution}</span>
                 </div>
                 <div className="flex items-center justify-center gap-2">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-900">{mentor.averageRating}</span>
                    <span className="text-slate-400">({mentor.totalSessions} reviews)</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full border-t border-slate-100 pt-6">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hourly Rate</span>
                     <span className="text-lg font-bold text-slate-900">Rs. {mentor.hourlyRate}</span>
                  </div>
                  <div className="flex flex-col border-l border-slate-100">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Session</span>
                     <span className="text-lg font-bold text-slate-900">60 min</span>
                  </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              Availability
            </h3>
            <div className="flex flex-wrap gap-2">
              {mentor.availability?.map((day) => (
                <span key={day.day} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100 hover:border-slate-300 transition-colors cursor-default">
                  {day.day}: {day.slots.join(", ")}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-3 sticky top-6">
            <Button 
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full justify-center gap-2 h-12 text-base shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              <Calendar size={18} /> Book Session
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsEmailModalOpen(true)}
              className="w-full justify-center gap-2 h-12 text-base bg-white hover:bg-slate-50"
            >
              <Mail size={18} /> Send Message
            </Button>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* About Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                 <Briefcase size={18} />
              </div>
              About Me
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {mentor.bio}
            </p>
          </div>

          {/* Expertise Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                 <Star size={18} />
              </div>
              Areas of Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {mentor.expertise.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-xl bg-slate-50 text-slate-700 font-medium border border-slate-200 text-sm hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews Preview (Mock) */}
           <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center">
                 <CheckCircle size={18} />
              </div>
              Recent Reviews
            </h2>
            
            <div className="flex flex-col gap-6">
               {[1, 2].map((review) => (
                 <div key={review} className="flex gap-4 border-b border-slate-50 last:border-0 pb-6 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm shrink-0">
                       S
                    </div>
                    <div className="flex flex-col gap-1">
                       <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">Sarah J.</span>
                          <div className="flex text-yellow-400">
                             {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-current" />)}
                          </div>
                       </div>
                       <p className="text-slate-600 text-sm leading-relaxed">
                          "Absolutely amazing session! {mentor.name} provided distinct layout action plans for my career transition. Highly recommended!"
                       </p>
                       <span className="text-xs text-slate-400 font-medium mt-1">2 days ago</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      <Modal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} size="md">
        <div className="p-6">
          {emailSent ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Email Sent!</h3>
              <p className="text-slate-500 mt-2">Your message has been sent to {mentor.user.fullName}.</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Send a Message</h3>
              <p className="text-slate-500 text-sm mb-6">Send a direct email to {mentor.user.fullName}.</p>
              
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <Input placeholder="e.g. Inquiry about mentorship" inputProps={{ required: true }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea 
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[120px]"
                    placeholder="Write your message here..."
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsEmailModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Send Message</Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>

      {/* Booking Modal */}
      <Modal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} size="md">
        <div className="p-6">
          {bookingSent ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Request Sent!</h3>
              <p className="text-slate-500 mt-2">Your session request has been sent to {mentor.user.fullName}.</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Book a Session</h3>
              <p className="text-slate-500 text-sm mb-6">Schedule a 1:1 meeting with {mentor.user.fullName}.</p>
              
              <form onSubmit={handleBookSession} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Date</label>
                  <Input type="date" inputProps={{ required: true }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Time</label>
                  <Input type="time" inputProps={{ required: true }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Topic</label>
                  <Input placeholder="e.g. Resume Review" inputProps={{ required: true }} />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsBookingModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Confirm Booking</Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
