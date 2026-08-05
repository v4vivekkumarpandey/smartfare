"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

export interface SearchItem {
  slug: string;
  name: string;
  category: string;
}

export function SearchBox({
  index,
  placeholder = "Search 500+ stores…",
  className = "",
}: {
  index: SearchItem[];
  placeholder?: string;
  className?: string;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results =
    q.trim().length > 0
      ? index
          .filter((s) =>
            s.name.toLowerCase().includes(q.trim().toLowerCase())
          )
          .slice(0, 6)
      : [];

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 rounded-full border border-ink-300 bg-white px-4 py-2.5 shadow-sm focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
        <Search width={18} height={18} className="shrink-0 text-ink-500" />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          aria-label="Search stores"
          className="w-full bg-transparent text-sm outline-none placeholder:text-ink-500"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            aria-label="Clear search"
            className="text-ink-500 hover:text-ink-700"
          >
            <X width={16} height={16} />
          </button>
        )}
      </div>

      {open && q.trim() && (
        <div className="absolute z-40 mt-2 w-full overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-xl">
          {results.length > 0 ? (
            <ul className="max-h-80 overflow-auto py-1">
              {results.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/coupons/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-ink-100"
                  >
                    <span className="font-medium text-ink-900">{s.name}</span>
                    <span className="text-xs capitalize text-ink-500">
                      {s.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-ink-500">
              No stores found for “{q}”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
