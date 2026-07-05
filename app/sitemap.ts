import type { MetadataRoute } from "next";
import { FORM_PRESETS } from "@/lib/presets";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...FORM_PRESETS.map((preset) => ({
      url: `${SITE_URL}/${preset.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
