import type { Metadata } from "next";
import { Star, Check, Truck, Clock, ShoppingCart } from "lucide-react";
import { LpImage } from "@/components/lp/LpImage";
import { OrderForm } from "@/components/lp/OrderForm";

/**
 * Polish XL Juicer landing page (islaffiliate offer 383 / lp 772). Light layout
 * with coral accents, following the campaign's own design.
 *
 * Artwork goes in public/lp/xljuicer/ under the names below; a file that isn't
 * there yet renders a labelled placeholder instead of breaking the layout.
 */
const DIR = "/lp/xljuicer";
const IMAGES = {
  hero: `${DIR}/hero.png`,
  doctor: `${DIR}/doctor.png`,
  juicerDark: `${DIR}/juicer-dark.jpg`,
  press: `${DIR}/press.png`,
  power: `${DIR}/power.jpg`,
  level1: `${DIR}/level-1.jpg`,
  level2: `${DIR}/level-2.jpg`,
  family: `${DIR}/family.jpg`,
  offer: `${DIR}/offer.jpg`,
  /** Campaign's "fondoVideo" shot — backdrop for the video block and opinions. */
  videoBg: `${DIR}/video-bg.jpg`,
  health: `${DIR}/health.jpg`,
  videoPoster: `${DIR}/video-poster.png`,
};

/**
 * Vimeo id of the campaign's clip — a square (1:1) creative, so the embed is
 * rendered 1:1. Empty = the poster image is shown instead.
 */
const VIDEO_ID: string = "794901450";

const PRICE = "300 PLN";
/** Crossed-out "before" price. Empty = no strike-through shown (no claim made). */
const PRICE_OLD: string = "";
const PRODUCT_NAME = "XL Juicer";

export const metadata: Metadata = {
  title: "XL Juicer — świeży sok w 17 sekund",
  description:
    "XL Juicer to sokowirówka z silnikiem 600 W i szerokim otworem na całe owoce. Świeży sok bez konserwantów i cukru w zaledwie 17 sekund, do 30% więcej soku dzięki opatentowanej technologii.",
  robots: { index: false, follow: false },
};

const heroPoints = [
  "Popraw swoje zdrowie spożywając naturalne soki z owoców i warzyw zrobione w zaledwie 17 sekund.",
  "Skoncentrowane witaminy, minerały i składniki odżywcze w jednej szklance.",
  "Sokowirówka z najmocniejszym na rynku silnikiem, dzięki któremu otrzymasz do 30% więcej składników odżywczych.",
];

const levels = [
  {
    img: IMAGES.level1,
    title: "Poziom 1",
    body: "Do miękkich owoców i warzyw.",
  },
  {
    img: IMAGES.level2,
    title: "Poziom 2",
    body: "Do twardych, włóknistych produktów.",
  },
];

const offerItems = [
  "1 x XL Juicer",
  "1 x zbieracz miąższu",
  "1 x dzbanek do zbierania soku",
  "1 x bardzo duża dysza do podawania całych pokarmów bez siekania",
  "Moc 600 W",
  "2 lata gwarancji jakości",
];

/** TODO: swap for the campaign's approved testimonials. */
const reviews = [
  {
    name: "Adam",
    body: "Chciałem pić sok codziennie, ale sprzątanie po starej sokowirówce zniechęcało mnie po dwóch dniach. Tutaj wrzucam całe owoce bez krojenia, a miąższ wychodzi suchy. Robię sok przy śniadaniu i mieszczę się w kilkanaście sekund.",
  },
  {
    name: "Katarzyna",
    body: "Kupowałam soki w butelkach i wychodziło mnie to kilkaset złotych miesięcznie. Teraz robię swój z marchewki, jabłka i pomarańczy — bez cukru i konserwantów. Sokowirówka zwróciła się w niecały miesiąc.",
  },
  {
    name: "Michał",
    body: "Szeroki otwór to najlepsza część — całe jabłko wchodzi bez krojenia. Silnik radzi sobie nawet z burakiem i marchewką, a całość rozkłada się do mycia w kilka chwil.",
  },
];

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} width={size} height={size} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

/** Koralowy przycisk CTA w stylu z makiety. */
function CtaButton({
  children = "Kup",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#order"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#f4634a] px-10 py-3 text-center text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-[#f4634a]/25 transition hover:bg-[#e0553d] active:scale-[0.99] ${className}`}
    >
      {children}
    </a>
  );
}

export default function XlJuicerLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* ===================== GÓRNY BLOK ===================== */}
      <section className="bg-gray-100">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-2">
          <div>
            <h1 className="text-2xl font-extrabold leading-tight text-[#f4634a] sm:text-3xl">
              Najlepszym sposobem na zachowanie zdrowia i promiennego wyglądu jest dzienne picie
              soku!
            </h1>
            <ul className="mt-5 space-y-2.5">
              {heroPoints.map((t) => (
                <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-gray-700">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f4634a]" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <CtaButton />
            </div>
          </div>

          <LpImage
            src={IMAGES.hero}
            alt="XL Juicer ze świeżym sokiem z marchewki i pomarańczy"
            ratio="aspect-[4/3]"
            fit="object-contain"
            className=""
            priority
          />
        </div>
      </section>

      {/* ===================== STICKY NAV ===================== */}
      <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5">
          <span className="text-base font-extrabold text-gray-900">
            XL Juicer<span className="text-[#f4634a]">®</span>
          </span>
          <nav className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wide text-gray-600 sm:gap-6">
            <a href="#video" className="hidden hover:text-gray-900 sm:inline">
              Wideo
            </a>
            <a href="#reviews" className="hidden hover:text-gray-900 sm:inline">
              Opinie
            </a>
            <a
              href="#order"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#f4634a] px-5 py-2 text-xs font-extrabold uppercase tracking-wide text-white"
            >
              Kup
            </a>
          </nav>
        </div>
      </header>

      {/* ===================== CIEMNY PASEK Z PYTANIEM ===================== */}
      <section className="bg-gray-600 text-white">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center">
          <p className="text-base font-extrabold leading-snug sm:text-lg">
            Czy czujesz się zmęczony, masz problemy z koncentracją, masz nadwagę, czy Twoim włosom i
            skórze brakuje witalności, czy ciągle się przeziębiasz?
          </p>
        </div>
      </section>

      {/* ===================== SOKI VS SUPLEMENTY ===================== */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr]">
          <p className="text-sm leading-relaxed text-gray-600">
            Jeśli na któreś z powyższych pytań odpowiedziałeś twierdząco, to prawdopodobieństwo
            Twojej złej odporności jest wysokie. Dzienna dawka świeżego soku z owoców i warzyw to
            najprostszy sposób, aby dostarczyć organizmowi skoncentrowaną porcję witamin, minerałów i
            składników odżywczych – w formie, którą organizm przyswaja od razu. To rozwiązanie
            tańsze, smaczniejsze i o wiele przyjemniejsze niż kolejne tabletki i suplementy.
          </p>
          <LpImage
            src={IMAGES.doctor}
            alt="Specjalistka ds. żywienia z jabłkiem"
            ratio="aspect-square"
            fit="object-cover"
            className="rounded-full"
          />
        </div>
      </section>

      {/* ===================== SOKI PAKOWANE ===================== */}
      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <LpImage
            src={IMAGES.juicerDark}
            alt="XL Juicer w kuchni"
            ratio="aspect-[4/3]"
            fit="object-cover"
            className="rounded-lg"
          />
          <p className="text-sm leading-relaxed text-gray-600">
            Pakowane soki zawierają konserwanty, dodany cukier i często po ich zrobieniu upływają
            dni, a nawet tygodnie zanim zostaną spożyte. Są też bardzo drogie, a picie jednego
            dziennie będzie Cię kosztować fortunę pod koniec miesiąca. Stworzyliśmy{" "}
            <strong>{PRODUCT_NAME}</strong>, abyś mógł mieć swój świeżo wyciskany sok w zaledwie 17
            sekund! Bez konserwantów, bez dodatku cukru i zrobiony w zaciszu własnego domu –
            oszczędzasz czas i pieniądze, inwestując w swoje zdrowie!
          </p>
        </div>
      </section>

      {/* ===================== WIDEO ===================== */}
      <section id="video" className="relative scroll-mt-16 overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <LpImage src={IMAGES.videoBg} alt="" ratio="h-full" fit="object-cover" className="h-full" />
          <div className="absolute inset-0 bg-gray-900/80" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-center text-xl font-extrabold uppercase tracking-[0.2em] text-white">
            Wideo
          </h2>
          <div className="mt-6">
            {VIDEO_ID ? (
              <div className="mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-lg">
                <iframe
                  src={`https://player.vimeo.com/video/${VIDEO_ID}?dnt=1`}
                  title={PRODUCT_NAME}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  className="h-full w-full"
                />
              </div>
            ) : (
              <LpImage
                src={IMAGES.videoPoster}
                alt="Świeże soki z owoców i warzyw"
                ratio="aspect-[21/9]"
                fit="object-cover"
                className="rounded-lg"
              />
            )}
          </div>
        </div>
      </section>

      {/* ===================== NAJWYŻSZA JAKOŚĆ ===================== */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 pb-14 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-extrabold leading-snug text-gray-900 sm:text-2xl">
              Ta najwyższej jakości sokowirówka zapewnia najzdrowszy, świeżo wyciśnięty sok w kilka
              sekund!
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              {PRODUCT_NAME} ma najwyższą wydajność w porównaniu do innych marek dzięki ostrym
              ostrzom ze stali nierdzewnej, cichemu silnikowi o mocy 600 W oraz szerokiemu otworowi,
              który pozwala na włożenie dowolnego owocu lub warzywa w całości. Tak, dobrze czytasz!
              Możesz włożyć owoce lub warzywa bez konieczności ich krojenia lub obierania.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Dzięki opatentowanej technologii ekstrakcji otrzymujesz 30% więcej soku niż w innych
              sokowirówkach, które zazwyczaj marnują go w miąższu – w {PRODUCT_NAME} miąższ jest
              całkowicie suchy!
            </p>
            <div className="mt-6">
              <CtaButton />
            </div>
          </div>

          <LpImage
            src={IMAGES.press}
            alt="Wkładanie owoców do szerokiego otworu sokowirówki"
            ratio="aspect-[4/3]"
            fit="object-cover"
            className="rounded-lg"
          />
        </div>
      </section>

      {/* ===================== NAJWYŻSZA MOC ===================== */}
      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <LpImage
            src={IMAGES.power}
            alt="Silnik o mocy 600 W"
            ratio="aspect-[4/3]"
            fit="object-cover"
            className="rounded-lg"
          />
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">Najwyższa moc</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              W przeciwieństwie do innych sokowirówek silnik {PRODUCT_NAME} o mocy 600 W wydobywa 30%
              więcej soku niż inne podobne marki. Z tą sokowirówką spożywasz wszystkie korzyści
              płynące z owoców i warzyw – i to w zaledwie 17 sekund.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Dzieje się tak dzięki opatentowanej technologii wyciskania, która charakteryzuje się
              najmocniejszym silnikiem na rynku, zdolnym do miażdżenia i wydobywania soku z każdego
              owocu lub warzywa z łatwością, bez obierania czy krojenia. Dzięki opatentowanej
              technologii korzystasz z witamin znajdujących się w skórce i nasionach, które zwykle
              wyrzucamy, bo nie wiemy jak je spożywać.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== DWA POZIOMY ===================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-center text-xl font-extrabold text-gray-900 sm:text-2xl">
            {PRODUCT_NAME} posiada 2 poziomy intensywności
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {levels.map((l) => (
              <div key={l.title} className="text-center">
                <div className="mx-auto h-44 w-44 overflow-hidden rounded-full">
                  <LpImage
                    src={l.img}
                    alt={l.title}
                    ratio="aspect-square"
                    fit="object-cover"
                    className="h-full w-full rounded-full"
                  />
                </div>
                <p className="mt-4 font-extrabold text-gray-900">{l.title}</p>
                <p className="mt-1 text-sm text-gray-600">{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ŁATWIEJSZE NIŻ KROJENIE JABŁKA ===================== */}
      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-extrabold leading-snug text-gray-900 sm:text-2xl">
              Łatwiejsze i szybsze niż krojenie jabłka!
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Wrzucasz owoce i warzywa w całości, włączasz sokowirówkę i po kilkunastu sekundach masz
              pełną szklankę świeżego soku. Bez obierania, bez krojenia i bez czekania. Wszystkie
              części mające kontakt z żywnością rozkładają się w kilka chwil, więc mycie zajmuje
              tyle, co opłukanie deski do krojenia.
            </p>
            <div className="mt-6">
              <CtaButton />
            </div>
          </div>

          <LpImage
            src={IMAGES.family}
            alt="Rodzina pijąca świeży sok"
            ratio="aspect-[4/3]"
            fit="object-cover"
            className="rounded-lg"
          />
        </div>
      </section>

      {/* ===================== NASZA OFERTA ===================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-xl font-extrabold leading-snug text-gray-900 sm:text-2xl">
            Na co czekasz, aby naturalnie poprawić swoje zdrowie?
          </h2>

          <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
            <LpImage
              src={IMAGES.offer}
              alt="Zestaw XL Juicer"
              ratio="aspect-[4/3]"
              fit="object-contain"
              className=""
            />

            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-extrabold text-[#f4634a]">Nasza oferta obejmuje:</h3>
              <ul className="mt-4 space-y-2">
                {offerItems.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f4634a] text-white">
                      <Check width={13} height={13} strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm font-extrabold uppercase text-[#f4634a]">
                Nie przegap tej wspaniałej okazji. Tylko dziś!
              </p>
              <p className="mt-1 font-extrabold">
                <span className="text-3xl text-[#f4634a]">{PRICE}</span>{" "}
                {PRICE_OLD ? (
                  <span className="text-lg font-semibold text-gray-400 line-through">
                    {PRICE_OLD}
                  </span>
                ) : null}
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                <Truck width={14} height={14} className="text-[#f4634a]" />
                Darmowa dostawa w ciągu 48–72 godzin
              </p>

              <div className="mt-5">
                <CtaButton className="w-full sm:w-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ZADOWOLENI KLIENCI ===================== */}
      <section id="reviews" className="relative scroll-mt-16 overflow-hidden bg-gray-700 text-white">
        <div className="absolute inset-0">
          <LpImage src={IMAGES.videoBg} alt="" ratio="h-full" fit="object-cover" className="h-full" />
          <div className="absolute inset-0 bg-gray-800/90" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-center text-xl font-extrabold sm:text-2xl">Zadowoleni Klienci</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="flex flex-col items-center rounded-lg bg-white/5 p-6 text-center ring-1 ring-white/10"
              >
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f4634a] text-2xl font-extrabold text-white"
                >
                  {r.name.charAt(0)}
                </div>
                <p className="mt-3 text-sm font-bold">{r.name}</p>
                <div className="mt-1.5">
                  <Stars size={14} />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-200">
                  &bdquo;{r.body}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== NATURALNE SOKI ===================== */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-lg font-extrabold uppercase leading-snug text-gray-900 sm:text-xl">
              Zadbaj o swoje zdrowie dzięki naturalnym sokom
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Marchew, pomarańcze, truskawki, burak, jabłka czy jarmuż – każde z nich wnosi do
              szklanki inny zestaw witamin i minerałów. Dzięki szerokiemu otworowi i mocnemu silnikowi
              możesz łączyć je dowolnie i codziennie pić inny sok, bez obierania i krojenia. To
              najprostszy sposób, by owoce i warzywa naprawdę trafiały do Twojej diety.
            </p>
            <div className="mt-6">
              <CtaButton />
            </div>
          </div>

          <LpImage
            src={IMAGES.health}
            alt="Świeże owoce: truskawki, borówki, limonka i mięta"
            ratio="aspect-[4/3]"
            fit="object-cover"
            className="rounded-lg"
          />
        </div>
      </section>

      {/* ===================== SUPER OFERTA + FORMULARZ ===================== */}
      <section id="order" className="scroll-mt-16 bg-gray-100">
        <div className="mx-auto max-w-xl px-4 py-14">
          <h2 className="text-center text-3xl font-extrabold text-[#f4634a]">Super Oferta</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Wypełnij formularz, a my wyślemy Ci produkt w ciągu 48–72 godzin.
          </p>

          <div className="mt-5 rounded-t-md bg-[#f4634a] py-2.5 text-center text-sm font-extrabold uppercase tracking-wide text-white">
            <span className="inline-flex items-center gap-2">
              <Clock width={16} height={16} /> Oferta zostanie wkrótce zakończona
            </span>
          </div>

          <div className="border-x border-gray-200 bg-white px-4 py-3 text-center">
            <p className="text-xs font-semibold text-gray-700">
              Oferta aktywna: <strong>1 × {PRODUCT_NAME}®</strong> – {PRICE}
            </p>
            <div className="mt-2 flex justify-center">
              <Stars size={14} />
            </div>
          </div>

          <div className="bg-[#f4634a] py-2 text-center text-xs font-bold uppercase tracking-wide text-white">
            <span className="inline-flex items-center gap-2">
              <Truck width={14} height={14} /> Darmowa dostawa · płać za pobraniem
            </span>
          </div>

          <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 shadow-sm">
            <OrderForm
              product="XL Juicer PL"
              isla={{
                uid: "019fb28c-270f-7f36-9386-36d8b9ba93ee",
                offer: "383",
                lp: "772",
                thankyoupage: "https://www.thesmartfares.online/lp/thanks",
                formKey: "27353b66ed1bbf847590787bc4803605648f904d",
              }}
            />
          </div>
        </div>
      </section>

      {/* ===================== STOPKA ===================== */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs">
          <p>© 2026 {PRODUCT_NAME}® – Wszelkie prawa zastrzeżone</p>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-gray-500">
            Reklama · Treść sponsorowana. Ta strona jest prowadzona niezależnie i nie jest oficjalną
            witryną producenta. Ceny, rabaty, dostępność, gwarancje i specyfikacje są ustalane przez
            sprzedawcę i mogą ulec zmianie. Treści nie stanowią porady medycznej.
          </p>
        </div>
      </footer>

      {/* Przyklejone CTA na mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#f4634a] bg-white p-2.5 sm:hidden">
        <a
          href="#order"
          className="flex items-center justify-center gap-2 rounded-full bg-[#f4634a] px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-white"
        >
          Kup teraz · {PRICE} <ShoppingCart width={16} height={16} />
        </a>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
