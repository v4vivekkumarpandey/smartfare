import type { Metadata } from "next";
import { Star, Check, Truck, Clock } from "lucide-react";
import { LpImage } from "@/components/lp/LpImage";
import { OrderForm } from "@/components/lp/OrderForm";

/**
 * Polish Total Painter landing page (islaffiliate offer 2806 / lp 5058).
 *
 * Same layout as the Fast Mower pages. Artwork goes in public/lp/totalpainter_pl/
 * using the file names below — until a file is uploaded, LpImage renders a
 * labelled placeholder, so the page is safe to ship half-illustrated.
 */
const DIR = "/lp/totalpainter_pl";
const IMAGES = {
  logo: `${DIR}/logo.jpg`,
  product: `${DIR}/product.jpg`,
  hero: `${DIR}/hero.jpg`,
  feat1: `${DIR}/feat-1.jpg`,
  feat2: `${DIR}/feat-2.jpg`,
  feat3: `${DIR}/feat-3.jpg`,
  feat4: `${DIR}/feat-4.jpg`,
  feat5: `${DIR}/feat-5.jpg`,
  kit: `${DIR}/kit.jpg`,
};

/** Extra campaign photos shown as a strip under the kit section. */
const gallery = [
  { img: `${DIR}/gallery-1.jpg`, alt: "Pas z kieszeniami na akcesoria" },
  { img: `${DIR}/gallery-2.jpg`, alt: "Przedłużka do malowania wysokich powierzchni" },
  { img: `${DIR}/gallery-3.jpg`, alt: "Malowanie kraty ogrodowej przedłużką" },
  { img: `${DIR}/gallery-4.jpg`, alt: "Total Painter gotowy do pracy" },
];

/** Vimeo id of the product clip. Empty = video section + nav link hidden. */
const VIDEO_ID: string = "";

/** What the buyer pays on delivery, per the islaffiliate campaign. */
const PRICE = "341 zł";
/** Crossed-out "before" price. Empty = no strike-through shown (no claim made). */
const PRICE_OLD: string = "";

export const metadata: Metadata = {
  title: "TOTAL PAINTER — elektryczny pistolet natryskowy 900 W",
  description:
    "Total Painter to elektryczny pistolet natryskowy z silnikiem 900 W i potrójną funkcją natrysku. Maluj dwa razy szybciej, bez śladów pędzla i smug. Darmowa dostawa i płatność przy odbiorze.",
  robots: { index: false, follow: false },
};

const heroPoints = [
  "Silnik o mocy 900 W",
  "Wygodny uchwyt do przenoszenia",
  "Funkcja potrójnego natrysku",
  "Lekki i łatwy w użyciu",
  "Zawiera akcesoria do czyszczenia",
];

const features = [
  {
    img: IMAGES.feat1,
    title: "Potrójny efekt:",
    body: "Dysza ma 3 rodzaje rozpylania, dzięki czemu dopasujesz strumień do każdej powierzchni i osiągniesz perfekcyjne wykończenie.",
  },
  {
    img: IMAGES.feat2,
    title: "Silnik 900 W:",
    body: "Moc i wytrzymałość potrzebne do każdej pracy malarskiej w domu — bez przerw i bez utraty wydajności.",
  },
  {
    img: IMAGES.feat3,
    title: "Najwyższa prędkość:",
    body: "Wykonasz wszystkie prace malarskie w o połowę krótszym czasie niż pędzlem czy wałkiem.",
  },
  {
    img: IMAGES.feat4,
    title: "Wymienny zbiornik:",
    body: "Hermetyczna pokrywa pozwala przechowywać farbę przez wiele miesięcy i wykorzystać ją ponownie.",
  },
  {
    img: IMAGES.feat5,
    title: "Lekki i praktyczny:",
    body: "Ultralekka konstrukcja i wygodny uchwyt sprawiają, że malujesz bez wysiłku i zmęczenia rąk.",
  },
];

const kitItems = [
  "1 x pistolet natryskowy",
  "1 x uchwyt do przenoszenia",
  "1 x wiskozymetr",
  "1 x rurka",
  "1 x zbiornik na farbę",
  "1 x klips do czyszczenia",
  "1 x instrukcja obsługi",
];

/**
 * TODO: swap for the campaign's approved testimonials. No customer photos came
 * with the campaign assets, so the cards show an initial instead of an avatar.
 */
const reviews = [
  {
    name: "Marek",
    body: "Malowałem cały salon i dwa pokoje w jeden weekend — pędzlem zajęłoby mi to tydzień. Efekt jest równy, bez smug i śladów pędzla. Trzy tryby natrysku naprawdę się przydają, bo inaczej maluje się ściany, a inaczej framugi.",
  },
  {
    name: "Agnieszka",
    body: "Bałam się, że będzie ciężki, a okazało się, że trzymam go bez wysiłku nawet przez dłuższą chwilę. Zbiornik z hermetyczną pokrywą to świetna sprawa — resztę farby zostawiłam na później i nie zaschła.",
  },
  {
    name: "Tomasz",
    body: "Kupiłem do remontu mieszkania i został mi na stałe. Odmalowałem płot i meble ogrodowe, wszystko wyszło profesjonalnie. Czyszczenie po pracy zajmuje chwilę, bo w zestawie są akcesoria do czyszczenia.",
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
    <p className="text-lg font-semibold text-gray-100">
      TYLKO DZIŚ <span className="text-3xl font-extrabold text-lime-400">{PRICE}</span>{" "}
      {PRICE_OLD ? (
        <span className="text-sm font-medium text-gray-400 line-through">{PRICE_OLD}</span>
      ) : null}
    </p>
  );
}

export default function TotalPainterLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* ===================== STICKY NAV ===================== */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5">
          <div className="w-28 sm:w-36">
            <LpImage
              src={IMAGES.logo}
              alt="Total Painter"
              ratio="aspect-[240/72]"
              fit="object-contain"
              className=""
            />
          </div>
          <nav className="flex items-center gap-4 text-sm font-semibold text-gray-700 sm:gap-6">
            <a href="#features" className="hidden hover:text-gray-900 sm:inline">
              Cechy
            </a>
            {VIDEO_ID ? (
              <a href="#video" className="hidden hover:text-gray-900 sm:inline">
                Wideo
              </a>
            ) : null}
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
        <div className="absolute inset-0">
          <LpImage src={IMAGES.hero} alt="" ratio="h-full" fit="object-cover" className="h-full" />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
          {/* Lewa kolumna */}
          <div className="text-white">
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              <span className="text-lime-400">TOTAL PAINTER:</span>
              <br />
              <span className="text-2xl sm:text-3xl">elektryczny pistolet natryskowy 900 W</span>
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
                Kup teraz i maluj jak profesjonalista!
              </CtaButton>
            </div>
          </div>

          {/* Prawa kolumna — produkt (zdjęcie katalogowe na białym tle) */}
          <div className="rounded-2xl bg-white p-3 shadow-2xl">
            <LpImage
              src={IMAGES.product}
              alt="Total Painter — elektryczny pistolet natryskowy"
              ratio="aspect-square"
              fit="object-contain"
              className="rounded-xl bg-white"
              priority
            />
          </div>
        </div>
      </section>

      {/* ===================== ZIELONY PASEK INTRO ===================== */}
      <section className="bg-gradient-to-b from-green-700 to-green-800">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center text-white">
          <p className="text-[15px] leading-relaxed sm:text-base">
            Nowy <strong>Total Painter</strong> to profesjonalny pistolet malarski z silnikiem o mocy
            900 W zapewniającym najwyższą wydajność. Dzięki mocy natrysku wykonasz wszystkie prace
            malarskie w o połowę krótszym czasie, uzyskując profesjonalne rezultaty — bez śladów
            pędzla i bez smug.
          </p>
          <div className="mt-7 flex justify-center">
            <CtaButton />
          </div>
        </div>
      </section>

      {/* ===================== SEKCJA CECH ===================== */}
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

      {/* ===================== WIDEO ===================== */}
      {VIDEO_ID ? (
        <section id="video" className="scroll-mt-16 bg-black">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-white">
              Wideo
            </h2>
            <div className="mx-auto mt-6 aspect-square w-full max-w-xl overflow-hidden rounded-2xl">
              <iframe
                src={`https://player.vimeo.com/video/${VIDEO_ID}?dnt=1`}
                title="Total Painter"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                className="h-full w-full"
              />
            </div>
            <div className="mt-8 flex justify-center">
              <CtaButton />
            </div>
          </div>
        </section>
      ) : null}

      {/* ===================== OPIS PRODUKTU ===================== */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl space-y-8 px-4 py-14">
          <div>
            <h2 className="text-xl font-extrabold text-green-700">Potrójny efekt</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Dysza posiada 3 rodzaje rozpylania, aby osiągnąć perfekcję w Twoich pracach. Dodatkowo
              zawiera wymienny zbiornik na farbę z hermetyczną pokrywą, dzięki której farba może być
              przechowywana przez wiele miesięcy. Silnik o mocy 900 W zapewni Ci moc i wytrzymałość,
              której potrzebujesz do wykonania każdej pracy malarskiej w domu.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-green-700">
              Najwyższa prędkość i wydajność
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Total Painter oferuje doskonałą moc i niezwykłą szybkość podczas prac malarskich w
              domu. Jest również bardzo łatwy w użyciu i super lekki, co pozwala malować bez wysiłku.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-green-700">
              Szybkie i profesjonalne rezultaty
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Niezależnie od tego, czy malujesz, remontujesz, czy wykonujesz pracę dla
              majsterkowiczów, Total Painter zapewnia profesjonalne rezultaty, z których będziesz
              dumny!
            </p>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-green-700">Przenośny pistolet do malowania</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Pożegnaj się ze śladami pędzla lub smugami! Dzięki Total Painter uzyskasz moc, szybkość
              i profesjonalną jakość rezultatów. Wyposażony w system wymiennych zbiorników z
              hermetycznym zamknięciem, pozwala zachować farbę, dzięki czemu możesz ją później
              ponownie wykorzystać. Ultralekki i praktyczny — dzięki Total Painter możesz malować jak
              prawdziwy profesjonalista.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== ZESTAW ZAWIERA ===================== */}
      <section className="bg-gradient-to-b from-green-800 to-green-900">
        <div className="mx-auto max-w-5xl px-4 py-14 text-white">
          <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
            Odmień swoje wnętrza już dziś z <span className="text-lime-400">TOTAL PAINTER!</span>
          </h2>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
            <div className="rounded-2xl bg-white/95 p-4">
              <LpImage
                src={IMAGES.kit}
                alt="Zawartość zestawu Total Painter"
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
                <div className="mt-1">
                  <PriceLine />
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-200">
                  <Truck width={16} height={16} className="text-lime-400" />
                  Darmowa dostawa w 48–72 godzin
                </p>
              </div>

              <div className="mt-6">
                <CtaButton className="w-full max-w-md sm:w-auto">
                  Kup teraz i maluj jak profesjonalista!
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GALERIA / AKCESORIA ===================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-center text-2xl font-extrabold text-green-700 sm:text-3xl">
            Total Painter w akcji
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((g) => (
              <LpImage
                key={g.img}
                src={g.img}
                alt={g.alt}
                ratio="aspect-[4/3]"
                fit="object-cover"
                className="rounded-xl"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ZADOWOLENI KLIENCI ===================== */}
      <section id="reviews" className="scroll-mt-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-green-700 sm:text-3xl">
            Opinie klientów
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
              >
                <div
                  aria-hidden="true"
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-lime-400 text-3xl font-extrabold text-gray-900"
                >
                  {r.name.charAt(0)}
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
              <Clock width={16} height={16} /> Oferta kończy się wkrótce{" "}
              <Clock width={16} height={16} />
            </span>
          </div>
          <div className="bg-gray-800 py-2 text-center text-xs font-bold uppercase tracking-wide text-white">
            Aktywna oferta: 1 x Total Painter — {PRICE} · 🚚 Darmowa wysyłka
          </div>

          <div className="rounded-b-xl border border-t-0 border-gray-200 bg-white p-6 shadow-sm">
            <OrderForm
              product="Total Painter PL"
              labels={{
                name: "Imię i nazwisko",
                phone: "Telefon",
                address: "Adres",
                email: "E-mail (zalecany do monitorowania dostawy)",
                submit: "Kup teraz",
                submitting: "Przetwarzanie…",
              }}
              isla={{
                uid: "019fb28c-270f-7f36-9386-36d8b9ba93ee",
                offer: "2806",
                lp: "5058",
                thankyoupage: "https://www.thesmartfares.online/lp/thanks",
                formKey: "8447f9e0fc8793a476047888c9b12afa8c36c86c",
              }}
            />
          </div>
        </div>
      </section>

      {/* ===================== STOPKA ===================== */}
      <footer className="bg-black text-gray-400">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs">
          <p>©2026 Total Painter – Wszelkie prawa zastrzeżone</p>
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
          Kup teraz · {PRICE}
        </a>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
