"use client";

import { useState } from "react";
import Script from "next/script";
import { site } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** islaffiliate hosted cash-on-delivery form configuration (per offer). */
export type IslaConfig = {
  /** Endpoint the form POSTs to. Defaults to the islaffiliate HTML form handler. */
  action?: string;
  uid: string;
  offer: string;
  lp: string;
  /** Absolute URL islaffiliate redirects to after a successful order. */
  thankyoupage: string;
  /** The islaffiliate `_key` value for this form. */
  formKey: string;
};

const ISLA_ACTION = "https://offers.islaffiliate.com/forms/html/";
const ISLA_SCRIPT = "https://offers.islaffiliate.com/forms/html/js-v2/";

const inputClass =
  "mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200";
const labelClass = "block text-sm font-bold text-gray-800";
const buttonClass =
  "mx-auto block rounded-md bg-green-600 px-10 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-green-700 active:scale-[0.99] disabled:opacity-70";

function fireConversion(label: string) {
  if (site.adsId && site.adsConversionLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${site.adsId}/${site.adsConversionLabel}`,
    });
  }
  window.gtag?.("event", "offer_click", { offer: label });
}

/**
 * Cash-on-delivery order form.
 *
 * Preferred: pass `isla` to render the real islaffiliate hosted form — it POSTs
 * the lead directly to islaffiliate (with the per-offer hidden fields) and their
 * js-v2 script handles submission + the redirect to `thankyoupage`.
 *
 * Fallback: pass `offerHref` (and optionally `thanksHref`) to use the simple
 * JS-redirect form — no CRM backend, it just fires the conversion and forwards
 * the buyer. Used by the Fast Mower flow until its islaffiliate form is wired.
 */
export function OrderForm({
  isla,
  offerHref,
  thanksHref,
}: {
  isla?: IslaConfig;
  offerHref?: string;
  thanksHref?: string;
}) {
  const [submitting, setSubmitting] = useState(false);

  // ---- Real islaffiliate hosted COD form ----------------------------------
  if (isla) {
    return (
      <>
        <form
          className="tm-order-form space-y-4 text-left"
          action={isla.action ?? ISLA_ACTION}
          method="post"
          onSubmit={() => fireConversion(`isla:${isla.offer}`)}
        >
          <div>
            <label htmlFor="name" className={labelClass}>
              Imię i nazwisko<span className="text-red-600">*</span>
            </label>
            <input id="name" type="text" name="name" autoComplete="name" placeholder="Imię i nazwisko" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="tel" className={labelClass}>
              Telefon<span className="text-red-600">*</span>
            </label>
            <input id="tel" type="tel" name="tel" autoComplete="tel" placeholder="Telefon" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="street-address" className={labelClass}>
              Adres<span className="text-red-600">*</span>
            </label>
            <input id="street-address" type="text" name="street-address" autoComplete="street-address" placeholder="Adres" required className={inputClass} />
          </div>

          <input name="uid" type="hidden" value={isla.uid} />
          <input name="offer" type="hidden" value={isla.offer} />
          <input name="lp" type="hidden" value={isla.lp} />
          <input name="thankyoupage" type="hidden" value={isla.thankyoupage} />
          <input name="_key" type="hidden" value={isla.formKey} />

          <div className="pt-1 text-center">
            <button name="submit" type="submit" className={buttonClass}>
              Kup teraz
            </button>
          </div>
        </form>
        <Script src={isla.action ? `${isla.action}js-v2/` : ISLA_SCRIPT} strategy="afterInteractive" />
      </>
    );
  }

  // ---- Fallback: JS-redirect form -----------------------------------------
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    fireConversion(offerHref ?? "");
    window.location.href = thanksHref ?? offerHref ?? "/";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="of-name" className={labelClass}>
          Imię i nazwisko<span className="text-red-600">*</span>
        </label>
        <input id="of-name" name="name" type="text" required autoComplete="name" placeholder="Imię i nazwisko" className={inputClass} />
      </div>
      <div>
        <label htmlFor="of-phone" className={labelClass}>
          Telefon<span className="text-red-600">*</span>
        </label>
        <input id="of-phone" name="phone" type="tel" required autoComplete="tel" placeholder="Telefon" className={inputClass} />
      </div>
      <div>
        <label htmlFor="of-address" className={labelClass}>
          Adres<span className="text-red-600">*</span>
        </label>
        <input id="of-address" name="address" type="text" required autoComplete="street-address" placeholder="Adres" className={inputClass} />
      </div>
      <button type="submit" disabled={submitting} className={buttonClass}>
        {submitting ? "Przetwarzanie…" : "Kup teraz"}
      </button>
    </form>
  );
}
