import type { Metadata } from "next";
import { Star, Check, Truck, Clock, ShoppingCart } from "lucide-react";
import { LpImage } from "@/components/lp/LpImage";
import { OrderForm } from "@/components/lp/OrderForm";

/**
 * Polish Security Cam with Solar Panel landing page (islaffiliate offer 4268 /
 * lp 6782). Dark layout with cyan accents, unlike the lime Fast Mower pages.
 *
 * Artwork goes in public/lp/securitycamwithsolarpanel_pl/ under the names
 * below; a file that isn't there yet renders a labelled placeholder instead of
 * breaking the layout.
 */
const DIR = "/lp/securitycamwithsolarpanel_pl";
const IMAGES = {
  logo: `${DIR}/logo.png`,
  heroBg: `${DIR}/hero-bg.jpg`,
  product: `${DIR}/product.jpg`,
  angle: `${DIR}/angle.jpg`,
  night: `${DIR}/night.jpg`,
  detection: `${DIR}/detection.jpg`,
  seasons: `${DIR}/seasons.jpg`,
  appView: `${DIR}/app-view.jpg`,
  specs: `${DIR}/specs.jpg`,
  kit: `${DIR}/kit.jpg`,
  videoPoster: `${DIR}/video-poster.jpg`,
  reviewBg: `${DIR}/review-bg.jpg`,
};

/** Small strip of shots under the hero product image. */
const thumbs = [`${DIR}/thumb-1.jpg`, `${DIR}/thumb-2.jpg`, `${DIR}/thumb-3.jpg`, `${DIR}/thumb-4.jpg`];

/**
 * Vimeo id of the campaign's clip — a square (1:1) creative, so the embed is
 * rendered 1:1. Empty = video section + nav link hidden, with the wide poster
 * shot standing in.
 */
const VIDEO_ID: string = "1214337433";

const PRICE = "424,99 PLN";
const PRICE_OLD = "509,99 PLN";
const PRODUCT_NAME = "SECURITY CAM WITH SOLAR PANEL";

export const metadata: Metadata = {
  title: "Bezprzewodowa kamera monitoringu 360° z panelem solarnym",
  description:
    "Kamera monitoringu 360° zasilana panelem solarnym 8 W i baterią 8000 mAh. Full HD 3 MP, wykrywanie ruchu AI, syrena alarmowa, kolorowy tryb nocny i dwukierunkowe audio — bez kabli i bez abonamentu.",
  robots: { index: false, follow: false },
};

const benefits = [
  {
    title: "0 zł kosztów energii i brak konserwacji",
    body: "Panel słoneczny o mocy 8 W nieustannie ładuje wydajną baterię 8000 mAh. Kamera działa przez cały rok, nawet podczas pochmurnych dni i deszczu dzięki klasie szczelności IP66.",
  },
  {
    title: "Panoramiczny obraz 360° w jakości Full HD 3 MP",
    body: "Monitoruj cały teren bezpośrednio z aplikacji V380 Pro. Kamera obraca się o 355° w poziomie i 90° w pionie, eliminując martwe strefy.",
  },
  {
    title: "Sztuczna inteligencja eliminująca fałszywe alarmy",
    body: "Czujnik PIR wspierany przez AI rozpoznaje ludzi i odróżnia ich od samochodów, zwierząt czy poruszających się gałęzi. Otrzymujesz powiadomienia wyłącznie o rzeczywistych zagrożeniach.",
  },
  {
    title: "Natychmiast odstrasza intruzów",
    body: "Po wykryciu podejrzanej osoby kamera automatycznie uruchamia głośną syrenę alarmową, włącza mocne światło ostrzegawcze i natychmiast wysyła powiadomienie na Twój smartfon.",
  },
  {
    title: "Kolorowy obraz nocny i dwukierunkowa komunikacja audio",
    body: "Wyraźny obraz również po zmroku. Dzięki wbudowanemu mikrofonowi i głośnikowi możesz mówić i słyszeć osoby znajdujące się przy kamerze – niezależnie od tego, gdzie jesteś.",
  },
  {
    title: "Elastyczny montaż",
    body: "Panel solarny możesz zamontować bezpośrednio przy kamerze lub oddzielnie, korzystając z dołączonego przewodu, aby ustawić go w miejscu o najlepszym nasłonecznieniu. Połączenie z telefonem odbywa się błyskawicznie przez Bluetooth.",
  },
];

const specs = [
  ["Jakość obrazu", "Full HD 3 MP, obiektyw 4 mm."],
  ["Tryb nocny", "Podwójny (podczerwień + kolorowe doświetlenie LED)."],
  ["Zasilanie", "Panel słoneczny 8 W + wbudowana bateria 8000 mAh."],
  ["Odporność na warunki atmosferyczne", "Certyfikat IP66."],
  ["Obrót PTZ", "355° w poziomie i 90° w pionie."],
  ["Pamięć", "Obsługa kart TF do 128 GB oraz zapisu w chmurze."],
];

const kitItems = [
  "1 × Kamera bezpieczeństwa 360° Full HD",
  "1 × Wysokowydajny panel solarny 8 W",
  "1 × Zestaw montażowy",
  "1 × Kabel USB",
  "1 × Instrukcja obsługi",
];

const reviews = [
  {
    name: "Marek R.",
    city: "Wrocław",
    body: "Zamontowałem ją na działce, gdzie nie mam dostępu do prądu, i sprawdza się znakomicie. Dzięki panelowi słonecznemu bateria jest praktycznie cały czas naładowana. Kamera natychmiast wysyła powiadomienia na telefon, a kolorowy tryb nocny działa rewelacyjnie. Jestem bardzo zadowolony.",
  },
  {
    name: "Tomasz K.",
    city: "Warszawa",
    body: "Sterowanie kamerą z poziomu aplikacji jest bardzo płynne. System AI świetnie odróżnia ludzi od zwierząt – nie dostaję już fałszywych alarmów, gdy po posesji chodzi kot sąsiada. To daje ogromny spokój, gdy nie ma mnie w domu.",
  },
  {
    name: "Anna P.",
    city: "Kraków",
    body: "Połączenie z aplikacją V380 Pro przez Bluetooth zajęło dosłownie chwilę. Dwukierunkowy dźwięk jest bardzo wyraźny, a brak miesięcznych opłat za alarm to ogromna oszczędność. Jakość obrazu jest doskonała.",
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

/** Cyjanowy przycisk CTA w stylu z makiety. */
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
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-cyan-500 px-8 py-3.5 text-center text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-400 active:scale-[0.99] ${className}`}
    >
      {children}
      <ShoppingCart width={16} height={16} />
    </a>
  );
}

/** Cena promocyjna obok przekreślonej ceny katalogowej. */
function PriceLine({ className = "" }: { className?: string }) {
  return (
    <p className={`font-extrabold ${className}`}>
      <span className="text-3xl text-orange-500">{PRICE}</span>{" "}
      <span className="text-lg font-semibold text-orange-300/70 line-through">{PRICE_OLD}</span>
    </p>
  );
}

/** „Ostatnie sztuki…” — powtarzany pasek zaufania pod przyciskami. */
function StockLine({ dark = true }: { dark?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>
      <Truck width={14} height={14} className="text-cyan-400" />
      Ostatnie sztuki w magazynie · Szybka dostawa w 48–72 godziny
    </p>
  );
}

export default function SecurityCamLanding() {
  return (
    <div className="bg-white text-gray-800">
      {/* ===================== STICKY NAV ===================== */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
          <div className="w-32 sm:w-40">
            <LpImage
              src={IMAGES.logo}
              alt={PRODUCT_NAME}
              ratio="aspect-[240/72]"
              fit="object-contain"
              className=""
            />
          </div>
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
              className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white sm:text-sm"
            >
              Kup teraz <ShoppingCart width={14} height={14} />
            </a>
          </nav>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        {/* Zdjęcie kamery w deszczu jako tło — przygaszone, by tekst pozostał czytelny */}
        <div className="absolute inset-0">
          <LpImage src={IMAGES.heroBg} alt="" ratio="h-full" fit="object-cover" className="h-full" />
          <div className="absolute inset-0 bg-gray-900/85" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
          {/* Lewa kolumna */}
          <div>
            <h1 className="text-2xl font-extrabold uppercase leading-tight text-cyan-400 sm:text-3xl">
              Bezprzewodowa kamera monitoringu 360°, która chroni Twój dom przez całą dobę – bez
              rachunków za prąd.
            </h1>

            <p className="mt-5 text-sm leading-relaxed text-gray-300">
              Chroń swój dom, ogród, działkę lub firmę bez dodatkowych kosztów za energię i bez
              miesięcznych abonamentów. Kamera zasilana jest panelem solarnym 8 W oraz wbudowaną
              baterią, wykrywa prawdziwe zagrożenia dzięki sztucznej inteligencji i natychmiast
              wysyła powiadomienie na Twój telefon. Zamontujesz ją samodzielnie w zaledwie kilka
              minut – bez kabli.
            </p>

            <div className="mt-6">
              <PriceLine />
            </div>

            <div className="mt-5">
              <CtaButton className="w-full sm:w-auto">Chcę swoją kamerę</CtaButton>
            </div>
            <div className="mt-3">
              <StockLine />
            </div>
          </div>

          {/* Prawa kolumna — produkt + miniatury */}
          <div>
            <LpImage
              src={IMAGES.product}
              alt="Kamera monitoringu 360° z panelem solarnym"
              ratio="aspect-[4/3]"
              fit="object-contain"
              className="rounded-xl"
              priority
            />
            <div className="mt-3 grid grid-cols-4 gap-2">
              {thumbs.map((t, i) => (
                <LpImage
                  key={t}
                  src={t}
                  alt={`Kamera solarna — zdjęcie ${i + 1}`}
                  ratio="aspect-square"
                  fit="object-cover"
                  className="rounded-md border border-white/15"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DLACZEGO LEPSZA OCHRONA ===================== */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <LpImage
            src={IMAGES.angle}
            alt="Obraz 355° w poziomie i 100° w pionie oraz 4× zoom cyfrowy"
            ratio="aspect-[4/3]"
            fit="object-cover"
            className="rounded-xl"
          />
          <div>
            <h2 className="text-xl font-extrabold uppercase leading-snug text-gray-900 sm:text-2xl">
              Dlaczego ta kamera zapewnia lepszą ochronę niż tradycyjne rozwiązania?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              <strong>{PRODUCT_NAME}</strong> to w pełni bezprzewodowy system monitoringu
              zewnętrznego z panoramicznym obrazem 360°, niezależnym panelem słonecznym oraz
              inteligentnym wykrywaniem ruchu opartym na AI. Zamontuj ją tam, gdzie potrzebujesz, i
              zapomnij o wymianie baterii oraz prowadzeniu przewodów.
            </p>
            <div className="mt-6">
              <CtaButton />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== KORZYŚCI ===================== */}
      <section id="benefits" className="scroll-mt-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-14">
          <h2 className="text-xl font-extrabold uppercase tracking-wide text-gray-900 sm:text-2xl">
            Korzyści
          </h2>

          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <ul className="space-y-5">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white">
                    <Check width={13} height={13} strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{b.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{b.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <LpImage
              src={IMAGES.night}
              alt="Kolorowy obraz nocny — wykrycie osoby przy domu"
              ratio="aspect-[4/3]"
              fit="object-cover"
              className="rounded-xl md:sticky md:top-20"
            />
          </div>

          {/* Wykrywanie do 25 m + praca przez cały rok */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <figure>
              <LpImage
                src={IMAGES.detection}
                alt="Zasięg wykrywania ruchu do 25 metrów"
                ratio="aspect-[4/3]"
                fit="object-cover"
                className="rounded-xl"
              />
              <figcaption className="mt-2 text-xs text-gray-500">
                Wykrywanie ruchu w zasięgu do 25 metrów — AI rozpoznaje ludzi i pojazdy.
              </figcaption>
            </figure>
            <figure>
              <LpImage
                src={IMAGES.seasons}
                alt="Kamera działa przez cały rok, w każdych warunkach"
                ratio="aspect-[4/3]"
                fit="object-cover"
                className="rounded-xl"
              />
              <figcaption className="mt-2 text-xs text-gray-500">
                Klasa szczelności IP66 — działa przez cały rok, latem i zimą.
              </figcaption>
            </figure>
          </div>

          <div className="mt-10">
            <CtaButton />
          </div>
        </div>
      </section>

      {/* ===================== BEZ ABONAMENTÓW ===================== */}
      <section className="bg-gray-800 text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center">
          <h2 className="text-xl font-extrabold uppercase sm:text-2xl">
            Bez abonamentów i bez firmy ochroniarskiej
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            Zaoszczędź nawet 170–215 PLN miesięcznie, rezygnując z tradycyjnych systemów alarmowych.
            Kamera należy do Ciebie na własność. Nagrywa na kartę pamięci TF (do 128 GB) lub do
            chmury, zapewniając pełną kontrolę nad Twoją posesją bez żadnych stałych opłat.
          </p>
          <div className="mt-7 flex justify-center">
            <CtaButton />
          </div>
        </div>
      </section>

      {/* ===================== WIDEO ===================== */}
      {VIDEO_ID ? (
        <section id="video" className="relative scroll-mt-16 overflow-hidden bg-black">
          {/* Szeroki kadr kamery jako tło — zamiast pustego czarnego pasa. */}
          <div className="absolute inset-0">
            <LpImage
              src={IMAGES.videoPoster}
              alt=""
              ratio="h-full"
              fit="object-cover"
              className="h-full"
            />
            <div className="absolute inset-0 bg-gray-900/85" />
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
          </div>
        </section>
      ) : (
        <LpImage
          src={IMAGES.videoPoster}
          alt="Kamera solarna zamontowana na ogrodzeniu"
          ratio="aspect-[21/9]"
          fit="object-cover"
          className=""
        />
      )}

      {/* ===================== SPECYFIKACJA ===================== */}
      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-wide text-gray-900 sm:text-2xl">
              Specyfikacja techniczna
            </h2>
            <ul className="mt-6 space-y-3">
              {specs.map(([k, v]) => (
                <li key={k} className="flex gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white">
                    <Check width={13} height={13} strokeWidth={3} />
                  </span>
                  <span className="text-gray-600">
                    <strong className="font-bold text-gray-900">{k}:</strong> {v}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <LpImage
              src={IMAGES.specs}
              alt="Kamera solarna sterowana z aplikacji V380 Pro"
              ratio="aspect-[4/3]"
              fit="object-cover"
              className="rounded-xl"
            />
            <LpImage
              src={IMAGES.appView}
              alt="Podgląd na żywo w telefonie i wykrywanie ruchu na posesji"
              ratio="aspect-[4/3]"
              fit="object-cover"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* ===================== W ZESTAWIE ===================== */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-4">
            <LpImage
              src={IMAGES.kit}
              alt="Zawartość zestawu: kamera, panel solarny, zestaw montażowy, kabel USB"
              ratio="aspect-[4/3]"
              fit="object-contain"
              className="rounded-xl"
            />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">W zestawie</h2>
            <ul className="mt-5 space-y-2.5">
              {kitItems.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white">
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
              <CtaButton className="w-full sm:w-auto">Chcę swoją kamerę</CtaButton>
            </div>
            <div className="mt-3">
              <StockLine dark={false} />
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
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-2xl font-extrabold text-white"
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

          <div className="mt-4 rounded-t-md bg-cyan-500 py-2.5 text-center text-sm font-extrabold uppercase tracking-wide text-white">
            <span className="inline-flex items-center gap-2">
              <Clock width={16} height={16} /> Oferta wkrótce się zakończy{" "}
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

          <div className="bg-cyan-500 py-2 text-center text-xs font-bold uppercase tracking-wide text-white">
            <span className="inline-flex items-center gap-2">
              <Truck width={14} height={14} /> Dostawa w ciągu 48–72 godzin
            </span>
          </div>

          <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 shadow-sm">
            <OrderForm
              product="Security Cam Solar PL"
              isla={{
                uid: "019fb28c-270f-7f36-9386-36d8b9ba93ee",
                offer: "4268",
                lp: "6782",
                thankyoupage: "https://www.thesmartfares.online/lp/thanks",
                formKey: "72e056cd627a5deda0e4c5ea102f33e9a8abbf35",
              }}
            />
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
            sprzedawcę i mogą ulec zmianie.
          </p>
        </div>
      </footer>

      {/* Przyklejone CTA na mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cyan-600 bg-gray-900 p-2.5 sm:hidden">
        <a
          href="#order"
          className="flex items-center justify-center gap-2 rounded-md bg-cyan-500 px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-white"
        >
          Kup teraz · {PRICE} <ShoppingCart width={16} height={16} />
        </a>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
