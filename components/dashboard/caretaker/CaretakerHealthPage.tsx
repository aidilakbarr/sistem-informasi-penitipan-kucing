"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Btn, Alert } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_DAILY_REPORTS, MOCK_BOOKINGS } from "@/lib/mock-data";

const ASSIGNED = MOCK_BOOKINGS.filter(b => b.caretakerId === "u2" && ["ONGOING","CHECKED_IN"].includes(b.status));
const EMERGENCY_REPORTS = MOCK_DAILY_REPORTS.filter(r => r.caretakerId === "u2" && r.isEmergency);

interface HealthNote {
  id: string;
  catName: string;
  date: string;
  condition: string;
  isEmergency: boolean;
  recommendation: string;
  resolved: boolean;
}

const MOCK_HEALTH_NOTES: HealthNote[] = [
  { id: "h1", catName: "Boba", date: "2024-06-15", condition: "Tidak mau makan, suhu 39.2°C, tampak lesu dan tidak aktif.", isEmergency: true, recommendation: "Segera konsultasi ke dokter hewan. Pertimbangkan pemeriksaan darah.", resolved: false },
  { id: "h2", catName: "Mochi", date: "2024-06-14", condition: "Sedikit bersin-bersin, mata berair.", isEmergency: false, recommendation: "Pantau 1-2 hari. Pastikan kandang tidak terlalu dingin.", resolved: true },
  { id: "h3", catName: "Luna", date: "2024-06-13", condition: "Kurang minum dibandingkan biasanya.", isEmergency: false, recommendation: "Tambah wadah air, coba air hangat.", resolved: true },
];

export function CaretakerHealthPage() {
  const [notes, setNotes] = useState<HealthNote[]>(MOCK_HEALTH_NOTES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ bookingId: "", condition: "", isEmergency: false, recommendation: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const booking = ASSIGNED.find(b => b.id === form.bookingId);
    if (!booking) return;
    const newNote: HealthNote = {
      id: `h${Date.now()}`,
      catName: booking.catName,
      date: new Date().toISOString().split("T")[0],
      condition: form.condition,
      isEmergency: form.isEmergency,
      recommendation: form.recommendation,
      resolved: false,
    };
    setNotes(prev => [newNote, ...prev]);
    setForm({ bookingId: "", condition: "", isEmergency: false, recommendation: "" });
    setShowForm(false);
  }

  const unresolvedEmergencies = notes.filter(n => n.isEmergency && !n.resolved);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Catatan Kesehatan"
        subtitle="Rekam dan pantau kondisi abnormal kucing titipan"
        action={<Btn onClick={() => setShowForm(v => !v)} size="sm">{showForm ? "✕ Batal" : "+ Tambah Catatan"}</Btn>}
      />

      {unresolvedEmergencies.length > 0 && (
        <Alert type="error" msg={`${unresolvedEmergencies.length} kondisi DARURAT belum tertangani: ${unresolvedEmergencies.map(n => n.catName).join(", ")}`} />
      )}

      {/* Form */}
      {showForm && (
        <SectionCard title="Input Catatan Kesehatan Baru">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Pilih Kucing *</label>
              <select
                value={form.bookingId}
                onChange={e => setForm(p => ({ ...p, bookingId: e.target.value }))}
                required
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="">-- Pilih kucing --</option>
                {ASSIGNED.map(b => (
                  <option key={b.id} value={b.id}>{b.catName} (pemilik: {b.customerName})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Deskripsi Kondisi Abnormal *</label>
              <textarea
                rows={3} required value={form.condition}
                onChange={e => setForm(p => ({ ...p, condition: e.target.value }))}
                placeholder="Jelaskan kondisi abnormal yang diamati secara detail…"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Rekomendasi Tindakan</label>
              <textarea
                rows={2} value={form.recommendation}
                onChange={e => setForm(p => ({ ...p, recommendation: e.target.value }))}
                placeholder="Tindakan yang direkomendasikan…"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>
            <label className="flex items-center gap-3 cursor-pointer select-none p-3 rounded-xl border border-red-100 bg-red-50">
              <input
                type="checkbox" checked={form.isEmergency}
                onChange={e => setForm(p => ({ ...p, isEmergency: e.target.checked }))}
                className="w-4 h-4 accent-red-500"
              />
              <div>
                <p className="text-sm font-bold text-red-700">🚨 Tandai sebagai DARURAT</p>
                <p className="text-xs text-red-500">Admin dan pemilik akan langsung mendapat notifikasi</p>
              </div>
            </label>
            <div className="flex gap-2">
              <Btn type="submit" className="flex-1 justify-center">Simpan Catatan</Btn>
              <Btn variant="secondary" onClick={() => setShowForm(false)}>Batal</Btn>
            </div>
          </form>
        </SectionCard>
      )}

      {/* Notes list */}
      <SectionCard title={`Semua Catatan (${notes.length})`}>
        {notes.length === 0 ? (
          <div className="text-center py-12 text-stone-400">
            <div className="text-4xl mb-2">🏥</div>
            <p className="text-sm">Belum ada catatan kesehatan</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-50">
            {notes.map((note) => (
              <div key={note.id} className={`px-6 py-5 ${note.isEmergency && !note.resolved ? "bg-red-50/30" : ""}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                      note.isEmergency ? "bg-red-100" : "bg-amber-50"
                    }`}>
                      {note.isEmergency ? "🚨" : "🩺"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-bold text-stone-900">{note.catName}</span>
                        {note.isEmergency && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${note.resolved ? "bg-stone-100 text-stone-500" : "bg-red-100 text-red-700 animate-pulse"}`}>
                            {note.resolved ? "DARURAT (Selesai)" : "🚨 DARURAT"}
                          </span>
                        )}
                        {note.resolved && !note.isEmergency && (
                          <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">✓ Tertangani</span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400">{note.date}</p>
                    </div>
                  </div>
                  {!note.resolved && (
                    <Btn
                      variant="secondary" size="sm"
                      onClick={() => setNotes(prev => prev.map(n => n.id === note.id ? { ...n, resolved: true } : n))}
                    >
                      ✓ Tandai Selesai
                    </Btn>
                  )}
                </div>

                <div className="ml-13 space-y-2 pl-[52px]">
                  <div>
                    <p className="text-xs font-semibold text-stone-500 mb-1">Kondisi yang diamati:</p>
                    <p className="text-sm text-stone-700 bg-stone-50 rounded-lg px-3 py-2">{note.condition}</p>
                  </div>
                  {note.recommendation && (
                    <div>
                      <p className="text-xs font-semibold text-stone-500 mb-1">Rekomendasi tindakan:</p>
                      <p className="text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2">{note.recommendation}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
