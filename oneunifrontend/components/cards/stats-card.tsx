import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ label, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn("bg-white p-6 rounded-xl border border-gray-100 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
          
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-xs font-medium",
              trend.isPositive ? "text-emerald-600" : "text-red-600"
            )}>
              <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
              <span className="text-gray-400">from last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary/5 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
