"use client";

import { useState } from "react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Cash-on-delivery order form used on the blower landing page. There is no CRM
 * backend wired up yet, so on submit it fires the Google Ads conversion and
 * forwards the buyer to the offer's real destination (from lib/offers.ts via the
 * cloaked /go/offer/[slug] redirect). Swap the redirect for a POST to your
 * fulfilment endpoint when you have one.
 *
 * Pass `thanksHref` to send the buyer to an on-site thank-you page after submit
 * instead of straight to the offer (used by the Fast Mower cash-on-delivery flow).
 */
export function OrderForm({ offerHref, thanksHref }: { offerHref: string; thanksHref?: string }) {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    if (site.adsId && site.adsConversionLabel) {
      window.gtag?.("event", "conversion", {
        send_to: `${site.adsId}/${site.adsConversionLabel}`,
      });
    }
    window.gtag?.("event", "offer_click", { offer: offerHref });
    window.location.href = thanksHref ?? offerHref;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="of-name" className="block text-sm font-bold text-gray-800">
          Imię i nazwisko<span className="text-red-600">*</span>
        </label>
        <input
          id="of-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Imię i nazwisko"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </div>
      <div>
        <label htmlFor="of-phone" className="block text-sm font-bold text-gray-800">
          Telefon<span className="text-red-600">*</span>
        </label>
        <input
          id="of-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="Telefon"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </div>
      <div>
        <label htmlFor="of-address" className="block text-sm font-bold text-gray-800">
          Adres<span className="text-red-600">*</span>
        </label>
        <input
          id="of-address"
          name="address"
          type="text"
          required
          autoComplete="street-address"
          placeholder="Adres"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="mx-auto block rounded-md bg-green-600 px-10 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-green-700 active:scale-[0.99] disabled:opacity-70"
      >
        {submitting ? "Przetwarzanie…" : "Kup teraz"}
      </button>
    </form>
  );
}
