import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/lib/content";

/**
 * Publish webhook — busts the cached Google Sheet content so edits go live
 * within seconds instead of waiting for the ISR timer.
 *
 * Call it with your secret, e.g. from a Google Sheets "Publish" button
 * (Apps Script) or any HTTP client:
 *
 *   GET  /api/revalidate?secret=YOUR_SECRET
 *   POST /api/revalidate            (header: x-revalidate-secret: YOUR_SECRET)
 */
function isAuthorized(req: Request): boolean {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false;
  const url = new URL(req.url);
  const provided =
    url.searchParams.get("secret") ||
    req.headers.get("x-revalidate-secret") ||
    "";
  return provided === secret;
}

function handle(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid or missing secret." },
      { status: 401 }
    );
  }
  // Next 16 requires a cache-life profile; "max" purges and lets the next
  // request repopulate the content cache from the sheet.
  revalidateTag(CONTENT_TAG, "max");
  return NextResponse.json({
    revalidated: true,
    tag: CONTENT_TAG,
    now: new Date().toISOString(),
  });
}

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}
