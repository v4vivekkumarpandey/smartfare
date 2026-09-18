import { ImageResponse } from "next/og";
import { getStore, activeCoupons } from "@/lib/content";
import { OgCard, ogSize, ogContentType } from "@/lib/ogTemplate";
import { site } from "@/lib/site";

export const dynamicParams = true;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ store: string }>;
}) {
  const { store: slug } = await params;
  const store = await getStore(slug);
  const count = store ? activeCoupons(store).length : 0;
  return new ImageResponse(
    (
      <OgCard
        eyebrow={site.name}
        title={store ? `${store.name} Promo Codes & Deals` : "Store Coupons"}
        subtitle={
          store
            ? `${count} verified offer${count === 1 ? "" : "s"} — ${store.rating.toFixed(1)}★ Editorial Rating`
            : undefined
        }
      />
    ),
    { ...size }
  );
}
