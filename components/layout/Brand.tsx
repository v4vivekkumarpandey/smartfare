import Link from "next/link";
import { Ticket } from "lucide-react";
import type { SiteSettings } from "@/lib/settings";

/** Site logo + name, driven by settings. Uses a logo image when provided. */
export function Brand({
  settings,
  iconClassName = "h-9 w-9",
  textClassName = "text-lg",
}: {
  settings: SiteSettings;
  iconClassName?: string;
  textClassName?: string;
}) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2">
      {settings.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={settings.logoUrl}
          alt={settings.siteName}
          className={`${iconClassName} w-auto object-contain`}
        />
      ) : (
        <>
          <span
            className={`flex items-center justify-center rounded-xl bg-brand-600 text-white ${iconClassName}`}
          >
            <Ticket width={20} height={20} />
          </span>
          <span
            className={`font-extrabold tracking-tight text-ink-900 ${textClassName}`}
          >
            {settings.siteName}
          </span>
        </>
      )}
    </Link>
  );
}
