import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="mentor">{children}</DashboardLayout>;
}
