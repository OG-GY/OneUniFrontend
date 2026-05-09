"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardFilters } from "@/components/student/dashboard/DashboardFilters";
import { UniversityCard } from "@/components/student/dashboard/UniversityCard";
import { universities } from "@/lib/mockData";
import { listAnimations } from "@/lib/config/animation";

export function UniversityTab() {
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    program: "",
    sortBy: "",
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      city: "",
      program: "",
      sortBy: "",
    });
  };

  // Helper to parse fee string to number
  const parseFee = (feeValue: number | string) => {
    if (typeof feeValue === "number") return feeValue;
    return parseInt(String(feeValue).replace(/[^0-9]/g, "")) || 0;
  };

  // Filter logic
  const filteredUniversities = useMemo(() => {
    let result = universities.filter((uni) => {
      // Search
      if (filters.search && !uni.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      // City
      if (filters.city && !uni.city?.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }
      // Program Category
      if (filters.program) {
        const hasProgram = uni.departments.some(dept => 
          dept.name.toLowerCase().includes(filters.program.toLowerCase()) ||
          dept.programs.some(prog => prog.name.toLowerCase().includes(filters.program.toLowerCase()))
        );
        if (!hasProgram) return false;
      }

      return true;
    });

    // Sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        if (filters.sortBy === "fee_asc") {
          return parseFee(a.fees.semester) - parseFee(b.fees.semester);
        }
        if (filters.sortBy === "fee_desc") {
          return parseFee(b.fees.semester) - parseFee(a.fees.semester);
        }
        if (filters.sortBy === "rank_asc") {
          return a.ranking - b.ranking;
        }
        return 0;
      });
    }

    return result;
  }, [filters]);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Bar Filters */}
      <div className="sticky top-4 z-10">
        <DashboardFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredUniversities.length}</span> universities
          </p>
        </div>

        {filteredUniversities.length > 0 ? (
          <motion.div 
            {...listAnimations.container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredUniversities.map((uni, index) => (
                <motion.div
                  key={uni.id}
                  {...listAnimations.card}
                >
                  <UniversityCard
                    id={uni.id}
                    name={uni.name}
                    logo={uni.logo}
                    image={uni.subCampuses[0]?.image} // Using first campus image as main image
                    location={uni.location}
                    ranking={uni.ranking}
                    established={String(uni.established)}
                    programCount={uni.departments.reduce((acc, dept) => acc + dept.programs.length, 0)}
                    minFee={`PKR ${uni.fees.semester.toLocaleString()}`}
                    campuses={uni.subCampuses.length}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            {...listAnimations.emptyState}
            className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed"
          >
            <h3 className="text-lg font-medium text-slate-900">No universities found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your filters or search query.</p>
            <button 
              onClick={handleClearFilters}
              className="mt-4 text-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
