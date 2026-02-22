"use client";

import { useState } from "react";
import type { FaqItem } from "@/types";

interface FaqAccordionItemProps {
  item: FaqItem;
  index: number;
}

export function FaqAccordionItem({ item, index }: FaqAccordionItemProps) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-100">
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-stone-800 text-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{item.q}</span>
        <span
          className={`ml-4 shrink-0 text-amber-500 text-xl transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="px-6 pb-4 text-sm text-stone-600 leading-relaxed"
        >
          {item.a}
        </div>
      )}
    </div>
  );
}
