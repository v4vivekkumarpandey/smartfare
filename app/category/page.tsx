import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getStoresByCategory } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "All Coupon Categories",
  description:
    "Browse every coupon category — software, VPNs, hosting, education, fashion and more.",
  alternates: { canonical: "/category" },
};

export default async function CategoryIndexPage() {
  const categories = await getCategories();
  const counts = await Promise.all(
    categories.map(async (c) => (await getStoresByCategory(c.slug)).length)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />

      <header className="mt-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          Browse All Categories
        </h1>
        <p className="mt-1 text-ink-500">
          Pick a category to see every store and verified coupon inside it.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="group flex items-start gap-4 rounded-card border border-ink-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-100">
              <CategoryIcon name={c.icon} size={24} />
            </span>
            <div className="min-w-0">
              <h2 className="font-bold text-ink-900 group-hover:text-brand-600">
                {c.name}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-ink-500">
                {c.description}
              </p>
              <span className="mt-2 inline-block text-xs font-semibold text-brand-700">
                {counts[i]} store{counts[i] === 1 ? "" : "s"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
