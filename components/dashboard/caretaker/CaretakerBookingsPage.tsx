"use client";

import { useEffect, useState } from "react";
import {
  PageHeader,
  Badge,
  Btn,
  Alert,
} from "@/components/dashboard/shared/DashboardUI";
import { formatDate, formatCurrency } from "@/lib/dashboard-utils";
import { getInCareBookings, Booking } from "@/services/api/booking.services";
import { Loader2, X } from "lucide-react";

const ADDITIONAL_LABELS: Record<string, string> = {
  GROOMING_REGULAR: "Grooming Reguler",
  GROOMING_ANTIFUNGAL: "Jamur & Kutu",
  GROOMING_COMPLETE: "Grooming Lengkap",
  DELIVERY: "Antar-Jemput",
};

function daysBetween(a: string, b: string) {
  return Math.max(
    0,
    Math.ceil((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000),
  );
}

export function CaretakerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      setLoading(true);
      const data = await getInCareBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const activeCount = bookings.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm font-medium">Memuat data booking...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Kucing yang Dititipkan"
        subtitle={`${activeCount} kucing sedang dalam penitipan`}
      />

      {bookings.length === 0 ? (
        <div className="bg-white rounded-[40px] border-2 border-dashed border-stone-200 p-20 text-center">
          <div className="text-5xl mb-4">🐱</div>
          <h3 className="text-xl font-black text-stone-800 mb-2">
            Tidak ada kucing yang dititipkan
          </h3>
          <p className="text-stone-500 text-sm">
            Kucing yang sedang dititipkan akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* List */}
          <div className="space-y-3">
            {bookings.map((b) => {
              const days = daysBetween(b.checkInDate, b.checkOutDate);
              const lastLog = (b as any).dailyLogs?.[0];
              const isEmergency = lastLog?.isEmergency;

              return (
                <div
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all hover:border-amber-300 hover:shadow-sm ${
                    selected?.id === b.id
                      ? "border-amber-400 shadow-md shadow-amber-50"
                      : isEmergency
                        ? "border-red-200 shadow-sm shadow-red-50"
                        : "border-stone-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex-shrink-0 overflow-hidden ${
                          isEmergency ? "bg-red-100" : "bg-amber-50"
                        }`}
                      >
                        {b.cat.photoUrl ? (
                          <img
                            src={b.cat.photoUrl}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">
                            🐱
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-stone-900">
                            {b.cat.name}
                          </span>
                          {isEmergency && (
                            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                              🚨 DARURAT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500">
                          Pemilik: {b.user.name}
                        </p>
                        <p className="text-xs text-stone-400">
                          {b.user.telepon}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {b.cage && (
                        <span className="text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full">
                          🏠 {b.cage.cageNumber}
                        </span>
                      )}
                      <span className="text-xs text-stone-400">
                        {days} hari
                      </span>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                    {[
                      { label: "Check-in", value: formatDate(b.checkInDate) },
                      { label: "Check-out", value: formatDate(b.checkOutDate) },
                      { label: "Ras", value: b.cat.ras },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-stone-50 rounded-lg p-2">
                        <p className="text-stone-400 mb-0.5">{label}</p>
                        <p className="font-semibold text-stone-700 capitalize">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Services + laporan status */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {b.additionalServices.length > 0 ? (
                        b.additionalServices.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] bg-amber-50 text-amber-700 border border-amber-100 px-1.5 py-0.5 rounded-full font-medium"
                          >
                            {ADDITIONAL_LABELS[s] ?? s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-stone-400">
                          Tanpa layanan tambahan
                        </span>
                      )}
                    </div>
                    {lastLog ? (
                      <span className="text-[10px] text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                        ✓ Sudah Lapor Hari Ini
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                        ⚠ Belum Ada Laporan
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          {selected ? (
            <div className="sticky top-6 bg-white rounded-2xl border border-stone-100 overflow-hidden">
              <div className="bg-amber-50 px-5 py-4 border-b border-amber-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-amber-100 flex-shrink-0">
                      {selected.cat.photoUrl ? (
                        <img
                          src={selected.cat.photoUrl}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          🐱
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-black text-stone-900">
                        {selected.cat.name}
                      </h3>
                      <p className="text-xs text-stone-500 capitalize">
                        {selected.cat.ras}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-1.5 hover:bg-amber-100 rounded-full text-stone-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-4 text-sm">
                {/* Pemilik */}
                <div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">
                    Pemilik
                  </p>
                  <p className="font-semibold text-stone-800">
                    {selected.user.name}
                  </p>
                  <p className="text-xs text-stone-500">
                    {selected.user.telepon}
                  </p>
                  <p className="text-xs text-stone-500">
                    {selected.user.email}
                  </p>
                </div>

                {/* Kandang */}
                {selected.cage && (
                  <div>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">
                      Kandang
                    </p>
                    <p className="font-semibold text-stone-800">
                      Kandang {selected.cage.cageNumber}
                      <span className="ml-2 text-xs text-stone-400">
                        ({selected.cage.type})
                      </span>
                    </p>
                  </div>
                )}

                {/* Jadwal */}
                <div>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">
                    Jadwal
                  </p>
                  <div className="space-y-1">
                    {[
                      {
                        label: "Check-in",
                        value: formatDate(selected.checkInDate),
                      },
                      {
                        label: "Check-out",
                        value: formatDate(selected.checkOutDate),
                      },
                      {
                        label: "Durasi",
                        value: `${daysBetween(selected.checkInDate, selected.checkOutDate)} hari`,
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-stone-500">{label}</span>
                        <span className="font-medium text-stone-800">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layanan */}
                {selected.additionalServices.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">
                      Layanan Tambahan
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.additionalServices.map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2 py-1 rounded-lg font-medium"
                        >
                          {ADDITIONAL_LABELS[s] ?? s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Catatan */}
                {selected.specialNote && (
                  <div>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">
                      Catatan Pemilik
                    </p>
                    <p className="text-stone-600 bg-stone-50 rounded-lg p-3 text-xs italic">
                      "{selected.specialNote}"
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-2 space-y-2 border-t border-stone-100">
                  <Btn className="w-full justify-center">
                    📝 Buat Laporan Harian
                  </Btn>
                </div>
              </div>
            </div>
          ) : (
            <div className="sticky top-6 bg-white rounded-2xl border border-stone-100 p-8 text-center text-stone-400">
              <div className="text-4xl mb-2">👆</div>
              <p className="text-sm font-medium">
                Pilih kucing untuk lihat detail
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
