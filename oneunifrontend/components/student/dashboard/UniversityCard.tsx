"use client";

import { Building2, MapPin, Trophy, BookOpen, School, ArrowRight, Banknote, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

interface UniversityCardProps {
  id: string;
  name: string;
  logo?: string;
  image?: string;
  location: string;
  ranking: number;
  established: string;
  programCount: number;
  minFee: string;
  campuses: number;
}

export function UniversityCard({
  id,
  name,
  logo,
  image,
  location,
  ranking,
  established,
  programCount,
  minFee,
  campuses,
}: UniversityCardProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/student/university/${id}`)}
      className="group bg-white rounded-3xl border border-slate-100 shadow-sm transition-all duration-300 flex flex-col cursor-pointer overflow-hidden p-6 hover:border-primary/20"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 group-hover:scale-105 transition-all duration-300">
          {logo ? (
            <img src={logo} alt="logo" className="w-full h-full object-contain" />
          ) : (
            <Building2 className="text-slate-400" size={32} />
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100 flex items-center gap-1 shadow-sm">
             <Trophy size={10} className="fill-amber-600" /> 
             <span>Rank #{ranking}</span>
          </div>
          <div className="bg-slate-50 text-slate-500 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border border-slate-100">
             Est. {established}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
         <div className="mb-5">
            <h3 className="font-bold text-slate-900 text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2">
               {name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-text-muted font-medium">
               <MapPin size={14} className="text-primary shrink-0" /> 
               <span className="line-clamp-1">{location}</span>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50">
               <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <BookOpen size={14} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Programs</span>
               </div>
               <p className="text-xl font-bold text-slate-900">{programCount}+</p>
            </div>
            
            <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50">
               <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <Banknote size={14} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Avg. Fee</span>
               </div>
               <p className="text-xl font-bold text-slate-900">{minFee.split(' ')[0]} <span className="text-xs font-medium text-slate-400">/sem</span></p>
            </div>
         </div>

         <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100">
               <School size={14} className="text-purple-600" />
               <span className="text-[10px] font-semibold text-purple-700 uppercase tracking-wider">{campuses} Campus</span>
            </div>
            
            <div className="flex items-center gap-2 text-primary px-4 py-2 rounded-xl transition-all group-hover:bg-primary/10 group-hover:backdrop-blur-md">
               <span className="text-xs font-bold uppercase tracking-wider">Details</span>
               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
         </div>
      </div>
    </div>
  );
}
