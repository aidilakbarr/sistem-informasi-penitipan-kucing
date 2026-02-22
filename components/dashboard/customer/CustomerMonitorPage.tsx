"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Alert, Btn } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_BOOKINGS, MOCK_DAILY_REPORTS } from "@/lib/mock-data";
import type { DailyReport } from "@/types/dashboard";

const MY_ACTIVE = MOCK_BOOKINGS.filter(b => b.customerId === "u3" && ["ONGOING","CHECKED_IN"].includes(b.status));
const MY_REPORTS = MOCK_DAILY_REPORTS.filter(r =>
  MY_ACTIVE.some(b => b.id === r.bookingId)
);

// Extra mock reports for history
const EXTRA_REPORTS: DailyReport[] = [
  {
    id: "r4", bookingId: "b1", catName: "Mochi", caretakerId: "u2", caretakerName: "Budi Santoso",
    date: "2024-06-14", isEating: true, isDrinking: true, isDefecating: true, isUrinating: true,
    activity: "AKTIF", temperature: 38.4,
    notes: "Mochi bermain seharian, sangat aktif dan lahap makannya!",
    photos: ["/cat1.jpg", "/cat2.jpg", "/cat3.jpg"], isEmergency: false,
  },
  {
    id: "r5", bookingId: "b1", catName: "Mochi", caretakerId: "u2", caretakerName: "Budi Santoso",
    date: "2024-06-13", isEating: true, isDrinking: true, isDefecating: true, isUrinating: true,
    activity: "NORMAL", temperature: 38.2,
    notes: "Hari pertama, Mochi sedikit pemalu tapi mulai beradaptasi.",
    photos: ["/cat4.jpg"], isEmergency: false,
  },
];

const ALL_MY_REPORTS = [...MY_REPORTS, ...EXTRA_REPORTS]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// ─── Health Indicator ─────────────────────────────────────────────────────────
function HealthDot({ ok }: { ok: boolean }) {
  return (
    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ok ? "bg-green-500" : "bg-red-500"}`} />
  );
}

// ─── Report Card ─────────────────────────────────────────────────────────────
function ReportCard({ report, isLatest }: { report: DailyReport; isLatest: boolean }) {
  const [expanded, setExpanded] = useState(isLatest);

  const healthItems = [
    { label: "Makan",  ok: report.isEating },
    { label: "Minum",  ok: report.isDrinking },
    { label: "BAB",    ok: report.isDefecating },
    { label: "BAK",    ok: report.isUrinating },
  ];
  const healthScore = healthItems.filter(h => h.ok).length;

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all ${
      report.isEmergency ? "border-red-200 shadow-sm shadow-red-50" : "border-stone-100"
    }`}>
      {/* Card header - always visible */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-stone-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
            report.isEmergency ? "bg-red-100" : isLatest ? "bg-amber-100" : "bg-stone-100"
          }`}>
            {report.isEmergency ? "🚨" : "📋"}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-stone-900 text-sm">{report.catName}</span>
              {isLatest && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">Terbaru</span>}
              {report.isEmergency && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold animate-pulse">🚨 DARURAT</span>}
            </div>
            <p className="text-xs text-stone-400">
              {new Date(report.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
              {" · "}{report.caretakerName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Quick health summary */}
          <div className="hidden sm:flex items-center gap-1">
            {healthItems.map(h => <HealthDot key={h.label} ok={h.ok} />)}
          </div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            report.activity === "AKTIF" ? "bg-green-100 text-green-700"
            : report.activity === "LEMAS" ? "bg-red-100 text-red-700"
            : "bg-stone-100 text-stone-600"
          }`}>{report.activity}</div>
          <span className="text-stone-400 text-sm">{expanded ? "▲" : "▼"}</span>
        </div>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-stone-50 pt-4">
          {/* Health grid */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {healthItems.map(({ label, ok }) => (
              <div key={label} className={`text-center p-2.5 rounded-xl ${ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                <div className="text-lg mb-0.5">{ok ? "✅" : "❌"}</div>
                <div className="text-[10px] font-bold">{label}</div>
              </div>
            ))}
          </div>

          {/* Score & temp */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-stone-50 rounded-xl p-3 flex items-center gap-2">
              <span className="text-2xl">{healthScore === 4 ? "😸" : healthScore >= 2 ? "😐" : "😿"}</span>
              <div>
                <p className="text-[10px] text-stone-400 font-medium">Skor Kesehatan</p>
                <p className="font-black text-stone-900 text-sm">{healthScore}/4</p>
              </div>
            </div>
            {report.temperature && (
              <div className="flex-1 bg-stone-50 rounded-xl p-3 flex items-center gap-2">
                <span className="text-2xl">🌡️</span>
                <div>
                  <p className="text-[10px] text-stone-400 font-medium">Suhu Tubuh</p>
                  <p className={`font-black text-sm ${report.temperature > 39.2 ? "text-red-600" : "text-stone-900"}`}>
                    {report.temperature}°C
                    {report.temperature > 39.2 && " ⚠️"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          {report.notes && (
            <div className="mb-4">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">Catatan Petugas</p>
              <p className="text-sm text-stone-700 bg-amber-50/50 border border-amber-100 rounded-xl px-4 py-3 italic leading-relaxed">
                "{report.notes}"
              </p>
            </div>
          )}

          {/* Photos */}
          {report.photos.length > 0 && (
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">
                Foto ({report.photos.length})
              </p>
              <div className="flex gap-2 flex-wrap">
                {report.photos.map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center text-3xl cursor-pointer hover:opacity-80 transition-opacity border border-amber-200"
                  >
                    📸
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CustomerMonitorPage() {
  const emergencies = ALL_MY_REPORTS.filter(r => r.isEmergency);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Monitoring Penitipan"
        subtitle="Laporan harian kondisi kucing Anda"
      />

      {emergencies.length > 0 && (
        <Alert type="error" msg={`Ada kondisi DARURAT yang dilaporkan! Segera hubungi admin untuk informasi lebih lanjut.`} />
      )}

      {/* Active booking info */}
      {MY_ACTIVE.length > 0 ? (
        <>
          {MY_ACTIVE.map(b => (
            <div key={b.id} className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-xs font-medium mb-0.5">Sedang dititipkan</p>
                <p className="font-black text-xl">{b.catName}</p>
                <p className="text-amber-100 text-xs">{b.caretakerName} · {b.cageName}</p>
              </div>
              <div className="text-right">
                <p className="text-amber-100 text-xs">{ALL_MY_REPORTS.length} laporan total</p>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-xl text-xs font-bold"
                >
                  💬 Hubungi Admin
                </a>
              </div>
            </div>
          ))}

          {/* Reports list */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-stone-900">Laporan Harian</h2>
              <span className="text-xs text-stone-400">{ALL_MY_REPORTS.length} laporan</span>
            </div>
            {ALL_MY_REPORTS.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center text-stone-400">
                <div className="text-4xl mb-2">📋</div>
                <p className="font-semibold">Belum ada laporan</p>
                <p className="text-xs mt-1">Petugas akan membuat laporan setiap hari</p>
              </div>
            ) : (
              ALL_MY_REPORTS.map((r, i) => (
                <ReportCard key={r.id} report={r} isLatest={i === 0} />
              ))
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-3xl border border-stone-100 p-16 text-center">
          <div className="text-5xl mb-4 select-none">📸</div>
          <h3 className="font-black text-stone-800 text-lg mb-2">Tidak ada penitipan aktif</h3>
          <p className="text-stone-500 text-sm mb-6">
            Monitoring hanya tersedia saat kucing sedang dalam penitipan.
          </p>
          <Btn>📅 Pesan Penitipan</Btn>
        </div>
      )}
    </div>
  );
}
