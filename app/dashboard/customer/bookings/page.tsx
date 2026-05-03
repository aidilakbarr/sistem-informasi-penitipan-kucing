import type { Metadata } from "next";
import { CustomerBookingsPage } from "@/components/dashboard/customer/CustomerBookingsPage";

export const metadata: Metadata = { title: "Riwayat Booking — AnZ Pet Care" };

export default function Page() {
  return <CustomerBookingsPage />;
}
