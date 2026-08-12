import type { Metadata } from "next";
import { Star, Check, Truck, Clock, Play } from "lucide-react";
import { LpImage } from "@/components/lp/LpImage";
import { OrderForm } from "@/components/lp/OrderForm";

/**
 * Czech Fast Mower by Rotorazer landing page (offer 1808 / lp 3378).
 *
 * Same product as /lp/fastmower_pl, so it reuses that page's artwork instead of
 * duplicating the image files — only the copy, the prices (CZK) and the
 * islaffiliate campaign ids differ. Drop CZ-specific photos in
 * public/lp/fastmower_cz/ and point DIR here if the campaigns ever diverge.
 */
const DIR = "/lp/fastmower_pl";
const IMAGES = {
  logo: `${DIR}/logo.png`,
  product: `${DIR}/product.png`,
  hero: `${DIR}/hero.jpg`,
  feat1: `${DIR}/feat-1.jpg`,
  feat2: `${DIR}/feat-2.jpg`,
  feat3: `${DIR}/feat-3.jpg`,
  feat4: `${DIR}/feat-4.jpg`,
  feat5: `${DIR}/feat-5.jpg`,
  kit: `${DIR}/kit.jpg`,
  review1: `${DIR}/review-1.png`,
  review2: `${DIR}/review-2.jpg`,
  review3: `${DIR}/review-3.jpg`,
};

/**
 * Vimeo id of the affiliate's product clip. It's a square (1080x1080) creative,
 * so the embed is rendered 1:1. Empty = video section + nav link hidden.
 */
const VIDEO_ID: string = "1010512945";

const PRICE = "2.003 CZK";
const PRICE_OLD = "3.499 CZK";

export const metadata: Metadata = {
  title: "FAST MOWER BY ROTORAZER — sekačka 3 v 1, kterou jste hledali",
  description:
    "FAST MOWER BY ROTORAZER je bezdrátová elektrická sekačka 3 v 1: sekačka, vyžínač a zarovnávač v jednom. Nastavitelná teleskopická rukojeť, výkonný motor a Li-Ion baterie až na 90 minut provozu. Doprava zdarma, platba na dobírku.",
  robots: { index: false, follow: false },
};

const heroPoints = [
  "Bezdrátové a dobíjecí",
  "Včetně více nožů",
  "Nastavitelný a ergonomický design pro osobní použití",
  "Vybaveno bezpečnostním spínačem a chrániči pro zajištění bezpečného používání",
];

const features = [
  {
    img: IMAGES.feat1,
    title: "Funkce 3 v 1 pro dokonalou zahradu:",
    body: "Multifunkční nože pro různá použití: sekejte plevel, prořezávejte keře a precizně zarovnávejte okraje trávníku.",
  },
  {
    img: IMAGES.feat2,
    title: "Bezdrátové napájení:",
    body: "Zapomeňte na kabely. S naší baterií s dlouhou výdrží můžete svou zahradu udržet bez poskvrny kdykoli.",
  },
  {
    img: IMAGES.feat3,
    title: "Ergonomický design:",
    body: "Lehký a snadno ovladatelný, s podpěrou do ruky a nastavitelnou teleskopickou tyčí pro vaše pohodlí.",
  },
  {
    img: IMAGES.feat4,
    title: "Nastavitelné podle vašich potřeb:",
    body: "Přizpůsobitelné úhly a výšky řezu pro dokonalý výsledek na jakémkoli povrchu.",
  },
  {
    img: IMAGES.feat5,
    title: "Bezpečnost především:",
    body: "Vybaveno bezpečnostním spínačem a chrániči pro bezrizikové použití.",
  },
];

const kitItems = [
  "1 x Fast Mower by Rotorazer®",
  "2 x 1300mAh Li-Ion baterie",
  "1 x nabíječka",
  "1 x držák do ruky",
  "4 x typy čepelí",
  "1 x klíč",
  "2 x kola",
];

const specs = [
  ["Li-Ion baterie", "3,7V 1300mAh, sestavená z 5 článků"],
  ["Napětí", "18,6–21 V"],
  ["Výkon", "75 W"],
  ["Rychlost naprázdno", "7000 otáček za minutu"],
  ["Průměr řezu", "150 mm"],
  ["Doba nabíjení", "100 minut"],
  ["Výstupní nabíjecí proud", "0,3 A"],
];

const reviews = [
  {
    name: "Alfons",
    img: IMAGES.review2,
    body: "Před pár měsíci jsem si koupil sekačku Fast Mower od Rotorazer a byla to jedna z nejlepších investic do mé zahrady. Líbí se mi, že mohu přepínat mezi různými noži podle toho, co potřebuji udělat, ať už je to sekání trávy nebo stříhání silnějších keřů. Také fakt, že je bezdrátový, je super pohodlný: mohu se pohybovat po zahradě bez starostí s kabely.",
  },
  {
    name: "Alžběta",
    img: IMAGES.review3,
    body: "Tahle sekačka 3 v 1 je prostě skvělá. Baterie vydrží dost dlouho na to, abych celou zahradu zvládla na jeden zátah, a navíc se mi líbí, jak je lehká a snadno ovladatelná. Pohodlná rukojeť a nastavitelná teleskopická tyč z ní dělají opravdu příjemný nástroj i pro toho, kdo nemá moc síly. Sousedé se už ptali, co používám, protože moje zahrada vypadá lépe než kdy dřív!",
  },
  {
    name: "Dana",
    img: IMAGES.review1,
    body: "Díky Fast Mower je péče o mou zahradu mnohem jednodušší. Je to velmi univerzální a solidní výrobek. Vyzkoušela jsem všechny nože a fungují perfektně. Ze začátku jsem potřebovala pár pokusů, než jsem si zvykla na výměnu funkcí, ale jakmile jsem to pochopila, šlo to úplně samo!",
  },
];

function Stars({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <div className="flex text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          fill={i < count ? "currentColor" : "none"}
          strokeWidth={i < count ? 0 : 1.5}
          className={i < count ? "" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

/** Světle zelené CTA tlačítko podle předlohy. */
function CtaButton({
  children = "Koupit hned",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#order"
      className={`inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 text-center text-base font-extrabold uppercase tracking-wide text-gray-900 shadow-lg shadow-lime-500/30 transition hover:bg-lime-300 active:scale-[0.99] ${className}`}
    >
      {children}
    </a>
  );
}

/** Cenový blok: dnes levněji než zítra. */
function PriceLine({ dark = false }: { dark?: boolean }) {
  return (
    <p className={`text-lg font-semibold ${dark ? "text-gray-100" : "text-gray-200"}`}>
      POUZE DNES <span className="text-3xl font-extrabold text-lime-400">{PRICE}</span>{" "}
      <span className="text-sm font-medium text-gray-400 line-through">{PRICE_OLD}</span>
    </p>
  );
}

export default function FastMowerCzLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* ===================== STICKY NAV ===================== */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5">
          <div className="w-28 sm:w-36">
            <LpImage
              src={IMAGES.logo}
              alt="Fast Mower by Rotorazer"
              ratio="aspect-[240/72]"
              fit="object-contain"
              className=""
            />
          </div>
          <nav className="flex items-center gap-4 text-sm font-semibold text-gray-700 sm:gap-6">
            <a href="#features" className="hidden hover:text-gray-900 sm:inline">
              Charakteristika
            </a>
            {VIDEO_ID ? (
              <a href="#video" className="hidden hover:text-gray-900 sm:inline">
                Video
              </a>
            ) : null}
            <a href="#reviews" className="hidden hover:text-gray-900 sm:inline">
              Recenze
            </a>
            <a
              href="#order"
              className="inline-flex items-center gap-1.5 rounded-full bg-lime-400 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-gray-900 sm:text-sm"
            >
              Koupit hned
            </a>
          </nav>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        {/* Zahradní pozadí */}
        <div className="absolute inset-0">
          <LpImage src={IMAGES.hero} alt="" ratio="h-full" fit="object-cover" className="h-full" />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
          {/* Levý sloupec */}
          <div className="text-white">
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="text-lime-400">Všestranný pomocník do vaší zahrady! 3 v 1:</span>
              <br />
              <span className="text-2xl sm:text-3xl">
                sekačka na trávu, křovinořez a ořezávač!
              </span>
            </h1>

            <ul className="mt-6 space-y-2.5">
              {heroPoints.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px] font-semibold">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-400 text-gray-900">
                    <Check width={13} height={13} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-lg font-extrabold uppercase tracking-wide text-lime-400">
              Poslední kusy se slevou!
            </p>
            <div className="mt-1">
              <PriceLine />
            </div>
            <p className="mt-2 flex items-center gap-2 text-sm text-gray-200">
              <Truck width={16} height={16} className="text-lime-400" />
              Doprava zdarma do 48–72 hodin
            </p>

            <div className="mt-6">
              <CtaButton className="w-full max-w-sm sm:w-auto">
                Koupit hned a zvolit svou zahradu!
              </CtaButton>
            </div>
          </div>

          {/* Pravý sloupec — produkt na černém pozadí */}
          <div className="rounded-2xl bg-black p-3 shadow-2xl">
            <LpImage
              src={IMAGES.product}
              alt="Fast Mower by Rotorazer — sekačka 3 v 1"
              ratio="aspect-square"
              fit="object-contain"
              className="rounded-xl bg-black"
              priority
            />
          </div>
        </div>
      </section>

      {/* ===================== ZELENÝ INTRO PRUH ===================== */}
      <section className="bg-gradient-to-b from-green-700 to-green-800">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center text-white">
          <p className="text-[15px] leading-relaxed sm:text-base">
            Transformujte svou péči o zahradu s <strong>Fast Mower by Rotorazer</strong>. Toto
            inovativní zařízení 3 v 1 vám umožňuje snadno řezat, prořezávat a ořezávat hrany díky
            svému výkonnému motoru a různým typům nožů a řezacích lan. Jeho lehká a nastavitelná
            konstrukce navíc zajišťuje, že jej kdokoli může používat pohodlně, bez námahy a zcela
            bezpečně. A to nejlepší? Funguje bez kabelů a poskytuje vám svobodu pohybu po celé
            zahradě bez omezení.
          </p>
          <div className="mt-7 flex justify-center">
            <CtaButton />
          </div>
        </div>
      </section>

      {/* ===================== CHARAKTERISTIKA ===================== */}
      <section id="features" className="scroll-mt-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((f) => (
              <div key={f.title}>
                <LpImage
                  src={f.img}
                  alt={f.title}
                  ratio="aspect-[4/3]"
                  fit="object-cover"
                  className="rounded-xl"
                />
                <p className="mt-4 text-sm font-bold text-gray-900">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== VIDEO ===================== */}
      {VIDEO_ID ? (
        <section id="video" className="scroll-mt-16 bg-black">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-white">
              Video
            </h2>
            <div className="mx-auto mt-6 aspect-square w-full max-w-xl overflow-hidden rounded-2xl">
              <iframe
                src={`https://player.vimeo.com/video/${VIDEO_ID}?dnt=1`}
                title="Fast Mower by Rotorazer"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                className="h-full w-full"
              />
            </div>
            <div className="mt-8 flex justify-center">
              <CtaButton>
                <Play width={16} height={16} className="mr-2" /> Koupit hned
              </CtaButton>
            </div>
          </div>
        </section>
      ) : null}

      {/* ===================== NABÍDKA ZAHRNUJE ===================== */}
      <section className="bg-gradient-to-b from-green-800 to-green-900">
        <div className="mx-auto max-w-5xl px-4 py-14 text-white">
          <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
            Proměňte svůj zelený prostor ještě dnes s{" "}
            <span className="text-lime-400">Fast Mower by Rotorazer</span>
          </h2>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
            <div className="rounded-2xl bg-white/95 p-4">
              <LpImage
                src={IMAGES.kit}
                alt="Obsah balení Fast Mower by Rotorazer"
                ratio="aspect-[4/3]"
                fit="object-contain"
                className="rounded-xl bg-white"
              />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-lime-400">Nabídka zahrnuje:</h3>
              <ul className="mt-4 space-y-1.5">
                {kitItems.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-gray-100">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400" />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <p className="text-base font-extrabold uppercase tracking-wide text-lime-400">
                  Poslední kusy se slevou!
                </p>
                <div className="mt-1">
                  <PriceLine dark />
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-200">
                  <Truck width={16} height={16} className="text-lime-400" />
                  Doprava zdarma do 48–72 hodin
                </p>
              </div>

              <div className="mt-6">
                <CtaButton className="w-full max-w-md sm:w-auto">
                  Koupit hned a zvolit svou zahradu!
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TECHNICKÉ SPECIFIKACE ===================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-center text-2xl font-extrabold text-green-700 sm:text-3xl">
            Technické specifikace
          </h2>
          <dl className="mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100 shadow-sm">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 px-5 py-3 text-sm">
                <dt className="font-semibold text-gray-700">{k}</dt>
                <dd className="text-right text-gray-600">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ===================== RECENZE ZÁKAZNÍKŮ ===================== */}
      <section id="reviews" className="scroll-mt-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-green-700 sm:text-3xl">
            Recenze zákazníků
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="h-20 w-20 overflow-hidden rounded-full">
                  <LpImage
                    src={r.img}
                    alt={`Recenze — ${r.name}`}
                    ratio="aspect-square"
                    fit="object-cover"
                    className="h-full w-full rounded-full"
                  />
                </div>
                <p className="mt-3 font-bold text-gray-900">{r.name}</p>
                <div className="mt-1">
                  <Stars size={16} />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                  &ldquo;{r.body}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SUPER NABÍDKA + FORMULÁŘ ===================== */}
      <section id="order" className="scroll-mt-16 bg-gray-100">
        <div className="mx-auto max-w-xl px-4 py-14">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">SUPER NABÍDKA!</h2>

          <div className="mt-4 rounded-t-xl bg-lime-400 py-2.5 text-center text-sm font-extrabold uppercase tracking-wide text-gray-900">
            <span className="inline-flex items-center gap-2">
              <Clock width={16} height={16} /> Nabídka brzy končí <Clock width={16} height={16} />
            </span>
          </div>
          <div className="bg-gray-800 py-2 text-center text-xs font-bold uppercase tracking-wide text-white">
            Aktivní nabídka: 1 x Fast Mower by Rotorazer — {PRICE} · 🚚 Doprava ZDARMA
          </div>

          <div className="rounded-b-xl border border-t-0 border-gray-200 bg-white p-6 shadow-sm">
            <OrderForm
              product="Fast Mower CZ"
              labels={{
                name: "Celé jméno",
                phone: "Telefon",
                address: "Adresa",
                submit: "Kup teď",
                submitting: "Zpracování…",
              }}
              isla={{
                uid: "019fb28c-270f-7f36-9386-36d8b9ba93ee",
                offer: "1808",
                lp: "3378",
                thankyoupage: "https://www.thesmartfares.online/lp/thanks-cz",
                formKey: "343bef4671494b657520f4e1648695266311ca2b",
              }}
            />
          </div>
        </div>
      </section>

      {/* ===================== PATIČKA ===================== */}
      <footer className="bg-black text-gray-400">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs">
          <p>©2026 - Všechna práva vyhrazena - Fast Mower by Rotorazer</p>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-gray-500">
            Reklama · Sponzorovaný obsah. Tato stránka je provozována nezávisle a není oficiálním
            webem výrobce. Ceny, slevy, dostupnost, záruky a specifikace stanovuje prodejce a mohou
            se změnit.
          </p>
        </div>
      </footer>

      {/* Přilepené CTA na mobilu */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-lime-500 bg-white p-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] sm:hidden">
        <a
          href="#order"
          className="flex items-center justify-center gap-2 rounded-full bg-lime-400 px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-gray-900"
        >
          Koupit hned · {PRICE}
        </a>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
