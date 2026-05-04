"use client";

import { useEffect, useState } from "react";
import {
  PageHeader,
  Btn,
  Alert,
} from "@/components/dashboard/shared/DashboardUI";
import { formatDate } from "@/lib/dashboard-utils";
import {
  getBookings,
  getDailyLogs,
  Booking,
  DailyLog,
} from "@/services/api/booking.services";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";

function HealthDot({ ok }: { ok: boolean }) {
  return (
    <div
      className={`w-2 h-2 rounded-full flex-shrink-0 ${ok ? "bg-green-500" : "bg-red-500"}`}
    />
  );
}

function ReportCard({
  report,
  isLatest,
}: {
  report: DailyLog;
  isLatest: boolean;
}) {
  const [expanded, setExpanded] = useState(isLatest);

  const healthItems = [
    { label: "Makan", ok: report.isEating },
    { label: "Minum", ok: report.isDrinking },
    { label: "BAB", ok: report.isDefecating },
    { label: "BAK", ok: report.isUrinating },
  ];
  const healthScore = healthItems.filter((h) => h.ok).length;

  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden transition-all ${
        report.isEmergency
          ? "border-red-200 shadow-sm shadow-red-50"
          : "border-stone-100"
      }`}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-stone-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
              report.isEmergency
                ? "bg-red-100"
                : isLatest
                  ? "bg-amber-100"
                  : "bg-stone-100"
            }`}
          >
            {report.isEmergency ? "🚨" : "📋"}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-stone-900 text-sm">
                {new Date(report.date).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>
              {isLatest && (
                <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
                  Terbaru
                </span>
              )}
              {report.isEmergency && (
                <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                  🚨 DARURAT
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400">{report.condition}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1">
            {healthItems.map((h) => (
              <HealthDot key={h.label} ok={h.ok} />
            ))}
          </div>
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              report.activity === "AKTIF"
                ? "bg-green-100 text-green-700"
                : report.activity === "LEMAS"
                  ? "bg-red-100 text-red-700"
                  : "bg-stone-100 text-stone-600"
            }`}
          >
            {report.activity}
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-stone-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-stone-50 pt-4 space-y-4">
          {/* Health grid */}
          <div className="grid grid-cols-4 gap-2">
            {healthItems.map(({ label, ok }) => (
              <div
                key={label}
                className={`text-center p-2.5 rounded-xl ${ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                <div className="text-lg mb-0.5">{ok ? "✅" : "❌"}</div>
                <div className="text-[10px] font-bold">{label}</div>
              </div>
            ))}
          </div>

          {/* Skor & suhu */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-stone-50 rounded-xl p-3 flex items-center gap-2">
              <span className="text-2xl">
                {healthScore === 4 ? "😸" : healthScore >= 2 ? "😐" : "😿"}
              </span>
              <div>
                <p className="text-[10px] text-stone-400 font-medium">
                  Skor Kesehatan
                </p>
                <p className="font-black text-stone-900 text-sm">
                  {healthScore}/4
                </p>
              </div>
            </div>
            {report.temperature && (
              <div className="flex-1 bg-stone-50 rounded-xl p-3 flex items-center gap-2">
                <span className="text-2xl">🌡️</span>
                <div>
                  <p className="text-[10px] text-stone-400 font-medium">
                    Suhu Tubuh
                  </p>
                  <p
                    className={`font-black text-sm ${report.temperature > 39.2 ? "text-red-600" : "text-stone-900"}`}
                  >
                    {report.temperature}°C
                    {report.temperature > 39.2 && " ⚠️"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Catatan */}
          {report.note && (
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">
                Catatan Petugas
              </p>
              <p className="text-sm text-stone-700 bg-amber-50/50 border border-amber-100 rounded-xl px-4 py-3 italic leading-relaxed">
                "{report.note}"
              </p>
            </div>
          )}

          {/* Foto */}
          {report.photos.length > 0 && (
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">
                Foto ({report.photos.length})
              </p>
              <div className="flex gap-2 flex-wrap">
                {report.photos.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={url}
                      className="w-20 h-20 object-cover rounded-xl border border-stone-200 hover:opacity-90 transition-opacity cursor-pointer"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function CustomerMonitorPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const data = await getBookings();
        setBookings(data);
        const active = data.find((b) => b.status === "IN_CARE");
        if (active) {
          setActiveBooking(active);
          setLoadingLogs(true);
          const logData = await getDailyLogs(active.id);
          setLogs(logData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setLoadingLogs(false);
      }
    }
    init();
  }, []);

  const emergencies = logs.filter((r) => r.isEmergency);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm font-medium">Memuat data monitoring...</span>
      </div>
    );
  }

  if (!activeBooking) {
    return (
      <div className="max-w-3xl mx-auto">
        <PageHeader
          title="Monitoring Penitipan"
          subtitle="Laporan harian kondisi kucing Anda"
        />
        <div className="bg-white rounded-3xl border border-stone-100 p-16 text-center mt-6">
          <div className="text-5xl mb-4 select-none">📸</div>
          <h3 className="font-black text-stone-800 text-lg mb-2">
            Tidak ada penitipan aktif
          </h3>
          <p className="text-stone-500 text-sm mb-6">
            Monitoring hanya tersedia saat kucing sedang dalam penitipan.
          </p>
          <Btn>📅 Pesan Penitipan</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-20">
      <PageHeader
        title="Monitoring Penitipan"
        subtitle="Laporan harian kondisi kucing Anda"
      />

      {emergencies.length > 0 && (
        <Alert
          type="error"
          msg="Ada kondisi DARURAT yang dilaporkan! Segera hubungi admin."
        />
      )}

      {/* Active booking banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white/20 flex-shrink-0">
            {activeBooking.cat.photoUrl ? (
              <img
                src={activeBooking.cat.photoUrl}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">
                🐱
              </div>
            )}
          </div>
          <div>
            <p className="text-amber-100 text-xs font-medium">
              Sedang dititipkan
            </p>
            <p className="font-black text-xl">{activeBooking.cat.name}</p>
            <p className="text-amber-100 text-xs">
              {activeBooking.cage
                ? `Kandang ${activeBooking.cage.cageNumber}`
                : "Kandang belum ditentukan"}{" "}
              · s/d {formatDate(activeBooking.checkOutDate)}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-amber-100 text-xs mb-1.5">{logs.length} laporan</p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-xl text-xs font-bold"
          >
            💬 Hubungi Admin
          </a>
        </div>
      </div>

      {/* Laporan harian */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-stone-900">Laporan Harian</h2>
          <span className="text-xs text-stone-400">{logs.length} laporan</span>
        </div>

        {loadingLogs ? (
          <div className="flex items-center justify-center py-10 gap-2 text-stone-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Memuat laporan...</span>
          </div>
        ) : logs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center text-stone-400">
            <div className="text-4xl mb-2">📋</div>
            <p className="font-semibold">Belum ada laporan</p>
            <p className="text-xs mt-1">
              Petugas akan membuat laporan setiap hari
            </p>
          </div>
        ) : (
          logs.map((r, i) => (
            <ReportCard key={r.id} report={r} isLatest={i === 0} />
          ))
        )}
      </div>
    </div>
  );
}
