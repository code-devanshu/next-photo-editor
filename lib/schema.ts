import type { Faq, Source } from "@/lib/pages";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: ["en-IN", "hi-IN"],
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern web browser",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
      featureList: [
        "Crop and resize photos in the browser with no upload",
        "Presets for passport, visa, PAN card, exam and signature uploads, checked against official notices",
        "Exact pixel sizes with an aspect-ratio lock",
        "JPEG or PNG export with a live file-size estimate",
        "Compression to a KB limit, and raising small files above a KB minimum",
        "Name and date printed on the photo",
        "Images to a PDF under a KB limit",
        "Camera capture on phones and laptops",
      ],
    },
  ],
};

export type Crumb = { name: string; url: string };

/**
 * The page and its breadcrumb trail. The page is typed as an FAQPage when it has questions, so they
 * stay eligible for FAQ results; the questions are the same strings the page shows.
 */
export function pageSchema({
  url,
  name,
  description,
  dateModified,
  faqs,
  breadcrumbs,
  sources,
  inLanguage = "en-IN",
}: {
  url: string;
  name: string;
  description: string;
  dateModified: string;
  faqs: Faq[];
  /** The trail from the home page to this page, both included. Omitted on the home page. */
  breadcrumbs?: Crumb[];
  sources?: Source[];
  inLanguage?: string;
}) {
  const breadcrumbId = `${url}#breadcrumb`;
  const page = {
    "@type": faqs.length > 0 ? ["WebPage", "FAQPage"] : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage,
    dateModified,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#app` },
    ...(breadcrumbs && { breadcrumb: { "@id": breadcrumbId } }),
    ...(sources &&
      sources.length > 0 && {
        citation: sources.map((source) => ({
          "@type": "WebPage",
          name: source.title,
          url: source.url,
          publisher: { "@type": "Organization", name: source.publisher },
        })),
      }),
    ...(faqs.length > 0 && {
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    }),
  };
  const trail = breadcrumbs && {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
  return { "@context": "https://schema.org", "@graph": trail ? [page, trail] : [page] };
}
