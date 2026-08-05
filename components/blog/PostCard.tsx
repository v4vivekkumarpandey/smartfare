import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { formatDate } from "@/lib/cn";
import type { BlogPost } from "@/lib/types";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-ink-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-50">
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
      </div>
      <div className="flex flex-1 flex-col p-5">
        {post.tags.length > 0 && (
          <span className="mb-2 w-fit rounded-full bg-ink-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
            {post.tags[0]}
          </span>
        )}
        <h3 className="font-bold text-ink-900 group-hover:text-brand-600">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-500">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-ink-500">
          <CalendarDays width={13} height={13} />
          {formatDate(post.date)} · {post.author}
        </div>
      </div>
    </Link>
  );
}
