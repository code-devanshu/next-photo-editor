import type { MetadataRoute } from "next";
import { PAGES, pageUrl, type PageEntry } from "@/lib/pages";
import { LANG_TAG } from "@/lib/ui-text";

/** The same hreflang set on both language versions, so each lists the other and itself. */
function alternates(page: PageEntry) {
  if (!page.hi) return undefined;
  return {
    languages: {
      [LANG_TAG.en]: pageUrl(page, "en"),
      [LANG_TAG.hi]: pageUrl(page, "hi"),
      "x-default": pageUrl(page, "en"),
    },
  };
}

// lastModified is when each page's content changed, not the build time, so crawlers keep trusting it.
export default function sitemap(): MetadataRoute.Sitemap {
  const english = PAGES.map((page) => ({
    url: pageUrl(page, "en"),
    lastModified: page.updated,
    changeFrequency: "monthly" as const,
    priority: page.slug ? (page.category === "hub" ? 0.9 : 0.8) : 1,
    alternates: alternates(page),
  }));
  const hindi = PAGES.filter((page) => page.hi).map((page) => ({
    url: pageUrl(page, "hi"),
    lastModified: page.hi!.updated,
    changeFrequency: "monthly" as const,
    priority: page.slug ? 0.7 : 0.9,
    alternates: alternates(page),
  }));
  return [...english, ...hindi];
}
