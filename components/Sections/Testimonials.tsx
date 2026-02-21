import { testimonials } from "@/lib/data";

function Star({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 ${filled ? "text-amber-500" : "text-stone-300"}`}
      fill="currentColor"
    >
      <path d="M12 2l2.9 6.3L22 9.3l-5 4.8 1.2 7L12 17.8 5.8 21l1.2-7-5-4.8 7.1-1z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-black mb-4">Apa Kata Mereka?</h2>
        <p className="text-stone-600 mb-16 max-w-2xl mx-auto">
          Kepercayaan Anda adalah prioritas kami. Berikut pengalaman pelanggan
          yang telah mempercayakan kucing kesayangan mereka kepada KucingKu.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-3xl border border-stone-200 hover:shadow-xl transition text-left"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} filled={i < t.rating} />
                ))}
              </div>

              {/* Testimoni Text */}
              <p className="text-stone-700 mb-6 leading-relaxed">“{t.text}”</p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-stone-500">{t.cat}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
