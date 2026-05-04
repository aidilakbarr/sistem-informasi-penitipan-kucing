"use client";

import { useEffect, useState } from "react";
import {
  PageHeader,
  SectionCard,
  Btn,
  Alert,
} from "@/components/dashboard/shared/DashboardUI";
import { formatDate } from "@/lib/dashboard-utils";
import {
  getInCareBookings,
  submitDailyLog,
  Booking,
} from "@/services/api/booking.services";
import { Loader2, X } from "lucide-react";

type ActivityLevel = "AKTIF" | "NORMAL" | "LEMAS";

interface FormState {
  bookingId: string;
  condition: string;
  activity: ActivityLevel | "";
  isEating: boolean | null;
  isDrinking: boolean | null;
  isDefecating: boolean | null;
  isUrinating: boolean | null;
  temperature: string;
  isEmergency: boolean;
  note: string;
}

const EMPTY_FORM: FormState = {
  bookingId: "",
  condition: "",
  activity: "",
  isEating: null,
  isDrinking: null,
  isDefecating: null,
  isUrinating: null,
  temperature: "",
  isEmergency: false,
  note: "",
};

function YesNoBtn({
  label,
  value,
  current,
  onChange,
}: {
  label: string;
  value: boolean;
  current: boolean | null;
  onChange: (v: boolean) => void;
}) {
  const isSelected = current === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
        isSelected
          ? value
            ? "bg-green-500 text-white border-green-500"
            : "bg-red-500 text-white border-red-500"
          : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
      }`}
    >
      {value ? "✓ " : "✗ "}
      {label}
    </button>
  );
}

export function CaretakerDailyReportPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getInCareBookings()
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoadingBookings(false));
  }, []);

  const selectedBooking = bookings.find((b) => b.id === form.bookingId);

  function handlePhotos(files: FileList | null) {
    if (!files) return;
    const arr = Array.from(files).slice(0, 5);
    setPhotos(arr);
    setPreviews(arr.map((f) => URL.createObjectURL(f)));
  }

  function removePhoto(i: number) {
    setPhotos((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      form.isEating === null ||
      form.isDrinking === null ||
      form.isDefecating === null ||
      form.isUrinating === null ||
      !form.activity
    ) {
      setError("Lengkapi semua indikator kesehatan dan tingkat aktivitas.");
      return;
    }

    try {
      setSubmitting(true);
      await submitDailyLog(
        form.bookingId,
        {
          condition: form.condition,
          activity: form.activity,
          isEating: form.isEating,
          isDrinking: form.isDrinking,
          isDefecating: form.isDefecating,
          isUrinating: form.isUrinating,
          temperature: form.temperature ? Number(form.temperature) : undefined,
          isEmergency: form.isEmergency,
          note: form.note || undefined,
        },
        photos,
      );
      setSubmitted(true);
      setForm(EMPTY_FORM);
      setPhotos([]);
      setPreviews([]);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      setError(err?.message ?? "Terjadi kesalahan, coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all";

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20">
      <PageHeader
        title="Laporan Harian"
        subtitle="Isi laporan kondisi kucing hari ini"
      />

      {submitted && (
        <Alert
          type="success"
          msg="Laporan berhasil dikirim! Pemilik telah diberitahu."
        />
      )}
      {error && <Alert type="error" msg={error} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Pilih kucing */}
        <SectionCard title="Pilih Kucing">
          <div className="p-6">
            {loadingBookings ? (
              <div className="flex items-center gap-2 text-stone-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Memuat data...</span>
              </div>
            ) : bookings.length === 0 ? (
              <p className="text-sm text-stone-500">
                Tidak ada kucing yang sedang dititipkan.
              </p>
            ) : (
              <div className="space-y-2">
                {bookings.map((b) => (
                  <label
                    key={b.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      form.bookingId === b.id
                        ? "border-amber-400 bg-amber-50"
                        : "border-stone-100 hover:border-stone-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="bookingId"
                      value={b.id}
                      checked={form.bookingId === b.id}
                      onChange={() =>
                        setForm({ ...EMPTY_FORM, bookingId: b.id })
                      }
                      className="sr-only"
                    />
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-amber-50 flex-shrink-0">
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
                    <div className="flex-1">
                      <p className="font-bold text-stone-900">{b.cat.name}</p>
                      <p className="text-xs text-stone-500">
                        Pemilik: {b.user.name} · Kandang{" "}
                        {b.cage?.cageNumber ?? "?"}
                      </p>
                    </div>
                    {form.bookingId === b.id && (
                      <span className="text-amber-500 text-xl">✓</span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        </SectionCard>

        {form.bookingId && (
          <>
            {/* Kondisi umum */}
            <SectionCard title="Kondisi Umum">
              <div className="p-6">
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Deskripsi Kondisi *
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.condition}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, condition: e.target.value }))
                  }
                  placeholder="Contoh: Kucing terlihat sehat, aktif bermain..."
                  className={`${inputCls} resize-none`}
                />
              </div>
            </SectionCard>

            {/* Indikator kesehatan */}
            <SectionCard title="Indikator Kesehatan">
              <div className="p-6 space-y-4">
                {[
                  { label: "Status Makan", field: "isEating" as const },
                  { label: "Status Minum", field: "isDrinking" as const },
                  {
                    label: "BAB (Buang Air Besar)",
                    field: "isDefecating" as const,
                  },
                  {
                    label: "BAK (Buang Air Kecil)",
                    field: "isUrinating" as const,
                  },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      {label} *
                    </label>
                    <div className="flex gap-2">
                      <YesNoBtn
                        label="Ya"
                        value={true}
                        current={form[field]}
                        onChange={(v) => setForm((p) => ({ ...p, [field]: v }))}
                      />
                      <YesNoBtn
                        label="Tidak"
                        value={false}
                        current={form[field]}
                        onChange={(v) => setForm((p) => ({ ...p, [field]: v }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Aktivitas & suhu */}
            <SectionCard title="Aktivitas & Kondisi">
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Tingkat Aktivitas *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["AKTIF", "NORMAL", "LEMAS"] as ActivityLevel[]).map(
                      (a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() =>
                            setForm((p) => ({ ...p, activity: a }))
                          }
                          className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                            form.activity === a
                              ? a === "AKTIF"
                                ? "bg-green-500 text-white border-green-500"
                                : a === "LEMAS"
                                  ? "bg-red-500 text-white border-red-500"
                                  : "bg-blue-500 text-white border-blue-500"
                              : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          {a === "AKTIF"
                            ? "😺 AKTIF"
                            : a === "NORMAL"
                              ? "😸 NORMAL"
                              : "😿 LEMAS"}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Suhu Tubuh (°C){" "}
                    <span className="text-stone-400 font-normal">opsional</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="35"
                    max="42"
                    value={form.temperature}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, temperature: e.target.value }))
                    }
                    placeholder="contoh: 38.5"
                    className={inputCls}
                  />
                  <p className="text-xs text-stone-400 mt-1">
                    Normal kucing: 38.0 – 39.2°C
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Catatan & foto */}
            <SectionCard title="Catatan & Foto">
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Catatan Tambahan
                  </label>
                  <textarea
                    rows={3}
                    value={form.note}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, note: e.target.value }))
                    }
                    placeholder="Ceritakan kondisi kucing hari ini kepada pemiliknya…"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Upload foto */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Foto{" "}
                    <span className="text-stone-400 font-normal">
                      maks. 5 foto
                    </span>
                  </label>
                  {previews.length > 0 && (
                    <div className="flex gap-2 flex-wrap mb-3">
                      {previews.map((src, i) => (
                        <div key={i} className="relative w-20 h-20">
                          <img
                            src={src}
                            className="w-full h-full object-cover rounded-xl border border-stone-200"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(i)}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {previews.length < 5 && (
                    <label className="border-2 border-dashed border-stone-200 rounded-xl p-6 text-center cursor-pointer hover:border-amber-300 hover:bg-amber-50/30 transition-all block">
                      <div className="text-3xl mb-2">📸</div>
                      <p className="text-sm text-stone-500">
                        Klik untuk upload foto
                      </p>
                      <p className="text-xs text-stone-400">
                        JPG, PNG maksimal 5MB per foto
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handlePhotos(e.target.files)}
                      />
                    </label>
                  )}
                </div>

                {/* Emergency */}
                <label className="flex items-center gap-3 cursor-pointer select-none p-3 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={form.isEmergency}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, isEmergency: e.target.checked }))
                    }
                    className="w-4 h-4 accent-red-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-red-700">
                      🚨 Tandai sebagai DARURAT
                    </p>
                    <p className="text-xs text-red-500">
                      Admin dan pemilik akan langsung diberitahu
                    </p>
                  </div>
                </label>
              </div>
            </SectionCard>

            <Btn
              type="submit"
              disabled={submitting}
              className="w-full justify-center py-4 text-base disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />{" "}
                  Mengirim...
                </>
              ) : (
                "📤 Kirim Laporan Harian"
              )}
            </Btn>
          </>
        )}
      </form>
    </div>
  );
}
