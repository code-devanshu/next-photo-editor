import type { FormPreset } from "@/lib/presets";

export type Faq = { question: string; answer: string };
export type Fact = { label: string; value: string; note?: string };
export type Source = { publisher: string; title: string; url: string };
export type Step = { name: string; detail: string };

/**
 * What a page is about. Each hub page lists one category, and the category picks the
 * breadcrumb trail and the footer column a page appears in.
 */
export type Category = "home" | "hub" | "id" | "visa" | "exam" | "signature" | "kb" | "pixels" | "tool";

/**
 * One line of the official spec, copied from the source rather than derived:
 * "Photo", "Signature", "Left thumb impression". Pages list one row per upload.
 */
export type SpecRow = {
  item: string;
  /** Print size as the source writes it, width first: "35 × 45 mm". */
  printSize?: string;
  /** Pixels as the source writes them: "200 × 230 px", "350–1000 px per side". */
  pixels?: string;
  dpi?: number;
  minKb?: number;
  maxKb?: number;
  format?: string;
  background?: string;
  /** Anything else the source requires for this upload, like a name and date on the photo. */
  notes?: string;
};

/** The words on a page. English lives on the entry itself; a Hindi version repeats these fields. */
export type PageContent = {
  /** Link text in navigation, related links and breadcrumbs: "PAN card photo". */
  name: string;
  /** Shorter link text for the header navigation. */
  navName?: string;
  /** Page title without the " — FormPic" suffix. Keep the full title under about 60 characters. */
  title: string;
  /** Under about 155 characters. */
  metaDescription: string;
  h1: string;
  /** Lighter text that finishes the heading: ", 35 × 45 mm." */
  h1Accent: string;
  intro: string;
  /** The question the page answers first, phrased the way people search it. */
  question?: string;
  answer?: string;
  facts?: Fact[];
  requirements?: { title: string; items: string[]; note?: string };
  /** The official figures, one row per upload, copied from the sources. */
  spec?: { title: string; rows: SpecRow[] };
  /** Numbered how-to steps. Without items, the steps are generated from the preset or limit. */
  steps?: { title: string; items?: Step[] };
  /** Reasons this form rejects uploads, most common first. */
  rejections?: { title: string; items: string[] };
  faqs: Faq[];
  /** Heading for a hub page's list of pages. */
  listTitle?: string;
};

/** Tool settings for a page with a fixed size. The page slug becomes the preset slug. */
export type PresetFields = Omit<FormPreset, "slug">;

export type PageEntry = PageContent & {
  /** URL path without the leading slash. The home page is "". */
  slug: string;
  category: Category;
  /** The size the editor starts with. */
  preset?: PresetFields;
  /** File size limits the editor starts with, for pages without a fixed pixel size. */
  limit?: { minKb?: number; maxKb?: number; kind?: FormPreset["kind"] };
  /** The tool at the top of the page: the photo editor, or the image-to-PDF maker. */
  tool?: "pdf";
  /** Start the editor with the name and date strip on. */
  stamp?: boolean;
  /** Categories a hub page lists. */
  hub?: Exclude<Category, "home" | "hub">[];
  /** Official pages the figures were checked against. */
  sources: Source[];
  /** When the figures were last checked against the sources, as YYYY-MM-DD. */
  lastVerified?: string;
  /** When the page content last changed, as YYYY-MM-DD. Feeds the sitemap and structured data. */
  updated: string;
  /** Slugs shown in the page's related links block. */
  related: string[];
  /** Shown in the editor's size picker and the header navigation. */
  featured?: boolean;
  /** The Hindi version, served at /hi/{slug}. */
  hi?: PageContent & { updated: string };
  /** Unpublished: no route, no sitemap entry and no links until the figures are verified. */
  draft?: boolean;
  /** What still needs checking before a draft can be published. */
  todo?: string[];
};
