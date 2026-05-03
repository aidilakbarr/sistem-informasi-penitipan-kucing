import type { Metadata } from "next";
import { CustomerPaymentsPage } from "@/components/dashboard/customer/CustomerPaymentsPage";

export const metadata: Metadata = { title: "Pembayaran — AnZ Pet Care" };

export default function Page() {
  return <CustomerPaymentsPage />;
}
