import type { Metadata } from "next";
import { CustomerCatsPage } from "@/components/dashboard/customer/CustomerCatsPage";

export const metadata: Metadata = { title: "Kucing Saya — AnZ Pet Care" };

export default function Page() {
  return <CustomerCatsPage />;
}
