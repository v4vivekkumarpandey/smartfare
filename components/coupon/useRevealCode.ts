"use client";

import { useState, useCallback } from "react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Handles the "Get Code" flow without exposing the code in page source:
 *  1. Opens the affiliate link (synchronously, so popup blockers don't fire).
 *  2. Fetches the real code from /api/reveal.
 *  3. Copies it to the clipboard.
 */
export function useRevealCode(opts: {
  storeSlug: string;
  storeName: string;
  couponId: string;
  couponType: string;
  hasCode: boolean;
  outboundHref: string;
}) {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const reveal = useCallback(async () => {
    window.gtag?.("event", "reveal_coupon", {
      store: opts.storeName,
      coupon_id: opts.couponId,
      coupon_type: opts.couponType,
    });
    // Google Ads conversion (only if a conversion label is configured)
    if (site.adsId && site.adsConversionLabel) {
      window.gtag?.("event", "conversion", {
        send_to: `${site.adsId}/${site.adsConversionLabel}`,
      });
    }
    // Open affiliate destination first (sync => not blocked)
    window.open(opts.outboundHref, "_blank", "noopener,noreferrer");

    if (!opts.hasCode) return;
    setOpen(true);

    if (!code) {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/reveal?store=${encodeURIComponent(opts.storeSlug)}&id=${encodeURIComponent(opts.couponId)}`
        );
        const data = (await res.json()) as { code: string | null };
        if (data.code) {
          setCode(data.code);
          try {
            await navigator.clipboard.writeText(data.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard blocked — user can still read it */
          }
        }
      } catch {
        /* network error — modal shows a fallback link */
      } finally {
        setLoading(false);
      }
    }
  }, [code, opts]);

  const copy = useCallback(async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [code]);

  return { code, loading, copied, open, setOpen, reveal, copy };
}
