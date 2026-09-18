import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
import { ConsentBanner } from "@/components/ConsentBanner";
import { getSettings } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const defaultTitle = `${settings.siteName} — Verified Coupons, Promo Codes & Deals`;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: defaultTitle,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: settings.siteName,
      title: defaultTitle,
      description: settings.description,
      url: site.url,
    },
    twitter: {
      card: "summary_large_image",
      site: site.social.twitter,
    },
    robots: { index: true, follow: true },
    // Google Search Console HTML-tag verification
    ...(site.googleSiteVerification
      ? { verification: { google: site.googleSiteVerification } }
      : {}),
    // AdSense site verification (no ads served by this tag — ad units live on blog pages only)
    ...(site.adsenseClient
      ? { other: { "google-adsense-account": site.adsenseClient } }
      : {}),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
