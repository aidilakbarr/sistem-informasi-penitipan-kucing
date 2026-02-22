import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { AdminCagesPage } from "@/components/dashboard/admin/AdminCagesPage";
export default function Page() {
  return <DashboardLayout role="ADMIN" userName="Admin KucingKu"><AdminCagesPage /></DashboardLayout>;
}
