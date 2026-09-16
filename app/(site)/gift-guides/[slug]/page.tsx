import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, User } from "lucide-react";
import {
  getGiftGuide,
  getGiftGuideSlugs,
  getStore,
} from "@/lib/content";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/cn";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PostBody } from "@/components/blog/PostBody";
import { StoreCard } from "@/components/store/StoreCard";
import { JsonLd } from "@/components/JsonLd";
import { Ad } from "@/components/Ad";

export const dynamicParams = true;
export const revalidate = 900;

export async function generateStaticParams() {
  const slugs = await getGiftGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGiftGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/gift-guides/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.excerpt,
      url: `${site.url}/gift-guides/${guide.slug}`,
      images: guide.cover ? [guide.cover] : undefined,
      publishedTime: guide.date,
    },
  };
}

export default async function GiftGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGiftGuide(slug);
  if (!guide) notFound();

  const stores = (
    await Promise.all(guide.storeSlugs.map((s) => getStore(s)))
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.date,
    dateModified: guide.date,
    author: { "@type": "Organization", name: guide.author },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/gift-guides/${guide.slug}`,
    image: guide.cover ? `${site.url}${guide.cover}` : undefined,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="mx-auto max-w-3xl px-4 py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Gift Guides", href: "/gift-guides" },
            { label: guide.title },
          ]}
        />

        <header className="mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {guide.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <User width={14} height={14} /> {guide.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays width={14} height={14} /> {formatDate(guide.date)}
            </span>
          </div>
        </header>

        {guide.cover && (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-card bg-brand-50">
            <Image
              src={guide.cover}
              alt={guide.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-6">
          <PostBody body={guide.body} />
        </div>

        <Ad />

        {guide.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {guide.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-700"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </article>

      {stores.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="mb-4 text-lg font-bold text-ink-900">
            Featured in this guide
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <StoreCard key={store.slug} store={store} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
