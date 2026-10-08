import type { FormPreset } from "@/lib/presets";

/**
 * A preset's print drawn at true relative size (`scale` px per mm), with a head-and-shoulders
 * guide inside, or a pen stroke for signatures. Lay several on one baseline and 25×35 mm visibly
 * sits smaller than 2×2 in.
 */
export function PresetOutline({
  preset,
  scale = 1,
  className,
}: {
  preset: Pick<FormPreset, "printMm" | "kind">;
  scale?: number;
  className?: string;
}) {
  const { width, height } = preset.printMm;
  const headR = height * 0.16;
  const headY = height * 0.4;
  const shoulderTop = headY + headR + height * 0.06;
  const shoulderHalf = Math.min(width * 0.4, height * 0.36);
  const cx = width / 2;
  // A looping pen stroke across the middle, as fractions of the box.
  const stroke = [
    [0.12, 0.66],
    [0.2, 0.1],
    [0.27, 0.1],
    [0.3, 0.6],
    [0.42, 0.25],
    [0.5, 0.55],
    [0.66, 0.3],
    [0.72, 0.5],
    [0.84, 0.62],
    [0.9, 0.36],
  ].map(([x, y]) => `${x * width} ${y * height}`);

  return (
    <svg
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="currentColor"
        fillOpacity="0.07"
        stroke="currentColor"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
      />
      {preset.kind === "thumb" ? (
        // A thumbprint: an upright oval with a few ridge lines inside it.
        <g fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
          {[0.34, 0.24, 0.14].map((r) => (
            <ellipse key={r} cx={cx} cy={height / 2} rx={width * r * 0.8} ry={height * r} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      ) : preset.kind === "signature" ? (
        <path
          d={`M ${stroke[0]} C ${stroke[1]}, ${stroke[2]}, ${stroke[3]} S ${stroke[4]}, ${stroke[5]} S ${stroke[6]}, ${stroke[7]} S ${stroke[8]}, ${stroke[9]}`}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.7"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ) : (
        <>
          <circle cx={cx} cy={headY} r={headR} fill="currentColor" fillOpacity="0.55" />
          <path
            d={`M ${cx - shoulderHalf} ${height} C ${cx - shoulderHalf} ${shoulderTop + height * 0.04}, ${
              cx - shoulderHalf * 0.45
            } ${shoulderTop}, ${cx} ${shoulderTop} C ${cx + shoulderHalf * 0.45} ${shoulderTop}, ${
              cx + shoulderHalf
            } ${shoulderTop + height * 0.04}, ${cx + shoulderHalf} ${height} Z`}
            fill="currentColor"
            fillOpacity="0.55"
          />
        </>
      )}
    </svg>
  );
}
