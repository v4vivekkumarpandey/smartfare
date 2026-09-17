import { ImageResponse } from "next/og";
import { getSettings } from "@/lib/content";
import { OgCard, ogSize, ogContentType } from "@/lib/ogTemplate";

export const alt = "TheSmartFares — Verified Coupons, Promo Codes & Deals";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const settings = await getSettings();
  return new ImageResponse(
    (
      <OgCard
        eyebrow={settings.siteName}
        title="Verified Coupons, Promo Codes & Deals"
        subtitle={settings.description}
      />
    ),
    { ...size }
  );
}
