import { JWT } from "google-auth-library";
import type {
  Store,
  Category,
  Coupon,
  Faq,
  CouponType,
  MenuItem,
  MenuLocation,
  BlogPost,
} from "./types";
import { parseSettings, type SiteSettings } from "./settings";

/**
 * Reads content from a private Google Sheet via a service account.
 *
 * Expected tabs (case-insensitive header row in row 1):
 *   categories : slug | name | icon | description
 *   stores     : slug | name | logo | url | affiliateBase | category | tagline |
 *                rating | reviewCount | description | about | relatedStores | updated
 *   coupons    : storeSlug | id | title | type | code | discount | verified |
 *                expires | uses | successRate | dealUrl | featured
 *   faqs       : storeSlug | question | answer
 *   menu       : label | href | location | order
 *   settings   : key | value   (site name/logo, hero copy, trust badges)
 *   blog       : slug | title | excerpt | cover | author | date | category |
 *                tags | body | published
 */

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
const PRIVATE_KEY = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(
  /\\n/g,
  "\n"
);

const TABS = [
  "categories",
  "stores",
  "coupons",
  "faqs",
  "menu",
  "settings",
  "blog",
] as const;

export function sheetsConfigured(): boolean {
  return Boolean(SHEET_ID && CLIENT_EMAIL && PRIVATE_KEY);
}

/** Row-array + header row -> array of lowercased-key objects. */
function rowsToObjects(rows: string[][]): Record<string, string>[] {
  if (!rows || rows.length < 2) return [];
  const headers = rows[0].map((h) => (h || "").trim().toLowerCase());
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      if (h) obj[h] = (row[i] ?? "").toString().trim();
    });
    return obj;
  });
}

function toBool(v: string | undefined): boolean {
  if (!v) return false;
  return ["true", "yes", "1", "y", "verified", "x"].includes(v.toLowerCase());
}

function toNum(v: string | undefined, fallback = 0): number {
  if (!v) return fallback;
  const n = parseFloat(v.replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : fallback;
}

function splitList(v: string | undefined): string[] {
  if (!v) return [];
  return v
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitParagraphs(v: string | undefined): string[] {
  if (!v) return [];
  return v
    .split(/\n{1,}/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function fetchAllTabs(): Promise<Record<string, string[][]>> {
  const client = new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const out: Record<string, string[][]> = {};
  for (const t of TABS) out[t] = [];

  // First find which of our expected tabs actually exist, so an optional tab
  // (e.g. menu / faqs) that hasn't been created yet won't fail the whole load.
  const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets.properties.title`;
  const meta = await client.request<{
    sheets: { properties: { title: string } }[];
  }>({ url: metaUrl });
  const titles = new Set(
    (meta.data.sheets || []).map((s) => s.properties.title.toLowerCase())
  );
  const present = TABS.filter((t) => titles.has(t));
  if (present.length === 0) return out;

  const ranges = present.map((t) => `ranges=${encodeURIComponent(t)}`).join("&");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet?${ranges}&majorDimension=ROWS`;
  const res = await client.request<{
    valueRanges: { range: string; values?: string[][] }[];
  }>({ url });

  const valueRanges = res.data.valueRanges || [];
  valueRanges.forEach((vr, i) => {
    // batchGet returns ranges in the requested order
    out[present[i]] = vr.values || [];
  });
  return out;
}

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export async function loadFromSheets(): Promise<{
  stores: Store[];
  categories: Category[];
  menu: MenuItem[];
  settings: SiteSettings;
  posts: BlogPost[];
}> {
  const tabs = await fetchAllTabs();

  // settings tab is a key | value list
  const settingsMap: Record<string, string> = {};
  for (const r of rowsToObjects(tabs.settings)) {
    const key = (r.key || "").toLowerCase();
    if (key) settingsMap[key] = r.value ?? "";
  }
  const settings = parseSettings(settingsMap);

  const categories: Category[] = rowsToObjects(tabs.categories).map((r) => ({
    slug: r.slug,
    name: r.name,
    icon: r.icon || "Tag",
    description: r.description || "",
  }));

  const menu: MenuItem[] = rowsToObjects(tabs.menu)
    .filter((r) => r.label && r.href)
    .map((r, i) => {
      const loc = (r.location || "header").toLowerCase();
      const location: MenuLocation =
        loc === "footer" || loc === "both" ? (loc as MenuLocation) : "header";
      return {
        label: r.label,
        href: r.href,
        location,
        order: r.order ? toNum(r.order, i) : i,
        external: isExternal(r.href),
      };
    })
    .sort((a, b) => a.order - b.order);

  // Group coupons by store
  const couponsByStore = new Map<string, Coupon[]>();
  for (const r of rowsToObjects(tabs.coupons)) {
    const storeSlug = (r.storeslug || r.store || "").toLowerCase();
    if (!storeSlug) continue;
    const hasCode = Boolean(r.code);
    const type: CouponType =
      (r.type?.toLowerCase() as CouponType) === "deal"
        ? "deal"
        : hasCode
          ? "code"
          : "deal";
    const coupon: Coupon = {
      id: r.id || `${storeSlug}-${(couponsByStore.get(storeSlug)?.length ?? 0) + 1}`,
      title: r.title,
      type,
      code: type === "code" ? r.code : undefined,
      discount: r.discount || "DEAL",
      verified: toBool(r.verified),
      expires: r.expires || undefined,
      uses: toNum(r.uses),
      successRate: toNum(r.successrate, 100),
      dealUrl: r.dealurl || undefined,
      featured: toBool(r.featured),
    };
    const list = couponsByStore.get(storeSlug) ?? [];
    list.push(coupon);
    couponsByStore.set(storeSlug, list);
  }

  // Group faqs by store
  const faqsByStore = new Map<string, Faq[]>();
  for (const r of rowsToObjects(tabs.faqs)) {
    const storeSlug = (r.storeslug || r.store || "").toLowerCase();
    const q = r.question || r.q;
    const a = r.answer || r.a;
    if (!storeSlug || !q || !a) continue;
    const list = faqsByStore.get(storeSlug) ?? [];
    list.push({ q, a });
    faqsByStore.set(storeSlug, list);
  }

  const today = new Date().toISOString().slice(0, 10);
  const stores: Store[] = rowsToObjects(tabs.stores)
    .filter((r) => r.slug)
    .map((r) => {
      const slug = r.slug.toLowerCase();
      return {
        slug,
        name: r.name,
        logo: r.logo || "/logos/placeholder.svg",
        url: r.url,
        affiliateBase: r.affiliatebase || undefined,
        category: (r.category || "").toLowerCase(),
        tagline: r.tagline || "",
        rating: toNum(r.rating, 4.5),
        reviewCount: Math.round(toNum(r.reviewcount)),
        description: r.description || "",
        about: splitParagraphs(r.about),
        policies: splitParagraphs(r.policies),
        contact: {
          phone: r.phone || undefined,
          facebook: r.facebook || undefined,
          instagram: r.instagram || undefined,
          youtube: r.youtube || undefined,
          twitter: r.twitter || undefined,
        },
        coupons: couponsByStore.get(slug) ?? [],
        faqs: faqsByStore.get(slug) ?? [],
        relatedStores: splitList(r.relatedstores),
        updated: r.updated || today,
      };
    });

  const posts: BlogPost[] = rowsToObjects(tabs.blog)
    .filter((r) => r.slug && r.title)
    .map((r) => ({
      slug: r.slug.toLowerCase(),
      title: r.title,
      excerpt: r.excerpt || "",
      cover: r.cover || "",
      author: r.author || "Editorial Team",
      date: r.date || new Date().toISOString().slice(0, 10),
      category: (r.category || "").toLowerCase(),
      tags: splitList(r.tags),
      body: r.body || "",
      published: r.published ? toBool(r.published) : true,
    }));

  return { stores, categories, menu, settings, posts };
}
