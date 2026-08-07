import type { Metadata } from "next";
import {
  Wind,
  Star,
  Battery,
  Gauge,
  Wrench,
  Zap,
  Trash2,
  Feather,
  MapPin,
  Truck,
  RotateCcw,
  ShieldCheck,
  Phone,
  Check,
  Flame,
  ChevronRight,
} from "lucide-react";
import { FaqAccordion } from "@/components/store/FaqAccordion";
import { LpImage } from "@/components/lp/LpImage";
import { OfferLink } from "@/components/lp/OfferLink";

// Każde CTA przechodzi przez wewnętrzne przekierowanie (ukrywa link partnerski).
// Prawdziwy adres docelowy znajduje się w lib/offers.ts pod tym slugiem.
const OFFER_URL = "/go/offer/blower-pl";

const DIR = "/lp/blower-pl";
const IMAGES = {
  hero: `${DIR}/hero.webp`,
  product: `${DIR}/product.jpg`,
  blades: `${DIR}/blades.jpg`,
  banner: `${DIR}/banner.png`,
};

export const metadata: Metadata = {
  title: "Wydajna dmuchawa — bezprzewodowa dmuchawa 3 w 1 o mocy 3000 W",
  description:
    "Bezprzewodowa dmuchawa 3 w 1 o mocy 3000 W — czyszczenie ogrodów, ścieżek i patio z prędkością powietrza do 320 km/h, bez kabli i wysiłku. Płatność za pobraniem i darmowa wysyłka.",
  robots: { index: false, follow: false },
};

const specs = [
  { icon: Battery, title: "2 baterie 40V 4000 mAh w zestawie", body: "Do 12 godzin rzeczywistej pracy — wystarczy na całe podwórko." },
  { icon: Gauge, title: "Przepływ powietrza 320 km/h i ssanie 1720 m³/h", body: "Wydmuchuje i zasysa mokre liście oraz ciężkie zanieczyszczenia za jednym razem." },
  { icon: Wrench, title: "Wytrzymała tytanowa gwiazda z 32 ostrzami", body: "Rozdrabnia liście i gałązki bez zapychania się worka." },
  { icon: Zap, title: "Szybka ładowarka w zestawie", body: "Pełne naładowanie w zaledwie 40 minut." },
  { icon: Trash2, title: "55-litrowy worek z przezroczystym okienkiem", body: "Duża pojemność i podgląd poziomu napełnienia." },
  { icon: Feather, title: "Tylko 3 kg wagi", body: "Lekka, dobrze wyważona i bardzo łatwa w obsłudze." },
];

const highlights = [
  { icon: Gauge, title: "Dmuchanie 320 km/h i zasysanie 1720 m³/h", body: "Usuwanie wszelkiego rodzaju zabrudzeń z milimetrową precyzją." },
  { icon: Wrench, title: "Rozdrabnia kamienie, żwir i gałęzie", body: "Tytanowa gwiazda z 32 ostrzami radzi sobie z najtrudniejszymi zanieczyszczeniami." },
  { icon: Feather, title: "Waży zaledwie 3 kg", body: "Sprzątaj dłużej bez zmęczenia rąk i pleców." },
];

const reviews = [
  {
    name: "Piotr Kowalski",
    date: "20-10-2025",
    stars: 5,
    body: "To zdecydowanie najlepsza dmuchawa, jaką używałem do sprzątania ogrodu. Duży przepływ powietrza (320 km/h) skutecznie usuwa zanieczyszczenia, a tryb ssania (1720 m³/h) świetnie zbiera liście.",
  },
  {
    name: "Anna Kowalczyk",
    date: "11-09-2025",
    stars: 4,
    body: "Używam tej dmuchawy ogrodowej od kilku tygodni i całkowicie zmieniła sposób, w jaki dbam o mój ogród. Strumień powietrza jest wystarczająco silny, aby przesuwać mokre liście i drobne zanieczyszczenia, a funkcja ssania ułatwia ich zbieranie.",
  },
  {
    name: "Paweł Zieliński",
    date: "05-09-2025",
    stars: 5,
    body: "To narzędzie ogrodowe przerosło moje oczekiwania. Bez problemu usuwa liście, gałązki i drobne zanieczyszczenia, a dwie baterie zapewniają wystarczający czas pracy na całym podwórku. Jest lekkie, dobrze wyważone i bardzo łatwe w obsłudze. Polecam każdemu, kto szuka wydajnego i niezawodnego pomocnika do ogrodu.",
  },
];

const guarantees = [
  { icon: ShieldCheck, text: "2 lata gwarancji" },
  { icon: Truck, text: "Bezpłatna wysyłka i dostawa w ciągu 24–48 godzin" },
  { icon: Phone, text: "Wsparcie telefoniczne przed i po zakupie" },
  { icon: RotateCcw, text: "100% gwarancja zwrotu pieniędzy" },
];

const faqs = [
  { q: "Czy mogę zapłacić przy odbiorze?", a: "Tak! Dla Twojej wygody i bezpieczeństwa oferujemy płatność za pobraniem – zapłacisz bezpośrednio kurierowi przy odbiorze paczki." },
  { q: "Jak długo trwa dostawa?", a: "Dostawa trwa od 24 do 48 godzin." },
  { q: "Czy mogę uzyskać pomoc przed i po zakupie?", a: "Tak, nasza obsługa klienta jest dostępna zarówno przed, jak i po zakupie." },
  { q: "Czy mogę zwrócić produkt?", a: "Tak! Jeśli nie będziesz zadowolony, oferujemy 100% gwarancję zwrotu pieniędzy." },
];

function Stars({ count = 5, className = "text-amber-400" }: { count?: number; className?: string }) {
  return (
    <div className={`flex ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={16}
          height={16}
          fill={i < count ? "currentColor" : "none"}
          strokeWidth={i < count ? 0 : 1.5}
          className={i < count ? "" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function CtaButton({ children = "Kup teraz →" }: { children?: React.ReactNode }) {
  return (
    <OfferLink
      href={OFFER_URL}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 text-center text-base font-extrabold uppercase tracking-wide text-white shadow-lg shadow-green-600/25 transition hover:bg-green-700 active:scale-[0.99] sm:text-lg"
    >
      {children}
    </OfferLink>
  );
}

export default function BlowerLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* Pasek promocyjny / pilność */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-red-600 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-white sm:text-xs">
        <span className="inline-flex items-center gap-1">
          <Flame width={14} height={14} /> Tylko dziś: 70% zniżki — darmowa wysyłka!
        </span>
      </div>

      {/* ===================== HERO ===================== */}
      <header className="border-b border-gray-100 bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-3xl px-4 pb-10 pt-6">
          {/* Marka */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
                <Wind width={18} height={18} />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-gray-900">Wydajna dmuchawa</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Stars />
              <span className="hidden text-gray-500 sm:inline">Zaufało nam tysiące klientów</span>
            </div>
          </div>

          {/* Zdjęcie produktu */}
          <div className="mx-auto mt-6 max-w-md">
            <LpImage
              src={IMAGES.hero}
              alt="Bezprzewodowa dmuchawa ogrodowa 3 w 1"
              ratio="aspect-[4/3]"
              fit="object-contain"
              className="rounded-2xl bg-white"
              priority
            />
          </div>

          <h1 className="mt-6 text-center text-3xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            Wydajna <span className="text-green-600">dmuchawa</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-gray-600 sm:text-lg">
            Ta bezprzewodowa dmuchawa <span className="font-semibold text-green-700">3 w 1 o mocy 3000 W</span> umożliwia
            czyszczenie ogrodów, ścieżek i patio za jednym razem, usuwając mokre liście i ciężkie zanieczyszczenia
            bez użycia kabli i wysiłku.
          </p>

          {/* Cena */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-4xl font-extrabold text-green-600">255 zł</span>
            <span className="text-xl font-semibold text-gray-400 line-through">999 zł</span>
            <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700">-70%</span>
          </div>

          {/* Niedobór */}
          <div className="mx-auto mt-4 flex max-w-md flex-col items-center gap-2 text-center">
            <p className="text-sm font-bold text-red-600">Zostało tylko 8 sztuk!</p>
            <p className="text-xs text-gray-500">+365 osób ogląda teraz ten produkt</p>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-6 max-w-md"><CtaButton>Kup teraz →</CtaButton></div>
          <p className="mt-2 text-center text-xs font-medium text-gray-500">
            Płatność przy odbiorze · Darmowa wysyłka · Dostawa 24–48 h
          </p>
        </div>
      </header>

      {/* Etykieta reklamy (zgodność) */}
      <p className="bg-white pt-6 text-center text-[10px] font-semibold uppercase tracking-widest text-gray-300">
        Reklama · Treść sponsorowana
      </p>

      {/* ===================== SPECYFIKACJA ===================== */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Wszystko, czego potrzebujesz do{" "}
          <span className="text-green-600">czystego ogrodu</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {specs.map((s) => (
            <div key={s.title} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <s.icon width={22} height={22} />
              </span>
              <div>
                <h3 className="font-bold text-gray-900">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-sm"><CtaButton>Kup teraz →</CtaButton></div>
      </section>

      {/* ===================== WYRÓŻNIKI ===================== */}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-center text-3xl font-extrabold">
            Usuwanie wszelkiego rodzaju zabrudzeń z{" "}
            <span className="text-green-400">milimetrową precyzją</span>
          </h2>

          <div className="mx-auto mt-8 max-w-md">
            <LpImage
              src={IMAGES.blades}
              alt="Tytanowa gwiazda z 32 ostrzami"
              ratio="aspect-video"
              fit="object-cover"
              className="rounded-2xl bg-white/5"
            />
          </div>

          <div className="mt-10 space-y-6">
            {highlights.map((h) => (
              <div key={h.title} className="flex items-start gap-5 rounded-2xl bg-white/5 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  <h.icon width={24} height={24} />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{h.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-300">{h.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== OPINIE ===================== */}
      <section id="reviews" className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Co mówią nasi <span className="text-green-600">klienci</span>
        </h2>
        <div className="mt-2 flex items-center justify-center gap-2">
          <Stars />
          <span className="text-sm font-semibold text-gray-600">Zweryfikowane opinie</span>
        </div>

        <div className="mt-8 space-y-5">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                    {r.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div>
                    <p className="flex items-center gap-1 font-bold text-gray-900">
                      {r.name}
                      <span className="inline-flex items-center gap-0.5 text-xs font-normal text-green-600">
                        <Check width={12} height={12} /> Zweryfikowany
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">{r.date}</p>
                  </div>
                </div>
                <Stars count={r.stars} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-700">&ldquo;{r.body}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-sm"><CtaButton>Kup teraz →</CtaButton></div>
      </section>

      {/* ===================== GWARANCJE ===================== */}
      <section className="bg-green-50">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-center text-2xl font-extrabold text-gray-900">
            Kupujesz bez ryzyka
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {guarantees.map((g) => (
              <div key={g.text} className="flex items-center gap-3 rounded-xl border border-green-200 bg-white p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700">
                  <g.icon width={20} height={20} />
                </span>
                <p className="text-sm font-semibold text-gray-800">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BOKS OFERTY ===================== */}
      <section className="mx-auto max-w-2xl px-4 py-14">
        <div className="rounded-2xl border-2 border-green-600 bg-green-50 p-6 text-center">
          <div className="mx-auto mb-4 max-w-xs">
            <LpImage src={IMAGES.product} alt="Bezprzewodowa dmuchawa 3 w 1" ratio="aspect-square" fit="object-contain" className="rounded-xl bg-white" />
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
            <Flame width={13} height={13} /> Tylko dziś: 70% zniżki
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-gray-900">Wydajna dmuchawa 3 w 1</h2>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="text-3xl font-extrabold text-green-600">255 zł</span>
            <span className="text-lg font-semibold text-gray-400 line-through">999 zł</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Płatność za pobraniem i darmowa wysyłka. Zostało tylko 8 sztuk!</p>
          <div className="mx-auto mt-5 max-w-sm"><CtaButton>Kup teraz →</CtaButton></div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-gray-600">
            <span className="inline-flex items-center gap-1"><RotateCcw width={14} height={14} className="text-green-600" /> 100% gwarancja zwrotu pieniędzy</span>
            <span className="inline-flex items-center gap-1"><Truck width={14} height={14} className="text-green-600" /> Dostawa 24–48 h</span>
            <span className="inline-flex items-center gap-1"><ShieldCheck width={14} height={14} className="text-green-600" /> 2 lata gwarancji</span>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="mx-auto max-w-2xl px-4 pb-10">
        <h2 className="text-2xl font-extrabold text-gray-900">Najczęściej zadawane pytania</h2>
        <div className="mt-4"><FaqAccordion faqs={faqs} /></div>

        <div className="mt-8"><CtaButton>Kup teraz →</CtaButton></div>
        <OfferLink href={OFFER_URL} className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-green-700">
          Sprawdź cenę i dostępność <ChevronRight width={15} height={15} />
        </OfferLink>
      </section>

      {/* ===================== STOPKA + INFORMACJE ===================== */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-8 text-xs leading-relaxed text-gray-500">
          <p className="font-semibold text-gray-600">Informacja o reklamie</p>
          <p className="mt-2">
            To jest reklama, a nie artykuł prasowy ani materiał redakcyjny. Ta strona jest prowadzona niezależnie
            i nie jest oficjalną witryną producenta. Wszelkie znaki towarowe są własnością ich właścicieli i są
            używane wyłącznie w celach identyfikacyjnych. Możemy otrzymać prowizję, jeśli dokonasz zakupu za
            pośrednictwem linków na tej stronie, bez dodatkowych kosztów dla Ciebie. Ceny, rabaty, dostępność,
            gwarancje i specyfikacje są ustalane przez sprzedawcę i widoczne na stronie zamówienia — zawsze
            potwierdź aktualne szczegóły przed zakupem. Opinie odzwierciedlają indywidualne doświadczenia
            klientów, a wyniki mogą się różnić.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} · Strona promocyjna ·{" "}
            <a href="/privacy" className="underline">Polityka prywatności</a> ·{" "}
            <a href="/terms" className="underline">Regulamin</a> ·{" "}
            <a href="/contact" className="underline">Kontakt</a>
          </p>
        </div>
      </footer>

      {/* Przyklejone CTA na mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-green-700 bg-green-600 p-3 sm:hidden">
        <OfferLink
          href={OFFER_URL}
          className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-green-700"
        >
          Kup teraz · 255 zł →
        </OfferLink>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
