"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Table, Tr, Td, Badge, Btn, Avatar } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_BOOKINGS } from "@/lib/mock-data";
import { BOOKING_STATUS_CONFIG, PAYMENT_STATUS_CONFIG, formatCurrency, formatDate, SERVICE_LABELS } from "@/lib/dashboard-utils";
import type { BookingStatus } from "@/types/dashboard";

const STATUS_FILTERS: { label: string; value: BookingStatus | "ALL" }[] = [
  { label: "Semua",      value: "ALL" },
  { label: "Pending",    value: "PENDING" },
  { label: "Disetujui",  value: "APPROVED" },
  { label: "Check-in",   value: "CHECKED_IN" },
  { label: "Berlangsung",value: "ONGOING" },
  { label: "Siap Ambil", value: "READY_PICKUP" },
  { label: "Selesai",    value: "COMPLETED" },
];

export function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "ALL">("ALL");

  const filtered = MOCK_BOOKINGS.filter(
    (b) => statusFilter === "ALL" || b.status === statusFilter
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Manajemen Booking"
        subtitle={`${MOCK_BOOKINGS.length} total booking`}
        action={<Btn size="sm">+ Buat Booking</Btn>}
      />

      {/* Status filter pills */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map((f) => {
          const count = f.value === "ALL"
            ? MOCK_BOOKINGS.length
            : MOCK_BOOKINGS.filter((b) => b.status === f.value).length;
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
              <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${statusFilter === f.value ? "bg-white/20 text-white" : "bg-stone-100"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <SectionCard title={`Booking (${filtered.length})`}>
        <Table headers={["Kode", "Customer", "Kucing / Kandang", "Layanan", "Petugas", "Check-in", "Check-out", "Harga", "Status", "Bayar", "Aksi"]}>
          {filtered.map((b) => {
            const bConf = BOOKING_STATUS_CONFIG[b.status];
            const pConf = PAYMENT_STATUS_CONFIG[b.paymentStatus];
            return (
              <Tr key={b.id}>
                <Td><span className="font-mono text-xs text-stone-400">{b.bookingCode}</span></Td>
                <Td>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <Avatar name={b.customerName} size="sm" />
                    <span className="font-medium text-sm">{b.customerName}</span>
                  </div>
                </Td>
                <Td>
                  <div className="font-semibold text-stone-800 text-sm">{b.catName}</div>
                  {b.cageName && <div className="text-[10px] text-stone-400">🏠 {b.cageName}</div>}
                  {!b.cageName && <div className="text-[10px] text-amber-500">⚠ Belum assign</div>}
                </Td>
                <Td>
                  <div className="flex gap-1 flex-wrap">
                    {b.services.map((s) => (
                      <span key={s} className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-medium">{SERVICE_LABELS[s]}</span>
                    ))}
                  </div>
                </Td>
                <Td>
                  {b.caretakerName
                    ? <span className="text-xs text-stone-600">{b.caretakerName}</span>
                    : <span className="text-xs text-amber-500">⚠ Belum assign</span>}
                </Td>
                <Td className="text-xs whitespace-nowrap">{formatDate(b.checkIn)}</Td>
                <Td className="text-xs whitespace-nowrap">{formatDate(b.checkOut)}</Td>
                <Td className="font-semibold text-sm text-stone-800 whitespace-nowrap">{formatCurrency(b.totalPrice)}</Td>
                <Td><Badge label={bConf.label} color={bConf.color} bg={bConf.bg} dot={bConf.dot} size="sm" /></Td>
                <Td><Badge label={pConf.label} color={pConf.color} bg={pConf.bg} size="sm" /></Td>
                <Td>
                  <div className="flex gap-1.5">
                    <Btn variant="ghost" size="sm">Detail</Btn>
                    {b.status === "PENDING" && (
                      <>
                        <Btn size="sm">✓</Btn>
                        <Btn variant="danger" size="sm">✕</Btn>
                      </>
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
