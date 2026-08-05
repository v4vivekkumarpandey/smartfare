"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-100 overflow-hidden rounded-card border border-ink-100 bg-white">
      {faqs.map((faq, i) => {
        const open = openIdx === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
            >
              <span className="text-sm font-semibold text-ink-900 sm:text-base">
                {faq.q}
              </span>
              <ChevronDown
                width={18}
                height={18}
                className={`shrink-0 text-ink-500 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && (
              <p className="px-4 pb-4 text-sm leading-relaxed text-ink-700">
                {faq.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
