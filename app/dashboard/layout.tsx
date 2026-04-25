"use client";

import { useAuthStore } from "@/store/auth";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();

  return (
    <DashboardLayout
      role={user?.role || "CUSTOMER"}
      userName={user?.name || "User"}
      unreadChat={2}
    >
      {children}
    </DashboardLayout>
  );
}
