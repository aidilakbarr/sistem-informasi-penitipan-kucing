import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CustomerCatsPage } from "@/components/dashboard/customer/CustomerCatsPage";

export const metadata: Metadata = { title: "Kucing Saya — AnZ Pet Care" };

export default function Page() {
  return (
    <DashboardLayout role="CUSTOMER" userName="Rina Maulida" unreadChat={2}>
      <CustomerCatsPage />
    </DashboardLayout>
  );
}
