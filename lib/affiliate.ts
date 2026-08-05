import type { Store, Coupon } from "./types";

/**
 * Internal redirect URL that cloaks + tracks the outbound affiliate click.
 * We route through /go/[store]/[id] so we can fire analytics and swap the
 * affiliate destination without touching every page.
 */
export function outboundHref(store: Store, coupon: Coupon): string {
  return `/go/${store.slug}/${coupon.id}`;
}

/**
 * The final destination the redirect handler sends the user to.
 *
 * `affiliateBase` supports three styles:
 *   1. Empty                → link straight to the coupon's dealUrl or store.url
 *   2. Contains "{url}"      → {url} is replaced with the encoded destination
 *                             e.g. https://track.net/?u=1&url={url}
 *   3. Ends with "="         → treated as a tracking prefix; destination appended
 *                             e.g. https://track.net/aff?u=1001&url=
 *   4. Anything else         → treated as a COMPLETE affiliate/ref link, used
 *                             as-is  e.g. https://store.com/?ref=abc123
 */
export function affiliateDestination(store: Store, coupon: Coupon): string {
  const dest = coupon.dealUrl || store.url;
  const base = store.affiliateBase?.trim();

  if (!base) return dest;
  if (base.includes("{url}")) {
    return base.replace("{url}", encodeURIComponent(dest));
  }
  if (base.endsWith("=")) {
    return base + encodeURIComponent(dest);
  }
  // Complete direct/ref link — send the user there as-is.
  return base;
}
