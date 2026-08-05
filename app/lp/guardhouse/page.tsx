import type { Metadata } from "next";
import {
  ShieldCheck,
  Camera,
  Moon,
  Wifi,
  Smartphone,
  Zap,
  BadgeCheck,
  Truck,
  Lock,
  RotateCcw,
  Check,
  X,
  ChevronRight,
} from "lucide-react";
import { FaqAccordion } from "@/components/store/FaqAccordion";
import { LpImage } from "@/components/lp/LpImage";
import { OfferLink } from "@/components/lp/OfferLink";

// Every CTA goes through the internal redirect (cloaks the affiliate link).
// The real destination lives in lib/offers.ts under this slug.
const OFFER_URL = "/go/offer/guardhouse";

const DIR = "/lp/guardhouse";
const IMAGES = {
  hero: `${DIR}/hero.gif`,
  product: `${DIR}/product.webp`,
  videoId: "qUtxAdlFLrk",
  steps: [
    { img: `${DIR}/step1.webp`, title: "Download the free app", body: "Grab the app on iOS or Android in seconds." },
    { img: `${DIR}/step2.webp`, title: "Scan the QR code", body: "Point your phone at the code to pair the camera." },
    { img: `${DIR}/step3.webp`, title: "Watch from anywhere", body: "See a live feed and get motion alerts wherever you are." },
  ],
};

export const metadata: Metadata = {
  title: "GuardHouse — Wireless Home Security Camera, No Monthly Fees",
  description:
    "GuardHouse is a compact wireless security camera with night vision, a wide-angle lens and a free app — set up in minutes, with no monthly subscription.",
  robots: { index: false, follow: false },
};

const features = [
  { icon: Zap, title: "Easy setup", body: "No wiring or technician needed — charge it, connect the app, and you're set." },
  { icon: Wifi, title: "Wireless & portable", body: "Place it by a doorway, garage, driveway or nursery, and move it whenever you like." },
  { icon: Moon, title: "Night vision", body: "Automatic infrared night vision gives you a clear picture after dark." },
  { icon: Camera, title: "Wide-angle lens", body: "A wide field of view helps you cover more of a room or driveway in one shot." },
  { icon: BadgeCheck, title: "No monthly fees", body: "It's a one-time purchase — the app and motion alerts are free to use." },
  { icon: Smartphone, title: "Free smartphone app", body: "Live view, motion alerts and playback from your phone, wherever you are." },
];

const faqs = [
  { q: "Do I need tools or an electrician to install it?", a: "No. GuardHouse is wireless — charge it, open the free app and follow the on-screen steps to get set up." },
  { q: "Are there monthly fees?", a: "No. It's a one-time purchase and the app is free. Always check the offer page for the current price and any bundle options." },
  { q: "Does it work at night?", a: "Yes — it has automatic infrared night vision that turns on in low light for a clearer picture after dark." },
  { q: "What about returns or a guarantee?", a: "The seller offers a money-back guarantee. Please see the offer page for the current return window and full terms before you buy." },
];

function CtaButton({ children = "Check Today's Price →" }: { children?: React.ReactNode }) {
  return (
    <OfferLink
      href={OFFER_URL}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 text-center text-base font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-emerald-700 active:scale-[0.99] sm:text-lg"
    >
      {children}
    </OfferLink>
  );
}

export default function GuardHouseLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* Clear advertising label (required for sponsored content) */}
      <div className="bg-gray-900 py-1.5 text-center text-[11px] font-semibold uppercase tracking-widest text-gray-300">
        Advertisement · Sponsored content
      </div>

      <article className="mx-auto max-w-2xl px-4 py-8">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white">
            <ShieldCheck width={18} height={18} />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-gray-900">GuardHouse</span>
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
          Simple Wireless Home Security — No Wires, No Monthly Fees
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          GuardHouse is a compact wireless camera with night vision and a free app.
          Set it up in minutes and keep an eye on your home from anywhere — without a
          monthly subscription.
        </p>

        {/* Hero image */}
        <div className="mt-6">
          <LpImage src={IMAGES.hero} alt="GuardHouse wireless security camera" />
        </div>

        {/* Intro */}
        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-gray-700">
          <p>
            Home security usually means drilling, contracts and a bill that never ends.
            GuardHouse takes a simpler approach: a small, fully wireless camera you set up
            yourself in a few minutes, with <strong>no monthly fees</strong>.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6"><CtaButton /></div>
        <p className="mt-2 text-center text-xs text-gray-400">Free app · No monthly fees · See offer page for price &amp; terms</p>

        {/* Features */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">What GuardHouse does</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <f.icon width={20} height={20} />
              </span>
              <h3 className="mt-3 font-bold text-gray-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.body}</p>
            </div>
          ))}
        </div>

        {/* How to use — 3 steps */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">Set up in minutes</h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {IMAGES.steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto max-w-[140px]">
                <LpImage src={s.img} alt={s.title} ratio="aspect-square" className="rounded-full" />
              </div>
              <h3 className="mt-3 font-bold text-gray-900">
                <span className="mr-1 text-emerald-600">{i + 1}.</span>{s.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{s.body}</p>
            </div>
          ))}
        </div>

        {/* See it in action — video */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">See it in action</h2>
        <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${IMAGES.videoId}`}
            title="GuardHouse in action"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* Why no monthly fees */}
        <div className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Why there are no monthly fees</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-gray-700">
            Many security systems charge an ongoing subscription for cloud storage and
            monitoring. GuardHouse is designed as a one-time purchase: you view the live
            feed and get motion alerts through the free app, so there&apos;s no recurring
            bill. (Optional accessories or storage may be available — check the offer page.)
          </p>
        </div>

        {/* Comparison */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">How it compares</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[460px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="p-3 text-left font-semibold text-gray-500"></th>
                <th className="rounded-t-lg bg-emerald-600 p-3 text-center font-bold text-white">GuardHouse</th>
                <th className="p-3 text-center font-semibold text-gray-500">Traditional system</th>
                <th className="p-3 text-center font-semibold text-gray-500">Doorbell cam</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Cost", "One-time", "Higher + install", "Varies"],
                ["Monthly fees", "none", "usually", "usually"],
                ["Setup", "DIY, wireless", "often pro install", "moderate"],
                ["Wireless & portable", true, false, false],
                ["Night vision", true, true, true],
              ].map((row, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="p-3 font-medium text-gray-700">{row[0] as string}</td>
                  {[1, 2, 3].map((c) => {
                    const v = row[c];
                    return (
                      <td key={c} className={`p-3 text-center ${c === 1 ? "bg-emerald-50 font-semibold text-emerald-700" : "text-gray-600"}`}>
                        {typeof v === "boolean" ? (
                          v ? <Check className="mx-auto text-emerald-600" width={18} height={18} /> : <X className="mx-auto text-gray-300" width={18} height={18} />
                        ) : (v as string)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-gray-400">General comparison for illustration. Features and pricing vary by product and seller.</p>
        </div>

        {/* Offer box */}
        <div className="mt-10 rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-6 text-center">
          <div className="mx-auto mb-4 max-w-xs">
            <LpImage src={IMAGES.product} alt="GuardHouse camera" ratio="aspect-square" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Get GuardHouse</h2>
          <p className="mt-1 text-gray-600">Check the current price, bundles and availability on the official offer page.</p>
          <div className="mx-auto mt-5 max-w-sm"><CtaButton /></div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-gray-600">
            <span className="inline-flex items-center gap-1"><RotateCcw width={14} height={14} className="text-emerald-600" /> Money-back guarantee (see terms)</span>
            <span className="inline-flex items-center gap-1"><Lock width={14} height={14} className="text-emerald-600" /> Secure checkout</span>
            <span className="inline-flex items-center gap-1"><Truck width={14} height={14} className="text-emerald-600" /> Shipping options at checkout</span>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:flex-row sm:text-left">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
            <RotateCcw width={26} height={26} />
          </span>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Money-back guarantee</h3>
            <p className="mt-1 text-sm text-gray-700">
              The seller backs GuardHouse with a money-back guarantee. Please review the
              return window and full terms on the offer page before purchasing.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">Frequently asked questions</h2>
        <div className="mt-4"><FaqAccordion faqs={faqs} /></div>

        {/* Final CTA */}
        <div className="mt-8"><CtaButton>Check Today&apos;s Price →</CtaButton></div>
        <OfferLink href={OFFER_URL} className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-emerald-700">
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
            &quot;GuardHouse&quot; and any related marks are the property of their respective
            owners and are used here for identification only. We may earn a commission if
            you purchase through links on this page, at no extra cost to you. Prices,
            discounts, availability, guarantees and specifications are set by the seller
            and shown on the offer page — always confirm the current details there before
            buying.
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
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-emerald-700 bg-emerald-600 p-3 sm:hidden">
        <OfferLink
          href={OFFER_URL}
          className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-emerald-700"
        >
          Check Today&apos;s Price →
        </OfferLink>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
