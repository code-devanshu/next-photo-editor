export type FormPreset = {
  /** URL of the preset's guide page, e.g. `/pan-card-photo`. */
  slug: string;
  name: string;
  spec: string;
  /** Print aspect ratio (width / height), from the physical size. */
  aspect: number;
  width: number;
  height: number;
  /** Resolution the pixel size is derived from. */
  dpi: number;
};

// Pixel sizes are the physical size at the DPI each document is specified at:
// 300 DPI for print-quality passport photos, 200 DPI per Protean's PAN scan spec.
export const FORM_PRESETS: FormPreset[] = [
  {
    slug: "passport-size-photo",
    name: "Passport size",
    spec: "35×45 mm",
    aspect: 35 / 45,
    width: 413,
    height: 531,
    dpi: 300,
  },
  {
    slug: "us-passport-photo",
    name: "US passport & visa",
    spec: "2×2 in",
    aspect: 1,
    width: 600,
    height: 600,
    dpi: 300,
  },
  {
    slug: "pan-card-photo",
    name: "PAN card",
    spec: "25×35 mm",
    aspect: 25 / 35,
    width: 197,
    height: 276,
    dpi: 200,
  },
];

export function getPreset(slug: string) {
  return FORM_PRESETS.find((preset) => preset.slug === slug);
}
