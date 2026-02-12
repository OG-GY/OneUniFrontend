"use client";

import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  CreditCard, 
  History, 
  BarChart3,
  Calendar,
  Wallet,
  ArrowRight,
  ChevronRight,
  Info,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { MENTOR_STATS, MOCK_SESSIONS } from '@/lib/dummy-data';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock Transaction Data
const MOCK_TRANSACTIONS = [
  { id: 'tx1', type: 'Session', student: 'Fatima Noor', amount: 2500, date: '2026-01-28', status: 'processed', method: 'OneUni Wallet' },
  { id: 'tx2', type: 'Session', student: 'Ahmed Hassan', amount: 3000, date: '2026-01-25', status: 'processed', method: 'OneUni Wallet' },
  { id: 'tx3', type: 'Withdrawal', student: 'Bank Transfer (HBL)', amount: -10000, date: '2026-01-20', status: 'completed', method: 'Bank Transfer' },
  { id: 'tx4', type: 'Session', student: 'Zainab Qureshi', amount: 2000, date: '2026-01-18', status: 'processed', method: 'OneUni Wallet' },
  { id: 'tx5', type: 'Session', student: 'Bilal Khan', amount: 1500, date: '2026-01-15', status: 'processed', method: 'OneUni Wallet' },
];

export default function MentorEarningsPage() {
  const [activeRange, setActiveRange] = useState('This Month');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Earnings & Finance</h1>
          <p className="text-slate-500 mt-1 font-medium">Track your revenue, manage payouts, and view transaction history.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-200 text-slate-600 bg-white gap-2 h-11 px-5 rounded-xl font-bold">
            <Download size={18} />
            Export Report
          </Button>
        </div>
      </div>

      {/* Main Wealth Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Total Balance Card (The Wallet) */}
        <div className="xl:col-span-2 bg-gradient-to-br from-[#1a1c4b] to-[#2a2f91] rounded-[32px] p-8 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                   <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                <Wallet size={28} className="text-blue-200" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-200/80">Available Balance</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                            <TrendingUp size={12} />
                            +12% vs last month
                        </div>
                   </div>
                   <div className="space-y-1">
                        <p className="text-[13px] font-bold text-blue-200/60 uppercase tracking-widest leading-none">Total Net Profit</p>
                        <h2 className="text-5xl font-black tracking-tight">Rs. {MENTOR_STATS.earningsThisMonth.toLocaleString()}</h2>
                   </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                    <Button className="w-full sm:w-auto bg-white text-[#1a1c4b] hover:bg-blue-50 font-black h-14 px-10 rounded-2xl shadow-lg transition-all active:scale-95 text-lg">
                        Withdraw Funds
                    </Button>
                    <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex-1 w-full sm:w-auto">
                        <p className="text-[10px] font-black text-blue-200/50 uppercase tracking-widest mb-1 text-center sm:text-left">Payout Destination</p>
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                            <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center font-bold text-[10px] border border-white/10 text-white">VISA</div>
                            <span className="text-sm font-bold truncate">HBL Bank •••• 4242</span>
                            <ChevronRight size={14} className="text-white/40" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl -ml-24 -mb-24" />
        </div>

        {/* Secondary Metrics Column */}
        <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-6 border border-slate-200/60 shadow-sm">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Pending Clearance</p>
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-slate-900">Rs. 4,200</h3>
                    <div className="h-10 w-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                        <Clock size={20} />
                    </div>
                </div>
                <div className="mt-4 p-3 bg-amber-50/50 rounded-xl border border-amber-100 flex items-center gap-3">
                    <Info size={14} className="text-amber-600 shrink-0" />
                    <p className="text-[11px] font-medium text-amber-700 leading-tight">These funds will be available in 3 days after session audit.</p>
                </div>
            </div>

            <div className="bg-white rounded-[32px] p-6 border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Earnings Goal</p>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black text-slate-900">Rs. 12,500 <span className="text-slate-300 font-bold">/ 25k</span></h3>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">50% REACHED</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-1/2 rounded-full transition-all group-hover:w-[55%]" />
                </div>
                <p className="text-[11px] text-slate-400 mt-4 font-bold uppercase tracking-tighter">Next Milestone: Bronze Mentor Rank</p>
            </div>
        </div>
      </div>

      {/* Transaction History & Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Transaction History (Span 2) */}
        <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <History className="text-[#2a2f91]" size={20} />
                    <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black text-slate-400 tracking-widest uppercase">Filter:</span>
                    <select className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border-none focus:ring-0">
                        <option>All Types</option>
                        <option>Earnings</option>
                        <option>Withdrawals</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                                <th className="px-8 py-5">Activity</th>
                                <th className="px-6 py-5">Date</th>
                                <th className="px-6 py-5">Method</th>
                                <th className="px-6 py-5 text-right">Amount</th>
                                <th className="px-8 py-5 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_TRANSACTIONS.map((tx) => (
                                <tr key={tx.id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                                                tx.amount > 0 ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
                                            )}>
                                                {tx.amount > 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 leading-none mb-1.5">{tx.type}</p>
                                                <p className="text-xs text-slate-500 font-medium italic">{tx.student}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm font-bold text-slate-600">
                                        {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-4 bg-slate-100 rounded border border-slate-200" />
                                            <span className="text-xs font-bold text-slate-500">{tx.method}</span>
                                        </div>
                                    </td>
                                    <td className={cn(
                                        "px-6 py-5 text-right font-black text-sm",
                                        tx.amount > 0 ? "text-slate-900" : "text-red-600"
                                    )}>
                                        {tx.amount > 0 ? `+ Rs. ${tx.amount}` : `- Rs. ${Math.abs(tx.amount)}`}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                                            tx.status === 'processed' || tx.status === 'completed' 
                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                                                : "bg-amber-50 text-amber-600 border border-amber-100"
                                        )}>
                                            {tx.status === 'processed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                            {tx.status}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                    <button className="text-[11px] font-black text-slate-400 hover:text-[#2a2f91] uppercase tracking-[0.2em] transition-all">Load More Activity</button>
                </div>
            </div>
        </div>

        {/* Right: Monthly Insights & Stats */}
        <div className="space-y-8">
            <div className="bg-white rounded-[32px] p-8 border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col items-center text-center">
                <BarChart3 className="text-blue-200 absolute -top-4 -right-4" size={100} />
                <div className="relative z-10">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Monthly Insights</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">Your earnings increased by 15% this week because of 2 new student packages.</p>
                    
                    <div className="mt-8 space-y-4 w-full text-left">
                        {[
                            { label: 'Per Session Avg', value: 'Rs. 2,450', color: 'blue' },
                            { label: 'Student Retention', value: '82%', color: 'emerald' },
                            { label: 'Top Category', value: 'Resume Review', color: 'indigo' },
                        ].map((insight, i) => (
                            <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{insight.label}</span>
                                <span className="text-sm font-bold text-slate-900">{insight.value}</span>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" className="w-full mt-8 border-slate-100 text-[#2a2f91] hover:bg-blue-50 font-bold h-12 rounded-2xl group">
                        View Detailed Analytics
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-all" />
                    </Button>
                </div>
            </div>

            {/* Tax / Invoice Alert */}
            <div className="bg-white rounded-[32px] p-6 border border-slate-200/60 shadow-sm">
                <div className="flex gap-4">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0"><Download size={20} /></div>
                    <div>
                        <p className="text-sm font-bold text-slate-900">Tax Reports Available</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-1">Your annual earnings report for 2025 is ready for download.</p>
                        <button className="text-[11px] font-black text-[#2a2f91] mt-3 uppercase tracking-widest hover:underline">Download PDF</button>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
