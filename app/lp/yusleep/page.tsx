import type { Metadata } from "next";
import {
  Moon,
  Star,
  Quote,
  Brain,
  AlarmClock,
  Coffee,
  Leaf,
  ShieldCheck,
  FlaskConical,
  MapPin,
  Gift,
  Check,
  Truck,
  Lock,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { FaqAccordion } from "@/components/store/FaqAccordion";
import { LpImage } from "@/components/lp/LpImage";
import { OfferLink } from "@/components/lp/OfferLink";

// Every CTA goes through the internal redirect (cloaks the affiliate link).
// The real destination lives in lib/offers.ts under this slug.
const OFFER_URL = "/go/offer/yusleep";

const DIR = "/lp/yusleep";
const IMAGES = {
  hero: `${DIR}/hero.webp`,
  product: `${DIR}/product.webp`,
  supplementFacts: `${DIR}/supplement-facts.png`,
  bonuses: `${DIR}/bonuses.webp`,
};

export const metadata: Metadata = {
  title: "Yu Sleep™ — Plant-Based Liquid Sleep Support",
  description:
    "Yu Sleep is a plant-based liquid formula with botanical ingredients and a low 0.9 mg of melatonin — two droppers as part of your nightly wind-down routine.",
  robots: { index: false, follow: false },
};

const trustPills = ["Non-habit forming", "Made in USA", "GMP certified", "60-day guarantee"];

const problems = [
  { icon: Brain, title: "A racing mind at bedtime", body: "When your thoughts won't switch off, drifting off feels impossible. Yu Sleep is made to be part of a calming pre-bed routine." },
  { icon: AlarmClock, title: "Waking in the small hours", body: "Stirring at night and struggling to settle again is frustrating. A gentle, low-dose formula is designed to fit your nightly routine." },
  { icon: Coffee, title: "Groggy mornings", body: "Heavy doses can leave you foggy. Yu Sleep uses just 0.9 mg of melatonin — a light touch, not a knockout." },
];

const steps = [
  { n: 1, title: "Take 2 droppers", body: "About 30 minutes before bed. A fast-absorbing liquid — no pills to swallow." },
  { n: 2, title: "Ease into your evening", body: "Ingredients chosen to help you relax and signal that it's time to wind down." },
  { n: 3, title: "Wake up clear-headed", body: "A gentle, low-dose formula designed to leave you refreshed, not groggy." },
];

const ingredients = [
  { name: "Red Tart Cherry Juice Concentrate", body: "A natural source often associated with a calm transition into the evening." },
  { name: "Magnesium Glycinate", body: "A gentle, well-absorbed form of magnesium." },
  { name: "Apigenin", body: "A flavonoid found in chamomile, long used in calming bedtime teas." },
  { name: "Lemon Balm Extract", body: "A traditional botanical used to help ease everyday tension." },
  { name: "5-HTP (Griffonia seed extract)", body: "A plant-sourced amino acid included in the blend." },
  { name: "L-Theanine", body: "An amino acid naturally found in tea leaves, associated with a calm, relaxed feeling." },
  { name: "GABA", body: "A naturally occurring compound included to round out the blend." },
  { name: "Melatonin (0.9 mg)", body: "A low, precise dose commonly used to support a normal sleep routine." },
  { name: "Vitamin B2 & B6", body: "Everyday vitamins included as part of the formula." },
];

const reviews = [
  { name: "Mary D.", city: "Tampa, FL", body: "It's become part of my wind-down. My evenings feel calmer and I'm sleeping more soundly than I have in a while." },
  { name: "Lisa M.", city: "Chicago, IL", body: "I like that it's a liquid, not a pill. A couple of droppers before bed fits easily into my routine." },
  { name: "Susan R.", city: "Denver, CO", body: "Something this gentle fitting so easily into my night surprised me. My evenings feel more relaxed now." },
  { name: "Matthew T.", city: "Bran, OH", body: "No harsh aftertaste, no fuss. I take it, I read for a bit, and I feel ready to settle down." },
  { name: "Rachel M.", city: "Springfield, OH", body: "Adding Yu Sleep to my evening routine helped me build a calmer close to the day. I look forward to bedtime now." },
  { name: "David K.", city: "Austin, TX", body: "The dropper makes it simple. Two droppers about half an hour before bed and it's part of my nightly ritual." },
];

const bonuses = [
  { title: "The Wind Down Routine Bundle", body: "Bedtime stories as eBook + audio to help you unwind. See the offer page for current bundle details.", value: "Free bonus" },
  { title: "Younger & Happier While You Sleep", body: "An eBook on building healthy evening and sleep habits.", value: "Free eBook" },
  { title: "Bedtime Snacks Guide", body: "A quick guide to evening foods and habits that can affect your rest.", value: "Free guide" },
];

const faqs = [
  { q: "How do I take Yu Sleep?", a: "Most people take two droppers about 30 minutes before bed, as part of their evening wind-down routine. Always follow the directions on the label and check the offer page for full usage details." },
  { q: "What's in it?", a: "Yu Sleep is a plant-based liquid blend that includes tart cherry, magnesium glycinate, L-theanine, lemon balm, 5-HTP, GABA and a low 0.9 mg of melatonin, plus vitamins B2 and B6. The complete supplement facts are shown on the label and the official offer page." },
  { q: "Is it habit-forming?", a: "Yu Sleep is formulated to be non-habit forming and uses a low, precise dose. As with any supplement, check with your doctor if you take other medications, are pregnant or nursing, or have a medical condition." },
  { q: "Is there a guarantee?", a: "The seller backs Yu Sleep with a 60-day money-back guarantee. Please see the offer page for the current return window and full terms before you order." },
  { q: "How fast will it arrive?", a: "Orders typically ship within 24 hours. Delivery estimates, shipping options and any current promotions are shown at checkout on the offer page." },
];

function Stars({ className = "text-amber-400" }: { className?: string }) {
  return (
    <div className={`flex ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} width={16} height={16} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

function CtaButton({ children = "Get Yu Sleep Tonight →" }: { children?: React.ReactNode }) {
  return (
    <OfferLink
      href={OFFER_URL}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-4 text-center text-base font-extrabold uppercase tracking-wide text-white shadow-lg shadow-green-500/25 transition hover:bg-green-600 active:scale-[0.99] sm:text-lg"
    >
      {children}
    </OfferLink>
  );
}

export default function YuSleepLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* Promo announcement bar */}
      <div className="flex items-center justify-center gap-3 bg-[#2a1560] px-4 py-2 text-center text-[11px] font-semibold text-violet-100 sm:text-xs">
        <span>Limited-time bundle savings &amp; free shipping on larger supplies — see offer page</span>
        <OfferLink
          href={OFFER_URL}
          className="hidden shrink-0 rounded-full bg-green-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white sm:inline-flex"
        >
          Order Now →
        </OfferLink>
      </div>

      {/* ===================== HERO ===================== */}
      <header className="bg-gradient-to-b from-[#6d28d9] via-[#5b21b6] to-[#4c1d95] text-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-6">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white">
                <Moon width={18} height={18} />
              </span>
              <span className="text-lg font-extrabold tracking-tight">Yu Sleep™</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Stars />
              <span className="text-violet-200">Loved by thousands</span>
            </div>
          </div>

          {/* Product image */}
          <div className="mx-auto mt-6 max-w-md">
            <LpImage
              src={IMAGES.hero}
              alt="Yu Sleep liquid sleep formula bottles"
              ratio="aspect-[4/3]"
              fit="object-contain"
              className="rounded-2xl bg-white/5"
            />
          </div>

          <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
            Your nightly wind-down
          </p>
          <h1 className="mt-3 text-center text-3xl font-extrabold leading-tight sm:text-5xl">
            Yu Sleep™ — wind down, relax,{" "}
            <span className="text-green-400">ease into sleep.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-violet-100 sm:text-lg">
            A nighttime liquid formula with{" "}
            <span className="font-semibold text-green-300">plant-based botanical ingredients</span>{" "}
            and a low 0.9 mg of melatonin — designed to fit your evening routine, without the pills.
          </p>

          {/* CTAs */}
          <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
            <CtaButton />
            <a
              href="#reviews"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-white/10"
            >
              See what customers say →
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-violet-100">
            <span className="inline-flex items-center gap-1"><Leaf width={14} height={14} className="text-green-400" /> Plant-based</span>
            <span className="inline-flex items-center gap-1"><RotateCcw width={14} height={14} className="text-green-400" /> 60-day guarantee</span>
            <span className="inline-flex items-center gap-1"><Truck width={14} height={14} className="text-green-400" /> Ships in 24h</span>
          </div>
        </div>
      </header>

      {/* Social-proof strip */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5 text-center">
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
            <Stars />
            <p className="text-sm font-semibold text-gray-700">
              Loved by thousands who&apos;ve made Yu Sleep part of their nightly routine
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {trustPills.map((p) => (
              <span key={p} className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                <Check width={13} height={13} className="text-green-600" /> {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Advertisement label (compliance) */}
      <p className="bg-white pt-6 text-center text-[10px] font-semibold uppercase tracking-widest text-gray-300">
        Advertisement · Sponsored content
      </p>

      {/* ===================== WHY A ROUTINE ===================== */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          A calmer close to your <span className="text-violet-700">day</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[17px] leading-relaxed text-gray-600">
          Everyday stress and late screens can make it hard to switch off. Yu Sleep is built to
          fit into a simple, calming pre-bed routine.
        </p>

        <figure className="mt-8 rounded-2xl bg-violet-50 p-6">
          <Quote width={22} height={22} className="text-violet-400" />
          <blockquote className="mt-2 text-lg font-medium italic leading-relaxed text-gray-800">
            &ldquo;A better night doesn&apos;t start at bedtime — it starts with a routine you can
            actually keep.&rdquo;
          </blockquote>
          <figcaption className="mt-2 text-sm font-semibold text-violet-700">— The Yu Sleep approach</figcaption>
        </figure>

        <div className="mt-8 space-y-4">
          {problems.map((p) => (
            <div key={p.title} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <p.icon width={22} height={22} />
              </span>
              <div>
                <h3 className="font-bold text-gray-900">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== THREE STEPS ===================== */}
      <section className="bg-[#160e2e] text-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-center text-3xl font-extrabold">
            A simple routine, <span className="text-green-400">in three steps</span>
          </h2>
          <div className="mt-10 space-y-6">
            {steps.map((s) => (
              <div key={s.n} className="flex items-start gap-5 rounded-2xl bg-white/5 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500 text-xl font-extrabold text-white">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-violet-100">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-sm"><CtaButton>Start tonight →</CtaButton></div>
        </div>
      </section>

      {/* ===================== THE FORMULA ===================== */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-violet-500">The formula</p>
        <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
          What&apos;s <span className="text-violet-700">inside</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[17px] leading-relaxed text-gray-600">
          A plant-based blend with a light touch of melatonin. Here&apos;s the full label — always
          review the supplement facts before you buy.
        </p>

        <div className="mx-auto mt-8 max-w-xs">
          <LpImage src={IMAGES.supplementFacts} alt="Yu Sleep supplement facts label" ratio="aspect-[3/4]" fit="object-contain" className="rounded-xl border border-gray-200 bg-white" />
        </div>

        <div className="mt-10 divide-y divide-gray-100">
          {ingredients.map((ing) => (
            <div key={ing.name} className="flex items-start gap-4 py-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FlaskConical width={22} height={22} />
              </span>
              <div>
                <h3 className="font-bold text-gray-900">{ing.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{ing.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== REVIEWS ===================== */}
      <section id="reviews" className="bg-gradient-to-b from-[#4c1d95] to-[#2e1065] text-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-center text-3xl font-extrabold">
            What customers are <span className="text-green-400">saying.</span>
          </h2>
          <p className="mt-2 text-center text-xs text-violet-200">
            Individual experiences shared by customers. Results vary and are not guaranteed.
          </p>

          {/* Featured review */}
          <div className="mt-8 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 font-bold text-white">JN</span>
              <div>
                <p className="font-bold">Jenna N.</p>
                <p className="text-xs text-violet-200">Boston, MA</p>
              </div>
              <div className="ml-auto"><Stars /></div>
            </div>
            <p className="mt-4 text-lg font-medium leading-relaxed">
              &ldquo;It took a couple of weeks to become a habit, but now my evenings feel so much
              calmer. The dropper is easy, there&apos;s no aftertaste, and I genuinely look forward
              to my wind-down routine.&rdquo;
            </p>
          </div>

          {/* Review grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-2xl bg-white p-5 text-gray-800">
                <Stars />
                <p className="mt-3 text-sm leading-relaxed text-gray-700">&ldquo;{r.body}&rdquo;</p>
                <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-gray-900">
                  {r.name} <span className="inline-flex items-center gap-0.5 font-normal text-gray-400"><MapPin width={11} height={11} /> {r.city}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MID CTA BAND ===================== */}
      <section className="bg-[#5b21b6] text-white">
        <div className="mx-auto max-w-2xl px-4 py-12 text-center">
          <Moon width={32} height={32} className="mx-auto text-green-400" />
          <h2 className="mt-3 text-3xl font-extrabold">Give your evenings a calmer close</h2>
          <p className="mx-auto mt-2 max-w-md text-violet-100">
            Add Yu Sleep to your nightly routine and give your evenings the calm wind-down they deserve.
          </p>
          <div className="mx-auto mt-6 max-w-sm"><CtaButton>Get Yu Sleep tonight →</CtaButton></div>
        </div>
      </section>

      {/* ===================== BONUSES ===================== */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Bonuses, <span className="text-violet-700">on the house.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[17px] text-gray-600">
          Select multi-month bundles include free bonus guides. See the offer page for current bundles.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {bonuses.map((b) => (
            <div key={b.title} className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                <Gift width={22} height={22} />
              </span>
              <span className="mt-3 inline-block rounded bg-green-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-700">{b.value}</span>
              <h3 className="mt-2 font-bold text-gray-900">{b.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== OFFER BOX ===================== */}
      <section className="mx-auto max-w-2xl px-4 pb-4">
        <div className="rounded-2xl border-2 border-green-500 bg-green-50 p-6 text-center">
          <div className="mx-auto mb-4 max-w-xs">
            <LpImage src={IMAGES.product} alt="Yu Sleep bottle" ratio="aspect-square" fit="object-contain" className="rounded-xl bg-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Get Yu Sleep</h2>
          <p className="mt-1 text-gray-600">
            2-, 3- and 6-month bundles are available. Check current pricing, savings and free
            bonuses on the official offer page.
          </p>
          <div className="mx-auto mt-5 flex max-w-sm flex-wrap justify-center gap-2">
            {["2 Month", "3 Month · Popular", "6 Month · Best value"].map((b) => (
              <span key={b} className="rounded-full border border-green-300 bg-white px-3 py-1 text-xs font-semibold text-green-700">{b}</span>
            ))}
          </div>
          <div className="mx-auto mt-5 max-w-sm"><CtaButton>Check Today&apos;s Price →</CtaButton></div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-gray-600">
            <span className="inline-flex items-center gap-1"><RotateCcw width={14} height={14} className="text-green-600" /> 60-day money-back guarantee (see terms)</span>
            <span className="inline-flex items-center gap-1"><Lock width={14} height={14} className="text-green-600" /> Secure checkout</span>
            <span className="inline-flex items-center gap-1"><ShieldCheck width={14} height={14} className="text-green-600" /> GMP certified</span>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="mx-auto max-w-2xl px-4 py-10">
        <h2 className="text-2xl font-extrabold text-gray-900">Frequently asked questions</h2>
        <div className="mt-4"><FaqAccordion faqs={faqs} /></div>

        <div className="mt-8"><CtaButton>Get Yu Sleep Tonight →</CtaButton></div>
        <OfferLink href={OFFER_URL} className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-green-700">
          See price &amp; availability <ChevronRight width={15} height={15} />
        </OfferLink>
      </section>

      {/* ===================== FOOTER + DISCLOSURES ===================== */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-8 text-xs leading-relaxed text-gray-500">
          <p className="font-semibold text-gray-600">Advertising disclosure</p>
          <p className="mt-2">
            This is an advertisement, not a news article or editorial. This page is operated
            independently and is not the official manufacturer&apos;s website. &quot;Yu Sleep&quot;
            and any related marks are the property of their respective owners and are used here
            for identification only. We may earn a commission if you purchase through links on
            this page, at no extra cost to you. Prices, discounts, availability, guarantees and
            specifications are set by the seller and shown on the offer page — always confirm the
            current details there before buying.
          </p>
          <p className="mt-3">
            These statements have not been evaluated by the Food and Drug Administration. This
            product is a dietary supplement and is not intended to diagnose, treat, cure or
            prevent any disease. It is not a substitute for professional medical advice or
            treatment. Results vary from person to person; testimonials reflect individual
            experiences and are not a guarantee of results. Consult your physician before use,
            especially if you are pregnant, nursing, taking medication or have a medical condition.
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
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-green-600 bg-green-500 p-3 sm:hidden">
        <OfferLink
          href={OFFER_URL}
          className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-green-700"
        >
          Get Yu Sleep Tonight →
        </OfferLink>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
