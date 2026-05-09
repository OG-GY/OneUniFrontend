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
import { universities } from "@/lib/mockData";

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
  requiredAggregate: number;
  yourAggregate: number;
  status: "Likely" | "Unlikely" | "Not Eligible";
  campus: string;
  logo: string;
  reason: string;
}

const TEST_OPTIONS = [
  { value: "ECAT", label: "ECAT (UET Lahore)" },
  { value: "NET", label: "NET (NUST Islamabad)" },
  { value: "PU-E", label: "PU-E (PU Lahore)" },
  { value: "PU-M", label: "PU-M (PU Lahore)" },
  { value: "PU-AHS", label: "PU-AHS (PU Lahore)" },
  { value: "PU-COM", label: "PU-COM (PU Lahore)" },
];

const INTER_TYPE_OPTIONS = [
  { value: "total", label: "Total HSSC" },
  { value: "first_year", label: "First Year Only" },
];

const MATRIC_TOTAL = 1100;
const trackedUniversities = ["uet-lahore", "nust-islamabad", "pu-lahore"] as const;

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
  const [formError, setFormError] = useState("");

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
    if (!matricMarks.trim() || !interMarks.trim()) {
      setFormError("Matric and Intermediate marks are required.");
      setHasSearched(false);
      setResults([]);
      return;
    }

    setFormError("");
    setIsSearching(true);
    setHasSearched(false);
    
    setTimeout(() => {
      setIsSearching(false);
      const mMarks = parseFloat(matricMarks) || 0;
      const iMarks = parseFloat(interMarks) || 0;
      const interTotalValue = Number(interTotal) || 1100;
      const matricPercent = (mMarks / MATRIC_TOTAL) * 100;
      const interPercent = (iMarks / interTotalValue) * 100;

      const validTests = tests.filter(
        (test) => test.testName && test.obtainedMarks.trim() !== ""
      );

      const getTestByName = (name: string) =>
        validTests.find((test) => test.testName === name);

      const uet = universities.find((item) => item.id === "uet-lahore");
      const nust = universities.find((item) => item.id === "nust-islamabad");
      const pu = universities.find((item) => item.id === "pu-lahore");

      const dynamicResults: UniversityResult[] = [];

      const ecatTest = getTestByName("ECAT");
      if (ecatTest) {
        const ecatScore = Number(ecatTest.obtainedMarks) || 0;
        const uetAggregate = Number(
          ((matricPercent * 0.25) + (interPercent * 0.75)).toFixed(2)
        );
        const requiredAggregate = 78;
        const diff = uetAggregate - requiredAggregate;
        const passedEcatCutoff = ecatScore >= 160;
        let status: UniversityResult["status"] = "Likely";
        let reason = "Your aggregate meets UET's average closing merit for BS Engineering.";

        if (!passedEcatCutoff) {
          status = "Not Eligible";
          reason = "ECAT cutoff not met (minimum 160/400 required for eligibility).";
        } else if (diff < -5) {
          status = "Not Eligible";
          reason = "Your aggregate is significantly below UET's average closing merit.";
        } else if (diff < 0) {
          status = "Unlikely";
          reason = "Your aggregate is slightly below UET's average closing merit.";
        }

        dynamicResults.push({
          id: "uet-lahore",
          university: uet?.shortName || "UET Lahore",
          program: "BS Engineering",
          requiredAggregate,
          yourAggregate: uetAggregate,
          status,
          campus: uet?.city || "Lahore",
          logo: uet?.logo || "",
          reason,
        });
      }

      const netTest = getTestByName("NET");
      if (netTest) {
        const netPercent = ((Number(netTest.obtainedMarks) || 0) / 200) * 100;
        const nustAggregate = Number(
          ((netPercent * 0.75) + (interPercent * 0.25)).toFixed(2)
        );
        const requiredAggregate = 88;
        const diff = nustAggregate - requiredAggregate;
        let status: UniversityResult["status"] = "Likely";
        let reason = "Your aggregate meets NUST's average closing merit for SEECS programs.";

        if (diff < -5) {
          status = "Not Eligible";
          reason = "Your aggregate is well below NUST's typical closing merit range (87-89).";
        } else if (diff < 0) {
          status = "Unlikely";
          reason = "Your aggregate is slightly below NUST's typical closing merit range.";
        }

        dynamicResults.push({
          id: "nust-islamabad",
          university: nust?.shortName || "NUST Islamabad",
          program: "BS CS / BS EE",
          requiredAggregate,
          yourAggregate: nustAggregate,
          status,
          campus: nust?.city || "Islamabad",
          logo: nust?.logo || "",
          reason,
        });
      }

      const puTest = validTests.find((test) => test.testName.startsWith("PU-"));
      if (puTest) {
        const puTestTotal = Number(puTest.totalMarks) || 100;
        const puTestPercent = ((Number(puTest.obtainedMarks) || 0) / puTestTotal) * 100;
        const academicMerit = (matricPercent * 0.4) + (interPercent * 0.6);
        const puAggregate = Number(
          ((academicMerit * 0.75) + (puTestPercent * 0.25)).toFixed(2)
        );
        const requiredAggregate = 68;
        const diff = puAggregate - requiredAggregate;
        let status: UniversityResult["status"] = "Likely";
        let reason = "Your aggregate meets PU's average closing merit for morning BS programs.";

        if (diff < -5) {
          status = "Not Eligible";
          reason = "Your aggregate is well below PU's typical closing merit range (65-70).";
        } else if (diff < 0) {
          status = "Unlikely";
          reason = "Your aggregate is slightly below PU's average closing merit.";
        }

        dynamicResults.push({
          id: "pu-lahore",
          university: pu?.shortName || "PU Lahore",
          program: "Morning BS Programs",
          requiredAggregate,
          yourAggregate: puAggregate,
          status,
          campus: pu?.city || "Lahore",
          logo: pu?.logo || "",
          reason,
        });
      }

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
                <label className="text-sm font-medium text-text-body">Matric Marks</label>
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
                  <label className="text-sm font-medium text-text-body">Intermediate Marks</label>
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
                Entry Tests
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
          <p className="text-xs text-text-muted leading-relaxed">
            UET Lahore: Matric 25% + FSc 75% (ECAT determines eligibility cutoff) | NUST Islamabad: NET 75% + FSc 25% | PU Lahore: Academic Merit 75% (Matric + Inter weighted) + PU Entry Test 25%
          </p>
          {formError && (
            <p className="text-sm text-red-500 font-medium">{formError}</p>
          )}
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
                {results.length > 0 ? results.map((res, index) => (
                  <motion.div
                    key={res.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4 flex-1">
                       <div className="w-16 h-16 rounded-lg border border-slate-100 p-2 flex items-center justify-center bg-white shrink-0">
                          {res.logo ? (
                            <img src={res.logo} alt={res.university} className="w-full h-full object-contain" />
                          ) : (
                            <School className="text-primary" size={32} />
                          )}
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
                             res.status === "Likely" ? "bg-green-100 text-green-700" :
                             res.status === "Unlikely" ? "bg-orange-100 text-orange-700" :
                             "bg-red-100 text-red-700"
                          )}>
                             {res.status}
                          </span>
                          <span className="text-[10px] font-bold text-text-muted">{res.reason}</span>
                       </div>
                       <div className="hidden md:block h-12 w-[2px] bg-slate-100" />
                       <button className="px-5 py-2.5 bg-white border border-slate-200 hover:border-primary hover:text-primary text-text-body font-bold rounded-xl text-sm transition-all shadow-sm">
                          View Details
                       </button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="rounded-xl border border-slate-200 bg-white p-6">
                    <p className="text-sm text-text-muted">Enter at least one entry test score to see university results</p>
                  </div>
                )}
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
