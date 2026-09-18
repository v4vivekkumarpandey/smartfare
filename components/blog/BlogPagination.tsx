import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function pageHref(page: number): string {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-10 flex items-center justify-between gap-4"
    >
      {page > 1 ? (
        <Link
          href={pageHref(page - 1)}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-900 transition hover:border-brand-300 hover:text-brand-600"
        >
          <ChevronLeft width={16} height={16} /> Previous
        </Link>
      ) : (
        <span />
      )}

      <span className="text-sm text-ink-500">
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={pageHref(page + 1)}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-900 transition hover:border-brand-300 hover:text-brand-600"
        >
          Next <ChevronRight width={16} height={16} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
