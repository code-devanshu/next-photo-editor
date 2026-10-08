import type { MetadataRoute } from "next";
import { PAGES, pagePath } from "@/lib/pages";
import { SITE_URL } from "@/lib/site";

// lastModified is when each page's content changed, not the build time, so crawlers keep trusting it.
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: page.slug ? `${SITE_URL}${pagePath(page)}` : SITE_URL,
    lastModified: page.updated,
    changeFrequency: "monthly" as const,
    priority: page.slug ? 0.8 : 1,
  }));
}
