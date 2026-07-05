/** Shared crop-corner mark used by icon.tsx, apple-icon.tsx, and the OG image. */
export function CropMark({
  size,
  radius = 0,
  background = "#1c1b18",
  mark = "#d4552b",
}: {
  size: number;
  radius?: number;
  background?: string;
  mark?: string;
}) {
  const glyph = Math.round(size * 0.56);
  const corner = Math.round(glyph * 0.44);
  const thickness = Math.max(2, Math.round(size * 0.09));

  const cornerStyle = {
    position: "absolute" as const,
    width: corner,
    height: corner,
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: glyph,
          height: glyph,
          display: "flex",
        }}
      >
        <div
          style={{
            ...cornerStyle,
            top: 0,
            left: 0,
            borderTop: `${thickness}px solid ${mark}`,
            borderLeft: `${thickness}px solid ${mark}`,
          }}
        />
        <div
          style={{
            ...cornerStyle,
            bottom: 0,
            right: 0,
            borderBottom: `${thickness}px solid ${mark}`,
            borderRight: `${thickness}px solid ${mark}`,
          }}
        />
      </div>
    </div>
  );
}
