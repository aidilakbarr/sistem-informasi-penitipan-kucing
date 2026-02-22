import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CaretakerDailyReportPage } from "@/components/dashboard/caretaker/CaretakerDailyReportPage";
export default function Page() {
  return <DashboardLayout role="CARETAKER" userName="Budi Santoso"><CaretakerDailyReportPage /></DashboardLayout>;
}
