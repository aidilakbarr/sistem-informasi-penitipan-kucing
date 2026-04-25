import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { AdminUsersPage } from "@/components/dashboard/admin/AdminUsersPage";
export default function Page() {
  return (
    <DashboardLayout role="ADMIN" userName="Admin AnZ Pet Care">
      <AdminUsersPage />
    </DashboardLayout>
  );
}
