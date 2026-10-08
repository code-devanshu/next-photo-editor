import { BANKING_PAGES } from "@/lib/pages/banking";
import { DOCUMENT_PAGES } from "@/lib/pages/documents";
import { ENTRANCE_PAGES } from "@/lib/pages/entrance";
import { EXAM_PAGES } from "@/lib/pages/exams";
import { HINDI } from "@/lib/pages/hindi";
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
import type { Lang } from "@/lib/ui-text";
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

// Hindi versions live in their own file for readability; attach each to its entry by slug.
for (const page of ALL_PAGES) {
  const hindi = HINDI[page.slug];
  if (hindi) page.hi = hindi;
}

/** Pages with a route. Drafts stay out of routes, the sitemap and every link list. */
export const PAGES = ALL_PAGES.filter((page) => !page.draft);

export { HOME_PAGE };

/** Published pages other than the home page, for `generateStaticParams`. */
export const SUBPAGES = PAGES.filter((page) => page.slug !== "");

/** Published pages with a Hindi version, the home page included. */
export const HINDI_PAGES = PAGES.filter((page) => page.hi);

export function getPage(slug: string) {
  return PAGES.find((page) => page.slug === slug);
}

export function pagesIn(category: Category) {
  return PAGES.filter((page) => page.category === category);
}

/** The site-relative URL of a page: "/" or "/pan-card-photo", and "/hi" or "/hi/pan-card-photo" in Hindi. */
export function pagePath(page: Pick<PageEntry, "slug">, lang: Lang = "en") {
  const prefix = lang === "hi" ? "/hi" : "";
  return page.slug ? `${prefix}/${page.slug}` : prefix || "/";
}

// Optional sections a translation may leave out. They're cleared first, so a Hindi page never shows English.
const OPTIONAL_CONTENT = {
  navName: undefined,
  question: undefined,
  answer: undefined,
  facts: undefined,
  requirements: undefined,
  spec: undefined,
  steps: undefined,
  rejections: undefined,
  listTitle: undefined,
};

/** The page's words in a language, or the English page when there's no translation. */
export function localize(page: PageEntry, lang: Lang): PageEntry {
  return lang === "hi" && page.hi ? { ...page, ...OPTIONAL_CONTENT, ...page.hi } : page;
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
export function pageUrl(page: Pick<PageEntry, "slug">, lang: Lang = "en") {
  const path = pagePath(page, lang);
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** The hub that lists a page's category, if any. */
export function hubFor(page: PageEntry) {
  return PAGES.find((hub) => hub.hub?.includes(page.category as never));
}

/** The published pages a hub lists, in config order. */
export function hubMembers(hub: PageEntry) {
  return PAGES.filter((page) => hub.hub?.includes(page.category as never));
}

/**
 * Home, then the page's hub if it has one, then the page itself. Empty for the home page. A Hindi
 * trail skips hubs that have no Hindi version, so it never switches language halfway.
 */
export function breadcrumbs(page: PageEntry, lang: Lang = "en"): { name: string; path: string; url: string }[] {
  if (!page.slug) return [];
  const hub = hubFor(page);
  const showHub = hub && (lang === "en" || hub.hi);
  return [
    { name: SITE_NAME, path: pagePath(HOME_PAGE, lang), url: pageUrl(HOME_PAGE, lang) },
    ...(showHub ? [{ name: localize(hub, lang).name, path: pagePath(hub, lang), url: pageUrl(hub, lang) }] : []),
    { name: localize(page, lang).name, path: pagePath(page, lang), url: pageUrl(page, lang) },
  ];
}

// A Hindi page's related block is filled up to this many with other Hindi pages.
const HINDI_RELATED_SIZE = 4;

/** The pages a page links to in its related block, skipping drafts, and in Hindi only Hindi pages. */
export function relatedPages(page: PageEntry, lang: Lang = "en") {
  const related = page.related.map(getPage).filter((other): other is PageEntry => !!other);
  if (lang === "en") return related;
  const hindi = related.filter((other) => other.hi);
  const extra = HINDI_PAGES.filter((other) => other.slug && other.slug !== page.slug && !hindi.includes(other));
  return [...hindi, ...extra].slice(0, Math.max(HINDI_RELATED_SIZE, hindi.length));
}

// Catch config mistakes at build time: a typo in a related or Hindi slug would otherwise drop a page silently.
for (const slug of Object.keys(HINDI)) {
  if (!ALL_PAGES.some((page) => page.slug === slug)) throw new Error(`Hindi version for unknown page: "${slug}"`);
}
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
