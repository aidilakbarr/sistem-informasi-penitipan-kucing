import { SectionHeader } from "@/components/ui/SectionHeader";
import { FaqAccordionItem } from "@/components/sections/FaqAccordionItem";
import { FAQS } from "@/lib/constants";

export function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-amber-50">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader badge="FAQ" title="Pertanyaan Umum" />

        <div className="space-y-3">
          {FAQS.map((item, index) => (
            <FaqAccordionItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
