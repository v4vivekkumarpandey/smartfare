import { NextResponse } from "next/server";
import { getStore } from "@/lib/content";

/**
 * Returns a coupon's code on demand so it's never embedded in the page source.
 * The client calls this on "Get Code" click, after opening the affiliate link.
 *
 *   GET /api/reveal?store=<slug>&id=<couponId>  ->  { code }
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("store") || "";
  const id = searchParams.get("id") || "";

  const store = await getStore(slug);
  const coupon = store?.coupons.find((c) => c.id === id);

  if (!coupon || !coupon.code) {
    return NextResponse.json({ code: null }, { status: 404 });
  }
  return NextResponse.json(
    { code: coupon.code },
    { headers: { "Cache-Control": "no-store" } }
  );
}
