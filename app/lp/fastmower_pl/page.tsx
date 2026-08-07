import type { Metadata } from "next";
import { Star, Check, Truck, Clock } from "lucide-react";
import { LpImage } from "@/components/lp/LpImage";
import { OrderForm } from "@/components/lp/OrderForm";

// Każde CTA przechodzi przez wewnętrzne przekierowanie (ukrywa link partnerski).
// Prawdziwy adres docelowy znajduje się w lib/offers.ts pod tym slugiem.
const OFFER_URL = "/go/offer/fastmower_pl";

const DIR = "/lp/fastmower_pl";
const IMAGES = {
  logo: `${DIR}/logo.webp`,
  product: `${DIR}/product.jpg`,
  hero: `${DIR}/hero.jpg`,
  feat1: `${DIR}/feat-1.jpg`,
  feat2: `${DIR}/feat-2.jpg`,
  feat3: `${DIR}/feat-3.jpg`,
  feat4: `${DIR}/feat-4.jpg`,
  kit: `${DIR}/kit.jpg`,
  review: `${DIR}/review-1.jpg`,
};

export const metadata: Metadata = {
  title: "FAST MOWER — kosiarka 3 w 1, której szukałeś",
  description:
    "FAST MOWER to bezprzewodowa kosiarka elektryczna 3 w 1: kosiarka, podkaszarka i trymer do krawędzi w jednym urządzeniu. Regulowany wysięgnik teleskopowy, mocny silnik i wydajna bateria. Darmowa dostawa i płatność za pobraniem.",
  robots: { index: false, follow: false },
};

const heroPoints = [
  "Regulowany wysięgnik teleskopowy",
  "3 różne pozycje",
  "Mocny silnik",
  "Zasilany wydajną baterią",
];

const features = [
  {
    img: IMAGES.feat1,
    title: "Funkcja 3 w 1 dla idealnego ogrodu:",
    body: "Wielofunkcyjne ostrza do różnych zastosowań: tnij chwasty, przycinaj krzewy i precyzyjnie wykańczaj krawędzie trawnika.",
  },
  {
    img: IMAGES.feat2,
    title: "Bezprzewodowe zasilanie:",
    body: "Zapomnij o kablach! Dzięki długowiecznej baterii możesz dbać o swój ogród w dowolnym momencie i miejscu.",
  },
  {
    img: IMAGES.feat3,
    title: "Ergonomiczna konstrukcja:",
    body: "Lekka i łatwa w obsłudze, z wygodnym uchwytem i regulowanym wysięgnikiem teleskopowym zapewniającym maksymalny komfort.",
  },
  {
    img: IMAGES.feat4,
    title: "Dostosowanie do potrzeb:",
    body: "Regulowany wysięgnik teleskopowy pozwala uzyskać wygodną pozycję pracy i dopasować urządzenie do Twojego wzrostu oraz rodzaju zadania.",
  },
];

const kitItems = [
  "1 x Fast Mower",
  "2 x akumulator litowo-jonowy 1300 mAh",
  "1 x ładowarka",
  "1 x Wspornik dłoni",
  "1 x Duża przegroda",
  "1 x mała przegroda",
  "2 x żelazne ostrze",
  "2 x Plastikowe ostrze",
  "3 x Okrągłe ostrze",
  "2 x lina do cięcia trawy",
  "1 x Klucz do nakrętek",
  "1 x rama antykolizyjna",
  "1 x para kół",
  "1 x Pokrowiec",
  "1 x Klucz płaski",
  "1 x śrubokręt",
  "1 x Śruba",
  "1 x Instrukcja obsługi",
];

const reviews = [
  {
    name: "Dana",
    img: IMAGES.review,
    body: "Fast Mower sprawił, że pielęgnacja mojego ogrodu stała się znacznie łatwiejsza. To bardzo wszechstronny i solidny produkt. Użyłem wszystkich ostrzy i działają doskonale. Początkowo potrzebowałem kilku prób, aby przyzwyczaić się do zmiany funkcji, ale gdy już się nauczyłem, stało się to bardzo proste!",
  },
  {
    name: "Marek",
    img: IMAGES.review,
    body: "Wreszcie jedno narzędzie zamiast trzech. Koszę trawę, podcinam krzewy i wykańczam krawędzie bez zmiany sprzętu. Bateria wytrzymuje na cały ogród, a waga jest naprawdę niewielka.",
  },
  {
    name: "Katarzyna",
    img: IMAGES.review,
    body: "Bardzo wygodna i lekka. Regulowany wysięgnik sprawia, że pracuję bez bólu pleców. Dostawa była szybka, a jakość wykonania mnie pozytywnie zaskoczyła. Gorąco polecam!",
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

/** Jasnozielony przycisk CTA w stylu z makiety. */
function CtaButton({
  children = "Kup teraz",
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

/** Blok ceny: dziś taniej niż jutro. */
function PriceLine() {
  return (
    <p className="text-lg font-semibold text-gray-200">
      DZIŚ TYLKO <span className="text-3xl font-extrabold text-lime-400">333 PLN</span>{" "}
      <span className="text-sm font-medium text-gray-400 line-through">JUTRO 449 PLN</span>
    </p>
  );
}

export default function FastMowerLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* ===================== STICKY NAV ===================== */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5">
          <div className="w-28 sm:w-36">
            <LpImage
              src={IMAGES.logo}
              alt="Fast Mower"
              ratio="aspect-[240/72]"
              fit="object-contain"
              className=""
            />
          </div>
          <nav className="flex items-center gap-4 text-sm font-semibold text-gray-700 sm:gap-6">
            <a href="#features" className="hidden hover:text-gray-900 sm:inline">
              Cechy
            </a>
            <a href="#reviews" className="hidden hover:text-gray-900 sm:inline">
              Recenzje
            </a>
            <a
              href="#order"
              className="inline-flex items-center gap-1.5 rounded-full bg-lime-400 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-gray-900 sm:text-sm"
            >
              Kup teraz
            </a>
          </nav>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        {/* Tło ogrodowe */}
        <div className="absolute inset-0">
          <LpImage
            src={IMAGES.hero}
            alt=""
            ratio="h-full"
            fit="object-cover"
            className="h-full"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
          {/* Lewa kolumna */}
          <div className="text-white">
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="text-lime-400">FAST MOWER:</span>
              <br />
              kosiarka 3 w 1, której szukałeś!
            </h1>

            <ul className="mt-6 space-y-2.5">
              {heroPoints.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-[15px] font-semibold">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-400 text-gray-900">
                    <Check width={13} height={13} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-lg font-extrabold uppercase tracking-wide text-lime-400">
              Ostatnie przecenione egzemplarze!
            </p>
            <div className="mt-1">
              <PriceLine />
            </div>
            <p className="mt-2 flex items-center gap-2 text-sm text-gray-200">
              <Truck width={16} height={16} className="text-lime-400" />
              Darmowa dostawa w 48–72 godzin
            </p>

            <div className="mt-6">
              <CtaButton className="w-full max-w-sm sm:w-auto">
                Kup teraz i odkryj swój ogród!
              </CtaButton>
            </div>
          </div>

          {/* Prawa kolumna — produkt na czarnym tle */}
          <div className="rounded-2xl bg-black p-3 shadow-2xl">
            <LpImage
              src={IMAGES.product}
              alt="Fast Mower — kosiarka 3 w 1"
              ratio="aspect-square"
              fit="object-contain"
              className="rounded-xl bg-black"
              priority
            />
          </div>
        </div>
      </section>

      {/* ===================== ZIELONY PASEK INTRO ===================== */}
      <section className="bg-gradient-to-b from-green-700 to-green-800">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center text-white">
          <p className="text-[15px] leading-relaxed sm:text-base">
            Masz dość używania trzech różnych narzędzi do pielęgnacji ogrodu?{" "}
            <strong>FAST MOWER</strong> to idealne rozwiązanie dla Ciebie! Innowacyjna bezprzewodowa
            kosiarka elektryczna, która łączy trzy funkcje w jednym urządzeniu: kosiarkę,
            podkaszarkę i trymer do krawędzi trawnika. Odkryj wszystkie jej wyjątkowe funkcje i
            ułatw sobie pielęgnację ogrodu!
          </p>
          <div className="mt-7 flex justify-center">
            <CtaButton />
          </div>
        </div>
      </section>

      {/* ===================== SEKCJA CECH ===================== */}
      <section id="features" className="scroll-mt-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-4">
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

      {/* ===================== ZESTAW ZAWIERA ===================== */}
      <section className="bg-gradient-to-b from-green-800 to-green-900">
        <div className="mx-auto max-w-5xl px-4 py-14 text-white">
          <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
            Odmień swoją przestrzeń zieloną już dziś z <span className="text-lime-400">FAST MOWER!</span>
          </h2>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
            <div className="rounded-2xl bg-white/95 p-4">
              <LpImage
                src={IMAGES.kit}
                alt="Zawartość zestawu Fast Mower"
                ratio="aspect-[4/3]"
                fit="object-contain"
                className="rounded-xl bg-white"
              />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-lime-400">Zestaw zawiera:</h3>
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
                  Ostatnie produkty w wyprzedaży!
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-100">
                  TYLKO DZIŚ <span className="text-3xl font-extrabold text-lime-400">333 PLN</span>{" "}
                  <span className="text-sm font-medium text-gray-300 line-through">JUTRO 449 PLN</span>
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-200">
                  <Truck width={16} height={16} className="text-lime-400" />
                  Darmowa dostawa w 48–72 godzin
                </p>
              </div>

              <div className="mt-6">
                <CtaButton className="w-full max-w-md sm:w-auto">
                  Kup teraz i zrewolucjonizuj swój ogród!
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ZADOWOLENI KLIENCI ===================== */}
      <section id="reviews" className="scroll-mt-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-center text-2xl font-extrabold text-green-700 sm:text-3xl">
            Zadowoleni klienci
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
                    alt={`Opinia — ${r.name}`}
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

      {/* ===================== SUPER OFERTA + FORMULARZ ===================== */}
      <section id="order" className="scroll-mt-16 bg-gray-100">
        <div className="mx-auto max-w-xl px-4 py-14">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">SUPER OFERTA!</h2>

          <div className="mt-4 rounded-t-xl bg-lime-400 py-2.5 text-center text-sm font-extrabold uppercase tracking-wide text-gray-900">
            <span className="inline-flex items-center gap-2">
              <Clock width={16} height={16} /> Oferta kończy się wkrótce <Clock width={16} height={16} />
            </span>
          </div>
          <div className="bg-gray-800 py-2 text-center text-xs font-bold uppercase tracking-wide text-white">
            🚚 Darmowa wysyłka
          </div>

          <div className="rounded-b-xl border border-t-0 border-gray-200 bg-white p-6 shadow-sm">
            <OrderForm offerHref={OFFER_URL} />
          </div>
        </div>
      </section>

      {/* ===================== STOPKA ===================== */}
      <footer className="bg-black text-gray-400">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs">
          <p>©2026 Fast Mower – Wszelkie prawa zastrzeżone</p>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-gray-500">
            Reklama · Treść sponsorowana. Ta strona jest prowadzona niezależnie i nie jest oficjalną
            witryną producenta. Ceny, rabaty, dostępność, gwarancje i specyfikacje są ustalane przez
            sprzedawcę i mogą ulec zmianie.
          </p>
        </div>
      </footer>

      {/* Przyklejone CTA na mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-lime-500 bg-white p-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] sm:hidden">
        <a
          href="#order"
          className="flex items-center justify-center gap-2 rounded-full bg-lime-400 px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-gray-900"
        >
          Kup teraz · 333 PLN
        </a>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
