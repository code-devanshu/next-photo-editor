import type { Metadata } from "next";
import { localize, pagePath, type PageEntry } from "@/lib/pages";
import { SITE_NAME, pageMetadata } from "@/lib/site";
import { LANG_TAG, type Lang } from "@/lib/ui-text";

/**
 * A page's metadata in one language: self-referencing canonical, and reciprocal hreflang links
 * (en-IN, hi-IN, x-default to English) when the page has a Hindi version.
 */
export function buildMetadata(page: PageEntry, lang: Lang): Metadata {
  const local = localize(page, lang);
  const isHome = !page.slug;
  const languages = page.hi
    ? {
        [LANG_TAG.en]: pagePath(page, "en"),
        [LANG_TAG.hi]: pagePath(page, "hi"),
        "x-default": pagePath(page, "en"),
      }
    : undefined;
  return pageMetadata({
    title: isHome ? `${local.title} — ${SITE_NAME}` : local.title,
    description: local.metaDescription,
    path: pagePath(page, lang),
    absoluteTitle: isHome,
    languages,
    locale: lang === "hi" ? "hi_IN" : "en_IN",
  });
}
