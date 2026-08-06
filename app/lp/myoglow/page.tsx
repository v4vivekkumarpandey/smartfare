import type { Metadata } from "next";
import {
  Sparkles,
  Zap,
  Sun,
  Clock,
  BadgeCheck,
  Truck,
  Lock,
  RotateCcw,
  Check,
  X,
  Heart,
  ChevronRight,
} from "lucide-react";
import { FaqAccordion } from "@/components/store/FaqAccordion";
import { LpImage } from "@/components/lp/LpImage";
import { OfferLink } from "@/components/lp/OfferLink";

// Every CTA goes through the internal redirect (cloaks the affiliate link).
// The real destination lives in lib/offers.ts under this slug.
const OFFER_URL = "/go/offer/myoglow";

const DIR = "/lp/myoglow";
const IMAGES = {
  hero: `${DIR}/hero.webp`,
  product: `${DIR}/product.webp`,
  logo: `${DIR}/logo.png`,
  steps: [
    { img: `${DIR}/hero.webp`, title: "Cleanse & apply gel", body: "Start with clean skin and apply your favorite water-based serum or gel." },
    { img: `${DIR}/hero.webp`, title: "Glide upward", body: "Switch on MyoGlow and glide it upward along your jaw, neck and face." },
    { img: `${DIR}/hero.webp`, title: "Make it a ritual", body: "Use it a few minutes a day as part of your regular skincare routine." },
  ],
};

export const metadata: Metadata = {
  title: "MyoGlow — At-Home Face & Neck Skincare Device",
  description:
    "MyoGlow is an easy-to-use, handheld face & neck device that combines gentle warmth, red LED light and soft massage — a simple daily skincare ritual at home.",
  // Paid landing page: keep it out of the organic index but let the ad crawler read it.
  robots: { index: false, follow: false },
  alternates: { canonical: `${DIR}/` },
  openGraph: {
    type: "website",
    title: "MyoGlow — At-Home Face & Neck Skincare Device",
    description:
      "A handheld face & neck device combining gentle warmth, red LED light and soft massage — a simple daily skincare ritual at home.",
    images: [{ url: IMAGES.hero }],
  },
};

const features = [
  { icon: Sun, title: "Red LED light", body: "Uses gentle red LED light as part of a relaxing at-home skincare ritual — no salon appointment needed." },
  { icon: Zap, title: "Micro-current & massage", body: "Soft micro-current and massage help you enjoy a spa-like glide across your face and neck." },
  { icon: Sparkles, title: "Warm glide tip", body: "A gently warming tip makes it easy to work in your serum or gel while you unwind." },
  { icon: Clock, title: "Minutes a day", body: "Designed for a quick daily routine — just a few relaxing minutes in front of the mirror." },
  { icon: BadgeCheck, title: "Satisfaction guarantee", body: "Backed by a money-back guarantee — check the offer page for the current window and terms." },
  { icon: Heart, title: "Face, neck & jaw", body: "Contoured to follow the curves of your jawline, neck and cheeks for an easy, comfortable glide." },
];

const faqs = [
  { q: "How do I use MyoGlow?", a: "Apply a water-based serum or gel to clean skin, switch the device on, and glide it upward along your neck, jaw and face for a few minutes. Always follow the directions in the box and check the offer page for full usage details." },
  { q: "How often should I use it?", a: "Most people use it for a few minutes a day as part of their regular skincare routine. See the official offer page and the included instructions for the recommended routine." },
  { q: "Is there a guarantee?", a: "The seller offers a money-back guarantee. Please see the offer page for the current return window and full terms before you order." },
  { q: "How fast will it arrive?", a: "Shipping options, delivery estimates and any current promotions are shown at checkout on the offer page." },
];

function CtaButton({ children = "Check Today's Price →" }: { children?: React.ReactNode }) {
  return (
    <OfferLink
      href={OFFER_URL}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-4 text-center text-base font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-teal-600 active:scale-[0.99] sm:text-lg"
    >
      {children}
    </OfferLink>
  );
}

export default function MyoGlowLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* Clear advertising label (required for sponsored content) */}
      <div className="bg-gray-900 py-1.5 text-center text-[11px] font-semibold uppercase tracking-widest text-gray-300">
        Advertisement · Sponsored content
      </div>

      <article className="mx-auto max-w-2xl px-4 py-8">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.logo} alt="MyoGlow logo" className="h-full w-full object-contain" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-gray-900">MyoGlow</span>
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
          An At-Home Face &amp; Neck Skincare Device for Your Daily Ritual
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          MyoGlow is a handheld device that combines gentle warmth, red LED light
          and soft massage. Glide it along your face and neck for a few relaxing
          minutes a day — no salon appointment needed.
        </p>

        {/* Above-the-fold trust strip */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-semibold text-gray-600">
          <span className="inline-flex items-center gap-1"><Check width={14} height={14} className="text-teal-600" /> Money-back guarantee</span>
          <span className="inline-flex items-center gap-1"><Check width={14} height={14} className="text-teal-600" /> Secure checkout</span>
          <span className="inline-flex items-center gap-1"><Check width={14} height={14} className="text-teal-600" /> Rechargeable · use at home</span>
        </div>

        {/* Hero image */}
        <div className="mt-6">
          <LpImage src={IMAGES.hero} alt="MyoGlow face and neck skincare device" fit="object-contain" className="rounded-xl bg-teal-50" priority />
        </div>

        {/* Intro */}
        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-gray-700">
          <p>
            Great skin habits start with a routine you actually enjoy. MyoGlow is
            designed to make that easy: a comfortable, warming glide across your
            jaw, neck and cheeks that turns your serum step into a{" "}
            <strong>spa-like ritual at home</strong>. It&apos;s made for adults who
            want a simple way to slow down and care for their skin.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6"><CtaButton /></div>
        <p className="mt-2 text-center text-xs text-gray-400">Handheld · Rechargeable · See offer page for price &amp; terms</p>

        {/* Features */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">What makes MyoGlow easy to love</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                <f.icon width={20} height={20} />
              </span>
              <h3 className="mt-3 font-bold text-gray-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.body}</p>
            </div>
          ))}
        </div>

        {/* How to use — 3 steps */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">How to use it</h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {IMAGES.steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto max-w-[140px]">
                <LpImage src={s.img} alt={s.title} ratio="aspect-square" fit="object-contain" className="rounded-full bg-teal-50" />
              </div>
              <h3 className="mt-3 font-bold text-gray-900">
                <span className="mr-1 text-teal-600">{i + 1}.</span>{s.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{s.body}</p>
            </div>
          ))}
        </div>

        {/* What's inside the box */}
        <div className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-6">
          <h2 className="text-2xl font-extrabold text-gray-900">What you get</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-gray-700">
            MyoGlow is a rechargeable, handheld device with an ergonomic, contoured
            tip made for your face and neck. Everyone&apos;s skin is different, so the
            full specifications, modes and complete usage instructions are shown on
            the official offer page — please review them, and check with a
            professional if you have a skin condition or any concerns.
          </p>
        </div>

        {/* Comparison */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">How it compares</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[460px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="p-3 text-left font-semibold text-gray-500"></th>
                <th className="rounded-t-lg bg-teal-500 p-3 text-center font-bold text-white">MyoGlow</th>
                <th className="p-3 text-center font-semibold text-gray-500">Salon visits</th>
                <th className="p-3 text-center font-semibold text-gray-500">Manual creams</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Use at home", true, false, true],
                ["Warmth + red LED light", true, true, false],
                ["Massage glide", true, true, false],
                ["No appointment needed", true, false, true],
                ["One-time device", true, false, false],
              ].map((row, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="p-3 font-medium text-gray-700">{row[0] as string}</td>
                  {[1, 2, 3].map((c) => {
                    const v = row[c];
                    return (
                      <td key={c} className={`p-3 text-center ${c === 1 ? "bg-teal-50 font-semibold text-teal-700" : "text-gray-600"}`}>
                        {typeof v === "boolean" ? (
                          v ? <Check className="mx-auto text-teal-600" width={18} height={18} /> : <X className="mx-auto text-gray-300" width={18} height={18} />
                        ) : (v as string)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-gray-400">General comparison for illustration. Features and results vary by product, routine and individual.</p>
        </div>

        {/* Offer box */}
        <div className="mt-10 rounded-2xl border-2 border-teal-500 bg-teal-50 p-6 text-center">
          <div className="mx-auto mb-4 max-w-xs">
            <LpImage src={IMAGES.product} alt="MyoGlow device" ratio="aspect-square" fit="object-contain" className="rounded-xl bg-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Get MyoGlow</h2>
          <p className="mt-1 text-gray-600">
            Special bundles may be available. Check current pricing, savings and any
            free bonuses on the official offer page.
          </p>
          <div className="mx-auto mt-5 max-w-sm"><CtaButton /></div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-gray-600">
            <span className="inline-flex items-center gap-1"><RotateCcw width={14} height={14} className="text-teal-600" /> Money-back guarantee (see terms)</span>
            <span className="inline-flex items-center gap-1"><Lock width={14} height={14} className="text-teal-600" /> Secure checkout</span>
            <span className="inline-flex items-center gap-1"><Truck width={14} height={14} className="text-teal-600" /> Shipping options at checkout</span>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-teal-200 bg-teal-50 p-6 text-center sm:flex-row sm:text-left">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
            <RotateCcw width={26} height={26} />
          </span>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Money-back guarantee</h3>
            <p className="mt-1 text-sm text-gray-700">
              The seller backs MyoGlow with a money-back guarantee. Please review the
              return window and full terms on the offer page before purchasing.
            </p>
          </div>
        </div>

        {/* Why trust this page — transparency / about */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Why you can trust this page</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-gray-700">
            We&apos;re an independent review and deals team. We put together plain,
            no-hype summaries of products we think are worth a look, so you can decide
            for yourself before clicking through to the seller.
          </p>
          <ul className="mt-4 space-y-2.5 text-[15px] text-gray-700">
            <li className="flex items-start gap-2">
              <Check width={18} height={18} className="mt-0.5 shrink-0 text-teal-600" />
              <span><strong>We tell you it&apos;s an ad.</strong> This page is a paid advertisement and we may earn a commission if you buy — clearly labeled at the top and in the footer.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check width={18} height={18} className="mt-0.5 shrink-0 text-teal-600" />
              <span><strong>No exaggerated claims.</strong> MyoGlow is a cosmetic personal-care device. We don&apos;t promise medical results — just what it is and how it&apos;s used.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check width={18} height={18} className="mt-0.5 shrink-0 text-teal-600" />
              <span><strong>Prices &amp; terms come from the seller.</strong> Current pricing, guarantee window and shipping are always confirmed on the official offer page before you pay.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check width={18} height={18} className="mt-0.5 shrink-0 text-teal-600" />
              <span><strong>Real ways to reach us.</strong> Questions? See our{" "}
                <a href="/contact" className="font-semibold text-teal-700 underline">Contact</a>,{" "}
                <a href="/privacy" className="font-semibold text-teal-700 underline">Privacy Policy</a> and{" "}
                <a href="/terms" className="font-semibold text-teal-700 underline">Terms</a>.
              </span>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">Frequently asked questions</h2>
        <div className="mt-4"><FaqAccordion faqs={faqs} /></div>

        {/* Final CTA */}
        <div className="mt-8"><CtaButton>Check Today&apos;s Price →</CtaButton></div>
        <OfferLink href={OFFER_URL} className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-teal-700">
          See price &amp; availability <ChevronRight width={15} height={15} />
        </OfferLink>
      </article>

      {/* Footer + disclosures */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-8 text-xs leading-relaxed text-gray-500">
          <p className="font-semibold text-gray-600">Advertising disclosure</p>
          <p className="mt-2">
            This is an advertisement, not a news article or editorial. This page is
            operated independently and is not the official manufacturer&apos;s website.
            &quot;MyoGlow&quot; and any related marks are the property of their respective
            owners and are used here for identification only. We may earn a commission if
            you purchase through links on this page, at no extra cost to you. Prices,
            discounts, availability, guarantees and specifications are set by the seller
            and shown on the offer page — always confirm the current details there before
            buying.
          </p>
          <p className="mt-3">
            MyoGlow is a personal-care device intended for cosmetic use only. It is not a
            medical device and is not intended to diagnose, treat, cure or prevent any
            disease or condition. Results vary from person to person. Consult a qualified
            professional before use if you are pregnant, have a skin condition, wear an
            implanted electronic device, or have any medical concerns.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} · This promotional page ·{" "}
            <a href="/privacy" className="underline">Privacy Policy</a> ·{" "}
            <a href="/terms" className="underline">Terms</a> ·{" "}
            <a href="/contact" className="underline">Contact</a>
          </p>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-teal-600 bg-teal-500 p-3 sm:hidden">
        <OfferLink
          href={OFFER_URL}
          className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-teal-700"
        >
          Check Today&apos;s Price →
        </OfferLink>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
