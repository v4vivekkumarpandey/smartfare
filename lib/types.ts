export type CouponType = "code" | "deal";

export interface Coupon {
  id: string;
  title: string;
  type: CouponType;
  /** Present when type === "code" */
  code?: string;
  /** Short discount label, e.g. "20% OFF", "$10 OFF", "FREE TRIAL" */
  discount: string;
  verified: boolean;
  /** ISO date string, e.g. "2026-12-31". Omit for no expiry. */
  expires?: string;
  uses: number;
  /** 0–100 */
  successRate: number;
  /** Optional per-coupon destination; falls back to store.url */
  dealUrl?: string;
  featured?: boolean;
}

/** A coupon safe to send to the client — the code is stripped and fetched on click. */
export type PublicCoupon = Omit<Coupon, "code"> & { hasCode: boolean };

export interface Faq {
  q: string;
  a: string;
}

export interface StoreContact {
  phone?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
}

export interface Store {
  slug: string;
  name: string;
  logo: string;
  url: string;
  /** Affiliate tracking prefix; final link = affiliateBase + encodeURIComponent(dest) */
  affiliateBase?: string;
  category: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  description: string;
  /** Longer HTML-free paragraphs for the "About" / "How to use" content block */
  about?: string[];
  /** Optional shipping / returns / shopper-policy paragraphs */
  policies?: string[];
  contact?: StoreContact;
  coupons: Coupon[];
  faqs: Faq[];
  relatedStores: string[];
  updated: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

/**
 * "post" is a regular blog article. "sale-calendar" and "gift-guide" are the
 * same content shape with a couple of extra optional fields used only by
 * that type (see below) — all three live together at /blog/[slug].
 */
export type PostType = "post" | "sale-calendar" | "gift-guide";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Cover image path/URL (optional) */
  cover: string;
  author: string;
  /** ISO date, e.g. "2026-08-01" */
  date: string;
  /** Category slug or label (optional) */
  category: string;
  tags: string[];
  /** Body text; supports a small markdown subset (## / ### / - / paragraphs) */
  body: string;
  published: boolean;
  /** Defaults to "post" when absent. */
  postType?: PostType;
  /** sale-calendar only — ISO date the sale starts, e.g. "2026-11-27" */
  startDate?: string;
  /** sale-calendar only — ISO date the sale ends */
  endDate?: string;
  /** gift-guide only — freeform occasion label, e.g. "christmas" */
  occasion?: string;
  /** sale-calendar / gift-guide only — store slugs to cross-link as StoreCards */
  storeSlugs?: string[];
}

export type MenuLocation = "header" | "footer" | "both";

export interface MenuItem {
  label: string;
  href: string;
  location: MenuLocation;
  order: number;
  /** true when href is an absolute http(s) URL */
  external: boolean;
}
