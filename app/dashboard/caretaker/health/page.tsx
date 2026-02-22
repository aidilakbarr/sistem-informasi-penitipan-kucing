import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CaretakerHealthPage } from "@/components/dashboard/caretaker/CaretakerHealthPage";

export const metadata: Metadata = { title: "Catatan Kesehatan — KucingKu" };

export default function Page() {
  return (
    <DashboardLayout role="CARETAKER" userName="Budi Santoso">
      <CaretakerHealthPage />
    </DashboardLayout>
  );
}
