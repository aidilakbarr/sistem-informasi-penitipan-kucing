import { PRICING } from "@/lib/constants";
import { Check } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

export function ServicesSection() {
  return (
    <section id="harga" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header - Mengikuti gaya SectionHeader Anda */}
        <SectionHeader
          badge="Tarif Layanan"
          title={
            <>
              Pilihan Paket Perawatan
              <br />
              yang Transparan
            </>
          }
          subtitle="Kami menawarkan tarif kompetitif dengan standar perawatan tinggi untuk memastikan anabul Anda tetap nyaman tanpa biaya tersembunyi."
        />

        {/* Grid - Tetap menggunakan gap-5 sesuai keinginan Anda */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING.map((item) => {
            // Mapping icon secara manual jika belum ada di constants
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-200 hover:shadow-xl transition-all duration-200 flex flex-col items-center text-center"
              >
                {/* Icon Container - Sama dengan gaya FeaturesSection */}
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Icon size={24} />
                </div>

                <h3 className="font-bold text-stone-800 mb-1">{item.title}</h3>

                <div className="flex items-baseline gap-0.5 mb-4">
                  <span className="text-sm font-bold text-stone-400">Rp</span>
                  <span className="text-2xl font-black text-stone-900">
                    {item.price}
                  </span>
                  <span className="text-xs text-stone-400">/anabul</span>
                </div>

                <ul className="w-full space-y-2 mb-6">
                  {item.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-[13px] text-stone-500 text-left"
                    >
                      <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="mt-auto w-full py-2.5 bg-stone-100 group-hover:bg-amber-500 group-hover:text-white text-stone-600 font-bold rounded-xl text-sm transition-all">
                  Pilih Paket
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
