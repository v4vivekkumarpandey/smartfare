import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { LpImage } from "@/components/lp/LpImage";

const DIR = "/lp/fastmower_pl";

export const metadata: Metadata = {
  title: "Dziękujemy za złożenie zamówienia! — Fast Mower",
  description:
    "Twoje zamówienie zostało przyjęte. Nasz konsultant wkrótce skontaktuje się z Tobą telefonicznie, aby potwierdzić wysyłkę.",
  robots: { index: false, follow: false },
};

export default function FastMowerThanks() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800">
      {/* ===================== NAV ===================== */}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-3">
          <div className="w-28 sm:w-36">
            <LpImage
              src={`${DIR}/logo.webp`}
              alt="Fast Mower"
              ratio="aspect-[240/72]"
              fit="object-contain"
              className=""
            />
          </div>
        </div>
      </header>

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
    </div>
  );
}
