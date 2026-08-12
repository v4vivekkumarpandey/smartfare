import type { Metadata } from "next";
import { Star, Check, Truck, Clock, ShoppingCart } from "lucide-react";
import { LpImage } from "@/components/lp/LpImage";
import { OrderForm } from "@/components/lp/OrderForm";

/**
 * Polish STOP WATT landing page (COD offer). Dark layout with green accents,
 * following the campaign's own design.
 *
 * Artwork goes in public/lp/stopwatt/ under the names below; a file that isn't
 * there yet renders a labelled placeholder instead of breaking the layout.
 */
const DIR = "/lp/stopwatt";
const IMAGES = {
  heroBg: `${DIR}/hero-bg.jpg`,
  product: `${DIR}/product.jpg`,
  saving: `${DIR}/saving.jpg`,
  benefits: `${DIR}/benefits.jpg`,
  specs: `${DIR}/specs.jpg`,
  kit: `${DIR}/kit.jpg`,
  reviewBg: `${DIR}/review-bg.jpg`,
};

/**
 * Backdrop behind the video player. The campaign's own dark-tiles shot belongs
 * here — drop it as video-bg.jpg and point this at it; until then the hero
 * backdrop stands in, since a bare black band looks unfinished.
 */
const VIDEO_BG = IMAGES.heroBg;

/**
 * Vimeo id of the campaign's clip — a square (1:1) creative, so the embed is
 * rendered 1:1. Empty = video section + nav link hidden.
 */
const VIDEO_ID: string = "1213899005";

const PRICE = "169,99 PLN";
const PRICE_OLD = "259,99 PLN";
const PRODUCT_NAME = "STOP WATT";

/**
 * islaffiliate campaign for this offer. If any id is blank the order section
 * shows a notice instead of a form, so a lead can't be silently lost by posting
 * with missing ids.
 */
const ISLA = {
  uid: "019fb28c-270f-7f36-9386-36d8b9ba93ee",
  offer: "4265",
  lp: "6776",
  thankyoupage: "https://www.thesmartfares.online/lp/thanks",
  formKey: "daf7a4b22bc567aa45a2c0e4408c4c93998e312f",
};
const FORM_READY = Boolean(ISLA.offer && ISLA.lp && ISLA.formKey);

export const metadata: Metadata = {
  title: "STOP WATT — inteligentne gniazdko obniżające rachunki za prąd",
  description:
    "STOP WATT to stabilizator napięcia Plug & Play. Podłącz go do gniazdka, ogranicz straty energii nawet o 35% i chroń lodówkę, pralkę czy klimatyzator przed skokami napięcia.",
  robots: { index: false, follow: false },
};

const benefits = [
  {
    n: "1.",
    title: "Ogranicza straty energii elektrycznej (oszczędność nawet do 35%)",
    body: "Wbudowany kondensator stabilizuje przepływ prądu i pomaga efektywniej wykorzystać energię, która wcześniej była tracona. Dzięki temu licznik rejestruje wyłącznie energię faktycznie wykorzystaną przez urządzenia.",
  },
  {
    n: "2.",
    title: "Chroni przed skokami napięcia (większe bezpieczeństwo Twojego sprzętu)",
    body: "Zaprojektowany z myślą o ochronie najcenniejszych urządzeń domowych, takich jak lodówka, pralka, klimatyzator czy zmywarka. Pomaga ograniczyć ryzyko uszkodzeń spowodowanych nagłymi wahaniami napięcia.",
  },
  {
    n: "3.",
    title: "Nie pobiera dodatkowej energii i nie wymaga konserwacji",
    body: "Urządzenie nie generuje dodatkowych kosztów użytkowania. Wystarczy podłączyć je w salonie, kuchni lub biurze, a będzie działać automatycznie i bezobsługowo przez całą dobę.",
  },
];

const specs = [
  ["Instalacja", "bezpośrednio do standardowego gniazdka 90–250 V."],
  ["Materiał", "wysokiej jakości ognioodporne tworzywo ABS."],
  ["Waga", "kompaktowa i lekka konstrukcja (zaledwie 46 g)."],
  [
    "Zastosowanie",
    "idealne do domów, mieszkań, biur oraz lokali użytkowych z urządzeniami o większym poborze mocy (nie jest przeznaczone wyłącznie do oświetlenia LED).",
  ],
];

const kitItems = ["1 × STOP WATT", "1 × Instrukcja obsługi"];

const reviews = [
  {
    name: "Marek K.",
    city: "Warszawa",
    body: "Na początku podchodziłem do tego sceptycznie, ale podłączyłem urządzenie w kuchni i po pierwszym pełnym miesiącu zauważyłem wyraźnie niższy rachunek za prąd. Dzięki temu zakup bardzo szybko się zwrócił.",
  },
  {
    name: "Anna S.",
    city: "Kraków",
    body: "W naszej okolicy często zdarzają się skoki napięcia i w zeszłym roku uszkodziła mi się elektronika w kuchence mikrofalowej. Zamontowałam dwa urządzenia STOP WATT i od tamtej pory sprzęty działają znacznie stabilniej.",
  },
  {
    name: "Piotr T.",
    city: "Wrocław",
    body: "Przesyłka dotarła bardzo szybko. Wystarczy wyjąć urządzenie z pudełka i podłączyć do gniazdka. Nie zajmuje miejsca, pracuje bezgłośnie i jest niezwykle proste w obsłudze.",
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

/** Zielony przycisk CTA w stylu z makiety. */
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
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-lime-500 px-8 py-3.5 text-center text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-lime-500/25 transition hover:bg-lime-400 active:scale-[0.99] ${className}`}
    >
      {children}
      <ShoppingCart width={16} height={16} />
    </a>
  );
}

/** Cena promocyjna obok przekreślonej ceny katalogowej. */
function PriceLine() {
  return (
    <p className="font-extrabold">
      <span className="text-3xl text-orange-500">{PRICE}</span>{" "}
      <span className="text-lg font-semibold text-orange-300/70 line-through">{PRICE_OLD}</span>
    </p>
  );
}

/** Powtarzany pasek zaufania pod przyciskami. */
function StockLine({ dark = true }: { dark?: boolean }) {
  return (
    <p className={`flex items-start gap-2 text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>
      <Truck width={14} height={14} className="mt-0.5 shrink-0 text-lime-500" />
      Ostatnie sztuki w magazynie! Szybka dostawa w 48–72 godziny.
    </p>
  );
}

export default function StopWattLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* ===================== STICKY NAV ===================== */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
          {/* Kampania nie dostarczyła pliku logo — słowny znak w tym samym stylu. */}
          <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-white sm:text-base">
            {PRODUCT_NAME}
          </span>
          <nav className="flex items-center gap-4 text-xs font-semibold text-gray-200 sm:gap-6 sm:text-sm">
            {VIDEO_ID ? (
              <a href="#video" className="hidden hover:text-white sm:inline">
                Wideo
              </a>
            ) : null}
            <a href="#benefits" className="hidden hover:text-white sm:inline">
              Cechy
            </a>
            <a href="#reviews" className="hidden hover:text-white sm:inline">
              Recenzje
            </a>
            <a
              href="#order"
              className="inline-flex items-center gap-1.5 rounded-md bg-lime-500 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white sm:text-sm"
            >
              Kup teraz <ShoppingCart width={14} height={14} />
            </a>
          </nav>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0">
          <LpImage src={IMAGES.heroBg} alt="" ratio="h-full" fit="object-cover" className="h-full" />
          <div className="absolute inset-0 bg-gray-900/85" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
          <div>
            <h1 className="text-2xl font-extrabold leading-tight text-lime-400 sm:text-3xl">
              Inteligentne gniazdko, które pomaga obniżyć rachunki za prąd i chroni Twoje urządzenia
              elektryczne.
            </h1>

            <p className="mt-5 text-sm leading-relaxed text-gray-300">
              Podłącz je do dowolnego gniazdka w domu i zacznij oszczędzać od 20% do 35% każdego
              miesiąca. Stabilizuje napięcie w instalacji elektrycznej, ogranicza skoki napięcia i
              wydłuża żywotność sprzętu AGD oraz RTV.
            </p>

            <div className="mt-6">
              <PriceLine />
            </div>

            <div className="mt-5">
              <CtaButton className="w-full sm:w-auto">Chcę oszczędzać</CtaButton>
            </div>
            <div className="mt-3">
              <StockLine />
            </div>
          </div>

          <LpImage
            src={IMAGES.product}
            alt="STOP WATT — inteligentne gniazdko"
            ratio="aspect-[4/3]"
            fit="object-cover"
            className="rounded-xl"
            priority
          />
        </div>
      </section>

      {/* ===================== ZACZNIJ OSZCZĘDZAĆ ===================== */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <LpImage
            src={IMAGES.saving}
            alt="STOP WATT chroni sprzęt AGD w całym domu"
            ratio="aspect-[4/3]"
            fit="object-cover"
            className="rounded-xl"
          />
          <div>
            <h2 className="text-xl font-extrabold uppercase leading-snug text-gray-900 sm:text-2xl">
              Zacznij oszczędzać już dziś
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Znaczna część energii elektrycznej trafiającej do Twojego domu jest marnowana w postaci
              strat cieplnych oraz niestabilnych skoków napięcia, za które nadal płacisz w
              rachunkach. Co więcej, takie wahania stopniowo zużywają podzespoły Twoich urządzeń od
              środka.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              <strong>{PRODUCT_NAME}</strong> to stabilizator napięcia typu Plug &amp; Play.
              Wystarczy podłączyć go do gniazdka – bez wymiany dostawcy energii i bez kosztownych
              modernizacji instalacji. Zainwestuj niewielką kwotę i zacznij oszczędzać na kolejnych
              rachunkach za prąd.
            </p>
            <div className="mt-6">
              <CtaButton />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== KORZYŚCI ===================== */}
      <section id="benefits" className="scroll-mt-16 bg-gray-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-wide text-gray-900 sm:text-2xl">
              Korzyści
            </h2>
            <ul className="mt-6 space-y-5">
              {benefits.map((b) => (
                <li key={b.n}>
                  <p className="text-sm font-bold text-gray-900">
                    {b.n} {b.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{b.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaButton />
            </div>
          </div>

          <LpImage
            src={IMAGES.benefits}
            alt="Stabilizacja napięcia dla sprzętu AGD i RTV"
            ratio="aspect-[4/3]"
            fit="object-cover"
            className="rounded-xl"
          />
        </div>
      </section>

      {/* ===================== WIDEO ===================== */}
      {VIDEO_ID ? (
        <section id="video" className="relative scroll-mt-16 overflow-hidden bg-black">
          <div className="absolute inset-0">
            <LpImage src={VIDEO_BG} alt="" ratio="h-full" fit="object-cover" className="h-full" />
            <div className="absolute inset-0 bg-black/75" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 py-14">
            <div className="mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-2xl">
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
            <div className="mt-8 flex justify-center">
              <CtaButton>Chcę oszczędzać</CtaButton>
            </div>
          </div>
        </section>
      ) : null}

      {/* ===================== SPECYFIKACJA ===================== */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-wide text-gray-900 sm:text-2xl">
              Specyfikacja techniczna
            </h2>
            <ul className="mt-6 space-y-3">
              {specs.map(([k, v]) => (
                <li key={k} className="flex gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-500 text-white">
                    <Check width={13} height={13} strokeWidth={3} />
                  </span>
                  <span className="text-gray-600">
                    <strong className="font-bold text-gray-900">{k}:</strong> {v}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <LpImage
            src={IMAGES.specs}
            alt="STOP WATT w gniazdku w kuchni"
            ratio="aspect-[4/3]"
            fit="object-cover"
            className="rounded-xl"
          />
        </div>
      </section>

      {/* ===================== W ZESTAWIE ===================== */}
      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-4">
            <LpImage
              src={IMAGES.kit}
              alt="Zawartość zestawu STOP WATT"
              ratio="aspect-[4/3]"
              fit="object-contain"
              className="rounded-xl"
            />
          </div>

          <div>
            <h2 className="text-xl font-extrabold uppercase text-gray-900 sm:text-2xl">
              W zestawie
            </h2>
            <ul className="mt-5 space-y-2.5">
              {kitItems.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-500 text-white">
                    <Check width={13} height={13} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <PriceLine />
            </div>
            <div className="mt-5">
              <CtaButton className="w-full sm:w-auto">Chcę oszczędzać</CtaButton>
            </div>
            <div className="mt-3 space-y-1.5">
              <StockLine dark={false} />
              <p className="text-xs leading-relaxed text-gray-500">
                Liczba produktów objętych promocją jest ograniczona. Po wyczerpaniu zapasów cena
                powraca do regularnej wartości {PRICE_OLD}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== OPINIE KLIENTÓW ===================== */}
      <section id="reviews" className="relative scroll-mt-16 overflow-hidden bg-gray-700 text-white">
        <div className="absolute inset-0">
          <LpImage src={IMAGES.reviewBg} alt="" ratio="h-full" fit="object-cover" className="h-full" />
          <div className="absolute inset-0 bg-gray-700/90" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-center text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
            Opinie klientów
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="flex flex-col items-center rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10"
              >
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-lime-500 text-2xl font-extrabold text-white"
                >
                  {r.name.charAt(0)}
                </div>
                <p className="mt-3 text-sm font-bold">
                  {r.name} <span className="font-normal text-gray-300">({r.city})</span>
                </p>
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

      {/* ===================== SUPER OFERTA + FORMULARZ ===================== */}
      <section id="order" className="scroll-mt-16 bg-gray-100">
        <div className="mx-auto max-w-xl px-4 py-14">
          <h2 className="text-center text-2xl font-extrabold uppercase text-gray-900">
            Super oferta
          </h2>

          <div className="mt-4 rounded-t-md bg-lime-500 py-2.5 text-center text-sm font-extrabold uppercase tracking-wide text-white">
            <span className="inline-flex items-center gap-2">
              <Clock width={16} height={16} /> Oferta wkrótce wygaśnie{" "}
              <Clock width={16} height={16} />
            </span>
          </div>

          <div className="border-x border-gray-200 bg-white px-4 py-3 text-center">
            <p className="text-xs font-semibold text-gray-700">
              Aktualna oferta: <strong>1 × {PRODUCT_NAME}</strong> – {PRICE}
            </p>
            <div className="mt-2 flex justify-center">
              <Stars size={14} />
            </div>
          </div>

          <div className="bg-lime-500 py-2 text-center text-xs font-bold uppercase tracking-wide text-white">
            <span className="inline-flex items-center gap-2">
              <Truck width={14} height={14} /> Dostawa w ciągu 48–72 godzin
            </span>
          </div>

          <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 shadow-sm">
            {FORM_READY ? (
              <OrderForm
                product="Stop Watt PL"
                isla={{
                  uid: ISLA.uid,
                  offer: ISLA.offer,
                  lp: ISLA.lp,
                  thankyoupage: ISLA.thankyoupage,
                  formKey: ISLA.formKey,
                }}
              />
            ) : (
              <p className="rounded-md bg-amber-50 p-4 text-center text-sm font-semibold text-amber-800">
                Formularz zamówienia zostanie podłączony po uzupełnieniu danych kampanii
                (offer / lp / _key).
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ===================== STOPKA ===================== */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs">
          <p>© 2026 {PRODUCT_NAME} – Wszelkie prawa zastrzeżone</p>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-gray-500">
            Reklama · Treść sponsorowana. Ta strona jest prowadzona niezależnie i nie jest oficjalną
            witryną producenta. Ceny, rabaty, dostępność, gwarancje i specyfikacje są ustalane przez
            sprzedawcę i mogą ulec zmianie. Podane oszczędności zależą od instalacji elektrycznej
            oraz sposobu użytkowania urządzeń.
          </p>
        </div>
      </footer>

      {/* Przyklejone CTA na mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-lime-600 bg-gray-900 p-2.5 sm:hidden">
        <a
          href="#order"
          className="flex items-center justify-center gap-2 rounded-md bg-lime-500 px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-white"
        >
          Kup teraz · {PRICE} <ShoppingCart width={16} height={16} />
        </a>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
