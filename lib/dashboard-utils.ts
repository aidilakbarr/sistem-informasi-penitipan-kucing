import type { BookingStatus, PaymentStatus, CageStatus, DeliveryStatus, Role } from "@/types/dashboard";

// ─── Formatters ───────────────────────────────────────────────────────────────

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Booking Status ───────────────────────────────────────────────────────────

export const BOOKING_STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  PENDING:        { label: "Menunggu",      color: "text-amber-700",  bg: "bg-amber-50 border-amber-200",   dot: "bg-amber-500" },
  APPROVED:       { label: "Disetujui",     color: "text-blue-700",   bg: "bg-blue-50 border-blue-200",     dot: "bg-blue-500" },
  CHECKED_IN:     { label: "Check-in",      color: "text-purple-700", bg: "bg-purple-50 border-purple-200", dot: "bg-purple-500" },
  ONGOING:        { label: "Berlangsung",   color: "text-green-700",  bg: "bg-green-50 border-green-200",   dot: "bg-green-500" },
  READY_PICKUP:   { label: "Siap Diambil",  color: "text-orange-700", bg: "bg-orange-50 border-orange-200", dot: "bg-orange-500" },
  COMPLETED:      { label: "Selesai",       color: "text-stone-600",  bg: "bg-stone-100 border-stone-200",  dot: "bg-stone-400" },
  CANCELLED:      { label: "Dibatalkan",    color: "text-red-700",    bg: "bg-red-50 border-red-200",       dot: "bg-red-500" },
};

export const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; color: string; bg: string }
> = {
  UNPAID:                  { label: "Belum Bayar",         color: "text-red-700",    bg: "bg-red-50 border-red-200" },
  PENDING_VERIFICATION:    { label: "Verifikasi",          color: "text-amber-700",  bg: "bg-amber-50 border-amber-200" },
  PAID:                    { label: "Lunas",               color: "text-green-700",  bg: "bg-green-50 border-green-200" },
  FAILED:                  { label: "Gagal",               color: "text-red-700",    bg: "bg-red-50 border-red-200" },
};

export const CAGE_STATUS_CONFIG: Record<
  CageStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  AVAILABLE:    { label: "Tersedia",     color: "text-green-700",  bg: "bg-green-50",  dot: "bg-green-500" },
  OCCUPIED:     { label: "Terisi",       color: "text-blue-700",   bg: "bg-blue-50",   dot: "bg-blue-500" },
  MAINTENANCE:  { label: "Maintenance",  color: "text-amber-700",  bg: "bg-amber-50",  dot: "bg-amber-500" },
};

export const DELIVERY_STATUS_CONFIG: Record<
  DeliveryStatus,
  { label: string; color: string; bg: string; step: number }
> = {
  MENUJU_LOKASI:     { label: "Menuju Lokasi",     color: "text-blue-700",   bg: "bg-blue-50",   step: 1 },
  KUCING_DIJEMPUT:   { label: "Kucing Dijemput",   color: "text-purple-700", bg: "bg-purple-50", step: 2 },
  DALAM_PERJALANAN:  { label: "Dalam Perjalanan",  color: "text-amber-700",  bg: "bg-amber-50",  step: 3 },
  SAMPAI_TUJUAN:     { label: "Sampai Tujuan",     color: "text-green-700",  bg: "bg-green-50",  step: 4 },
};

export const ROLE_CONFIG: Record<Role, { label: string; color: string; bg: string; emoji: string }> = {
  ADMIN:      { label: "Admin",     color: "text-red-700",    bg: "bg-red-50",    emoji: "👑" },
  CARETAKER:  { label: "Petugas",   color: "text-blue-700",   bg: "bg-blue-50",   emoji: "🧑‍⚕️" },
  CUSTOMER:   { label: "Customer",  color: "text-green-700",  bg: "bg-green-50",  emoji: "👤" },
  COURIER:    { label: "Kurir",     color: "text-amber-700",  bg: "bg-amber-50",  emoji: "🛵" },
};

export const SERVICE_LABELS: Record<string, string> = {
  REGULAR:      "Regular",
  VIP:          "VIP",
  GROOMING:     "Grooming",
  ANTAR_JEMPUT: "Antar-Jemput",
};
