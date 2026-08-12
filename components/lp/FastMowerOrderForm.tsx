"use client";

import Script from "next/script";
import { captureLead } from "./captureLead";

/**
 * Cash-on-delivery order form for the Fast Mower landing page. It POSTs directly
 * to the islaffiliate lead-form endpoint with the campaign's hidden fields; that
 * backend records the lead and forwards the buyer to `thankyoupage`
 * (/lp/thanks), where the Google Ads conversion snippet fires. The async
 * js-v2 script enhances/validates the submit client-side. On submit we also
 * post a duplicate of the lead to our own Google Form (see `captureLead`).
 *
 * Field names/ids (name, tel, street-address) and the hidden uid/offer/lp/_key
 * values must stay exactly as provided by the affiliate — the endpoint keys off
 * them, so don't rename them.
 */
export function FastMowerOrderForm() {
  return (
    <form
      className="tm-order-form space-y-4 text-left"
      action="https://offers.islaffiliate.com/forms/html/"
      method="post"
      onSubmit={(e) => captureLead(e.currentTarget, "Fast Mower")}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-gray-800">
          Imię i nazwisko<span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Imię i nazwisko"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
        />
      </div>
      <div>
        <label htmlFor="tel" className="block text-sm font-bold text-gray-800">
          Telefon<span className="text-red-600">*</span>
        </label>
        <input
          id="tel"
          name="tel"
          type="tel"
          required
          autoComplete="tel"
          placeholder="Telefon"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
        />
      </div>
      <div>
        <label htmlFor="street-address" className="block text-sm font-bold text-gray-800">
          Adres<span className="text-red-600">*</span>
        </label>
        <input
          id="street-address"
          name="street-address"
          type="text"
          required
          autoComplete="street-address"
          placeholder="Adres"
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
        />
      </div>

      {/* Ukryte pola kampanii — nie zmieniać nazw ani wartości. */}
      <input name="uid" type="hidden" value="019fb28c-270f-7f36-9386-36d8b9ba93ee" />
      <input name="offer" type="hidden" value="2122" />
      <input name="lp" type="hidden" value="4032" />
      <input name="thankyoupage" type="hidden" value="https://www.thesmartfares.online/lp/thanks" />
      <input name="_key" type="hidden" value="90733eed61d0097e9ff3f5c37336249b35580402" />

      <button
        type="submit"
        name="submit"
        className="mx-auto block rounded-full bg-lime-400 px-10 py-3 text-sm font-extrabold uppercase tracking-wide text-gray-900 transition hover:bg-lime-300 active:scale-[0.99]"
      >
        Kup teraz
      </button>

      <Script src="https://offers.islaffiliate.com/forms/html/js-v2/" strategy="afterInteractive" />
    </form>
  );
}
