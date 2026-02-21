import { StarIcon } from "@/components/ui/Icons";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, cat, rating, text, avatar } = testimonial;

  return (
    <article className="bg-stone-50 rounded-3xl p-6 border border-stone-100">
      <div className="flex text-amber-400 mb-4" aria-label={`Rating: ${rating} dari 5 bintang`}>
        {Array.from({ length: rating }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>

      <blockquote className="text-stone-700 text-sm leading-relaxed mb-6 italic">
        "{text}"
      </blockquote>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-sm"
          aria-hidden="true"
        >
          {avatar}
        </div>
        <div>
          <p className="font-bold text-stone-800 text-sm">{name}</p>
          <p className="text-xs text-stone-500">{cat}</p>
        </div>
      </div>
    </article>
  );
}
