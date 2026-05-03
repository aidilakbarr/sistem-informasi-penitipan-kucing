"use client";

import { useEffect, useState } from "react";
import {
  PageHeader,
  SectionCard,
  Badge,
  Btn,
  Alert,
  StatCard,
  Table,
  Tr,
  Td,
} from "@/components/dashboard/shared/DashboardUI";
import { formatCurrency, formatDate } from "@/lib/dashboard-utils";
import {
  getMyPayments,
  payCOD,
  payTransfer,
  Payment,
  PaymentStatus,
} from "@/services/api/payment.service";
import { Loader2, CheckCircle2, X, AlertTriangle } from "lucide-react";

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

// ── Upload Modal ───────────────────────────────────────────────────────────────

function PaymentModal({
  payment,
  onClose,
  onSuccess,
}: {
  payment: Payment;
  onClose: () => void;
  onSuccess: (updated: Payment) => void;
}) {
  const [method, setMethod] = useState<"COD" | "TRANSFER">("TRANSFER");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function handleFile(f: File) {
    if (f.type.startsWith("image/")) setFile(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      let updated: Payment;

      if (method === "COD") {
        updated = await payCOD(payment.bookingId);
      } else {
        if (!file) return;
        updated = await payTransfer(payment.bookingId, file);
      }

      onSuccess(updated);
      setDone(true);
    } catch (err: any) {
      alert(err?.message ?? "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="font-black text-stone-900">Pembayaran</h2>
          <button
            onClick={onClose}
            disabled={submitting}
            className="p-2 hover:bg-stone-100 rounded-full text-stone-400 disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="font-black text-stone-900 mb-1">
              {method === "COD" ? "Metode COD Dipilih!" : "Bukti Terkirim!"}
            </h3>
            <p className="text-sm text-stone-500 mb-6">
              {method === "COD"
                ? "Silakan bayar tunai saat menitipkan kucing Anda."
                : "Pembayaran Anda sedang diverifikasi admin. Maks. 1×24 jam."}
            </p>
            <Btn onClick={onClose} className="w-full justify-center">
              Tutup
            </Btn>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Info tagihan */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-500">Kucing</span>
                <span className="font-semibold text-stone-700">
                  🐱 {payment.booking.cat.name}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-500">Periode</span>
                <span className="font-semibold text-stone-700">
                  {formatDate(payment.booking.checkInDate)} →{" "}
                  {formatDate(payment.booking.checkOutDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 text-sm">Total Tagihan</span>
                <span className="font-black text-amber-600 text-lg">
                  {formatCurrency(payment.amount)}
                </span>
              </div>
            </div>

            {/* Pilih metode */}
            <div>
              <p className="text-sm font-bold text-stone-700 mb-2">
                Metode Pembayaran
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(["TRANSFER", "COD"] as const).map((m) => (
                  <label
                    key={m}
                    className={`flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      method === m
                        ? "border-amber-400 bg-amber-50"
                        : "border-stone-100 hover:border-stone-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value={m}
                      checked={method === m}
                      onChange={() => {
                        setMethod(m);
                        setFile(null);
                      }}
                      className="sr-only"
                    />
                    <span className="text-xl mb-1">
                      {m === "COD" ? "💵" : "🏦"}
                    </span>
                    <span className="text-xs font-bold text-stone-700">
                      {m === "COD" ? "Bayar di Tempat" : "Transfer Bank"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Info rekening (TRANSFER) */}
            {method === "TRANSFER" && (
              <>
                <div className="bg-stone-50 rounded-2xl p-4 space-y-2 text-sm">
                  <p className="font-bold text-stone-700 text-xs uppercase tracking-wide">
                    Rekening Tujuan
                  </p>
                  {[
                    { label: "Bank", value: "BCA" },
                    { label: "No. Rekening", value: "1234567890" },
                    { label: "Atas Nama", value: "AnZ Pet Care Indonesia" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-stone-400">{label}</span>
                      <span className="font-semibold text-stone-800">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Upload bukti */}
                <div>
                  <p className="text-sm font-semibold text-stone-700 mb-2">
                    Bukti Transfer *
                  </p>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const f = e.dataTransfer.files[0];
                      if (f) handleFile(f);
                    }}
                    onClick={() =>
                      document.getElementById("proof-input")?.click()
                    }
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      dragOver
                        ? "border-amber-400 bg-amber-50"
                        : file
                          ? "border-green-400 bg-green-50"
                          : "border-stone-200 hover:border-amber-300 hover:bg-amber-50/30"
                    }`}
                  >
                    <input
                      id="proof-input"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(f);
                      }}
                    />
                    {file ? (
                      <>
                        <div className="text-3xl mb-1">🖼️</div>
                        <p className="text-sm font-semibold text-green-700">
                          {file.name}
                        </p>
                        <p className="text-xs text-stone-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl mb-2">📤</div>
                        <p className="text-sm text-stone-600 font-medium">
                          Klik atau seret file ke sini
                        </p>
                        <p className="text-xs text-stone-400">
                          JPG, PNG · Maks. 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            <Btn
              type="submit"
              disabled={submitting || (method === "TRANSFER" && !file)}
              className="w-full justify-center py-3.5 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />{" "}
                  Mengirim...
                </>
              ) : method === "COD" ? (
                "💵 Konfirmasi COD"
              ) : (
                "📤 Kirim Bukti Transfer"
              )}
            </Btn>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function CustomerPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [payTarget, setPayTarget] = useState<Payment | null>(null);
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
      const data = await getMyPayments();
      setPayments(data);
    } catch (err: any) {
      showToast(err?.message ?? "Gagal memuat data.", "error");
    } finally {
      setLoading(false);
    }
  }

  function handlePaymentSuccess(updated: Payment) {
    setPayments((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setPayTarget(null);
    showToast("Pembayaran berhasil dikirim!");
  }

  const unpaid = payments.filter(
    (p) => p.status === "PENDING" && !p.proofOfPayment && p.method !== "COD",
  );
  const pending = payments.filter(
    (p) => p.status === "PENDING" && (p.proofOfPayment || p.method === "COD"),
  );
  const success = payments.filter((p) => p.status === "SUCCESS");
  const totalPaid = success.reduce((s, p) => s + p.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm font-medium">Memuat data pembayaran...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-20">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <PageHeader
        title="Pembayaran"
        subtitle="Kelola tagihan dan riwayat transaksi"
      />

      {unpaid.length > 0 && (
        <Alert
          type="warning"
          msg={`${unpaid.length} tagihan belum dibayar. Segera lakukan pembayaran.`}
        />
      )}
      {pending.length > 0 && (
        <Alert
          type="info"
          msg={`${pending.length} pembayaran sedang diverifikasi. Maks. 1×24 jam.`}
        />
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Belum Bayar"
          value={unpaid.length}
          icon="❗"
          iconBg="bg-red-50"
        />
        <StatCard
          label="Diverifikasi"
          value={pending.length}
          icon="⏳"
          iconBg="bg-amber-50"
        />
        <StatCard
          label="Total Lunas"
          value={formatCurrency(totalPaid)}
          icon="✅"
          iconBg="bg-green-50"
        />
      </div>

      {/* Tagihan belum dibayar */}
      {unpaid.length > 0 && (
        <SectionCard
          title="Tagihan Belum Dibayar"
          subtitle="Segera lakukan pembayaran"
        >
          <div className="divide-y divide-stone-50">
            {unpaid.map((p) => (
              <div
                key={p.id}
                className="px-6 py-4 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-bold text-stone-900">
                    🐱 {p.booking.cat.name}
                  </p>
                  <p className="text-xs text-stone-500">
                    {formatDate(p.booking.checkInDate)} →{" "}
                    {formatDate(p.booking.checkOutDate)}
                  </p>
                  <p className="font-black text-amber-600 text-lg">
                    {formatCurrency(p.amount)}
                  </p>
                </div>
                <Btn onClick={() => setPayTarget(p)}>💳 Bayar Sekarang</Btn>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Menunggu verifikasi */}
      {pending.length > 0 && (
        <SectionCard title="Menunggu Verifikasi">
          <div className="divide-y divide-stone-50">
            {pending.map((p) => {
              const conf = PAYMENT_STATUS_CONFIG[p.status];
              return (
                <div
                  key={p.id}
                  className="px-6 py-4 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-bold text-stone-900">
                      🐱 {p.booking.cat.name}
                    </p>
                    <p className="text-xs text-stone-500">
                      {p.method === "COD"
                        ? "Bayar di Tempat (COD)"
                        : "Transfer Bank"}
                    </p>
                    <p className="font-semibold text-stone-700">
                      {formatCurrency(p.amount)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge label={conf.label} color={conf.color} bg={conf.bg} />
                    <span className="text-xs text-stone-400">
                      Estimasi: 1×24 jam
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* Riwayat semua transaksi */}
      <SectionCard
        title="Riwayat Transaksi"
        subtitle={`${payments.length} transaksi`}
      >
        <Table headers={["Kucing", "Periode", "Jumlah", "Status", "Aksi"]}>
          {payments.length === 0 ? (
            <Tr>
              <Td colSpan={5}>
                <p className="text-center text-stone-400 text-sm py-8">
                  Belum ada transaksi.
                </p>
              </Td>
            </Tr>
          ) : (
            payments.map((p) => {
              const conf = PAYMENT_STATUS_CONFIG[p.status];
              return (
                <Tr key={p.id}>
                  <Td>
                    <p className="font-semibold text-stone-800 text-sm">
                      🐱 {p.booking.cat.name}
                    </p>
                    <p className="text-[10px] text-stone-400">{p.method}</p>
                  </Td>
                  <Td className="text-xs text-stone-500 whitespace-nowrap">
                    {formatDate(p.booking.checkInDate)} →{" "}
                    {formatDate(p.booking.checkOutDate)}
                  </Td>
                  <Td>
                    <span className="font-bold text-stone-900">
                      {formatCurrency(p.amount)}
                    </span>
                  </Td>
                  <Td>
                    <Badge label={conf.label} color={conf.color} bg={conf.bg} />
                    {p.adminNote && (
                      <p className="text-[10px] text-red-500 mt-0.5">
                        {p.adminNote}
                      </p>
                    )}
                  </Td>
                  <Td>
                    {p.status === "PENDING" &&
                      !p.proofOfPayment &&
                      p.method !== "COD" && (
                        <Btn size="sm" onClick={() => setPayTarget(p)}>
                          Bayar
                        </Btn>
                      )}
                    {p.status === "FAILED" && (
                      <Btn size="sm" onClick={() => setPayTarget(p)}>
                        Coba Lagi
                      </Btn>
                    )}
                    {p.status === "PENDING" &&
                      (p.proofOfPayment || p.method === "COD") && (
                        <span className="text-xs text-amber-600 font-medium">
                          Menunggu…
                        </span>
                      )}
                    {p.status === "SUCCESS" && (
                      <span className="text-xs text-stone-400">—</span>
                    )}
                  </Td>
                </Tr>
              );
            })
          )}
        </Table>
      </SectionCard>

      {payTarget && (
        <PaymentModal
          payment={payTarget}
          onClose={() => setPayTarget(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
