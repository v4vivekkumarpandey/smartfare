"use client";

import { Check, Copy, ExternalLink, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

/** Code-reveal dialog shared by CouponRow and StickyGetCodeBar. */
export function CouponRevealModal({
  open,
  onClose,
  hasCode,
  storeName,
  couponTitle,
  code,
  loading,
  copied,
  onCopy,
  outboundHref,
}: {
  open: boolean;
  onClose: () => void;
  hasCode: boolean;
  storeName: string;
  couponTitle: string;
  code: string | null;
  loading: boolean;
  copied: boolean;
  onCopy: () => void;
  outboundHref: string;
}) {
  if (!open || !hasCode) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${storeName} coupon code`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-ink-900/50" onClick={onClose} aria-hidden />
      <div className="animate-fade-in-up relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-lg p-1 text-ink-500 hover:bg-ink-100"
        >
          <X width={20} height={20} />
        </button>
        <p className="text-sm font-medium text-brand-600">{storeName}</p>
        <h2 className="mt-1 text-lg font-bold text-ink-900">{couponTitle}</h2>
        <p className="mt-2 text-sm text-ink-500">
          Copy the code below and paste it at checkout. Your discount applies
          before you pay.
        </p>
        <button
          type="button"
          onClick={onCopy}
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
  );
}
