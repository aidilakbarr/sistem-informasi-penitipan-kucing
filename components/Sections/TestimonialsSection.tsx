import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section id="testimoni" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          badge="Testimoni"
          title="Apa Kata Mereka?"
          subtitle="Ratusan pemilik kucing telah mempercayakan anabul mereka kepada kami."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
