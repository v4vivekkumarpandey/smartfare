import type { Metadata } from "next";
import { getAllStores } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StoreCard } from "@/components/store/StoreCard";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "All Stores — Coupons & Promo Codes",
  description:
    "Every store we track, with verified coupon codes and deals updated daily.",
  alternates: { canonical: "/stores" },
};

export default async function StoresIndexPage() {
  const stores = await getAllStores();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "All Stores" }]}
      />

      <header className="mt-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          All Stores
        </h1>
        <p className="mt-1 text-ink-500">
          {stores.length} store{stores.length === 1 ? "" : "s"} with verified
          coupons, updated daily.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((s) => (
          <StoreCard key={s.slug} store={s} />
        ))}
      </div>
    </div>
  );
}
