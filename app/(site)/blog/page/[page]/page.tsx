import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getPostsPage } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PostCard } from "@/components/blog/PostCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { Ad } from "@/components/Ad";

export const dynamicParams = true;
export const revalidate = 900;

export async function generateStaticParams() {
  const { totalPages } = await getPostsPage(1);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog — Page ${page}`,
    description:
      "Money-saving guides, coupon how-tos and deal roundups from our editorial team.",
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPagePage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageParam } = await params;
  const page = Number(pageParam);

  if (!Number.isInteger(page) || page < 1) notFound();
  if (page === 1) redirect("/blog");

  const { posts, totalPages } = await getPostsPage(page);
  if (page > totalPages) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: `Page ${page}` }]} />

      <header className="mt-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          The Blog
        </h1>
        <p className="mt-1 text-ink-500">
          Guides, how-tos and deal roundups to help you save more.
        </p>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <BlogPagination page={page} totalPages={totalPages} />
      <Ad />
    </div>
  );
}
