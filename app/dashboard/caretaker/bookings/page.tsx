import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { CaretakerBookingsPage } from "@/components/dashboard/caretaker/CaretakerBookingsPage";

export const metadata: Metadata = { title: "Booking Ditugaskan — KucingKu" };

export default function Page() {
  return (
    <DashboardLayout role="CARETAKER" userName="Budi Santoso">
      <CaretakerBookingsPage />
    </DashboardLayout>
  );
}
