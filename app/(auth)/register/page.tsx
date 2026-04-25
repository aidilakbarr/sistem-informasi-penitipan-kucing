import type { Metadata } from "next";
import Link from "next/link";
import { PawIcon } from "@/components/ui/Icons";
import { RegisterForm } from "@/components/auth/RegisterForm";
// Import Ikon Profesional
import {
  ClipboardList,
  Camera,
  Bell,
  CreditCard,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Daftar — AnZ Pet Care",
  description:
    "Buat akun gratis dan titipkan kucing kesayangan Anda dengan mudah.",
};

const BENEFITS = [
  {
    icon: ClipboardList,
    title: "Riwayat Penitipan",
    desc: "Pantau semua riwayat penitipan dalam satu dashboard.",
  },
  {
    icon: Camera,
    title: "Galeri Foto Harian",
    desc: "Terima foto & video kucing Anda langsung di akun.",
  },
  {
    icon: Bell,
    title: "Notifikasi Real-time",
    desc: "Update status penitipan langsung ke HP Anda.",
  },
  {
    icon: CreditCard,
    title: "Pembayaran Mudah",
    desc: "Berbagai metode pembayaran tersedia untuk Anda.",
  },
];

const STEPS = [
  { num: "01", label: "Isi data diri" },
  { num: "02", label: "Verifikasi" },
  { num: "03", label: "Mulai pesan" },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-amber-50 flex">
      {/* ── Left Panel (decorative) ── */}
      <aside className="hidden lg:flex lg:w-[45%] relative bg-stone-900 flex-col justify-between overflow-hidden p-12">
        {/* Background blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Top logo */}
        <Link href="/" className="relative flex items-center gap-3 group w-fit">
          <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/30 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
            <PawIcon className="w-5 h-5 text-amber-400" />
          </div>
          <span className="font-black text-xl text-white tracking-tight">
            AnZ Pet Care
          </span>
        </Link>

        {/* Center Content */}
        <div className="relative">
          <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-8">
            <ShieldCheck
              className="w-10 h-10 text-amber-500"
              strokeWidth={1.5}
            />
          </div>

          <h2 className="text-4xl font-black text-white leading-tight mb-4 text-balance">
            Bergabung & percayakan Anabul kepada kami
          </h2>
          <p className="text-stone-400 text-base leading-relaxed max-w-xs mb-10">
            Daftar gratis dan nikmati kemudahan memantau serta memesan layanan
            penitipan kapan saja.
          </p>

          {/* Benefits list */}
          <div className="space-y-6">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-amber-500 flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">{title}</p>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-[240px]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps footer */}
        <div className="relative border-t border-white/5 pt-8">
          <p className="text-[10px] text-stone-500 font-black uppercase tracking-[0.2em] mb-5">
            Proses Pendaftaran
          </p>
          <div className="flex items-center gap-0">
            {STEPS.map(({ num, label }, i) => (
              <div key={num} className="flex items-center">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-black text-amber-500">
                      {num}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-bold uppercase tracking-wider">
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-stone-700 mx-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Right Panel (form) ── */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-10">
        <Link
          href="/"
          className="lg:hidden flex items-center gap-2.5 mb-8 group"
        >
          <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform shadow-lg shadow-amber-200">
            <PawIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl text-stone-800 tracking-tight">
            AnZ <span className="text-amber-500">Pet Care</span>
          </span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-stone-900 mb-2">
              Buat Akun Baru
            </h1>
            <p className="text-stone-500 text-sm font-medium">
              Gabung dengan komunitas pecinta kucing di Kolaka.
            </p>
          </div>

          {/* Social register */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 rounded-xl text-sm font-bold text-stone-700 transition-all mb-6 shadow-sm group"
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Lanjutkan dengan Google
          </button>

          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest whitespace-nowrap">
              Atau gunakan email
            </span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <RegisterForm />

          <p className="mt-8 text-sm text-stone-500 text-center">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-amber-600 hover:text-amber-700 font-bold"
            >
              Masuk sekarang
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
