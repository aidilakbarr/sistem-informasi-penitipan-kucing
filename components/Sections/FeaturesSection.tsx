import { SectionHeader } from "@/components/ui/SectionHeader";
import { FEATURES } from "@/lib/constants";

export function FeaturesSection() {
  return (
    <section id="fasilitas" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          badge="Fasilitas Premium"
          title={
            <>
              Kenyamanan Maksimal
              <br />
              untuk Anabul Anda
            </>
          }
          subtitle="Setiap fasilitas dirancang khusus untuk memenuhi kebutuhan fisik dan psikologis kucing selama masa penitipan."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;

            return (
              <div
                key={f.title}
                // Tambahkan flex-col dan items-center jika ingin teksnya juga ikut ke tengah
                className="group p-8 rounded-3xl bg-stone-50 hover:bg-white border border-stone-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 text-center flex flex-col items-center"
              >
                {/* Kontainer Ikon: Pastikan ada flex, items-center, dan justify-center */}
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <Icon size={28} strokeWidth={2.5} />
                </div>

                <h3 className="font-bold text-stone-900 text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-stone-500 leading-relaxed text-sm">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
