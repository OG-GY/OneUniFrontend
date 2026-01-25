"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Users, 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  GraduationCap,
  Sparkles,
  Search,
  Bell
} from 'lucide-react';
import Button from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: 'mentor' | 'mentee';
}

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const mentorLinks = [
    { href: '/dashboard/mentor', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/mentor/sessions', label: 'Sessions', icon: Calendar },
    { href: '/dashboard/mentor/requests', label: 'Requests', icon: Users },
    { href: '/dashboard/mentor/messages', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/mentor/settings', label: 'Settings', icon: Settings },
  ];

  const menteeLinks = [
    { href: '/student', label: 'Overview', icon: LayoutDashboard },
    { href: '/student/applications', label: 'My Applications', icon: Users }, 
    { href: '/student/mentors', label: 'Mentors', icon: Calendar },
    { href: '/student/explore', label: 'Explore Universities', icon: GraduationCap },
    { href: '/student/profile', label: 'Profile', icon: Settings },
  ];

  const links = type === 'mentor' ? mentorLinks : menteeLinks;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-72 bg-[#1e2167] text-white transition-transform duration-300 ease-out lg:translate-x-0 lg:static shadow-2xl shadow-indigo-900/20",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-[80px] opacity-10 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          {/* Logo */}
          <div className="h-20 flex items-center px-8 border-b border-white/10 relative z-10">
            <Link href="/" className="flex items-center gap-3 font-display font-bold text-2xl tracking-tight text-white hover:opacity-90 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/20">
                 <GraduationCap size={18} fill="currentColor" className="text-[#1e2167]" />
              </div>
              <span>One<span className="text-accent">Uni</span></span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto relative z-10">
            <div className="mb-6 px-4 text-xs font-bold text-blue-200/60 uppercase tracking-widest">
              {type === 'mentor' ? 'Mentor Workspace' : 'Student Portal'}
            </div>
            
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                    isActive 
                      ? "bg-white/10 text-white shadow-lg shadow-black/10" 
                      : "text-blue-100/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {isActive && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r-full"
                      />
                  )}
                  <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive ? "text-accent" : "text-blue-300/70 group-hover:text-blue-200")} />
                  <span>{link.label}</span>
                  {isActive && (
                      <motion.div 
                        layoutId="sparkle"
                        className="ml-auto"
                      >
                          <Sparkles size={14} className="text-accent animate-pulse" />
                      </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Logout */}
          <div className="p-4 border-t border-white/10 relative z-10 bg-[#15174a]">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-orange-500 p-[2px]">
                <div className="h-full w-full rounded-full bg-[#1e2167] flex items-center justify-center">
                    <span className="font-bold text-xs text-white group-hover:text-accent transition-colors">
                        {type === 'mentor' ? 'JD' : 'SA'}
                    </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate group-hover:text-accent transition-colors">
                  {type === 'mentor' ? 'John Doe' : 'Sarah Ahmed'}
                </p>
                <p className="text-xs text-blue-200/60 truncate">
                  {type === 'mentor' ? 'Senior Mentor' : 'Student Account'}
                </p>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-300 hover:text-red-400 hover:bg-white/5">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 lg:ml-0 flex flex-col">
        {/* Topbar */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-slate-600 hover:bg-slate-100"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              
              {/* Simple Breadcrumbs / Page Title Placeholder */}
              <h2 className="hidden md:block text-slate-700 font-bold text-lg capitalize font-display">
                {pathname.split('/').pop()?.replace(/-/g, ' ') || 'Overview'}
              </h2>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 bg-slate-100/50 px-4 py-2 rounded-full border border-slate-200 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all w-64">
                <Search size={16} className="text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
                />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-primary hover:bg-primary/5 rounded-full">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>

            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Calendar size={14} className="text-primary" />
              <span>{new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
