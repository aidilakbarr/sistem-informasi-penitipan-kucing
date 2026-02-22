import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — KucingKu",
  description: "Pelajari bagaimana KucingKu mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
};

const SECTIONS = [
  {
    id: "pendahuluan",
    title: "Pendahuluan",
    content: (
      <div className="space-y-3">
        <p>
          KucingKu berkomitmen melindungi privasi dan keamanan data pribadi Anda. Kebijakan Privasi
          ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi
          informasi yang Anda berikan kepada kami.
        </p>
        <p>
          Dengan menggunakan layanan KucingKu, Anda menyetujui praktik pengumpulan dan penggunaan
          data sebagaimana dijelaskan dalam kebijakan ini. Kami tidak akan menjual data pribadi
          Anda kepada pihak ketiga untuk tujuan komersial.
        </p>
      </div>
    ),
  },
  {
    id: "data-dikumpulkan",
    title: "Data yang Kami Kumpulkan",
    content: (
      <div className="space-y-4">
        <p>Kami mengumpulkan beberapa kategori data untuk memberikan layanan terbaik:</p>

        {[
          {
            title: "Data Identitas & Kontak",
            items: ["Nama lengkap", "Alamat email", "Nomor telepon/WhatsApp", "Alamat pengiriman (untuk layanan antar-jemput)"],
            color: "bg-blue-50 border-blue-100",
            dot: "bg-blue-400",
          },
          {
            title: "Data Hewan Peliharaan",
            items: ["Nama, ras, dan usia kucing", "Riwayat vaksinasi dan kesehatan", "Kondisi khusus, alergi, dan diet", "Foto kucing (opsional)"],
            color: "bg-amber-50 border-amber-100",
            dot: "bg-amber-400",
          },
          {
            title: "Data Transaksi",
            items: ["Riwayat pemesanan dan penitipan", "Metode dan riwayat pembayaran", "Preferensi layanan"],
            color: "bg-green-50 border-green-100",
            dot: "bg-green-400",
          },
          {
            title: "Data Teknis",
            items: ["Alamat IP dan jenis browser", "Halaman yang dikunjungi di platform kami", "Waktu dan durasi kunjungan (via cookies analitik)"],
            color: "bg-purple-50 border-purple-100",
            dot: "bg-purple-400",
          },
        ].map(({ title, items, color, dot }) => (
          <div key={title} className={`rounded-xl border p-4 ${color}`}>
            <p className="font-semibold text-stone-800 text-sm mb-2">{title}</p>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${dot}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "penggunaan-data",
    title: "Cara Kami Menggunakan Data",
    content: (
      <div className="space-y-3">
        <p>Data yang Anda berikan digunakan untuk tujuan-tujuan berikut:</p>
        <ul className="space-y-2 list-none text-sm">
          {[
            ["Menyediakan layanan penitipan", "Memproses pemesanan, mengelola jadwal, dan memberikan perawatan terbaik bagi kucing Anda."],
            ["Komunikasi layanan", "Mengirim konfirmasi pemesanan, update status penitipan, foto harian, dan notifikasi penting."],
            ["Pembayaran", "Memproses dan memverifikasi transaksi pembayaran secara aman."],
            ["Peningkatan layanan", "Menganalisis pola penggunaan untuk memperbaiki kualitas platform dan layanan."],
            ["Keamanan", "Mendeteksi dan mencegah penipuan, penyalahgunaan, atau aktivitas mencurigakan."],
            ["Pemasaran (dengan izin)", "Mengirimkan penawaran, promo, dan konten relevan jika Anda telah memberikan izin."],
          ].map(([title, desc]) => (
            <li key={title as string} className="flex gap-3">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">▸</span>
              <span><strong className="text-stone-700">{title}:</strong> {desc}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "berbagi-data",
    title: "Berbagi Data dengan Pihak Ketiga",
    content: (
      <div className="space-y-3">
        <p>
          KucingKu <strong>tidak menjual</strong> data pribadi Anda. Kami hanya berbagi data dalam
          kondisi terbatas berikut:
        </p>
        <ul className="space-y-2 list-none text-sm">
          {[
            "Klinik hewan rekanan — hanya data kesehatan kucing yang relevan, dalam kondisi darurat medis.",
            "Penyedia pembayaran (payment gateway) — data transaksi yang diperlukan untuk memproses pembayaran.",
            "Penyedia layanan cloud & analitik — data teknis yang dianonimkan untuk operasional platform.",
            "Otoritas hukum — jika diwajibkan oleh hukum yang berlaku di Indonesia.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm bg-amber-50 border border-amber-100 rounded-xl p-3 text-amber-800">
          ℹ️ Semua pihak ketiga yang bekerja sama dengan kami diwajibkan mematuhi standar
          perlindungan data yang setara dengan kebijakan ini.
        </p>
      </div>
    ),
  },
  {
    id: "keamanan-data",
    title: "Keamanan Data",
    content: (
      <div className="space-y-3">
        <p>Kami menerapkan langkah-langkah teknis dan organisasional untuk melindungi data Anda:</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "🔒", title: "Enkripsi SSL/TLS", desc: "Semua data ditransfer menggunakan enkripsi SSL 256-bit." },
            { icon: "🛡️", title: "Akses Terbatas", desc: "Hanya staf berwenang yang dapat mengakses data sensitif." },
            { icon: "💾", title: "Backup Rutin", desc: "Data dicadangkan secara rutin untuk mencegah kehilangan." },
            { icon: "🔍", title: "Audit Berkala", desc: "Sistem keamanan diaudit secara berkala oleh pihak independen." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-stone-50 rounded-xl p-4 border border-stone-100">
              <div className="text-xl mb-2">{icon}</div>
              <p className="font-semibold text-stone-800 text-sm mb-1">{title}</p>
              <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "hak-pengguna",
    title: "Hak-Hak Anda",
    content: (
      <div className="space-y-3">
        <p>Sebagai pengguna KucingKu, Anda memiliki hak-hak berikut terkait data pribadi Anda:</p>
        <ul className="space-y-2 list-none text-sm">
          {[
            ["Hak Akses", "Meminta salinan data pribadi yang kami simpan tentang Anda."],
            ["Hak Koreksi", "Memperbarui atau memperbaiki data yang tidak akurat melalui pengaturan akun."],
            ["Hak Penghapusan", "Meminta penghapusan data Anda (dengan keterbatasan tertentu sesuai kewajiban hukum)."],
            ["Hak Portabilitas", "Menerima data Anda dalam format yang dapat dibaca mesin."],
            ["Hak Menolak Pemasaran", "Berhenti menerima komunikasi pemasaran kapan saja melalui tautan unsubscribe."],
            ["Hak Pengaduan", "Mengajukan pengaduan kepada kami atau kepada otoritas perlindungan data yang berwenang."],
          ].map(([title, desc]) => (
            <li key={title as string} className="flex gap-2">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">▸</span>
              <span><strong className="text-stone-700">{title}:</strong> {desc}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-stone-500">
          Untuk menggunakan hak-hak di atas, kirimkan permintaan ke{" "}
          <a href="mailto:privacy@kucingku.id" className="text-amber-600 hover:underline">
            privacy@kucingku.id
          </a>
          . Kami akan merespons dalam 14 hari kerja.
        </p>
      </div>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Teknologi Pelacakan",
    content: (
      <div className="space-y-3">
        <p>
          Kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman pengguna.
          Jenis cookies yang kami gunakan:
        </p>
        <div className="overflow-hidden rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead className="bg-stone-50">
              <tr>
                <th className="text-left px-4 py-2.5 text-stone-600 font-semibold">Jenis</th>
                <th className="text-left px-4 py-2.5 text-stone-600 font-semibold">Tujuan</th>
                <th className="text-left px-4 py-2.5 text-stone-600 font-semibold">Wajib?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                ["Esensial", "Fungsi dasar platform (login, keranjang)", "Ya"],
                ["Preferensi", "Menyimpan pengaturan bahasa & tampilan", "Tidak"],
                ["Analitik", "Memahami cara pengguna menggunakan platform", "Tidak"],
                ["Pemasaran", "Menampilkan iklan yang relevan", "Tidak"],
              ].map(([type, purpose, required]) => (
                <tr key={type}>
                  <td className="px-4 py-2.5 font-medium text-stone-700">{type}</td>
                  <td className="px-4 py-2.5 text-stone-600">{purpose}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${required === "Ya" ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-500"}`}>
                      {required}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-stone-500">
          Anda dapat mengatur preferensi cookies melalui pengaturan browser Anda. Menonaktifkan
          cookies esensial dapat mengganggu fungsionalitas platform.
        </p>
      </div>
    ),
  },
  {
    id: "retensi-data",
    title: "Penyimpanan & Retensi Data",
    content: (
      <div className="space-y-3">
        <p>Kami menyimpan data Anda selama diperlukan untuk tujuan berikut:</p>
        <ul className="space-y-2 list-none text-sm">
          {[
            "Data akun aktif disimpan selama akun Anda aktif digunakan.",
            "Riwayat transaksi disimpan selama 5 tahun untuk keperluan akuntansi dan audit.",
            "Rekaman CCTV disimpan selama maksimal 30 hari setelah masa penitipan berakhir.",
            "Foto kucing disimpan di galeri akun Anda sampai Anda menghapusnya secara manual.",
            "Setelah akun dihapus, data akan dianonimkan atau dihapus dalam 30 hari, kecuali ada kewajiban hukum.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "perubahan-kebijakan",
    title: "Perubahan Kebijakan Privasi",
    content: (
      <p>
        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan material
        akan diberitahukan melalui email terdaftar atau banner notifikasi di platform minimal
        7 hari sebelum berlaku. Versi terbaru selalu dapat diakses di halaman ini. Tanggal
        pembaruan terakhir tercantum di bagian atas halaman ini.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      badge="Privasi & Keamanan"
      title="Kebijakan Privasi"
      subtitle="Kami serius dalam melindungi privasi Anda. Baca bagaimana kami mengelola data Anda."
      lastUpdated="1 Januari 2024"
      sections={SECTIONS}
    />
  );
}
