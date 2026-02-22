"use client";

import type { ReactNode } from "react";

// ─── Badge ────────────────────────────────────────────────────────────────────

interface BadgeProps {
  label: string;
  color: string;
  bg: string;
  dot?: string;
  size?: "sm" | "md";
}

export function Badge({ label, color, bg, dot, size = "md" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full font-semibold ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      } ${color} ${bg}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />}
      {label}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  iconBg: string;
  trend?: { value: string; positive: boolean };
  sub?: string;
}

export function StatCard({ label, value, icon, iconBg, trend, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-5 hover:border-stone-200 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${iconBg}`}>
          {icon}
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend.positive ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
            }`}
          >
            {trend.positive ? "▲" : "▼"} {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-black text-stone-900 mb-0.5">{value}</p>
      <p className="text-sm font-medium text-stone-500">{label}</p>
      {sub && <p className="text-xs text-stone-400 mt-1">{sub}</p>}
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

interface SectionCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, subtitle, action, children, className }: SectionCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-stone-100 overflow-hidden ${className ?? ""}`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
        <div>
          <h3 className="font-bold text-stone-900 text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-stone-400 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────

interface TableProps {
  headers: string[];
  children: ReactNode;
  empty?: string;
}

export function Table({ headers, children, empty }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-100">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-6 py-3 text-xs font-bold text-stone-400 uppercase tracking-wide whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-50">{children}</tbody>
      </table>
      {empty && (
        <div className="text-center py-12 text-stone-400 text-sm">{empty}</div>
      )}
    </div>
  );
}

export function Tr({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <tr className={`hover:bg-stone-50/50 transition-colors ${className ?? ""}`}>
      {children}
    </tr>
  );
}

export function Td({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td className={`px-6 py-3.5 text-stone-700 ${className ?? ""}`}>{children}</td>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

export function EmptyState({ icon, title, desc }: { icon: string; title: string; desc?: string }) {
  return (
    <div className="text-center py-16 px-6">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="font-bold text-stone-600 mb-1">{title}</p>
      {desc && <p className="text-sm text-stone-400">{desc}</p>}
    </div>
  );
}

// ─── Page Header ──────────────────────────────────────────────────────────────

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-black text-stone-900">{title}</h1>
        {subtitle && <p className="text-sm text-stone-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

interface BtnProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export function Btn({
  children, onClick, variant = "primary", size = "md", disabled, type = "button", className,
}: BtnProps) {
  const variants = {
    primary:   "bg-amber-500 hover:bg-amber-600 text-white shadow-sm",
    secondary: "bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:border-stone-300",
    danger:    "bg-red-500 hover:bg-red-600 text-white",
    ghost:     "bg-transparent hover:bg-stone-100 text-stone-600",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const colors = ["bg-amber-200 text-amber-800", "bg-blue-200 text-blue-800", "bg-green-200 text-green-800", "bg-purple-200 text-purple-800"];
  const color = colors[name.charCodeAt(0) % colors.length];
  const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-11 h-11 text-base" };
  return (
    <div className={`rounded-full flex items-center justify-center font-bold flex-shrink-0 ${color} ${sizes[size]}`}>
      {initials}
    </div>
  );
}

// ─── Alert ────────────────────────────────────────────────────────────────────

export function Alert({ type, msg }: { type: "warning" | "error" | "success" | "info"; msg: string }) {
  const config = {
    warning: { bg: "bg-amber-50 border-amber-200", color: "text-amber-800", icon: "⚠️" },
    error:   { bg: "bg-red-50 border-red-200",     color: "text-red-800",   icon: "🚨" },
    success: { bg: "bg-green-50 border-green-200", color: "text-green-800", icon: "✅" },
    info:    { bg: "bg-blue-50 border-blue-200",   color: "text-blue-800",  icon: "ℹ️" },
  };
  const c = config[type];
  return (
    <div className={`flex items-start gap-2.5 border rounded-xl px-4 py-3 text-sm ${c.bg} ${c.color}`}>
      <span>{c.icon}</span>
      <span>{msg}</span>
    </div>
  );
}
