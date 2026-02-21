import { SectionHeader } from "@/components/ui/SectionHeader";
import { FEATURES } from "@/lib/constants";

export function FeaturesSection() {
  return (
    <section id="fasilitas" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          badge="Mengapa Pilih Kami"
          title={<>Fasilitas Terlengkap<br />untuk Si Meong</>}
          subtitle="Kami berkomitmen memberikan standar perawatan terbaik agar kucing Anda selalu nyaman dan bahagia."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl bg-stone-50 hover:bg-amber-50 border border-transparent hover:border-amber-100 transition-all duration-200 cursor-default"
            >
              <div className="text-3xl mb-3" aria-hidden="true">{f.icon}</div>
              <h3 className="font-bold text-stone-800 mb-1.5">{f.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
