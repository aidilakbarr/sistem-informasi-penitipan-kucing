"use client";

import { useState } from "react";
import { PageHeader, SectionCard, StatCard, Table, Tr, Td, Btn, Badge } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_DELIVERY_TASKS } from "@/lib/mock-data";
import { DELIVERY_STATUS_CONFIG } from "@/lib/dashboard-utils";
import type { DeliveryTask } from "@/types/dashboard";

// Extra mock history
const HISTORY_TASKS: DeliveryTask[] = [
  ...MOCK_DELIVERY_TASKS.filter(t => t.status === "SAMPAI_TUJUAN"),
  {
    id: "dh1", bookingId: "bh1", bookingCode: "KK-20240096",
    courierId: "u4", customerName: "Bella Putri", customerPhone: "08912345678",
    address: "Jl. Anggrek No. 3, Kota Kendari",
    catName: "Snowy", type: "DELIVERY",
    scheduledAt: "2024-06-14 13:00", status: "SAMPAI_TUJUAN",
  },
  {
    id: "dh2", bookingId: "bh2", bookingCode: "KK-20240089",
    courierId: "u4", customerName: "Rudi Hartono", customerPhone: "08723456789",
    address: "Perum. Asri Blok C No. 12, Kendari",
    catName: "Oreo", type: "PICKUP",
    scheduledAt: "2024-06-13 10:00", status: "SAMPAI_TUJUAN",
  },
  {
    id: "dh3", bookingId: "bh3", bookingCode: "KK-20240082",
    courierId: "u4", customerName: "Nanda Kusuma", customerPhone: "08634567890",
    address: "Jl. Melati No. 7, Kota Kendari",
    catName: "Whiskers", type: "DELIVERY",
    scheduledAt: "2024-06-12 15:00", status: "SAMPAI_TUJUAN",
  },
  {
    id: "dh4", bookingId: "bh4", bookingCode: "KK-20240077",
    courierId: "u4", customerName: "Tika Rahayu", customerPhone: "08545678901",
    address: "Jl. Dahlia No. 22, Kota Kendari",
    catName: "Tiger", type: "PICKUP",
    scheduledAt: "2024-06-11 09:00", status: "SAMPAI_TUJUAN",
  },
  {
    id: "dh5", bookingId: "bh5", bookingCode: "KK-20240071",
    courierId: "u4", customerName: "Rizky Aditya", customerPhone: "08456789012",
    address: "Komp. Permata Indah No. 5, Kendari",
    catName: "Luna", type: "DELIVERY",
    scheduledAt: "2024-06-10 14:30", status: "SAMPAI_TUJUAN",
  },
];

const DAILY_DATA = [
  { day: "Sen", count: 4 }, { day: "Sel", count: 6 }, { day: "Rab", count: 3 },
  { day: "Kam", count: 7 }, { day: "Jum", count: 5 }, { day: "Sab", count: 8 },
  { day: "Min", count: 2 },
];

function MiniBar({ data }: { data: { day: string; count: number }[] }) {
  const max = Math.max(...data.map(d => d.count));
  return (
    <div className="flex items-end gap-2 h-24 px-6 pt-4 pb-2">
      {data.map((d, i) => {
        const isToday = i === 1; // "Sel" = today in mock
        return (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group">
            <div className="relative w-full">
              <div
                className={`w-full rounded-t-lg transition-all ${isToday ? "bg-amber-500" : "bg-stone-200 group-hover:bg-amber-300"}`}
                style={{ height: `${(d.count / max) * 100}%`, minHeight: 4 }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {d.count} tugas
              </div>
            </div>
            <span className="text-[9px] text-stone-400 font-medium">{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}

function TaskTypeChip({ type }: { type: "PICKUP" | "DELIVERY" }) {
  return (
    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
      type === "PICKUP"
        ? "bg-blue-50 text-blue-700 border border-blue-100"
        : "bg-green-50 text-green-700 border border-green-100"
    }`}>
      {type === "PICKUP" ? "🐱 Jemput" : "🏠 Antar"}
    </span>
  );
}

export function CourierHistoryPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "PICKUP" | "DELIVERY">("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalDeliveries  = HISTORY_TASKS.filter(t => t.type === "DELIVERY").length;
  const totalPickups     = HISTORY_TASKS.filter(t => t.type === "PICKUP").length;
  const totalThisWeek    = HISTORY_TASKS.length;

  const filtered = HISTORY_TASKS.filter(t => {
    const matchSearch = search === ""
      || t.customerName.toLowerCase().includes(search.toLowerCase())
      || t.catName.toLowerCase().includes(search.toLowerCase())
      || t.bookingCode.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "ALL" || t.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Riwayat Tugas"
        subtitle={`${HISTORY_TASKS.length} tugas selesai`}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Selesai"   value={47}                icon="🏆" iconBg="bg-amber-50"  trend={{ value: "12%", positive: true }} />
        <StatCard label="Minggu Ini"      value={totalThisWeek}    icon="📅" iconBg="bg-blue-50"   />
        <StatCard label="Total Antar"     value={totalDeliveries}  icon="🏠" iconBg="bg-green-50"  />
        <StatCard label="Total Jemput"    value={totalPickups}     icon="🐱" iconBg="bg-purple-50" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity chart */}
        <SectionCard title="Aktivitas Minggu Ini" subtitle="Jumlah tugas per hari">
          <MiniBar data={DAILY_DATA} />
          <div className="px-6 pb-4 flex justify-between text-xs text-stone-400">
            <span>Total: <strong className="text-stone-700">{DAILY_DATA.reduce((s,d)=>s+d.count,0)} tugas</strong></span>
            <span>Rata-rata: <strong className="text-stone-700">{Math.round(DAILY_DATA.reduce((s,d)=>s+d.count,0)/7)}/hari</strong></span>
          </div>
        </SectionCard>

        {/* Summary */}
        <div className="lg:col-span-2">
          <SectionCard title="Ringkasan Performa" subtitle="Bulan Juni 2024">
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                { label: "Ketepatan Waktu",    value: "94%",    icon: "⏰", color: "text-green-600", bg: "bg-green-50" },
                { label: "Rating Customer",    value: "4.8/5",  icon: "⭐", color: "text-amber-600", bg: "bg-amber-50" },
                { label: "Tugas Diselesaikan", value: "47",     icon: "✅", color: "text-blue-600",  bg: "bg-blue-50" },
                { label: "Jarak Tempuh",       value: "312 km", icon: "📍", color: "text-purple-600", bg: "bg-purple-50" },
              ].map(({ label, value, icon, color, bg }) => (
                <div key={label} className={`rounded-2xl ${bg} p-4 flex items-center gap-3`}>
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="text-xs text-stone-500 font-medium">{label}</p>
                    <p className={`font-black text-lg ${color}`}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* History Table */}
      <SectionCard
        title="Daftar Tugas Selesai"
        subtitle={`${filtered.length} tugas`}
        action={
          <div className="flex gap-2">
            <button
              onClick={() => setTypeFilter(typeFilter === "PICKUP" ? "ALL" : "PICKUP")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === "PICKUP" ? "bg-blue-500 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >🐱 Jemput</button>
            <button
              onClick={() => setTypeFilter(typeFilter === "DELIVERY" ? "ALL" : "DELIVERY")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === "DELIVERY" ? "bg-green-500 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >🏠 Antar</button>
          </div>
        }
      >
        {/* Search */}
        <div className="px-6 pt-4 pb-2">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama customer, kucing, atau kode booking…"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
          />
        </div>

        {/* Mobile card list */}
        <div className="lg:hidden divide-y divide-stone-50">
          {filtered.map(t => (
            <div key={t.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-stone-900">{t.catName}</span>
                    <TaskTypeChip type={t.type} />
                  </div>
                  <p className="text-xs text-stone-500">{t.customerName}</p>
                  <p className="text-[10px] text-stone-400 font-mono">{t.bookingCode}</p>
                </div>
                <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-semibold flex-shrink-0">✓ Selesai</span>
              </div>
              <p className="text-xs text-stone-400 truncate">📍 {t.address}</p>
              <p className="text-xs text-stone-400">🕐 {t.scheduledAt}</p>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block">
          <Table headers={["Kode", "Kucing", "Customer", "Tipe", "Jadwal", "Alamat", "Status"]}>
            {filtered.map(t => (
              <Tr key={t.id}>
                <Td><span className="font-mono text-xs text-stone-400">{t.bookingCode}</span></Td>
                <Td className="font-semibold text-stone-800">{t.catName}</Td>
                <Td className="text-stone-600 text-sm whitespace-nowrap">{t.customerName}</Td>
                <Td><TaskTypeChip type={t.type} /></Td>
                <Td className="text-xs text-stone-500 whitespace-nowrap">{t.scheduledAt}</Td>
                <Td>
                  <span className="text-xs text-stone-500 block max-w-[200px] truncate" title={t.address}>
                    {t.address}
                  </span>
                </Td>
                <Td>
                  <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-semibold">✓ Selesai</span>
                </Td>
              </Tr>
            ))}
          </Table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-stone-400">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-sm">Tidak ada hasil pencarian</p>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
