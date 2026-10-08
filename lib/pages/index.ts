import { BANKING_PAGES } from "@/lib/pages/banking";
import { DOCUMENT_PAGES } from "@/lib/pages/documents";
import { ENTRANCE_PAGES } from "@/lib/pages/entrance";
import { EXAM_PAGES } from "@/lib/pages/exams";
import { HOME_PAGE } from "@/lib/pages/home";
import { HUB_PAGES } from "@/lib/pages/hubs";
import { LIMIT_PAGES } from "@/lib/pages/limits";
import { RAILWAY_PAGES } from "@/lib/pages/railways";
import { SIZE_PAGES } from "@/lib/pages/sizes";
import { SSC_PAGES } from "@/lib/pages/ssc";
import { THUMB_PAGE } from "@/lib/pages/thumb";
import { TOOL_PAGES } from "@/lib/pages/tools";
import { VISA_PAGES } from "@/lib/pages/visas";
import type { Category, PageEntry } from "@/lib/pages/types";
import type { FormPreset } from "@/lib/presets";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export type { Category, Faq, Fact, PageEntry, Source, SpecRow, Step } from "@/lib/pages/types";

/**
 * Every page on the site, drafts included. Routes, the sitemap, structured data and
 * internal links are all built from this list, so adding a page means adding one entry.
 */
export const ALL_PAGES: PageEntry[] = [
  HOME_PAGE,
  ...HUB_PAGES,
  ...DOCUMENT_PAGES,
  ...VISA_PAGES,
  ...EXAM_PAGES,
  ...SSC_PAGES,
  ...BANKING_PAGES,
  ...RAILWAY_PAGES,
  ...ENTRANCE_PAGES,
  THUMB_PAGE,
  ...SIZE_PAGES,
  ...LIMIT_PAGES,
  ...TOOL_PAGES,
];

/** Pages with a route. Drafts stay out of routes, the sitemap and every link list. */
export const PAGES = ALL_PAGES.filter((page) => !page.draft);

export { HOME_PAGE };

/** Published pages other than the home page, for `generateStaticParams`. */
export const SUBPAGES = PAGES.filter((page) => page.slug !== "");

export function getPage(slug: string) {
  return PAGES.find((page) => page.slug === slug);
}

export function pagesIn(category: Category) {
  return PAGES.filter((page) => page.category === category);
}

/** The site-relative URL of a page: "/" for home, "/pan-card-photo" otherwise. */
export function pagePath(page: Pick<PageEntry, "slug">) {
  return page.slug ? `/${page.slug}` : "/";
}

/** The editor's preset for a page with a fixed size. */
export function pagePreset(page: PageEntry): FormPreset | undefined {
  return page.preset && { slug: page.slug, ...page.preset };
}

/** Presets shown in the editor's size picker and the header navigation, in config order. */
export const FEATURED_PRESETS: FormPreset[] = PAGES.filter((page) => page.featured)
  .map(pagePreset)
  .filter((preset): preset is FormPreset => !!preset);

/** The absolute URL of a page, as used in canonicals, structured data and the sitemap. */
export function pageUrl(page: Pick<PageEntry, "slug">) {
  return page.slug ? `${SITE_URL}/${page.slug}` : SITE_URL;
}

/** The hub that lists a page's category, if any. */
export function hubFor(page: PageEntry) {
  return PAGES.find((hub) => hub.hub?.includes(page.category as never));
}

/** The published pages a hub lists, in config order. */
export function hubMembers(hub: PageEntry) {
  return PAGES.filter((page) => hub.hub?.includes(page.category as never));
}

/** Home, then the page's hub if it has one, then the page itself. Empty for the home page. */
export function breadcrumbs(page: PageEntry): { name: string; path: string; url: string }[] {
  if (!page.slug) return [];
  const hub = hubFor(page);
  return [
    { name: SITE_NAME, path: "/", url: SITE_URL },
    ...(hub ? [{ name: hub.name, path: pagePath(hub), url: pageUrl(hub) }] : []),
    { name: page.name, path: pagePath(page), url: pageUrl(page) },
  ];
}

/** The pages a page links to in its related block, skipping drafts. */
export function relatedPages(page: PageEntry) {
  return page.related.map(getPage).filter((related): related is PageEntry => !!related);
}

// Catch config mistakes at build time: a typo in a related slug would otherwise drop a link silently.
for (const page of ALL_PAGES) {
  if (ALL_PAGES.filter((other) => other.slug === page.slug).length > 1) {
    throw new Error(`Duplicate page slug: "${page.slug}"`);
  }
  for (const slug of page.related) {
    if (!ALL_PAGES.some((other) => other.slug === slug)) {
      throw new Error(`Page "${page.slug}" lists an unknown related slug: "${slug}"`);
    }
  }
}
