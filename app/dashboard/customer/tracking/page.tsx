import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CustomerTrackingPage } from "@/components/dashboard/customer/CustomerTrackingPage";
export default function Page() {
  return <DashboardLayout role="CUSTOMER" userName="Rina Maulida"><CustomerTrackingPage /></DashboardLayout>;
}
