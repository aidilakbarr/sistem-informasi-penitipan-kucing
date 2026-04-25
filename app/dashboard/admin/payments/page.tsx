import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { AdminPaymentsPage } from "@/components/dashboard/admin/AdminPaymentsPage";
export default function Page() {
  return (
    <DashboardLayout role="ADMIN" userName="Admin AnZ Pet Care">
      <AdminPaymentsPage />
    </DashboardLayout>
  );
}
