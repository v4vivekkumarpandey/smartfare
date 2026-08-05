"use client";

import { Check, Copy, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { useRevealCode } from "./useRevealCode";
import type { PublicCoupon } from "@/lib/types";

/** Inline reveal + copy used in the "Best code right now" highlight box. */
export function CopyCodeBox({
  coupon,
  storeName,
  storeSlug,
  outboundHref,
}: {
  coupon: PublicCoupon;
  storeName: string;
  storeSlug: string;
  outboundHref: string;
}) {
  const isCode = coupon.hasCode;
  const { code, loading, copied, reveal } = useRevealCode({
    storeSlug,
    storeName,
    couponId: coupon.id,
    couponType: coupon.type,
    hasCode: isCode,
    outboundHref,
  });

  return (
    <button
      type="button"
      onClick={reveal}
      className="flex w-full items-center justify-between gap-3 rounded-xl border-2 border-dashed border-accent-500/40 bg-white px-4 py-3 text-left transition hover:border-accent-500"
    >
      <span className="font-mono text-base font-bold tracking-wider text-ink-900">
        {isCode ? (loading ? "Revealing…" : code ?? "••••••") : "Activate deal"}
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold text-white",
          copied ? "bg-success" : "bg-accent-500"
        )}
      >
        {loading ? (
          <Loader2 width={15} height={15} className="animate-spin" />
        ) : copied ? (
          <>
            <Check width={15} height={15} /> Copied
          </>
        ) : isCode ? (
          <>
            <Copy width={15} height={15} /> {code ? "Copy" : "Show & Copy"}
          </>
        ) : (
          <>
            Get Deal <ExternalLink width={15} height={15} />
          </>
        )}
      </span>
    </button>
  );
}
