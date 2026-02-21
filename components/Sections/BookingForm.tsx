"use client";

import { useState } from "react";
import PawIcon from "../icons/PawIcon";
import WhatsAppIcon from "../icons/WhatsAppIcon";

export default function BookingForm() {
  const [form, setForm] = useState({
    nama: "",
    kucing: "",
    tanggal_masuk: "",
    tanggal_keluar: "",
    paket: "",
    catatan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo KucingKu! Saya ingin memesan penitipan kucing 🐾%0A%0ANama: ${form.nama}%0ANama Kucing: ${form.kucing}%0ATanggal Masuk: ${form.tanggal_masuk}%0ATanggal Keluar: ${form.tanggal_keluar}%0APaket: ${form.paket}%0ACatatan: ${form.catatan || "-"}`;
    window.open(`https://wa.me/6281234567890?text=${msg}`, "_blank");
  };

  return (
    <section id="pesan" className="py-24 bg-stone-900">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-amber-400 font-semibold text-sm mb-3">
            <PawIcon className="w-4 h-4" /> Booking
          </div>
          <h2 className="text-4xl font-black text-white mb-4">
            Titipkan Kucing
            <br />
            Anda Sekarang
          </h2>
          <p className="text-stone-400">
            Isi formulir di bawah, kami akan segera menghubungi Anda via
            WhatsApp.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-stone-800 rounded-3xl p-8 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-stone-300 mb-2">
                Nama Pemilik *
              </label>
              <input
                name="nama"
                value={form.nama}
                onChange={handleChange}
                required
                placeholder="Nama lengkap Anda"
                className="w-full bg-stone-700 border border-stone-600 text-white placeholder-stone-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-300 mb-2">
                Nama Kucing *
              </label>
              <input
                name="kucing"
                value={form.kucing}
                onChange={handleChange}
                required
                placeholder="Nama kucing kesayangan"
                className="w-full bg-stone-700 border border-stone-600 text-white placeholder-stone-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-stone-300 mb-2">
                Tanggal Masuk *
              </label>
              <input
                type="date"
                name="tanggal_masuk"
                value={form.tanggal_masuk}
                onChange={handleChange}
                required
                className="w-full bg-stone-700 border border-stone-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-300 mb-2">
                Tanggal Keluar *
              </label>
              <input
                type="date"
                name="tanggal_keluar"
                value={form.tanggal_keluar}
                onChange={handleChange}
                required
                className="w-full bg-stone-700 border border-stone-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-300 mb-2">
              Pilih Paket *
            </label>
            <select
              name="paket"
              value={form.paket}
              onChange={handleChange}
              required
              className="w-full bg-stone-700 border border-stone-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            >
              <option value="">-- Pilih paket penitipan --</option>
              <option>Penitipan Harian - Rp 75.000/hari</option>
              <option>Penitipan Mingguan - Rp 450.000/minggu</option>
              <option>Penitipan Premium - Rp 150.000/hari</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-300 mb-2">
              Catatan Tambahan
            </label>
            <textarea
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              rows={3}
              placeholder="Kondisi khusus kucing, alergi, obat-obatan, dll."
              className="w-full bg-stone-700 border border-stone-600 text-white placeholder-stone-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
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
            Kami akan membalas dalam 1x24 jam kerja
          </p>
        </form>
      </div>
    </section>
  );
}
