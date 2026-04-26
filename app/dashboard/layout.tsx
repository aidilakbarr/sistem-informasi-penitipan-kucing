import AuthProvider from "@/components/auth/AuthProvider";
import ClientLayout from "@/components/dashboard/layout/ClientLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ClientLayout>{children}</ClientLayout>
    </AuthProvider>
  );
}
