import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { AdminDashboard } from "@/components/dashboard/admin/AdminDashboard";

export const metadata: Metadata = { title: "Dashboard Admin — AnZ Pet Care" };

export default function AdminPage() {
  return (
    <DashboardLayout role="ADMIN" userName="Admin AnZ Pet Care" unreadChat={3}>
      <AdminDashboard />
    </DashboardLayout>
  );
}
