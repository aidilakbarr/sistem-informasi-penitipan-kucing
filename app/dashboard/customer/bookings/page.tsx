import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CustomerBookingsPage } from "@/components/dashboard/customer/CustomerBookingsPage";

export const metadata: Metadata = { title: "Riwayat Booking — KucingKu" };

export default function Page() {
  return (
    <DashboardLayout role="CUSTOMER" userName="Rina Maulida" unreadChat={2}>
      <CustomerBookingsPage />
    </DashboardLayout>
  );
}
