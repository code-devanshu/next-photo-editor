import type { Faq, Source } from "@/lib/guides";
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
      inLanguage: "en",
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
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Crop and resize photos in the browser with no upload",
        "Passport size (35×45 mm), US passport and visa (2×2 in), and PAN card (25×35 mm) presets",
        "Exact pixel sizes with an aspect-ratio lock",
        "JPEG or PNG export with adjustable quality and a live file-size estimate",
        "Camera capture on phones and laptops",
      ],
    },
  ],
};

/**
 * The page itself, typed as an FAQPage so its questions stay eligible for FAQ results.
 * Guide pages also pass a breadcrumb name and the official sources they cite.
 */
export function pageSchema({
  path,
  name,
  description,
  dateModified,
  faqs,
  breadcrumbName,
  sources,
}: {
  path: string;
  name: string;
  description: string;
  dateModified: string;
  faqs: Faq[];
  breadcrumbName?: string;
  sources?: Source[];
}) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    dateModified,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#app` },
    ...(breadcrumbName && {
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: breadcrumbName, item: url },
        ],
      },
    }),
    ...(sources && {
      citation: sources.map((source) => ({
        "@type": "WebPage",
        name: source.title,
        url: source.url,
        publisher: { "@type": "Organization", name: source.publisher },
      })),
    }),
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
