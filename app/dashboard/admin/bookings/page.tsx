import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { AdminBookingsPage } from "@/components/dashboard/admin/AdminBookingsPage";
export default function Page() {
  return <DashboardLayout role="ADMIN" userName="Admin KucingKu"><AdminBookingsPage /></DashboardLayout>;
}
