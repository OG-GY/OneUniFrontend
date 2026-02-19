"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  Wallet, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Search, 
  X,
  Check,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import Select from "@/components/ui/select";

// Mock Data
const ALL_DEGREES = [
  "BS Computer Science", 
  "BS Software Engineering", 
  "BS Data Science", 
  "BS Artificial Intelligence",
  "BE Electrical Engineering",
  "BE Mechanical Engineering"
];

const ALL_UNIVERSITIES = [
  { id: 1, uni: "FAST-NUCES", campus: "Islamabad", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/FAST_University_logo.png/220px-FAST_University_logo.png" },
  { id: 2, uni: "NUST", campus: "H-12, Islamabad", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/National_University_of_Sciences_and_Technology_logo.png/220px-National_University_of_Sciences_and_Technology_logo.png" },
  { id: 3, uni: "UET Lahore", campus: "Main Campus", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/UET_Lahore_Logo.png/220px-UET_Lahore_Logo.png" },
  { id: 4, uni: "COMSATS", campus: "Islamabad", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/COMSATS_University_Islamabad_logo.png/220px-COMSATS_University_Islamabad_logo.png" },
  { id: 5, uni: "GIKI", campus: "Topi", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/GIKI_Logo.png/220px-GIKI_Logo.png" },
  { id: 6, uni: "LUMS", campus: "DHA, Lahore", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/LUMS_Logo.png/220px-LUMS_Logo.png" },
  { id: 7, uni: "ITU", campus: "Arfa Tower, Lahore", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/ITU_Logo.png/220px-ITU_Logo.png" },
  { id: 8, uni: "PUCIT", campus: "Old Campus, Lahore", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/PU_crest.png/220px-PU_crest.png" },
];

export default function ProgramComparisonPage() {
  const [activeSection, setActiveSection] = useState("admission");
  const [progA, setProgA] = useState(ALL_UNIVERSITIES[0]);
  const [progB, setProgB] = useState(ALL_UNIVERSITIES[1]);
  const [selectedDegree, setSelectedDegree] = useState(ALL_DEGREES[0]);
  
  const [isSearchingA, setIsSearchingA] = useState(false);
  const [isSearchingB, setIsSearchingB] = useState(false);

  const sections = [
    { id: "admission", label: "Admission Strength", icon: Target },
    { id: "financials", label: "Financial Reality", icon: Wallet },
    { id: "academics", label: "Program Specifics", icon: GraduationCap },
    { id: "outcomes", label: "Career & Outcomes", icon: Briefcase },
  ];

  const handleDegreeChange = (degree: string) => {
    setSelectedDegree(degree);
  };

  return (
    <div className="flex flex-col gap-8 pb-20 px-6 lg:px-10 py-8">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold text-text-main">
          University Comparison
        </h1>
        <p className="text-text-muted">
          Compare programs, fees, and admission requirements side-by-side.
        </p>
      </motion.div>

      {/* Main Comparison Tool */}
      <div className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* 1. HERO HEADER WITH SYNCED SELECTION */}
        <section className="w-full border-b border-slate-200 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-white">
          
          {/* Choice A Area */}
          <SelectionPanel 
            prog={progA} 
            degree={selectedDegree}
            onDegreeChange={handleDegreeChange}
            onSearchToggle={() => setIsSearchingA(true)}
            side="A"
            accentColor="bg-primary"
          />

          {/* Choice B Area */}
          <SelectionPanel 
            prog={progB} 
            degree={selectedDegree}
            onDegreeChange={handleDegreeChange}
            onSearchToggle={() => setIsSearchingB(true)}
            side="B"
            accentColor="bg-secondary"
          />

        </section>

        {/* 2. NAVIGATION BAR (Vercel-style Tabs) */}
        <div className="px-8 border-b border-slate-100 bg-white sticky top-0 z-40">
          <div className="flex items-center gap-8">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  "py-5 px-3 text-sm font-semibold transition-all relative group flex items-center gap-2.5",
                  activeSection === s.id 
                    ? "text-primary" 
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {/* Subtle Hover Background */}
                <div className="absolute inset-x-0 inset-y-2 bg-slate-100/0 group-hover:bg-slate-100/50 rounded-lg transition-colors -z-10" />
                
                <s.icon size={16} className={cn(
                  "transition-colors",
                  activeSection === s.id ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                )} />
                {s.label}

                {/* Animated Bottom Line */}
                {activeSection === s.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. WORKSPACE DATA */}
        <main className="w-full flex-grow pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col"
            >
              {activeSection === "admission" && (
                <div className="divide-y divide-slate-100">
                  <ComparisonRow label="Calculated Merit" valA="82.5%" valB="82.5%" isHighlight />
                  <ComparisonRow label="Last Year Closing" valA="78.2%" valB="81.5%" />
                  <ComparisonRow label="Admission Chance" valA={<ChanceBadge status="High" />} valB={<ChanceBadge status="Competitive" />} />
                  <ComparisonRow label="Entry Tests" valA="NU Test, SAT" valB="NET, SAT, ACT" />
                </div>
              )}

              {activeSection === "financials" && (
                <div className="divide-y divide-slate-100">
                  <ComparisonRow label="Admission Fee" valA="Rs. 30,000" valB="Rs. 35,000" />
                  <ComparisonRow label="Semester Fee" valA="Rs. 165,000" valB="Rs. 132,000" />
                  <ComparisonRow label="Total 4-Year Cost" valA="Rs. 1.45M" valB="Rs. 1.18M" isHighlight colorA="text-primary" colorB="text-secondary" />
                  <ComparisonRow label="Hostel Status" valA="Private Only" valB="On-Campus Available" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* SEARCH MODALS */}
      <SearchModal 
        isOpen={isSearchingA} 
        onClose={() => setIsSearchingA(false)} 
        onSelect={(u: any) => { setProgA(u); setIsSearchingA(false); }} 
        title="Change University A"
        activeId={progA.id}
      />
      <SearchModal 
        isOpen={isSearchingB} 
        onClose={() => setIsSearchingB(false)} 
        onSelect={(u: any) => { setProgB(u); setIsSearchingB(false); }} 
        title="Change University B"
        activeId={progB.id}
      />
    </div>
  );
}

// --- SHARED UI COMPONENTS ---

function SelectionPanel({ prog, degree, onDegreeChange, onSearchToggle, side, accentColor }: any) {
  const degreeOptions = ALL_DEGREES.map((d) => ({ label: d, value: d }));

  return (
    <div className="flex-1 p-6 lg:p-10 flex flex-col gap-6 relative transition-colors">
      <div className={cn("absolute top-0 left-0 w-1 lg:w-1.5 h-full", side === "A" ? "bg-primary" : "bg-secondary")} />
      
      {/* Top Meta: University Info (Logo + Name) */}
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl p-3 shrink-0 shadow-sm">
          <img src={prog.logo} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
              side === "A" ? "text-primary bg-primary/5" : "text-secondary bg-secondary/5"
            )}>
              University {side}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-bold text-slate-900 truncate leading-none">{prog.uni}</h1>
            <button 
              onClick={onSearchToggle}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 group shrink-0"
              title="Search University"
            >
              <Search size={16} className="group-hover:text-primary transition-colors" />
            </button>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-slate-400 font-medium text-[10px] uppercase tracking-wider">
            <MapPin size={12} className="text-slate-300" /> {prog.campus}
          </div>
        </div>
      </div>

      {/* Degree Selector - Synced */}
      <div className="lg:max-w-xs">
        <Select
          label={<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Degree Program</span>}
          value={degree}
          options={degreeOptions}
          onChange={(e) => onDegreeChange(e.target.value)}
          placeholder="Select Degree"
        />
      </div>
    </div>
  );
}

function SearchModal({ isOpen, onClose, onSelect, title, activeId }: any) {
  const [query, setQuery] = useState("");
  
  const filtered = useMemo(() => {
    if (!query) return ALL_UNIVERSITIES;
    return ALL_UNIVERSITIES.filter(u => 
      u.uni.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[80vh]"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-lg font-bold text-slate-900">{title}</h2>
               <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
                  <X size={20} />
               </button>
            </div>

            <div className="p-4 bg-slate-50">
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search university..."
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-primary transition-all"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
               </div>
            </div>

            <div className="flex-grow overflow-y-auto p-3 custom-scrollbar">
               <div className="grid gap-1">
                  {filtered.map(u => (
                    <button 
                      key={u.id}
                      onClick={() => onSelect(u)}
                      className={cn(
                        "w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left",
                        activeId === u.id ? "bg-primary/5 " : "hover:bg-slate-50"
                      )}
                    >
                      <img src={u.logo} alt="" className="w-10 h-10 object-contain p-1 border border-slate-100 rounded bg-white" />
                      <div>
                         <h4 className="font-bold text-slate-900 text-sm">{u.uni}</h4>
                         <p className="text-[10px] text-slate-400 font-medium">{u.campus}</p>
                      </div>
                      {activeId === u.id && <Check size={16} className="ml-auto text-primary" />}
                    </button>
                  ))}
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ComparisonRow({ label, valA, valB, isHighlight, colorA, colorB }: any) {
  return (
    <div className={cn(
      "flex w-full group transition-colors border-b border-slate-50 last:border-0",
      isHighlight ? "bg-primary/5" : "hover:bg-slate-50/20"
    )}>
      <div className="w-[180px] lg:w-[240px] p-4 lg:p-5 border-r border-slate-100 flex items-center shrink-0">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight">{label}</span>
      </div>
      
      <div className={cn(
        "flex-1 p-4 lg:p-5 text-base lg:text-lg tracking-tight flex items-center justify-center text-center",
        isHighlight ? cn("font-extrabold text-primary", colorA) : "font-medium text-slate-700"
      )}>
        {valA}
      </div>
      
      <div className={cn(
        "flex-1 p-4 lg:p-5 text-base lg:text-lg tracking-tight flex items-center justify-center text-center border-l border-slate-100",
        isHighlight ? cn("font-extrabold text-secondary", colorB) : "font-medium text-slate-700"
      )}>
        {valB}
      </div>
    </div>
  );
}

function ChanceBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    High: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-sm",
    Competitive: "text-primary bg-primary/5 border-primary/10",
    Low: "text-rose-600 bg-rose-50 border-rose-100",
  };
  return (
    <span className={cn("px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase border tracking-wider", colors[status])}>
      {status}
    </span>
  );
}