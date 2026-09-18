"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, ChevronDown, BadgeCheck, Flame } from "lucide-react";
import { cn, formatNumber, formatDate } from "@/lib/cn";
import { useRevealCode } from "./useRevealCode";
import { CouponRevealModal } from "./CouponRevealModal";
import { StoreLogo } from "@/components/store/StoreLogo";
import type { PublicCoupon } from "@/lib/types";

/** Days between today and an ISO date; negative when already past. */
function daysUntil(iso: string): number {
  const today = new Date().toISOString().slice(0, 10);
  const ms = new Date(iso).getTime() - new Date(today).getTime();
  return Math.round(ms / 86_400_000);
}

/** Split "60% OFF", "20%", "$10 OFF" into primary + secondary for two-line badge. */
function parseDiscount(d: string): { primary: string; secondary: string } {
  const pct = d.match(/^(\d+(?:\.\d+)?%)/);
  if (pct) return { primary: pct[1], secondary: "OFF" };
  const dollar = d.match(/^(\$\d+(?:\.\d+)?)/);
  if (dollar) return { primary: dollar[1], secondary: "OFF" };
  return { primary: d, secondary: "" };
}

export function CouponRow({
  coupon,
  storeName,
  storeSlug,
  outboundHref,
  storeLogo,
  showStore = false,
  rank,
}: {
  coupon: PublicCoupon;
  storeName: string;
  storeSlug: string;
  outboundHref: string;
  storeLogo?: string;
  showStore?: boolean;
  /** 1-based trending rank — shows a numbered badge on the card when set. */
  rank?: number;
}) {
  const [details, setDetails] = useState(false);
  const isCode = coupon.hasCode;
  const { code, loading, copied, open, setOpen, reveal, copy } = useRevealCode({
    storeSlug,
    storeName,
    couponId: coupon.id,
    couponType: coupon.type,
    hasCode: isCode,
    outboundHref,
  });

  const label = isCode ? "Get Code" : "Get Deal";
  const { primary, secondary } = parseDiscount(coupon.discount);

  return (
    <>
      <div className="relative overflow-hidden rounded-xl border border-ink-100 bg-white shadow-sm transition hover:shadow-md">
        {rank != null && rank <= 3 && (
          <span className="absolute -left-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-[11px] font-black text-white shadow-sm">
            {rank}
          </span>
        )}
        <div className="flex items-center gap-2.5 p-2.5 sm:gap-4 sm:p-4">

          {/* Discount badge — two-line for %, single-line for text */}
          <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-accent-500/10 px-1 py-3 text-center sm:w-24">
            <span className={cn(
              "font-black leading-none text-accent-600",
              secondary ? "text-sm sm:text-xl" : "text-xs sm:text-base"
            )}>
              {primary}
            </span>
            {secondary && (
              <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-accent-500 sm:text-[11px]">
                {secondary}
              </span>
            )}
          </div>

          {/* Coupon info */}
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            {showStore && (
              <Link
                href={`/coupons/${storeSlug}`}
                className="mb-1 flex w-fit items-center gap-1.5 text-ink-500 hover:text-brand-600"
              >
                {storeLogo && (
                  <StoreLogo
                    src={storeLogo}
                    alt={storeName}
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] rounded object-contain"
                  />
                )}
                <span className="text-xs font-semibold">{storeName}</span>
              </Link>
            )}
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-accent-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-600">
                {isCode ? "Code" : "Deal"}
              </span>
              {coupon.verified && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-success sm:text-xs">
                  <BadgeCheck width={11} height={11} /> Verified
                </span>
              )}
              {coupon.featured && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-accent-600 sm:text-xs">
                  <Flame width={11} height={11} /> Popular
                </span>
              )}
            </div>
            <h3 className="mt-0.5 truncate text-xs font-semibold text-ink-900 sm:mt-1 sm:text-base">
              {coupon.title}
            </h3>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-ink-500 sm:mt-1 sm:gap-x-3 sm:text-xs">
              {isCode && <span className="font-mono tracking-widest">Code: &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</span>}
              <span>Used {formatNumber(coupon.uses)}+ times</span>
              {coupon.expires && (() => {
                const days = daysUntil(coupon.expires);
                if (days < 0) return null;
                if (days <= 3) {
                  return (
                    <span className="font-semibold text-accent-600">
                      {days === 0 ? "Expires today" : days === 1 ? "Expires tomorrow" : `Expires in ${days} days`}
                    </span>
                  );
                }
                return <span>Ends {formatDate(coupon.expires)}</span>;
              })()}
              <button
                type="button"
                onClick={() => setDetails((v) => !v)}
                className="inline-flex items-center gap-0.5 text-ink-500 hover:text-brand-600"
                aria-expanded={details}
              >
                Details
                <ChevronDown
                  width={10}
                  height={10}
                  className={cn("transition-transform", details && "rotate-180")}
                />
              </button>
            </div>
            {details && (
              <p className="mt-2 text-[10px] leading-relaxed text-ink-500 sm:text-xs">
                Tap &ldquo;{label}&rdquo; to {isCode ? "reveal this code and " : ""}
                open {storeName}, then apply your {coupon.discount} discount at
                checkout. Used {formatNumber(coupon.uses)} times &middot; {coupon.successRate}% success rate.
              </p>
            )}
          </div>

          {/* CTA button — always inline; no icon on mobile to save space */}
          <button
            type="button"
            onClick={reveal}
            className="inline-flex shrink-0 items-center rounded-lg bg-accent-500 px-2.5 py-2 text-[11px] font-bold text-white shadow-sm transition hover:bg-accent-600 active:scale-95 sm:gap-1 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            {label}
            <ExternalLink width={14} height={14} className="hidden opacity-90 sm:block" />
          </button>
        </div>
      </div>

      <CouponRevealModal
        open={open}
        onClose={() => setOpen(false)}
        hasCode={isCode}
        storeName={storeName}
        couponTitle={coupon.title}
        code={code}
        loading={loading}
        copied={copied}
        onCopy={copy}
        outboundHref={outboundHref}
      />
    </>
  );
}
