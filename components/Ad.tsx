"use client";

import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A single AdSense display unit. Renders nothing unless both the publisher id
 * (NEXT_PUBLIC_ADSENSE_CLIENT) and a slot id are configured — so it's inert
 * until you set them, and it only loads the AdSense script on pages where it's
 * actually used (we only place it on blog/content pages, never coupon pages).
 */
export function Ad({
  slot = site.adsenseSlot,
  className = "",
}: {
  slot?: string;
  className?: string;
}) {
  const enabled = Boolean(site.adsenseClient && slot);

  useEffect(() => {
    if (!enabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`my-8 ${className}`}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-wide text-ink-300">
        Advertisement
      </p>
      <Script
        id="adsbygoogle-js"
        strategy="afterInteractive"
        async
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}`}
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={site.adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
