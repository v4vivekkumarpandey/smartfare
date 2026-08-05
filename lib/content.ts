import fs from "node:fs";
import path from "node:path";
import { unstable_cache } from "next/cache";
import type { Store, Category, Coupon, MenuItem, BlogPost } from "./types";
import { sheetsConfigured, loadFromSheets } from "./sheets";
import {
  parseSettings,
  lowerKeys,
  type SiteSettings,
} from "./settings";

const STORES_DIR = path.join(process.cwd(), "content", "stores");

export const CONTENT_TAG = "content";
/** ISR window in seconds — how often cached sheet data is refreshed. */
export const CONTENT_REVALIDATE = 900;

/* ------------------------------------------------------------------ *
 * Loaders
 * ------------------------------------------------------------------ */

function readJsonIfExists<T>(file: string, fallback: T): T {
  const p = path.join(process.cwd(), "content", file);
  return fs.existsSync(p)
    ? (JSON.parse(fs.readFileSync(p, "utf-8")) as T)
    : fallback;
}

/** Local JSON fallback (used in dev or when the sheet isn't configured). */
function loadFromDisk(): {
  stores: Store[];
  categories: Category[];
  menu: MenuItem[];
  settings: SiteSettings;
  posts: BlogPost[];
} {
  const files = fs.existsSync(STORES_DIR)
    ? fs.readdirSync(STORES_DIR).filter((f) => f.endsWith(".json"))
    : [];
  const stores = files.map(
    (file) =>
      JSON.parse(fs.readFileSync(path.join(STORES_DIR, file), "utf-8")) as Store
  );
  const categories = readJsonIfExists<Category[]>("categories.json", []);
  const menu = readJsonIfExists<MenuItem[]>("menu.json", []);
  const settingsRaw = readJsonIfExists<Record<string, unknown>>(
    "settings.json",
    {}
  );
  const settings = parseSettings(lowerKeys(settingsRaw));
  const posts = readJsonIfExists<BlogPost[]>("blog.json", []);
  return { stores, categories, menu, settings, posts };
}

async function loadContentUncached(): Promise<{
  stores: Store[];
  categories: Category[];
  menu: MenuItem[];
  settings: SiteSettings;
  posts: BlogPost[];
}> {
  if (sheetsConfigured()) {
    try {
      const data = await loadFromSheets();
      if (data.stores.length > 0) return data;
      console.warn("[content] Google Sheet returned no stores — using local JSON.");
    } catch (err) {
      console.error(
        "[content] Failed to load from Google Sheets, falling back to local JSON:",
        err instanceof Error ? err.message : err
      );
    }
  }
  return loadFromDisk();
}

/**
 * Cached content load. Deduped within a render and cached across requests for
 * CONTENT_REVALIDATE seconds. Bust instantly via revalidateTag(CONTENT_TAG)
 * from the /api/revalidate webhook.
 */
const loadContent = unstable_cache(loadContentUncached, ["site-content"], {
  revalidate: CONTENT_REVALIDATE,
  tags: [CONTENT_TAG],
});

/* ------------------------------------------------------------------ *
 * Public accessors (async)
 * ------------------------------------------------------------------ */

export async function getAllStores(): Promise<Store[]> {
  const { stores } = await loadContent();
  return [...stores].sort((a, b) => b.reviewCount - a.reviewCount);
}

export async function getStore(slug: string): Promise<Store | undefined> {
  const { stores } = await loadContent();
  return stores.find((s) => s.slug === slug);
}

export async function getStoreSlugs(): Promise<string[]> {
  const { stores } = await loadContent();
  return stores.map((s) => s.slug);
}

export async function getCategories(): Promise<Category[]> {
  const { categories } = await loadContent();
  return categories;
}

export async function getSettings(): Promise<SiteSettings> {
  const { settings } = await loadContent();
  return settings;
}

/* --- Blog --- */

export async function getAllPosts(): Promise<BlogPost[]> {
  const { posts } = await loadContent();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const { posts } = await loadContent();
  return posts.find((p) => p.slug === slug && p.published);
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const { categories } = await loadContent();
  return categories.find((c) => c.slug === slug);
}

/**
 * Navigation menu for a given location. Falls back to auto-generating links
 * from the categories when the sheet has no `menu` rows yet.
 */
export async function getMenu(
  location: "header" | "footer"
): Promise<MenuItem[]> {
  const { menu, categories } = await loadContent();
  const items = menu.filter(
    (m) => m.location === location || m.location === "both"
  );
  if (items.length > 0) return items;
  return categories
    .slice(0, location === "header" ? 4 : 5)
    .map((c, i) => ({
      label: c.name,
      href: `/category/${c.slug}`,
      location,
      order: i,
      external: false,
    }));
}

export async function getStoresByCategory(slug: string): Promise<Store[]> {
  const stores = await getAllStores();
  return stores.filter((s) => s.category === slug);
}

export async function getRelatedStores(store: Store): Promise<Store[]> {
  const stores = await getAllStores();
  const explicit = store.relatedStores
    .map((slug) => stores.find((s) => s.slug === slug))
    .filter((s): s is Store => Boolean(s));
  if (explicit.length > 0) return explicit;
  return stores.filter(
    (s) => s.category === store.category && s.slug !== store.slug
  );
}

export async function getTopCoupons(
  limit = 6
): Promise<Array<{ store: Store; coupon: Coupon }>> {
  const stores = await getAllStores();
  const all: Array<{ store: Store; coupon: Coupon }> = [];
  for (const store of stores) {
    for (const coupon of activeCoupons(store)) {
      all.push({ store, coupon });
    }
  }
  return all
    .sort((a, b) => {
      const fa = a.coupon.featured ? 1 : 0;
      const fb = b.coupon.featured ? 1 : 0;
      if (fb !== fa) return fb - fa;
      return b.coupon.uses - a.coupon.uses;
    })
    .slice(0, limit);
}

/* ------------------------------------------------------------------ *
 * Pure helpers (no I/O)
 * ------------------------------------------------------------------ */

/** Active (non-expired) coupons for a store. */
export function activeCoupons(store: Store): Coupon[] {
  const today = new Date().toISOString().slice(0, 10);
  return store.coupons.filter((c) => !c.expires || c.expires >= today);
}
