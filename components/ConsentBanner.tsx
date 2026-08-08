"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const KEY = "sf_consent";

// Paid landing pages run their own funnel (own footer + privacy link); the
// consent banner is suppressed there so it doesn't overlap the sticky CTA.
function isLandingPage(pathname: string | null) {
  return !!pathname && (pathname.startsWith("/lp/") || pathname.startsWith("/pl/"));
}

export function ConsentBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLandingPage(pathname)) return;
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* storage blocked — don't show */
    }
  }, [pathname]);

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    // Update Google Consent Mode v2
    const granted = value === "accepted" ? "granted" : "denied";
    window.gtag?.("consent", "update", {
      ad_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
      analytics_storage: granted,
    });
    setVisible(false);
  }

  if (!visible || isLandingPage(pathname)) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-2xl sm:flex-row sm:items-center">
        <p className="flex-1 text-sm text-ink-700">
          We use cookies for analytics and to measure ad performance. See our{" "}
          <Link href="/privacy" className="font-semibold text-brand-600 underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="rounded-full px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-100"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
