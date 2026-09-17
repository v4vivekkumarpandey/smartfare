import { ImageResponse } from "next/og";
import { getAllStores } from "@/lib/content";
import { OgCard, ogSize, ogContentType } from "@/lib/ogTemplate";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const stores = await getAllStores();
  return new ImageResponse(
    (
      <OgCard
        eyebrow={site.name}
        title="All Stores — Coupons & Promo Codes"
        subtitle={`${stores.length} store${stores.length === 1 ? "" : "s"} with verified coupons, updated daily.`}
      />
    ),
    { ...size }
  );
}
