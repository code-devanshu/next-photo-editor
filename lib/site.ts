import type { Metadata } from "next";

export const SITE_URL = "https://formpic.devanshuverma.in";
export const SITE_NAME = "FormPic";
export const SITE_DESCRIPTION =
  "Crop and resize photos for passport, visa, PAN card and other application forms, right in your browser. Exact pixel sizes, JPEG or PNG, free, and nothing is uploaded.";

/** Per-page metadata. Pages set their own Open Graph block because nested metadata objects replace, not merge. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
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
