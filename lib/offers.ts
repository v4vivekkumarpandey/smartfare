/**
 * Landing-page offer destinations. The redirect route /go/offer/[slug] sends
 * users here, so the raw affiliate URL never appears in the page HTML and you
 * can change it in one place.
 */
export const OFFERS: Record<string, string> = {
  guardhouse: "https://www.techmonkeypost.com/7ZFGB6Q/HH3LH49/",
  yusleep: "https://getyusleep.com?&shield=40a0efpjq4r-qrfq9dp1lm6ley&traffic_source=google&traffic_type=paid",
  myoglow: "https://sale.mydermadream.com/cc170-myoglow-of2?affId=&c1=&c2=5&_ef_transaction_id=&oid=66&affid2=5&_ef_transaction_id=&lpid=2903&uid=2903&guoid=1138&guaffid=11538",
};

export function getOfferUrl(slug: string): string | undefined {
  return OFFERS[slug.toLowerCase()];
}
