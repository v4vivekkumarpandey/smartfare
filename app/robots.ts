import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Don't crawl outbound affiliate redirects or the reveal/API endpoints
      disallow: ["/go/", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
