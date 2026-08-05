export const site = {
  name: "TheSmartFares",
  shortName: "SmartFares",
  domain: "thesmartfares.com",
  url: "https://thesmartfares.com",
  description:
    "Verified coupon codes, promo codes and deals from top brands. Hand-tested daily so you save on every order.",
  tagline: "Verified codes. Real savings. Every day.",
  // Set NEXT_PUBLIC_GA_ID in .env.local to enable Google Analytics / Ads conversion tracking
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  social: {
    twitter: "@thesmartfares",
  },
};

export type Site = typeof site;
