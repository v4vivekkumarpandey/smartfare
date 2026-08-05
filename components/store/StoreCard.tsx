import Link from "next/link";
import Image from "next/image";
import { Rating } from "@/components/ui/Rating";
import { activeCoupons } from "@/lib/content";
import type { Store } from "@/lib/types";

export function StoreCard({ store }: { store: Store }) {
  const active = activeCoupons(store);
  const best = active.reduce<string | null>((acc, c) => acc ?? c.discount, null);

  return (
    <Link
      href={`/coupons/${store.slug}`}
      className="group flex flex-col rounded-card border border-ink-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <Image
          src={store.logo}
          unoptimized
          alt={`${store.name} logo`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-xl object-contain"
        />
        <div className="min-w-0">
          <h3 className="truncate font-bold text-ink-900 group-hover:text-brand-600">
            {store.name}
          </h3>
          <Rating value={store.rating} reviewCount={store.reviewCount} size={13} />
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-ink-500">{store.tagline}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
          {active.length} offer{active.length === 1 ? "" : "s"}
        </span>
        {best && (
          <span className="text-xs font-semibold text-accent-600">
            Up to {best}
          </span>
        )}
      </div>
    </Link>
  );
}
