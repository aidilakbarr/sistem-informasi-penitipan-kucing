"use client";

import { useState } from "react";
import { StatCard, SectionCard, PageHeader, Badge, Btn, Alert, EmptyState } from "@/components/dashboard/shared/DashboardUI";
import { COURIER_STATS, MOCK_DELIVERY_TASKS } from "@/lib/mock-data";
import { DELIVERY_STATUS_CONFIG } from "@/lib/dashboard-utils";
import type { DeliveryStatus, DeliveryTask } from "@/types/dashboard";

const STATUS_STEPS: DeliveryStatus[] = ["MENUJU_LOKASI", "KUCING_DIJEMPUT", "DALAM_PERJALANAN", "SAMPAI_TUJUAN"];

function TaskCard({ task }: { task: DeliveryTask }) {
  const [status, setStatus] = useState<DeliveryStatus>(task.status);
  const conf   = DELIVERY_STATUS_CONFIG[status];
  const stepIdx = STATUS_STEPS.indexOf(status);
  const canNext = stepIdx < STATUS_STEPS.length - 1;
  const isDone  = status === "SAMPAI_TUJUAN";

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all ${isDone ? "border-green-200 opacity-70" : "border-stone-100 hover:border-stone-200"}`}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                task.type === "PICKUP" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-green-50 text-green-700 border-green-200"
              }`}>
                {task.type === "PICKUP" ? "🐱 PENJEMPUTAN" : "🏠 PENGANTARAN"}
              </span>
              <span className="text-xs text-stone-400 font-mono">{task.bookingCode}</span>
            </div>
            <p className="font-black text-stone-900">{task.catName}</p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${conf.bg} ${conf.color}`}>
            {conf.label}
          </span>
        </div>

        <div className="space-y-1.5 mb-4 text-sm">
          <div className="flex gap-2">
            <span className="text-stone-400 flex-shrink-0">👤</span>
            <span className="text-stone-700 font-medium">{task.customerName}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-stone-400 flex-shrink-0">📍</span>
            <span className="text-stone-600 text-xs leading-snug">{task.address}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-stone-400 flex-shrink-0">🕐</span>
            <span className="text-stone-600 text-xs">{task.scheduledAt}</span>
          </div>
          {task.notes && (
            <div className="flex gap-2">
              <span className="text-stone-400 flex-shrink-0">📝</span>
              <span className="text-stone-500 text-xs italic">{task.notes}</span>
            </div>
          )}
        </div>

        {/* Step indicator */}
        <div className="flex gap-1 mb-4">
          {STATUS_STEPS.map((s, i) => (
            <div
              key={s}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                i <= stepIdx ? "bg-amber-500" : "bg-stone-100"
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        {!isDone ? (
          <div className="flex gap-2">
            <a
              href={`tel:${task.customerPhone}`}
              className="flex-1 py-2 rounded-xl text-xs font-semibold text-center bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200 transition-colors flex items-center justify-center gap-1"
            >
              📞 Hubungi
            </a>
            {canNext && (
              <button
                onClick={() => setStatus(STATUS_STEPS[stepIdx + 1])}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-center bg-amber-500 hover:bg-amber-600 text-white transition-colors"
              >
                {stepIdx === 0 ? "🐱 Sudah Dijemput"
                  : stepIdx === 1 ? "🚗 Mulai Perjalanan"
                  : "✅ Konfirmasi Tiba"}
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2 bg-green-50 rounded-xl">
            <span className="text-green-600 text-sm font-bold">✅ Selesai</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function CourierDashboard() {
  const activeTasks    = MOCK_DELIVERY_TASKS.filter((t) => t.status !== "SAMPAI_TUJUAN");
  const completedTasks = MOCK_DELIVERY_TASKS.filter((t) => t.status === "SAMPAI_TUJUAN");

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Dashboard Kurir"
        subtitle="Agus Delivery · Hari ini: Selasa, 15 Juni 2024"
      />

      {activeTasks.length > 0 && (
        <Alert type="info" msg={`${activeTasks.length} tugas aktif menunggu penyelesaian hari ini.`} />
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tugas Hari Ini"   value={COURIER_STATS.todayTasks}      icon="📋" iconBg="bg-blue-50"  />
        <StatCard label="Selesai Hari Ini" value={COURIER_STATS.completedTasks}  icon="✅" iconBg="bg-green-50" />
        <StatCard label="Belum Selesai"    value={COURIER_STATS.pendingTasks}    icon="⏰" iconBg="bg-amber-50" />
        <StatCard label="Total Selesai"    value={COURIER_STATS.totalCompleted}  icon="🏆" iconBg="bg-purple-50" />
      </div>

      {/* Active Tasks */}
      <div>
        <h2 className="font-bold text-stone-900 mb-3">Tugas Aktif ({activeTasks.length})</h2>
        {activeTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100">
            <EmptyState icon="🎉" title="Semua tugas selesai!" desc="Tidak ada tugas aktif hari ini." />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {activeTasks.map((t) => <TaskCard key={t.id} task={t} />)}
          </div>
        )}
      </div>

      {/* Completed */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="font-bold text-stone-900 mb-3">Selesai Hari Ini ({completedTasks.length})</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {completedTasks.map((t) => <TaskCard key={t.id} task={t} />)}
          </div>
        </div>
      )}
    </div>
  );
}
