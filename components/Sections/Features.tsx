import PawIcon from "@/components/icons/PawIcon";
import StarIcon from "@/components/icons/StarIcon";
import CheckIcon from "@/components/icons/CheckIcon";

export default function Features() {
  const features = [
    {
      icon: <PawIcon className="w-10 h-10 text-amber-500" />,
      title: "Perawatan Penuh Kasih",
      desc: "Setiap kucing diperlakukan seperti keluarga sendiri dengan perhatian personal.",
    },
    {
      icon: <StarIcon className="w-10 h-10 text-amber-500" />,
      title: "Fasilitas Premium",
      desc: "Kandang bersih, ruang bermain luas, dan area terpisah untuk kenyamanan maksimal.",
    },
    {
      icon: <CheckIcon className="w-10 h-10 text-amber-500" />,
      title: "Update Harian",
      desc: "Kami kirim foto & video setiap hari agar Anda tetap tenang selama bepergian.",
    },
  ];

  return (
    <section id="keunggulan" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-black mb-4">Kenapa Pilih KucingKu?</h2>
        <p className="text-stone-600 mb-16 max-w-2xl mx-auto">
          Kami memahami bahwa kucing adalah bagian dari keluarga. Karena itu,
          kami memberikan layanan terbaik dengan standar kebersihan dan keamanan
          tinggi.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-8 rounded-3xl border border-stone-200 hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-6">{f.icon}</div>

              <h3 className="text-xl font-bold mb-3">{f.title}</h3>

              <p className="text-stone-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
