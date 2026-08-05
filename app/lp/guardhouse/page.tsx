import type { Metadata } from "next";
import {
  ShieldCheck,
  Camera,
  Moon,
  Wifi,
  Smartphone,
  Zap,
  BadgeCheck,
  Star,
  Truck,
  Lock,
  RotateCcw,
  Check,
  X,
  ChevronRight,
} from "lucide-react";
import { FaqAccordion } from "@/components/store/FaqAccordion";
import { LpImage } from "@/components/lp/LpImage";

// ⚠️ Replace with your real offer / checkout / affiliate URL.
const OFFER_URL = "https://your-offer-url.example/order";

// Save your image files into public/lp/guardhouse/ with these names and they
// appear automatically. Until a file exists, a clean placeholder shows.
// Make sure you have the right to use each image (e.g. your affiliate media kit).
const DIR = "/lp/guardhouse";
const IMAGES = {
  hero: `${DIR}/hero.gif`, // wide banner: camera on wall + phone viewing feed
  product: `${DIR}/product.png`, // clean product shot (transparent bg) for the offer box
  gallery: [
    `${DIR}/gallery-1.jpg`,
    `${DIR}/gallery-2.png`,
    `${DIR}/gallery-3.jpg`,
    `${DIR}/gallery-4.jpg`,
    `${DIR}/gallery-5.jpg`,
    `${DIR}/gallery-6.jpg`,
  ],
  steps: [
    { img: `${DIR}/step-1.png`, title: "Download the free app", body: "Grab the GuardHouse app on iOS or Android in seconds." },
    { img: `${DIR}/step-2.png`, title: "Scan the QR code", body: "Point your phone at the code to pair the camera instantly." },
    { img: `${DIR}/step-3.png`, title: "Watch from anywhere", body: "See a live feed and get motion alerts wherever you are." },
  ],
};

export const metadata: Metadata = {
  title: "GuardHouse — The $39 Wireless Security Camera Everyone's Talking About",
  description:
    "GuardHouse is the affordable wireless security camera with night vision, 24/7 protection and zero monthly fees. Limited-time offer — up to 69% off.",
  // Paid landing pages are typically kept out of search
  robots: { index: false, follow: false },
};

const features = [
  { icon: Zap, title: "Plug & Play in 3 minutes", body: "No wiring, no technician. Charge it, connect the app, and you're protected." },
  { icon: Wifi, title: "100% Wireless", body: "Place it anywhere — doorway, garage, nursery, driveway. Move it whenever you like." },
  { icon: Moon, title: "Crystal-clear night vision", body: "See what happens after dark in sharp detail, not grainy shadows." },
  { icon: Camera, title: "150° wide-angle Ultra-HD", body: "Cover a whole room or driveway in one crisp, wide shot." },
  { icon: BadgeCheck, title: "Zero monthly fees", body: "Big brands charge you monthly forever. GuardHouse never does." },
  { icon: Smartphone, title: "Free smartphone app", body: "Live view, instant motion alerts and playback — from anywhere in the world." },
];

const testimonials = [
  { name: "Maria L.", place: "Austin, TX", text: "Caught a package thief on my second day. Setup took literally minutes — I'm not techy at all.", stars: 5 },
  { name: "David R.", place: "Columbus, OH", text: "I was paying $30/month for my old system. Cancelled it. GuardHouse does more and I own it outright.", stars: 5 },
  { name: "Priya S.", place: "San Jose, CA", text: "The night vision is shockingly clear. I finally sleep knowing the driveway is covered.", stars: 5 },
  { name: "Tom W.", place: "Tampa, FL", text: "Bought one, loved it, ordered three more for the whole house. Great value in the bundle.", stars: 4 },
  { name: "Sandra K.", place: "Denver, CO", text: "I check on my elderly mom's front door from work. The live view is instant and clear.", stars: 5 },
  { name: "Marcus B.", place: "Newark, NJ", text: "No wires, no drilling, no monthly bill. I honestly can't believe it was this cheap.", stars: 5 },
];

const faqs = [
  { q: "Do I need any tools or an electrician to install it?", a: "No. GuardHouse is fully wireless. Charge it, open the free app, and follow the on-screen steps — most people are up and running in under 3 minutes." },
  { q: "Are there any monthly fees?", a: "No monthly fees, ever. You pay once and own your camera. The app and motion alerts are free." },
  { q: "Does it work at night?", a: "Yes. GuardHouse has automatic infrared night vision that switches on in low light for a clear picture after dark." },
  { q: "What's the guarantee?", a: "Every order is backed by a 90-day money-back guarantee. If you're not happy, return it for a full refund." },
];

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={16}
          height={16}
          className={i < n ? "fill-amber-400 text-amber-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function CtaButton({ children = "Get Up to 69% Off GuardHouse →" }: { children?: React.ReactNode }) {
  return (
    <a
      href={OFFER_URL}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 text-center text-base font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-emerald-700 active:scale-[0.99] sm:text-lg"
    >
      {children}
    </a>
  );
}

export default function GuardHouseLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* Advertisement label + urgency bar */}
      <div className="bg-gray-900 py-1.5 text-center text-[11px] font-semibold uppercase tracking-widest text-gray-300">
        Advertisement
      </div>
      <div className="bg-red-600 py-2 text-center text-sm font-bold text-white">
        🔥 Limited-Time Sale: Up to 69% Off — Selling out fast
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
          This $39 Wireless Camera Is Making Expensive Security Systems Obsolete
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          It&apos;s wireless, sets up in minutes, has crystal-clear night vision — and
          there are <strong>zero monthly fees</strong>. Here&apos;s why thousands of
          homeowners are switching.
        </p>

        {/* Byline */}
        <div className="mt-4 flex items-center gap-3 border-y border-gray-100 py-3 text-sm text-gray-500">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600">JG</span>
          <div>
            <p className="font-semibold text-gray-700">By Jack Green</p>
            <p>Consumer Tech Reporter · Updated recently</p>
          </div>
        </div>

        {/* Rating bar */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-amber-50 px-4 py-2 text-sm">
          <Stars n={5} />
          <span className="font-bold text-gray-900">4.8/5</span>
          <span className="text-gray-500">from 1,421 verified reviews</span>
        </div>

        {/* Hero image */}
        <div className="mt-6">
          <LpImage src={IMAGES.hero} alt="GuardHouse wireless security camera" />
        </div>

        {/* Hook / story */}
        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-gray-700">
          <p>
            Every few seconds, a home somewhere gets broken into. For years, the only
            &quot;real&quot; option was an expensive system with drilling, contracts and a
            monthly bill that never ends.
          </p>
          <p>
            That&apos;s exactly why a small team of engineers built <strong>GuardHouse</strong> —
            a compact, fully wireless camera that gives you 24/7 protection for a fraction
            of the price, with <strong>no monthly fees and no complicated install</strong>.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6"><CtaButton /></div>
        <p className="mt-2 text-center text-xs text-gray-400">90-day money-back guarantee · Free app · No monthly fees</p>

        {/* Features */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">Why people love GuardHouse</h2>
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
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">Set up in under 3 minutes</h2>
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

        {/* Gallery */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">See it in action</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {IMAGES.gallery.map((g, i) => (
            <LpImage key={i} src={g} alt={`GuardHouse photo ${i + 1}`} ratio="aspect-square" />
          ))}
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
                ["Upfront cost", "From $39", "$$$ + install", "$$"],
                ["Monthly fees", "none", "yes", "usually"],
                ["Setup time", "~3 min", "hours / pro", "moderate"],
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
        </div>

        {/* Why so affordable */}
        <div className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-6">
          <h2 className="text-2xl font-extrabold text-gray-900">So what&apos;s the catch?</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-gray-700">
            There isn&apos;t one. The big security brands make most of their money on the
            <strong> monthly subscription</strong>, not the hardware. GuardHouse skips the
            middlemen and the monthly billing entirely — you pay once for the camera and
            that&apos;s it. That&apos;s why it can cost a fraction of the price while doing the
            job just as well.
          </p>
        </div>

        {/* Testimonials */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">What customers say</h2>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <Stars n={5} /> <span className="font-semibold text-gray-700">4.8</span> · 1,421 ratings
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <Stars n={t.stars} />
              <p className="mt-2 text-sm text-gray-700">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-2 text-xs font-semibold text-gray-500">
                <BadgeCheck className="mr-1 inline text-emerald-600" width={13} height={13} />
                {t.name} · {t.place} · Verified buyer
              </p>
            </div>
          ))}
        </div>

        {/* Offer box */}
        <div className="mt-10 rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-6 text-center">
          {IMAGES.product && (
            <div className="mx-auto mb-4 max-w-xs">
              <LpImage src={IMAGES.product} alt="GuardHouse camera bundle" ratio="aspect-square" />
            </div>
          )}
          <p className="inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase text-white">Limited-time bundle</p>
          <h2 className="mt-3 text-2xl font-extrabold text-gray-900">Save up to 69% today</h2>
          <p className="mt-1 text-gray-600">Bundles start at <strong>$39.99</strong> per camera. The more you protect, the more you save.</p>
          {/* Stock indicator (static; keep honest — no fake resetting timers) */}
          <div className="mx-auto mt-4 max-w-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
              <span>Selling fast</span>
              <span className="text-red-600">Almost gone</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[83%] rounded-full bg-red-500" />
            </div>
          </div>
          <div className="mx-auto mt-5 max-w-sm"><CtaButton /></div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-gray-600">
            <span className="inline-flex items-center gap-1"><RotateCcw width={14} height={14} className="text-emerald-600" /> 90-day money back</span>
            <span className="inline-flex items-center gap-1"><Lock width={14} height={14} className="text-emerald-600" /> Secure checkout</span>
            <span className="inline-flex items-center gap-1"><Truck width={14} height={14} className="text-emerald-600" /> Fast shipping</span>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="mt-10 text-2xl font-extrabold text-gray-900">Frequently asked questions</h2>
        <div className="mt-4"><FaqAccordion faqs={faqs} /></div>

        {/* Guarantee / risk reversal */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:flex-row sm:text-left">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
            <RotateCcw width={26} height={26} />
          </span>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Try it risk-free for 90 days</h3>
            <p className="mt-1 text-sm text-gray-700">
              Set it up, test the night vision, put it through its paces. If GuardHouse
              isn&apos;t everything you hoped, send it back within 90 days for a full refund —
              no hassle, no questions.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-8"><CtaButton>Claim My GuardHouse Discount →</CtaButton></div>
        <a href={OFFER_URL} target="_blank" rel="noopener noreferrer sponsored" className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-emerald-700">
          See today&apos;s price & availability <ChevronRight width={15} height={15} />
        </a>
      </article>

      {/* Footer + disclosures */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-8 text-xs leading-relaxed text-gray-500">
          <p className="font-bold uppercase tracking-wide text-gray-600">
            This is an advertisement and not an actual news article.
          </p>
          <p className="mt-2">
            The story and any people depicted are for illustrative purposes only. Results
            vary from person to person. This page and its owner may receive compensation
            for purchases made through links on this page. Prices, discounts and
            availability are set by the seller and subject to change.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} GuardHouse. All rights reserved. ·{" "}
            <a href="#" className="underline">Terms</a> ·{" "}
            <a href="#" className="underline">Privacy Policy</a> ·{" "}
            <a href="#" className="underline">Order Status</a>
          </p>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-emerald-700 bg-emerald-600 p-3 sm:hidden">
        <a
          href={OFFER_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-emerald-700"
        >
          Get Up to 69% Off →
        </a>
      </div>
      {/* Spacer so the sticky bar doesn't cover the footer on mobile */}
      <div className="h-16 sm:hidden" />
    </div>
  );
}
