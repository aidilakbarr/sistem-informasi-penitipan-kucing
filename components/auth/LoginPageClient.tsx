import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginDecorativePanel } from "@/components/auth/LoginDecorativePanel";
import { PawIcon } from "@/components/ui/Icons";
import { ChevronLeft, Heart } from "lucide-react";

export default function LoginPageClient() {
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
              {/* Gunakan PawIcon Anda di sini */}
              <PawIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg text-stone-800">
              AnZ <span className="text-amber-500">Pet Care</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-stone-500 hover:text-amber-600 font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali
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
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Kembali ke beranda
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-stone-900 mb-2">
                Selamat datang
              </h1>
              <p className="text-stone-500 text-sm leading-relaxed">
                Masuk ke akun Anda untuk melihat perkembangan kucing kesayangan
                secara langsung.
              </p>
            </div>

            {/* The form */}
            <LoginForm />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-stone-400 mb-1">
            <span>© 2026 AnZ Pet Care · Made with</span>
            <Heart className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>for cat lovers</span>
          </div>
          <p className="text-xs text-stone-400">
            <Link
              href="/privacy"
              className="hover:text-amber-500 transition-colors"
            >
              Privasi
            </Link>{" "}
            ·{" "}
            <Link
              href="/terms"
              className="hover:text-amber-500 transition-colors"
            >
              Syarat & Ketentuan
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
