"use client";

import { useState } from "react";
import { PageHeader, SectionCard, StatCard, Btn, Table, Tr, Td, Badge } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_BOOKINGS, MOCK_PAYMENTS, REVENUE_DATA } from "@/lib/mock-data";
import { BOOKING_STATUS_CONFIG, PAYMENT_STATUS_CONFIG, formatCurrency, formatDate } from "@/lib/dashboard-utils";

// ─── Mini Bar Chart ───────────────────────────────────────────────────────────
function BarChart({ data, valueKey, labelKey, color = "bg-amber-500" }: {
  data: Record<string, any>[];
  valueKey: string;
  labelKey: string;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d[valueKey]));
  return (
    <div className="flex items-end gap-2 h-40 pt-4">
      {data.map((d, i) => {
        const pct = max > 0 ? (d[valueKey] / max) * 100 : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
            <div className="relative w-full">
              <div
                className={`w-full rounded-t-lg transition-all ${color} opacity-80 group-hover:opacity-100`}
                style={{ height: `${Math.max(pct * 0.85 + 10, 6)}%`, minHeight: 4 }}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {typeof d[valueKey] === "number" && d[valueKey] > 10000
                  ? formatCurrency(d[valueKey])
                  : d[valueKey]}
              </div>
            </div>
            <span className="text-[10px] text-stone-400 font-medium">{d[labelKey]}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Donut Chart (CSS) ────────────────────────────────────────────────────────
function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  let cumulativePct = 0;
  const gradientParts = segments.map((seg) => {
    const pct = (seg.value / total) * 100;
    const start = cumulativePct;
    const end = cumulativePct + pct;
    cumulativePct = end;
    return `${seg.color} ${start}% ${end}%`;
  });
  const gradient = `conic-gradient(${gradientParts.join(", ")})`;
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-28 h-28 flex-shrink-0">
        <div className="w-full h-full rounded-full" style={{ background: gradient }} />
        <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
          <span className="text-xs font-black text-stone-700">{total}</span>
        </div>
      </div>
      <div className="space-y-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-xs">
            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.color}`} />
            <span className="text-stone-600">{s.label}</span>
            <span className="font-bold text-stone-900 ml-auto pl-3">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function AdminReportsPage() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("monthly");

  const paidPayments = MOCK_PAYMENTS.filter((p) => p.status === "PAID");
  const totalRevenue = paidPayments.reduce((s, p) => s + p.amount, 0);
  const completedBookings = MOCK_BOOKINGS.filter((b) => b.status === "COMPLETED");
  const activeBookings = MOCK_BOOKINGS.filter((b) => ["ONGOING", "CHECKED_IN"].includes(b.status));

  const bookingSegments = [
    { label: "Selesai",     value: MOCK_BOOKINGS.filter(b => b.status === "COMPLETED").length,  color: "bg-stone-400" },
    { label: "Berlangsung", value: MOCK_BOOKINGS.filter(b => b.status === "ONGOING").length,    color: "bg-green-500" },
    { label: "Pending",     value: MOCK_BOOKINGS.filter(b => b.status === "PENDING").length,    color: "bg-amber-500" },
    { label: "Disetujui",   value: MOCK_BOOKINGS.filter(b => b.status === "APPROVED").length,   color: "bg-blue-500" },
    { label: "Dibatalkan",  value: MOCK_BOOKINGS.filter(b => b.status === "CANCELLED").length,  color: "bg-red-400"  },
  ].filter(s => s.value > 0);

  const serviceData = [
    { label: "Regular",      count: MOCK_BOOKINGS.filter(b => b.services.includes("REGULAR")).length },
    { label: "VIP",          count: MOCK_BOOKINGS.filter(b => b.services.includes("VIP")).length },
    { label: "Grooming",     count: MOCK_BOOKINGS.filter(b => b.services.includes("GROOMING")).length },
    { label: "Antar-Jemput", count: MOCK_BOOKINGS.filter(b => b.services.includes("ANTAR_JEMPUT")).length },
  ];

  const weeklyData = [
    { day: "Sen", revenue: 1_200_000 }, { day: "Sel", revenue: 1_875_000 },
    { day: "Rab", revenue: 950_000  }, { day: "Kam", revenue: 2_100_000 },
    { day: "Jum", revenue: 1_650_000 }, { day: "Sab", revenue: 2_450_000 },
    { day: "Min", revenue: 1_100_000 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Laporan & Analitik"
        subtitle="Ringkasan performa bisnis KucingKu"
        action={
          <div className="flex gap-2">
            <Btn variant="secondary" size="sm">📥 Export PDF</Btn>
            <Btn variant="secondary" size="sm">📊 Export Excel</Btn>
          </div>
        }
      />

      {/* Period selector */}
      <div className="flex gap-2">
        {(["daily", "weekly", "monthly"] as const).map((p) => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              period === p ? "bg-amber-500 text-white" : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"
            }`}
          >
            {p === "daily" ? "Harian" : p === "weekly" ? "Mingguan" : "Bulanan"}
          </button>
        ))}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pendapatan"   value={formatCurrency(totalRevenue)} icon="💰" iconBg="bg-green-50"  trend={{ value: "8.2%", positive: true  }} />
        <StatCard label="Total Booking"      value={MOCK_BOOKINGS.length}         icon="📋" iconBg="bg-blue-50"   trend={{ value: "12%",  positive: true  }} />
        <StatCard label="Booking Selesai"    value={completedBookings.length}     icon="✅" iconBg="bg-stone-50"  sub={`${Math.round(completedBookings.length / MOCK_BOOKINGS.length * 100)}% completion rate`} />
        <StatCard label="Booking Aktif"      value={activeBookings.length}        icon="🐱" iconBg="bg-amber-50"  trend={{ value: "3%",   positive: false }} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2">
          <SectionCard
            title="Grafik Pendapatan"
            subtitle={period === "monthly" ? "6 bulan terakhir" : period === "weekly" ? "7 hari terakhir" : "24 jam terakhir"}
          >
            <div className="px-6 pb-4">
              <BarChart
                data={period === "weekly" ? weeklyData : REVENUE_DATA}
                valueKey={period === "weekly" ? "revenue" : "revenue"}
                labelKey={period === "weekly" ? "day" : "month"}
              />
              <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between text-sm">
                <div>
                  <p className="text-stone-400 text-xs">Total periode ini</p>
                  <p className="font-black text-stone-900">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="text-right">
                  <p className="text-stone-400 text-xs">Rata-rata per bulan</p>
                  <p className="font-black text-stone-900">{formatCurrency(Math.round(totalRevenue / 6))}</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Booking distribution */}
        <SectionCard title="Distribusi Booking" subtitle="Berdasarkan status">
          <div className="px-6 py-4">
            <DonutChart segments={bookingSegments} />
          </div>
        </SectionCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Service popularity */}
        <SectionCard title="Popularitas Layanan" subtitle="Jumlah booking per jenis layanan">
          <div className="px-6 pb-2">
            <BarChart data={serviceData} valueKey="count" labelKey="label" color="bg-blue-400" />
          </div>
          <div className="px-6 pb-5 space-y-2.5">
            {serviceData.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xs text-stone-600 w-24 flex-shrink-0">{s.label}</span>
                <div className="flex-1 bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-400 h-full rounded-full transition-all"
                    style={{ width: `${(s.count / Math.max(...serviceData.map(x => x.count))) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-stone-700 w-6 text-right">{s.count}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Monthly summary table */}
        <SectionCard title="Ringkasan Bulanan" subtitle="6 bulan terakhir">
          <Table headers={["Bulan", "Pendapatan", "Booking", "Growth"]}>
            {REVENUE_DATA.map((d, i) => {
              const prev = i > 0 ? REVENUE_DATA[i - 1].revenue : d.revenue;
              const growth = ((d.revenue - prev) / prev * 100).toFixed(1);
              const positive = d.revenue >= prev;
              return (
                <Tr key={d.month}>
                  <Td className="font-semibold">{d.month} 2024</Td>
                  <Td className="font-bold text-stone-900">{formatCurrency(d.revenue)}</Td>
                  <Td className="text-stone-600">{Math.round(d.revenue / 200000)}</Td>
                  <Td>
                    {i === 0 ? (
                      <span className="text-stone-400 text-xs">—</span>
                    ) : (
                      <span className={`text-xs font-bold ${positive ? "text-green-600" : "text-red-600"}`}>
                        {positive ? "▲" : "▼"} {Math.abs(parseFloat(growth))}%
                      </span>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Table>
        </SectionCard>
      </div>

      {/* Top customers */}
      <SectionCard
        title="Customer Terbanyak Booking"
        subtitle="Berdasarkan total transaksi"
        action={<Btn variant="ghost" size="sm">Export →</Btn>}
      >
        <Table headers={["Customer", "Total Booking", "Total Bayar", "Booking Terakhir", "Status"]}>
          {[
            { name: "Rina Maulida", bookings: 3, total: 1_050_000, last: "2024-06-15", active: true },
            { name: "Sari Indah", bookings: 2, total: 525_000, last: "2024-06-10", active: true },
            { name: "Dewi Pratiwi", bookings: 2, total: 300_000, last: "2024-06-13", active: false },
            { name: "Hendra Wijaya", bookings: 1, total: 285_000, last: "2024-06-14", active: false },
            { name: "Eko Prasetyo", bookings: 1, total: 0, last: "2024-06-15", active: false },
          ].map((c) => (
            <Tr key={c.name}>
              <Td>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700 flex-shrink-0">
                    {c.name.split(" ").map(w => w[0]).join("").slice(0,2)}
                  </div>
                  <span className="font-medium text-stone-800 text-sm whitespace-nowrap">{c.name}</span>
                </div>
              </Td>
              <Td className="font-semibold text-stone-700">{c.bookings}x</Td>
              <Td className="font-bold text-stone-900">{formatCurrency(c.total)}</Td>
              <Td className="text-xs text-stone-500">{formatDate(c.last)}</Td>
              <Td>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.active ? "bg-green-50 text-green-700" : "bg-stone-100 text-stone-500"}`}>
                  {c.active ? "Aktif" : "—"}
                </span>
              </Td>
            </Tr>
          ))}
        </Table>
      </SectionCard>
    </div>
  );
}
