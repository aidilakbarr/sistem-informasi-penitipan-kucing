"use client";

import { StatCard, SectionCard, PageHeader, Badge, Btn, Alert } from "@/components/dashboard/shared/DashboardUI";
import { CUSTOMER_STATS, MOCK_BOOKINGS, MOCK_DAILY_REPORTS, MOCK_CATS } from "@/lib/mock-data";
import { BOOKING_STATUS_CONFIG, PAYMENT_STATUS_CONFIG, formatCurrency, formatDate } from "@/lib/dashboard-utils";

const MY_BOOKINGS = MOCK_BOOKINGS.filter((b) => b.customerId === "u3");
const ACTIVE_BOOKING = MY_BOOKINGS.find((b) => b.status === "ONGOING");
const LATEST_REPORT = ACTIVE_BOOKING
  ? MOCK_DAILY_REPORTS.find((r) => r.bookingId === ACTIVE_BOOKING.id)
  : null;

export function CustomerDashboard() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Halo, Rina! 👋"
        subtitle="Pantau kucing kesayangan Anda dari sini."
        action={<Btn size="sm">+ Pesan Penitipan</Btn>}
      />

      {/* Pending payment alert */}
      {MY_BOOKINGS.some((b) => b.paymentStatus === "UNPAID") && (
        <Alert type="warning" msg="Anda memiliki tagihan yang belum dibayar. Segera lakukan pembayaran untuk konfirmasi booking." />
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Booking Aktif"   value={CUSTOMER_STATS.activeBookings}  icon="📋" iconBg="bg-blue-50"   />
        <StatCard label="Kucing Saya"     value={CUSTOMER_STATS.totalCats}       icon="🐱" iconBg="bg-amber-50"  />
        <StatCard label="Total Booking"   value={CUSTOMER_STATS.totalBookings}   icon="📅" iconBg="bg-green-50"  />
        <StatCard label="Belum Bayar"     value={CUSTOMER_STATS.pendingPayments} icon="💳" iconBg="bg-red-50"    />
      </div>

      {/* Active Booking Card */}
      {ACTIVE_BOOKING && (
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[120px] leading-none opacity-10 select-none -translate-y-4">🐱</div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                🟢 Sedang Dititipkan
              </span>
            </div>
            <h2 className="text-2xl font-black mb-1">{ACTIVE_BOOKING.catName}</h2>
            <p className="text-amber-100 text-sm mb-4">{ACTIVE_BOOKING.bookingCode} · {ACTIVE_BOOKING.cageName ?? "Kandang belum assign"}</p>
            <div className="flex gap-4 text-sm">
              <div>
                <p className="text-amber-200 text-xs">Check-in</p>
                <p className="font-bold">{formatDate(ACTIVE_BOOKING.checkIn)}</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-amber-200 text-xs">Check-out</p>
                <p className="font-bold">{formatDate(ACTIVE_BOOKING.checkOut)}</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-amber-200 text-xs">Petugas</p>
                <p className="font-bold">{ACTIVE_BOOKING.caretakerName ?? "—"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Latest Daily Report */}
        {LATEST_REPORT && (
          <SectionCard title="Laporan Terbaru" subtitle={`${ACTIVE_BOOKING!.catName} · ${LATEST_REPORT.date}`}>
            <div className="p-6">
              {LATEST_REPORT.isEmergency && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 font-semibold">
                  🚨 Ada kondisi darurat! Segera hubungi admin.
                </div>
              )}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { label: "Makan",  val: LATEST_REPORT.isEating },
                  { label: "Minum",  val: LATEST_REPORT.isDrinking },
                  { label: "BAB",    val: LATEST_REPORT.isDefecating },
                  { label: "BAK",    val: LATEST_REPORT.isUrinating },
                ].map(({ label, val }) => (
                  <div key={label} className={`text-center p-2 rounded-xl ${val ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    <div className="text-lg">{val ? "✅" : "❌"}</div>
                    <div className="text-[10px] font-semibold">{label}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  LATEST_REPORT.activity === "AKTIF" ? "bg-green-100 text-green-700"
                  : LATEST_REPORT.activity === "LEMAS" ? "bg-red-100 text-red-700"
                  : "bg-stone-100 text-stone-600"
                }`}>
                  Aktivitas: {LATEST_REPORT.activity}
                </div>
                {LATEST_REPORT.temperature && (
                  <span className="text-sm text-stone-600">🌡️ {LATEST_REPORT.temperature}°C</span>
                )}
              </div>
              <p className="text-sm text-stone-600 italic bg-stone-50 rounded-xl p-3">
                "{LATEST_REPORT.notes}"
              </p>
              {LATEST_REPORT.photos.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {LATEST_REPORT.photos.map((_, i) => (
                    <div key={i} className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">📸</div>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>
        )}

        {/* My Cats */}
        <SectionCard title="Kucing Saya" action={<Btn variant="ghost" size="sm">Kelola →</Btn>}>
          <div className="divide-y divide-stone-50">
            {MOCK_CATS.map((cat) => (
              <div key={cat.id} className="px-6 py-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">🐱</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-900">{cat.name}</p>
                  <p className="text-xs text-stone-500">{cat.breed} · {cat.age} tahun · {cat.weight} kg</p>
                  <div className="flex items-center gap-2 mt-1">
                    {cat.vaccinationStatus
                      ? <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full font-semibold">✓ Vaksin OK</span>
                      : <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">✗ Belum Vaksin</span>
                    }
                  </div>
                </div>
                <Btn variant="ghost" size="sm">Edit</Btn>
              </div>
            ))}
          </div>
          <div className="px-6 pb-4">
            <Btn variant="secondary" size="sm" className="w-full justify-center">+ Tambah Kucing</Btn>
          </div>
        </SectionCard>
      </div>

      {/* Recent Bookings */}
      <SectionCard title="Riwayat Booking" action={<Btn variant="ghost" size="sm">Lihat semua →</Btn>}>
        <div className="divide-y divide-stone-50">
          {MY_BOOKINGS.slice(0, 4).map((b) => {
            const bConf = BOOKING_STATUS_CONFIG[b.status];
            const pConf = PAYMENT_STATUS_CONFIG[b.paymentStatus];
            return (
              <div key={b.id} className="px-6 py-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-bold text-stone-900">{b.catName}</span>
                    <span className="text-xs text-stone-400 font-mono">{b.bookingCode}</span>
                  </div>
                  <p className="text-xs text-stone-500">{formatDate(b.checkIn)} – {formatDate(b.checkOut)}</p>
                  <p className="text-xs font-bold text-stone-700">{formatCurrency(b.totalPrice)}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge label={bConf.label} color={bConf.color} bg={bConf.bg} dot={bConf.dot} size="sm" />
                  <Badge label={pConf.label} color={pConf.color} bg={pConf.bg} size="sm" />
                  {b.paymentStatus === "UNPAID" && (
                    <Btn size="sm">Bayar</Btn>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
