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
