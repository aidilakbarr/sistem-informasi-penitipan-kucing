"use client";

import { WhatsAppIcon } from "@/components/ui/Icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BOOKING_PACKAGES } from "@/lib/constants";
import { useBookingForm } from "@/hooks/useBookingForm";

const inputClass =
  "w-full bg-stone-700 border border-stone-600 text-white placeholder-stone-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors";

const labelClass = "block text-sm font-semibold text-stone-300 mb-2";

export function BookingSection() {
  const { form, handleChange, handleSubmit } = useBookingForm();

  return (
    <section id="pesan" className="py-24 bg-stone-900">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader
          badge="Booking"
          title={<>Titipkan Kucing<br />Anda Sekarang</>}
          subtitle="Isi formulir di bawah, kami akan segera menghubungi Anda via WhatsApp."
          light
        />

        <form
          onSubmit={handleSubmit}
          className="bg-stone-800 rounded-3xl p-8 space-y-5"
          noValidate
        >
          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="nama" className={labelClass}>Nama Pemilik *</label>
              <input
                id="nama"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                required
                placeholder="Nama lengkap Anda"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="kucing" className={labelClass}>Nama Kucing *</label>
              <input
                id="kucing"
                name="kucing"
                value={form.kucing}
                onChange={handleChange}
                required
                placeholder="Nama kucing kesayangan"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="tanggal_masuk" className={labelClass}>Tanggal Masuk *</label>
              <input
                type="date"
                id="tanggal_masuk"
                name="tanggal_masuk"
                value={form.tanggal_masuk}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="tanggal_keluar" className={labelClass}>Tanggal Keluar *</label>
              <input
                type="date"
                id="tanggal_keluar"
                name="tanggal_keluar"
                value={form.tanggal_keluar}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Paket */}
          <div>
            <label htmlFor="paket" className={labelClass}>Pilih Paket *</label>
            <select
              id="paket"
              name="paket"
              value={form.paket}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">-- Pilih paket penitipan --</option>
              {BOOKING_PACKAGES.map((pkg) => (
                <option key={pkg} value={pkg}>{pkg}</option>
              ))}
            </select>
          </div>

          {/* Catatan */}
          <div>
            <label htmlFor="catatan" className={labelClass}>Catatan Tambahan</label>
            <textarea
              id="catatan"
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              rows={3}
              placeholder="Kondisi khusus kucing, alergi, obat-obatan, dll."
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2.5 text-base"
          >
            <WhatsAppIcon />
            Pesan via WhatsApp
          </button>

          <p className="text-center text-xs text-stone-500">
            Kami akan membalas dalam 1×24 jam kerja
          </p>
        </form>
      </div>
    </section>
  );
}
