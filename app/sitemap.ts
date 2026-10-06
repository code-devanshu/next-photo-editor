import type { MetadataRoute } from "next";
import { GUIDES, HOME_UPDATED } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

// lastModified is when each page's content changed, not the build time, so crawlers keep trusting it.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: HOME_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...GUIDES.map((guide) => ({
      url: `${SITE_URL}/${guide.slug}`,
      lastModified: guide.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
