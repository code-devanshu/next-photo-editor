"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  canvasToBlob,
  downloadBlob,
  drawCroppedCanvas,
  formatBytes,
  type ExportFormat,
} from "@/lib/image-export";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const ASPECT_PRESETS: { label: string; value: number | undefined }[] = [
  { label: "Free", value: undefined },
  { label: "1:1", value: 1 },
  { label: "4:5", value: 4 / 5 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
  { label: "3:2", value: 3 / 2 },
];

// Pixel dimensions rendered at 300 DPI, the print resolution these
// document types are typically specified and accepted at.
const FORM_PRESETS: { label: string; aspect: number; width: number; height: number }[] = [
  { label: "Passport / Visa (2×2 in)", aspect: 1, width: 600, height: 600 },
  { label: "ID Photo (35×45 mm)", aspect: 35 / 45, width: 413, height: 531 },
  { label: "PAN Card (25×35 mm)", aspect: 25 / 35, width: 295, height: 413 },
];

function subscribeNoop() {
  return () => {};
}

function getCanShareFilesSnapshot() {
  if (typeof navigator === "undefined" || typeof navigator.canShare !== "function") {
    return false;
  }
  const testFile = new File([""], "test.png", { type: "image/png" });
  return navigator.canShare({ files: [testFile] });
}

function getCanShareFilesServerSnapshot() {
  return false;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number | undefined
): Crop {
  if (!aspect) {
    return { unit: "%", x: 5, y: 5, width: 90, height: 90 };
  }
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export default function Home() {
  const imgRef = useRef<HTMLImageElement>(null);
  const originalImgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const ratioRef = useRef(1);

  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [rotatedSrc, setRotatedSrc] = useState<string | null>(null);
  const [originalDims, setOriginalDims] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);

  const [targetWidth, setTargetWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);

  const [format, setFormat] = useState<ExportFormat>("png");
  const [quality, setQuality] = useState(0.9);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewSize, setPreviewSize] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canShareFiles = useSyncExternalStore(
    subscribeNoop,
    getCanShareFilesSnapshot,
    getCanShareFilesServerSnapshot
  );

  // Regenerate the live preview whenever the crop or output settings change.
  useEffect(() => {
    if (!completedCrop || !imgRef.current || !targetWidth || !targetHeight) {
      return;
    }
    if (completedCrop.width <= 0 || completedCrop.height <= 0) return;

    const timeout = setTimeout(async () => {
      try {
        const canvas = drawCroppedCanvas(
          imgRef.current!,
          completedCrop,
          targetWidth,
          targetHeight
        );
        const blob = await canvasToBlob(canvas, format, quality);
        if (!blob) {
          setError("Could not generate a preview for this image.");
          return;
        }
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
        setPreviewSize(blob.size);
      } catch {
        setError("Could not generate a preview for this image.");
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [completedCrop, targetWidth, targetHeight, format, quality]);

  function validateAndLoadFile(candidate: File | undefined) {
    if (!candidate) return;
    setError(null);

    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      setError("Unsupported file type. Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (candidate.size > MAX_FILE_SIZE) {
      setError(
        `File is too large (${formatBytes(candidate.size)}). Maximum size is ${formatBytes(
          MAX_FILE_SIZE
        )}.`
      );
      return;
    }

    if (imageSrc) URL.revokeObjectURL(imageSrc);
    if (rotatedSrc && rotatedSrc !== imageSrc) URL.revokeObjectURL(rotatedSrc);
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setFile(candidate);
    setImageSrc(URL.createObjectURL(candidate));
    setRotation(0);
    setRotatedSrc(null);
    setOriginalDims(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setAspect(undefined);
    setPreviewUrl(null);
    setPreviewSize(null);
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    setOriginalDims({ width: img.naturalWidth, height: img.naturalHeight });

    const initialCrop = centerAspectCrop(img.width, img.height, aspect);
    setCrop(initialCrop);

    const pixelCrop = convertToPixelCrop(initialCrop, img.width, img.height);
    setCompletedCrop(pixelCrop);

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const width = Math.max(1, Math.round(pixelCrop.width * scaleX));
    const height = Math.max(1, Math.round(pixelCrop.height * scaleY));
    setTargetWidth(width);
    setTargetHeight(height);
    ratioRef.current = width / height;
  }

  function handleAspectClick(value: number | undefined) {
    setAspect(value);
    const img = imgRef.current;
    if (!img) return;
    const newCrop = centerAspectCrop(img.width, img.height, value);
    setCrop(newCrop);
    setCompletedCrop(convertToPixelCrop(newCrop, img.width, img.height));
  }

  function handleFormPresetClick(preset: (typeof FORM_PRESETS)[number]) {
    handleAspectClick(preset.aspect);
    setTargetWidth(preset.width);
    setTargetHeight(preset.height);
    setLockAspect(true);
    ratioRef.current = preset.width / preset.height;
  }

  function rotateBy(delta: number) {
    const original = originalImgRef.current;
    if (!original || !original.complete || !original.naturalWidth) return;

    const nextRotation = ((rotation + delta) % 360 + 360) % 360;
    setRotation(nextRotation);

    if (nextRotation === 0) {
      setRotatedSrc((prev) => {
        if (prev && prev !== imageSrc) URL.revokeObjectURL(prev);
        return null;
      });
      return;
    }

    // Always rotate from the pristine original (not the currently-displayed,
    // already-rotated image) so repeated rotations don't compound resampling
    // loss. PNG is used as the intermediate format to avoid extra JPEG
    // generation loss before the user's chosen export format is applied.
    const swapped = nextRotation === 90 || nextRotation === 270;
    const w = original.naturalWidth;
    const h = original.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = swapped ? h : w;
    canvas.height = swapped ? w : h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((nextRotation * Math.PI) / 180);
    ctx.drawImage(original, -w / 2, -h / 2);

    canvas.toBlob((blob) => {
      if (!blob) return;
      setRotatedSrc((prev) => {
        if (prev && prev !== imageSrc) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    }, "image/png");
  }

  function handleWidthChange(raw: string) {
    const value = Math.max(1, Math.round(Number(raw) || 0));
    setTargetWidth(value);
    if (lockAspect && ratioRef.current) {
      setTargetHeight(Math.max(1, Math.round(value / ratioRef.current)));
    } else if (targetHeight) {
      ratioRef.current = value / targetHeight;
    }
  }

  function handleHeightChange(raw: string) {
    const value = Math.max(1, Math.round(Number(raw) || 0));
    setTargetHeight(value);
    if (lockAspect && ratioRef.current) {
      setTargetWidth(Math.max(1, Math.round(value * ratioRef.current)));
    } else if (targetWidth) {
      ratioRef.current = targetWidth / value;
    }
  }

  function toggleLockAspect() {
    setLockAspect((prev) => {
      const next = !prev;
      if (next && targetHeight) ratioRef.current = targetWidth / targetHeight;
      return next;
    });
  }

  function getExportFilename() {
    const baseName = file?.name.replace(/\.[^.]+$/, "") ?? "image";
    return `${baseName}.${format === "png" ? "png" : "jpg"}`;
  }

  async function exportBlob(): Promise<Blob | null> {
    if (!completedCrop || !imgRef.current || !targetWidth || !targetHeight) return null;
    const canvas = drawCroppedCanvas(imgRef.current, completedCrop, targetWidth, targetHeight);
    return canvasToBlob(canvas, format, quality);
  }

  async function handleDownload() {
    try {
      const blob = await exportBlob();
      if (!blob) {
        setError("Export failed. Please try a different image or settings.");
        return;
      }
      downloadBlob(blob, getExportFilename());
    } catch {
      setError("Export failed. Please try a different image or settings.");
    }
  }

  async function handleShare() {
    try {
      const blob = await exportBlob();
      if (!blob) {
        setError("Export failed. Please try a different image or settings.");
        return;
      }
      const shareFile = new File([blob], getExportFilename(), { type: blob.type });
      if (!navigator.canShare?.({ files: [shareFile] })) {
        setError("Direct sharing isn't supported in this browser. Please download and share manually.");
        return;
      }
      await navigator.share({ files: [shareFile] });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Sharing failed. Please try downloading instead.");
    }
  }

  function handleReset() {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    if (rotatedSrc && rotatedSrc !== imageSrc) URL.revokeObjectURL(rotatedSrc);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setImageSrc(null);
    setRotation(0);
    setRotatedSrc(null);
    setOriginalDims(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setAspect(undefined);
    setTargetWidth(0);
    setTargetHeight(0);
    setPreviewUrl(null);
    setPreviewSize(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      {!imageSrc ? (
        <header className="flex flex-col items-center gap-4 pt-6 pb-2 text-center">
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Crop &amp; resize photos for forms — in seconds
          </h1>
          <p className="max-w-xl text-slate-500">
            Built for passport, visa, ID, and application photo requirements. Your
            photo is processed entirely on your device — never uploaded, never
            stored — and stays full quality from start to finish.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="rounded-full border border-primary-soft-border bg-primary-soft px-3 py-1 text-primary">
              🔒 Nothing ever uploaded
            </span>
            <span className="rounded-full border border-primary-soft-border bg-primary-soft px-3 py-1 text-primary">
              🎯 Full quality, no compression
            </span>
            <span className="rounded-full border border-primary-soft-border bg-primary-soft px-3 py-1 text-primary">
              ⚡ Free, instant, no sign-up
            </span>
          </div>
        </header>
      ) : (
        <header className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">Crop &amp; Resize</h1>
          <span className="rounded-full border border-primary-soft-border bg-primary-soft px-2.5 py-1 text-xs text-primary">
            🔒 Processed on your device
          </span>
        </header>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!imageSrc ? (
        <div className="flex flex-col gap-3">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              validateAndLoadFile(e.dataTransfer.files[0]);
            }}
            className={`flex min-h-72 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary-soft"
                : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            <span className="text-4xl">📷</span>
            <span className="font-medium text-slate-900">Drag &amp; drop your photo here, or click to browse</span>
            <span className="text-sm text-slate-500">
              Supports JPG, PNG, WEBP — up to {formatBytes(MAX_FILE_SIZE)}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => validateAndLoadFile(e.target.files?.[0])}
            />
          </label>

          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            📸 Take a photo
          </button>
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            className="hidden"
            onChange={(e) => validateAndLoadFile(e.target.files?.[0])}
          />

          <p className="text-center text-xs text-slate-500">
            No account, no server round-trip — your photo never leaves this device.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Aspect ratio</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => rotateBy(-90)}
                    title="Rotate left 90°"
                    className="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    ⟲
                  </button>
                  <button
                    type="button"
                    onClick={() => rotateBy(90)}
                    title="Rotate right 90°"
                    className="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    ⟳
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {ASPECT_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleAspectClick(preset.value)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      aspect === preset.value
                        ? "border-primary bg-primary text-white"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center rounded-xl border border-slate-200 bg-slate-50 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={originalImgRef} src={imageSrc ?? undefined} alt="" className="hidden" aria-hidden="true" />
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                minWidth={10}
                minHeight={10}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={rotatedSrc ?? imageSrc}
                  alt="Uploaded image to crop"
                  onLoad={onImageLoad}
                  onError={() => setError("This file could not be read as an image.")}
                  className="max-h-[60vh] max-w-full"
                />
              </ReactCrop>
            </div>

            {originalDims && file && (
              <p className="text-sm text-slate-500">
                Original: {originalDims.width}×{originalDims.height}px · {formatBytes(file.size)}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start">
            <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft">📐</span>
                Output size
              </h2>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-slate-500">Common form &amp; ID sizes</span>
                <div className="flex flex-wrap gap-2">
                  {FORM_PRESETS.map((preset) => {
                    const active =
                      aspect === preset.aspect &&
                      targetWidth === preset.width &&
                      targetHeight === preset.height;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleFormPresetClick(preset)}
                        className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                          active
                            ? "border-primary bg-primary text-white"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-end gap-2">
                <label className="flex-1 text-sm">
                  <span className="mb-1 block text-slate-500">Width</span>
                  <input
                    type="number"
                    min={1}
                    value={targetWidth || ""}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-2 py-1.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <button
                  type="button"
                  onClick={toggleLockAspect}
                  title={lockAspect ? "Aspect ratio locked" : "Aspect ratio unlocked"}
                  className={`mb-0.5 rounded-md border px-2 py-1.5 text-sm ${
                    lockAspect
                      ? "border-primary bg-primary text-white"
                      : "border-slate-300 text-slate-600"
                  }`}
                >
                  {lockAspect ? "🔒" : "🔓"}
                </button>
                <label className="flex-1 text-sm">
                  <span className="mb-1 block text-slate-500">Height</span>
                  <input
                    type="number"
                    min={1}
                    value={targetHeight || ""}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-2 py-1.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>
            </section>

            <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft">🖼️</span>
                Export format
              </h2>
              <div className="flex gap-2">
                {(["png", "jpeg"] as ExportFormat[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormat(f)}
                    className={`flex-1 rounded-md border px-3 py-1.5 text-sm uppercase ${
                      format === f
                        ? "border-primary bg-primary text-white"
                        : "border-slate-300 text-slate-700"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {format === "jpeg" && (
                <label className="text-sm">
                  <span className="mb-1 block text-slate-500">
                    Quality: {quality.toFixed(2)}
                  </span>
                  <input
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </label>
              )}
            </section>

            <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft">👁️</span>
                Preview
              </h2>
              <div className="flex items-center justify-center rounded-md bg-slate-50 p-2">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="Cropped and resized preview"
                    className="max-h-48 max-w-full rounded"
                  />
                ) : (
                  <span className="py-8 text-sm text-slate-500">
                    Adjust the crop to see a preview
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500">
                {targetWidth}×{targetHeight}px
                {previewSize !== null && <> · ~{formatBytes(previewSize)}</>}
              </p>
            </section>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleDownload}
                disabled={!previewUrl}
                className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-40"
              >
                Download
              </button>
              <div className="flex gap-2">
                {canShareFiles && (
                  <button
                    type="button"
                    onClick={handleShare}
                    disabled={!previewUrl}
                    className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                  >
                    Share
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Start over
                </button>
              </div>
            </div>
            {canShareFiles && (
              <p className="text-xs text-slate-500">
                Apps like WhatsApp recompress photos sent via Share. For full quality, tap Download, then attach the file as a Document in the app instead.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
