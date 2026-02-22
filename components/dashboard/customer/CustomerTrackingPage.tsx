"use client";

import { PageHeader, SectionCard, Alert } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_DELIVERY_TASKS } from "@/lib/mock-data";
import { DELIVERY_STATUS_CONFIG } from "@/lib/dashboard-utils";

const MY_TASK = MOCK_DELIVERY_TASKS.find((t) => t.status !== "SAMPAI_TUJUAN") ?? MOCK_DELIVERY_TASKS[0];

const STEPS: { key: keyof typeof DELIVERY_STATUS_CONFIG; label: string; desc: string; icon: string }[] = [
  { key: "MENUJU_LOKASI",    label: "Menuju Lokasi",    desc: "Kurir sedang dalam perjalanan ke alamat Anda", icon: "🛵" },
  { key: "KUCING_DIJEMPUT",  label: "Kucing Dijemput",  desc: "Kurir telah menjemput kucing Anda",            icon: "🐱" },
  { key: "DALAM_PERJALANAN", label: "Dalam Perjalanan", desc: "Kucing dalam perjalanan ke tujuan",            icon: "🚗" },
  { key: "SAMPAI_TUJUAN",    label: "Sampai Tujuan",    desc: "Kucing telah tiba di tujuan",                  icon: "✅" },
];

export function CustomerTrackingPage() {
  if (!MY_TASK) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <div className="text-5xl mb-3">🛵</div>
        <p className="font-bold text-stone-600">Tidak ada pengiriman aktif</p>
        <p className="text-sm text-stone-400">Tracking kurir hanya tersedia untuk booking dengan layanan antar-jemput.</p>
      </div>
    );
  }

  const currentStep = DELIVERY_STATUS_CONFIG[MY_TASK.status].step;

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <PageHeader title="Tracking Kurir" subtitle="Pantau status pengiriman kucing Anda" />

      {MY_TASK.status !== "SAMPAI_TUJUAN" && (
        <Alert type="info" msg={`Kurir ${MY_TASK.courierId === "u4" ? "Agus Delivery" : "Kurir"} sedang aktif untuk booking ${MY_TASK.bookingCode}`} />
      )}

      {/* Active tracking card */}
      <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-stone-400 text-xs mb-1">Booking</p>
            <p className="font-mono text-sm">{MY_TASK.bookingCode}</p>
          </div>
          <div className="text-right">
            <p className="text-stone-400 text-xs mb-1">Tipe</p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${MY_TASK.type === "PICKUP" ? "bg-blue-500/20 text-blue-300" : "bg-green-500/20 text-green-300"}`}>
              {MY_TASK.type === "PICKUP" ? "🐱 Penjemputan" : "🏠 Pengantaran"}
            </span>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-stone-400 text-xs mb-1">Alamat</p>
          <p className="text-sm font-medium leading-snug">{MY_TASK.address}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-xl">🛵</div>
          <div>
            <p className="font-bold text-sm">Kucing: {MY_TASK.catName}</p>
            <p className="text-stone-400 text-xs">Jadwal: {MY_TASK.scheduledAt}</p>
          </div>
        </div>
      </div>

      {/* Step progress */}
      <SectionCard title="Status Pengiriman">
        <div className="p-6">
          <div className="space-y-0">
            {STEPS.map((s, i) => {
              const stepNum = i + 1;
              const done    = stepNum < currentStep;
              const current = stepNum === currentStep;
              const future  = stepNum > currentStep;
              return (
                <div key={s.key} className="flex gap-4">
                  {/* Line + dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 transition-all ${
                      done    ? "bg-green-500 text-white"
                      : current ? "bg-amber-500 text-white ring-4 ring-amber-100"
                      : "bg-stone-100 text-stone-400"
                    }`}>
                      {done ? "✓" : s.icon}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`w-0.5 h-8 my-1 ${done ? "bg-green-300" : "bg-stone-100"}`} />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-6 flex-1 ${i === STEPS.length - 1 ? "pb-0" : ""}`}>
                    <p className={`font-bold text-sm ${current ? "text-amber-600" : done ? "text-stone-700" : "text-stone-400"}`}>
                      {s.label}
                      {current && <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Sekarang</span>}
                    </p>
                    <p className={`text-xs mt-0.5 ${done || current ? "text-stone-500" : "text-stone-300"}`}>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionCard>

      {/* Contact courier */}
      <a
        href={`https://wa.me/6281200000004?text=Halo, saya ingin menanyakan status pengiriman ${MY_TASK.bookingCode}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition-colors"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a11.5 11.5 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.136 1.535 5.875L.057 23.785a.5.5 0 00.612.64l6.041-1.586A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.848 0-3.572-.498-5.053-1.367l-.36-.214-3.734.979.997-3.647-.232-.375A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
        Hubungi Kurir via WhatsApp
      </a>
    </div>
  );
}
