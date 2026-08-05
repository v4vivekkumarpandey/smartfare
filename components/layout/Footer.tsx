import Link from "next/link";
import { getMenu, getSettings } from "@/lib/content";
import { NavLink } from "./NavLink";
import { Brand } from "./Brand";

export async function Footer() {
  const [links, settings] = await Promise.all([
    getMenu("footer"),
    getSettings(),
  ]);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Brand
              settings={settings}
              iconClassName="h-8 w-8"
              textClassName="text-base"
            />
            <p className="mt-3 max-w-xs text-sm text-ink-500">
              {settings.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">Browse</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {links.map((item, i) => (
                <li key={`${item.href}-${i}`}>
                  <NavLink
                    item={item}
                    className="text-ink-500 hover:text-brand-600"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/how-it-works" className="text-ink-500 hover:text-brand-600">How It Works</Link></li>
              <li><Link href="/about" className="text-ink-500 hover:text-brand-600">About Us</Link></li>
              <li><Link href="/contact" className="text-ink-500 hover:text-brand-600">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/privacy" className="text-ink-500 hover:text-brand-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-ink-500 hover:text-brand-600">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-100 pt-6">
          <p className="text-xs leading-relaxed text-ink-500">
            <strong className="text-ink-700">Affiliate disclosure:</strong>{" "}
            {settings.siteName} is reader-supported. When you use a code or click a link
            on our site, we may earn a commission at no extra cost to you. This
            helps us keep our coupons verified and free to use. Prices and offers
            are subject to change; please confirm details on the merchant&apos;s
            site before purchasing.
          </p>
          <p className="mt-4 text-xs text-ink-500">
            © {year} {settings.siteName}. All rights reserved. All trademarks are the
            property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
