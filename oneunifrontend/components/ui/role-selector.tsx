"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, GraduationCap, Briefcase, Building2 } from "lucide-react";
import clsx from "clsx";

export type Role = "student" | "mentor" | "university_representative" | "";

interface RoleOption {
  id: Role;
  label: string;
  description: string;
  icon: typeof GraduationCap;
}

const ROLES: RoleOption[] = [
  {
    id: "student",
    label: "Student",
    description: "Seeking guidance and resources for my academic journey",
    icon: GraduationCap,
  },
  {
    id: "mentor",
    label: "Mentor",
    description: "Sharing expertise and guiding the next generation",
    icon: Briefcase,
  },
  {
    id: "university_representative",
    label: "University Representative",
    description: "Representing an institution and managing resources",
    icon: Building2,
  },
];

interface RoleSelectorProps {
  value: Role;
  onChange: (role: Role) => void;
  error?: string;
  label?: string;
}

export default function RoleSelector({ value, onChange, error, label }: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedRole = ROLES.find((r) => r.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 w-full" ref={containerRef}>
      {label && (
        <label className="font-medium text-sm text-text-body ml-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "w-full flex items-center justify-between px-5 py-4 bg-white border rounded-xl text-left transition-all duration-200",
            "shadow-sm focus:outline-none focus:ring-4",
            isOpen ? "border-primary ring-primary/10 shadow-md" : "border-slate-200 hover:border-slate-300",
            error ? "border-red-300 ring-red-500/10" : "border-slate-200"
          )}
        >
          <div className="flex items-center gap-4">
            {selectedRole ? (
              <>
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <selectedRole.icon size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[15px] text-text-main leading-none mb-1">
                    {selectedRole.label}
                  </span>
                  <span className="text-xs text-text-muted line-clamp-1">
                    {selectedRole.description}
                  </span>
                </div>
              </>
            ) : (
              <span className="text-[15px] text-text-muted">Select your role</span>
            )}
          </div>
          <ChevronDown
            size={20}
            className={clsx("text-text-muted transition-transform duration-200", isOpen && "rotate-180")}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2 flex flex-col gap-1">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => {
                    onChange(role.id);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "w-full flex items-center gap-4 p-4 rounded-xl text-left transition-colors duration-200",
                    value === role.id ? "bg-primary/5 border-primary/10" : "hover:bg-slate-50"
                  )}
                >
                  <div className={clsx(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200",
                    value === role.id ? "bg-primary text-white" : "bg-slate-50 text-slate-400"
                  )}>
                    <role.icon size={24} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={clsx(
                      "font-bold text-[15px] transition-colors duration-200",
                      value === role.id ? "text-primary" : "text-text-main"
                    )}>
                      {role.label}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                      {role.description}
                    </p>
                  </div>

                  {value === role.id && (
                    <div className="w-6 h-6 flex items-center justify-center text-primary">
                      <Check size={18} strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-[12px] text-red-500 font-medium ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
