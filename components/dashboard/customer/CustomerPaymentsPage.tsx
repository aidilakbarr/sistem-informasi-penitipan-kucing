"use client";

import { useState } from "react";
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
import { MOCK_PAYMENTS, MOCK_BOOKINGS } from "@/lib/mock-data";
import {
  PAYMENT_STATUS_CONFIG,
  formatCurrency,
  formatDate,
} from "@/lib/dashboard-utils";
import type { Payment } from "@/types/dashboard";

const MY_PAYMENTS = MOCK_PAYMENTS.filter((p) =>
  MOCK_BOOKINGS.some((b) => b.id === p.bookingId && b.customerId === "u3"),
);

// ─── Upload Modal ─────────────────────────────────────────────────────────────

function UploadModal({
  payment,
  onClose,
}: {
  payment: Payment;
  onClose: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  function handleFile(f: File) {
    if (f.type.startsWith("image/") || f.type === "application/pdf") setFile(f);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="font-black text-stone-900">Upload Bukti Transfer</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 text-xl"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="font-black text-stone-900 mb-1">Bukti Terkirim!</h3>
            <p className="text-sm text-stone-500">
              Pembayaran Anda sedang diverifikasi oleh admin. Proses verifikasi
              maksimal 1x24 jam.
            </p>
            <Btn onClick={onClose} className="mt-6 w-full justify-center">
              Tutup
            </Btn>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Payment info */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-500">Kode Booking</span>
                <span className="font-mono font-semibold text-stone-700">
                  {payment.bookingCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 text-sm">Total Tagihan</span>
                <span className="font-black text-amber-600 text-lg">
                  {formatCurrency(payment.amount)}
                </span>
              </div>
            </div>

            {/* Transfer info */}
            <div className="bg-stone-50 rounded-2xl p-4 space-y-2 text-sm">
              <p className="font-bold text-stone-700 text-xs uppercase tracking-wide">
                Info Rekening Tujuan
              </p>
              {[
                { label: "Bank", value: "BCA" },
                { label: "No. Rekening", value: "1234567890" },
                { label: "Atas Nama", value: "AnZ Pet Care Indonesia" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-stone-400">{label}</span>
                  <span className="font-semibold text-stone-800">{value}</span>
                </div>
              ))}
            </div>

            {/* File upload */}
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
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  dragOver
                    ? "border-amber-400 bg-amber-50"
                    : file
                      ? "border-green-400 bg-green-50"
                      : "border-stone-200 hover:border-amber-300 hover:bg-amber-50/30"
                }`}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
                {file ? (
                  <>
                    <div className="text-3xl mb-1">
                      {file.type.startsWith("image/") ? "🖼️" : "📄"}
                    </div>
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
                      JPG, PNG, PDF · Maks. 5MB
                    </p>
                  </>
                )}
              </div>
            </div>

            <Btn
              type="submit"
              disabled={!file}
              className="w-full justify-center py-3.5"
            >
              📤 Kirim Bukti Pembayaran
            </Btn>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CustomerPaymentsPage() {
  const [uploadTarget, setUploadTarget] = useState<Payment | null>(null);

  const unpaid = MY_PAYMENTS.filter((p) => p.status === "UNPAID");
  const pending = MY_PAYMENTS.filter(
    (p) => p.status === "PENDING_VERIFICATION",
  );
  const paid = MY_PAYMENTS.filter((p) => p.status === "PAID");
  const totalPaid = paid.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Pembayaran"
        subtitle="Kelola tagihan dan riwayat transaksi"
      />

      {unpaid.length > 0 && (
        <Alert
          type="warning"
          msg={`${unpaid.length} tagihan belum dibayar. Segera lakukan pembayaran sebelum batas waktu.`}
        />
      )}
      {pending.length > 0 && (
        <Alert
          type="info"
          msg={`${pending.length} pembayaran sedang diverifikasi. Proses maks. 1x24 jam.`}
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

      {/* Unpaid invoices (prominent) */}
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
                  <p className="font-bold text-stone-900">{p.bookingCode}</p>
                  <p className="text-xs text-stone-500">
                    Dibuat: {formatDate(p.createdAt)}
                  </p>
                  <p className="font-black text-amber-600 text-lg">
                    {formatCurrency(p.amount)}
                  </p>
                </div>
                <Btn onClick={() => setUploadTarget(p)}>💳 Bayar Sekarang</Btn>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Pending verification */}
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
                    <p className="font-bold text-stone-900">{p.bookingCode}</p>
                    <p className="text-xs text-stone-500">
                      Dikirim: {formatDate(p.createdAt)}
                    </p>
                    <p className="font-semibold text-stone-700">
                      {formatCurrency(p.amount)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge label={conf.label} color={conf.color} bg={conf.bg} />
                    <span className="text-xs text-stone-400">
                      Estimasi: 1x24 jam
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* All transaction history */}
      <SectionCard
        title="Riwayat Transaksi"
        subtitle={`${MY_PAYMENTS.length} transaksi`}
      >
        <Table
          headers={["Kode Booking", "Tanggal", "Jumlah", "Status", "Aksi"]}
        >
          {MY_PAYMENTS.map((p) => {
            const conf = PAYMENT_STATUS_CONFIG[p.status];
            return (
              <Tr key={p.id}>
                <Td>
                  <span className="font-mono text-xs text-stone-500">
                    {p.bookingCode}
                  </span>
                </Td>
                <Td className="text-stone-500 text-xs whitespace-nowrap">
                  {p.verifiedAt
                    ? formatDate(p.verifiedAt)
                    : formatDate(p.createdAt)}
                </Td>
                <Td>
                  <span className="font-bold text-stone-900">
                    {formatCurrency(p.amount)}
                  </span>
                </Td>
                <Td>
                  <Badge label={conf.label} color={conf.color} bg={conf.bg} />
                </Td>
                <Td>
                  {p.status === "UNPAID" && (
                    <Btn size="sm" onClick={() => setUploadTarget(p)}>
                      Bayar
                    </Btn>
                  )}
                  {p.status === "PAID" && (
                    <Btn variant="ghost" size="sm">
                      🧾 Kwitansi
                    </Btn>
                  )}
                  {p.status === "PENDING_VERIFICATION" && (
                    <span className="text-xs text-amber-600">Menunggu…</span>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Table>
      </SectionCard>

      {uploadTarget && (
        <UploadModal
          payment={uploadTarget}
          onClose={() => setUploadTarget(null)}
        />
      )}
    </div>
  );
}
