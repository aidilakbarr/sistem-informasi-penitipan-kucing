import PawIcon from "@/components/icons/PawIcon";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-amber-50 flex items-center">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <span>🐾</span> Penitipan Kucing Terpercaya #1 di Kota
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-stone-900 leading-tight mb-6">
            Titipkan <span className="text-amber-500">Kucingmu</span>
            <br />
            dengan Aman & Penuh Kasih 🐱
          </h1>

          <p className="text-stone-600 text-lg leading-relaxed mb-8 max-w-md">
            Kami merawat kucing kesayangan Anda layaknya anggota keluarga.
          </p>

          <a
            href="#pesan"
            className="px-7 py-3.5 bg-amber-500 text-white font-bold rounded-full"
          >
            Pesan Sekarang
          </a>
        </div>

        <div className="flex justify-center">
          <div className="w-72 h-80 bg-gradient-to-br from-amber-300 to-orange-400 rounded-[2.5rem] flex items-end justify-center shadow-2xl">
            <div className="text-[180px] -mb-2.5">🐱</div>
          </div>
        </div>
      </div>
    </section>
  );
}
