// Public site URL — used for canonicals, sitemap, OG tags and JSON-LD.
// Set NEXT_PUBLIC_SITE_URL in your host's env vars (e.g. your Vercel domain or
// custom domain). Vercel also exposes VERCEL_URL for preview deployments.
const resolvedUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "https://thesmartfares.com"
).replace(/\/+$/, "");

export const site = {
  name: "TheSmartFares",
  shortName: "SmartFares",
  url: resolvedUrl,
  domain: resolvedUrl.replace(/^https?:\/\//, ""),
  description:
    "Verified coupon codes, promo codes and deals from top brands. Hand-tested daily so you save on every order.",
  tagline: "Verified codes. Real savings. Every day.",
  // Set NEXT_PUBLIC_GA_ID to enable Google Analytics / Ads conversion tracking
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  social: {
    twitter: "@thesmartfares",
  },
};

export type Site = typeof site;
