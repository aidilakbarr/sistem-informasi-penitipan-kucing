"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Badge, Btn, Alert } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_BOOKINGS, MOCK_DAILY_REPORTS } from "@/lib/mock-data";
import { BOOKING_STATUS_CONFIG, PAYMENT_STATUS_CONFIG, formatDate, SERVICE_LABELS } from "@/lib/dashboard-utils";
import type { Booking } from "@/types/dashboard";

const ASSIGNED = MOCK_BOOKINGS.filter((b) => b.caretakerId === "u2");

export function CaretakerBookingsPage() {
  const [selected, setSelected] = useState<Booking | null>(null);

  const activeCount = ASSIGNED.filter(b => !["COMPLETED","CANCELLED"].includes(b.status)).length;
  const emergencyReport = MOCK_DAILY_REPORTS.find(r => r.caretakerId === "u2" && r.isEmergency);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Booking Ditugaskan"
        subtitle={`${ASSIGNED.length} total · ${activeCount} aktif`}
      />

      {emergencyReport && (
        <Alert type="error" msg={`🚨 DARURAT: ${emergencyReport.catName} perlu penanganan segera!`} />
      )}

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Left: list */}
        <div className="space-y-3">
          {ASSIGNED.map((b) => {
            const bConf = BOOKING_STATUS_CONFIG[b.status];
            const report = MOCK_DAILY_REPORTS.find(r => r.bookingId === b.id);
            const isActive = !["COMPLETED","CANCELLED"].includes(b.status);
            return (
              <div
                key={b.id}
                onClick={() => setSelected(b)}
                className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all hover:border-amber-300 hover:shadow-sm ${
                  selected?.id === b.id ? "border-amber-400 shadow-md shadow-amber-50" : "border-stone-100"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                      report?.isEmergency ? "bg-red-100" : isActive ? "bg-amber-50" : "bg-stone-100"
                    }`}>
                      🐱
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-stone-900">{b.catName}</span>
                        {report?.isEmergency && (
                          <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold animate-pulse">🚨 DARURAT</span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500">Pemilik: {b.customerName}</p>
                    </div>
                  </div>
                  <Badge label={bConf.label} color={bConf.color} bg={bConf.bg} dot={bConf.dot} size="sm" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                  <div className="bg-stone-50 rounded-lg p-2">
                    <p className="text-stone-400">Check-in</p>
                    <p className="font-semibold text-stone-700">{formatDate(b.checkIn)}</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-2">
                    <p className="text-stone-400">Check-out</p>
                    <p className="font-semibold text-stone-700">{formatDate(b.checkOut)}</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-2">
                    <p className="text-stone-400">Kandang</p>
                    <p className="font-semibold text-stone-700">{b.cageName ?? "—"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {b.services.map(s => (
                      <span key={s} className="text-[10px] bg-amber-50 text-amber-700 border border-amber-100 px-1.5 py-0.5 rounded-full font-medium">
                        {SERVICE_LABELS[s]}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    {report ? (
                      <span className="text-[10px] text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-semibold">✓ Sudah Lapor</span>
                    ) : isActive ? (
                      <Btn size="sm">+ Laporan</Btn>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: detail panel */}
        {selected ? (
          <div className="sticky top-6 bg-white rounded-2xl border border-stone-100 overflow-hidden">
            <div className="bg-amber-50 px-5 py-4 border-b border-amber-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-stone-900">{selected.catName}</h3>
                  <p className="text-xs text-stone-500">{selected.bookingCode}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-stone-400 hover:text-stone-600 text-xl">✕</button>
              </div>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">Info Pemilik</p>
                <p className="font-semibold text-stone-800">{selected.customerName}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">Jadwal</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Check-in</span>
                    <span className="font-medium">{formatDate(selected.checkIn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Check-out</span>
                    <span className="font-medium">{formatDate(selected.checkOut)}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">Layanan</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.services.map(s => (
                    <span key={s} className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2 py-1 rounded-lg font-medium">
                      {SERVICE_LABELS[s]}
                    </span>
                  ))}
                </div>
              </div>
              {selected.notes && (
                <div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">Catatan Pemilik</p>
                  <p className="text-stone-600 bg-stone-50 rounded-lg p-3 text-xs italic">"{selected.notes}"</p>
                </div>
              )}
              <div className="pt-2 space-y-2">
                {selected.status === "APPROVED" && (
                  <Btn className="w-full justify-center">✓ Konfirmasi Check-in</Btn>
                )}
                {selected.status === "CHECKED_IN" && (
                  <Btn className="w-full justify-center">▶ Mulai Penitipan</Btn>
                )}
                {selected.status === "ONGOING" && (
                  <>
                    <Btn className="w-full justify-center">📝 Buat Laporan Harian</Btn>
                    <Btn variant="secondary" className="w-full justify-center">✓ Tandai Selesai</Btn>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="sticky top-6 bg-white rounded-2xl border border-stone-100 p-8 text-center text-stone-400">
            <div className="text-4xl mb-2">👆</div>
            <p className="text-sm font-medium">Pilih booking untuk lihat detail</p>
          </div>
        )}
      </div>
    </div>
  );
}
