import { ImageResponse } from "next/og";
import { OgCard, ogSize, ogContentType } from "@/lib/ogTemplate";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow={site.name}
        title="The Blog — Savings Guides & Deal Roundups"
        subtitle="Money-saving guides, coupon how-tos and deal roundups from our editorial team."
      />
    ),
    { ...size }
  );
}
