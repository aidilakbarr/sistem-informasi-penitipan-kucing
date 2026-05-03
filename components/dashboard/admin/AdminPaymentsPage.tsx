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
  StatCard,
} from "@/components/dashboard/shared/DashboardUI";
import { formatCurrency, formatDate } from "@/lib/dashboard-utils";
import {
  getAllPayments,
  verifyPayment,
  Payment,
  PaymentStatus,
} from "@/services/api/payment.service";
import {
  Loader2,
  CheckCircle2,
  X,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; color: string; bg: string }
> = {
  PENDING: { label: "Menunggu", color: "text-amber-700", bg: "bg-amber-50" },
  SUCCESS: { label: "Lunas", color: "text-green-700", bg: "bg-green-50" },
  FAILED: { label: "Ditolak", color: "text-red-700", bg: "bg-red-50" },
};

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
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-semibold animate-in slide-in-from-bottom-4 fade-in duration-300 ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
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

// Modal lihat bukti transfer
function ProofModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="font-black text-stone-900">Bukti Transfer</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <img
            src={url}
            alt="Bukti Transfer"
            className="w-full rounded-2xl object-contain max-h-[60vh]"
          />

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-3 text-sm text-amber-600 font-semibold hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Buka di tab baru
          </a>
        </div>
      </div>
    </div>
  );
}

// Modal tolak dengan catatan
function RejectModal({
  payment,
  onConfirm,
  onClose,
  loading,
}: {
  payment: Payment;
  onConfirm: (note: string) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [note, setNote] = useState("");
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="font-black text-stone-900">Tolak Pembayaran</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-stone-600">
            Pembayaran dari{" "}
            <span className="font-bold text-stone-800">
              {payment.booking.user.name}
            </span>{" "}
            akan ditolak dan booking akan dibatalkan.
          </p>
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
              Alasan Penolakan (opsional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: Bukti transfer tidak jelas, jumlah tidak sesuai..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-400 resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onConfirm(note)}
              disabled={loading}
              className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Menolak...
                </>
              ) : (
                "✕ Tolak Pembayaran"
              )}
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<PaymentStatus | "ALL">("ALL");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Payment | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") =>
    setToast({ message, type });

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    try {
      setLoading(true);
      const data = await getAllPayments();
      setPayments(data);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal memuat data pembayaran.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(payment: Payment) {
    try {
      setActionLoading(payment.id);
      const updated = await verifyPayment(payment.id, "SUCCESS");
      setPayments((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p)),
      );
      showToast(
        `Pembayaran ${payment.booking.user.name} berhasil diverifikasi!`,
      );
    } catch (err: any) {
      showToast(err?.message ?? "Gagal verifikasi.", "error");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleReject(payment: Payment, note: string) {
    try {
      setActionLoading(payment.id);
      const updated = await verifyPayment(
        payment.id,
        "FAILED",
        note || undefined,
      );
      setPayments((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p)),
      );
      setRejectTarget(null);
      showToast(`Pembayaran ${payment.booking.user.name} ditolak.`);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal menolak pembayaran.", "error");
    } finally {
      setActionLoading(null);
    }
  }

  const filtered = payments.filter(
    (p) => filter === "ALL" || p.status === filter,
  );
  const totalSuccess = payments
    .filter((p) => p.status === "SUCCESS")
    .reduce((s, p) => s + p.amount, 0);
  const pendingCount = payments.filter((p) => p.status === "PENDING").length;
  const failedCount = payments.filter((p) => p.status === "FAILED").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm font-medium">Memuat data pembayaran...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {proofUrl && (
        <ProofModal url={proofUrl} onClose={() => setProofUrl(null)} />
      )}
      {rejectTarget && (
        <RejectModal
          payment={rejectTarget}
          loading={actionLoading === rejectTarget.id}
          onConfirm={(note) => handleReject(rejectTarget, note)}
          onClose={() => setRejectTarget(null)}
        />
      )}

      <PageHeader
        title="Manajemen Pembayaran"
        subtitle="Verifikasi dan kelola semua transaksi"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Pemasukan"
          value={formatCurrency(totalSuccess)}
          icon="💰"
          iconBg="bg-green-50"
        />
        <StatCard
          label="Perlu Verifikasi"
          value={pendingCount}
          icon="⏳"
          iconBg="bg-amber-50"
        />
        <StatCard
          label="Ditolak"
          value={failedCount}
          icon="❌"
          iconBg="bg-red-50"
        />
        <StatCard
          label="Total Transaksi"
          value={payments.length}
          icon="📋"
          iconBg="bg-blue-50"
        />
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(["ALL", "PENDING", "SUCCESS", "FAILED"] as const).map((s) => {
          const count =
            s === "ALL"
              ? payments.length
              : payments.filter((p) => p.status === s).length;
          const label = s === "ALL" ? "Semua" : PAYMENT_STATUS_CONFIG[s].label;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                filter === s
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
              }`}
            >
              {label}
              <span
                className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${filter === s ? "bg-white/20" : "bg-stone-100"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <SectionCard title={`Pembayaran (${filtered.length})`}>
        <Table
          headers={[
            "Customer",
            "Booking",
            "Jumlah",
            "Metode",
            "Bukti",
            "Status",
            "Waktu",
            "Aksi",
          ]}
        >
          {filtered.length === 0 ? (
            <Tr>
              <Td colSpan={8}>
                <p className="text-center text-stone-400 text-sm py-8">
                  Tidak ada data pembayaran.
                </p>
              </Td>
            </Tr>
          ) : (
            filtered.map((p) => {
              const conf = PAYMENT_STATUS_CONFIG[p.status];
              const isActioning = actionLoading === p.id;
              return (
                <Tr key={p.id}>
                  {/* Customer */}
                  <Td>
                    <div className="flex items-center gap-2">
                      <Avatar name={p.booking.user.name} size="sm" />
                      <div>
                        <p className="font-medium text-sm text-stone-800 whitespace-nowrap">
                          {p.booking.user.name}
                        </p>
                        <p className="text-[10px] text-stone-400">
                          {p.booking.user.telepon}
                        </p>
                      </div>
                    </div>
                  </Td>

                  {/* Booking info */}
                  <Td>
                    <p className="font-semibold text-sm text-stone-800">
                      🐱 {p.booking.cat.name}
                    </p>
                    <p className="text-[10px] text-stone-400">
                      {formatDate(p.booking.checkInDate)} →{" "}
                      {formatDate(p.booking.checkOutDate)}
                    </p>
                  </Td>

                  {/* Jumlah */}
                  <Td>
                    <span className="font-bold text-stone-900 whitespace-nowrap">
                      {formatCurrency(p.amount)}
                    </span>
                  </Td>

                  {/* Metode */}
                  <Td>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        p.method === "COD"
                          ? "bg-stone-100 text-stone-600"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {p.method}
                    </span>
                  </Td>

                  {/* Bukti */}
                  <Td>
                    {p.proofOfPayment ? (
                      <Btn
                        variant="ghost"
                        size="sm"
                        onClick={() => setProofUrl(p.proofOfPayment!)}
                      >
                        📎 Lihat
                      </Btn>
                    ) : (
                      <span className="text-xs text-stone-300">—</span>
                    )}
                  </Td>

                  {/* Status */}
                  <Td>
                    <Badge label={conf.label} color={conf.color} bg={conf.bg} />
                    {p.adminNote && (
                      <p className="text-[10px] text-stone-400 mt-0.5 max-w-[120px] truncate">
                        {p.adminNote}
                      </p>
                    )}
                  </Td>

                  {/* Waktu */}
                  <Td className="text-xs text-stone-400 whitespace-nowrap">
                    {formatDate(p.updatedAt)}
                  </Td>

                  {/* Aksi */}
                  <Td>
                    <div className="flex gap-1.5 items-center">
                      {isActioning ? (
                        <Loader2 className="w-4 h-4 animate-spin text-stone-400" />
                      ) : p.status === "PENDING" ? (
                        <>
                          <Btn size="sm" onClick={() => handleVerify(p)}>
                            ✓ Verifikasi
                          </Btn>
                          <Btn
                            variant="danger"
                            size="sm"
                            onClick={() => setRejectTarget(p)}
                          >
                            ✕ Tolak
                          </Btn>
                        </>
                      ) : (
                        <span className="text-xs text-stone-400">—</span>
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
