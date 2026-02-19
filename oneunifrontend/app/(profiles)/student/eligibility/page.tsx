"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardCheck, 
  Plus, 
  Trash2, 
  Search, 
  Clock, 
  CheckCircle2, 
  Building2, 
  School,
  GraduationCap,
  TrendingUp,
  ChevronRight,
  Calculator,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";

interface TestScore {
  id: string;
  testName: string;
  obtainedMarks: string;
  totalMarks: string;
}

interface UniversityResult {
  id: string;
  university: string;
  program: string;
  matchingPercentage: number;
  requiredAggregate: number;
  yourAggregate: number;
  status: "Highly Likely" | "Likely" | "Borderline" | "Unlikely";
  campus: string;
  logo: string;
}

const TEST_OPTIONS = [
  { value: "NET", label: "NUST Entry Test (NET)" },
  { value: "ECAT", label: "ECAT (UET)" },
  { value: "SAT", label: "SAT (International)" },
  { value: "FAST-NU", label: "FAST NU Admission Test" },
  { value: "MDCA", label: "MDCAT" },
  { value: "USAT", label: "HEC USAT" },
];

const INTER_TYPE_OPTIONS = [
  { value: "total", label: "Total HSSC" },
  { value: "first_year", label: "First Year Only" },
];

const MOCK_RESULTS: UniversityResult[] = [
  {
    id: "1",
    university: "NUST",
    campus: "Islamabad",
    program: "BS Computer Science",
    matchingPercentage: 85,
    requiredAggregate: 78.5,
    yourAggregate: 0,
    status: "Highly Likely",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/ab/NUST_Vector_Logo.path"
  },
  {
    id: "2",
    university: "FAST NUCES",
    campus: "Karachi",
    program: "BS Software Engineering",
    matchingPercentage: 92,
    requiredAggregate: 72,
    yourAggregate: 0,
    status: "Highly Likely",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b8/FAST_NU_logo.png"
  },
  {
    id: "3",
    university: "UET",
    campus: "Lahore",
    program: "BS Electrical Engineering",
    matchingPercentage: 45,
    requiredAggregate: 88,
    yourAggregate: 0,
    status: "Unlikely",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/be/UET_Lahore_Logo.png"
  }
];

export default function EligibilityPage() {
  const [matricMarks, setMatricMarks] = useState("");
  const [interMarks, setInterMarks] = useState("");
  const [interTotal, setInterTotal] = useState("1100");
  const [interType, setInterType] = useState("total");
  const [tests, setTests] = useState<TestScore[]>([
    { id: "1", testName: "", obtainedMarks: "", totalMarks: "" }
  ]);
  
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<UniversityResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const addTest = () => {
    setTests([...tests, { id: Date.now().toString(), testName: "", obtainedMarks: "", totalMarks: "" }]);
  };

  const removeTest = (id: string) => {
    if (tests.length > 1) {
      setTests(tests.filter(t => t.id !== id));
    }
  };

  const updateTest = (id: string, field: keyof TestScore, value: string) => {
    setTests(tests.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSearch = () => {
    setIsSearching(true);
    setHasSearched(false);
    
    setTimeout(() => {
      setIsSearching(false);
      const mMarks = parseFloat(matricMarks) || 0;
      const iMarks = parseFloat(interMarks) || 0;
      const academicBase = ((mMarks / 1100) * 10) + ((iMarks / 1100) * 40);
      
      const dynamicResults = MOCK_RESULTS.map(uni => {
        const test = tests[0]?.obtainedMarks ? 
          (parseFloat(tests[0].obtainedMarks) / (parseFloat(tests[0].totalMarks) || 200)) * 50 : 
          35;
          
        const yourAgg = parseFloat((academicBase + test).toFixed(2));
        const diff = yourAgg - uni.requiredAggregate;
        
        let status: UniversityResult["status"] = "Unlikely";
        let prob = 0;
        
        if (diff > 5) {
          status = "Highly Likely";
          prob = 85 + diff;
        } else if (diff > 0) {
          status = "Likely";
          prob = 70 + diff * 3;
        } else if (diff > -5) {
          status = "Borderline";
          prob = 40 + diff * 4;
        } else {
          status = "Unlikely";
          prob = 20 + diff * 2;
        }

        return {
          ...uni,
          yourAggregate: yourAgg,
          status,
          matchingPercentage: Math.min(Math.max(Math.round(prob), 5), 98)
        };
      });

      setResults(dynamicResults);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 min-h-screen pb-20 px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-text-main">Eligibility Checker</h1>
        <p className="text-text-muted">Enter your academic marks to find universities where you are eligible for admission.</p>
      </div>

      {/* Inputs Section - Form Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Panel (Giving it more space: 5 cols out of 12) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
            <h2 className="font-bold text-lg text-text-main flex items-center gap-2">
              <GraduationCap className="text-primary" size={20} />
              Educational Records
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-body">Matric (10%)</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Obtained Marks" 
                    value={matricMarks}
                    onChange={(e) => setMatricMarks(e.target.value)}
                    type="number"
                    classname="min-h-[48px]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-text-body">Intermediate (40%)</label>
                  <div className="w-32 text-xs">
                    <Select 
                      options={INTER_TYPE_OPTIONS}
                      value={interType}
                      onChange={({ target }) => setInterType(target.value)}
                      className="h-8 py-0"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Marks" 
                    value={interMarks}
                    onChange={(e) => setInterMarks(e.target.value)}
                    type="number"
                    classname="min-h-[48px]"
                  />
                  <Input 
                    placeholder="Total" 
                    value={interTotal}
                    onChange={(e) => setInterTotal(e.target.value)}
                    type="number"
                    classname="w-24 min-h-[48px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-text-main flex items-center gap-2">
                <TrendingUp className="text-secondary" size={20} />
                Entrance Tests (50%)
              </h2>
              <button 
                onClick={addTest}
                className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
              >
                <Plus size={16} /> Add Test
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {tests.map((test) => (
                  <motion.div 
                    key={test.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex flex-col gap-3 relative group"
                  >
                    {tests.length > 1 && (
                      <button 
                        onClick={() => removeTest(test.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                    <Select 
                      options={TEST_OPTIONS}
                      value={test.testName}
                      onChange={({ target }) => updateTest(test.id, 'testName', target.value)}
                      placeholder="Select Test Type"
                      className="h-10 py-0"
                    />
                    <div className="flex gap-2">
                       <Input 
                        placeholder="Obtained" 
                        value={test.obtainedMarks} 
                        onChange={(e) => updateTest(test.id, 'obtainedMarks', e.target.value)} 
                        classname="h-10 min-h-0 text-sm"
                       />
                       <Input 
                        placeholder="Total" 
                        value={test.totalMarks} 
                        onChange={(e) => updateTest(test.id, 'totalMarks', e.target.value)} 
                        classname="h-10 min-h-0 text-sm"
                       />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <Button 
            onClick={handleSearch}
            className="w-full h-12 rounded-xl font-bold shadow-sm"
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Calculate Eligibility"}
          </Button>
        </div>

        {/* Results Section (7 cols out of 12) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-text-main font-medium">Analyzing your admission chances...</p>
                <p className="text-text-muted text-sm mt-1">We are matching your scores with active merit lists.</p>
              </motion.div>
            ) : hasSearched ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center justify-between mb-2">
                   <h2 className="font-bold text-xl text-text-main">Recommended Programs</h2>
                   <span className="text-sm font-medium text-text-muted">{results.length} results found</span>
                </div>
                {results.map((res, index) => (
                  <motion.div
                    key={res.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4 flex-1">
                       <div className="w-16 h-16 rounded-lg border border-slate-100 p-2 flex items-center justify-center bg-white shrink-0">
                          <School className="text-primary" size={32} />
                       </div>
                       <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-lg text-text-main truncate">{res.university}</h3>
                          <p className="text-text-body font-medium">{res.program}</p>
                          <div className="flex items-center gap-4 mt-3">
                             <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Aggregate Req</span>
                                <span className="text-sm font-bold text-text-main">{res.requiredAggregate}%</span>
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Your Score</span>
                                <span className="text-sm font-bold text-primary">{res.yourAggregate}%</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                       <div className="flex flex-col items-end gap-1">
                          <span className={cn(
                             "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                             res.status === "Highly Likely" ? "bg-green-100 text-green-700" :
                             res.status === "Likely" ? "bg-blue-100 text-blue-700" :
                             res.status === "Borderline" ? "bg-orange-100 text-orange-700" :
                             "bg-red-100 text-red-700"
                          )}>
                             {res.status}
                          </span>
                          <span className="text-[10px] font-bold text-text-muted">{res.matchingPercentage}% Success Rate</span>
                       </div>
                       <div className="hidden md:block h-12 w-[2px] bg-slate-100" />
                       <button className="px-5 py-2.5 bg-white border border-slate-200 hover:border-primary hover:text-primary text-text-body font-bold rounded-xl text-sm transition-all shadow-sm">
                          View Details
                       </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-xl border border-slate-200 border-dashed">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                   <Calculator className="text-slate-300" size={32} />
                </div>
                <p className="text-text-main font-bold text-xl">Initialize Eligibility Engine</p>
                <p className="text-text-muted text-sm mt-1 mb-8 max-w-xs text-center">Enter your academic details on the left to see which programs you qualify for.</p>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[9px] font-bold text-text-muted uppercase">SSC</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-[9px] font-bold text-text-muted uppercase">HSSC</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-text-muted uppercase">Entry Test</span>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
