"use client";

import { useAuthStore } from "@/store/auth";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthChecked } = useAuthStore();

  if (!isAuthChecked) {
    return (
      <DashboardLayout role="CUSTOMER" userName="..." unreadChat={0}>
        <div className="p-6 animate-pulse">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-3">
              <div className="h-8 w-64 bg-orange-100 rounded-lg"></div>
              <div className="h-4 w-40 bg-orange-50 rounded"></div>
            </div>
            {/* Ikon Jejak Kaki (Paw) Pulse */}
            <div className="text-orange-200">
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM6.5 4.5C5.4 4.5 4.5 5.4 4.5 6.5C4.5 7.6 5.4 8.5 6.5 8.5C7.6 8.5 8.5 7.6 8.5 6.5C8.5 5.4 7.6 4.5 6.5 4.5ZM17.5 4.5C16.4 4.5 15.5 5.4 15.5 6.5C15.5 7.6 16.4 8.5 17.5 8.5C18.6 8.5 19.5 7.6 19.5 6.5C19.5 5.4 18.6 4.5 17.5 4.5ZM12 9C9.2 9 7 11.2 7 14C7 16.8 9.2 19 12 19C14.8 19 17 16.8 17 14C17 11.2 14.8 9 12 9Z" />
              </svg>
            </div>
          </div>

          {/* Grid Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-orange-50/50 border border-orange-100 rounded-2xl p-4 space-y-3"
              >
                <div className="h-4 w-1/2 bg-orange-100 rounded"></div>
                <div className="h-8 w-3/4 bg-orange-100 rounded"></div>
              </div>
            ))}
          </div>

          {/* Main Content Area Skeleton */}
          <div className="h-64 bg-gray-50 border border-dashed border-gray-200 rounded-3xl flex items-center justify-center">
            <div className="text-gray-300 flex flex-col items-center gap-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
