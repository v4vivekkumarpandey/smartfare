import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  BadgeCheck,
  Tag,
  ShieldCheck,
  RefreshCw,
  Zap,
  Users,
  ThumbsUp,
  Wallet,
  Store as StoreIcon,
} from "lucide-react";
import { getSettings, getAllStores } from "@/lib/content";
import { formatNumber } from "@/lib/cn";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/store/FaqAccordion";

export const revalidate = 900;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `How It Works`,
    description: `How ${settings.siteName} finds, tests and verifies coupon codes so you save on every order — free, in a few taps.`,
    alternates: { canonical: "/how-it-works" },
  };
}

export default async function HowItWorksPage() {
  const [settings, stores] = await Promise.all([getSettings(), getAllStores()]);
  const name = settings.siteName;
  const storeCount = stores.length;
  const couponCount = stores.reduce((n, s) => n + s.coupons.length, 0);

  const steps = [
    {
      icon: Search,
      title: "Find your store",
      body: `Search or browse ${formatNumber(storeCount)}+ stores and open the brand you're about to shop with.`,
    },
    {
      icon: BadgeCheck,
      title: "Reveal a verified code",
      body: `Tap "Get Code" to unlock the best working coupon. Each one shows a live success rate, so you pick the winner.`,
    },
    {
      icon: Tag,
      title: "Apply & save",
      body: "Paste the code into the promo box at checkout and watch your total drop — before you pay.",
    },
  ];

  const trust = [
    { icon: ShieldCheck, title: "Hand-verified", body: "Real people test codes and date every offer, so you know it's live." },
    { icon: Zap, title: "One-tap savings", body: "Reveal, copy and apply in seconds — no hunting across the web." },
    { icon: RefreshCw, title: "Updated daily", body: "Expired codes are removed and fresh offers added every day." },
    { icon: Wallet, title: "Always free", body: `${name} is 100% free to use — no sign-up, no catch.` },
  ];

  const faqs = [
    { q: `Is ${name} free to use?`, a: `Yes — completely free. There's no membership, no fee, and no account required to reveal and use a code.` },
    { q: "How do you verify coupon codes?", a: "Our team tests codes against store checkouts and tracks a live success rate from real users. Working codes get a Verified badge; dead ones are removed or flagged." },
    { q: "Why didn't a code work for me?", a: "Codes can expire, sell out, or have terms like a minimum spend or specific products. Try another code from the same store, and always check the details before you pay." },
    { q: `How does ${name} make money?`, a: `When you use a link or code and go on to buy, we may earn a small commission from the store at no extra cost to you. It never changes the price you pay or which coupons we show.` },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-transparent">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "How It Works" }]}
          />
          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
            <ThumbsUp width={14} height={14} /> Simple, honest savings
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
            How {name} Works
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-500 sm:text-lg">
            We hunt down and hand-test {formatNumber(couponCount)}+ coupon codes
            from {formatNumber(storeCount)}+ stores, so you always get the biggest
            discount that actually works — in a few taps, for free.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/stores"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700"
            >
              <StoreIcon width={16} height={16} /> Browse all stores
            </Link>
            <Link
              href="/category"
              className="inline-flex items-center rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-bold text-ink-700 hover:border-brand-300 hover:text-brand-600"
            >
              Shop by category
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* Steps */}
        <section className="py-10">
          <h2 className="text-center text-2xl font-extrabold text-ink-900">
            Save in 3 simple steps
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={i}
                className="relative rounded-card border border-ink-100 bg-white p-6 shadow-sm"
              >
                <span className="absolute right-5 top-5 text-4xl font-extrabold text-ink-100">
                  {i + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <s.icon width={24} height={24} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust / how we keep codes working */}
        <section className="py-8">
          <div className="rounded-card border border-ink-100 bg-white p-6 sm:p-8">
            <h2 className="text-center text-2xl font-extrabold text-ink-900">
              How we keep codes working
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-ink-500">
              Anyone can list codes. We focus on making sure they actually save
              you money.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trust.map((t, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-100 text-brand-600">
                    <t.icon width={22} height={22} />
                  </span>
                  <h3 className="mt-3 font-bold text-ink-900">{t.title}</h3>
                  <p className="mt-1 text-sm text-ink-500">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community / disclosure strip */}
        <section className="py-8">
          <div className="flex flex-col items-center gap-4 rounded-card border border-brand-100 bg-brand-50 p-6 text-center sm:flex-row sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600">
              <Users width={24} height={24} />
            </span>
            <div>
              <h3 className="font-bold text-ink-900">
                Powered by real shoppers
              </h3>
              <p className="mt-1 text-sm text-ink-700">
                Every time someone reports whether a code worked, our success
                rates get smarter — so the whole community saves more. {name} is
                reader-supported: we may earn a commission when you use a link,
                at no extra cost to you.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8">
          <h2 className="mb-4 text-center text-2xl font-extrabold text-ink-900">
            Frequently asked questions
          </h2>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* CTA */}
        <section className="my-10 rounded-card bg-ink-900 p-8 text-center">
          <h2 className="text-2xl font-extrabold text-white">
            Ready to start saving?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-300">
            Find a verified code for your next order in seconds.
          </p>
          <Link
            href="/stores"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white hover:bg-accent-600"
          >
            Browse stores &amp; coupons
          </Link>
        </section>
      </div>
    </div>
  );
}
