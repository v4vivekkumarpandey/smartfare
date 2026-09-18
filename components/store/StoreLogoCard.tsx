import Link from "next/link";
import { StoreLogo } from "@/components/store/StoreLogo";
import type { Store } from "@/lib/types";

export function StoreLogoCard({ store }: { store: Store }) {
  return (
    <Link
      href={`/coupons/${store.slug}`}
      className="group flex flex-col items-center gap-3 rounded-card border border-ink-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
    >
      <span className="flex h-20 w-full items-center justify-center">
        <StoreLogo
          src={store.logo}
          alt={`${store.name} logo`}
          width={100}
          height={40}
          className="h-10 w-auto max-w-[80%] object-contain"
        />
      </span>
      <span className="text-sm font-semibold text-ink-900 group-hover:text-brand-600">
        {store.name}
      </span>
    </Link>
  );
}
