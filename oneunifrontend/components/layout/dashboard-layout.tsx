"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Bell, 
  Calendar,
  Menu,
  X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: string;
}

export function DashboardLayout({ children, role = "student" }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="h-screen w-full bg-slate-50 flex overflow-hidden font-sans fixed inset-0">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Component (Desktop) */}
      <Sidebar 
        role={role} 
        className="hidden lg:flex shrink-0" 
      />

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden shadow-2xl"
          >
            <Sidebar role={role} className="w-full h-full !flex" />
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-[-50px] p-2 bg-white rounded-lg text-slate-800 shadow-xl border border-slate-100"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex flex-col">
              <h2 className="text-slate-900 font-bold text-xs uppercase tracking-wider">
                {pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 focus-within:border-primary/50 transition-all w-64">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-xs text-slate-700 placeholder:text-slate-400 w-full"
              />
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-lg transition-all relative border border-transparent hover:border-slate-200">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full border border-white" />
              </button>
              
              <div className="hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-tight">
                <Calendar size={14} className="text-primary" />
                <span>
                  {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto scrollbar-none pb-12 bg-slate-50/50">
          <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
