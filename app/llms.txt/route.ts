import { PAGES, SUBPAGES, pagePreset } from "@/lib/pages";
import { presetSizeRange } from "@/lib/presets";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// A plain-text summary for LLM crawlers (llmstxt.org), built from the same data as the pages.
export const dynamic = "force-static";

export function GET() {
  const tools = SUBPAGES.flatMap((page) => {
    const preset = pagePreset(page);
    if (preset) {
      const resolution = preset.dpi ? ` at ${preset.dpi} DPI` : "";
      const sizeRange = presetSizeRange(preset);
      return `- [${page.name}](${SITE_URL}/${page.slug}): ${preset.spec}, ${preset.width} × ${preset.height} px${resolution}${sizeRange ? `, JPEG ${sizeRange}` : ""}`;
    }
    const kb = page.limit?.maxKb;
    if (kb) {
      return `- [${page.name}](${SITE_URL}/${page.slug}): the highest JPEG quality that stays under ${kb} KB`;
    }
    return [];
  });
  const answers = PAGES.filter((page) => page.question && page.answer).map(
    (page) => `- ${page.question} ${page.answer}`
  );

  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Photos are cropped and resized with the browser's canvas API and saved straight to the user's device. There is no upload, no account and no watermark, and the editor keeps working offline once loaded.",
    "",
    "## Tools",
    "",
    `- [Photo resizer](${SITE_URL}/): any width × height in pixels, JPEG or PNG, with an optional file size limit in KB`,
    ...tools,
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
