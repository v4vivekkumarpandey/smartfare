import { NextResponse } from "next/server";
import { getOfferUrl } from "@/lib/offers";

/**
 * Cloaked/tracked outbound redirect for landing-page offers.
 *   /go/offer/guardhouse  ->  the offer's real URL (from lib/offers.ts)
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const url = getOfferUrl(slug);
  if (!url) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.redirect(url, {
    status: 302,
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
      "Referrer-Policy": "no-referrer",
    },
  });
}
