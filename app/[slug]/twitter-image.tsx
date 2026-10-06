import { guideImageAlt, guideImageParams, renderGuideImage } from "@/lib/og-image";

export function generateStaticParams() {
  return guideImageParams();
}

// One image per page; generateImageMetadata is the only way to give it a per-page alt.
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  return [
    {
      id: "default",
      alt: guideImageAlt(params.slug),
      size: { width: 1200, height: 630 },
      contentType: "image/png",
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return renderGuideImage((await params).slug);
}
