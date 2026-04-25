"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Home,
  CreditCard,
  Users,
  MessageSquare,
  BarChart3,
  FileText,
  Stethoscope,
  Cat,
  CalendarPlus,
  Camera,
  Bike,
  History,
  Settings,
  LogOut,
  Menu,
  Box,
} from "lucide-react"; // Import Lucide Icons
import { PawIcon } from "@/components/ui/Icons";
import type { Role } from "@/types/dashboard";
import { ROLE_CONFIG } from "@/lib/dashboard-utils";
import { logout } from "@/services/api/auth.service";
import { useAuthStore } from "@/store/auth";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode; // Ubah tipe menjadi ReactNode
  badge?: number;
}

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  ADMIN: [
    {
      href: "/dashboard/admin",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      href: "/dashboard/admin/bookings",
      label: "Manajemen Booking",
      icon: <ClipboardList size={18} />,
    },
    {
      href: "/dashboard/admin/cages",
      label: "Manajemen Kandang",
      icon: <Box size={18} />,
    },
    {
      href: "/dashboard/admin/payments",
      label: "Pembayaran",
      icon: <CreditCard size={18} />,
    },
    {
      href: "/dashboard/admin/users",
      label: "Manajemen User",
      icon: <Users size={18} />,
    },
    {
      href: "/dashboard/admin/chat",
      label: "Chat",
      icon: <MessageSquare size={18} />,
    },
    {
      href: "/dashboard/admin/reports",
      label: "Laporan",
      icon: <BarChart3 size={18} />,
    },
  ],
  CARETAKER: [
    {
      href: "/dashboard/caretaker",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      href: "/dashboard/caretaker/bookings",
      label: "Booking Ditugaskan",
      icon: <ClipboardList size={18} />,
    },
    {
      href: "/dashboard/caretaker/daily-report",
      label: "Laporan Harian",
      icon: <FileText size={18} />,
    },
    {
      href: "/dashboard/caretaker/health",
      label: "Catatan Kesehatan",
      icon: <Stethoscope size={18} />,
    },
  ],
  CUSTOMER: [
    { href: "/dashboard/customer", label: "Beranda", icon: <Home size={18} /> },
    {
      href: "/dashboard/customer/cats",
      label: "Kucing Saya",
      icon: <Cat size={18} />,
    },
    {
      href: "/dashboard/customer/booking",
      label: "Pesan Sekarang",
      icon: <CalendarPlus size={18} />,
    },
    {
      href: "/dashboard/customer/bookings",
      label: "Riwayat Booking",
      icon: <ClipboardList size={18} />,
    },
    {
      href: "/dashboard/customer/payments",
      label: "Pembayaran",
      icon: <CreditCard size={18} />,
    },
    {
      href: "/dashboard/customer/monitor",
      label: "Monitoring",
      icon: <Camera size={18} />,
    },
    {
      href: "/dashboard/customer/chat",
      label: "Chat",
      icon: <MessageSquare size={18} />,
    },
    {
      href: "/dashboard/customer/tracking",
      label: "Tracking Kurir",
      icon: <Bike size={18} />,
    },
  ],
  COURIER: [
    {
      href: "/dashboard/courier",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      href: "/dashboard/courier/tasks",
      label: "Tugas Saya",
      icon: <ClipboardList size={18} />,
    },
    {
      href: "/dashboard/courier/history",
      label: "Riwayat Tugas",
      icon: <History size={18} />,
    },
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
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      clearAuth();
      router.push("/login");
    }
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-stone-900 flex flex-col h-screen sticky top-0 overflow-y-auto border-r border-stone-800">
      {/* Logo */}
      <div className="p-5 border-b border-stone-800">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center">
            <PawIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-white text-lg tracking-tight">
            AnZ <span className="text-amber-400">Pet Care</span>
          </span>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Users size={18} />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-sm truncate">{userName}</p>
            <span
              className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${roleConf.color} ${roleConf.bg}`}
            >
              {roleConf.label}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          const badgeCount =
            item.label === "Chat" ? unreadChat : (item.badge ?? 0);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-900/20"
                  : "text-stone-400 hover:text-white hover:bg-stone-800"
              }`}
            >
              <span
                className={`${isActive ? "text-white" : "text-stone-500 group-hover:text-amber-400"} transition-colors`}
              >
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {badgeCount > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                    isActive
                      ? "bg-white text-amber-600"
                      : "bg-amber-500 text-white"
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
      <div className="p-3 border-t border-stone-800 space-y-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-white hover:bg-stone-800 transition-all group"
        >
          <Settings
            size={18}
            className="text-stone-500 group-hover:text-amber-400"
          />
          Pengaturan
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-red-400 hover:bg-red-900/10 transition-all group"
        >
          <LogOut
            size={18}
            className="text-stone-500 group-hover:text-red-400"
          />
          Keluar
        </button>
      </div>
    </aside>
  );
}

// ─── Mobile Header ────────────────────────────────────────────────────────────

export function DashboardHeader({
  role,
  onMenuToggle,
}: {
  role: Role;
  userName: string;
  onMenuToggle: () => void;
}) {
  const roleConf = ROLE_CONFIG[role];
  return (
    <header className="lg:hidden bg-stone-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-stone-800">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
          <PawIcon className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-black text-base">AnZ Pet Care</span>
      </Link>
      <div className="flex items-center gap-3">
        <span
          className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${roleConf.color} ${roleConf.bg}`}
        >
          {roleConf.label}
        </span>
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-lg bg-stone-800 text-stone-300 active:scale-95 transition-transform"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

// ─── Layout wrapper (Tetap Sama) ──────────────────────────────────────────────

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
      <div className="hidden lg:block">
        <Sidebar role={role} userName={userName} unreadChat={unreadChat} />
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-in fade-in duration-200">
          <div className="w-64 animate-in slide-in-from-left duration-300">
            <Sidebar role={role} userName={userName} unreadChat={unreadChat} />
          </div>
          <div
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader
          role={role}
          userName={userName}
          onMenuToggle={() => setMobileOpen((v) => !v)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-stone-50">
          {children}
        </main>
      </div>
    </div>
  );
}
