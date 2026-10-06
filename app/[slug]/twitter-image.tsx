import { renderShareImage } from "@/lib/og-image";
import { FORM_PRESETS, getPreset } from "@/lib/presets";

export function generateStaticParams() {
  return FORM_PRESETS.map(({ slug }) => ({ slug }));
}

// One image per page; generateImageMetadata is the only way to give it a per-page alt.
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const preset = getPreset(params.slug);
  return [
    {
      id: "default",
      alt: preset
        ? `${preset.name} photo size: ${preset.spec}, ${preset.width} × ${preset.height} px — FormPic`
        : "FormPic photo size guide",
      size: { width: 1200, height: 630 },
      contentType: "image/png",
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const preset = getPreset((await params).slug);
  if (!preset) {
    return renderShareImage({ title: "Photos sized for forms", detail: "In your browser, no upload" });
  }
  return renderShareImage({
    title: `${preset.name} photo`,
    detail: `${preset.spec} · ${preset.width} × ${preset.height} px · free, no upload`,
  });
}
