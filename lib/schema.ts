import { site } from "./site";
import type { Store, Category } from "./types";
import { activeCoupons } from "./content";

/** Site-wide JSON-LD for the homepage: Organization + WebSite (with sitelinks search box). */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}#organization`,
        name: site.name,
        url: site.url,
        sameAs: Object.values(site.social).filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}#website`,
        name: site.name,
        url: site.url,
        publisher: { "@id": `${site.url}#organization` },
      },
    ],
  };
}

/** JSON-LD for a category listing page: BreadcrumbList + CollectionPage/ItemList of its stores. */
export function categoryJsonLd(category: Category, stores: Store[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/category/${category.slug}#page`,
        name: `${category.name} Coupons & Promo Codes`,
        url: `${site.url}/category/${category.slug}`,
        description: category.description,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: stores.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}/coupons/${s.slug}`,
            name: s.name,
          })),
        },
      },
    ],
  };
}

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
