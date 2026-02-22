"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawIcon } from "@/components/ui/Icons";
import type { Role } from "@/types/dashboard";
import { ROLE_CONFIG } from "@/lib/dashboard-utils";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: number;
}

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  ADMIN: [
    { href: "/dashboard/admin",           label: "Dashboard",         icon: "📊" },
    { href: "/dashboard/admin/bookings",  label: "Manajemen Booking", icon: "📋" },
    { href: "/dashboard/admin/cages",     label: "Manajemen Kandang", icon: "🏠" },
    { href: "/dashboard/admin/payments",  label: "Pembayaran",        icon: "💳" },
    { href: "/dashboard/admin/users",     label: "Manajemen User",    icon: "👥" },
    { href: "/dashboard/admin/chat",      label: "Chat",              icon: "💬" },
    { href: "/dashboard/admin/reports",   label: "Laporan",           icon: "📈" },
  ],
  CARETAKER: [
    { href: "/dashboard/caretaker",             label: "Dashboard",           icon: "📊" },
    { href: "/dashboard/caretaker/bookings",    label: "Booking Ditugaskan",  icon: "📋" },
    { href: "/dashboard/caretaker/daily-report", label: "Laporan Harian",     icon: "📝" },
    { href: "/dashboard/caretaker/health",      label: "Catatan Kesehatan",   icon: "🏥" },
  ],
  CUSTOMER: [
    { href: "/dashboard/customer",           label: "Beranda",         icon: "🏡" },
    { href: "/dashboard/customer/cats",      label: "Kucing Saya",     icon: "🐱" },
    { href: "/dashboard/customer/booking",   label: "Pesan Sekarang",  icon: "📅" },
    { href: "/dashboard/customer/bookings",  label: "Riwayat Booking", icon: "📋" },
    { href: "/dashboard/customer/payments",  label: "Pembayaran",      icon: "💳" },
    { href: "/dashboard/customer/monitor",   label: "Monitoring",      icon: "📸" },
    { href: "/dashboard/customer/chat",      label: "Chat",            icon: "💬" },
    { href: "/dashboard/customer/tracking",  label: "Tracking Kurir",  icon: "🛵" },
  ],
  COURIER: [
    { href: "/dashboard/courier",          label: "Dashboard",       icon: "📊" },
    { href: "/dashboard/courier/tasks",    label: "Tugas Saya",      icon: "📋" },
    { href: "/dashboard/courier/history",  label: "Riwayat Tugas",   icon: "🕒" },
  ],
};

interface SidebarProps {
  role: Role;
  userName: string;
  unreadChat?: number;
}

export function Sidebar({ role, userName, unreadChat = 0 }: SidebarProps) {
  const pathname = usePathname();
  const nav = NAV_BY_ROLE[role];
  const roleConf = ROLE_CONFIG[role];

  return (
    <aside className="w-64 flex-shrink-0 bg-stone-900 flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-5 border-b border-stone-800">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center">
            <PawIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-white text-lg tracking-tight">
            Kucing<span className="text-amber-400">Ku</span>
          </span>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-base">
            {roleConf.emoji}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-sm truncate">{userName}</p>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${roleConf.color} ${roleConf.bg}`}>
              {roleConf.label}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          const badgeCount = item.label === "Chat" ? unreadChat : (item.badge ?? 0);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? "bg-amber-500 text-white"
                  : "text-stone-400 hover:text-white hover:bg-stone-800"
              }`}
            >
              <span className="text-base w-5 flex items-center justify-center">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {badgeCount > 0 && (
                <span
                  className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                    isActive ? "bg-white/20 text-white" : "bg-amber-500 text-white"
                  }`}
                >
                  {badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-stone-800 space-y-0.5">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-white hover:bg-stone-800 transition-all"
        >
          <span className="text-base w-5 flex items-center justify-center">⚙️</span>
          Pengaturan
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-red-400 hover:bg-red-900/20 transition-all"
        >
          <span className="text-base w-5 flex items-center justify-center">🚪</span>
          Keluar
        </Link>
      </div>
    </aside>
  );
}

// ─── Mobile Header ────────────────────────────────────────────────────────────

export function DashboardHeader({
  role,
  userName,
  onMenuToggle,
}: {
  role: Role;
  userName: string;
  onMenuToggle: () => void;
}) {
  const roleConf = ROLE_CONFIG[role];
  return (
    <header className="lg:hidden bg-stone-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
          <PawIcon className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-black text-base">KucingKu</span>
      </Link>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${roleConf.color} ${roleConf.bg}`}>
          {roleConf.emoji} {roleConf.label}
        </span>
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-lg bg-stone-800 text-stone-300"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

// ─── Layout wrapper ───────────────────────────────────────────────────────────

export function DashboardLayout({
  role,
  userName,
  unreadChat,
  children,
}: {
  role: Role;
  userName: string;
  unreadChat?: number;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-stone-50 font-sans">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar role={role} userName={userName} unreadChat={unreadChat} />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64">
            <Sidebar role={role} userName={userName} unreadChat={unreadChat} />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader
          role={role}
          userName={userName}
          onMenuToggle={() => setMobileOpen((v) => !v)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
