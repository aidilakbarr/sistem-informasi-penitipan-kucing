import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { AdminChatPage } from "@/components/dashboard/admin/AdminChatPage";

export const metadata: Metadata = { title: "Chat Admin — AnZ Pet Care" };

export default function Page() {
  return (
    <DashboardLayout role="ADMIN" userName="Admin AnZ Pet Care" unreadChat={3}>
      <AdminChatPage />
    </DashboardLayout>
  );
}
