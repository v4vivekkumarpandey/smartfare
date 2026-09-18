import Link from "next/link";
import Image from "next/image";
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
        <Image
          src={settings.logoUrl}
          alt={settings.siteName}
          width={0}
          height={0}
          sizes="200px"
          style={{ width: "auto", height: "100%" }}
          className={iconClassName}
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
