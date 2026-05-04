import type { Metadata } from "next";
import { CustomerMonitorPage } from "@/components/dashboard/customer/CustomerMonitorPage";

export const metadata: Metadata = {
  title: "Monitoring Penitipan — AnZ Pet Care",
};

export default function Page() {
  return <CustomerMonitorPage />;
}
