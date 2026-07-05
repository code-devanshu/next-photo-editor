import { renderShareImage } from "@/lib/og-image";
import { FORM_PRESETS, getPreset } from "@/lib/presets";

export const alt = "FormPic photo size guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return FORM_PRESETS.map(({ slug }) => ({ slug }));
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
