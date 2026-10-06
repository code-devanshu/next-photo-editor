import { ImageResponse } from "next/og";
import { CropMark } from "@/lib/brand-mark";

// 32 px for browser tabs; 192 and 512 px are what app/manifest.ts needs to make the site installable.
const ICON_SIZES = [32, 192, 512];

export function generateImageMetadata() {
  return ICON_SIZES.map((px) => ({
    id: String(px),
    size: { width: px, height: px },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const px = Number(await id);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Install icons are full-bleed so the OS can apply its own mask shape. */}
      <CropMark size={px} radius={px === 32 ? 7 : 0} />
    </div>,
    { width: px, height: px }
  );
}
