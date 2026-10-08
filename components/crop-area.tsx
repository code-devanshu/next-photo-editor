"use client";

import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

/**
 * The crop box around the photo. Kept in its own module so react-image-crop and its stylesheet
 * load only after a photo is added, not with the page.
 */
export default function CropArea({
  crop,
  aspect,
  onChange,
  onComplete,
  children,
}: {
  crop?: Crop;
  aspect?: number;
  onChange: (crop: Crop) => void;
  onComplete: (crop: PixelCrop) => void;
  children: React.ReactNode;
}) {
  return (
    <ReactCrop
      crop={crop}
      onChange={(_, percentCrop) => onChange(percentCrop)}
      onComplete={onComplete}
      aspect={aspect}
      minWidth={10}
      minHeight={10}
      ruleOfThirds
      // The library's stylesheet makes the image inherit max-height from this container.
      style={{ maxHeight: "min(64dvh, 36rem)" }}
    >
      {children}
    </ReactCrop>
  );
}
