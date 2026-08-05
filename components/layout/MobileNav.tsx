"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { NavStore } from "./PrimaryNav";

export function MobileNav({ stores }: { stores: NavStore[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const itemCls =
    "block rounded-lg px-3 py-3 text-base text-ink-700 hover:bg-ink-100";
  const headingCls =
    "px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-ink-500";

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-ink-700 hover:bg-ink-100"
      >
        <Menu width={22} height={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
          <div className="flex items-center justify-between border-b border-ink-100 px-4 py-4">
            <span className="text-lg font-bold text-ink-900">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="rounded-lg p-2 text-ink-700 hover:bg-ink-100"
            >
              <X width={22} height={22} />
            </button>
          </div>
          <nav className="px-4 py-2 pb-10">
            <Link
              href="/"
              onClick={close}
              className="block rounded-lg px-3 py-3 text-base font-medium text-ink-900 hover:bg-ink-100"
            >
              Home
            </Link>

            <p className={headingCls}>Coupons</p>
            {stores.map((s) => (
              <Link
                key={s.slug}
                href={`/coupons/${s.slug}`}
                onClick={close}
                className={itemCls}
              >
                {s.name}
              </Link>
            ))}
            <Link
              href="/stores"
              onClick={close}
              className="block rounded-lg px-3 py-3 text-base font-semibold text-brand-700 hover:bg-ink-100"
            >
              View all stores →
            </Link>

            <p className={headingCls}>More</p>
            <Link href="/category" onClick={close} className={itemCls}>
              Categories
            </Link>
            <Link href="/blog" onClick={close} className={itemCls}>
              Blog
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
