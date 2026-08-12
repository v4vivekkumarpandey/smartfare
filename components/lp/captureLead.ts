"use client";

/**
 * Duplicate lead capture: on every LP order submit, the same name/phone/address
 * is also posted to a Google Form, which drops a row into its linked Google
 * Sheet. The order itself still goes to islaffiliate — this is just our own
 * independent record, useful for checking the network's reported conversions
 * against our own count.
 *
 * No backend, no Apps Script: a Google Form accepts a plain cross-origin POST
 * to its `formResponse` URL. We send it with `sendBeacon`, which is the modern
 * equivalent of the old hidden-form-in-a-hidden-iframe trick — same request,
 * except the browser guarantees it's delivered even though the page navigates
 * away to islaffiliate a moment later.
 *
 * Wired to the "Offer From Leads" form (questions: Name, Telephone No, Address,
 * Product). To point this at a different form: open the form's ⋮ → "Get
 * pre-filled link", fill dummy answers, and read the `entry.…` ids out of the
 * resulting URL; ACTION is that same URL with `/viewform…` replaced by
 * `/formResponse`. Leave ACTION empty to switch lead capture off.
 */

/** The Google Form's `formResponse` endpoint. Empty = lead capture off. */
const ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSeapDX_9AvLYXnuH3uYk8AWowB4rEmBCsCpx0QJvbOHny8qdw/formResponse";

/** Google Form field ids. Empty ones are skipped. */
const FIELDS = {
  name: "entry.1289590058",
  phone: "entry.990646571",
  address: "entry.831433790",
  product: "entry.146538455",
  /** Only some offers ask for an e-mail; the column stays blank for the rest. */
  email: "entry.1851623794",
};

/** Reads a form field by any of the names used across our LPs. */
function field(data: FormData, ...names: string[]): string {
  for (const n of names) {
    const v = data.get(n);
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

/**
 * @param product Which offer the lead is for — falls back to the LP's path, so
 *   an LP that forgets to pass one is still identifiable in the sheet.
 */
export function captureLead(form: HTMLFormElement, product?: string): void {
  if (!ACTION) return;

  try {
    const data = new FormData(form);
    const values: Record<keyof typeof FIELDS, string> = {
      name: field(data, "name"),
      phone: field(data, "tel", "phone"),
      address: field(data, "street-address", "address"),
      product: product || window.location.pathname,
      email: field(data, "email"),
    };

    const params = new URLSearchParams();
    for (const [key, entry] of Object.entries(FIELDS)) {
      const value = values[key as keyof typeof FIELDS];
      if (entry && value) params.set(entry, value);
    }
    if (![...params].length) return;

    // Google Forms only accepts form-encoded bodies; that content type is also
    // CORS-safelisted, so the beacon goes out without a preflight.
    const blob = new Blob([params.toString()], {
      type: "application/x-www-form-urlencoded",
    });
    if (!navigator.sendBeacon?.(ACTION, blob)) {
      // Older browsers: same POST, fired so it survives the page unload. The
      // response is opaque (no-cors) — Google still records the submission.
      void fetch(ACTION, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        body: params,
      }).catch(() => {});
    }
  } catch {
    /* recording a lead must never break the actual order */
  }
}
