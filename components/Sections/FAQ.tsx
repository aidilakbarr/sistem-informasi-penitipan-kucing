"use client";

import { useState } from "react";
import PawIcon from "../icons/PawIcon";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-amber-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-amber-600 font-semibold text-sm mb-3">
            <PawIcon className="w-4 h-4" /> FAQ
          </div>
          <h2 className="text-4xl font-black text-stone-900 mb-4">
            Pertanyaan Umum
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-stone-100"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-stone-800 text-sm"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{f.q}</span>
                <span
                  className={`ml-4 shrink-0 text-amber-500 text-xl transition-transform ${open === i ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-sm text-stone-600 leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
