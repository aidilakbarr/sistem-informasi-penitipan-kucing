import LoginPageClient from "@/components/auth/LoginPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk — AnZ Pet Care",
  description: "Masuk ke akun Anda untuk memantau kucing kesayangan.",
};

export default function Page() {
  return <LoginPageClient />;
}
