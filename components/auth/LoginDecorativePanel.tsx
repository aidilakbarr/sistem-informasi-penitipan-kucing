import { PawIcon } from "@/components/ui/Icons";
import {
  Camera,
  Video,
  ClipboardList,
  MessageSquare,
  Quote,
} from "lucide-react";

// Ganti emoji icon dengan komponen Lucide
const FEATURES = [
  { icon: Camera, text: "Update foto & video harian" },
  { icon: Video, text: "Pantau CCTV real-time 24/7" },
  { icon: ClipboardList, text: "Riwayat penitipan lengkap" },
  { icon: MessageSquare, text: "Chat langsung dengan perawat" },
];

const DECO_PAWS = [
  { top: "10%", left: "8%", size: 44, opacity: 0.12, rotate: -15 },
  { top: "65%", left: "5%", size: 28, opacity: 0.08, rotate: 20 },
  { top: "25%", right: "6%", size: 36, opacity: 0.1, rotate: 10 },
  { top: "80%", right: "10%", size: 22, opacity: 0.09, rotate: -30 },
  { top: "48%", left: "45%", size: 18, opacity: 0.07, rotate: 45 },
];

function DecoPaw({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute text-white pointer-events-none"
      style={style}
      aria-hidden="true"
    >
      {/* Gunakan PawIcon kustom Anda sebagai ganti SVG mentah */}
      <PawIcon className="w-full h-full" />
    </div>
  );
}

export function LoginDecorativePanel() {
  return (
    <div className="hidden lg:flex relative w-full h-full bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 flex-col justify-between p-12 overflow-hidden">
      {/* Deco paws */}
      {DECO_PAWS.map((p, i) => (
        <DecoPaw
          key={i}
          style={{
            top: p.top,
            left: "left" in p ? p.left : undefined,
            right: "right" in p ? (p as { right: string }).right : undefined,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
            width: p.size,
            height: p.size,
          }}
        />
      ))}

      {/* Blob decoration */}
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-orange-400/40 rounded-full blur-3xl" />
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-yellow-300/30 rounded-full blur-2xl" />

      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            {/* PawIcon pada logo */}
            <PawIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-black text-2xl tracking-tight">
            AnZ Pet Care
          </span>
        </div>
      </div>

      {/* Main copy */}
      <div className="relative z-10 space-y-8">
        <div>
          <p className="text-white/70 text-[10px] font-black mb-3 uppercase tracking-[0.2em]">
            Portal Pemilik
          </p>
          <h2 className="text-white font-black text-4xl leading-tight">
            Pantau si kecil
            <br />
            dari mana saja
          </h2>
          <p className="text-white/75 mt-4 text-sm leading-relaxed max-w-xs font-medium">
            Masuk ke dashboard Anda untuk melihat update berkala kucing
            kesayangan yang sedang dititipkan.
          </p>
        </div>

        {/* Feature list */}
        <ul className="space-y-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <li key={f.text} className="flex items-center gap-4">
                <div className="w-9 h-9 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10 text-white">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <span className="text-white/90 text-sm font-bold">
                  {f.text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Testimonial quote */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
        <div className="flex gap-1 text-amber-300 mb-3">
          <Quote className="w-4 h-4 rotate-180 fill-current opacity-50" />
        </div>
        <p className="text-white/90 text-sm leading-relaxed font-medium italic mb-4">
          &quot;Tenang pergi liburan karena bisa lihat Mochi lewat CCTV kapan
          saja. Pelayanannya benar-benar luar biasa!&quot;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-white/30 to-white/10 border border-white/20 flex items-center justify-center text-white font-black text-[10px]">
            RM
          </div>
          <div>
            <p className="text-white font-black text-xs">Rina Maulida</p>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">
              Pemilik Mochi & Donut
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
