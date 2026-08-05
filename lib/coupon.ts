import type { Coupon, PublicCoupon } from "./types";

/**
 * Strip the secret `code` before a coupon is handed to a client component.
 * The code is fetched from /api/reveal on click, so it never ships in the
 * page's HTML / hydration payload.
 */
export function toPublicCoupon(c: Coupon): PublicCoupon {
  const { code: _code, ...rest } = c;
  return { ...rest, hasCode: c.type === "code" && !!c.code };
}
