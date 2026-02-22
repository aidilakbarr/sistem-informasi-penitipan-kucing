import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CaretakerDashboard } from "@/components/dashboard/caretaker/CaretakerDashboard";
export default function Page() {
  return <DashboardLayout role="CARETAKER" userName="Budi Santoso"><CaretakerDashboard /></DashboardLayout>;
}
