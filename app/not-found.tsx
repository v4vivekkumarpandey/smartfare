import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <SearchX width={32} height={32} />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold text-ink-900">
        Page not found
      </h1>
      <p className="mt-2 text-ink-500">
        The coupon or store you&apos;re looking for may have expired or moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700"
      >
        Back to homepage
      </Link>
    </div>
  );
}
