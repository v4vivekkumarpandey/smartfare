import { site } from "./site";
import type { Store } from "./types";
import { activeCoupons } from "./content";

/** JSON-LD for a brand coupon page: Store + Offers + AggregateRating + FAQ. */
export function storeJsonLd(store: Store) {
  const offers = activeCoupons(store).map((c) => ({
    "@type": "Offer",
    name: c.title,
    // Note: we intentionally do NOT expose the coupon code here — it's revealed
    // to the user on click (affiliate flow), not in page source.
    description: `${c.discount} — ${c.type === "code" ? "promo code" : "deal"}`,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validThrough: c.expires,
    url: `${site.url}/coupons/${store.slug}`,
  }));

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Store",
      "@id": `${site.url}/coupons/${store.slug}#store`,
      name: store.name,
      url: `${site.url}/coupons/${store.slug}`,
      image: `${site.url}${store.logo}`,
      description: store.description,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: store.rating,
        reviewCount: store.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
      makesOffer: offers,
    },
  ];

  if (store.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: store.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: `${site.url}${it.href}`,
    })),
  };
}
