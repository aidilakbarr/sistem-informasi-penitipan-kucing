import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CustomerChatPage } from "@/components/dashboard/customer/CustomerChatPage";
export default function Page() {
  return <DashboardLayout role="CUSTOMER" userName="Rina Maulida"><CustomerChatPage /></DashboardLayout>;
}
