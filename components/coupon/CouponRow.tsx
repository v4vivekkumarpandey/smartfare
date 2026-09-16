"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Copy, ExternalLink, X, ChevronDown, BadgeCheck, Loader2 } from "lucide-react";
import { cn, formatNumber, formatDate } from "@/lib/cn";
import { useRevealCode } from "./useRevealCode";
import type { PublicCoupon } from "@/lib/types";

/** Split "60% OFF", "20%", "$10 OFF" into a primary+secondary pair for the badge. */
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
}: {
  coupon: PublicCoupon;
  storeName: string;
  storeSlug: string;
  outboundHref: string;
  storeLogo?: string;
  showStore?: boolean;
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
      <div className="overflow-hidden rounded-xl border border-ink-100 bg-white shadow-sm transition hover:shadow-md">
        {/* Info row */}
        <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">

          {/* Discount badge — two-line for percentages/dollar, single line otherwise */}
          <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-accent-500/10 px-1 py-3 text-center lg:w-20">
            <span className={cn(
              "font-black leading-none text-accent-600",
              secondary ? "text-base lg:text-xl" : "text-sm lg:text-base"
            )}>
              {primary}
            </span>
            {secondary && (
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-500 lg:text-xs">
                {secondary}
              </span>
            )}
          </div>

          {/* Coupon info */}
          <div className="flex min-w-0 flex-1 flex-col">
            {showStore && (
              <Link
                href={`/coupons/${storeSlug}`}
                className="mb-1 flex w-fit items-center gap-1.5 text-ink-500 hover:text-brand-600"
              >
                {storeLogo && (
                  <Image
                    src={storeLogo}
                    unoptimized
                    alt={storeName}
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] rounded object-contain"
                  />
                )}
                <span className="text-xs font-semibold">{storeName}</span>
              </Link>
            )}
            <div className="flex items-center gap-2">
              <span className="rounded bg-accent-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-600">
                {isCode ? "Code" : "Deal"}
              </span>
              {coupon.verified && (
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-success">
                  <BadgeCheck width={13} height={13} /> Verified
                </span>
              )}
            </div>
            <h3 className="mt-1 truncate text-sm font-semibold text-ink-900 sm:text-base">
              {coupon.title}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-ink-500">
              {isCode && <span className="font-mono tracking-widest">Code: &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</span>}
              {coupon.expires && <span>Ends {formatDate(coupon.expires)}</span>}
              <button
                type="button"
                onClick={() => setDetails((v) => !v)}
                className="inline-flex items-center gap-0.5 text-ink-500 hover:text-brand-600"
                aria-expanded={details}
              >
                Details
                <ChevronDown
                  width={12}
                  height={12}
                  className={cn("transition-transform", details && "rotate-180")}
                />
              </button>
            </div>
            {details && (
              <p className="mt-2 text-xs leading-relaxed text-ink-500">
                Tap &ldquo;{label}&rdquo; to {isCode ? "reveal this code and " : ""}
                open {storeName}, then apply your {coupon.discount} discount at
                checkout. Used {formatNumber(coupon.uses)} times &middot; {coupon.successRate}% success rate.
              </p>
            )}
          </div>

          {/* Side button — desktop (lg+) only */}
          <button
            type="button"
            onClick={reveal}
            className="hidden shrink-0 items-center gap-1 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600 active:scale-95 lg:inline-flex"
          >
            {label}
            <ExternalLink width={14} height={14} className="opacity-90" />
          </button>
        </div>

        {/* Full-width CTA button — mobile + tablet (below lg) */}
        <button
          type="button"
          onClick={reveal}
          className="flex w-full items-center justify-center gap-2 border-t border-ink-100 bg-accent-500 py-3 text-sm font-bold text-white transition hover:bg-accent-600 active:scale-[0.98] lg:hidden"
        >
          {label}
          <ExternalLink width={15} height={15} className="opacity-90" />
        </button>
      </div>

      {open && isCode && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${storeName} coupon code`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-ink-900/50" onClick={() => setOpen(false)} aria-hidden />
          <div className="animate-fade-in-up relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-lg p-1 text-ink-500 hover:bg-ink-100"
            >
              <X width={20} height={20} />
            </button>
            <p className="text-sm font-medium text-brand-600">{storeName}</p>
            <h2 className="mt-1 text-lg font-bold text-ink-900">{coupon.title}</h2>
            <p className="mt-2 text-sm text-ink-500">
              Copy the code below and paste it at checkout. Your discount applies
              before you pay.
            </p>
            <button
              type="button"
              onClick={copy}
              disabled={!code}
              className="mt-5 flex w-full items-center justify-between gap-3 rounded-xl border-2 border-dashed border-accent-500/40 bg-accent-500/5 px-4 py-3.5 text-left transition hover:border-accent-500 disabled:opacity-70"
            >
              <span className="font-mono text-lg font-bold tracking-wider text-ink-900">
                {loading ? "Revealing…" : code ?? "Unavailable"}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-white",
                  copied ? "bg-success" : "bg-accent-500"
                )}
              >
                {loading ? (
                  <Loader2 width={16} height={16} className="animate-spin" />
                ) : copied ? (
                  <>
                    <Check width={16} height={16} /> Copied
                  </>
                ) : (
                  <>
                    <Copy width={16} height={16} /> Copy
                  </>
                )}
              </span>
            </button>
            <a
              href={outboundHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Didn&apos;t open? Continue to {storeName}
              <ExternalLink width={14} height={14} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
