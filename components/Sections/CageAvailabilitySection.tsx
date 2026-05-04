"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, RefreshCw, PawPrint, ArrowRight, X } from "lucide-react";
import { getPusher } from "@/lib/pusher";

// ── Types ─────────────────────────────────────────────────────────────────────

export type CageStatus = "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";

export interface CageBooking {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  cat: { name: string; photoUrl: string | null };
  user: { name: string };
}

export interface Cage {
  id: string;
  cageNumber: string;
  type: "BASIC" | "PREMIUM" | "DELUXE";
  status: CageStatus;
  description: string | null;
  currentBookingId: string | null;
  booking: CageBooking[];
  createdAt: string;
  updatedAt: string;
}

// ── API ───────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchCages(): Promise<Cage[]> {
  const res = await fetch(`${BASE_URL}/cages`);
  if (!res.ok) throw new Error("Gagal memuat data kandang");
  const data = await res.json();
  return data.data;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Price per type ─────────────────────────────────────────────────────────────

const TYPE_PRICE: Record<string, number> = {
  BASIC: 25_000,
  PREMIUM: 35_000,
  DELUXE: 50_000,
};

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CFG: Record<
  CageStatus,
  { label: string; dot: string; card: string; badge: string }
> = {
  AVAILABLE: {
    label: "Tersedia",
    dot: "bg-emerald-400 animate-pulse",
    card: "bg-emerald-50 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-100 cursor-pointer",
    badge: "bg-emerald-100 text-emerald-700",
  },
  OCCUPIED: {
    label: "Dihuni",
    dot: "bg-amber-400",
    card: "bg-amber-50 border-amber-300 hover:border-amber-400 cursor-pointer",
    badge: "bg-amber-100 text-amber-700",
  },
  MAINTENANCE: {
    label: "Maintenance",
    dot: "bg-red-400",
    card: "bg-stone-100 border-stone-200 opacity-60 cursor-not-allowed",
    badge: "bg-red-100 text-red-600",
  },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: CageStatus }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${STATUS_CFG[status].dot}`}
    />
  );
}

function CageCard({
  cage,
  isSelected,
  onSelect,
}: {
  cage: Cage;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const cfg = STATUS_CFG[cage.status];
  const activeBooking = cage.booking?.[0];
  const price = TYPE_PRICE[cage.type] ?? 25_000;

  return (
    <button
      onClick={() => cage.status !== "MAINTENANCE" && onSelect()}
      disabled={cage.status === "MAINTENANCE"}
      className={`
        w-full text-left border-2 rounded-2xl p-4 transition-all duration-200
        ${cfg.card}
        ${isSelected ? "ring-2 ring-amber-500 ring-offset-2 scale-[1.02] shadow-md" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-bold text-stone-800 text-sm leading-tight">
          Kandang {cage.cageNumber}
        </span>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1 ${cfg.badge}`}
        >
          <StatusDot status={cage.status} />
          {cfg.label}
        </span>
      </div>

      <div className="text-amber-600 font-bold text-base">
        {formatRupiah(price)}
        <span className="text-xs font-normal text-stone-400">/malam</span>
      </div>

      <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide mt-0.5">
        {cage.type}
      </div>

      {cage.description && (
        <div className="text-xs text-stone-400 mt-1 leading-snug">
          {cage.description}
        </div>
      )}

      {cage.status === "OCCUPIED" && activeBooking && (
        <div className="mt-2 pt-2 border-t border-amber-200 text-xs text-stone-500 flex items-center gap-1.5">
          <PawPrint size={12} className="text-amber-500 flex-shrink-0" />
          <span className="font-medium">{activeBooking.cat.name}</span>
          {activeBooking.checkOutDate && (
            <span className="ml-1">
              · CO {formatDate(activeBooking.checkOutDate)}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

function DetailPanel({ cage, onClose }: { cage: Cage; onClose: () => void }) {
  const cfg = STATUS_CFG[cage.status];
  const activeBooking = cage.booking?.[0];
  const price = TYPE_PRICE[cage.type] ?? 25_000;

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl shadow-xl p-6 sticky top-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-bold text-stone-900 text-xl">
            Kandang {cage.cageNumber}
          </h3>
          <p className="text-xs text-stone-400 font-semibold uppercase tracking-wide mt-0.5">
            {cage.type}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-5 ${cfg.badge}`}
      >
        <StatusDot status={cage.status} />
        {cfg.label}
      </span>

      <div className="divide-y divide-stone-100 mb-6">
        <div className="flex justify-between items-center py-3">
          <span className="text-stone-500 text-sm">Harga</span>
          <span className="font-bold text-amber-600 text-lg">
            {formatRupiah(price)}
            <span className="text-xs font-normal text-stone-400">/malam</span>
          </span>
        </div>

        {cage.description && (
          <div className="flex justify-between items-start py-3 gap-4">
            <span className="text-stone-500 text-sm flex-shrink-0">
              Keterangan
            </span>
            <span className="text-stone-700 text-sm text-right">
              {cage.description}
            </span>
          </div>
        )}

        {cage.status === "OCCUPIED" && activeBooking && (
          <>
            <div className="flex justify-between items-center py-3">
              <span className="text-stone-500 text-sm">Penghuni</span>
              <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                <PawPrint size={14} className="text-amber-500" />
                {activeBooking.cat.name}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-stone-500 text-sm">Pemilik</span>
              <span className="font-semibold text-stone-800 text-sm">
                {activeBooking.user.name}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-stone-500 text-sm">Check-out</span>
              <span className="font-semibold text-stone-800 text-sm">
                {formatDate(activeBooking.checkOutDate)}
              </span>
            </div>
          </>
        )}
      </div>

      {cage.status === "AVAILABLE" && (
        <a
          href="/booking"
          className="flex items-center justify-center gap-2 w-full text-center bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-amber-200"
        >
          Pesan Kandang Ini <ArrowRight size={18} />
        </a>
      )}

      {cage.status === "OCCUPIED" && (
        <a
          href="/booking"
          className="block w-full text-center bg-stone-100 hover:bg-stone-200 text-stone-500 font-semibold py-3 px-4 rounded-xl transition-all text-sm"
        >
          Lihat kandang lain yang tersedia
        </a>
      )}
    </div>
  );
}

function SummaryBar({ cages }: { cages: Cage[] }) {
  const available = cages.filter((c) => c.status === "AVAILABLE").length;
  const occupied = cages.filter((c) => c.status === "OCCUPIED").length;
  const maintenance = cages.filter((c) => c.status === "MAINTENANCE").length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {[
        {
          label: "Total Kandang",
          value: cages.length,
          dot: "bg-stone-400",
          bg: "bg-stone-50 border-stone-200",
          text: "text-stone-700",
        },
        {
          label: "Tersedia",
          value: available,
          dot: "bg-emerald-400 animate-pulse",
          bg: "bg-emerald-50 border-emerald-200",
          text: "text-emerald-700",
        },
        {
          label: "Dihuni",
          value: occupied,
          dot: "bg-amber-400",
          bg: "bg-amber-50 border-amber-200",
          text: "text-amber-700",
        },
        {
          label: "Maintenance",
          value: maintenance,
          dot: "bg-red-400",
          bg: "bg-red-50 border-red-200",
          text: "text-red-600",
        },
      ].map((s) => (
        <div key={s.label} className={`border rounded-2xl px-5 py-4 ${s.bg}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${s.dot}`} />
            <span className="text-xs text-stone-500 font-medium">
              {s.label}
            </span>
          </div>
          <div className={`text-3xl font-bold ${s.text}`}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function CageAvailabilitySection() {
  const [cages, setCages] = useState<Cage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCage, setSelectedCage] = useState<Cage | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [justUpdated, setJustUpdated] = useState(false);

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const data = await fetchCages();
      setCages(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    load();
  }, [load]);

  // Pusher realtime
  useEffect(() => {
    const pusher = getPusher();
    const channel = pusher.subscribe("cages");

    channel.bind("cage-list-updated", (data: Cage[]) => {
      setCages(data);
      setLastUpdated(new Date());

      // Update selected cage kalau sedang dibuka
      setSelectedCage((prev) => {
        if (!prev) return null;
        const updated = data.find((c) => c.id === prev.id);
        return updated ?? null;
      });

      // Flash indicator "baru diupdate"
      setJustUpdated(true);
      setTimeout(() => setJustUpdated(false), 2000);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("cages");
    };
  }, []);

  const filtered = cages.filter((c) => {
    const matchStatus =
      filter === "all" || c.status.toLowerCase() === filter.toLowerCase();
    const matchSearch =
      !search ||
      c.cageNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 border text-sm font-medium px-4 py-1.5 rounded-full mb-4 transition-all duration-500 ${
              justUpdated
                ? "bg-amber-50 border-amber-300 text-amber-700"
                : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                justUpdated ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
            {justUpdated ? "Baru saja diperbarui!" : "Live Update"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
            Ketersediaan Kandang
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Cek ketersediaan dan harga setiap kandang secara real-time.
          </p>
        </div>

        {!loading && <SummaryBar cages={cages} />}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 min-w-0">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Cari nama atau tipe kandang..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(["all", "AVAILABLE", "OCCUPIED", "MAINTENANCE"] as const).map(
              (val) => (
                <button
                  key={val}
                  onClick={() => {
                    setFilter(val);
                    setSelectedCage(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    filter === val
                      ? "bg-amber-500 border-amber-500 text-white shadow-md"
                      : "bg-white border-stone-200 text-stone-600 hover:border-amber-400"
                  }`}
                >
                  {val === "all" ? "Semua" : STATUS_CFG[val].label}
                </button>
              ),
            )}
          </div>

          <button
            onClick={() => load(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 hover:border-amber-400 text-sm text-stone-400 bg-white disabled:opacity-50 whitespace-nowrap"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            <span className="hidden sm:inline">
              {mounted ? lastUpdated.toLocaleTimeString("id-ID") : ""}
            </span>
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-28 bg-stone-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <PawPrint size={48} className="mx-auto mb-3 opacity-20" />
            <div className="font-medium">Tidak ada kandang ditemukan</div>
          </div>
        ) : (
          <div
            className={`grid gap-6 items-start ${selectedCage ? "lg:grid-cols-3" : ""}`}
          >
            <div
              className={`grid gap-4 ${
                selectedCage
                  ? "lg:col-span-2 grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              {filtered.map((cage) => (
                <CageCard
                  key={cage.id}
                  cage={cage}
                  isSelected={selectedCage?.id === cage.id}
                  onSelect={() =>
                    setSelectedCage(selectedCage?.id === cage.id ? null : cage)
                  }
                />
              ))}
            </div>
            {selectedCage && (
              <div className="lg:col-span-1">
                <DetailPanel
                  cage={selectedCage}
                  onClose={() => setSelectedCage(null)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
