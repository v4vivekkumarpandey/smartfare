import Link from "next/link";
import { StoreLogo } from "@/components/store/StoreLogo";
import { activeCoupons } from "@/lib/content";
import type { Store } from "@/lib/types";

export function StoreOfMonthCard({ store }: { store: Store }) {
  const active = activeCoupons(store);
  const coupons = active.filter((c) => c.type === "code").length;
  const offers = active.filter((c) => c.type === "deal").length;

  return (
    <Link
      href={`/coupons/${store.slug}`}
      className="group flex flex-col overflow-hidden rounded-card bg-ink-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="p-5 pb-0">
        <span className="text-xs font-extrabold uppercase tracking-wide text-accent-500">
          Most Popular
        </span>
        <h3 className="mt-1 text-xl font-extrabold text-white">
          Store Of The Month
        </h3>
      </div>

      <div className="my-5 flex h-28 items-center justify-center bg-white/5">
        <StoreLogo
          src={store.logo}
          alt={`${store.name} logo`}
          width={140}
          height={56}
          className="h-14 w-auto max-w-[70%] object-contain"
        />
      </div>

      <div className="flex items-center justify-center gap-6 px-5 text-center text-white">
        <div>
          <div className="text-lg font-extrabold">{coupons}</div>
          <div className="text-xs text-white/60">Coupons</div>
        </div>
        <div className="h-8 w-px bg-white/15" />
        <div>
          <div className="text-lg font-extrabold">{offers}</div>
          <div className="text-xs text-white/60">Offers</div>
        </div>
      </div>

      <div className="p-5">
        <span className="block rounded-full bg-accent-500 px-4 py-2.5 text-center text-sm font-extrabold text-white transition group-hover:bg-accent-600">
          Visit Store
        </span>
      </div>
    </Link>
  );
}
