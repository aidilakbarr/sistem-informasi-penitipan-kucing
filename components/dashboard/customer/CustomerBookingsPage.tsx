"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Badge, Btn } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_BOOKINGS } from "@/lib/mock-data";
import {
  BOOKING_STATUS_CONFIG, PAYMENT_STATUS_CONFIG,
  formatCurrency, formatDate, SERVICE_LABELS,
} from "@/lib/dashboard-utils";
import type { Booking, BookingStatus } from "@/types/dashboard";

const MY_BOOKINGS = MOCK_BOOKINGS.filter(b => b.customerId === "u3");

function daysBetween(a: string, b: string) {
  const diff = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

function BookingDetailDrawer({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  const bConf = BOOKING_STATUS_CONFIG[booking.status];
  const pConf = PAYMENT_STATUS_CONFIG[booking.paymentStatus];
  const days  = daysBetween(booking.checkIn, booking.checkOut);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-amber-50 px-6 py-5 border-b border-amber-100">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs text-stone-400">{booking.bookingCode}</span>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-xl">✕</button>
          </div>
          <h2 className="font-black text-xl text-stone-900 mb-2">🐱 {booking.catName}</h2>
          <div className="flex gap-2 flex-wrap">
            <Badge label={bConf.label} color={bConf.color} bg={bConf.bg} dot={bConf.dot} />
            <Badge label={pConf.label} color={pConf.color} bg={pConf.bg} />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Check-in",  value: formatDate(booking.checkIn) },
              { label: "Check-out", value: formatDate(booking.checkOut) },
              { label: "Durasi",    value: `${days} hari` },
              { label: "Kandang",   value: booking.cageName ?? "Belum ditentukan" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-stone-50 rounded-xl p-3">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">{label}</p>
                <p className="font-semibold text-stone-800 text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">Layanan</p>
            <div className="flex flex-wrap gap-1.5">
              {booking.services.map(s => (
                <span key={s} className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full font-medium">
                  {SERVICE_LABELS[s]}
                </span>
              ))}
            </div>
          </div>

          {booking.caretakerName && (
            <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
              <span className="text-xl">🧑‍⚕️</span>
              <div>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">Petugas</p>
                <p className="font-semibold text-blue-800 text-sm">{booking.caretakerName}</p>
              </div>
            </div>
          )}

          {booking.notes && (
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-1">Catatan</p>
              <p className="text-sm text-stone-600 italic bg-stone-50 rounded-xl px-3 py-2">"{booking.notes}"</p>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            <span className="font-bold text-stone-700">Total Pembayaran</span>
            <span className="font-black text-xl text-amber-600">{formatCurrency(booking.totalPrice)}</span>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {booking.paymentStatus === "UNPAID" && (
              <Btn className="w-full justify-center py-3">💳 Lakukan Pembayaran</Btn>
            )}
            {booking.status === "ONGOING" && (
              <Btn variant="secondary" className="w-full justify-center">📸 Lihat Laporan Harian</Btn>
            )}
            {booking.status === "COMPLETED" && (
              <Btn variant="secondary" className="w-full justify-center">⭐ Beri Ulasan</Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CustomerBookingsPage() {
  const [filter, setFilter] = useState<BookingStatus | "ALL">("ALL");
  const [selected, setSelected] = useState<Booking | null>(null);

  const filtered = MY_BOOKINGS.filter(b => filter === "ALL" || b.status === filter);

  const FILTERS: { label: string; value: BookingStatus | "ALL" }[] = [
    { label: "Semua", value: "ALL" },
    { label: "Aktif",    value: "ONGOING" },
    { label: "Pending",  value: "PENDING" },
    { label: "Selesai",  value: "COMPLETED" },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Riwayat Booking"
        subtitle={`${MY_BOOKINGS.length} total booking`}
        action={<Btn size="sm">📅 Pesan Baru</Btn>}
      />

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => {
          const count = f.value === "ALL"
            ? MY_BOOKINGS.length
            : MY_BOOKINGS.filter(b => b.status === f.value).length;
          return (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                filter === f.value
                  ? "bg-amber-500 text-white"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-amber-300"
              }`}
            >
              {f.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                filter === f.value ? "bg-white/20" : "bg-stone-100"
              }`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Booking list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center text-stone-400">
            <div className="text-4xl mb-2">📋</div>
            <p className="font-semibold">Tidak ada booking {filter !== "ALL" ? "dengan status ini" : ""}</p>
          </div>
        ) : (
          filtered.map(b => {
            const bConf = BOOKING_STATUS_CONFIG[b.status];
            const pConf = PAYMENT_STATUS_CONFIG[b.paymentStatus];
            const days  = daysBetween(b.checkIn, b.checkOut);
            const isActive = ["ONGOING","CHECKED_IN","APPROVED"].includes(b.status);

            return (
              <div
                key={b.id}
                onClick={() => setSelected(b)}
                className="bg-white rounded-2xl border border-stone-100 p-5 hover:border-amber-200 hover:shadow-sm cursor-pointer transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                      isActive ? "bg-amber-50" : "bg-stone-100"
                    }`}>🐱</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-stone-900">{b.catName}</span>
                        <span className="text-xs text-stone-400 font-mono">{b.bookingCode}</span>
                      </div>
                      <p className="text-xs text-stone-500">{formatDate(b.checkIn)} – {formatDate(b.checkOut)} · {days} hari</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <Badge label={bConf.label} color={bConf.color} bg={bConf.bg} dot={bConf.dot} size="sm" />
                    <Badge label={pConf.label} color={pConf.color} bg={pConf.bg} size="sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {b.services.map(s => (
                      <span key={s} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">
                        {SERVICE_LABELS[s]}
                      </span>
                    ))}
                  </div>
                  <span className="font-black text-stone-900 text-sm">{formatCurrency(b.totalPrice)}</span>
                </div>

                {b.paymentStatus === "UNPAID" && (
                  <div className="mt-3 pt-3 border-t border-stone-100 flex justify-end">
                    <Btn size="sm" onClick={e => { e.stopPropagation(); }}>💳 Bayar Sekarang</Btn>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {selected && <BookingDetailDrawer booking={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
