import { ImageResponse } from "next/og";
import { CropMark } from "@/lib/brand-mark";
import { SITE_NAME } from "@/lib/site";

/** Shared 1200×630 card for the opengraph-image and twitter-image routes. */
export function renderShareImage({ title, detail }: { title: string; detail: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f5f4f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <CropMark size={64} radius={16} />
          <div style={{ fontSize: 36, fontWeight: 700, color: "#1c1b18", display: "flex" }}>
            {SITE_NAME}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#1c1b18",
              display: "flex",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 36, color: "#a5401c", display: "flex" }}>{detail}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
