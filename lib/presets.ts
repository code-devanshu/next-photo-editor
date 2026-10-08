// The editor's view of a fixed size. The values live on page entries in lib/pages, and
// pages pass presets to the editor as props, so the client bundle carries no page text.
export type FormPreset = {
  /** URL of the preset's guide page, e.g. `/pan-card-photo`. */
  slug: string;
  name: string;
  /** Signatures get a pen-stroke outline and aren't called "photo". */
  kind?: "signature";
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

/** How the preset is named in links and headings: "PAN card photo", "SSC signature". */
export function presetTitle(preset: FormPreset) {
  return preset.kind === "signature" ? preset.name : `${preset.name} photo`;
}

/** The DPI the pixel size comes from, or a note that the form gives pixels directly. */
export function presetResolution(preset: FormPreset) {
  return preset.dpi ? `${preset.dpi} DPI` : "Set in pixels";
}

/** The file size the form accepts: "20–300 KB", "under 240 KB", "50 KB or more", or null. */
export function presetSizeRange(preset: Pick<FormPreset, "minKb" | "maxKb">) {
  if (preset.minKb && preset.maxKb) return `${preset.minKb}–${preset.maxKb} KB`;
  if (preset.maxKb) return `under ${preset.maxKb} KB`;
  if (preset.minKb) return `${preset.minKb} KB or more`;
  return null;
}
