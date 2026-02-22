const FEATURES = [
  { icon: "📸", text: "Update foto & video harian" },
  { icon: "📹", text: "Pantau CCTV real-time 24/7" },
  { icon: "📋", text: "Riwayat penitipan lengkap" },
  { icon: "💬", text: "Chat langsung dengan perawat" },
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
    <div className="absolute text-white pointer-events-none" style={style} aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
        <ellipse cx="14" cy="18" rx="7" ry="9" />
        <ellipse cx="32" cy="12" rx="6" ry="8" />
        <ellipse cx="50" cy="18" rx="7" ry="9" />
        <ellipse cx="8" cy="36" rx="5.5" ry="7" />
        <path d="M32 24c-10 0-20 6-18 18 1.5 9 7 14 12 16 2 .7 4 1 6 1s4-.3 6-1c5-2 10.5-7 12-16 2-12-8-18-18-18z" />
      </svg>
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
            <svg className="w-6 h-6 text-white" viewBox="0 0 64 64" fill="currentColor">
              <ellipse cx="14" cy="18" rx="7" ry="9" />
              <ellipse cx="32" cy="12" rx="6" ry="8" />
              <ellipse cx="50" cy="18" rx="7" ry="9" />
              <ellipse cx="8" cy="36" rx="5.5" ry="7" />
              <path d="M32 24c-10 0-20 6-18 18 1.5 9 7 14 12 16 2 .7 4 1 6 1s4-.3 6-1c5-2 10.5-7 12-16 2-12-8-18-18-18z" />
            </svg>
          </div>
          <span className="text-white font-black text-2xl tracking-tight">KucingKu</span>
        </div>
      </div>

      {/* Main copy */}
      <div className="relative z-10 space-y-6">
        <div>
          <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-widest">
            Portal Pemilik
          </p>
          <h2 className="text-white font-black text-4xl leading-tight">
            Pantau si kecil<br />dari mana saja 🐾
          </h2>
          <p className="text-white/75 mt-3 text-sm leading-relaxed max-w-xs">
            Masuk ke dashboard Anda untuk melihat update real-time kucing kesayangan yang sedang dititipkan.
          </p>
        </div>

        {/* Feature list */}
        <ul className="space-y-3">
          {FEATURES.map((f) => (
            <li key={f.text} className="flex items-center gap-3">
              <span className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-base flex-shrink-0">
                {f.icon}
              </span>
              <span className="text-white/90 text-sm font-medium">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Testimonial quote */}
      <div className="relative z-10 bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
        <p className="text-white/90 text-sm leading-relaxed italic mb-3">
          &quot;Tenang pergi liburan karena bisa lihat Mochi lewat CCTV kapan saja. Pelayanannya luar biasa!&quot;
        </p>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-xs">
            RM
          </div>
          <div>
            <p className="text-white font-semibold text-xs">Rina Maulida</p>
            <p className="text-white/60 text-[10px]">Pemilik Mochi & Donut</p>
          </div>
        </div>
      </div>
    </div>
  );
}
