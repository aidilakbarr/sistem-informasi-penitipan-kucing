import type { PasswordStrength } from "@/hooks/useRegisterForm";

interface PasswordStrengthBarProps {
  strength: PasswordStrength;
}

const CONFIG = {
  weak:   { bars: 1, color: "bg-red-400",    label: "Lemah",   textColor: "text-red-500"   },
  medium: { bars: 2, color: "bg-amber-400",  label: "Sedang",  textColor: "text-amber-500" },
  strong: { bars: 3, color: "bg-green-500",  label: "Kuat",    textColor: "text-green-600" },
} as const;

export function PasswordStrengthBar({ strength }: PasswordStrengthBarProps) {
  if (!strength) return null;
  const { bars, color, label, textColor } = CONFIG[strength];

  return (
    <div className="mt-2">
      <div className="flex gap-1.5 mb-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= bars ? color : "bg-stone-200"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${textColor}`}>Kekuatan password: {label}</p>
    </div>
  );
}
