import { site } from "@/lib/site";

/**
 * ads.txt for Google AdSense. Returns the authorized-sellers line once the
 * publisher id (NEXT_PUBLIC_ADSENSE_CLIENT, e.g. ca-pub-123…) is configured.
 */
export function GET() {
  const client = site.adsenseClient; // ca-pub-XXXXXXXXXXXXXXXX
  if (!client) {
    return new Response("# ads.txt — set NEXT_PUBLIC_ADSENSE_CLIENT to enable\n", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
  const pub = client.replace(/^ca-/, ""); // pub-XXXXXXXXXXXXXXXX
  const body = `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
