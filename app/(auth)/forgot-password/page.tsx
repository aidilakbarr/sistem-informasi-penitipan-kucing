import type { Metadata } from "next";
import Link from "next/link";
import { PawIcon } from "@/components/ui/Icons";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Lupa Password — AnZ Pet Care",
  description: "Reset password akun Anda melalui verifikasi email.",
};

const TIPS = [
  { icon: "📧", text: "Cek folder Spam atau Junk jika email tidak masuk" },
  { icon: "⏱️", text: "Kode OTP berlaku selama 10 menit" },
  { icon: "🔒", text: "Jangan bagikan kode OTP kepada siapapun" },
  { icon: "🔑", text: "Gunakan password yang kuat dan unik" },
];

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-amber-50 flex">
      {/* ── Left Panel ── */}
      <aside className="hidden lg:flex lg:w-[42%] relative bg-gradient-to-br from-stone-800 to-stone-900 flex-col justify-between overflow-hidden p-12">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-600/8 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-3 group w-fit">
          <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/30 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
            <PawIcon className="w-5 h-5 text-amber-400" />
          </div>
          <span className="font-black text-xl text-white tracking-tight">
            AnZ Pet Care
          </span>
        </Link>

        {/* Center */}
        <div className="relative">
          <div className="text-6xl mb-6 select-none">🔐</div>
          <h2 className="text-3xl font-black text-white leading-snug mb-4">
            Tenang, kami
            <br />
            bantu reset
            <br />
            password Anda
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed max-w-xs mb-8">
            Ikuti 3 langkah mudah untuk mendapatkan kembali akses ke akun Anda.
          </p>

          <div className="space-y-3">
            {TIPS.map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
                  {icon}
                </div>
                <p className="text-stone-400 text-sm leading-snug pt-1">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative">
          <p className="text-stone-600 text-xs">
            Butuh bantuan?{" "}
            <a
              href="mailto:hello@kucingku.id"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              hello@kucingku.id
            </a>
          </p>
        </div>
      </aside>

      {/* ── Right Panel ── */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Mobile logo */}
        <Link
          href="/"
          className="lg:hidden flex items-center gap-2.5 mb-10 group"
        >
          <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform">
            <PawIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl text-stone-800">
            AnZ <span className="text-amber-500">Pet Care</span>
          </span>
        </Link>

        <div className="w-full max-w-md">
          <ForgotPasswordForm />
        </div>
      </main>
    </div>
  );
}
