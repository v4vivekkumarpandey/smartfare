import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getSaleCalendarEntry,
  getSaleCalendarSlugs,
  getStore,
} from "@/lib/content";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/cn";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StoreCard } from "@/components/store/StoreCard";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = true;
export const revalidate = 900;

export async function generateStaticParams() {
  const slugs = await getSaleCalendarSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sale = await getSaleCalendarEntry(slug);
  if (!sale) return {};
  return {
    title: sale.name,
    description: sale.description,
    alternates: { canonical: `/sale-calendar/${sale.slug}` },
    openGraph: {
      type: "website",
      title: sale.name,
      description: sale.description,
      url: `${site.url}/sale-calendar/${sale.slug}`,
      images: sale.cover ? [sale.cover] : undefined,
    },
  };
}

export default async function SaleCalendarEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sale = await getSaleCalendarEntry(slug);
  if (!sale) notFound();

  const stores = (
    await Promise.all(sale.storeSlugs.map((s) => getStore(s)))
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: sale.name,
    description: sale.description,
    startDate: sale.startDate,
    endDate: sale.endDate,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "VirtualLocation", url: `${site.url}/sale-calendar/${sale.slug}` },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    image: sale.cover ? `${site.url}${sale.cover}` : undefined,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Sale Calendar", href: "/sale-calendar" },
            { label: sale.name },
          ]}
        />

        <header className="mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {sale.name}
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            {formatDate(sale.startDate)} – {formatDate(sale.endDate)}
          </p>
          <p className="mt-4 max-w-2xl text-ink-700">{sale.description}</p>
        </header>

        {sale.cover && (
          <div className="relative mt-6 aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-card bg-brand-50">
            <Image
              src={sale.cover}
              alt={sale.name}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {stores.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              Stores in this sale
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stores.map((store) => (
                <StoreCard key={store.slug} store={store} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
