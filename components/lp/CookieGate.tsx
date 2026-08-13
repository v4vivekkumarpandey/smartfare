"use client";

import { useCallback, useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Cookie notice shown over a landing page on first visit.
 *
 * Both buttons continue to the offer (same tab) — the choice only decides what
 * we pass to Google Consent Mode v2. The decision is stored under `storageKey`
 * so a returning visitor never sees it again.
 *
 * Note: the site-wide banner (components/ConsentBanner.tsx) deliberately skips
 * /lp/ and /pl/ paths, so this never double-stacks with it.
 */
export function CookieGate({
  offerUrl,
  storageKey,
  message,
}: {
  offerUrl: string;
  storageKey: string;
  message?: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(storageKey)) setVisible(true);
    } catch {
      /* storage blocked — don't show */
    }
  }, [storageKey]);

  // Freeze the page behind the notice while it's up.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  const decide = useCallback(
    (value: "accepted" | "declined") => {
      try {
        localStorage.setItem(storageKey, value);
      } catch {
        /* ignore */
      }

      // Pass the real choice to Consent Mode v2 (same shape as ConsentBanner).
      const granted = value === "accepted" ? "granted" : "denied";
      window.gtag?.("consent", "update", {
        ad_storage: granted,
        ad_user_data: granted,
        ad_personalization: granted,
        analytics_storage: granted,
      });

      // We navigate in this tab, so the page unloads right after the click.
      // Give the conversion ping a moment to leave via event_callback, with a
      // timeout fallback so the visitor always reaches the offer.
      let navigated = false;
      const go = () => {
        if (navigated) return;
        navigated = true;
        window.location.href = offerUrl;
      };

      window.gtag?.("event", "offer_click", { offer: offerUrl });
      if (site.adsId && site.adsConversionLabel) {
        window.gtag?.("event", "conversion", {
          send_to: `${site.adsId}/${site.adsConversionLabel}`,
          event_callback: go,
          event_timeout: 500,
        });
        setTimeout(go, 500);
      } else {
        go();
      }
    },
    [offerUrl, storageKey]
  );

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-gate-title"
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-4 sm:items-center"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex items-center gap-2 text-gray-900">
          <Cookie width={22} height={22} className="text-amber-500" />
          <h2 id="cookie-gate-title" className="text-base font-extrabold sm:text-lg">
            We value your privacy
          </h2>
        </div>

        <div className="mt-3 text-sm leading-relaxed text-gray-600">
          {message ?? (
            <p>
              We use cookies to personalise content, measure ad performance and improve your
              experience on this page. You can accept all cookies or continue with only the
              essential ones. Read our{" "}
              <a href="/privacy" className="font-semibold text-green-700 underline">
                Privacy Policy
              </a>
              .
            </p>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="w-full rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 active:scale-[0.99]"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="w-full rounded-xl bg-green-500 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-green-500/25 transition hover:bg-green-600 active:scale-[0.99]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
