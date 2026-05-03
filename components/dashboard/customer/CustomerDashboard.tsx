"use client";

import {
  Cat,
  ClipboardList,
  CalendarDays,
  CreditCard,
  AlertCircle,
  Plus,
  ChevronRight,
  Thermometer,
  CheckCircle2,
  XCircle,
  Camera,
  Activity,
} from "lucide-react";
import {
  StatCard,
  SectionCard,
  PageHeader,
  Badge,
  Btn,
  Alert,
} from "@/components/dashboard/shared/DashboardUI";
import {
  CUSTOMER_STATS,
  MOCK_BOOKINGS,
  MOCK_DAILY_REPORTS,
  MOCK_CATS,
} from "@/lib/mock-data";
import {
  BOOKING_STATUS_CONFIG,
  PAYMENT_STATUS_CONFIG,
  formatCurrency,
  formatDate,
} from "@/lib/dashboard-utils";
import { useAuthStore } from "@/store/auth";

const MY_BOOKINGS = MOCK_BOOKINGS.filter((b) => b.customerId === "u3");
const ACTIVE_BOOKING = MY_BOOKINGS.find((b) => b.status === "ONGOING");
const LATEST_REPORT = ACTIVE_BOOKING
  ? MOCK_DAILY_REPORTS.find((r) => r.bookingId === ACTIVE_BOOKING.id)
  : null;

export function CustomerDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={`Halo, ${user?.name || "User"}! `}
        subtitle="Pantau kucing kesayangan Anda dari sini."
        action={
          <Btn size="sm">
            <Plus className="w-4 h-4 mr-2" /> Pesan Penitipan
          </Btn>
        }
      />

      {/* Pending payment alert */}
      {MY_BOOKINGS.some((b) => b.paymentStatus === "UNPAID") && (
        <Alert
          type="warning"
          msg="Anda memiliki tagihan yang belum dibayar. Segera lakukan pembayaran untuk konfirmasi booking."
          icon={<AlertCircle className="w-5 h-5" />}
        />
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Booking Aktif"
          value={CUSTOMER_STATS.activeBookings}
          icon={<ClipboardList className="w-6 h-6 text-blue-600" />}
          iconBg="bg-blue-50"
        />
        <StatCard
          label="Kucing Saya"
          value={CUSTOMER_STATS.totalCats}
          icon={<Cat className="w-6 h-6 text-amber-600" />}
          iconBg="bg-amber-50"
        />
        <StatCard
          label="Total Booking"
          value={CUSTOMER_STATS.totalBookings}
          icon={<CalendarDays className="w-6 h-6 text-green-600" />}
          iconBg="bg-green-50"
        />
        <StatCard
          label="Belum Bayar"
          value={CUSTOMER_STATS.pendingPayments}
          icon={<CreditCard className="w-6 h-6 text-red-600" />}
          iconBg="bg-red-50"
        />
      </div>

      {/* Active Booking Card */}
      {ACTIVE_BOOKING && (
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 text-white relative overflow-hidden">
          {/* Ikon Latar Belakang (Watermark) */}
          <Cat className="absolute top-0 right-0 w-32 h-32 opacity-10 -translate-y-4 translate-x-4" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Sedang Dititipkan
              </span>
            </div>
            <h2 className="text-2xl font-black mb-1">
              {ACTIVE_BOOKING.catName}
            </h2>
            <p className="text-amber-100 text-sm mb-4">
              {ACTIVE_BOOKING.bookingCode} ·{" "}
              {ACTIVE_BOOKING.cageName ?? "Kandang belum assign"}
            </p>

            <div className="grid grid-cols-3 gap-4 text-sm border-t border-white/20 pt-4 mt-2">
              <div>
                <p className="text-amber-200 text-[10px] uppercase tracking-wider font-bold">
                  Check-in
                </p>
                <p className="font-bold">
                  {formatDate(ACTIVE_BOOKING.checkIn)}
                </p>
              </div>
              <div>
                <p className="text-amber-200 text-[10px] uppercase tracking-wider font-bold">
                  Check-out
                </p>
                <p className="font-bold">
                  {formatDate(ACTIVE_BOOKING.checkOut)}
                </p>
              </div>
              <div>
                <p className="text-amber-200 text-[10px] uppercase tracking-wider font-bold">
                  Petugas
                </p>
                <p className="font-bold truncate">
                  {ACTIVE_BOOKING.caretakerName ?? "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Latest Daily Report */}
        {LATEST_REPORT && (
          <SectionCard
            title="Laporan Terbaru"
            subtitle={`${ACTIVE_BOOKING!.catName} · ${LATEST_REPORT.date}`}
          >
            <div className="p-6">
              {LATEST_REPORT.isEmergency && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Ada kondisi darurat! Hubungi admin.
                </div>
              )}

              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { label: "Makan", val: LATEST_REPORT.isEating },
                  { label: "Minum", val: LATEST_REPORT.isDrinking },
                  { label: "BAB", val: LATEST_REPORT.isDefecating },
                  { label: "BAK", val: LATEST_REPORT.isUrinating },
                ].map(({ label, val }) => (
                  <div
                    key={label}
                    className={`text-center p-2 rounded-xl transition-colors ${val ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                  >
                    <div className="flex justify-center mb-1">
                      {val ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-[10px] font-bold uppercase">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-3">
                <div
                  className={`px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 ${
                    LATEST_REPORT.activity === "AKTIF"
                      ? "bg-green-100 text-green-700"
                      : LATEST_REPORT.activity === "LEMAS"
                        ? "bg-red-100 text-red-700"
                        : "bg-stone-100 text-stone-600"
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  AKTIVITAS: {LATEST_REPORT.activity}
                </div>
                {LATEST_REPORT.temperature && (
                  <span className="text-sm text-stone-600 font-medium flex items-center gap-1">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    {LATEST_REPORT.temperature}°C
                  </span>
                )}
              </div>

              <p className="text-sm text-stone-600 italic bg-stone-50 rounded-xl p-3 border border-stone-100">
                "{LATEST_REPORT.notes}"
              </p>

              {LATEST_REPORT.photos.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {LATEST_REPORT.photos.map((_, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-amber-400"
                    >
                      <Camera className="w-6 h-6" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>
        )}

        {/* My Cats */}
        <SectionCard
          title="Kucing Saya"
          action={
            <Btn variant="ghost" size="sm">
              Kelola <ChevronRight className="ml-1 w-4 h-4" />
            </Btn>
          }
        >
          <div className="divide-y divide-stone-50">
            {MOCK_CATS.map((cat) => (
              <div
                key={cat.id}
                className="px-6 py-4 flex items-center gap-3 hover:bg-stone-50/50 transition-colors"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
                  <Cat className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-900">{cat.name}</p>
                  <p className="text-xs text-stone-500 truncate">
                    {cat.ras} · {cat.age} thn · {cat.weight} kg
                  </p>
                </div>
                <Btn variant="ghost" size="sm">
                  Edit
                </Btn>
              </div>
            ))}
          </div>
          <div className="px-6 pb-4">
            <Btn
              variant="secondary"
              size="sm"
              className="w-full justify-center"
            >
              <Plus className="w-4 h-4 mr-1" /> Tambah Kucing
            </Btn>
          </div>
        </SectionCard>
      </div>

      {/* Recent Bookings */}
      <SectionCard
        title="Riwayat Booking"
        action={
          <Btn variant="ghost" size="sm">
            Lihat semua <ChevronRight className="ml-1 w-4 h-4" />
          </Btn>
        }
      >
        <div className="divide-y divide-stone-50">
          {MY_BOOKINGS.slice(0, 4).map((b) => {
            const bConf = BOOKING_STATUS_CONFIG[b.status];
            const pConf = PAYMENT_STATUS_CONFIG[b.paymentStatus];
            return (
              <div
                key={b.id}
                className="px-6 py-4 flex items-center justify-between gap-3 hover:bg-stone-50/50 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-bold text-stone-900">
                      {b.catName}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono bg-stone-100 px-1.5 py-0.5 rounded leading-none">
                      {b.bookingCode}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 uppercase font-semibold">
                    {formatDate(b.checkIn)} – {formatDate(b.checkOut)}
                  </p>
                  <p className="text-xs font-bold text-orange-600 mt-1">
                    {formatCurrency(b.totalPrice)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge
                    label={bConf.label}
                    color={bConf.color}
                    bg={bConf.bg}
                    dot={bConf.dot}
                    size="sm"
                  />
                  <Badge
                    label={pConf.label}
                    color={pConf.color}
                    bg={pConf.bg}
                    size="sm"
                  />
                  {b.paymentStatus === "UNPAID" && (
                    <Btn size="sm" className="h-7 text-[10px]">
                      Bayar Sekarang
                    </Btn>
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
