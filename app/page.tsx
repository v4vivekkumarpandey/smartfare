import Link from "next/link";
import { ShieldCheck, Zap, RefreshCw } from "lucide-react";
import {
  getAllStores,
  getCategories,
  getTopCoupons,
  getSettings,
} from "@/lib/content";
import { outboundHref } from "@/lib/affiliate";
import { toPublicCoupon } from "@/lib/coupon";
import { formatNumber } from "@/lib/cn";
import { SearchBox, type SearchItem } from "@/components/layout/SearchBox";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { StoreCard } from "@/components/store/StoreCard";
import { CouponRow } from "@/components/coupon/CouponRow";

export const revalidate = 900;

export default async function HomePage() {
  const [stores, categories, topCoupons, settings] = await Promise.all([
    getAllStores(),
    getCategories(),
    getTopCoupons(6),
    getSettings(),
  ]);
  const index: SearchItem[] = stores.map((s) => ({
    slug: s.slug,
    name: s.name,
    category: s.category,
  }));

  const totalCoupons = stores.reduce((n, s) => n + s.coupons.length, 0);
  const heroSubtext = settings.heroSubtext
    .replace(/\{coupons\}/g, formatNumber(totalCoupons))
    .replace(/\{stores\}/g, formatNumber(stores.length));
  const trustIcons = [
    <ShieldCheck key="0" className="text-success" />,
    <Zap key="1" className="text-accent-500" />,
    <RefreshCw key="2" className="text-brand-600" />,
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-transparent">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:py-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
            <ShieldCheck width={14} height={14} /> {settings.tagline}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
            {settings.heroHeadline}
            {settings.heroHeadlineHighlight && (
              <span className="block text-brand-600">
                {settings.heroHeadlineHighlight}
              </span>
            )}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-500 sm:text-lg">
            {heroSubtext}
          </p>
          <div className="mx-auto mt-7 max-w-xl">
            <SearchBox index={index} placeholder={settings.searchPlaceholder} />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck width={16} height={16} className="text-success" />{" "}
              Verified daily
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap width={16} height={16} className="text-accent-500" /> Instant
              reveal
            </span>
            <span className="inline-flex items-center gap-1.5">
              <RefreshCw width={16} height={16} className="text-brand-600" /> Always
              free
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* Categories */}
        <section className="py-10">
          <h2 className="text-xl font-bold text-ink-900">Browse by Category</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group flex flex-col items-center gap-2 rounded-card border border-ink-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-100">
                  <CategoryIcon name={c.icon} />
                </span>
                <span className="text-sm font-semibold text-ink-900">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Top coupons */}
        <section className="py-6">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold text-ink-900">
              Today&apos;s Top Coupons
            </h2>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {topCoupons.map(({ store, coupon }) => (
              <CouponRow
                key={`${store.slug}-${coupon.id}`}
                coupon={toPublicCoupon(coupon)}
                storeName={store.name}
                storeSlug={store.slug}
                storeLogo={store.logo}
                outboundHref={outboundHref(store, coupon)}
                showStore
              />
            ))}
          </div>
        </section>

        {/* Featured stores */}
        <section className="py-10">
          <h2 className="text-xl font-bold text-ink-900">Popular Stores</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((s) => (
              <StoreCard key={s.slug} store={s} />
            ))}
          </div>
        </section>

        {/* Trust band */}
        <section className="my-10 rounded-card border border-ink-100 bg-white p-8">
          <div className="grid gap-6 text-center sm:grid-cols-3">
            {settings.trust.slice(0, 3).map((t, i) => (
              <Trust
                key={i}
                icon={trustIcons[i] ?? trustIcons[0]}
                title={t.title}
                body={t.body}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Trust({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-100">
        {icon}
      </span>
      <h3 className="mt-3 font-bold text-ink-900">{title}</h3>
      <p className="mt-1 text-sm text-ink-500">{body}</p>
    </div>
  );
}
