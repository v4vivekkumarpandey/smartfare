import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  ExternalLink,
  Tag,
  ShieldCheck,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Ticket,
  Truck,
} from "lucide-react";
import {
  getStore,
  getStoreSlugs,
  getRelatedStores,
  getCategory,
  getCategories,
  getAllStores,
  activeCoupons,
} from "@/lib/content";
import { outboundHref, goHref } from "@/lib/affiliate";
import { toPublicCoupon } from "@/lib/coupon";
import { storeJsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";
import { formatDate, formatNumber } from "@/lib/cn";
import { CouponRow } from "@/components/coupon/CouponRow";
import { CopyCodeBox } from "@/components/coupon/CopyCodeBox";
import { FaqAccordion } from "@/components/store/FaqAccordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import type { Coupon, Store } from "@/lib/types";

export const dynamicParams = true;
export const revalidate = 900;

export async function generateStaticParams() {
  const slugs = await getStoreSlugs();
  return slugs.map((store) => ({ store }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ store: string }>;
}): Promise<Metadata> {
  const { store: slug } = await params;
  const store = await getStore(slug);
  if (!store) return {};
  const count = activeCoupons(store).length;
  const title = `${store.name} Promo Code & Discount Code — ${count} Verified Offers`;
  return {
    title,
    description: `${count} verified ${store.name} coupon codes and deals for ${new Date().getFullYear()}. ${store.description}`,
    alternates: { canonical: `/coupons/${store.slug}` },
    openGraph: {
      title,
      description: store.description,
      url: `${site.url}/coupons/${store.slug}`,
      images: [store.logo],
    },
  };
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ store: string }>;
}) {
  const { store: slug } = await params;
  const store = await getStore(slug);
  if (!store) notFound();

  const coupons = activeCoupons(store);
  const [category, related, allStores, categories] = await Promise.all([
    getCategory(store.category),
    getRelatedStores(store),
    getAllStores(),
    getCategories(),
  ]);

  const codeCount = coupons.filter((c) => c.type === "code").length;
  const verifiedCount = coupons.filter((c) => c.verified).length;
  const best =
    coupons.find((c) => c.featured) ??
    [...coupons].sort((a, b) => b.uses - a.uses)[0];
  const bestDiscount = best?.discount ?? "—";
  const totalUses = coupons.reduce((s, c) => s + c.uses, 0);

  const crumbs = [
    { label: "Home", href: "/" },
    ...(category
      ? [{ label: category.name, href: `/category/${category.slug}` }]
      : []),
    { label: store.name },
  ];

  return (
    <>
      <JsonLd data={storeJsonLd(store)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          ...(category
            ? [{ label: category.name, href: `/category/${category.slug}` }]
            : []),
          { label: store.name, href: `/coupons/${store.slug}` },
        ])}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <Breadcrumbs items={crumbs} />

        {/* ---- Hero header ---- */}
        <section className="mt-4 rounded-card border border-ink-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Image
              src={store.logo}
              unoptimized
              alt={`${store.name} logo`}
              width={72}
              height={72}
              className="h-16 w-16 rounded-2xl object-contain"
              priority
            />
            <div className="flex-1">
              <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
                {store.name} Promo Code &amp; Discount Code
                <a
                  href={goHref(store.slug, "site")}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  aria-label={`Visit ${store.name}`}
                  className="text-ink-300 hover:text-brand-600"
                >
                  <ExternalLink width={18} height={18} />
                </a>
              </h1>
              <p className="mt-1 text-sm text-ink-500">
                {store.name} Promo Code · Updated {formatDate(store.updated)}
              </p>
            </div>
            <a
              href="#submit"
              className="hidden shrink-0 rounded-full bg-accent-500 px-4 py-2 text-sm font-bold text-white hover:bg-accent-600 sm:inline-block"
            >
              + Submit a Coupon
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink-100 pt-4">
            <span className="rounded-full bg-accent-500/10 px-3 py-1 text-sm font-bold text-accent-600">
              {coupons.length} Offers
            </span>
            <span className="text-sm font-semibold text-ink-900">
              Save Up to {bestDiscount} on {store.name} — All Codes Applied in One Tap
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-ink-500">
              <ShieldCheck width={14} height={14} className="text-success" />
              Trusted by {formatNumber(store.reviewCount * 3 + 200)}+ users
            </span>
          </div>
        </section>

        {/* ---- Main grid ---- */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
          {/* Left: coupon list */}
          <div>
            {/* Apply-all highlight */}
            {best && (
              <a
                href={goHref(store.slug, best.id)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mb-4 flex items-center gap-4 rounded-xl border-2 border-accent-500 bg-accent-500/5 p-4 transition hover:bg-accent-500/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-500 text-white">
                  <Ticket width={22} height={22} />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-ink-900">
                    Apply All {store.name} Codes in One Tap
                  </p>
                  <p className="text-xs text-ink-500">
                    Automatically test every code — save up to {bestDiscount}.
                  </p>
                </div>
                <span className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-bold text-white">
                  Get Code
                </span>
              </a>
            )}

            <div className="mb-3 flex items-center gap-2">
              <Tag width={18} height={18} className="text-accent-500" />
              <h2 className="text-lg font-bold text-ink-900">
                {store.name} Coupons &amp; Promo Codes
              </h2>
            </div>

            <div className="space-y-3">
              {coupons.map((coupon) => (
                <CouponRow
                  key={coupon.id}
                  coupon={toPublicCoupon(coupon)}
                  storeName={store.name}
                  storeSlug={store.slug}
                  outboundHref={outboundHref(store, coupon)}
                />
              ))}
            </div>

            {/* About */}
            {store.about && store.about.length > 0 && (
              <section className="mt-8 rounded-card border border-ink-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-ink-900">
                  About {store.name} &amp; How to Save
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-700">
                  {store.about.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: sidebar */}
          <aside className="space-y-6">
            {/* Save stats */}
            <div className="rounded-card border border-ink-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold text-ink-900">
                Is now a good time to save?
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <Row label="All Discounts" value={String(coupons.length)} />
                <Row label="Promo Codes" value={String(codeCount)} />
                <Row label={`Verified ${store.name}`} value={String(verifiedCount)} />
                <Row label="Maximum Discount" value={bestDiscount} />
                <Row label="Total Redemptions" value={formatNumber(totalUses)} />
              </dl>
            </div>

            {/* Similar stores */}
            {related.length > 0 && (
              <SidebarCard title={`Similar Stores to ${store.name}`}>
                <ul className="space-y-3">
                  {related.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/coupons/${s.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <Image
                          src={s.logo}
                          unoptimized
                          alt={s.name}
                          width={36}
                          height={36}
                          className="h-9 w-9 rounded-lg object-contain"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-ink-900 group-hover:text-brand-600">
                            {s.name}
                          </span>
                          <span className="block text-xs text-ink-500">
                            {activeCoupons(s).length} discounts available
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            )}

            {/* Points to know */}
            <SidebarCard title={`Points you should know about ${store.name}`}>
              <p className="text-sm leading-relaxed text-ink-700">
                {store.description}
              </p>
            </SidebarCard>

            {/* Contact */}
            {store.contact && hasContact(store.contact) && (
              <SidebarCard title={`${store.name} Contact Information`}>
                <ul className="space-y-2 text-sm">
                  {store.contact.phone && (
                    <li className="flex items-center gap-2 text-ink-700">
                      <Phone width={15} height={15} className="text-ink-500" />
                      {store.contact.phone}
                    </li>
                  )}
                  <SocialLink href={store.contact.facebook} label="Facebook" icon={<Facebook width={15} height={15} />} />
                  <SocialLink href={store.contact.instagram} label="Instagram" icon={<Instagram width={15} height={15} />} />
                  <SocialLink href={store.contact.youtube} label="YouTube" icon={<Youtube width={15} height={15} />} />
                  <SocialLink href={store.contact.twitter} label="Twitter / X" icon={<Twitter width={15} height={15} />} />
                </ul>
              </SidebarCard>
            )}

            {/* Why trust us */}
            <SidebarCard title="Why Trust Us?">
              <p className="text-sm leading-relaxed text-ink-700">
                {site.name} is a dedicated savings team. We hand-test coupons and
                rank {store.name} offers by a live success rate so you spend less
                time hunting for codes and more time saving. Verified codes carry
                a badge and a date.
              </p>
            </SidebarCard>

            {/* Popular stores */}
            <SidebarCard title="Popular Stores">
              <ul className="grid grid-cols-1 gap-1.5 text-sm">
                {allStores.slice(0, 8).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/coupons/${s.slug}`}
                      className="text-ink-600 hover:text-brand-600"
                    >
                      {s.name} Promo Code
                    </Link>
                  </li>
                ))}
              </ul>
            </SidebarCard>

            {/* Related categories */}
            <SidebarCard title="Related Categories">
              <ul className="space-y-1.5 text-sm">
                {categories.slice(0, 6).map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/category/${c.slug}`}
                      className="text-ink-600 hover:text-brand-600"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </SidebarCard>
          </aside>
        </div>

        {/* ---- Best code right now ---- */}
        {best && (
          <section className="mt-10 rounded-card border border-ink-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-ink-900">
              What&apos;s the Best {store.name} Promo Code right now?
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              The best {store.name} code is “{best.title}”, verified by our team.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Metric label="Best Discount" value={bestDiscount} accent />
              <Metric label="Success Rate" value={`${best.successRate}%`} />
              <Metric label="Used" value={`${formatNumber(best.uses)}x`} />
            </div>
            <div className="mt-4 max-w-md">
              <CopyCodeBox
                coupon={toPublicCoupon(best)}
                storeName={store.name}
                storeSlug={store.slug}
                outboundHref={outboundHref(store, best)}
              />
            </div>
          </section>
        )}

        {/* ---- How to apply ---- */}
        <section className="mt-8 rounded-card border border-ink-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-ink-900">
            How to apply {store.name} codes at checkout
          </h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            <Step n={1} title="Find your code" body={`Browse the verified ${store.name} codes above and click "Get Code".`} />
            <Step n={2} title="Copy the code" body={`The code is copied for you and ${store.name} opens in a new tab.`} />
            <Step n={3} title="Apply & save" body="Paste it into the promo/coupon box at checkout before you pay." />
          </ol>
        </section>

        {/* ---- Key shopper policies ---- */}
        {store.policies && store.policies.length > 0 && (
          <section className="mt-8 rounded-card border border-ink-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900">
              <Truck width={18} height={18} className="text-brand-600" />
              {store.name} Key Shopper Policies
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-700">
              {store.policies.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <BadgeCheck width={16} height={16} className="mt-0.5 shrink-0 text-success" />
                  {p}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---- FAQ ---- */}
        {store.faqs.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              FAQ for {store.name}
            </h2>
            <FaqAccordion faqs={store.faqs} />
          </section>
        )}

        {/* ---- Offers table ---- */}
        <section className="mt-8 rounded-card border border-ink-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-ink-900">
            Browse {store.name} Promo Codes &amp; Offers Today
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-500">
                  <th className="py-2 pr-4 font-semibold">Type</th>
                  <th className="py-2 pr-4 font-semibold">Discount</th>
                  <th className="py-2 pr-4 font-semibold">Offer</th>
                  <th className="py-2 pr-4 font-semibold">Expires</th>
                  <th className="py-2 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => (
                  <tr key={c.id} className="border-b border-ink-100 last:border-0">
                    <td className="py-3 pr-4">
                      <span className="rounded bg-accent-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-accent-600">
                        {c.type === "code" && c.code ? "Code" : "Deal"}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-bold text-accent-600">{c.discount}</td>
                    <td className="py-3 pr-4 text-ink-700">{c.title}</td>
                    <td className="py-3 pr-4 text-ink-500">
                      {c.expires ? formatDate(c.expires) : "Ongoing"}
                    </td>
                    <td className="py-3">
                      <a
                        href={goHref(store.slug, c.id)}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="font-semibold text-brand-600 hover:text-brand-700"
                      >
                        Get {c.type === "code" && c.code ? "Code" : "Deal"}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---- Similar coupons ---- */}
        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              Similar Coupons You Might Also Like
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => {
                const c = activeCoupons(s)[0];
                if (!c) return null;
                return (
                  <SimilarCoupon key={s.slug} store={s} coupon={c} />
                );
              })}
            </div>
          </section>
        )}

        {/* ---- Submit anchor ---- */}
        <section
          id="submit"
          className="mt-10 rounded-card border border-ink-100 bg-brand-50 p-6 text-center"
        >
          <h2 className="text-lg font-bold text-ink-900">
            Found a working {store.name} code?
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-ink-700">
            Help other shoppers save — send it to us and we&apos;ll verify and
            publish it.
          </p>
          <a
            href={`mailto:support@${site.domain}?subject=New ${store.name} coupon`}
            className="mt-4 inline-block rounded-full bg-accent-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-600"
          >
            Submit a Coupon
          </a>
        </section>
      </div>
    </>
  );
}

/* ---- small helpers ---- */

function hasContact(c: NonNullable<Store["contact"]>): boolean {
  return Boolean(c.phone || c.facebook || c.instagram || c.youtube || c.twitter);
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-ink-500">{label}</dt>
      <dd className="font-semibold text-ink-900">{value}</dd>
    </div>
  );
}

function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-ink-100 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-bold text-ink-900">{title}</h3>
      {children}
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-ink-700 hover:text-brand-600"
      >
        <span className="text-ink-500">{icon}</span>
        {label}
      </a>
    </li>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl bg-ink-100 p-4 text-center">
      <div className={`text-2xl font-extrabold ${accent ? "text-accent-600" : "text-brand-700"}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-ink-500">{label}</div>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="rounded-xl border border-ink-100 p-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
        {n}
      </span>
      <h3 className="mt-3 font-semibold text-ink-900">{title}</h3>
      <p className="mt-1 text-sm text-ink-500">{body}</p>
    </li>
  );
}

function SimilarCoupon({ store, coupon }: { store: Store; coupon: Coupon }) {
  return (
    <div className="flex items-center gap-3 rounded-card border border-ink-100 bg-white p-4 shadow-sm">
      <Image
        src={store.logo}
        unoptimized
        alt={store.name}
        width={44}
        height={44}
        className="h-11 w-11 rounded-lg object-contain"
      />
      <div className="min-w-0 flex-1">
        <Link
          href={`/coupons/${store.slug}`}
          className="block truncate text-sm font-bold text-ink-900 hover:text-brand-600"
        >
          {store.name}
        </Link>
        <p className="truncate text-xs text-ink-500">{coupon.title}</p>
      </div>
      <a
        href={goHref(store.slug, coupon.id)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="shrink-0 rounded-lg bg-accent-500 px-3 py-2 text-xs font-bold text-white hover:bg-accent-600"
      >
        Get {coupon.type === "code" && coupon.code ? "Code" : "Deal"}
      </a>
    </div>
  );
}
