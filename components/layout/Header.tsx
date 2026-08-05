import { getAllStores, getSettings } from "@/lib/content";
import { SearchBox, type SearchItem } from "./SearchBox";
import { MobileNav } from "./MobileNav";
import { PrimaryNav, type NavStore } from "./PrimaryNav";
import { Brand } from "./Brand";

export async function Header() {
  const [stores, settings] = await Promise.all([
    getAllStores(),
    getSettings(),
  ]);

  const index: SearchItem[] = stores.map((s) => ({
    slug: s.slug,
    name: s.name,
    category: s.category,
  }));
  // "Popular stores" for the Coupons dropdown / mobile menu
  const navStores: NavStore[] = stores
    .slice(0, 8)
    .map((s) => ({ slug: s.slug, name: s.name }));

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Brand settings={settings} />

        <PrimaryNav stores={navStores} />

        <div className="ml-auto hidden w-72 md:block">
          <SearchBox index={index} placeholder="Search stores…" />
        </div>

        <div className="ml-auto md:ml-0">
          <MobileNav stores={navStores} />
        </div>
      </div>
    </header>
  );
}
