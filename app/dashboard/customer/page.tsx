import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CustomerDashboard } from "@/components/dashboard/customer/CustomerDashboard";
export default function Page() {
  return <DashboardLayout role="CUSTOMER" userName="Rina Maulida" unreadChat={2}><CustomerDashboard /></DashboardLayout>;
}
