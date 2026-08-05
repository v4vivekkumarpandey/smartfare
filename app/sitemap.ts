import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllStores, getCategories, getAllPosts } from "@/lib/content";

/** Parse a date safely — returns undefined for blank/invalid values. */
function safeDate(s?: string): Date | undefined {
  if (!s) return undefined;
  const d = new Date(s);
  return isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [stores, categories, posts] = await Promise.all([
    getAllStores(),
    getCategories(),
    getAllPosts(),
  ]);

  const staticPages = [
    "",
    "/stores",
    "/category",
    "/blog",
    "/how-it-works",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.5,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${site.url}/category/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const storePages = stores.map((s) => ({
    url: `${site.url}/coupons/${s.slug}`,
    lastModified: safeDate(s.updated),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const postPages = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: safeDate(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...storePages, ...postPages];
}
