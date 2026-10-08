import type { Crop, PixelCrop } from "react-image-crop";

// The three react-image-crop helpers the editor needs before the crop UI exists, ported from the
// library (v11) so the library itself can load only once a photo is added. Same maths, same results.

const EMPTY: PixelCrop = { x: 0, y: 0, width: 0, height: 0, unit: "px" };

export function convertToPixelCrop(crop: Partial<Crop>, width: number, height: number): PixelCrop {
  if (!crop.unit || crop.unit === "px") return { ...EMPTY, ...crop, unit: "px" };
  return {
    unit: "px",
    x: crop.x ? (crop.x * width) / 100 : 0,
    y: crop.y ? (crop.y * height) / 100 : 0,
    width: crop.width ? (crop.width * width) / 100 : 0,
    height: crop.height ? (crop.height * height) / 100 : 0,
  };
}

function convertToPercentCrop(crop: Partial<Crop>, width: number, height: number): Crop {
  if (crop.unit === "%") return { ...EMPTY, ...crop, unit: "%" };
  return {
    unit: "%",
    x: crop.x ? (crop.x / width) * 100 : 0,
    y: crop.y ? (crop.y / height) * 100 : 0,
    width: crop.width ? (crop.width / width) * 100 : 0,
    height: crop.height ? (crop.height / height) * 100 : 0,
  };
}

/** Fills in the missing side of a crop for the aspect ratio, shrinking it to stay inside the media. */
export function makeAspectCrop(crop: Partial<Crop>, aspect: number, mediaWidth: number, mediaHeight: number): Crop {
  const pixel = convertToPixelCrop(crop, mediaWidth, mediaHeight);
  if (crop.width) pixel.height = pixel.width / aspect;
  if (crop.height) pixel.width = pixel.height * aspect;
  if (pixel.y + pixel.height > mediaHeight) {
    pixel.height = mediaHeight - pixel.y;
    pixel.width = pixel.height * aspect;
  }
  if (pixel.x + pixel.width > mediaWidth) {
    pixel.width = mediaWidth - pixel.x;
    pixel.height = pixel.width / aspect;
  }
  return crop.unit === "%" ? convertToPercentCrop(pixel, mediaWidth, mediaHeight) : pixel;
}

export function centerCrop(crop: Partial<Crop>, mediaWidth: number, mediaHeight: number): Crop {
  const pixel = convertToPixelCrop(crop, mediaWidth, mediaHeight);
  pixel.x = (mediaWidth - pixel.width) / 2;
  pixel.y = (mediaHeight - pixel.height) / 2;
  return crop.unit === "%" ? convertToPercentCrop(pixel, mediaWidth, mediaHeight) : pixel;
}
