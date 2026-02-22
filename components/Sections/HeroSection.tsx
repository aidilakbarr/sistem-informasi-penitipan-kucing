import { PawIcon } from "@/components/ui/Icons";
import { STATS } from "@/lib/constants";

const DECO_PAWS = [
  { top: "15%", left: "5%", size: 32, opacity: 0.08, rotate: -15 },
  { top: "70%", left: "8%", size: 24, opacity: 0.06, rotate: 20 },
  { top: "30%", right: "8%", size: 40, opacity: 0.06, rotate: 10 },
  { top: "80%", right: "12%", size: 20, opacity: 0.1, rotate: -25 },
] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-amber-50 overflow-hidden flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-0 w-150 h-150 bg-amber-200/30 rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-orange-200/20 rounded-full blur-3xl -translate-x-1/3" />
        {DECO_PAWS.map((p, i) => (
          <div
            key={i}
            className="absolute text-amber-700"
            style={{
              top: p.top,
              left: "left" in p ? p.left : undefined,
              right: "right" in p ? p.right : undefined,
              opacity: p.opacity,
              transform: `rotate(${p.rotate}deg)`,
              width: p.size,
              height: p.size,
            }}
          >
            <PawIcon className="w-full h-full" />
          </div>
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <span>🐾</span> Penitipan Kucing Terpercaya #1 di Kota
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-stone-900 leading-tight mb-6">
            Titipkan{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-amber-500">Kucingmu</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-amber-200/60 rounded-sm z-0" />
            </span>
            <br />
            dengan Aman &<br />
            Penuh Kasih 🐱
          </h1>

          <p className="text-stone-600 text-lg leading-relaxed mb-8 max-w-md">
            Kami merawat kucing kesayangan Anda layaknya anggota keluarga
            sendiri — dengan fasilitas bersih, staf berpengalaman, dan update
            real-time setiap hari.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href="#pesan"
              className="px-7 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-base rounded-full transition-all shadow-lg shadow-amber-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              Pesan Sekarang
            </a>
            <a
              href="#layanan"
              className="px-7 py-3.5 bg-white hover:bg-stone-50 text-stone-700 font-bold text-base rounded-full transition-all border border-stone-200 hover:border-stone-300"
            >
              Lihat Layanan
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-stone-900">
                  {s.val}
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div className="relative flex justify-center">
          <div className="relative">
            <div className="w-72 h-80 bg-linear-to-br from-amber-300 to-orange-400 rounded-[2.5rem] flex items-end justify-center overflow-hidden shadow-2xl shadow-amber-200">
              <div className="text-[180px] leading-none select-none -mb-2.5">
                🐱
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-6 -left-10 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2.5">
              <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-lg">
                ✅
              </div>
              <div>
                <div className="text-xs font-bold text-stone-800">
                  Vaksin Verified
                </div>
                <div className="text-[10px] text-stone-500">
                  Aman & terpercaya
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-8 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2.5">
              <div className="text-xl">📸</div>
              <div>
                <div className="text-xs font-bold text-stone-800">
                  Update Harian
                </div>
                <div className="text-[10px] text-stone-500">
                  Foto & video kucing
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-14 bg-amber-500 rounded-2xl shadow-lg p-3 text-white">
              <div className="text-xs font-bold">24/7</div>
              <div className="text-[10px] opacity-80">Pemantauan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
