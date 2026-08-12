// Public site URL — used for canonicals, sitemap, OG tags and JSON-LD.
// Set NEXT_PUBLIC_SITE_URL in your host's env vars (e.g. your Vercel domain or
// custom domain). Vercel also exposes VERCEL_URL for preview deployments.
const resolvedUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "https://thesmartfares.online"
).replace(/\/+$/, "");

export const site = {
  name: "TheSmartFares",
  shortName: "SmartFares",
  url: resolvedUrl,
  domain: resolvedUrl.replace(/^https?:\/\//, ""),
  description:
    "Verified coupon codes, promo codes and deals from top brands. Hand-tested daily so you save on every order.",
  tagline: "Verified codes. Real savings. Every day.",
  // Analytics / ads tracking (all optional — blank = disabled)
  // GA4 measurement ID, e.g. G-XXXXXXXXXX
  gaId: process.env.NEXT_PUBLIC_GA_ID || "G-J4BLR61KWY",
  // Google Ads tag ID, e.g. AW-XXXXXXXXX
  adsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18371934800",
  // Google Ads conversion label for the "Get Code" action, e.g. AbC-D_efg
  adsConversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "",
  // Google AdSense publisher id, e.g. ca-pub-1234567890123456 (blog pages only)
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  // AdSense ad-unit slot id used on blog pages, e.g. 1234567890
  adsenseSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT || "",
  social: {
    twitter: "@thesmartfares",
  },
};

export type Site = typeof site;
