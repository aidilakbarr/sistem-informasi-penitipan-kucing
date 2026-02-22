"use client";

import { useState } from "react";
import { PageHeader, SectionCard, Btn, Alert } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_BOOKINGS } from "@/lib/mock-data";
import type { ActivityLevel } from "@/types/dashboard";

const ASSIGNED = MOCK_BOOKINGS.filter((b) => b.caretakerId === "u2" && ["ONGOING", "CHECKED_IN"].includes(b.status));

interface FormState {
  bookingId: string;
  isEating: boolean | null;
  isDrinking: boolean | null;
  isDefecating: boolean | null;
  isUrinating: boolean | null;
  activity: ActivityLevel | "";
  temperature: string;
  notes: string;
  isEmergency: boolean;
}

const INIT: FormState = {
  bookingId: "", isEating: null, isDrinking: null, isDefecating: null, isUrinating: null,
  activity: "", temperature: "", notes: "", isEmergency: false,
};

function YesNoBtn({ label, value, current, onChange }: { label: string; value: boolean; current: boolean | null; onChange: (v: boolean) => void }) {
  const isSelected = current === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
        isSelected
          ? value ? "bg-green-500 text-white border-green-500" : "bg-red-500 text-white border-red-500"
          : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
      }`}
    >
      {value ? "✓ " : "✗ "}{label}
    </button>
  );
}

export function CaretakerDailyReportPage() {
  const [form, setForm] = useState<FormState>(INIT);
  const [submitted, setSubmitted] = useState(false);

  const selectedCat = ASSIGNED.find((b) => b.id === form.bookingId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <PageHeader title="Laporan Harian" subtitle="Isi laporan kondisi kucing hari ini" />

      {submitted && <Alert type="success" msg="Laporan berhasil dikirim! Customer telah diberitahu." />}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Select cat */}
        <SectionCard title="Pilih Kucing">
          <div className="p-6">
            <label className="block text-sm font-semibold text-stone-700 mb-2">Kucing yang Dilaporkan *</label>
            <select
              value={form.bookingId}
              onChange={(e) => setForm({ ...INIT, bookingId: e.target.value })}
              className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              required
            >
              <option value="">-- Pilih kucing --</option>
              {ASSIGNED.map((b) => (
                <option key={b.id} value={b.id}>{b.catName} (pemilik: {b.customerName})</option>
              ))}
            </select>
          </div>
        </SectionCard>

        {form.bookingId && (
          <>
            {/* Health Indicators */}
            <SectionCard title="Indikator Kesehatan">
              <div className="p-6 space-y-4">
                {[
                  { label: "Status Makan",  field: "isEating"    as const },
                  { label: "Status Minum",  field: "isDrinking"  as const },
                  { label: "BAB (Buang Air Besar)", field: "isDefecating" as const },
                  { label: "BAK (Buang Air Kecil)", field: "isUrinating"  as const },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">{label} *</label>
                    <div className="flex gap-2">
                      <YesNoBtn label="Ya" value={true} current={form[field]} onChange={(v) => setForm((p) => ({ ...p, [field]: v }))} />
                      <YesNoBtn label="Tidak" value={false} current={form[field]} onChange={(v) => setForm((p) => ({ ...p, [field]: v }))} />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Activity & Temp */}
            <SectionCard title="Aktivitas & Kondisi">
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Tingkat Aktivitas *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["AKTIF", "NORMAL", "LEMAS"] as ActivityLevel[]).map((a) => (
                      <button
                        key={a} type="button"
                        onClick={() => setForm((p) => ({ ...p, activity: a }))}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                          form.activity === a
                            ? a === "AKTIF" ? "bg-green-500 text-white border-green-500"
                              : a === "LEMAS" ? "bg-red-500 text-white border-red-500"
                              : "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        {a === "AKTIF" ? "😺 AKTIF" : a === "NORMAL" ? "😸 NORMAL" : "😿 LEMAS"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="temp" className="block text-sm font-semibold text-stone-700 mb-2">Suhu Tubuh (°C) <span className="text-stone-400 font-normal">opsional</span></label>
                  <input
                    id="temp"
                    type="number" step="0.1" min="35" max="42"
                    value={form.temperature}
                    onChange={(e) => setForm((p) => ({ ...p, temperature: e.target.value }))}
                    placeholder="contoh: 38.5"
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
                  />
                  <p className="text-xs text-stone-400 mt-1">Normal kucing: 38.0 – 39.2°C</p>
                </div>
              </div>
            </SectionCard>

            {/* Notes & Photos */}
            <SectionCard title="Catatan & Foto">
              <div className="p-6 space-y-4">
                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-stone-700 mb-2">Catatan Tambahan</label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    placeholder="Ceritakan kondisi kucing hari ini kepada pemiliknya…"
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Upload Foto</label>
                  <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 text-center cursor-pointer hover:border-amber-300 hover:bg-amber-50/30 transition-all">
                    <div className="text-3xl mb-2">📸</div>
                    <p className="text-sm text-stone-500">Klik atau seret foto ke sini</p>
                    <p className="text-xs text-stone-400">JPG, PNG maksimal 5MB per foto</p>
                  </div>
                </div>

                {/* Emergency flag */}
                <label className="flex items-center gap-3 cursor-pointer select-none p-3 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={form.isEmergency}
                    onChange={(e) => setForm((p) => ({ ...p, isEmergency: e.target.checked }))}
                    className="w-4 h-4 accent-red-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-red-700">🚨 Tandai sebagai DARURAT</p>
                    <p className="text-xs text-red-500">Admin dan pemilik akan langsung diberitahu</p>
                  </div>
                </label>
              </div>
            </SectionCard>

            <Btn type="submit" size="md" className="w-full justify-center py-4 text-base">
              📤 Kirim Laporan Harian
            </Btn>
          </>
        )}
      </form>
    </div>
  );
}
