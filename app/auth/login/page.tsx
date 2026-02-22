import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginDecorativePanel } from "@/components/auth/LoginDecorativePanel";

export const metadata: Metadata = {
  title: "Masuk — KucingKu",
  description: "Masuk ke akun KucingKu Anda untuk memantau kucing kesayangan.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — decorative panel */}
      <LoginDecorativePanel />

      {/* Right — form panel */}
      <div className="flex flex-col min-h-screen bg-amber-50/40">
        {/* Top bar mobile logo */}
        <div className="lg:hidden flex items-center justify-between px-6 pt-6 pb-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform">
              <svg className="w-4 h-4 text-white" viewBox="0 0 64 64" fill="currentColor">
                <ellipse cx="14" cy="18" rx="7" ry="9" />
                <ellipse cx="32" cy="12" rx="6" ry="8" />
                <ellipse cx="50" cy="18" rx="7" ry="9" />
                <ellipse cx="8" cy="36" rx="5.5" ry="7" />
                <path d="M32 24c-10 0-20 6-18 18 1.5 9 7 14 12 16 2 .7 4 1 6 1s4-.3 6-1c5-2 10.5-7 12-16 2-12-8-18-18-18z" />
              </svg>
            </div>
            <span className="font-black text-lg text-stone-800">
              Kucing<span className="text-amber-500">Ku</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-stone-500 hover:text-amber-600 font-medium transition-colors"
          >
            ← Kembali
          </Link>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Back link desktop */}
            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-600 font-medium transition-colors mb-8 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke beranda
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-stone-900 mb-2">
                Selamat datang 👋
              </h1>
              <p className="text-stone-500 text-sm">
                Masuk ke akun Anda untuk melihat perkembangan kucing kesayangan.
              </p>
            </div>

            {/* The form */}
            <LoginForm />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 text-center">
          <p className="text-xs text-stone-400">
            © 2024 KucingKu · Made with 🐾 ·{" "}
            <Link href="/privacy" className="hover:text-amber-500 transition-colors">
              Privasi
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="hover:text-amber-500 transition-colors">
              Syarat & Ketentuan
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
