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
