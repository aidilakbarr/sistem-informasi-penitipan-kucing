"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Table, Tr, Td, Badge, Btn, Avatar, StatCard } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_PAYMENTS } from "@/lib/mock-data";
import { PAYMENT_STATUS_CONFIG, formatCurrency, formatDate } from "@/lib/dashboard-utils";
import type { PaymentStatus } from "@/types/dashboard";

export function AdminPaymentsPage() {
  const [filter, setFilter] = useState<PaymentStatus | "ALL">("ALL");

  const filtered = MOCK_PAYMENTS.filter((p) => filter === "ALL" || p.status === filter);
  const totalPaid = MOCK_PAYMENTS.filter((p) => p.status === "PAID").reduce((s, p) => s + p.amount, 0);
  const pendingCount = MOCK_PAYMENTS.filter((p) => p.status === "PENDING_VERIFICATION").length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader
        title="Manajemen Pembayaran"
        subtitle="Verifikasi dan kelola semua transaksi"
        action={
          <div className="flex gap-2">
            <Btn variant="secondary" size="sm">📊 Laporan</Btn>
            <Btn variant="secondary" size="sm">📥 Export CSV</Btn>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pemasukan"    value={formatCurrency(totalPaid)} icon="💰" iconBg="bg-green-50" />
        <StatCard label="Perlu Verifikasi"   value={pendingCount}              icon="⏳" iconBg="bg-amber-50" />
        <StatCard label="Belum Bayar"        value={MOCK_PAYMENTS.filter(p=>p.status==="UNPAID").length} icon="❌" iconBg="bg-red-50" />
        <StatCard label="Total Transaksi"    value={MOCK_PAYMENTS.length}      icon="📋" iconBg="bg-blue-50" />
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(["ALL", "UNPAID", "PENDING_VERIFICATION", "PAID", "FAILED"] as const).map((s) => {
          const label = s === "ALL" ? "Semua" : PAYMENT_STATUS_CONFIG[s].label;
          const conf = s !== "ALL" ? PAYMENT_STATUS_CONFIG[s] : null;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                filter === s ? "bg-amber-500 text-white border-amber-500" : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <SectionCard title={`Pembayaran (${filtered.length})`}>
        <Table headers={["Customer", "Kode Booking", "Jumlah", "Status", "Bukti", "Waktu", "Aksi"]}>
          {filtered.map((p) => {
            const conf = PAYMENT_STATUS_CONFIG[p.status];
            return (
              <Tr key={p.id}>
                <Td>
                  <div className="flex items-center gap-2">
                    <Avatar name={p.customerName} size="sm" />
                    <span className="font-medium text-sm whitespace-nowrap">{p.customerName}</span>
                  </div>
                </Td>
                <Td><span className="font-mono text-xs text-stone-400">{p.bookingCode}</span></Td>
                <Td><span className="font-bold text-stone-900">{formatCurrency(p.amount)}</span></Td>
                <Td><Badge label={conf.label} color={conf.color} bg={conf.bg} /></Td>
                <Td>
                  {p.proofUrl
                    ? <Btn variant="ghost" size="sm">📎 Lihat</Btn>
                    : <span className="text-xs text-stone-300">—</span>}
                </Td>
                <Td className="text-xs text-stone-400 whitespace-nowrap">
                  {p.verifiedAt ? formatDate(p.verifiedAt) : formatDate(p.createdAt)}
                </Td>
                <Td>
                  <div className="flex gap-1.5">
                    {p.status === "PENDING_VERIFICATION" && (
                      <>
                        <Btn size="sm">✓ Verifikasi</Btn>
                        <Btn variant="danger" size="sm">✕ Tolak</Btn>
                      </>
                    )}
                    {p.status === "PAID" && (
                      <Btn variant="ghost" size="sm">Kwitansi</Btn>
                    )}
                    {p.status === "UNPAID" && (
                      <Btn variant="secondary" size="sm">Ingatkan</Btn>
                    )}
                  </div>
                </Td>
              </Tr>
            );
          })}
        </Table>
      </SectionCard>
    </div>
  );
}
