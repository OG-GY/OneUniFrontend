import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function MenteeLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="student">{children}</DashboardLayout>;
}
