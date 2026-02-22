import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CustomerBookingPage } from "@/components/dashboard/customer/CustomerBookingPage";
export default function Page() {
  return <DashboardLayout role="CUSTOMER" userName="Rina Maulida"><CustomerBookingPage /></DashboardLayout>;
}
