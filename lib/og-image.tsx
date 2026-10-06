import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/brand-mark";
import { GUIDES, LIMIT_GUIDES, getLimitGuide } from "@/lib/guides";
import { getPreset, presetTitle } from "@/lib/presets";
import { SITE_NAME } from "@/lib/site";

const INK = "#141414";
const BOOTH = "#ffd100";
const STAGE = "#1a1a18";

// Satori can't read variable fonts, so static Archivo instances live in assets/ (SIL OFL).
async function loadFonts() {
  const [display, text] = await Promise.all([
    readFile(join(process.cwd(), "assets/Archivo-Condensed-ExtraBold.ttf")),
    readFile(join(process.cwd(), "assets/Archivo-SemiBold.ttf")),
  ]);
  return [
    { name: "Archivo Condensed", data: display, weight: 800 as const, style: "normal" as const },
    { name: "Archivo", data: text, weight: 600 as const, style: "normal" as const },
  ];
}

function StripFrame() {
  return (
    <div style={{ width: 196, height: 176, background: STAGE, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <svg width="150" height="150" viewBox="0 0 40 40">
        <circle cx="20" cy="15" r="7.5" fill={BOOTH} />
        <path d="M5.5 40C5.5 30.5 11.5 26 20 26S34.5 30.5 34.5 40Z" fill={BOOTH} />
      </svg>
    </div>
  );
}

/** Shared 1200×630 card for the opengraph-image and twitter-image routes: booth-yellow panel and a print strip. */
export async function renderShareImage({ title, detail }: { title: string; detail: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: BOOTH,
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 0 72px 80px",
            width: 820,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <BrandMark size={64} radius={7} background={INK} figure={BOOTH} />
            <div style={{ fontFamily: "Archivo Condensed", fontSize: 50, color: INK, display: "flex" }}>
              {SITE_NAME}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <div
              style={{
                fontFamily: "Archivo Condensed",
                fontSize: 108,
                lineHeight: 0.95,
                textTransform: "uppercase",
                color: INK,
                display: "flex",
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: 30, color: "#3b3409", display: "flex" }}>{detail}</div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 92,
            top: -40,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: 16,
            background: "#ffffff",
            transform: "rotate(4deg)",
            boxShadow: "0 18px 40px rgba(20,20,20,0.35)",
          }}
        >
          <StripFrame />
          <StripFrame />
          <StripFrame />
          <StripFrame />
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await loadFonts() }
  );
}

/** Every guide page's slug, for the opengraph-image and twitter-image routes under app/[slug]. */
export function guideImageParams() {
  return [...GUIDES, ...LIMIT_GUIDES].map(({ slug }) => ({ slug }));
}

export function guideImageAlt(slug: string) {
  const preset = getPreset(slug);
  if (preset) {
    return `${presetTitle(preset)} size: ${preset.spec}, ${preset.width} × ${preset.height} px — ${SITE_NAME}`;
  }
  const limit = getLimitGuide(slug);
  if (limit) return `Resize an image to ${limit.kb} KB, in your browser — ${SITE_NAME}`;
  return `${SITE_NAME} photo size guide`;
}

export function renderGuideImage(slug: string) {
  const preset = getPreset(slug);
  if (preset) {
    return renderShareImage({
      title: presetTitle(preset),
      detail: `${preset.spec} · ${preset.width} × ${preset.height} px · free, no upload`,
    });
  }
  const limit = getLimitGuide(slug);
  if (limit) {
    return renderShareImage({
      title: `Resize image to ${limit.kb} KB`,
      detail: "Best JPEG quality that fits · free, no upload",
    });
  }
  return renderShareImage({ title: "Photos sized for forms", detail: "In your browser, no upload" });
}
