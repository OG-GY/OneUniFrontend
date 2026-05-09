"use client";

import React from "react";
import { useParams } from "next/navigation";
import { UniversityHeader } from "@/components/university/UniversityHeader";
import { UniversityNav } from "@/components/university/UniversityNav";
import { universities } from "@/lib/mockData";

export default function UniversityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const routeParams = useParams<{ id: string }>();
  const university = universities.find((item) => item.id === routeParams?.id);
  if (!university) {
    return <div className="p-8">Not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UniversityHeader data={university} />
      </div>
      
      <UniversityNav />

      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
