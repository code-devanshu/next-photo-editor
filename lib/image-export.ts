import type { PixelCrop } from "react-image-crop";

export type ExportFormat = "png" | "jpeg";

export function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / 1024 ** exponent;
  return `${exponent === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
}

/** Draws the natural-resolution crop region of `image` onto a canvas resized to target dimensions. */
export function drawCroppedCanvas(
  image: HTMLImageElement,
  crop: PixelCrop,
  targetWidth: number,
  targetHeight: number
): HTMLCanvasElement {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Snap the source rect to integer natural-pixel boundaries. Rounding x/y and
  // x2/y2 (rather than x/y and width/height independently) keeps the crop's
  // right/bottom edge from drifting off by a fractional pixel. Without this,
  // drawImage is asked to resample a sub-pixel-aligned source rect onto an
  // integer-sized canvas, which forces the browser to blur every crop — even
  // a same-scale one with no intended resizing.
  const sx = Math.round(crop.x * scaleX);
  const sy = Math.round(crop.y * scaleY);
  const sw = Math.max(1, Math.round((crop.x + crop.width) * scaleX) - sx);
  const sh = Math.max(1, Math.round((crop.y + crop.height) * scaleY) - sy);

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(targetWidth));
  canvas.height = Math.max(1, Math.round(targetHeight));

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is not available");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

  return canvas;
}

/** Share of the photo's height the name and date strip covers, like a studio's printed strip. */
export const STAMP_BAND = 0.18;

/**
 * Prints the name and date on a white strip across the bottom of the photo: the name in capitals on
 * the first line, the date under it, each shrunk to fit the width. Draws over the photo, so frame
 * the face with room below the chin.
 */
export function stampNameAndDate(canvas: HTMLCanvasElement, name: string, date: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width, height } = canvas;
  const band = Math.max(12, Math.round(height * STAMP_BAND));
  const top = height - band;
  const padding = width * 0.05;
  const lines = [name.trim().toUpperCase(), date].filter(Boolean);
  if (lines.length === 0) return;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, top, width, band);
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lineHeight = band / lines.length;
  lines.forEach((line, index) => {
    let size = Math.floor(lineHeight * 0.62);
    ctx.font = `700 ${size}px Arial, Helvetica, sans-serif`;
    const measured = ctx.measureText(line).width;
    if (measured > width - padding * 2) {
      size = Math.max(6, Math.floor((size * (width - padding * 2)) / measured));
      ctx.font = `700 ${size}px Arial, Helvetica, sans-serif`;
    }
    ctx.fillText(line, width / 2, top + lineHeight * (index + 0.5), width - padding * 2);
  });
}

/** "2026-10-08" → "08/10/2026", the day-first order Indian forms use. */
export function formatStampDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  return year && month && day ? `${day}/${month}/${year}` : "";
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: ExportFormat,
  quality?: number
): Promise<Blob | null> {
  const mimeType = format === "png" ? "image/png" : "image/jpeg";
  return new Promise((resolve) => {
    canvas.toBlob(resolve, mimeType, format === "jpeg" ? quality : undefined);
  });
}

// Above this, JPEG quality adds bytes without a visible gain, so the size search starts here.
export const TOP_QUALITY = 0.92;
const MIN_QUALITY = 0.05;
const SEARCH_STEPS = 7;

/** Where the file landed against the form's size range. */
export type FitStatus = "fits" | "too-big" | "too-small";
export type EncodedImage = { blob: Blob; quality: number; status: FitStatus };
export type ByteRange = { min: number | null; max: number | null };

function statusOf(size: number, { min, max }: ByteRange): FitStatus {
  if (max && size > max) return "too-big";
  if (min && size < min) return "too-small";
  return "fits";
}

/**
 * Encodes the canvas. With a byte limit (JPEG only), binary-searches for the highest quality whose
 * file fits under it, going above the usual top quality when that's what reaches the minimum.
 * When no quality lands in range, returns the closest file with its status.
 */
export async function encodeCanvas(
  canvas: HTMLCanvasElement,
  format: ExportFormat,
  quality: number,
  range: ByteRange
): Promise<EncodedImage | null> {
  if (format === "png" || !range.max) {
    const blob = await canvasToBlob(canvas, format, quality);
    if (!blob) return null;
    // With only a minimum, raise the quality as far as it goes before reporting the file as too small.
    if (format === "jpeg" && range.min && blob.size < range.min && quality < 1) {
      const full = await canvasToBlob(canvas, "jpeg", 1);
      if (full && full.size > blob.size) return { blob: full, quality: 1, status: statusOf(full.size, range) };
    }
    return { blob, quality, status: statusOf(blob.size, range) };
  }

  let ceiling = TOP_QUALITY;
  let top = await canvasToBlob(canvas, "jpeg", ceiling);
  if (!top) return null;
  if (range.min && top.size < range.min) {
    ceiling = 1;
    top = await canvasToBlob(canvas, "jpeg", ceiling);
    if (!top) return null;
  }
  if (top.size <= range.max) return { blob: top, quality: ceiling, status: statusOf(top.size, range) };

  let low = MIN_QUALITY;
  let high = ceiling;
  let best: { blob: Blob; quality: number } | null = null;
  for (let step = 0; step < SEARCH_STEPS; step++) {
    const mid = (low + high) / 2;
    const blob = await canvasToBlob(canvas, "jpeg", mid);
    if (!blob) return null;
    if (blob.size <= range.max) {
      best = { blob, quality: mid };
      low = mid;
    } else {
      high = mid;
    }
  }
  if (best) return { ...best, status: statusOf(best.blob.size, range) };

  const smallest = await canvasToBlob(canvas, "jpeg", MIN_QUALITY);
  return smallest && { blob: smallest, quality: MIN_QUALITY, status: statusOf(smallest.size, range) };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
