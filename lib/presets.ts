export type FormPreset = {
  /** URL of the preset's guide page, e.g. `/pan-card-photo`. */
  slug: string;
  name: string;
  /** Signatures get a pen-stroke outline and aren't called "photo". */
  kind?: "signature";
  /** Passport and ID documents lead the header nav; exam forms are grouped after them. */
  group: "id" | "exam";
  spec: string;
  /** Physical print size in millimetres, used to draw presets at true relative scale. */
  printMm: { width: number; height: number };
  /** Crop aspect ratio (width / height): the print shape, or the pixel shape when the form gives pixels. */
  aspect: number;
  width: number;
  height: number;
  /** Resolution the pixel size is derived from. Absent when the form specifies pixels directly. */
  dpi?: number;
  /** Upload limit from the official spec, applied as the file size limit when the preset is picked. */
  maxKb?: number;
  /** Smallest file the form accepts. FormPic warns when the download would fall below it. */
  minKb?: number;
};

// Pixel sizes are the physical size at the DPI each document is specified at:
// 300 DPI for print-quality passport photos, 200 DPI per Protean's PAN scan spec.
export const FORM_PRESETS: FormPreset[] = [
  {
    slug: "passport-size-photo",
    name: "Passport size",
    group: "id",
    spec: "35×45 mm",
    printMm: { width: 35, height: 45 },
    aspect: 35 / 45,
    width: 413,
    height: 531,
    dpi: 300,
  },
  {
    slug: "us-passport-photo",
    name: "US passport & visa",
    group: "id",
    spec: "2×2 in",
    printMm: { width: 50.8, height: 50.8 },
    aspect: 1,
    width: 600,
    height: 600,
    dpi: 300,
    maxKb: 240,
  },
  {
    slug: "pan-card-photo",
    name: "PAN card",
    group: "id",
    spec: "25×35 mm",
    printMm: { width: 25, height: 35 },
    aspect: 25 / 35,
    width: 197,
    height: 276,
    dpi: 200,
    maxKb: 20,
  },
  {
    // UPSC accepts 350 to 1000 px per side; passport size at 300 DPI sits inside that range.
    slug: "upsc-photo",
    name: "UPSC",
    group: "exam",
    spec: "35×45 mm",
    printMm: { width: 35, height: 45 },
    aspect: 35 / 45,
    width: 413,
    height: 531,
    dpi: 300,
    maxKb: 300,
    minKb: 20,
  },
  {
    slug: "neet-photo",
    name: "NEET",
    group: "exam",
    spec: "35×45 mm",
    printMm: { width: 35, height: 45 },
    aspect: 35 / 45,
    width: 413,
    height: 531,
    dpi: 300,
    maxKb: 200,
    minKb: 10,
  },
  {
    // IBPS gives a 4.5 × 3.5 cm print but prefers 200 × 230 px, so the crop follows the pixels.
    slug: "ibps-photo",
    name: "IBPS",
    group: "exam",
    spec: "35×45 mm",
    printMm: { width: 35, height: 45 },
    aspect: 200 / 230,
    width: 200,
    height: 230,
    maxKb: 50,
    minKb: 20,
  },
  {
    slug: "ssc-signature",
    name: "SSC signature",
    kind: "signature",
    group: "exam",
    spec: "60×20 mm",
    printMm: { width: 60, height: 20 },
    aspect: 3,
    width: 472,
    height: 157,
    dpi: 200,
    maxKb: 20,
    minKb: 10,
  },
];

export function getPreset(slug: string) {
  return FORM_PRESETS.find((preset) => preset.slug === slug);
}

/** How the preset is named in links and headings: "PAN card photo", "SSC signature". */
export function presetTitle(preset: FormPreset) {
  return preset.kind === "signature" ? preset.name : `${preset.name} photo`;
}

/** The DPI the pixel size comes from, or a note that the form gives pixels directly. */
export function presetResolution(preset: FormPreset) {
  return preset.dpi ? `${preset.dpi} DPI` : "Set in pixels";
}

/** The file size the form accepts: "20–300 KB", "under 240 KB", "50 KB or more", or null. */
export function presetSizeRange(preset: FormPreset) {
  if (preset.minKb && preset.maxKb) return `${preset.minKb}–${preset.maxKb} KB`;
  if (preset.maxKb) return `under ${preset.maxKb} KB`;
  if (preset.minKb) return `${preset.minKb} KB or more`;
  return null;
}
