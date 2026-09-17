/**
 * Landing-page offer destinations. The redirect route /go/offer/[slug] sends
 * users here, so the raw affiliate URL never appears in the page HTML and you
 * can change it in one place.
 */
export const OFFERS: Record<string, string> = {
  "ryoko-pro": "https://www.djpcraze.com/B9JC5ZS/H7KX3ZL/?uid=44622",
  guardhouse: "https://www.techmonkeypost.com/7ZFGB6Q/HH3LH49/",
  // TODO: replace with the real affiliate / cash-on-delivery order-form URL for the blower offer.
  "blower-pl": "https://hoteurodeals.com/blower-pl2/",
  // TODO: replace with the real affiliate / cash-on-delivery order-form URL for the Fast Mower offer.
  fastmower_pl: "https://hoteurodeals.com/fastmower-pl/",
  yusleep: "https://getyusleep.com?&shield=40a0efpjq4r-qrfq9dp1lm6ley&traffic_source=google&traffic_type=paid",
  myoglow: "https://sale.mydermadream.com/cc170-myoglow-of2?affId=&c1=&c2=5&_ef_transaction_id=&oid=66&affid2=5&_ef_transaction_id=&lpid=2903&uid=2903&guoid=1138&guaffid=11538",

  // AI tool review CTAs — plain official links for now. Replace each with the
  // real affiliate/referral URL once approved for that program.
  chatgpt: "https://chatgpt.com",
  "google-gemini": "https://gemini.google.com",
  claude: "https://claude.ai",
  perplexity: "https://www.perplexity.ai",
  cursor: "https://cursor.com",
  "github-copilot": "https://github.com/features/copilot",
  midjourney: "https://www.midjourney.com",
  runway: "https://runwayml.com",
  elevenlabs: "https://elevenlabs.io",
  "notion-ai": "https://www.notion.com/product/ai",
  gamma: "https://gamma.app",
  zapier: "https://zapier.com",
};

export function getOfferUrl(slug: string): string | undefined {
  return OFFERS[slug.toLowerCase()];
}
