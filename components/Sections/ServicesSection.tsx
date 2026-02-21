import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SERVICES } from "@/lib/constants";

export function ServicesSection() {
  return (
    <section id="layanan" className="py-24 bg-amber-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          badge="Paket Layanan"
          title={<>Pilih Paket yang<br />Sesuai Kebutuhan</>}
          subtitle="Harga transparan tanpa biaya tersembunyi. Semua paket sudah termasuk fasilitas dasar terbaik."
        />

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
