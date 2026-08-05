import { site } from "./site";

export interface TrustBadge {
  title: string;
  body: string;
}

export interface SiteSettings {
  siteName: string;
  /** Optional logo image URL/path. When set, it replaces the icon + name. */
  logoUrl: string;
  /** Hero badge / short tagline. */
  tagline: string;
  /** Meta description + footer blurb. */
  description: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  /** Supports {stores} and {coupons} placeholders. */
  heroSubtext: string;
  searchPlaceholder: string;
  trust: TrustBadge[];
}

export function defaultSettings(): SiteSettings {
  return {
    siteName: site.name,
    logoUrl: "",
    tagline: site.tagline,
    description: site.description,
    heroHeadline: "Verified Coupons & Promo Codes",
    heroHeadlineHighlight: "that actually work",
    heroSubtext:
      "We hand-test {coupons}+ codes across {stores}+ top brands so you save on every order — no dead codes, no guesswork.",
    searchPlaceholder: "Search for a store or brand…",
    trust: [
      {
        title: "Hand-verified",
        body: "Every code is tested by our team and dated so you know it's live.",
      },
      {
        title: "One-tap savings",
        body: "Reveal, copy and apply your discount at checkout in seconds.",
      },
      {
        title: "Updated daily",
        body: "Expired codes are removed and fresh offers added every day.",
      },
    ],
  };
}

/**
 * Merge a key-value map (keys already lowercased) over the defaults.
 * Recognised keys: siteName, logoUrl, tagline, description, heroHeadline,
 * heroHeadlineHighlight, heroSubtext, searchPlaceholder,
 * trust1Title/trust1Body … trust3Title/trust3Body.
 */
export function parseSettings(map: Record<string, string>): SiteSettings {
  const d = defaultSettings();
  const get = (key: string, fallback: string) => {
    const v = map[key.toLowerCase()];
    return v && v.trim() ? v.trim() : fallback;
  };

  const trust: TrustBadge[] = [1, 2, 3]
    .map((n) => ({
      title: (map[`trust${n}title`] || "").trim(),
      body: (map[`trust${n}body`] || "").trim(),
    }))
    .filter((t) => t.title);

  return {
    siteName: get("siteName", d.siteName),
    logoUrl: get("logoUrl", d.logoUrl),
    tagline: get("tagline", d.tagline),
    description: get("description", d.description),
    heroHeadline: get("heroHeadline", d.heroHeadline),
    heroHeadlineHighlight: get("heroHeadlineHighlight", d.heroHeadlineHighlight),
    heroSubtext: get("heroSubtext", d.heroSubtext),
    searchPlaceholder: get("searchPlaceholder", d.searchPlaceholder),
    trust: trust.length ? trust : d.trust,
  };
}

/** Lowercase every key of a plain object (for JSON fallback files). */
export function lowerKeys(obj: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k.toLowerCase()] = v == null ? "" : String(v);
  }
  return out;
}
