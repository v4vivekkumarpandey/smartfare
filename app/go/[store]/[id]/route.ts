import { NextResponse } from "next/server";
import { getStore } from "@/lib/content";
import { affiliateDestination } from "@/lib/affiliate";

/**
 * Tracked outbound affiliate redirect.
 * Kept as a lightweight dynamic route so we can fire server-side logging or
 * swap affiliate destinations without rebuilding pages.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ store: string; id: string }> }
) {
  const { store: slug, id } = await params;
  const store = await getStore(slug);
  if (!store) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const coupon =
    store.coupons.find((c) => c.id === id) ?? store.coupons[0] ?? null;

  const dest = coupon
    ? affiliateDestination(store, coupon)
    : store.affiliateBase
      ? store.affiliateBase + encodeURIComponent(store.url)
      : store.url;

  return NextResponse.redirect(dest, {
    status: 302,
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
      "Referrer-Policy": "no-referrer",
    },
  });
}
