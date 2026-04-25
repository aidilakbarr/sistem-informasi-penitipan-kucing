import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CustomerPaymentsPage } from "@/components/dashboard/customer/CustomerPaymentsPage";

export const metadata: Metadata = { title: "Pembayaran — AnZ Pet Care" };

export default function Page() {
  return (
    <DashboardLayout role="CUSTOMER" userName="Rina Maulida" unreadChat={2}>
      <CustomerPaymentsPage />
    </DashboardLayout>
  );
}
