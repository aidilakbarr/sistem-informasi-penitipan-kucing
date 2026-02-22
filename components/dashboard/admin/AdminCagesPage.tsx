"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Btn, Badge, StatCard } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_CAGES } from "@/lib/mock-data";
import { CAGE_STATUS_CONFIG } from "@/lib/dashboard-utils";
import type { CageStatus } from "@/types/dashboard";

export function AdminCagesPage() {
  const [filter, setFilter] = useState<CageStatus | "ALL">("ALL");

  const stats = {
    available:   MOCK_CAGES.filter((c) => c.status === "AVAILABLE").length,
    occupied:    MOCK_CAGES.filter((c) => c.status === "OCCUPIED").length,
    maintenance: MOCK_CAGES.filter((c) => c.status === "MAINTENANCE").length,
  };

  const filtered = MOCK_CAGES.filter((c) => filter === "ALL" || c.status === filter);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Manajemen Kandang"
        subtitle={`${MOCK_CAGES.length} kandang total`}
        action={<Btn size="sm">+ Tambah Kandang</Btn>}
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Tersedia"    value={stats.available}   icon="✅" iconBg="bg-green-50" />
        <StatCard label="Terisi"      value={stats.occupied}    icon="🐱" iconBg="bg-blue-50"  />
        <StatCard label="Maintenance" value={stats.maintenance} icon="🔧" iconBg="bg-amber-50" />
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["ALL", "AVAILABLE", "OCCUPIED", "MAINTENANCE"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              filter === s ? "bg-amber-500 text-white border-amber-500" : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
            }`}
          >
            {s === "ALL" ? "Semua" : CAGE_STATUS_CONFIG[s].label}
          </button>
        ))}
      </div>

      {/* Cage Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((cage) => {
          const conf = CAGE_STATUS_CONFIG[cage.status];
          return (
            <div key={cage.id} className="bg-white rounded-2xl border border-stone-100 p-5 hover:border-stone-200 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="text-2xl">
                  {cage.status === "OCCUPIED" ? "🐱" : cage.status === "MAINTENANCE" ? "🔧" : "🏠"}
                </div>
                <Badge label={conf.label} color={conf.color} bg={conf.bg} dot={conf.dot} size="sm" />
              </div>
              <h3 className="font-black text-stone-900 text-lg mb-1">{cage.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  cage.type === "VIP" ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-600"
                }`}>
                  {cage.type}
                </span>
              </div>
              {cage.currentOccupant && (
                <p className="text-xs text-stone-500 mb-3">
                  🐱 <span className="font-semibold">{cage.currentOccupant}</span>
                </p>
              )}
              {cage.notes && (
                <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-2 py-1 mb-3">{cage.notes}</p>
              )}
              <div className="flex gap-2">
                <Btn variant="secondary" size="sm" className="flex-1 justify-center">Edit</Btn>
                {cage.status === "AVAILABLE" && (
                  <Btn size="sm" className="flex-1 justify-center">Assign</Btn>
                )}
                {cage.status === "OCCUPIED" && (
                  <Btn variant="ghost" size="sm" className="flex-1 justify-center">Detail</Btn>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
