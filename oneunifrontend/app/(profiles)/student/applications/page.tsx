"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle2, MoreHorizontal, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["All", "Submitted", "Draft", "In Process"];

const MOCK_APPLICATIONS = [
  {
    id: 1,
    university: "Stanford University",
    program: "M.S. Computer Science",
    status: "In Process",
    lastUpdated: "2 days ago",
    universityImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1200px-Seal_of_Leland_Stanford_Junior_University.svg.png"
  },
  {
    id: 2,
    university: "MIT",
    program: "M.Eng. Electrical Engineering",
    status: "Draft",
    lastUpdated: "5 days ago",
    universityImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/2560px-MIT_logo.svg.png"
  }
];

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredApps = activeTab === "All" 
    ? MOCK_APPLICATIONS 
    : MOCK_APPLICATIONS.filter(app => app.status === activeTab);

  return (
    <div className="flex flex-col gap-8 min-h-screen bg-slate-50 pb-20 px-6 lg:px-10 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-text-main">My Applications</h1>
        <p className="text-text-muted">Manage and track your university applications.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap",
              activeTab === tab
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {filteredApps.length > 0 ? (
          filteredApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-lg border border-slate-100 p-2 flex items-center justify-center bg-white">
                    <img src={app.universityImage} alt={app.university} className="w-full h-full object-contain" />
                 </div>
                 <div>
                    <h3 className="font-bold text-lg text-text-main">{app.university}</h3>
                    <p className="text-text-body">{app.program}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                       <Clock size={12} />
                       <span>Last updated {app.lastUpdated}</span>
                    </div>
                 </div>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                 <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                    app.status === "Submitted" ? "bg-green-100 text-green-700" :
                    app.status === "In Process" ? "bg-blue-100 text-blue-700" :
                    "bg-slate-100 text-slate-600"
                 )}>
                    {app.status}
                 </span>
                 <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">
                    <MoreHorizontal size={20} />
                 </button>
                 <button className="px-4 py-2 bg-white border border-slate-200 hover:border-primary hover:text-primary text-text-body font-medium rounded-lg text-sm transition-all">
                    Continue Application
                 </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
               <FileText className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-900 font-medium text-lg">No {activeTab.toLowerCase()} applications</p>
            <p className="text-slate-500 text-sm mt-1 mb-6">Start a new application to see it here.</p>
            <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
               Explore Universities
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
