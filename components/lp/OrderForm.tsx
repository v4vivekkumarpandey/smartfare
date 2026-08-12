"use client";

import { useState } from "react";
import Script from "next/script";
import { site } from "@/lib/site";
import { captureLead } from "./captureLead";

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

/** Field labels/placeholders, so one form serves LPs in different languages. */
export type OrderFormLabels = {
  name: string;
  phone: string;
  address: string;
  submit: string;
  /** Button text while the fallback form redirects. */
  submitting: string;
};

const PL_LABELS: OrderFormLabels = {
  name: "Imię i nazwisko",
  phone: "Telefon",
  address: "Adres",
  submit: "Kup teraz",
  submitting: "Przetwarzanie…",
};

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
  product,
  labels = PL_LABELS,
}: {
  isla?: IslaConfig;
  offerHref?: string;
  thanksHref?: string;
  /** Product name recorded with the lead in our Google Form backup. */
  product?: string;
  /** Override for non-Polish landing pages (defaults to Polish). */
  labels?: OrderFormLabels;
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
          onSubmit={(e) => {
            captureLead(e.currentTarget, product);
            fireConversion(`isla:${isla.offer}`);
          }}
        >
          <div>
            <label htmlFor="name" className={labelClass}>
              {labels.name}<span className="text-red-600">*</span>
            </label>
            <input id="name" type="text" name="name" autoComplete="name" placeholder={labels.name} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="tel" className={labelClass}>
              {labels.phone}<span className="text-red-600">*</span>
            </label>
            <input id="tel" type="tel" name="tel" autoComplete="tel" placeholder={labels.phone} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="street-address" className={labelClass}>
              {labels.address}<span className="text-red-600">*</span>
            </label>
            <input id="street-address" type="text" name="street-address" autoComplete="street-address" placeholder={labels.address} required className={inputClass} />
          </div>

          <input name="uid" type="hidden" value={isla.uid} />
          <input name="offer" type="hidden" value={isla.offer} />
          <input name="lp" type="hidden" value={isla.lp} />
          <input name="thankyoupage" type="hidden" value={isla.thankyoupage} />
          <input name="_key" type="hidden" value={isla.formKey} />

          <div className="pt-1 text-center">
            <button name="submit" type="submit" className={buttonClass}>
              {labels.submit}
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
    captureLead(e.currentTarget, product);
    setSubmitting(true);
    fireConversion(offerHref ?? "");
    window.location.href = thanksHref ?? offerHref ?? "/";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="of-name" className={labelClass}>
          {labels.name}<span className="text-red-600">*</span>
        </label>
        <input id="of-name" name="name" type="text" required autoComplete="name" placeholder={labels.name} className={inputClass} />
      </div>
      <div>
        <label htmlFor="of-phone" className={labelClass}>
          {labels.phone}<span className="text-red-600">*</span>
        </label>
        <input id="of-phone" name="phone" type="tel" required autoComplete="tel" placeholder={labels.phone} className={inputClass} />
      </div>
      <div>
        <label htmlFor="of-address" className={labelClass}>
          {labels.address}<span className="text-red-600">*</span>
        </label>
        <input id="of-address" name="address" type="text" required autoComplete="street-address" placeholder={labels.address} className={inputClass} />
      </div>
      <button type="submit" disabled={submitting} className={buttonClass}>
        {submitting ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
