"use client";

import { useState } from "react";
import { PawIcon, MenuIcon, CloseIcon } from "@/components/ui/Icons";
import { NAV_LINKS } from "@/lib/constants";
import { useScrolled } from "@/hooks/useScrolled";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-amber-50/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform">
            <PawIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl text-stone-800 tracking-tight">
            Kucing<span className="text-amber-500">Ku</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-stone-600 hover:text-amber-600 font-medium text-sm transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#pesan"
          className="hidden md:inline-flex px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm rounded-full transition-colors shadow-sm"
        >
          Titipkan Sekarang
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-stone-700"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-amber-50 border-t border-amber-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-stone-700 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#pesan"
            className="px-5 py-2.5 bg-amber-500 text-white font-semibold text-sm rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Titipkan Sekarang
          </a>
        </div>
      )}
    </nav>
  );
}
