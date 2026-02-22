import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CourierDashboard } from "@/components/dashboard/courier/CourierDashboard";
export default function Page() {
  return <DashboardLayout role="COURIER" userName="Agus Delivery"><CourierDashboard /></DashboardLayout>;
}
