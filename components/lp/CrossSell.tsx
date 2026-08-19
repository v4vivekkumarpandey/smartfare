"use client";

import { useEffect, useRef, useState } from "react";
import { Check, CirclePlay } from "lucide-react";
import { site } from "@/lib/site";
import { LpImage } from "@/components/lp/LpImage";
import { SF_ORDER_KEY } from "@/components/lp/OrderForm";
import { CROSS_SELL, type CrossSellProduct } from "@/lib/crossSell";

const ISLA_ACTION = "https://offers.islaffiliate.com/forms/html/";
const SINK_IFRAME = "sf-crosssell-sink";

type Buyer = { name: string; tel: string; address: string; offer?: string };

function fireConversion(label: string) {
  if (site.adsId && site.adsConversionLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${site.adsId}/${site.adsConversionLabel}`,
    });
  }
  window.gtag?.("event", "offer_click", { offer: label });
}

/** Programmatically POST a COD order to islaffiliate through the hidden iframe. */
function submitOrder(product: CrossSellProduct, buyer: Buyer) {
  const { isla } = product;
  const form = document.createElement("form");
  form.method = "post";
  form.action = isla.action ?? ISLA_ACTION;
  form.target = SINK_IFRAME;
  form.style.display = "none";

  const fields: Record<string, string> = {
    name: buyer.name,
    tel: buyer.tel,
    "street-address": buyer.address,
    uid: isla.uid,
    offer: isla.offer,
    lp: isla.lp,
    thankyoupage: isla.thankyoupage,
    _key: isla.formKey,
  };
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  form.remove();
}

/**
 * One-click cross-sell grid for the thank-you page. Reads the buyer's details
 * that `OrderForm` stashed in sessionStorage and lets them reorder any of the
 * `CROSS_SELL` products without retyping. Renders nothing for visitors who
 * arrive without a stored order (e.g. a directly-typed URL).
 */
export function CrossSell() {
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [ordered, setOrdered] = useState<Record<string, boolean>>({});
  const pending = useRef<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SF_ORDER_KEY);
      if (raw) setBuyer(JSON.parse(raw) as Buyer);
    } catch {
      // ignore malformed / unavailable storage
    }
  }, []);

  if (!buyer || !buyer.name) return null;

  // Don't re-offer the product the buyer just ordered, and skip unconfigured entries.
  const products = CROSS_SELL.filter(
    (p) => p.isla.offer && p.isla.offer !== buyer.offer,
  );
  if (products.length === 0) return null;

  function handleOrder(product: CrossSellProduct) {
    if (!buyer || pending.current[product.slug] || ordered[product.slug]) return;
    pending.current[product.slug] = true;
    fireConversion(`crosssell:${product.isla.offer}`);
    submitOrder(product, buyer);
    setOrdered((prev) => ({ ...prev, [product.slug]: true }));
  }

  return (
    <section className="mx-auto mt-12 max-w-5xl px-4 text-left">
      <h2 className="text-center text-2xl font-extrabold text-gray-900">
        Inni klienci zamówili także
      </h2>
      <p className="mt-2 text-center text-sm text-gray-500">
        Zamów w 1 kliknięciu — użyjemy danych, które właśnie podałeś.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const isDone = !!ordered[p.slug];
          return (
            <div
              key={p.slug}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <LpImage
                src={p.image}
                alt={p.name}
                ratio="aspect-square"
                fit="object-contain"
                className="rounded-xl bg-white"
              />
              <p className="mt-3 flex-1 text-sm font-bold text-gray-900">{p.name}</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-2xl font-extrabold text-green-600">{p.price}</span>
                {p.oldPrice && (
                  <span className="pb-0.5 text-sm font-semibold text-gray-400 line-through">
                    {p.oldPrice}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleOrder(p)}
                disabled={isDone}
                className={`mt-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition active:scale-[0.99] ${
                  isDone
                    ? "cursor-default bg-green-600"
                    : "bg-gradient-to-b from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
                }`}
              >
                {isDone ? (
                  <>
                    <Check width={18} height={18} strokeWidth={3} /> Zamówione
                  </>
                ) : (
                  <>
                    <CirclePlay width={18} height={18} /> Zamów w 1 kliknięciu
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Fire-and-forget sink for the cross-origin islaffiliate POSTs. */}
      <iframe name={SINK_IFRAME} title="order-sink" className="hidden" />
    </section>
  );
}
