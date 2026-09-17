import { ImageResponse } from "next/og";
import { getCategory } from "@/lib/content";
import { OgCard, ogSize, ogContentType } from "@/lib/ogTemplate";
import { site } from "@/lib/site";

export const dynamicParams = true;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);
  return new ImageResponse(
    (
      <OgCard
        eyebrow={site.name}
        title={`${category?.name ?? "Category"} Coupons & Promo Codes`}
        subtitle={category?.description}
      />
    ),
    { ...size }
  );
}
