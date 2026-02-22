"use client";

import { useState, useMemo } from "react";
import { PageHeader, SectionCard, Btn, Alert } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_CATS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/dashboard-utils";

const PRICES = { REGULAR: 75_000, VIP: 150_000, GROOMING: 75_000, ANTAR_JEMPUT: 50_000 };

function daysBetween(a: string, b: string) {
  if (!a || !b) return 0;
  const diff = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

export function CustomerBookingPage() {
  const [form, setForm] = useState({
    catId: "", checkIn: "", checkOut: "",
    type: "" as "REGULAR" | "VIP" | "",
    grooming: false, antarJemput: false,
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const days = daysBetween(form.checkIn, form.checkOut);
  const basePrice = form.type ? PRICES[form.type] * days : 0;
  const groomingPrice = form.grooming ? PRICES.GROOMING : 0;
  const courierPrice = form.antarJemput ? PRICES.ANTAR_JEMPUT * 2 : 0;
  const total = basePrice + groomingPrice + courierPrice;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-black text-stone-900 mb-2">Booking Berhasil!</h2>
        <p className="text-stone-500 mb-2">Booking Anda sedang menunggu persetujuan admin.</p>
        <p className="text-stone-500 mb-6">Total tagihan: <span className="font-black text-amber-600">{formatCurrency(total)}</span></p>
        <div className="flex gap-3 justify-center">
          <Btn variant="primary" onClick={() => setSubmitted(false)}>Pesan Lagi</Btn>
          <Btn variant="secondary">Lihat Booking</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <PageHeader title="Pesan Penitipan" subtitle="Isi formulir berikut untuk memesan layanan penitipan" />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Cat selection */}
        <SectionCard title="Pilih Kucing">
          <div className="p-6">
            {MOCK_CATS.length === 0 ? (
              <Alert type="info" msg="Anda belum memiliki data kucing. Tambahkan kucing terlebih dahulu." />
            ) : (
              <div className="grid gap-3">
                {MOCK_CATS.map((cat) => (
                  <label key={cat.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    form.catId === cat.id ? "border-amber-400 bg-amber-50" : "border-stone-100 bg-white hover:border-stone-200"
                  }`}>
                    <input type="radio" name="catId" value={cat.id}
                      checked={form.catId === cat.id}
                      onChange={(e) => setForm((p) => ({ ...p, catId: e.target.value }))}
                      className="sr-only"
                    />
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">🐱</div>
                    <div className="flex-1">
                      <p className="font-bold text-stone-900">{cat.name}</p>
                      <p className="text-xs text-stone-500">{cat.breed} · {cat.age} thn · {cat.weight} kg</p>
                      {cat.vaccinationStatus
                        ? <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">✓ Vaksin Valid</span>
                        : <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-semibold">✗ Vaksin diperlukan</span>
                      }
                    </div>
                    {form.catId === cat.id && <span className="text-amber-500 text-xl">✓</span>}
                  </label>
                ))}
              </div>
            )}
          </div>
        </SectionCard>

        {/* Dates */}
        <SectionCard title="Tanggal Penitipan">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">Check-in *</label>
                <input type="date" value={form.checkIn} min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm((p) => ({ ...p, checkIn: e.target.value }))}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400" required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">Check-out *</label>
                <input type="date" value={form.checkOut} min={form.checkIn || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm((p) => ({ ...p, checkOut: e.target.value }))}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400" required
                />
              </div>
            </div>
            {days > 0 && <p className="text-sm text-amber-600 font-semibold bg-amber-50 rounded-xl px-3 py-2">📅 Durasi: {days} hari</p>}
          </div>
        </SectionCard>

        {/* Service type */}
        <SectionCard title="Tipe Layanan">
          <div className="p-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {(["REGULAR", "VIP"] as const).map((t) => (
                <label key={t} className={`flex flex-col p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  form.type === t ? "border-amber-400 bg-amber-50" : "border-stone-100 bg-white hover:border-stone-200"
                }`}>
                  <input type="radio" name="type" value={t}
                    checked={form.type === t}
                    onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as "REGULAR" | "VIP" }))}
                    className="sr-only"
                  />
                  <div className="text-2xl mb-2">{t === "VIP" ? "✨" : "🏠"}</div>
                  <p className="font-bold text-stone-900">{t}</p>
                  <p className="text-xs text-stone-500 mb-2">{t === "VIP" ? "Kamar ber-AC, CCTV live" : "Kandang standar bersih"}</p>
                  <p className="text-amber-600 font-black text-sm">{formatCurrency(PRICES[t])}<span className="text-stone-400 font-normal">/hari</span></p>
                </label>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-sm font-semibold text-stone-700">Layanan Tambahan</p>
              {[
                { key: "grooming" as const, label: "Grooming", desc: "Mandi + potong kuku + sisir bulu", price: PRICES.GROOMING },
                { key: "antarJemput" as const, label: "Antar-Jemput", desc: "Pickup & delivery ke rumah Anda (2 perjalanan)", price: PRICES.ANTAR_JEMPUT * 2 },
              ].map(({ key, label, desc, price }) => (
                <label key={key} className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  form[key] ? "border-amber-300 bg-amber-50" : "border-stone-100 bg-white hover:border-stone-200"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      form[key] ? "bg-amber-500 border-amber-500" : "border-stone-300"
                    }`}>
                      {form[key] && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-800">{label}</p>
                      <p className="text-xs text-stone-500">{desc}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-amber-600">+{formatCurrency(price)}</span>
                  <input type="checkbox" checked={form[key]}
                    onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.checked }))}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Notes */}
        <SectionCard title="Catatan untuk Petugas">
          <div className="p-6">
            <textarea rows={3} value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Pola makan khusus, alergi, obat-obatan, kebiasaan kucing, dll."
              className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>
        </SectionCard>

        {/* Price Summary */}
        {total > 0 && (
          <div className="bg-stone-900 rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-4 text-stone-300 text-sm uppercase tracking-wide">Estimasi Biaya</h3>
            <div className="space-y-2 mb-4">
              {form.type && days > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-stone-300">{form.type} × {days} hari</span>
                  <span className="font-semibold">{formatCurrency(basePrice)}</span>
                </div>
              )}
              {form.grooming && (
                <div className="flex justify-between text-sm">
                  <span className="text-stone-300">Grooming</span>
                  <span className="font-semibold">{formatCurrency(groomingPrice)}</span>
                </div>
              )}
              {form.antarJemput && (
                <div className="flex justify-between text-sm">
                  <span className="text-stone-300">Antar-Jemput</span>
                  <span className="font-semibold">{formatCurrency(courierPrice)}</span>
                </div>
              )}
              <div className="border-t border-stone-700 pt-2 flex justify-between">
                <span className="font-bold">Total Estimasi</span>
                <span className="font-black text-amber-400 text-lg">{formatCurrency(total)}</span>
              </div>
            </div>
            <p className="text-xs text-stone-500">*Harga dapat berubah berdasarkan konfirmasi admin</p>
          </div>
        )}

        <Btn type="submit" size="md" className="w-full justify-center py-4 text-base"
          disabled={!form.catId || !form.checkIn || !form.checkOut || !form.type}
        >
          📋 Kirim Booking
        </Btn>
      </form>
    </div>
  );
}
