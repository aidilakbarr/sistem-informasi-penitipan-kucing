"use client";

import { useState } from "react";
import {
  PageHeader,
  SectionCard,
  Btn,
  Alert,
} from "@/components/dashboard/shared/DashboardUI";
import { formatCurrency } from "@/lib/dashboard-utils";
import { useCats } from "@/hooks/useCat";
import { Cat } from "@/types/cat";
import { Loader2, Cat as CatIcon } from "lucide-react";
import { createBooking } from "@/services/api/booking.services";
import { useRouter } from "next/navigation";

const PRICE_PER_DAY = 25_000;

const GROOMING_OPTIONS = [
  {
    value: "GROOMING_REGULAR",
    label: "Paket Grooming Reguler",
    desc: "Mandi + potong kuku + sisir bulu",
    price: 80_000,
  },
  {
    value: "GROOMING_ANTIFUNGAL",
    label: "Paket Jamur & Kutu",
    desc: "Perawatan anti-jamur dan anti-kutu",
    price: 100_000,
  },
  {
    value: "GROOMING_COMPLETE",
    label: "Paket Lengkap",
    desc: "Reguler + anti-jamur + anti-kutu + ear cleaning",
    price: 125_000,
  },
] as const;

type GroomingValue = (typeof GROOMING_OPTIONS)[number]["value"];

function daysBetween(a: string, b: string) {
  if (!a || !b) return 0;
  const diff = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

const EMPTY_FORM = {
  catId: "",
  checkIn: "",
  checkOut: "",
  grooming: "" as GroomingValue | "",
  delivery: false,
  notes: "",
};

export function CustomerBookingPage() {
  const { cats, loading: catsLoading } = useCats();

  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastTotal, setLastTotal] = useState(0);

  const router = useRouter();

  const days = daysBetween(form.checkIn, form.checkOut);
  const basePrice = days > 0 ? Math.max(1, days) * PRICE_PER_DAY : 0;
  const groomingPrice = form.grooming
    ? (GROOMING_OPTIONS.find((o) => o.value === form.grooming)?.price ?? 0)
    : 0;
  const deliveryPrice = form.delivery ? 50_000 : 0;
  const total = days > 0 ? basePrice + groomingPrice + deliveryPrice : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);

      const additionalServices: string[] = [];
      if (form.grooming) additionalServices.push(form.grooming);
      if (form.delivery) additionalServices.push("DELIVERY");

      await createBooking({
        catId: form.catId,
        checkInDate: form.checkIn,
        checkOutDate: form.checkOut,
        additionalServices,
        specialNote: form.notes || undefined,
      });

      setLastTotal(total);
      setSubmitted(true);
    } catch (err: any) {
      alert(err?.message ?? "Terjadi kesalahan, coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-black text-stone-900 mb-2">
          Booking Berhasil!
        </h2>
        <p className="text-stone-500 mb-2">
          Booking Anda sedang menunggu persetujuan admin.
        </p>
        <p className="text-stone-500 mb-6">
          Total tagihan:{" "}
          <span className="font-black text-amber-600">
            {formatCurrency(lastTotal)}
          </span>
        </p>
        <div className="flex gap-3 justify-center">
          <Btn
            variant="primary"
            onClick={() => {
              setForm(EMPTY_FORM);
              setSubmitted(false);
            }}
          >
            Pesan Lagi
          </Btn>
          <Btn
            variant="secondary"
            onClick={() => {
              router.push("/dashboard/customer/bookings");
            }}
          >
            Lihat Booking
          </Btn>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all";

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20">
      <PageHeader
        title="Pesan Penitipan"
        subtitle="Isi formulir berikut untuk memesan layanan penitipan"
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── Pilih Kucing ── */}
        <SectionCard title="Pilih Kucing">
          <div className="p-6">
            {catsLoading ? (
              <div className="flex items-center justify-center gap-2 py-6 text-stone-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">
                  Memuat data kucing...
                </span>
              </div>
            ) : cats.length === 0 ? (
              <Alert
                type="info"
                msg="Anda belum memiliki data kucing. Tambahkan kucing terlebih dahulu."
              />
            ) : (
              <div className="grid gap-3">
                {cats.map((cat: Cat) => {
                  const isVaccinated = cat.vaccinationStatus === "vaccinated";
                  const vaccExpired = cat.vaccineExpirationDate
                    ? new Date(cat.vaccineExpirationDate) < new Date()
                    : false;
                  const vaccValid = isVaccinated && !vaccExpired;

                  return (
                    <label
                      key={cat.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        form.catId === cat.id
                          ? "border-amber-400 bg-amber-50"
                          : "border-stone-100 bg-white hover:border-stone-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="catId"
                        value={cat.id}
                        checked={form.catId === cat.id}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, catId: e.target.value }))
                        }
                        className="sr-only"
                      />
                      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {cat.photoUrl ? (
                          <img
                            src={cat.photoUrl}
                            className="w-full h-full object-cover"
                            alt={cat.name}
                          />
                        ) : (
                          <CatIcon className="w-6 h-6 text-amber-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-stone-900">{cat.name}</p>
                        <p className="text-xs text-stone-500 mb-1">
                          {cat.ras} · {cat.age} thn · {cat.weight} kg
                        </p>
                        {vaccValid ? (
                          <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                            ✓ Vaksin Valid
                          </span>
                        ) : vaccExpired ? (
                          <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-semibold">
                            ⚠ Vaksin Expired
                          </span>
                        ) : (
                          <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                            ✗ Belum Vaksin
                          </span>
                        )}
                      </div>
                      {form.catId === cat.id && (
                        <span className="text-amber-500 text-xl flex-shrink-0">
                          ✓
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </SectionCard>

        {/* ── Tanggal Penitipan ── */}
        <SectionCard title="Tanggal Penitipan">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Check-in *
                </label>
                <input
                  type="date"
                  value={form.checkIn}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      checkIn: e.target.value,
                      checkOut: "",
                    }))
                  }
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Check-out *
                </label>
                <input
                  type="date"
                  value={form.checkOut}
                  min={form.checkIn || new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, checkOut: e.target.value }))
                  }
                  className={inputCls}
                  required
                  disabled={!form.checkIn}
                />
              </div>
            </div>
            {days > 0 && (
              <p className="text-sm text-amber-600 font-semibold bg-amber-50 rounded-xl px-3 py-2">
                📅 Durasi: {days} hari · {formatCurrency(PRICE_PER_DAY)}/hari ={" "}
                {formatCurrency(basePrice)}
              </p>
            )}
          </div>
        </SectionCard>

        {/* ── Layanan Tambahan ── */}
        <SectionCard title="Layanan Tambahan">
          <div className="p-6 space-y-4">
            {/* Grooming */}
            <div>
              <p className="text-sm font-bold text-stone-700 mb-2.5">
                Paket Grooming
              </p>
              <div className="space-y-2">
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    form.grooming === ""
                      ? "border-amber-300 bg-amber-50"
                      : "border-stone-100 bg-white hover:border-stone-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        form.grooming === ""
                          ? "bg-amber-500 border-amber-500"
                          : "border-stone-300"
                      }`}
                    >
                      {form.grooming === "" && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <p className="text-sm font-semibold text-stone-800">
                      Tidak Perlu Grooming
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="grooming"
                    value=""
                    checked={form.grooming === ""}
                    onChange={() => setForm((p) => ({ ...p, grooming: "" }))}
                    className="sr-only"
                  />
                </label>

                {GROOMING_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      form.grooming === opt.value
                        ? "border-amber-300 bg-amber-50"
                        : "border-stone-100 bg-white hover:border-stone-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          form.grooming === opt.value
                            ? "bg-amber-500 border-amber-500"
                            : "border-stone-300"
                        }`}
                      >
                        {form.grooming === opt.value && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-800">
                          {opt.label}
                        </p>
                        <p className="text-xs text-stone-500">{opt.desc}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-amber-600 ml-3 flex-shrink-0">
                      +{formatCurrency(opt.price)}
                    </span>
                    <input
                      type="radio"
                      name="grooming"
                      value={opt.value}
                      checked={form.grooming === opt.value}
                      onChange={() =>
                        setForm((p) => ({ ...p, grooming: opt.value }))
                      }
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Antar-jemput */}
            <div className="pt-3 border-t border-stone-100">
              <p className="text-sm font-bold text-stone-700 mb-2.5">
                Antar-Jemput
              </p>
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  form.delivery
                    ? "border-amber-300 bg-amber-50"
                    : "border-stone-100 bg-white hover:border-stone-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      form.delivery
                        ? "bg-amber-500 border-amber-500"
                        : "border-stone-300"
                    }`}
                  >
                    {form.delivery && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">
                      Minta Dijemput
                    </p>
                    <p className="text-xs text-stone-500">
                      Petugas menjemput kucing ke rumah Anda
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-amber-600 ml-3 flex-shrink-0">
                  +{formatCurrency(50_000)}
                </span>
                <input
                  type="checkbox"
                  checked={form.delivery}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, delivery: e.target.checked }))
                  }
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </SectionCard>

        {/* ── Catatan ── */}
        <SectionCard title="Catatan untuk Petugas">
          <div className="p-6">
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) =>
                setForm((p) => ({ ...p, notes: e.target.value }))
              }
              placeholder="Pola makan khusus, alergi, obat-obatan, kebiasaan kucing, dll."
              className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>
        </SectionCard>

        {/* ── Ringkasan Biaya ── */}
        {days > 0 && (
          <div className="bg-stone-900 rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-4 text-stone-300 text-sm uppercase tracking-wide">
              Estimasi Biaya
            </h3>
            <div className="space-y-2.5 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-stone-400">
                  Penitipan {days} hari × {formatCurrency(PRICE_PER_DAY)}
                </span>
                <span className="font-semibold">
                  {formatCurrency(basePrice)}
                </span>
              </div>
              {form.grooming && (
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400">
                    {
                      GROOMING_OPTIONS.find((o) => o.value === form.grooming)
                        ?.label
                    }
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(groomingPrice)}
                  </span>
                </div>
              )}
              {form.delivery && (
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400">Antar-Jemput</span>
                  <span className="font-semibold">
                    {formatCurrency(deliveryPrice)}
                  </span>
                </div>
              )}
              <div className="border-t border-stone-700 pt-3 flex justify-between items-center">
                <span className="font-bold text-base">Total</span>
                <span className="font-black text-amber-400 text-xl">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-500">
              *Harga dapat berubah berdasarkan konfirmasi admin
            </p>
          </div>
        )}

        <Btn
          type="submit"
          size="md"
          className="w-full justify-center py-4 text-base disabled:opacity-60"
          disabled={
            !form.catId ||
            !form.checkIn ||
            !form.checkOut ||
            submitting ||
            catsLoading
          }
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
              Mengirim...
            </>
          ) : (
            "📋 Kirim Booking"
          )}
        </Btn>
      </form>
    </div>
  );
}
