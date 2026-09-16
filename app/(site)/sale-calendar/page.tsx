import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getUpcomingSales } from "@/lib/content";
import { formatDate } from "@/lib/cn";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Sale Calendar — Upcoming Shopping Events",
  description:
    "Track upcoming sales and shopping events, with the stores and verified codes to use during each one.",
  alternates: { canonical: "/sale-calendar" },
};

export default async function SaleCalendarPage() {
  const sales = await getUpcomingSales();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Sale Calendar" }]}
      />

      <header className="mt-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          Sale Calendar
        </h1>
        <p className="mt-1 text-ink-500">
          Upcoming shopping events and the stores offering deals during each one.
        </p>
      </header>

      {sales.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sales.map((sale) => (
            <Link
              key={sale.slug}
              href={`/sale-calendar/${sale.slug}`}
              className="group flex flex-col overflow-hidden rounded-card border border-ink-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-50">
                {sale.cover ? (
                  <Image
                    src={sale.cover}
                    alt={sale.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-50 p-4 text-center">
                    <span className="text-sm font-bold text-brand-700">
                      {sale.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-bold text-ink-900 group-hover:text-brand-600">
                  {sale.name}
                </h3>
                <p className="mt-1 text-xs text-ink-500">
                  {formatDate(sale.startDate)} – {formatDate(sale.endDate)}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-ink-500">
                  {sale.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-card border border-ink-100 bg-white p-8 text-center text-ink-500">
          No upcoming sales yet — check back soon.
        </p>
      )}
    </div>
  );
}
