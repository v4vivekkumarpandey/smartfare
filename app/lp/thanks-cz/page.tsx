import type { Metadata } from "next";
import Script from "next/script";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Děkujeme za vaši objednávku!",
  description:
    "Vaše objednávka byla přijata. Náš konzultant se vám brzy ozve telefonicky, aby potvrdil odeslání.",
  robots: { index: false, follow: false },
};

// Google Ads conversion tracking — fires the "Submit lead form" conversion on
// page load. This lives ONLY on the thank-you page (the conversion page).
const GADS_ID = "AW-17863778548";
const GADS_CONVERSION_LABEL = "U5z6CMjDmcscEPTBjsZC";

/**
 * Czech cash-on-delivery thank-you page — same conversion tracking as
 * /lp/thanks, only the copy is Czech. Used by the CZ landing pages'
 * islaffiliate `thankyoupage` so a Czech buyer isn't sent to a Polish page.
 */
export default function LpThanksCz() {
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

      {/* ===================== POTVRZENÍ ===================== */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <CheckCircle2 width={72} height={72} strokeWidth={2} className="text-lime-500" />
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            Děkujeme za vaši objednávku!
          </h1>

          <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
            Náš konzultant se vám brzy ozve telefonicky, aby potvrdil odeslání vaší objednávky.
          </p>

          <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
            Abyste nepřišli o slevu a obdrželi objednávku co nejdříve, zvedněte prosím telefon —
            díky tomu budeme moci vaši objednávku potvrdit a okamžitě ji začít vyřizovat.
          </p>

          <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
            <strong className="font-bold text-gray-800">
              Vzhledem k velkému množství objednávek se vám náš konzultant může ozvat až následující
              den.
            </strong>{" "}
            Chápeme, že spousta lidí nezvedá hovory z neznámých čísel. I když vám ale číslo nebude
            povědomé, prosíme, telefon zvedněte — jde jen o krátký hovor pro ověření adresy, aby vaše
            zásilka dorazila na správné místo. Jeden krátký hovor a vaše objednávka je na cestě!
          </p>

          <hr className="mt-10 border-gray-200" />
        </div>
      </main>

      {/* ===================== PATIČKA ===================== */}
      <footer className="bg-black text-gray-400">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs">
          <p className="mx-auto max-w-2xl leading-relaxed text-gray-500">
            Reklama · Sponzorovaný obsah. Tato stránka je provozována nezávisle a není oficiálním
            webem výrobce. Ceny, slevy, dostupnost, záruky a specifikace stanovuje prodejce a mohou
            se změnit.
          </p>
        </div>
      </footer>
    </div>
  );
}
