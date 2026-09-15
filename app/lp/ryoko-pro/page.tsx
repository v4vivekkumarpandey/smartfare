import type { Metadata } from "next";
import { Check } from "lucide-react";
import { LpImage } from "@/components/lp/LpImage";

const OFFER_URL = "/out/ryoko-pro";
const DIR = "/lp/ryoko-pro";

const IMG = {
  hero:     `${DIR}/24w05-a-basic-advertorial-43-c-us-en-at-inuse-191x1-img-h-0-t-0-bg-cl-d-no.webp`,
  bench:    `${DIR}/24w05-a-basic-advertorial-2-c-us-en-at-inuse-191x1-img-h-0-t-0-bg-cl-d-no.webp`,
  sale:     `${DIR}/image-1.webp`,
  outdoor:  `${DIR}/ryoko-pro-forest.webp`,
  features: `${DIR}/screenshot-2024-01-29-at-132701.webp`,
  box:      `${DIR}/screenshot-2024-02-05-at-175213.webp`,
  unbox:    `${DIR}/screenshot-2024-02-05-at-175313.webp`,
  desk:     `${DIR}/screenshot-2024-02-05-at-184449.webp`,
  payments: `${DIR}/without-background.webp`,
};

export const metadata: Metadata = {
  title: "Telecom Companies Tried to Get This BANNED and FAILED — Save Money and Improve Internet Speed Worldwide",
  description:
    "Save money and improve internet speed worldwide with Ryoko Pro portable WiFi. Get your FREE SIM card now — 70% off, limited time offer.",
  robots: { index: false, follow: false },
};

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={OFFER_URL}
      className={`block w-full rounded-lg bg-green-600 px-6 py-4 text-center text-base font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-green-700 active:scale-[0.99] sm:py-5 sm:text-lg ${className}`}
    >
      {children}
    </a>
  );
}

function CtaLink({ children }: { children: React.ReactNode }) {
  return (
    <a href={OFFER_URL} className="font-bold text-green-700 underline hover:text-green-900">
      {children}
    </a>
  );
}

function BlueLink({ children }: { children: React.ReactNode }) {
  return (
    <a href={OFFER_URL} className="font-bold text-blue-700 underline hover:text-blue-900">
      {children}
    </a>
  );
}

export default function RyokoProLanding() {
  return (
    <div className="min-h-screen bg-white text-gray-800 pb-20 sm:pb-0">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <span className="text-xl font-black tracking-widest text-gray-900 sm:text-2xl">RYOKO</span>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl">🇬🇧</span>
            <a
              href={OFFER_URL}
              className="rounded bg-amber-400 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-gray-900 hover:bg-amber-500 sm:px-4 sm:py-2 sm:text-sm"
            >
              ORDER NOW
            </a>
          </div>
        </div>
      </header>

      {/* ── URGENT BANNER ──────────────────────────────────── */}
      <div className="border-b border-green-200 bg-green-50 px-4 py-2 text-center text-xs leading-snug text-gray-700 sm:text-sm">
        <strong>URGENT UPDATE</strong> – Ryoko Pro is currently on a MASSIVE SALE, however, it may not be available on the{" "}
        <a href={OFFER_URL} className="font-bold text-blue-700 underline">website HERE</a>.
      </div>

      {/* ── ARTICLE ────────────────────────────────────────── */}
      <main className="mx-auto max-w-2xl px-4 py-5">

        {/* Stars */}
        <div className="flex items-center gap-2">
          <span className="text-base text-amber-400 sm:text-lg">★★★★★</span>
          <span className="text-xs text-gray-500 sm:text-sm">4,821 likes</span>
        </div>

        {/* Headline */}
        <h1 className="mt-2 text-xl font-extrabold leading-tight text-gray-900 sm:text-3xl">
          Telecom Companies Tried to Get This BANNED and FAILED. Save Money and Improve Internet Speed Worldwide
        </h1>

        <div className="mt-3 inline-block rounded bg-red-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white sm:text-sm">
          SALE: 70% OFF! Until Stock Runs Out
        </div>

        {/* Hero */}
        <div className="mt-4 overflow-hidden rounded-lg">
          <LpImage
            src={IMG.hero}
            alt="Woman holding Ryoko Pro at the beach"
            ratio="aspect-video"
            fit="object-cover"
            priority
          />
        </div>

        {/* Intro */}
        <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
          <BlueLink>Ryoko Pro</BlueLink> is a pocket-size wireless modem, which creates a Wi-Fi network around itself for up to 10 devices.{" "}
          <BlueLink>And you can have your own internet anywhere, anytime.</BlueLink>{" "}
          Difficulties caused by searching free Wi-Fi Network in cafe or during traveling or at home will soon be a thing of the past! What could be better than this?
        </p>

        <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
          When you're away from Home, are you tired of having to connect to public Wi-Fi that's slow, unreliable or insecure? The Ryoko portable Wi-Fi can deliver a strong, fast and secure online connection just about wherever you go.
        </p>

        {/* ── WHY DO PEOPLE USE ─────────────────────────────── */}
        <h2 className="mt-7 text-lg font-extrabold text-gray-900 sm:text-xl">
          Why do people use this Portable Wi-Fi?
        </h2>

        <div className="mt-3 overflow-hidden rounded-lg border border-gray-100">
          <LpImage
            src={IMG.features}
            alt="No contract · SIM card pre-installed · Superfast 150Mbs WiFi Speed"
            ratio="aspect-[3/2] sm:aspect-[3/1]"
            fit="object-contain"
          />
        </div>

        {/* Unbox flat lay */}
        <div className="mt-5 overflow-hidden rounded-lg">
          <LpImage
            src={IMG.unbox}
            alt="Ryoko Pro device, charging case and cable"
            ratio="aspect-[4/3]"
            fit="object-cover"
          />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
          It was even smaller than I expected. Fits in my hand, Internet is stable and fast. It's so fast you can also use it for skype calls. — <em className="font-semibold">David B.</em>
        </p>

        {/* Muama box unboxing */}
        <div className="mt-5 overflow-hidden rounded-lg">
          <LpImage
            src={IMG.box}
            alt="Ryoko Pro in original Muama box"
            ratio="aspect-video"
            fit="object-cover"
          />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
          Ryoko Pro has come to me ready to use <strong>with a SIM card pre-installed</strong>. So all I have to do is just turn it on and use it! Ryoko covers more than 100+ countries, so I can forget about using a network abroad. Also I'm not paying for the Ryoko portable Wi-Fi. What's more, With Ryoko I can stop worrying about the safety of my personal data, as it protects my data with secured connection.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
          The parcel came in time. Excellent quality. We're super fast. I am very satisfied with my purchase. — <em className="font-semibold">Charles T.</em>
        </p>

        {/* Desk overhead */}
        <div className="mt-5 overflow-hidden rounded-lg">
          <LpImage
            src={IMG.desk}
            alt="Using Ryoko Pro at a desk with laptop"
            ratio="aspect-video"
            fit="object-cover"
          />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
          I am always on the move and don't have a constant work place. I no longer need to go to the coffee shops and ask for Wi-Fi passwords. This device keeps me online whenever I go. Very convenient to use.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
          I can connect my phone, my laptop and my safety cables and phone at once, and thanks to all get high-speed Internet! Actually, it allows to connect up to 10 devices, which will save us a lot of money! Even paying for a mobile data plan for each of those devices. This thing is a life-saver.
        </p>

        {/* Green CTA text link */}
        <p className="mt-5 text-center text-sm font-bold sm:text-base">
          <CtaLink>Get Myoko Ryoko with your FREE SIM card now!</CtaLink>
        </p>

        {/* Man on bench */}
        <div className="mt-5 overflow-hidden rounded-lg">
          <LpImage
            src={IMG.bench}
            alt="Man working on laptop outdoors holding Ryoko Pro"
            ratio="aspect-video"
            fit="object-cover"
          />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
          I love it. I'm using it when going to my summer house or short road trips. Everywhere connection is fast and great! — <em className="font-semibold">Nick D.</em>
        </p>

        <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
          I love it's portable design. It is very light, smart and stylish, and easy to hold in my pocket. Battery worked for about 10 hours, that's what I need when I am on the road.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
          A strong internet in the most remote places, woods, beach. With Ryoko I can enjoy watching my favorite sports channel on my phone while I'm away.
        </p>

        {/* ── WHY IS THIS GADGET SPECIAL ─────────────────────── */}
        <h2 className="mt-8 text-lg font-extrabold text-gray-900 sm:text-xl">
          Why Is This Little Gadget So Special?
        </h2>

        <p className="mt-1 text-sm leading-relaxed text-gray-700 sm:text-base">
          The smart solution to always have your own secured internet connection anywhere, anytime!
        </p>

        {/* Outdoor / forest image */}
        <div className="mt-4 overflow-hidden rounded-lg">
          <LpImage
            src={IMG.outdoor}
            alt="Ryoko Pro in the car and outdoors"
            ratio="aspect-video"
            fit="object-cover"
          />
        </div>

        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-gray-700 sm:text-base">
          <li>
            <strong className="text-gray-900">→ Connected and PROTECTED anywhere.</strong> Create your own secure Wi-Fi and share it with others when travelling for business or on holiday, when outdoors, or to replace your home DSL coverage. It also gives you the ability to block unwanted web content, limit social media time, and a lot more with the Ryoko Pro app.
          </li>
          <li>
            <strong className="text-gray-900">→ Stay productive.</strong> With your Ryoko share Wi-Fi internet access with <strong>up to 10 devices.</strong> You will be able to connect to your laptop, mobile phone, handheld gaming console, laptop and many more. It reaches up to 150Mbps download speed to enjoy HD video without buffering, make video calls, browse the internet smoothly.
          </li>
          <li>
            <strong className="text-gray-900">→ It Won't Suck The Life Out Of Your Battery.</strong> Never suffer from a drained battery. 3G, 4G, LTE, and hotspots suck the power out of your battery almost instantaneously. The Ryoko portable Wi-Fi lasts up to 10 hours.
          </li>
          <li>
            <strong className="text-gray-900">→ Improve the way you travel or work on-the-go.</strong> Reduce roaming charges and stop struggling again with public Wi-Fi. Connect them all on the <CtaLink>Ryoko Pro</CtaLink>.
          </li>
          <li>
            <strong className="text-gray-900">→ Save your Money & your Time.</strong> Your Ryoko Pro arrives ready to use with a SIM card already pre-installed. Sum up it on and use! Enjoy cheap, safe, high-speed 4G connections in more than 100+ countries.
          </li>
        </ul>

        {/* Checklist */}
        <div className="mt-6 space-y-2.5">
          {["No contract", "No hidden charges", "Top-up your data online, anytime"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-white sm:h-6 sm:w-6">
                <Check width={12} height={12} strokeWidth={3} />
              </span>
              <span className="text-sm font-semibold text-gray-800 sm:text-base">{item}</span>
            </div>
          ))}
        </div>

        {/* Don't Wait */}
        <h2 className="mt-8 text-lg font-extrabold text-gray-900 sm:text-xl">
          Don't Wait - Get Your Own Portable Wi-Fi!
        </h2>

        {/* ── WHERE CAN I GET ────────────────────────────────── */}
        <h2 className="mt-8 text-lg font-extrabold text-gray-900 sm:text-xl">
          Where Can I Get Ryoko Pro?
        </h2>

        <div className="mt-2 inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white">
          Limited time offer
        </div>

        {/* Risk-Free + Sale side by side (matches original layout) */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">

          {/* Risk-Free box */}
          <div className="flex-1 rounded-lg border border-gray-200 p-4">
            <p className="text-center text-sm font-extrabold uppercase text-gray-900 sm:text-base">
              Make it Risk-Free
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { emoji: "💰", label: "100% Money-Back Guarantee" },
                { emoji: "🛡️", label: "90-Day Warranty" },
                { emoji: "😊", label: "Satisfaction Customer Guaranteed" },
                { emoji: "🚚", label: "Free Worldwide Shipping" },
              ].map(({ emoji, label }) => (
                <div key={label} className="flex flex-col items-center rounded-md bg-gray-50 p-2 text-center">
                  <span className="text-2xl">{emoji}</span>
                  <p className="mt-1 text-[11px] font-semibold leading-tight text-gray-700">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sale badge box */}
          <div className="flex w-full flex-col items-center rounded-lg border-2 border-orange-400 bg-orange-50 p-4 text-center sm:w-44 sm:shrink-0">
            <div className="inline-block rounded bg-red-600 px-2 py-0.5 text-xs font-extrabold uppercase text-white">
              SALE!
            </div>
            <div className="mt-2 w-full">
              <LpImage
                src={IMG.sale}
                alt="Ryoko Pro 70% off"
                ratio="aspect-square"
                fit="object-contain"
              />
            </div>
            <p className="mt-2 text-sm font-extrabold text-gray-900">Yours At</p>
            <p className="text-2xl font-black text-red-600">70% OFF</p>
            <p className="mt-1 text-xs font-bold text-orange-700">While Supplies Last!</p>
          </div>
        </div>

        {/* Main CTA */}
        <div className="mt-5">
          <CtaButton>
            Click Here To Get A Special 70% Off Deal We've Secured For Our Readers
          </CtaButton>
        </div>

        {/* Payment logos */}
        <div className="mt-3 flex justify-center">
          <LpImage
            src={IMG.payments}
            alt="Visa, Mastercard, PayPal, Klarna, American Express"
            ratio="aspect-[6/1]"
            fit="object-contain"
            className="w-full max-w-xs"
          />
        </div>

        {/* Disclosure */}
        <p className="mt-8 pb-6 text-xs leading-relaxed text-gray-400">
          Advertising · Sponsored content. This page is independently operated and is not the official manufacturer website. Prices, discounts, availability, warranties and specifications are set by the seller and may change. We may receive a commission from purchases made through this page.
        </p>
      </main>

      {/* ── STICKY MOBILE CTA ──────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-green-700 bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.10)] sm:hidden">
        <a
          href={OFFER_URL}
          className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white active:scale-[0.99]"
        >
          🔥 Get 70% Off — Order Now
        </a>
      </div>
    </div>
  );
}
