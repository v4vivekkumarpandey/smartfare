import type { Metadata } from "next";
import Script from "next/script";
import { CheckCircle2 } from "lucide-react";
import { CrossSell } from "@/components/lp/CrossSell";

export const metadata: Metadata = {
  title: "Dziękujemy za złożenie zamówienia!",
  description:
    "Twoje zamówienie zostało przyjęte. Nasz konsultant wkrótce skontaktuje się z Tobą telefonicznie, aby potwierdzić wysyłkę.",
  robots: { index: false, follow: false },
};

// Google Ads conversion tracking — fires the "Submit lead form" conversion on
// page load. This lives ONLY on the thank-you page (the conversion page).
const GADS_ID = "AW-18371934800";
const GADS_CONVERSION_LABEL = "hULSCLaZ5d0cEND0tbhE";

/**
 * Shared cash-on-delivery thank-you page used by every landing page's order
 * form (OrderForm `thanksHref="/lp/thanks"`). Brand-neutral so any LP can reuse it.
 */
export default function LpThanks() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800">
      {/* Google tag (gtag.js) + Submit lead form conversion — thank-you page only */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gads-conversion" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GADS_ID}');
          gtag('event', 'conversion', {
            'send_to': '${GADS_ID}/${GADS_CONVERSION_LABEL}',
            'value': 1.0,
            'currency': 'USD'
          });
        `}
      </Script>

      {/* ===================== POTWIERDZENIE ===================== */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <CheckCircle2
              width={72}
              height={72}
              strokeWidth={2}
              className="text-lime-500"
            />
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            Dziękujemy za złożenie zamówienia!
          </h1>

          <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
            Nasz konsultant wkrótce skontaktuje się z Tobą telefonicznie, aby potwierdzić wysyłkę
            zamówienia.
          </p>

          <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
            Aby nie utracić rabatu i otrzymać zamówienie jak najszybciej, odbierz telefon, dzięki
            czemu będziemy mogli potwierdzić Twoje zamówienie i natychmiast rozpocząć jego
            realizację.
          </p>

          <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
            <strong className="font-bold text-gray-800">
              Ze względu na dużą liczbę zamówień nasz konsultant może oddzwonić nawet następnego
              dnia.
            </strong>{" "}
            Rozumiemy, że wiele osób nie odbiera połączeń z nieznanych numerów. Jednak nawet jeśli
            numer będzie Ci nieznany, prosimy o odebranie telefonu — to tylko krótka rozmowa w celu
            potwierdzenia adresu, aby Twoja przesyłka trafiła we właściwe miejsce. Jedna krótka
            rozmowa i Twoje zamówienie będzie w drodze!
          </p>

          <hr className="mt-10 border-gray-200" />
        </div>
      </main>

      {/* ===================== SPRZEDAŻ KRZYŻOWA (1 KLIK) ===================== */}
      <CrossSell />
      <div className="h-12" />

      {/* ===================== STOPKA ===================== */}
      <footer className="bg-black text-gray-400">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs">
          <p className="mx-auto max-w-2xl leading-relaxed text-gray-500">
            Reklama · Treść sponsorowana. Ta strona jest prowadzona niezależnie i nie jest oficjalną
            witryną producenta. Ceny, rabaty, dostępność, gwarancje i specyfikacje są ustalane przez
            sprzedawcę i mogą ulec zmianie.
          </p>
        </div>
      </footer>
    </div>
  );
}
