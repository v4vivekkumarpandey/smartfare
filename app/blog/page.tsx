import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PostCard } from "@/components/blog/PostCard";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Blog — Savings Guides & Deal Roundups",
  description:
    "Money-saving guides, coupon how-tos and deal roundups from our editorial team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <header className="mt-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          The Blog
        </h1>
        <p className="mt-1 text-ink-500">
          Guides, how-tos and deal roundups to help you save more.
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-card border border-ink-100 bg-white p-8 text-center text-ink-500">
          No posts yet — check back soon.
        </p>
      )}
    </div>
  );
}
