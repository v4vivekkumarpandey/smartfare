import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategories,
  getCategory,
  getStoresByCategory,
} from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { StoreCard } from "@/components/store/StoreCard";

export const dynamicParams = true;
export const revalidate = 900;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name} Coupons & Promo Codes`,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const stores = await getStoresByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: category.name }]}
      />

      <header className="mt-4 flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <CategoryIcon name={category.icon} size={28} />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            {category.name} Coupons
          </h1>
          <p className="mt-1 text-ink-500">{category.description}</p>
        </div>
      </header>

      {stores.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((s) => (
            <StoreCard key={s.slug} store={s} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-card border border-ink-100 bg-white p-8 text-center text-ink-500">
          No stores in this category yet — check back soon.
        </p>
      )}
    </div>
  );
}
