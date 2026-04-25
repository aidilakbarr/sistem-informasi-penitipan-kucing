import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CourierHistoryPage } from "@/components/dashboard/courier/CourierHistoryPage";

export const metadata: Metadata = { title: "Riwayat Tugas — AnZ Pet Care" };

export default function Page() {
  return (
    <DashboardLayout role="COURIER" userName="Agus Delivery">
      <CourierHistoryPage />
    </DashboardLayout>
  );
}
