import { PawIcon } from "@/components/ui/Icons";

interface SectionHeaderProps {
  badge: string;
  title: React.ReactNode;
  subtitle?: string;
  light?: boolean;
}

export function SectionHeader({ badge, title, subtitle, light = false }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <div
        className={`inline-flex items-center gap-2 font-semibold text-sm mb-3 ${
          light ? "text-amber-400" : "text-amber-600"
        }`}
      >
        <PawIcon className="w-4 h-4" />
        {badge}
      </div>
      <h2
        className={`text-4xl font-black mb-4 ${
          light ? "text-white" : "text-stone-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-md mx-auto ${light ? "text-stone-400" : "text-stone-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
