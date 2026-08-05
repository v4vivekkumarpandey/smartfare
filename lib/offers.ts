/**
 * Landing-page offer destinations. The redirect route /go/offer/[slug] sends
 * users here, so the raw affiliate URL never appears in the page HTML and you
 * can change it in one place.
 */
export const OFFERS: Record<string, string> = {
  guardhouse: "https://www.techmonkeypost.com/7ZFGB6Q/HH3LH49/",
};

export function getOfferUrl(slug: string): string | undefined {
  return OFFERS[slug.toLowerCase()];
}
