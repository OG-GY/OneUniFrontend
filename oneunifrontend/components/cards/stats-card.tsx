"use client";

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string; // should be a bg-xxx-xxx tailwind class
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ label, value, icon: Icon, color = "bg-primary", trend, className }: StatsCardProps) {
  // Derive text color from bg color for the icon background
  const textColor = color.startsWith('bg-') ? color.replace('bg-', 'text-') : 'text-primary';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={cn(
        "bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-all h-full",
        className
      )}
    >
       <div className={cn("p-4 rounded-xl flex items-center justify-center bg-opacity-10 shrink-0", color)}>
          <Icon className={cn(textColor)} size={24} />
       </div>
       <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-500 font-medium truncate">{label}</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <p className="text-2xl font-bold text-slate-900 truncate">{value}</p>
            {trend && (
              <span className={cn(
                "text-[10px] font-black whitespace-nowrap px-1.5 py-0.5 rounded",
                trend.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              )}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}%
              </span>
            )}
          </div>
       </div>
    </motion.div>
  );
}
