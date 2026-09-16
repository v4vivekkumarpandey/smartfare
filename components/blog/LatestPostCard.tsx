import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { formatDate } from "@/lib/cn";
import type { BlogPost } from "@/lib/types";

const TYPE_LABEL: Record<string, string> = {
  "sale-calendar": "Sale",
  "gift-guide": "Gift Guides",
};

export function LatestPostCard({ post }: { post: BlogPost }) {
  const badge =
    TYPE_LABEL[post.postType ?? "post"] ??
    (post.category || post.tags[0] || "Blog");

  return (
    <article className="flex flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-brand-50"
      >
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-50 p-4 text-center">
            <span className="text-sm font-bold text-brand-700">
              {post.title}
            </span>
          </div>
        )}
      </Link>

      <span className="mt-4 w-fit rounded-full bg-brand-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
        {badge}
      </span>

      <h3 className="mt-3 text-lg font-bold leading-snug text-ink-900">
        <Link href={`/blog/${post.slug}`} className="hover:text-brand-600">
          {post.title}
        </Link>
      </h3>

      <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
        <CalendarDays width={13} height={13} />
        {formatDate(post.date)}
      </div>

      <p className="mt-3 line-clamp-3 text-sm text-ink-500">{post.excerpt}</p>

      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex w-fit items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
      >
        Read more
      </Link>
    </article>
  );
}
