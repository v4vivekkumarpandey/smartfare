"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export interface NavStore {
  slug: string;
  name: string;
}

/**
 * Desktop primary navigation:
 *   Coupons ▾  (dropdown of featured stores + "All stores")
 *   Categories (link to the category index)
 *   Blog       (link to the blog index)
 */
export function PrimaryNav({ stores }: { stores: NavStore[] }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const linkCls =
    "rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-100 hover:text-ink-900";

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {/* Coupons dropdown */}
      <div
        className="relative"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
      >
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex items-center gap-1 ${linkCls}`}
        >
          Coupons
          <ChevronDown
            width={15}
            height={15}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-full z-40 w-64 pt-2">
            <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white p-2 shadow-xl">
              <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                Popular stores
              </p>
              <ul className="max-h-80 overflow-auto">
                {stores.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/coupons/${s.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-100 hover:text-brand-600"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/stores"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg bg-brand-50 px-3 py-2 text-center text-sm font-bold text-brand-700 hover:bg-brand-100"
              >
                View all stores →
              </Link>
            </div>
          </div>
        )}
      </div>

      <Link href="/category" className={linkCls}>
        Categories
      </Link>
      <Link href="/blog" className={linkCls}>
        Blog
      </Link>
    </nav>
  );
}
