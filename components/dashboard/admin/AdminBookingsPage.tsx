"use client";

import { useEffect, useState } from "react";
import {
  PageHeader,
  SectionCard,
  Table,
  Tr,
  Td,
  Badge,
  Btn,
  Avatar,
} from "@/components/dashboard/shared/DashboardUI";
import { formatCurrency, formatDate } from "@/lib/dashboard-utils";
import {
  getAllBookings,
  approveBooking,
  rejectBooking,
  checkInBooking,
  checkOutBooking,
  Booking,
  BookingStatus,
} from "@/services/api/booking.services";
import { Loader2, CheckCircle2, X, AlertTriangle } from "lucide-react";
import { getCages, Cage } from "@/services/api/cage.services";

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string; bg: string; dot?: boolean }
> = {
  PENDING: {
    label: "Pending",
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
  FAILED: { label: "Gagal", color: "text-red-700", bg: "bg-red-50" },
};

const ADDITIONAL_LABELS: Record<string, string> = {
  GROOMING_REGULAR: "Grooming Reguler",
  GROOMING_ANTIFUNGAL: "Jamur & Kutu",
  GROOMING_COMPLETE: "Grooming Lengkap",
  DELIVERY: "Antar-Jemput",
};

const STATUS_FILTERS: { label: string; value: BookingStatus | "ALL" }[] = [
  { label: "Semua", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Disetujui", value: "CONFIRMED" },
  { label: "Berlangsung", value: "IN_CARE" },
  { label: "Selesai", value: "COMPLETED" },
  { label: "Dibatalkan", value: "CANCELLED" },
];

// ── Toast ─────────────────────────────────────────────────────────────────────

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-semibold animate-in slide-in-from-bottom-4 fade-in duration-300 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
      ) : (
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
      )}
      {message}
      <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function ApproveModal({
  booking,
  onConfirm,
  onClose,
}: {
  booking: Booking;
  onConfirm: (cageId: string) => void;
  onClose: () => void;
}) {
  const [cages, setCages] = useState<Cage[]>([]);
  const [loadingCages, setLoadingCages] = useState(true);
  const [selectedCage, setSelectedCage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCages()
      .then((data) => {
        // filter hanya AVAILABLE
        setCages(data.filter((c) => c.status === "AVAILABLE"));
      })
      .catch(console.error)
      .finally(() => setLoadingCages(false));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="font-black text-stone-900">Setujui Booking</h2>
          <button
            onClick={onClose}
            disabled={submitting}
            className="p-2 hover:bg-stone-100 rounded-full text-stone-400 disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Info booking */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Customer</span>
              <span className="font-semibold text-stone-800">
                {booking.user.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Kucing</span>
              <span className="font-semibold text-stone-800">
                🐱 {booking.cat.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Periode</span>
              <span className="font-semibold text-stone-800">
                {formatDate(booking.checkInDate)} →{" "}
                {formatDate(booking.checkOutDate)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Total</span>
              <span className="font-black text-amber-600">
                {formatCurrency(booking.totalPrice)}
              </span>
            </div>
          </div>

          {/* Pilih kandang */}
          <div>
            <p className="text-xs font-black text-stone-700 uppercase tracking-wider mb-2">
              Pilih Kandang *
            </p>

            {loadingCages ? (
              <div className="flex items-center gap-2 py-4 text-stone-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Memuat kandang...</span>
              </div>
            ) : cages.length === 0 ? (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-sm text-red-700 font-medium">
                ⚠ Tidak ada kandang tersedia saat ini.
              </div>
            ) : (
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {cages.map((cage) => (
                  <label
                    key={cage.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedCage === cage.id
                        ? "border-amber-400 bg-amber-50"
                        : "border-stone-100 hover:border-stone-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          selectedCage === cage.id
                            ? "bg-amber-500 border-amber-500"
                            : "border-stone-300"
                        }`}
                      >
                        {selectedCage === cage.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-stone-800">
                          Kandang {cage.cageNumber}
                        </p>
                        {cage.description && (
                          <p className="text-xs text-stone-400">
                            {cage.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full ml-2">
                      {cage.type}
                    </span>
                    <input
                      type="radio"
                      name="cage"
                      value={cage.id}
                      checked={selectedCage === cage.id}
                      onChange={() => setSelectedCage(cage.id)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                setSubmitting(true);
                onConfirm(selectedCage);
              }}
              disabled={!selectedCage || submitting || cages.length === 0}
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Menyetujui...
                </>
              ) : (
                "✓ Setujui Booking"
              )}
            </button>
            <button
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl transition-colors disabled:opacity-50"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "ALL">(
    "ALL",
  );
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [approveTarget, setApproveTarget] = useState<Booking | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") =>
    setToast({ message, type });

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      setLoading(true);
      const data = await getAllBookings();
      setBookings(data);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal memuat data booking.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(booking: Booking, cageId: string) {
    try {
      setActionLoading(booking.id);
      const updated = await approveBooking(booking.id, cageId);
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b)),
      );
      setApproveTarget(null);
      showToast(`Booking ${booking.cat.name} berhasil disetujui!`);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal menyetujui booking.", "error");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleReject(booking: Booking) {
    try {
      setActionLoading(booking.id);
      const updated = await rejectBooking(booking.id);
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b)),
      );
      showToast(`Booking ${booking.cat.name} berhasil ditolak.`);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal menolak booking.", "error");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleCheckIn(booking: Booking) {
    try {
      setActionLoading(booking.id);
      const updated = await checkInBooking(booking.id);
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b)),
      );
      showToast(`${booking.cat.name} berhasil check-in!`);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal check-in.", "error");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleCheckOut(booking: Booking) {
    try {
      setActionLoading(booking.id);
      await checkOutBooking(booking.id);
      await fetchBookings();
      showToast(`${booking.cat.name} berhasil check-out!`);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal check-out.", "error");
    } finally {
      setActionLoading(null);
    }
  }

  const filtered = bookings.filter(
    (b) => statusFilter === "ALL" || b.status === statusFilter,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm font-medium">Memuat data booking...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {approveTarget && (
        <ApproveModal
          booking={approveTarget}
          onConfirm={(cageId) => handleApprove(approveTarget, cageId)}
          onClose={() => setApproveTarget(null)}
        />
      )}

      <PageHeader
        title="Manajemen Booking"
        subtitle={`${bookings.length} total booking`}
      />

      {/* Status filter pills */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map((f) => {
          const count =
            f.value === "ALL"
              ? bookings.length
              : bookings.filter((b) => b.status === f.value).length;
          return (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                statusFilter === f.value
                  ? "bg-amber-500 text-white"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-amber-300"
              }`}
            >
              {f.label}
              <span
                className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${
                  statusFilter === f.value
                    ? "bg-white/20 text-white"
                    : "bg-stone-100"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <SectionCard title={`Booking (${filtered.length})`}>
        <Table
          headers={[
            "Customer",
            "Kucing",
            "Kandang",
            "Layanan Tambahan",
            "Check-in",
            "Check-out",
            "Harga",
            "Pembayaran",
            "Status",
            "Aksi",
          ]}
        >
          {filtered.length === 0 ? (
            <Tr>
              <Td colSpan={10}>
                <p className="text-center text-stone-400 text-sm py-8">
                  Tidak ada booking untuk filter ini.
                </p>
              </Td>
            </Tr>
          ) : (
            filtered.map((b) => {
              const sConf = STATUS_CONFIG[b.status];
              const pConf = b.payment
                ? PAYMENT_CONFIG[b.payment.status]
                : PAYMENT_CONFIG["PENDING"];
              const isActioning = actionLoading === b.id;

              return (
                <Tr key={b.id}>
                  {/* Customer */}
                  <Td>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Avatar name={b.user.name} size="sm" />
                      <div>
                        <p className="font-medium text-sm text-stone-800">
                          {b.user.name}
                        </p>
                        <p className="text-[10px] text-stone-400">
                          {b.user.telepon}
                        </p>
                      </div>
                    </div>
                  </Td>

                  {/* Kucing */}
                  <Td>
                    <div className="flex items-center gap-2">
                      {b.cat.photoUrl ? (
                        <img
                          src={b.cat.photoUrl}
                          className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-base flex-shrink-0">
                          🐱
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-stone-800 text-sm">
                          {b.cat.name}
                        </p>
                        <p className="text-[10px] text-stone-400">
                          {b.cat.ras}
                        </p>
                      </div>
                    </div>
                  </Td>

                  {/* Kandang */}
                  <Td>
                    {b.cage ? (
                      <div>
                        <p className="font-semibold text-sm text-stone-800">
                          {b.cage.cageNumber}
                        </p>
                        <p className="text-[10px] text-stone-400">
                          {b.cage.type}
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-amber-500 font-medium">
                        ⚠ Belum assign
                      </span>
                    )}
                  </Td>

                  {/* Layanan Tambahan */}
                  <Td>
                    {b.additionalServices.length > 0 ? (
                      <div className="flex gap-1 flex-wrap">
                        {b.additionalServices.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-medium whitespace-nowrap"
                          >
                            {ADDITIONAL_LABELS[s] ?? s}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-stone-400">-</span>
                    )}
                  </Td>

                  {/* Check-in / Check-out */}
                  <Td className="text-xs whitespace-nowrap text-stone-600">
                    {formatDate(b.checkInDate)}
                  </Td>
                  <Td className="text-xs whitespace-nowrap text-stone-600">
                    {formatDate(b.checkOutDate)}
                  </Td>

                  {/* Harga */}
                  <Td className="font-semibold text-sm text-stone-800 whitespace-nowrap">
                    {formatCurrency(b.totalPrice)}
                  </Td>

                  {/* Pembayaran */}
                  <Td>
                    <Badge
                      label={pConf.label}
                      color={pConf.color}
                      bg={pConf.bg}
                      size="sm"
                    />
                  </Td>

                  {/* Status */}
                  <Td>
                    <Badge
                      label={sConf.label}
                      color={sConf.color}
                      bg={sConf.bg}
                      dot={sConf.dot}
                      size="sm"
                    />
                  </Td>

                  {/* Aksi */}
                  <Td>
                    <div className="flex gap-1.5 items-center">
                      {isActioning ? (
                        <Loader2 className="w-4 h-4 animate-spin text-stone-400" />
                      ) : (
                        <>
                          {b.status === "PENDING" && (
                            <>
                              <Btn
                                size="sm"
                                onClick={() => setApproveTarget(b)}
                              >
                                ✓ Setuju
                              </Btn>
                              <Btn
                                variant="danger"
                                size="sm"
                                onClick={() => handleReject(b)}
                              >
                                ✕ Tolak
                              </Btn>
                            </>
                          )}
                          {b.status === "CONFIRMED" && (
                            <>
                              <Btn size="sm" onClick={() => handleCheckIn(b)}>
                                Check-in
                              </Btn>
                              <Btn
                                variant="danger"
                                size="sm"
                                onClick={() => handleReject(b)}
                              >
                                Batal
                              </Btn>
                            </>
                          )}
                          {b.status === "IN_CARE" && (
                            <Btn size="sm" onClick={() => handleCheckOut(b)}>
                              Check-out
                            </Btn>
                          )}
                          {(b.status === "COMPLETED" ||
                            b.status === "CANCELLED") && (
                            <span className="text-xs text-stone-400">-</span>
                          )}
                        </>
                      )}
                    </div>
                  </Td>
                </Tr>
              );
            })
          )}
        </Table>
      </SectionCard>
    </div>
  );
}
