"use client";

import { site } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * CTA link that fires the Google Ads conversion the moment it's clicked, then
 * proceeds to the offer. Opens in a new tab so the conversion event has time to
 * send (the landing page isn't unloaded).
 */
export function OfferLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  function handleClick() {
    if (site.adsId && site.adsConversionLabel) {
      window.gtag?.("event", "conversion", {
        send_to: `${site.adsId}/${site.adsConversionLabel}`,
      });
    }
    // Generic event too (usable as a GA4 key event / for reporting)
    window.gtag?.("event", "offer_click", { offer: href });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
