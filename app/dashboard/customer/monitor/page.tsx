import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CustomerMonitorPage } from "@/components/dashboard/customer/CustomerMonitorPage";

export const metadata: Metadata = { title: "Monitoring Penitipan — KucingKu" };

export default function Page() {
  return (
    <DashboardLayout role="CUSTOMER" userName="Rina Maulida" unreadChat={2}>
      <CustomerMonitorPage />
    </DashboardLayout>
  );
}
