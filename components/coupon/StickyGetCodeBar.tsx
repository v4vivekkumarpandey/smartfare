"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";
import { useRevealCode } from "./useRevealCode";
import { CouponRevealModal } from "./CouponRevealModal";
import { StoreLogo } from "@/components/store/StoreLogo";

/**
 * Floating "Get Code" bar for store pages — stays reachable while scrolling
 * so the best offer's CTA doesn't disappear once the hero scrolls out of view.
 * Watches the #store-hero-cta sentinel rendered in the page's hero section.
 */
export function StickyGetCodeBar({
  storeName,
  storeSlug,
  storeLogo,
  discount,
  couponTitle,
  couponId,
  couponType,
  hasCode,
  outboundHref,
}: {
  storeName: string;
  storeSlug: string;
  storeLogo?: string;
  discount: string;
  couponTitle: string;
  couponId: string;
  couponType: string;
  hasCode: boolean;
  outboundHref: string;
}) {
  const [visible, setVisible] = useState(false);
  const { code, loading, copied, open, setOpen, reveal, copy } = useRevealCode({
    storeSlug,
    storeName,
    couponId,
    couponType,
    hasCode,
    outboundHref,
  });

  useEffect(() => {
    const sentinel = document.getElementById("store-hero-cta");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-56px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        aria-hidden={!visible}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300",
          visible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          {storeLogo && (
            <StoreLogo
              src={storeLogo}
              alt={storeName}
              width={36}
              height={36}
              className="hidden h-9 w-9 shrink-0 rounded-lg object-contain sm:block"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-ink-900">
              Save {discount} on {storeName}
            </p>
            <p className="truncate text-xs text-ink-500">{couponTitle}</p>
          </div>
          <button
            type="button"
            onClick={reveal}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600 active:scale-95"
          >
            {hasCode ? "Get Code" : "Get Deal"}
            <ExternalLink width={14} height={14} className="hidden opacity-90 sm:block" />
          </button>
        </div>
      </div>

      <CouponRevealModal
        open={open}
        onClose={() => setOpen(false)}
        hasCode={hasCode}
        storeName={storeName}
        couponTitle={couponTitle}
        code={code}
        loading={loading}
        copied={copied}
        onCopy={copy}
        outboundHref={outboundHref}
      />
    </>
  );
}
