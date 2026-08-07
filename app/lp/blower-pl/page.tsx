import type { Metadata } from "next";
import {
  Star,
  Check,
  CirclePlay,
  Truck,
  Zap,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { FaqAccordion } from "@/components/store/FaqAccordion";
import { LpImage } from "@/components/lp/LpImage";
import { OrderForm } from "@/components/lp/OrderForm";

// Każde CTA przechodzi przez wewnętrzne przekierowanie (ukrywa link partnerski).
// Prawdziwy adres docelowy znajduje się w lib/offers.ts pod tym slugiem.
const OFFER_URL = "/go/offer/blower-pl";

const DIR = "/lp/blower-pl";
const IMAGES = {
  logo: `${DIR}/logo.webp`,
  product: `${DIR}/product.jpg`,
  featBattery: `${DIR}/feat-battery.jpg`,
  featCollage: `${DIR}/feat-collage.jpg`,
  featTurbine: `${DIR}/feat-turbine.jpg`,
  review1: `${DIR}/review-1.jpg`,
  review2: `${DIR}/review-2.jpg`,
  review3: `${DIR}/review-3.jpg`,
  banner: `${DIR}/banner.png`,
};

export const metadata: Metadata = {
  title: "Wydajna dmuchawa — bezprzewodowa dmuchawa 3 w 1 o mocy 3000 W",
  description:
    "Bezprzewodowa dmuchawa 3 w 1 o mocy 3000 W — czyszczenie ogrodów, ścieżek i patio z prędkością powietrza do 320 km/h, bez kabli i wysiłku. Płatność za pobraniem i darmowa wysyłka.",
  robots: { index: false, follow: false },
};

const heroPoints = [
  "2 baterie 40V 4000 mAh w zestawie: 12 godzin rzeczywistej pracy",
  "Przepływ powietrza 320 km/h i ssanie 1720 m³/h: nic nie zostaje na ziemi",
  "Wytrzymała tytanowa gwiazda z 32 ostrzami, które kruszą kamienie, żwir i gruz bez zapychania",
  "Szybka ładowarka w zestawie: pełne naładowanie w zaledwie 40 minut",
  "55-litrowy worek z przezroczystym okienkiem do sprawdzania poziomu napełnienia",
  "Tylko 3 kg wagi: można go używać godzinami bez zmęczenia",
];

const offerPoints = [
  "2 lata gwarancji",
  "Dostępna dostawa",
  "Bezpłatna wysyłka i dostawa w ciągu 24–48 godzin",
  "Wsparcie telefoniczne przed i po zakupie",
  "100% gwarancja zwrotu pieniędzy",
];

const features = [
  {
    img: IMAGES.featBattery,
    caption: "Dmuchawa o prędkości 320 km/h i zasysanie 1720 m³/h",
    body: "Potężny silnik bezszczotkowy napędza turbinę z prędkością do 180 000 obrotów na minutę, generując przepływ powietrza do 320 km/h. Wytwarza objętość ssania 1720 m³/h, zdolną do zasysania liści, gruzu, brudu, kamieni i żwiru bez wysiłku.",
  },
  {
    img: IMAGES.featCollage,
    caption: "Waży zaledwie 3 kg, dzięki czemu można go używać przez wiele godzin bez żadnego wysiłku",
    body: "Lekki jak piórko, może być używany przez wiele godzin bez zmęczenia, idealny również dla osób starszych. Pojemny 55-litrowy worek na śmieci ma przezroczyste okienko, idealne do sprawdzania poziomu napełnienia. Utrzymuje porządek w ogrodach, na ścieżkach i gankach, szybko i łatwo zasysając liście, odpady, brud, żwir i kamienie, bez marnowania czasu.",
  },
  {
    img: IMAGES.featTurbine,
    caption: "Rozdrabnia kamienie, żwir i gałęzie bez blokowania się",
    body: "Wytrzymała tytanowa gwiazda tnąca z 32 ostrzami skutecznie rozdrabnia i kruszy zasysany materiał. Niezniszczalna i objęta dożywotnią gwarancją – nie ulega uszkodzeniu nawet podczas zasysania dużych kamieni lub kawałków metalu. Funkcję rozdrabniania można włączyć lub wyłączyć w zależności od potrzeb.",
  },
];

const reviews = [
  {
    name: "Piotr Kowalski",
    date: "20-10-2025",
    img: IMAGES.review1,
    body: "To zdecydowanie najlepsza dmuchawa, jaką używałem do sprzątania ogrodu. Duży przepływ powietrza (320 km/h) skutecznie usuwa zanieczyszczenia, a tryb ssania (1720 m³/h) świetnie zbiera liście",
  },
  {
    name: "Anna Kowalczyk",
    date: "11-09-2025",
    img: IMAGES.review2,
    body: "Używam tej dmuchawy ogrodowej od kilku tygodni i całkowicie zmieniła sposób, w jaki dbam o mój ogród. Strumień powietrza jest wystarczająco silny, aby przesuwać mokre liście i drobne zanieczyszczenia, a funkcja ssania ułatwia ich zbieranie",
  },
  {
    name: "Paweł Zieliński",
    date: "05-09-2025",
    img: IMAGES.review3,
    body: "To narzędzie ogrodowe przerosło moje oczekiwania. Bez problemu usuwa liście, gałązki i drobne zanieczyszczenia, a dwie baterie zapewniają wystarczający czas pracy na całym podwórku. Jest lekkie, dobrze wyważone i bardzo łatwe w obsłudze. Jestem bardzo zadowolony z jego wydajności i polecam każdemu, kto szuka wydajnego i niezawodnego pomocnika do ogrodu",
  },
];

const ratingBars = [
  { label: "5/5", pct: 92 },
  { label: "4/5", pct: 68 },
  { label: "3/5", pct: 40 },
  { label: "2/5", pct: 16 },
  { label: "1/5", pct: 8 },
];

const faqs = [
  { q: "Czy mogę zapłacić przy odbiorze?", a: "Tak! Dla Twojej wygody i bezpieczeństwa oferujemy płatność za pobraniem – zapłacisz bezpośrednio kurierowi przy odbiorze paczki." },
  { q: "Jak długo trwa dostawa?", a: "Dostawa trwa od 24 do 48 godzin." },
  { q: "Czy mogę uzyskać pomoc przed i po zakupie?", a: "Tak, nasza obsługa klienta jest dostępna zarówno przed, jak i po zakupie." },
  { q: "Czy mogę zwrócić produkt?", a: "Tak! Jeśli nie będziesz zadowolony, oferujemy 100% gwarancję zwrotu pieniędzy." },
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

function CtaButton({ children = "Kup teraz", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <a
      href="#order"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-orange-400 to-orange-600 px-8 py-4 text-center text-lg font-extrabold uppercase tracking-wide text-white shadow-lg shadow-orange-500/30 transition hover:from-orange-500 hover:to-orange-700 active:scale-[0.99] ${className}`}
    >
      <CirclePlay width={22} height={22} />
      {children}
    </a>
  );
}

function PriceBlock() {
  return (
    <div className="text-center">
      <div className="rounded-t-xl bg-green-600 py-2 text-center text-lg font-extrabold uppercase tracking-wide text-white">
        Ograniczony czas
      </div>
      <div className="rounded-b-xl border border-t-0 border-green-200 bg-green-50 px-4 py-4">
        <div className="flex items-end justify-center gap-3">
          <span className="text-5xl font-extrabold text-green-600">255 zł</span>
          <span className="pb-1 text-2xl font-semibold text-gray-400">
            Zamiast <span className="line-through">999 zł</span>
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Ten produkt jest obecnie oglądany przez <strong>+365 osób</strong>. Pośpiesz się do wyczerpania zapasów
        </p>
      </div>
    </div>
  );
}

export default function BlowerLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* ===================== PASEK PROMOCYJNY ===================== */}
      <div className="sticky top-0 z-50 flex items-center justify-between gap-2 bg-gradient-to-r from-green-600 via-green-600 to-red-600 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white sm:text-xs">
        <span className="hidden sm:inline">Tylko dziś: 70% zniżki – darmowa wysyłka!</span>
        <span className="sm:mx-auto">Płatność za pobraniem i darmowa wysyłka</span>
        <a
          href="#order"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gray-900 px-4 py-1.5 text-white"
        >
          <CirclePlay width={15} height={15} /> Kup teraz
        </a>
      </div>

      {/* ===================== HERO ===================== */}
      <header className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid items-start gap-8 md:grid-cols-2">
          {/* Lewa kolumna */}
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
              Wydajna dmuchawa
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              Ta bezprzewodowa dmuchawa 3 w 1 o mocy 3000 W umożliwia czyszczenie ogrodów, ścieżek i patio za
              jednym razem, usuwając mokre liście i ciężkie zanieczyszczenia bez użycia kabli i wysiłku.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">Ocena Klienta: 4.8/5</span>
              <Stars />
            </div>

            <div className="mt-5">
              <LpImage
                src={IMAGES.product}
                alt="Bezprzewodowa dmuchawa ogrodowa 3 w 1"
                ratio="aspect-square"
                fit="object-contain"
                className="rounded-2xl bg-white"
                priority
              />
            </div>

            <ul className="mt-5 space-y-2">
              {[
                "14-dniowa gwarancja satysfakcji lub zwrot pieniędzy",
                "Zamówienie telefoniczne z operatorem",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-semibold uppercase text-gray-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                    <Check width={13} height={13} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Prawa kolumna */}
          <div>
            <PriceBlock />

            <ul className="mt-5 space-y-3">
              {heroPoints.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                    <Check width={13} height={13} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-center">
              <CtaButton className="w-full max-w-md" />
            </div>

            <div className="mt-6">
              <LpImage
                src={IMAGES.featCollage}
                alt="Dmuchawa w akcji"
                ratio="aspect-video"
                fit="object-cover"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ===================== SEKCJA CECH ===================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 py-3 text-center text-xl font-extrabold uppercase tracking-wide text-white">
            Usuwanie wszelkiego rodzaju zabrudzeń z milimetrową precyzją
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.caption}>
                <p className="mb-3 text-center text-sm font-bold text-gray-900">{f.caption}</p>
                <LpImage src={f.img} alt={f.caption} ratio="aspect-square" fit="object-cover" className="rounded-xl" />
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <CtaButton />
          </div>
        </div>
      </section>

      {/* ===================== OPINIE ===================== */}
      <section id="reviews" className="bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-center text-2xl font-extrabold text-gray-900">
            Opinie klientów (ponad 17 250 zadowolonych klientów!)
          </h2>
          <div className="mt-2 flex justify-center">
            <Stars size={22} />
          </div>

          {/* Rozkład ocen */}
          <div className="mx-auto mt-6 max-w-md space-y-1.5">
            {ratingBars.map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <span className="w-8 text-xs font-semibold text-gray-500">{r.label}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Karty opinii */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="font-bold text-gray-900">{r.name}</p>
                <div className="mt-1"><Stars size={14} /></div>
                <div className="mt-3">
                  <LpImage src={r.img} alt={`Opinia — ${r.name}`} ratio="aspect-square" fit="object-cover" className="rounded-xl" />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">{r.body}</p>
                <p className="mt-3 text-xs font-semibold text-green-700">Data weryfikacji: {r.date}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <CtaButton />
          </div>
        </div>
      </section>

      {/* ===================== DRUGI BLOK OFERTY + FORMULARZ ===================== */}
      <section id="order" className="scroll-mt-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <LpImage
                src={IMAGES.product}
                alt="Bezprzewodowa dmuchawa 3 w 1"
                ratio="aspect-square"
                fit="object-contain"
                className="rounded-2xl bg-white"
              />
            </div>
            <div>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-extrabold text-green-600">255 zł</span>
                <span className="pb-1 text-2xl font-semibold text-gray-400">
                  Zamiast <span className="line-through">999 zł</span>
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Ten produkt jest obecnie oglądany przez <strong>+365 osób</strong>. Pośpiesz się do wyczerpania zapasów
              </p>
              <ul className="mt-5 space-y-3">
                {offerPoints.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                      <Check width={13} height={13} strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formularz zamówienia */}
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border-2 border-green-500 bg-white p-6 shadow-sm">
            <OrderForm offerHref={OFFER_URL} />
          </div>
        </div>
      </section>

      {/* ===================== BANER DOSTAWY ===================== */}
      <section className="mx-auto max-w-5xl px-4 pb-4">
        <LpImage src={IMAGES.banner} alt="Szybka i darmowa dostawa — dostawa w ciągu 24/48 godzin" ratio="aspect-[1280/520]" fit="object-cover" className="rounded-xl" />
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="[&_button]:text-base">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ===================== TRZY IKONY ===================== */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto grid max-w-4xl gap-8 px-4 py-12 text-center sm:grid-cols-3">
          {[
            { icon: Truck, text: "Bezpłatna dostawa w ciągu 24–48 godzin." },
            { icon: Zap, text: "Możliwa jest dostawa ekspresowa." },
            { icon: BadgeCheck, text: "Gwarancja satysfakcji lub zwrotu pieniędzy." },
          ].map((c) => (
            <div key={c.text} className="flex flex-col items-center">
              <c.icon width={40} height={40} className="text-gray-800" strokeWidth={1.5} />
              <p className="mt-3 max-w-[200px] text-sm font-semibold text-gray-700">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== KOŃCOWE CTA ===================== */}
      <section className="mx-auto max-w-5xl px-4 py-10 text-center">
        <a
          href="#order"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-orange-400 to-orange-600 px-10 py-4 text-lg font-extrabold uppercase tracking-wide text-white shadow-lg shadow-orange-500/30 transition hover:from-orange-500 hover:to-orange-700 active:scale-[0.99]"
        >
          <CirclePlay width={22} height={22} /> Płatność przy odbiorze
        </a>
      </section>

      {/* ===================== STOPKA ===================== */}
      <footer className="bg-[#0b2b6b] text-blue-100">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-3">
          <div>
            <div className="mb-3 max-w-[180px]">
              <LpImage src={IMAGES.logo} alt="Dealz4europe" ratio="aspect-[1128/300]" fit="object-contain" className="bg-white/95 p-2 rounded" />
            </div>
            <p className="text-xs leading-relaxed text-blue-200">
              Your trusted destination for quality products, unbeatable prices, and a seamless online shopping
              experience across Europe.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li><a href="#order" className="hover:underline">Form</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Policies</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:underline">Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-4 py-5 text-[11px] leading-relaxed text-blue-300">
            <p>
              Reklama · Treść sponsorowana. Ta strona jest prowadzona niezależnie i nie jest oficjalną witryną
              producenta. Ceny, rabaty, dostępność, gwarancje i specyfikacje są ustalane przez sprzedawcę i mogą
              ulec zmianie. Możemy otrzymać prowizję od zakupów dokonanych za pośrednictwem tej strony.
            </p>
            <p className="mt-2">© {new Date().getFullYear()} Dealz4europe</p>
          </div>
        </div>
      </footer>

      {/* Przyklejone CTA na mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-700 bg-white p-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] sm:hidden">
        <a
          href="#order"
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-orange-400 to-orange-600 px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-white"
        >
          <CirclePlay width={18} height={18} /> Kup teraz · 255 zł
        </a>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
