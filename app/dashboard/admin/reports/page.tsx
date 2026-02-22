import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { AdminReportsPage } from "@/components/dashboard/admin/AdminReportsPage";

export const metadata: Metadata = { title: "Laporan & Analitik — KucingKu" };

export default function Page() {
  return (
    <DashboardLayout role="ADMIN" userName="Admin KucingKu">
      <AdminReportsPage />
    </DashboardLayout>
  );
}
