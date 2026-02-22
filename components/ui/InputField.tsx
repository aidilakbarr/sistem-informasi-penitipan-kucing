import type { InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightElement?: ReactNode;
}

export function InputField({ label, error, rightElement, id, ...props }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-stone-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-4 py-3 rounded-xl text-sm border bg-white text-stone-900
            placeholder-stone-400 outline-none transition-all duration-150
            focus:ring-2 focus:ring-amber-400/40
            ${error
              ? "border-red-400 focus:border-red-400"
              : "border-stone-200 focus:border-amber-400"
            }
            ${rightElement ? "pr-12" : ""}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-500 flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}
