import { GUIDES } from "@/lib/guides";
import { FORM_PRESETS } from "@/lib/presets";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// A plain-text summary for LLM crawlers (llmstxt.org), built from the same data as the pages.
export const dynamic = "force-static";

export function GET() {
  const pages = FORM_PRESETS.map(
    (preset) =>
      `- [${preset.name} photo](${SITE_URL}/${preset.slug}): ${preset.spec}, ${preset.width} × ${preset.height} px at ${preset.dpi} DPI`
  );
  const answers = GUIDES.map((guide) => `- ${guide.question} ${guide.answer}`);

  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Photos are cropped and resized with the browser's canvas API and saved straight to the user's device. There is no upload, no account and no watermark, and the editor keeps working offline once loaded.",
    "",
    "## Tools",
    "",
    `- [Photo resizer](${SITE_URL}/): any width × height in pixels, JPEG or PNG, with a live file-size estimate`,
    ...pages,
    "",
    "## Photo sizes",
    "",
    ...answers,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
