"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navConfig } from "@/lib/data/navigation";

interface SidebarProps {
  role: string;
  className?: string;
}

export function Sidebar({ role, className }: SidebarProps) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  
  // Normalize role to lowercase for lookup
  const normalizedRole = role.toLowerCase();
  const menuItems = navConfig[normalizedRole] || navConfig["student"];

  return (
    <motion.aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{ width: isHovered ? 260 : 80 }}
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      className={cn(
        "h-screen bg-white border-r border-slate-200 flex flex-col z-[100] shadow-sm overflow-hidden",
        className
      )}
    >
      {/* Brand/Logo Area */}
      <div className="h-20 flex items-center px-6 shrink-0 border-b border-slate-50">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
            <GraduationCap size={18} />
          </div>
          <motion.span
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            className={cn(
              "font-bold text-lg tracking-tight text-slate-900 whitespace-nowrap",
              !isHovered && "hidden"
            )}
          >
            OneUni
          </motion.span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-none">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center h-11 rounded-lg transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary/5 text-primary" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center justify-center w-[54px] min-w-[54px] shrink-0">
                <Icon size={20} className={cn(
                  "transition-transform group-hover:scale-110",
                  isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                )} />
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    className="flex-1 flex items-center justify-between pr-4 overflow-hidden"
                  >
                    <span className="text-[13px] font-semibold whitespace-nowrap">
                      {item.title}
                    </span>
                    {isActive && (
                       <div className="w-1 h-1 bg-primary rounded-full" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tooltip for collapsed state */}
              {!isHovered && (
                <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-x-1 group-hover:translate-x-2 transition-all duration-200 whitespace-nowrap z-50 shadow-xl pointer-events-none uppercase tracking-wide">
                  {item.title}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User / Bottom Action Area */}
      <div className="p-3 border-t border-slate-100 mt-auto bg-slate-50/50">
        <div className="flex items-center h-12 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer overflow-hidden p-1">
          <div className="w-9 h-9 min-w-[36px] rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 shadow-sm capitalize">
            {role.charAt(0)}
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 flex-1 overflow-hidden"
              >
                <p className="text-[12px] font-bold text-slate-900 truncate">My Account</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-tight font-medium truncate">
                  {role}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pr-2"
              >
                <LogOut size={14} className="text-slate-400 hover:text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
