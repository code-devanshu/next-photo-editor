/**
 * FormPic's mark: a head-and-shoulders photo on booth yellow, the pictogram on every photo-booth
 * panel. Plain SVG so it renders the same in the site header, icon.tsx, apple-icon.tsx and the OG image.
 */
export function BrandMark({
  size,
  radius = 7,
  background = "#ffd100",
  figure = "#141414",
}: {
  size: number;
  /** Corner radius in the mark's 32-unit grid; 0 for full-bleed install icons the OS masks itself. */
  radius?: number;
  background?: string;
  figure?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx={radius} fill={background} />
      <circle cx="16" cy="12.6" r="5.1" fill={figure} />
      <path d="M7.2 32C7.2 24.2 10.7 20.6 16 20.6S24.8 24.2 24.8 32Z" fill={figure} />
    </svg>
  );
}
