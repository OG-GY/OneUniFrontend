"use client";

import { ProgramList } from "@/components/university/ProgramList";
import { universities } from "@/lib/mockData";
import { useParams } from "next/navigation";

export default function UniversityProgramsPage() {
  const params = useParams();
  const universityData = universities.find((item) => item.id === params.id);
  if (!universityData) return <div className="p-8">Not found</div>;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProgramList departments={universityData.departments} />
    </div>
  );
}
