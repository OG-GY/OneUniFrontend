import { Search, MapPin, X, BookOpen, ArrowUpDown, Filter } from "lucide-react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";

interface FilterState {
  search: string;
  city: string;
  program: string;
  sortBy: string;
}

interface DashboardFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearFilters: () => void;
  className?: string;
}

export function DashboardFilters({
  filters,
  onFilterChange,
  onClearFilters,
  className,
}: DashboardFiltersProps) {
  const cities = [
    { label: "All Cities", value: "" },
    { label: "Islamabad", value: "Islamabad" },
    { label: "Lahore", value: "Lahore" },
    { label: "Karachi", value: "Karachi" },
    { label: "Rawalpindi", value: "Rawalpindi" },
    { label: "Peshawar", value: "Peshawar" },
  ];

  const programs = [
    { label: "All Programs", value: "" },
    { label: "Computer Science & IT", value: "Computer Science" },
    { label: "Engineering", value: "Engineering" },
    { label: "Business & Management", value: "Business" },
    { label: "Medical & Health", value: "Medical" },
    { label: "Social Sciences", value: "Social Sciences" },
  ];

  const sortOptions = [
    { label: "Recommended", value: "" },
    { label: "Fee: Low to High", value: "fee_asc" },
    { label: "Fee: High to Low", value: "fee_desc" },
    { label: "Ranking: Top Rated", value: "rank_asc" },
  ];

  const hasActiveFilters = filters.search || filters.city || filters.program || filters.sortBy;

  return (
    <div className={`bg-white p-2 rounded-2xl border border-slate-200 shadow-sm ${className}`}>
      <div className="flex flex-col lg:flex-row gap-2">
        {/* Search Input */}
        <div className="relative flex-[2] bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-200">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search universities..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full h-12 pl-11 pr-4 bg-transparent border-none outline-none text-sm font-medium text-slate-900 placeholder:text-slate-400"
          />
        </div>
        
        {/* Filters Group */}
        <div className="flex flex-col sm:flex-row gap-2 flex-[3]">
            {/* City Filter */}
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" size={16} />
              <Select
                options={cities}
                value={filters.city}
                onChange={(e) => onFilterChange("city", e.target.value)}
                className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all w-full text-sm font-medium"
                placeholder="City"
              />
            </div>

            {/* Program Filter */}
            <div className="relative flex-1">
              <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" size={16} />
              <Select
                options={programs}
                value={filters.program}
                onChange={(e) => onFilterChange("program", e.target.value)}
                className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all w-full text-sm font-medium"
                placeholder="Program"
              />
            </div>

            {/* Sort Filter */}
            <div className="relative flex-1">
              <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" size={16} />
              <Select
                options={sortOptions}
                value={filters.sortBy}
                onChange={(e) => onFilterChange("sortBy", e.target.value)}
                className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all w-full text-sm font-medium"
                placeholder="Sort By"
              />
            </div>
        </div>

        {/* Clear Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="h-12 px-5 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <X size={16} /> <span className="hidden lg:inline">Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
