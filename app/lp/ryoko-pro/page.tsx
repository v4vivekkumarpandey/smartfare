import type { Metadata } from "next";
import { Check, Shield, RotateCcw, Smile, Truck } from "lucide-react";
import { LpImage } from "@/components/lp/LpImage";

const OFFER_URL = "https://www.djpcraze.com/B9JC5ZS/H7KX3ZL/?uid=44423";
const DIR = "/lp/ryoko-pro";

export const metadata: Metadata = {
  title: "Telecom Companies Tried to Get This BANNED and FAILED — Save Money and Improve Internet Speed Worldwide",
  description:
    "Save money and improve internet speed worldwide with Ryoko Pro portable WiFi. Get your FREE SIM card now — 70% off, limited time offer.",
  robots: { index: false, follow: false },
};

function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={OFFER_URL}
      target="_blank"
      rel="nofollow noopener"
      className="block w-full rounded-lg bg-green-600 px-6 py-5 text-center text-lg font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-green-700 active:scale-[0.99]"
    >
      {children}
    </a>
  );
}

function CtaLink({ children }: { children: React.ReactNode }) {
  return (
    <a href={OFFER_URL} target="_blank" rel="nofollow noopener" className="font-bold text-green-700 underline hover:text-green-900">
      {children}
    </a>
  );
}

export default function RyokoProLanding() {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="w-28">
            <LpImage
              src={`${DIR}/logo.png`}
              alt="Ryoko"
              ratio="aspect-[3/1]"
              fit="object-contain"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🇬🇧</span>
            <a
              href={OFFER_URL}
              target="_blank"
              rel="nofollow noopener"
              className="rounded bg-amber-400 px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-gray-900 hover:bg-amber-500"
            >
              ORDER NOW
            </a>
          </div>
        </div>
      </header>

      {/* ── URGENT BANNER ──────────────────────────────────── */}
      <div className="bg-amber-50 px-4 py-2 text-center text-sm text-gray-700 border-b border-amber-200">
        <strong>URGENT UPDATE</strong> – Ryoko Pro is currently on a MASSIVE SALE, however, it may not be available on the{" "}
        <a href={OFFER_URL} target="_blank" rel="nofollow noopener" className="font-bold text-blue-700 underline">
          website HERE
        </a>
        .
      </div>

      {/* ── ARTICLE ────────────────────────────────────────── */}
      <main className="mx-auto max-w-2xl px-4 py-6">

        {/* Stars + headline */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 text-amber-400">
            {"★★★★★".split("").map((s, i) => <span key={i} className="text-lg">{s}</span>)}
          </div>
          <span className="text-sm text-gray-500">4,821 likes</span>
        </div>

        <h1 className="mt-3 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl">
          Telecom Companies Tried to Get This BANNED and FAILED. Save Money and Improve Internet Speed Worldwide
        </h1>

        <div className="mt-3 inline-block rounded bg-red-600 px-3 py-1 text-sm font-extrabold uppercase tracking-wide text-white">
          SALE: 70% OFF! Until Stock Runs Out
        </div>

        {/* Hero — woman at beach */}
        <div className="mt-4">
          <LpImage
            src={`${DIR}/hero.jpg`}
            alt="Woman holding Ryoko Pro at the beach"
            ratio="aspect-video"
            fit="object-cover"
            className="rounded-lg"
            priority
          />
        </div>

        {/* Intro */}
        <p className="mt-5 leading-relaxed text-gray-700">
          <a href={OFFER_URL} target="_blank" rel="nofollow noopener" className="font-bold text-blue-700 underline">
            Ryoko Pro
          </a>{" "}
          is a pocket-size wireless modem, which creates a Wi-Fi network around itself for up to 10 devices.{" "}
          <a href={OFFER_URL} target="_blank" rel="nofollow noopener" className="font-bold text-blue-700 underline">
            And you can have your own internet anywhere, anytime.
          </a>{" "}
          Difficulties caused by searching free Wi-Fi Network in a cafe or during travelling or at home will soon be a thing of the past!
        </p>

        <p className="mt-4 leading-relaxed text-gray-700">
          When you're away from home, are you tired of having to connect to public Wi-Fi that's slow, unreliable or insecure? The Ryoko portable Wi-Fi can deliver a strong, fast and secure online connection just about wherever you go.
        </p>

        {/* ── FEATURE BOXES GRAPHIC ──────────────────────────── */}
        <h2 className="mt-8 text-xl font-extrabold text-gray-900">Why do people use this Portable Wi-Fi?</h2>

        <div className="mt-4">
          <LpImage
            src={`${DIR}/features.png`}
            alt="No contract · SIM card pre-installed · Superfast 150Mbs WiFi Speed"
            ratio="aspect-[3/1]"
            fit="object-contain"
            className="rounded-lg border border-gray-100"
          />
        </div>

        {/* Unbox image */}
        <div className="mt-6">
          <LpImage
            src={`${DIR}/unbox.jpg`}
            alt="Ryoko Pro unboxed — device, charging case and cable"
            ratio="aspect-video"
            fit="object-cover"
            className="rounded-lg"
          />
        </div>

        <p className="mt-5 leading-relaxed text-gray-700">
          It was even smaller than I expected. Fits in my hand. Internet is stable and fast — so fast you can also use it for Skype calls. —{" "}
          <em className="font-semibold">David B.</em>
        </p>

        {/* Box / muama unboxing image */}
        <div className="mt-5">
          <LpImage
            src={`${DIR}/box.jpg`}
            alt="Ryoko Pro (Muama Ryoko) in original box"
            ratio="aspect-video"
            fit="object-cover"
            className="rounded-lg"
          />
        </div>

        <p className="mt-5 leading-relaxed text-gray-700">
          Ryoko Pro has come to me ready to use with a SIM card pre-installed. So all I have to do is turn it on and use it! Ryoko covers more than 100+ countries, so I can forget about using a network abroad. What's more, with Ryoko I can stop worrying about the safety of my personal data — it protects my connection.
        </p>

        <p className="mt-4 leading-relaxed text-gray-700">
          The parcel came in time. Excellent quality. Very fast. I am very satisfied with my purchase. —{" "}
          <em className="font-semibold">Charles T.</em>
        </p>

        {/* Desk review image */}
        <div className="mt-5">
          <LpImage
            src={`${DIR}/review1.jpg`}
            alt="Using Ryoko Pro at a desk with laptop"
            ratio="aspect-video"
            fit="object-cover"
            className="rounded-lg"
          />
        </div>

        <p className="mt-5 leading-relaxed text-gray-700">
          I am always on the move and don't have a constant workplace. I no longer need to go to coffee shops and ask for Wi-Fi passwords. This device keeps me online wherever I go. Very convenient to use.
        </p>

        <p className="mt-4 leading-relaxed text-gray-700">
          I can connect my phone, my laptop and my tablet at once, and everyone gets high-speed internet! It allows connecting up to 10 devices — which saves a lot of money compared to paying for mobile data on each device separately.
        </p>

        {/* CTA text link */}
        <p className="mt-6 text-center text-base font-bold">
          <CtaLink>Get Muama Ryoko with your FREE SIM card now!</CtaLink>
        </p>

        {/* Outdoor review image */}
        <div className="mt-6">
          <LpImage
            src={`${DIR}/review2.jpg`}
            alt="Man working on laptop outdoors with Ryoko Pro"
            ratio="aspect-video"
            fit="object-cover"
            className="rounded-lg"
          />
        </div>

        <p className="mt-5 leading-relaxed text-gray-700">
          I love it. I'm using it when going to my summer house or on short road trips. Everywhere, the connection is fast and great! —{" "}
          <em className="font-semibold">Nick D.</em>
        </p>

        <p className="mt-4 leading-relaxed text-gray-700">
          I love its portable design. It is very light, smart and stylish, and easy to hold in my pocket. Battery worked for about 10 hours — that's exactly what I need when I'm on the road.
        </p>

        {/* Outdoor / car / jacket use image */}
        <div className="mt-5">
          <LpImage
            src={`${DIR}/outdoor.jpg`}
            alt="Ryoko Pro in the car and outdoors in jacket pocket"
            ratio="aspect-video"
            fit="object-cover"
            className="rounded-lg"
          />
        </div>

        <p className="mt-5 leading-relaxed text-gray-700">
          A strong internet connection in the most remote places — woods, beach, countryside. With Ryoko I can enjoy watching my favourite sports channel on my phone while I'm away from home.
        </p>

        {/* ── WHY IS THIS GADGET SPECIAL ─────────────────────── */}
        <h2 className="mt-10 text-xl font-extrabold text-gray-900">Why Is This Little Gadget So Special?</h2>

        <p className="mt-2 leading-relaxed text-gray-700">
          The smart solution to always have your own secured internet connection anywhere, anytime!
        </p>

        <ul className="mt-6 space-y-4 text-sm leading-relaxed text-gray-700">
          <li>
            <strong className="text-gray-900">→ Connected and PROTECTED anywhere.</strong> Create your own secure Wi-Fi and share it with others when travelling for business or on holiday, when outdoors, or to replace your home DSL coverage. It also gives you the ability to block unwanted web content and limit social media time via the Ryoko Pro app.
          </li>
          <li>
            <strong className="text-gray-900">→ Stay productive.</strong> With your Ryoko share Wi-Fi internet access with{" "}
            <strong>up to 10 devices</strong>. Connect your laptop, mobile phone, tablet, gaming handheld and many more. Share a secure connection with your friends and family! Reaches up to 150Mbps download speed — enjoy HD video without buffering, make video calls, browse smoothly no matter where you are.
          </li>
          <li>
            <strong className="text-gray-900">→ It Won't Suck The Life Out Of Your Battery.</strong> Never suffer from a drained battery. 3G, 4G, LTE hotspots drain your phone battery almost instantly. The Ryoko portable Wi-Fi lasts up to 10 hours.
          </li>
          <li>
            <strong className="text-gray-900">→ Improve the way you travel or work on-the-go.</strong> Stop paying roaming charges and struggling with unreliable public Wi-Fi. Connect all your devices through the{" "}
            <CtaLink>Ryoko Pro</CtaLink>.
          </li>
          <li>
            <strong className="text-gray-900">→ Save your Money & your Time.</strong> Your Ryoko Pro arrives ready to use with a SIM card already pre-installed. Turn it on and enjoy cheap, safe, high-speed 4G connections in more than 100+ countries.
          </li>
        </ul>

        {/* Checklist */}
        <div className="mt-8 space-y-3">
          {["No contract", "No hidden charges", "Top-up your data online, anytime"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                <Check width={14} height={14} strokeWidth={3} />
              </span>
              <span className="font-semibold text-gray-800">{item}</span>
            </div>
          ))}
        </div>

        {/* Don't Wait CTA block */}
        <div className="mt-10 rounded-xl border-2 border-green-600 bg-green-50 p-6 text-center">
          <p className="text-lg font-extrabold text-gray-900">Don't Wait — Get Your Own Portable Wi-Fi!</p>
          <div className="mt-4">
            <CtaButton>Get Ryoko Pro Now →</CtaButton>
          </div>
        </div>

        {/* ── WHERE CAN I GET RYOKO PRO ──────────────────────── */}
        <h2 className="mt-12 text-xl font-extrabold text-gray-900">Where Can I Get Ryoko Pro?</h2>

        <div className="mt-2 inline-block rounded-full bg-orange-500 px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-white">
          Limited time offer
        </div>

        <p className="mt-4 leading-relaxed text-gray-700">
          Ryoko Pro is not sold in regular stores. You can only get it from the{" "}
          <CtaLink>official website here</CtaLink>. Right now they're running a{" "}
          <strong>special 70% discount</strong> for our readers — but stock is limited.
        </p>

        {/* Sale product image with badge */}
        <div className="mt-5 flex justify-center">
          <div className="w-48">
            <LpImage
              src={`${DIR}/sale.png`}
              alt="Ryoko Pro — 70% off"
              ratio="aspect-square"
              fit="object-contain"
            />
          </div>
        </div>

        {/* Risk-free badges */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: RotateCcw, label: "100% Money-Back Guarantee" },
            { icon: Shield, label: "90-Day Warranty" },
            { icon: Smile, label: "Satisfaction Guaranteed" },
            { icon: Truck, label: "Free Worldwide Shipping" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center rounded-lg border border-gray-200 p-3 text-center shadow-sm">
              <Icon width={32} height={32} className="text-green-600" strokeWidth={1.5} />
              <p className="mt-2 text-xs font-bold text-gray-700">{label}</p>
            </div>
          ))}
        </div>

        {/* Main CTA button */}
        <div className="mt-6">
          <CtaButton>
            Click Here To Get A Special 70% Off Deal We've Secured For Our Readers
          </CtaButton>
        </div>

        {/* Payment logos */}
        <div className="mt-4 flex justify-center">
          <LpImage
            src={`${DIR}/payments.png`}
            alt="Visa, Mastercard, PayPal, Klarna, American Express accepted"
            ratio="aspect-[6/1]"
            fit="object-contain"
            className="w-72"
          />
        </div>

        {/* Sale section */}
        <div className="mt-8 rounded-xl border-2 border-orange-400 bg-orange-50 p-5 text-center">
          <div className="inline-block rounded bg-red-600 px-3 py-1 text-sm font-extrabold uppercase tracking-wide text-white">
            SALE!
          </div>
          <p className="mt-3 text-2xl font-extrabold text-gray-900">At Least 70% OFF</p>
          <p className="mt-1 text-base font-bold text-orange-700">You're Saving — While Supplies Last!</p>
          <div className="mt-4">
            <CtaButton>Claim Your 70% Discount Now</CtaButton>
          </div>
          <div className="mt-3 flex justify-center">
            <LpImage
              src={`${DIR}/payments.png`}
              alt="Payment methods"
              ratio="aspect-[6/1]"
              fit="object-contain"
              className="w-64"
            />
          </div>
        </div>

        {/* Disclosure */}
        <p className="mt-8 pb-8 text-xs leading-relaxed text-gray-400">
          Advertising · Sponsored content. This page is independently operated and is not the official manufacturer website. Prices, discounts, availability, warranties and specifications are set by the seller and may change. We may receive a commission from purchases made through this page.
        </p>
      </main>
    </div>
  );
}
