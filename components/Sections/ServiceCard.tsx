import { CheckIcon } from "@/components/ui/Icons";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { emoji, title, desc, price, features, popular } = service;

  return (
    <div
      className={`relative rounded-3xl p-7 flex flex-col ${
        popular
          ? "bg-amber-500 text-white shadow-2xl shadow-amber-200 scale-105"
          : "bg-white border border-stone-100"
      }`}
    >
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
          ⭐ Paling Diminati
        </div>
      )}

      <div className="text-4xl mb-4" aria-hidden="true">{emoji}</div>

      <h3 className={`text-xl font-black mb-2 ${popular ? "text-white" : "text-stone-900"}`}>
        {title}
      </h3>

      <p className={`text-sm leading-relaxed mb-5 ${popular ? "text-amber-100" : "text-stone-500"}`}>
        {desc}
      </p>

      <p className={`text-2xl font-black mb-5 ${popular ? "text-white" : "text-amber-600"}`}>
        {price}
      </p>

      <ul className="space-y-2.5 mb-7 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-sm">
            <span
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                popular ? "bg-white/20 text-white" : "bg-amber-100 text-amber-600"
              }`}
            >
              <CheckIcon />
            </span>
            <span className={popular ? "text-amber-50" : "text-stone-600"}>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="#pesan"
        className={`py-3 rounded-full text-center font-bold text-sm transition-all ${
          popular
            ? "bg-white text-amber-600 hover:bg-amber-50"
            : "bg-amber-500 text-white hover:bg-amber-600"
        }`}
      >
        Pilih Paket
      </a>
    </div>
  );
}
