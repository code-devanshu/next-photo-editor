import type { Metadata } from "next";

export const SITE_URL = "https://formpic.devanshuverma.in";
export const SITE_NAME = "FormPic";
/** Suggestions and size requests go to the contact form on the author's portfolio. */
export const FEEDBACK_URL = "https://www.devanshuverma.in/#contact";
export const SITE_DESCRIPTION =
  "Crop and resize photos for passport, visa, PAN card and exam forms in your browser. Exact pixels, any KB limit, free, and nothing is uploaded.";

/** Per-page metadata. Pages set their own Open Graph block because nested metadata objects replace, not merge. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  languages,
  locale = "en_IN",
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  /** hreflang alternates, keyed by language tag, including the page itself. */
  languages?: Record<string, string>;
  locale?: string;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, ...(languages && { languages }) },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Serializes structured data for a `<script type="application/ld+json">`, escaping `<` per the Next.js JSON-LD guide. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
