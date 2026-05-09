"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Target, Wallet, GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import Select from "@/components/ui/select";
import { universities, universityCompareData } from "@/lib/mockData";

type CompareUniversityId = keyof typeof universityCompareData;

const FALLBACK_COMPARE_DATA = {
  "uet-lahore": {
    closingMerits: { "BS Computer Science": 82.5 },
    admissionFee: 1800,
    semesterFee: 79000,
    totalFourYearCost: 660000,
    hostelStatus: "—",
    entryTests: ["ECAT"],
    topSectors: [],
    freshGradSalary: "—",
    knownFor: [],
    qsRank: "—",
    employmentRank: "—",
    pecAccredited: true,
    researchProjects: 0,
  },
  "nust-islamabad": {
    closingMerits: { "BS Computer Science": 79.11 },
    admissionFee: 35000,
    semesterFee: 140000,
    totalFourYearCost: 2240000,
    hostelStatus: "—",
    entryTests: ["NET"],
    topSectors: [],
    freshGradSalary: "—",
    knownFor: [],
    qsRank: "—",
    employmentRank: "—",
    pecAccredited: true,
    researchProjects: 0,
  },
  "pu-lahore": {
    closingMerits: { "BS Computer Science": 82.0 },
    admissionFee: 7500,
    semesterFee: 30000,
    totalFourYearCost: 240000,
    hostelStatus: "—",
    entryTests: ["PU-E", "PU-M", "PU-AHS", "PU-COM"],
    topSectors: [],
    freshGradSalary: "—",
    knownFor: [],
    qsRank: "—",
    employmentRank: "—",
    pecAccredited: true,
    researchProjects: 0,
  },
} as const;

const UNIVERSITY_OPTIONS = universities
  .filter((university) => universityCompareData[university.id as CompareUniversityId])
  .map((university) => ({
    value: university.id,
    label: university.shortName,
  }));

export default function ProgramComparisonPage() {
  const [activeSection, setActiveSection] = useState("admission");
  const [selectedUniversityA, setSelectedUniversityA] = useState("");
  const [selectedUniversityB, setSelectedUniversityB] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("BS Computer Science");

  const sections = [
    { id: "admission", label: "Admission Strength", icon: Target },
    { id: "financials", label: "Financial Reality", icon: Wallet },
    { id: "academics", label: "Program Specifics", icon: GraduationCap },
    { id: "outcomes", label: "Career & Outcomes", icon: Briefcase },
  ];

  const eligibilityAggregate = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("eligibilityResult");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed.aggregate === "number" ? parsed.aggregate : null;
    } catch {
      return null;
    }
  }, []);

  const getUniversityMeta = (id: string) =>
    universities.find((item) => item.id === id);

  const getCompare = (id: string) =>
    universityCompareData[id as CompareUniversityId] ||
    FALLBACK_COMPARE_DATA[id as keyof typeof FALLBACK_COMPARE_DATA] ||
    null;

  const dataA = selectedUniversityA ? getCompare(selectedUniversityA) : null;
  const dataB = selectedUniversityB ? getCompare(selectedUniversityB) : null;

  const programOptions = useMemo(() => {
    if (!dataA && !dataB) return [{ label: "BS Computer Science", value: "BS Computer Science" }];
    const set = new Set<string>([
      ...Object.keys(dataA?.closingMerits || {}),
      ...Object.keys(dataB?.closingMerits || {}),
    ]);
    return Array.from(set).map((program) => ({ label: program, value: program }));
  }, [dataA, dataB]);

  const getChance = (aggregate: number | null, closingMerit: number | null) => {
    if (aggregate === null || closingMerit === null) {
      return { label: "Complete Eligibility Checker first", className: "bg-slate-100 text-slate-700" };
    }
    if (aggregate >= closingMerit) return { label: "Likely", className: "bg-green-100 text-green-700" };
    if (aggregate >= closingMerit - 5) return { label: "Unlikely", className: "bg-orange-100 text-orange-700" };
    return { label: "Low Chance", className: "bg-red-100 text-red-700" };
  };

  const formatPKR = (value?: number) => (typeof value === "number" ? `PKR ${value.toLocaleString()}` : "—");
  const numericLowerBetter = (a?: number, b?: number, value?: number) =>
    typeof a === "number" && typeof b === "number" && typeof value === "number" && value === Math.min(a, b);
  const parseSalaryMax = (salary?: string) => {
    if (!salary) return 0;
    const matches = salary.match(/\d[\d,]*/g);
    if (!matches || matches.length === 0) return 0;
    return Number(matches[matches.length - 1].replace(/,/g, ""));
  };
  const parseEmploymentRank = (rank?: string) => {
    if (!rank) return Number.POSITIVE_INFINITY;
    const match = rank.match(/\d+/);
    return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
  };

  const selectedAPrograms = dataA ? Object.keys(dataA.closingMerits) : [];
  const selectedBPrograms = dataB ? Object.keys(dataB.closingMerits) : [];

  const closingMeritA = dataA?.closingMerits[selectedProgram as keyof typeof dataA.closingMerits];
  const closingMeritB = dataB?.closingMerits[selectedProgram as keyof typeof dataB.closingMerits];

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Select
          label="University A"
          value={selectedUniversityA}
          options={UNIVERSITY_OPTIONS}
          onChange={(e) => {
            if (e.target.value === selectedUniversityB) return;
            setSelectedUniversityA(e.target.value);
          }}
          placeholder="Select university A"
        />
        <Select
          label="University B"
          value={selectedUniversityB}
          options={UNIVERSITY_OPTIONS}
          onChange={(e) => {
            if (e.target.value === selectedUniversityA) return;
            setSelectedUniversityB(e.target.value);
          }}
          placeholder="Select university B"
        />
      </div>

      {!selectedUniversityA || !selectedUniversityB ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Select two universities to compare
        </div>
      ) : (
        <div className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-8 overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "py-2 text-sm font-semibold whitespace-nowrap",
                    activeSection === section.id ? "text-primary" : "text-slate-500"
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-b border-slate-100">
            <Select
              label="Program"
              value={selectedProgram}
              options={programOptions}
              onChange={(e) => setSelectedProgram(e.target.value)}
              placeholder="Select Program"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            <UniversityColumn
              title={getUniversityMeta(selectedUniversityA)?.shortName || "University A"}
              logo={getUniversityMeta(selectedUniversityA)?.logo}
            >
              {activeSection === "admission" && (
                <div className="space-y-4">
                  <DataItem label="Calculated Merit" value={eligibilityAggregate === null ? "—" : `${eligibilityAggregate.toFixed(2)}%`} />
                  <DataItem
                    label="Last Year Closing Merit"
                    value={typeof closingMeritA === "number" ? `${closingMeritA}%` : "Data not available"}
                  />
                  <DataItem
                    label="Admission Chance"
                    value={
                      <span className={cn("px-2 py-1 rounded text-xs font-semibold", getChance(eligibilityAggregate, typeof closingMeritA === "number" ? closingMeritA : null).className)}>
                        {getChance(eligibilityAggregate, typeof closingMeritA === "number" ? closingMeritA : null).label}
                      </span>
                    }
                  />
                  <DataItem
                    label="Entry Tests"
                    value={<TagList items={dataA?.entryTests || []} />}
                  />
                </div>
              )}
              {activeSection === "financials" && (
                <div className="space-y-4">
                  <DataItem label="Admission Fee" value={formatPKR(dataA?.admissionFee)} good={numericLowerBetter(dataA?.admissionFee, dataB?.admissionFee, dataA?.admissionFee)} />
                  <DataItem label="Semester Fee" value={formatPKR(dataA?.semesterFee)} good={numericLowerBetter(dataA?.semesterFee, dataB?.semesterFee, dataA?.semesterFee)} />
                  <DataItem label="Total 4-Year Cost" value={formatPKR(dataA?.totalFourYearCost)} good={numericLowerBetter(dataA?.totalFourYearCost, dataB?.totalFourYearCost, dataA?.totalFourYearCost)} />
                  <DataItem label="Hostel Status" value={dataA?.hostelStatus || "—"} />
                </div>
              )}
              {activeSection === "academics" && (
                <div className="space-y-4">
                  <DataItem label="Known For" value={<TagList items={dataA?.knownFor || []} />} />
                  <DataItem label="Entry Tests Accepted" value={<TagList items={dataA?.entryTests || []} />} />
                  <DataItem label="PEC Accredited" value={dataA?.pecAccredited ? "Yes" : "No"} />
                  <DataItem label="Active Research Projects" value={dataA?.researchProjects ?? "—"} />
                  <DataItem label="QS World Rank" value={dataA?.qsRank || "—"} />
                </div>
              )}
              {activeSection === "outcomes" && (
                <div className="space-y-4">
                  <DataItem
                    label="Fresh Graduate Salary"
                    value={dataA?.freshGradSalary || "—"}
                    good={parseSalaryMax(dataA?.freshGradSalary) > parseSalaryMax(dataB?.freshGradSalary)}
                  />
                  <DataItem label="Top Hiring Sectors" value={<TagList items={dataA?.topSectors || []} />} />
                  <DataItem
                    label="Employment Ranking"
                    value={dataA?.employmentRank || "—"}
                    good={parseEmploymentRank(dataA?.employmentRank) < parseEmploymentRank(dataB?.employmentRank)}
                  />
                </div>
              )}
            </UniversityColumn>
            <UniversityColumn
              title={getUniversityMeta(selectedUniversityB)?.shortName || "University B"}
              logo={getUniversityMeta(selectedUniversityB)?.logo}
            >
              {activeSection === "admission" && (
                <div className="space-y-4">
                  <DataItem label="Calculated Merit" value={eligibilityAggregate === null ? "—" : `${eligibilityAggregate.toFixed(2)}%`} />
                  <DataItem
                    label="Last Year Closing Merit"
                    value={typeof closingMeritB === "number" ? `${closingMeritB}%` : "Data not available"}
                  />
                  <DataItem
                    label="Admission Chance"
                    value={
                      <span className={cn("px-2 py-1 rounded text-xs font-semibold", getChance(eligibilityAggregate, typeof closingMeritB === "number" ? closingMeritB : null).className)}>
                        {getChance(eligibilityAggregate, typeof closingMeritB === "number" ? closingMeritB : null).label}
                      </span>
                    }
                  />
                  <DataItem
                    label="Entry Tests"
                    value={<TagList items={dataB?.entryTests || []} />}
                  />
                </div>
              )}
              {activeSection === "financials" && (
                <div className="space-y-4">
                  <DataItem label="Admission Fee" value={formatPKR(dataB?.admissionFee)} good={numericLowerBetter(dataA?.admissionFee, dataB?.admissionFee, dataB?.admissionFee)} />
                  <DataItem label="Semester Fee" value={formatPKR(dataB?.semesterFee)} good={numericLowerBetter(dataA?.semesterFee, dataB?.semesterFee, dataB?.semesterFee)} />
                  <DataItem label="Total 4-Year Cost" value={formatPKR(dataB?.totalFourYearCost)} good={numericLowerBetter(dataA?.totalFourYearCost, dataB?.totalFourYearCost, dataB?.totalFourYearCost)} />
                  <DataItem label="Hostel Status" value={dataB?.hostelStatus || "—"} />
                </div>
              )}
              {activeSection === "academics" && (
                <div className="space-y-4">
                  <DataItem label="Known For" value={<TagList items={dataB?.knownFor || []} />} />
                  <DataItem label="Entry Tests Accepted" value={<TagList items={dataB?.entryTests || []} />} />
                  <DataItem label="PEC Accredited" value={dataB?.pecAccredited ? "Yes" : "No"} />
                  <DataItem label="Active Research Projects" value={dataB?.researchProjects ?? "—"} />
                  <DataItem label="QS World Rank" value={dataB?.qsRank || "—"} />
                </div>
              )}
              {activeSection === "outcomes" && (
                <div className="space-y-4">
                  <DataItem
                    label="Fresh Graduate Salary"
                    value={dataB?.freshGradSalary || "—"}
                    good={parseSalaryMax(dataB?.freshGradSalary) > parseSalaryMax(dataA?.freshGradSalary)}
                  />
                  <DataItem label="Top Hiring Sectors" value={<TagList items={dataB?.topSectors || []} />} />
                  <DataItem
                    label="Employment Ranking"
                    value={dataB?.employmentRank || "—"}
                    good={parseEmploymentRank(dataB?.employmentRank) < parseEmploymentRank(dataA?.employmentRank)}
                  />
                </div>
              )}
            </UniversityColumn>
          </div>
        </div>
      )}
    </div>
  );
}

function UniversityColumn({
  title,
  logo,
  children,
}: {
  title: string;
  logo?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded border border-slate-200 bg-white p-1">
          {logo ? <img src={logo} alt={title} className="h-full w-full object-contain" /> : null}
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function DataItem({
  label,
  value,
  good = false,
}: {
  label: string;
  value: React.ReactNode;
  good?: boolean;
}) {
  return (
    <div className="rounded-lg border border-slate-100 p-3">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <div className={cn("mt-1 text-sm", good ? "font-semibold text-green-700" : "text-slate-800")}>{value}</div>
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  if (!items || items.length === 0) return <span>—</span>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
          {item}
        </span>
      ))}
    </div>
  );
}