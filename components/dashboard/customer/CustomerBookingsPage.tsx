"use client";

import { useEffect, useState } from "react";
import {
  PageHeader,
  SectionCard,
  Badge,
  Btn,
} from "@/components/dashboard/shared/DashboardUI";
import { formatCurrency, formatDate } from "@/lib/dashboard-utils";
import {
  getBookings,
  Booking,
  BookingStatus,
} from "@/services/api/booking.services";
import { Loader2, X } from "lucide-react";

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string; bg: string; dot?: boolean }
> = {
  PENDING: {
    label: "Menunggu",
    color: "text-amber-700",
    bg: "bg-amber-50",
    dot: true,
  },
  CONFIRMED: {
    label: "Disetujui",
    color: "text-blue-700",
    bg: "bg-blue-50",
    dot: true,
  },
  IN_CARE: {
    label: "Berlangsung",
    color: "text-green-700",
    bg: "bg-green-50",
    dot: true,
  },
  COMPLETED: {
    label: "Selesai",
    color: "text-stone-600",
    bg: "bg-stone-100",
    dot: false,
  },
  CANCELLED: {
    label: "Dibatalkan",
    color: "text-red-700",
    bg: "bg-red-50",
    dot: false,
  },
};

const PAYMENT_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  PENDING: { label: "Belum Bayar", color: "text-amber-700", bg: "bg-amber-50" },
  SUCCESS: { label: "Lunas", color: "text-green-700", bg: "bg-green-50" },
  FAILED: {
    label: "Pembayaran Ditolak",
    color: "text-red-700",
    bg: "bg-red-50",
  },
};

const ADDITIONAL_LABELS: Record<string, string> = {
  GROOMING_REGULAR: "Grooming Reguler",
  GROOMING_ANTIFUNGAL: "Jamur & Kutu",
  GROOMING_COMPLETE: "Grooming Lengkap",
  DELIVERY: "Antar-Jemput",
};

const FILTERS: { label: string; value: BookingStatus | "ALL" }[] = [
  { label: "Semua", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Disetujui", value: "CONFIRMED" },
  { label: "Berlangsung", value: "IN_CARE" },
  { label: "Selesai", value: "COMPLETED" },
  { label: "Dibatalkan", value: "CANCELLED" },
];

function daysBetween(a: string, b: string) {
  const diff = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

// ── Detail Drawer ─────────────────────────────────────────────────────────────

function BookingDetailDrawer({
  booking,
  onClose,
}: {
  booking: Booking;
  onClose: () => void;
}) {
  const bConf = STATUS_CONFIG[booking.status];
  const pConf = booking.payment
    ? PAYMENT_CONFIG[booking.payment.status]
    : PAYMENT_CONFIG["PENDING"];
  const days = daysBetween(booking.checkInDate, booking.checkOutDate);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-amber-50 px-6 py-5 border-b border-amber-100 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-stone-400 font-mono">
              {booking.id.slice(0, 8).toUpperCase()}
            </p>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-amber-100 rounded-full text-stone-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-3">
            {booking.cat.photoUrl ? (
              <img
                src={booking.cat.photoUrl}
                className="w-12 h-12 rounded-2xl object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl flex-shrink-0">
                🐱
              </div>
            )}
            <div>
              <h2 className="font-black text-xl text-stone-900">
                {booking.cat.name}
              </h2>
              <p className="text-xs text-stone-500">{booking.cat.ras}</p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Badge
              label={bConf.label}
              color={bConf.color}
              bg={bConf.bg}
              dot={bConf.dot}
            />
            <Badge label={pConf.label} color={pConf.color} bg={pConf.bg} />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Grid info */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Check-in", value: formatDate(booking.checkInDate) },
              { label: "Check-out", value: formatDate(booking.checkOutDate) },
              { label: "Durasi", value: `${days} hari` },
              {
                label: "Kandang",
                value: booking.cage
                  ? `Kandang ${booking.cage.cageNumber}`
                  : "Belum ditentukan",
              },
            ].map(({ label, value }) => (
              <div key={label} className="bg-stone-50 rounded-xl p-3">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">
                  {label}
                </p>
                <p className="font-semibold text-stone-800 text-sm mt-0.5">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Layanan tambahan */}
          {booking.additionalServices.length > 0 && (
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">
                Layanan Tambahan
              </p>
              <div className="flex flex-wrap gap-1.5">
                {booking.additionalServices.map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full font-medium"
                  >
                    {ADDITIONAL_LABELS[s] ?? s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Catatan */}
          {booking.specialNote && (
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-1">
                Catatan
              </p>
              <p className="text-sm text-stone-600 italic bg-stone-50 rounded-xl px-3 py-2">
                "{booking.specialNote}"
              </p>
            </div>
          )}

          {/* Admin note jika payment ditolak */}
          {booking.payment?.status === "FAILED" &&
            booking.payment.adminNote && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-1">
                  Alasan Penolakan Pembayaran
                </p>
                <p className="text-sm text-red-700">
                  {booking.payment.adminNote}
                </p>
              </div>
            )}

          {/* Total */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            <span className="font-bold text-stone-700">Total Pembayaran</span>
            <span className="font-black text-xl text-amber-600">
              {formatCurrency(booking.totalPrice)}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {booking.status === "CONFIRMED" &&
              booking.payment &&
              booking.payment.status === "PENDING" &&
              !booking.payment.proofOfPayment &&
              booking.payment.method !== "COD" && (
                <Btn className="w-full justify-center py-3">
                  💳 Lakukan Pembayaran
                </Btn>
              )}
            {booking.status === "IN_CARE" && (
              <Btn variant="secondary" className="w-full justify-center">
                📸 Lihat Laporan Harian
              </Btn>
            )}
            {booking.status === "COMPLETED" && (
              <Btn variant="secondary" className="w-full justify-center">
                ⭐ Beri Ulasan
              </Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BookingStatus | "ALL">("ALL");
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      setLoading(true);
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = bookings.filter(
    (b) => filter === "ALL" || b.status === filter,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm font-medium">Memuat riwayat booking...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-20">
      <PageHeader
        title="Riwayat Booking"
        subtitle={`${bookings.length} total booking`}
      />

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const count =
            f.value === "ALL"
              ? bookings.length
              : bookings.filter((b) => b.status === f.value).length;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                filter === f.value
                  ? "bg-amber-500 text-white"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-amber-300"
              }`}
            >
              {f.label}
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                  filter === f.value ? "bg-white/20" : "bg-stone-100"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Booking list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center text-stone-400">
            <div className="text-4xl mb-2">📋</div>
            <p className="font-semibold">
              Tidak ada booking{filter !== "ALL" ? " dengan status ini" : ""}
            </p>
          </div>
        ) : (
          filtered.map((b) => {
            const bConf = STATUS_CONFIG[b.status];
            const pConf = b.payment
              ? PAYMENT_CONFIG[b.payment.status]
              : PAYMENT_CONFIG["PENDING"];
            const days = daysBetween(b.checkInDate, b.checkOutDate);
            const isActive = ["IN_CARE", "CONFIRMED"].includes(b.status);
            const needsPayment =
              b.status === "CONFIRMED" &&
              b.payment &&
              b.payment.status === "PENDING" &&
              !b.payment.proofOfPayment &&
              b.payment.method !== "COD";

            return (
              <div
                key={b.id}
                onClick={() => setSelected(b)}
                className="bg-white rounded-2xl border border-stone-100 p-5 hover:border-amber-200 hover:shadow-sm cursor-pointer transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    {/* Cat photo */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex-shrink-0 overflow-hidden ${
                        isActive ? "bg-amber-50" : "bg-stone-100"
                      }`}
                    >
                      {b.cat.photoUrl ? (
                        <img
                          src={b.cat.photoUrl}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">
                          🐱
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-stone-900">
                          {b.cat.name}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {b.id.slice(0, 8).toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500">
                        {formatDate(b.checkInDate)} –{" "}
                        {formatDate(b.checkOutDate)} · {days} hari
                      </p>
                      {b.cage && (
                        <p className="text-[10px] text-stone-400 mt-0.5">
                          🏠 Kandang {b.cage.cageNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <Badge
                      label={bConf.label}
                      color={bConf.color}
                      bg={bConf.bg}
                      dot={bConf.dot}
                      size="sm"
                    />
                    <Badge
                      label={pConf.label}
                      color={pConf.color}
                      bg={pConf.bg}
                      size="sm"
                    />
                  </div>
                </div>

                {/* Layanan tambahan + harga */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {b.additionalServices.length > 0 ? (
                      b.additionalServices.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium"
                        >
                          {ADDITIONAL_LABELS[s] ?? s}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-stone-400">
                        Tanpa layanan tambahan
                      </span>
                    )}
                  </div>
                  <span className="font-black text-stone-900 text-sm flex-shrink-0">
                    {formatCurrency(b.totalPrice)}
                  </span>
                </div>

                {/* CTA bayar */}
                {needsPayment && (
                  <div className="mt-3 pt-3 border-t border-stone-100 flex justify-end">
                    <Btn
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(b);
                      }}
                    >
                      💳 Bayar Sekarang
                    </Btn>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {selected && (
        <BookingDetailDrawer
          booking={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
