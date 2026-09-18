import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, User } from "lucide-react";
import { getPost, getPostSlugs, getAllPosts, getStore } from "@/lib/content";
import { site } from "@/lib/site";
import { toAbsoluteUrl, breadcrumbJsonLd } from "@/lib/schema";
import { formatDate } from "@/lib/cn";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { StoreCard } from "@/components/store/StoreCard";
import { JsonLd } from "@/components/JsonLd";
import { Ad } from "@/components/Ad";

export const dynamicParams = true;
export const revalidate = 900;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      images: post.cover ? [post.cover] : undefined,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const postType = post.postType ?? "post";

  const otherPosts = (await getAllPosts()).filter((p) => p.slug !== post.slug);
  const relatedByTopic = otherPosts.filter(
    (p) =>
      (post.category && p.category === post.category) ||
      p.tags.some((t) => post.tags.includes(t))
  );
  const related = [
    ...relatedByTopic,
    ...otherPosts.filter((p) => !relatedByTopic.includes(p)),
  ].slice(0, 3);

  const stores = post.storeSlugs
    ? (await Promise.all(post.storeSlugs.map((s) => getStore(s)))).filter(
        (s): s is NonNullable<typeof s> => Boolean(s)
      )
    : [];

  const jsonLd =
    postType === "sale-calendar"
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: post.title,
          description: post.excerpt,
          startDate: post.startDate ?? post.date,
          endDate: post.endDate ?? post.date,
          eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "VirtualLocation",
            url: `${site.url}/blog/${post.slug}`,
          },
          organizer: { "@type": "Organization", name: site.name, url: site.url },
          image: post.cover ? toAbsoluteUrl(post.cover) : undefined,
        }
      : {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.updatedDate ?? post.date,
          author: {
            "@type": "Organization",
            name: post.author,
            url: `${site.url}/editorial-process`,
          },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
          image: post.cover ? toAbsoluteUrl(post.cover) : undefined,
        };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ])}
      />
      <article className="mx-auto max-w-3xl px-4 py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <header className="mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
            {postType === "sale-calendar" && post.startDate && post.endDate ? (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays width={14} height={14} />
                {formatDate(post.startDate)} – {formatDate(post.endDate)}
              </span>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5">
                  <User width={14} height={14} />{" "}
                  <a href="/editorial-process" className="hover:text-brand-600">
                    {post.author}
                  </a>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays width={14} height={14} /> {formatDate(post.date)}
                </span>
              </>
            )}
          </div>
        </header>

        {post.cover && (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-card bg-brand-50">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {postType === "post" &&
          (post.category === "hosting" || post.category === "software") && (
            <p className="mt-6 rounded-card border border-ink-100 bg-ink-100/40 p-4 text-sm text-ink-500">
              This review is researched from each provider&apos;s official
              pricing, plans and public user feedback — see our{" "}
              <a href="/editorial-process" className="font-semibold text-brand-600 hover:underline">
                editorial process
              </a>{" "}
              for how we keep it accurate.
            </p>
          )}

        <div className="mt-6">
          <PostBody body={post.body} />
        </div>

        <Ad />

        {post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t) => (
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
            {postType === "sale-calendar" ? "Stores in this sale" : "Featured in this guide"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <StoreCard key={store.slug} store={store} />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="mb-4 text-lg font-bold text-ink-900">Read next</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
