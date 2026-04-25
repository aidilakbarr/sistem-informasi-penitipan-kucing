import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — AnZ Pet Care",
  description:
    "Baca syarat dan ketentuan layanan penitipan kucing AnZ Pet Care sebelum menggunakan layanan kami.",
};

const SECTIONS = [
  {
    id: "pendahuluan",
    title: "Pendahuluan",
    content: (
      <div className="space-y-3">
        <p>
          Selamat datang di <strong>AnZ Pet Care</strong>. Dengan mengakses atau
          menggunakan layanan kami, Anda menyetujui untuk terikat oleh Syarat &
          Ketentuan yang tercantum di halaman ini. Harap baca dengan seksama
          sebelum menggunakan layanan kami.
        </p>
        <p>
          Syarat & Ketentuan ini berlaku untuk semua pengguna website, aplikasi,
          dan layanan penitipan kucing yang disediakan oleh AnZ Pet Care. Jika
          Anda tidak menyetujui syarat-syarat ini, mohon tidak menggunakan
          layanan kami.
        </p>
      </div>
    ),
  },
  {
    id: "definisi",
    title: "Definisi",
    content: (
      <ul className="space-y-2 list-none">
        {[
          [
            "AnZ Pet Care / Kami / Perusahaan",
            "Merujuk pada bisnis penitipan kucing AnZ Pet Care beserta seluruh staf dan pengelolanya.",
          ],
          [
            "Pengguna / Pemilik",
            "Setiap individu yang mendaftar dan menggunakan layanan AnZ Pet Care.",
          ],
          [
            "Kucing Titipan",
            "Hewan peliharaan (kucing) yang dititipkan oleh Pemilik kepada AnZ Pet Care.",
          ],
          [
            "Layanan",
            "Semua jenis penitipan, grooming, konsultasi, dan layanan terkait yang ditawarkan AnZ Pet Care.",
          ],
          [
            "Platform",
            "Website dan aplikasi mobile AnZ Pet Care beserta seluruh fitur di dalamnya.",
          ],
        ].map(([term, def]) => (
          <li key={term as string} className="flex gap-2">
            <span className="text-amber-500 mt-1 flex-shrink-0">▸</span>
            <span>
              <strong className="text-stone-800">{term}</strong>: {def}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "persyaratan-penitipan",
    title: "Persyaratan Penitipan",
    content: (
      <div className="space-y-4">
        <p>
          Untuk menggunakan layanan penitipan AnZ Pet Care, Anda wajib memenuhi
          persyaratan berikut:
        </p>
        <div>
          <p className="font-semibold text-stone-800 mb-2">
            Persyaratan Kesehatan Kucing:
          </p>
          <ul className="space-y-1.5 list-none">
            {[
              "Kucing telah mendapatkan vaksinasi lengkap (minimal F3/FVRCP) dan masih berlaku.",
              "Kucing bebas dari penyakit menular dan dalam kondisi sehat.",
              "Kucing telah diberi obat cacing dalam 3 bulan terakhir.",
              "Kucing bebas dari kutu, tungau, dan parasit eksternal lainnya.",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-stone-800 mb-2">
            Persyaratan Administrasi:
          </p>
          <ul className="space-y-1.5 list-none">
            {[
              "Pemilik telah mendaftar dan memiliki akun aktif di AnZ Pet Care.",
              "Pemesanan dilakukan minimal H-1 sebelum tanggal penitipan.",
              "Bukti vaksinasi disertakan saat check-in.",
              "Pemilik dapat dihubungi selama masa penitipan berlangsung.",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "kewajiban-pemilik",
    title: "Kewajiban Pemilik",
    content: (
      <div className="space-y-3">
        <p>Sebagai Pemilik kucing titipan, Anda bertanggung jawab untuk:</p>
        <ul className="space-y-2 list-none">
          {[
            "Memberikan informasi kesehatan kucing yang akurat dan lengkap saat check-in.",
            "Menginformasikan kondisi khusus kucing seperti alergi, diet khusus, atau kebutuhan medis.",
            "Menyediakan makanan/pakan favorit jika kucing memiliki diet khusus (opsional).",
            "Membawa buku vaksinasi atau bukti vaksinasi yang masih berlaku.",
            "Melunasi pembayaran sesuai paket yang dipilih sebelum check-in.",
            "Mengambil kucing tepat waktu sesuai jadwal yang disepakati.",
            "Memberikan nomor kontak darurat yang dapat dihubungi 24 jam.",
          ].map((item) => (
            <li key={item} className="flex gap-2 text-sm">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "pembayaran",
    title: "Pembayaran & Pembatalan",
    content: (
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-stone-800 mb-2">
            Ketentuan Pembayaran:
          </p>
          <ul className="space-y-1.5 list-none text-sm">
            {[
              "Pembayaran dilakukan di muka (full payment) sebelum atau saat check-in.",
              "Kami menerima pembayaran tunai, transfer bank, dan dompet digital (GoPay, OVO, Dana).",
              "Kwitansi/bukti pembayaran akan diberikan setelah transaksi berhasil.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-amber-500 mt-0.5">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-stone-800 mb-2">
            Kebijakan Pembatalan:
          </p>
          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead className="bg-stone-50">
                <tr>
                  <th className="text-left px-4 py-2.5 text-stone-600 font-semibold">
                    Waktu Pembatalan
                  </th>
                  <th className="text-left px-4 py-2.5 text-stone-600 font-semibold">
                    Refund
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  ["> 48 jam sebelum check-in", "100% refund"],
                  ["24–48 jam sebelum check-in", "50% refund"],
                  ["< 24 jam sebelum check-in", "Tidak ada refund"],
                  ["No show (tanpa konfirmasi)", "Tidak ada refund"],
                ].map(([waktu, refund]) => (
                  <tr key={waktu}>
                    <td className="px-4 py-2.5 text-stone-600">{waktu}</td>
                    <td className="px-4 py-2.5 font-medium text-stone-800">
                      {refund}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "tanggung-jawab",
    title: "Tanggung Jawab & Batasan",
    content: (
      <div className="space-y-3">
        <p>
          AnZ Pet Care berkomitmen merawat kucing titipan dengan standar
          terbaik. Namun terdapat beberapa batasan tanggung jawab yang perlu
          dipahami:
        </p>
        <ul className="space-y-2 list-none text-sm">
          {[
            "AnZ Pet Care tidak bertanggung jawab atas kondisi kesehatan yang sudah ada sebelum penitipan dan tidak diinformasikan saat check-in.",
            "Dalam kondisi darurat medis, AnZ Pet Care akan segera membawa kucing ke klinik rekanan dan menghubungi pemilik. Biaya perawatan medis darurat menjadi tanggung jawab pemilik.",
            "AnZ Pet Care tidak bertanggung jawab atas stres atau perubahan perilaku kucing yang wajar terjadi selama adaptasi di lingkungan baru.",
            "Kerugian maksimum yang dapat diklaim kepada AnZ Pet Care tidak melebihi jumlah pembayaran yang telah diterima untuk penitipan yang bersangkutan.",
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
    id: "hak-AnZ Pet Care",
    title: "Hak AnZ Pet Care",
    content: (
      <div className="space-y-3">
        <p>AnZ Pet Care berhak untuk:</p>
        <ul className="space-y-2 list-none text-sm">
          {[
            "Menolak atau membatalkan penitipan jika kucing tidak memenuhi persyaratan kesehatan.",
            "Membawa kucing ke klinik hewan jika kondisi kesehatan memburuk selama penitipan.",
            "Mengambil tindakan darurat yang diperlukan demi keselamatan kucing tanpa menunggu persetujuan pemilik dalam kondisi sangat mendesak.",
            "Memperbarui tarif layanan dengan pemberitahuan minimal 14 hari sebelumnya.",
            "Menangguhkan atau menghentikan akun pengguna yang melanggar syarat & ketentuan.",
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
    id: "perubahan",
    title: "Perubahan Syarat & Ketentuan",
    content: (
      <p>
        AnZ Pet Care berhak mengubah Syarat & Ketentuan ini sewaktu-waktu.
        Perubahan signifikan akan diberitahukan melalui email terdaftar atau
        notifikasi di platform minimal 7 hari sebelum perubahan berlaku.
        Penggunaan layanan yang berkelanjutan setelah perubahan berlaku dianggap
        sebagai penerimaan atas syarat yang baru.
      </p>
    ),
  },
  {
    id: "hukum",
    title: "Hukum yang Berlaku",
    content: (
      <p>
        Syarat & Ketentuan ini diatur dan ditafsirkan berdasarkan hukum Republik
        Indonesia. Segala sengketa yang timbul akan diselesaikan secara
        musyawarah. Apabila tidak tercapai kesepakatan, sengketa akan
        diselesaikan melalui pengadilan yang berwenang di wilayah hukum tempat
        AnZ Pet Care berdomisili.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      badge="Legal"
      title="Syarat & Ketentuan"
      subtitle="Harap baca dokumen ini dengan seksama sebelum menggunakan layanan AnZ Pet Care."
      lastUpdated="1 Januari 2024"
      sections={SECTIONS}
    />
  );
}
