import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { getAllGiftGuides } from "@/lib/content";
import { formatDate } from "@/lib/cn";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Gift Guides — Curated Picks with Verified Codes",
  description:
    "Curated gift guides for every occasion, with the verified coupon codes to save on each pick.",
  alternates: { canonical: "/gift-guides" },
};

export default async function GiftGuidesIndexPage() {
  const guides = await getAllGiftGuides();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gift Guides" }]} />

      <header className="mt-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          Gift Guides
        </h1>
        <p className="mt-1 text-ink-500">
          Curated picks for every occasion, with verified codes on each one.
        </p>
      </header>

      {guides.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/gift-guides/${guide.slug}`}
              className="group flex flex-col overflow-hidden rounded-card border border-ink-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-50">
                {guide.cover ? (
                  <Image
                    src={guide.cover}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-50 p-4 text-center">
                    <span className="text-sm font-bold text-brand-700">
                      {guide.title}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                {guide.occasion && (
                  <span className="mb-2 w-fit rounded-full bg-ink-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    {guide.occasion}
                  </span>
                )}
                <h3 className="font-bold text-ink-900 group-hover:text-brand-600">
                  {guide.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-500">
                  {guide.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-ink-500">
                  <CalendarDays width={13} height={13} />
                  {formatDate(guide.date)} · {guide.author}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-card border border-ink-100 bg-white p-8 text-center text-ink-500">
          No gift guides yet — check back soon.
        </p>
      )}
    </div>
  );
}
