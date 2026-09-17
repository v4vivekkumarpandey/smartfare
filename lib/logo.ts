/** Derive a fetched brand-logo URL from a store's website, for stores with no explicit logo. */
export function autoLogoUrl(storeUrl: string): string | undefined {
  try {
    const domain = new URL(storeUrl).hostname.replace(/^www\./, "");
    return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
  } catch {
    return undefined;
  }
}
