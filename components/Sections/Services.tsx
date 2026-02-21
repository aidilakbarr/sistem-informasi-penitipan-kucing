import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="layanan" className="py-24 bg-amber-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="bg-white p-6 rounded-2xl">
            <div className="text-3xl">{s.emoji}</div>
            <h3 className="font-bold mt-3">{s.title}</h3>
            <p className="text-sm text-stone-500">{s.desc}</p>
            <div className="font-bold mt-4">{s.price}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
