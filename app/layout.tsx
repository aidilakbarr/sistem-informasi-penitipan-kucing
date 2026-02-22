import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "KucingKu — Penitipan Kucing Terpercaya",
  description:
    "Penitipan kucing profesional dengan fasilitas lengkap, staf berpengalaman, dan update harian. Titipkan kucing kesayangan Anda dengan tenang.",
  keywords: [
    "penitipan kucing",
    "cat boarding",
    "grooming kucing",
    "perawatan kucing",
  ],
  openGraph: {
    title: "KucingKu — Penitipan Kucing Terpercaya",
    description:
      "Titipkan kucing kesayangan Anda dengan aman dan penuh kasih sayang.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
