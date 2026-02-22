"use client";

import { useState } from "react";
import { StatCard, SectionCard, Table, Tr, Td, Badge, Btn, Alert, Avatar, PageHeader } from "@/components/dashboard/shared/DashboardUI";
import { ADMIN_STATS, MOCK_BOOKINGS, MOCK_PAYMENTS, MOCK_CAGES, REVENUE_DATA } from "@/lib/mock-data";
import { BOOKING_STATUS_CONFIG, PAYMENT_STATUS_CONFIG, CAGE_STATUS_CONFIG, formatCurrency, formatDate } from "@/lib/dashboard-utils";

function RevenueChart() {
  const max = Math.max(...REVENUE_DATA.map((d) => d.revenue));
  return (
    <div className="px-6 py-4">
      <div className="flex items-end gap-2 h-32">
        {REVENUE_DATA.map((d, i) => {
          const pct = (d.revenue / max) * 100;
          const isLast = i === REVENUE_DATA.length - 1;
          return (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="relative w-full group">
                <div
                  className={`w-full rounded-t-lg transition-all ${isLast ? "bg-amber-500" : "bg-stone-200 group-hover:bg-amber-300"}`}
                  style={{ height: `${pct * 0.9 + 10}%`, minHeight: 8 }}
                />
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {formatCurrency(d.revenue)}
                </div>
              </div>
              <span className="text-[10px] text-stone-400 font-medium">{d.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CageGrid() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-2">
        {MOCK_CAGES.map((cage) => {
          const conf = CAGE_STATUS_CONFIG[cage.status];
          return (
            <div
              key={cage.id}
              className={`rounded-xl p-2.5 border text-center cursor-default ${conf.bg} border-stone-100`}
            >
              <div className="text-base mb-0.5">
                {cage.status === "OCCUPIED" ? "🐱" : cage.status === "MAINTENANCE" ? "🔧" : "✅"}
              </div>
              <div className="text-[10px] font-bold text-stone-700">{cage.name}</div>
              <div className={`text-[9px] font-semibold ${conf.color}`}>{conf.label}</div>
              {cage.currentOccupant && (
                <div className="text-[9px] text-stone-500 truncate">{cage.currentOccupant}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const pendingBookings = MOCK_BOOKINGS.filter((b) => b.status === "PENDING");
  const pendingPayments = MOCK_PAYMENTS.filter((p) => p.status === "PENDING_VERIFICATION");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Dashboard Admin"
        subtitle={`Selamat datang! ${new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`}
        action={
          <div className="flex gap-2">
            <Btn variant="secondary" size="sm">📥 Export</Btn>
            <Btn size="sm">+ Tambah Booking</Btn>
          </div>
        }
      />

      {/* Alerts */}
      {ADMIN_STATS.pendingPayments > 0 && (
        <Alert type="warning" msg={`${ADMIN_STATS.pendingPayments} pembayaran menunggu verifikasi dan ${ADMIN_STATS.pendingBookings} booking menunggu persetujuan.`} />
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Booking Aktif"    value={ADMIN_STATS.totalActiveBookings} icon="📋" iconBg="bg-blue-50"   trend={{ value: "12%", positive: true }} />
        <StatCard label="Kucing Dititip"   value={ADMIN_STATS.totalCatsBoarded}    icon="🐱" iconBg="bg-amber-50"  />
        <StatCard label="Okupansi Kandang" value={`${ADMIN_STATS.cageOccupancyRate}%`} icon="🏠" iconBg="bg-green-50" sub={`${Math.round(MOCK_CAGES.filter(c=>c.status==='OCCUPIED').length)} / ${MOCK_CAGES.length} kandang`} />
        <StatCard label="Pendapatan Bulan" value={formatCurrency(ADMIN_STATS.monthRevenue)} icon="💰" iconBg="bg-purple-50" trend={{ value: "8%", positive: true }} sub={`Hari ini: ${formatCurrency(ADMIN_STATS.todayRevenue)}`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <SectionCard title="Grafik Pendapatan" subtitle="6 bulan terakhir">
            <RevenueChart />
          </SectionCard>
        </div>

        {/* Cage Status */}
        <SectionCard
          title="Status Kandang"
          subtitle={`${MOCK_CAGES.filter(c=>c.status==='AVAILABLE').length} tersedia`}
          action={<Btn variant="ghost" size="sm">Kelola →</Btn>}
        >
          <CageGrid />
          <div className="flex gap-3 px-6 pb-4">
            {Object.entries(CAGE_STATUS_CONFIG).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5 text-xs text-stone-500">
                <span className={`w-2 h-2 rounded-full ${v.dot}`} />
                {v.label}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Bookings */}
        <SectionCard
          title="Booking Menunggu Persetujuan"
          subtitle={`${pendingBookings.length} booking`}
          action={<Btn variant="ghost" size="sm">Lihat semua →</Btn>}
        >
          {pendingBookings.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-sm">Tidak ada booking pending</div>
          ) : (
            <div className="divide-y divide-stone-50">
              {pendingBookings.map((b) => (
                <div key={b.id} className="px-6 py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-stone-800 text-sm">{b.catName}</span>
                      <span className="text-xs text-stone-400">{b.bookingCode}</span>
                    </div>
                    <p className="text-xs text-stone-500">{b.customerName} · {formatDate(b.checkIn)} – {formatDate(b.checkOut)}</p>
                    <div className="flex gap-1.5 mt-1">
                      {b.services.map((s) => (
                        <span key={s} className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-full font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <Btn variant="primary" size="sm">✓ Setuju</Btn>
                    <Btn variant="danger" size="sm">✕</Btn>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Pending Payments */}
        <SectionCard
          title="Pembayaran Perlu Verifikasi"
          subtitle={`${pendingPayments.length} transaksi`}
          action={<Btn variant="ghost" size="sm">Lihat semua →</Btn>}
        >
          {pendingPayments.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-sm">Tidak ada pembayaran pending</div>
          ) : (
            <div className="divide-y divide-stone-50">
              {pendingPayments.map((p) => {
                const conf = PAYMENT_STATUS_CONFIG[p.status];
                return (
                  <div key={p.id} className="px-6 py-3.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-stone-800 text-sm">{p.customerName}</span>
                        <Badge label={conf.label} color={conf.color} bg={conf.bg} size="sm" />
                      </div>
                      <p className="text-xs text-stone-500">{p.bookingCode} · {formatCurrency(p.amount)}</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <Btn variant="primary" size="sm">Verifikasi</Btn>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>
      </div>

      {/* Recent Bookings Table */}
      <SectionCard
        title="Booking Terbaru"
        subtitle="Semua booking sistem"
        action={
          <div className="flex gap-2">
            <Btn variant="secondary" size="sm">Filter</Btn>
            <Btn variant="ghost" size="sm">Lihat semua →</Btn>
          </div>
        }
      >
        <Table headers={["Kode", "Customer", "Kucing", "Layanan", "Check-in", "Check-out", "Status Booking", "Status Bayar", "Aksi"]}>
          {MOCK_BOOKINGS.map((b) => {
            const bConf = BOOKING_STATUS_CONFIG[b.status];
            const pConf = PAYMENT_STATUS_CONFIG[b.paymentStatus];
            return (
              <Tr key={b.id}>
                <Td><span className="font-mono text-xs text-stone-500">{b.bookingCode}</span></Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Avatar name={b.customerName} size="sm" />
                    <span className="font-medium text-stone-800 text-sm whitespace-nowrap">{b.customerName}</span>
                  </div>
                </Td>
                <Td><span className="font-semibold text-stone-800">{b.catName}</span></Td>
                <Td>
                  <div className="flex gap-1 flex-wrap">
                    {b.services.map((s) => (
                      <span key={s} className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full font-medium border border-amber-100">{s}</span>
                    ))}
                  </div>
                </Td>
                <Td className="whitespace-nowrap text-xs">{formatDate(b.checkIn)}</Td>
                <Td className="whitespace-nowrap text-xs">{formatDate(b.checkOut)}</Td>
                <Td><Badge label={bConf.label} color={bConf.color} bg={bConf.bg} dot={bConf.dot} size="sm" /></Td>
                <Td><Badge label={pConf.label} color={pConf.color} bg={pConf.bg} size="sm" /></Td>
                <Td>
                  <div className="flex gap-1.5">
                    <Btn variant="ghost" size="sm">Detail</Btn>
                    {b.status === "PENDING" && <Btn size="sm">Setuju</Btn>}
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
