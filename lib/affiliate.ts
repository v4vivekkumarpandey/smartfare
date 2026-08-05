import type { Store, Coupon } from "./types";

/**
 * Internal redirect URL that cloaks + tracks the outbound affiliate click.
 * We route through /go/[store]/[id] so we can fire analytics and swap the
 * affiliate destination without touching every page.
 */
export function outboundHref(store: Store, coupon: Coupon): string {
  return `/go/${store.slug}/${coupon.id}`;
}

/** The final destination the redirect handler sends the user to. */
export function affiliateDestination(store: Store, coupon: Coupon): string {
  const dest = coupon.dealUrl || store.url;
  if (store.affiliateBase) {
    return store.affiliateBase + encodeURIComponent(dest);
  }
  return dest;
}
