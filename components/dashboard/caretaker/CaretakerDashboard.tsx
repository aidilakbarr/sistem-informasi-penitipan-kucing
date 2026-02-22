"use client";

import { useState } from "react";
import { StatCard, SectionCard, PageHeader, Badge, Btn, Alert, Avatar, EmptyState } from "@/components/dashboard/shared/DashboardUI";
import { CARETAKER_STATS, MOCK_BOOKINGS, MOCK_DAILY_REPORTS } from "@/lib/mock-data";
import { BOOKING_STATUS_CONFIG, formatDate, formatCurrency } from "@/lib/dashboard-utils";

const ASSIGNED = MOCK_BOOKINGS.filter((b) => b.caretakerId === "u2" && b.status !== "COMPLETED" && b.status !== "CANCELLED");
const TODAY_REPORTS = MOCK_DAILY_REPORTS.filter((r) => r.caretakerId === "u2");
const EMERGENCY = TODAY_REPORTS.filter((r) => r.isEmergency);

export function CaretakerDashboard() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Dashboard Petugas"
        subtitle="Budi Santoso · Hari ini: Selasa, 15 Juni 2024"
      />

      {/* Emergency alert */}
      {EMERGENCY.length > 0 && (
        <Alert type="error" msg={`🚨 DARURAT: ${EMERGENCY.map(r => r.catName).join(", ")} membutuhkan perhatian segera! Segera periksa dan laporkan ke admin.`} />
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kucing Ditugaskan" value={CARETAKER_STATS.assignedBookings} icon="🐱" iconBg="bg-amber-50" />
        <StatCard label="Laporan Hari Ini"  value={CARETAKER_STATS.todayReports}     icon="📝" iconBg="bg-blue-50"  />
        <StatCard label="Belum Lapor"       value={CARETAKER_STATS.pendingReports}   icon="⏰" iconBg="bg-amber-50" />
        <StatCard label="Alert Darurat"     value={CARETAKER_STATS.emergencyAlerts}  icon="🚨" iconBg="bg-red-50"   />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Assigned Bookings */}
        <SectionCard title="Kucing yang Ditugaskan" subtitle={`${ASSIGNED.length} aktif`}>
          <div className="divide-y divide-stone-50">
            {ASSIGNED.map((b) => {
              const conf = BOOKING_STATUS_CONFIG[b.status];
              const hasReport = TODAY_REPORTS.find((r) => r.bookingId === b.id);
              const isEmerg = TODAY_REPORTS.find((r) => r.bookingId === b.id && r.isEmergency);
              return (
                <div key={b.id} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${isEmerg ? "bg-red-100" : "bg-amber-50"}`}>
                        🐱
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="font-bold text-stone-900">{b.catName}</span>
                          {isEmerg && <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold animate-pulse">🚨 DARURAT</span>}
                          <Badge label={conf.label} color={conf.color} bg={conf.bg} dot={conf.dot} size="sm" />
                        </div>
                        <p className="text-xs text-stone-500">Pemilik: {b.customerName}</p>
                        <p className="text-xs text-stone-400">{formatDate(b.checkIn)} – {formatDate(b.checkOut)}</p>
                        {b.cageName && <p className="text-xs text-stone-400">🏠 {b.cageName}</p>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      {hasReport
                        ? <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">✓ Dilaporkan</span>
                        : <Btn size="sm">+ Lapor</Btn>
                      }
                      <Btn variant="secondary" size="sm">Detail</Btn>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Today Reports Summary */}
        <SectionCard title="Laporan Hari Ini" subtitle="Ringkasan kondisi semua kucing" action={<Btn size="sm">+ Buat Laporan</Btn>}>
          {TODAY_REPORTS.length === 0 ? (
            <EmptyState icon="📝" title="Belum ada laporan" desc="Buat laporan pertama hari ini" />
          ) : (
            <div className="divide-y divide-stone-50">
              {TODAY_REPORTS.map((r) => (
                <div key={r.id} className={`px-6 py-4 ${r.isEmergency ? "bg-red-50/50" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-stone-900">{r.catName}</span>
                        {r.isEmergency && <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold">DARURAT</span>}
                      </div>
                      <p className="text-xs text-stone-400">{r.date}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      r.activity === "AKTIF" ? "bg-green-100 text-green-700"
                      : r.activity === "LEMAS" ? "bg-red-100 text-red-700"
                      : "bg-stone-100 text-stone-600"
                    }`}>
                      {r.activity}
                    </div>
                  </div>

                  {/* Health grid */}
                  <div className="grid grid-cols-4 gap-1.5 mb-2">
                    {[
                      { label: "Makan",  val: r.isEating },
                      { label: "Minum",  val: r.isDrinking },
                      { label: "BAB",    val: r.isDefecating },
                      { label: "BAK",    val: r.isUrinating },
                    ].map(({ label, val }) => (
                      <div key={label} className={`text-center p-1.5 rounded-lg text-xs ${val ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        <div className="font-bold">{val ? "✓" : "✗"}</div>
                        <div className="text-[10px]">{label}</div>
                      </div>
                    ))}
                  </div>

                  {r.temperature && (
                    <p className="text-xs text-stone-500 mb-1">🌡️ Suhu: <span className={`font-semibold ${r.temperature > 39 ? "text-red-600" : "text-stone-700"}`}>{r.temperature}°C</span></p>
                  )}

                  {r.notes && (
                    <p className="text-xs text-stone-600 bg-stone-50 rounded-lg px-2 py-1.5 italic">"{r.notes}"</p>
                  )}

                  {r.photos.length > 0 && (
                    <div className="flex gap-1.5 mt-2">
                      {r.photos.map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-sm">📸</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
