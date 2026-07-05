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
import { FORM_PRESETS, getPreset, type FormPreset } from "@/lib/presets";
import {
  AlertIcon,
  CameraIcon,
  CloseIcon,
  DownloadIcon,
  ImageIcon,
  LockIcon,
  LockOpenIcon,
  RotateLeftIcon,
  RotateRightIcon,
  ShareIcon,
} from "@/lib/icons";

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

const HIGHLIGHTS = [
  { term: "Private", detail: "Runs in your browser. Nothing is uploaded or stored." },
  { term: "Exact", detail: "Exported at the exact pixel size you set, as JPEG or lossless PNG." },
  { term: "Presets", detail: "Passport size 35×45 mm, US passport & visa 2×2 in, PAN card 25×35 mm." },
  { term: "Free", detail: "No account, no sign-up, no watermark." },
];

// Crop-mark brackets framing the dropzone; they tighten inward while a file is dragged over.
const DROPZONE_CORNERS = [
  "top-3 left-3 rounded-tl-md border-t-2 border-l-2 group-data-dragging:translate-x-2 group-data-dragging:translate-y-2",
  "top-3 right-3 rounded-tr-md border-t-2 border-r-2 group-data-dragging:-translate-x-2 group-data-dragging:translate-y-2",
  "bottom-3 left-3 rounded-bl-md border-b-2 border-l-2 group-data-dragging:translate-x-2 group-data-dragging:-translate-y-2",
  "bottom-3 right-3 rounded-br-md border-b-2 border-r-2 group-data-dragging:-translate-x-2 group-data-dragging:-translate-y-2",
];

const iconButtonClass =
  "inline-flex size-9 items-center justify-center rounded-lg text-muted transition duration-200 hover:bg-sunken hover:text-foreground active:scale-95";

function segmentClass(active: boolean) {
  return `rounded-[7px] px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition duration-200 active:scale-[0.97] ${
    active ? "bg-surface text-foreground shadow-segment" : "text-muted hover:text-foreground"
  }`;
}

function StepHeading({
  step,
  id,
  children,
}: {
  step: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2 id={id} className="flex items-baseline gap-2.5 text-sm font-semibold tracking-tight">
      <span aria-hidden="true" className="font-mono text-[11px] font-normal text-faint tabular-nums">
        {step}
      </span>
      {children}
    </h2>
  );
}

function PixelInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (raw: string) => void;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1.5">
      <span className="text-xs text-muted">{label}</span>
      <span className="relative">
        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full [appearance:textfield] rounded-lg border border-border-strong bg-surface py-2 pr-9 pl-3 font-mono text-sm tabular-nums transition-[border-color,box-shadow] duration-200 hover:border-faint focus:border-accent focus:ring-3 focus:ring-accent/15 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-xs text-faint"
        >
          px
        </span>
      </span>
    </label>
  );
}

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

export default function PhotoEditor({
  title,
  titleAccent,
  intro,
  presetSlug,
}: {
  title: string;
  titleAccent: string;
  intro: string;
  /** Preset applied to every photo loaded on this page, for the per-size guide pages. */
  presetSlug?: string;
}) {
  const initialPreset = presetSlug ? getPreset(presetSlug) : undefined;

  const imgRef = useRef<HTMLImageElement>(null);
  const originalImgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const captureButtonRef = useRef<HTMLButtonElement>(null);
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

  // Upload portals almost always require JPEG, so presets default to it.
  const [format, setFormat] = useState<ExportFormat>(initialPreset ? "jpeg" : "png");
  const [quality, setQuality] = useState(0.9);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewSize, setPreviewSize] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

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

  useEffect(() => {
    if (isCameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      captureButtonRef.current?.focus();
    }
  }, [isCameraOpen]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  async function openCamera() {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera access isn't supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
    } catch {
      setError("Couldn't access the camera. Check permissions and try again.");
    }
  }

  function closeCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraOpen(false);
  }

  function capturePhoto() {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const captured = new File([blob], `camera-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        validateAndLoadFile(captured);
        closeCamera();
      },
      "image/jpeg",
      0.92
    );
  }

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
    setAspect(initialPreset?.aspect);
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

    if (initialPreset && aspect === initialPreset.aspect) {
      setTargetWidth(initialPreset.width);
      setTargetHeight(initialPreset.height);
      ratioRef.current = initialPreset.width / initialPreset.height;
      return;
    }

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

  function handleFormPresetClick(preset: FormPreset) {
    handleAspectClick(preset.aspect);
    setTargetWidth(preset.width);
    setTargetHeight(preset.height);
    setLockAspect(true);
    setFormat("jpeg");
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

  const errorBanner = error && (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-danger-border bg-danger-soft px-4 py-3 text-sm text-danger"
    >
      <AlertIcon className="mt-px size-4 shrink-0" />
      <p className="flex-1 text-pretty">{error}</p>
      <button
        type="button"
        onClick={() => setError(null)}
        aria-label="Dismiss"
        className="-m-1 rounded-md p-1 text-danger/70 transition duration-200 hover:bg-danger/10 hover:text-danger"
      >
        <CloseIcon className="size-4" />
      </button>
    </div>
  );

  const showSkeleton = !previewUrl && !!completedCrop && targetWidth > 0 && targetHeight > 0;

  return (
    <>
      <div className="flex flex-col gap-6">
        {!imageSrc ? (
          <section
            aria-labelledby="hero-title"
            className="relative isolate grid gap-x-16 gap-y-10 pt-6 sm:pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:pt-20"
          >
            <div
              aria-hidden="true"
              className="mat-grid pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(55%_65%_at_78%_45%,black,transparent)]"
            />

            <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1 lg:self-end">
              <h1
                id="hero-title"
                className="animate-rise text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl"
              >
                {title}
                <span className="text-muted">{titleAccent}</span>
              </h1>
              <p className="animate-rise max-w-[52ch] text-[17px] leading-relaxed text-pretty text-muted [animation-delay:80ms]">
                {intro}
              </p>
            </div>

            <div className="animate-rise flex flex-col gap-3 [animation-delay:140ms] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <div className="rounded-2xl border border-border bg-surface p-2 shadow-panel">
                <label
                  data-dragging={isDragging || undefined}
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
                  className="group relative flex min-h-72 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl px-6 py-10 text-center transition-colors duration-200 *:pointer-events-none hover:bg-sunken/50 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-accent data-dragging:bg-accent-soft"
                >
                  {DROPZONE_CORNERS.map((corner) => (
                    <span
                      key={corner}
                      aria-hidden="true"
                      className={`absolute size-6 border-border-strong transition-[translate,border-color] duration-300 ease-out group-hover:border-accent group-data-dragging:border-accent ${corner}`}
                    />
                  ))}
                  <span className="flex size-12 items-center justify-center rounded-xl bg-sunken ring-1 ring-border ring-inset transition duration-300 group-hover:-translate-y-0.5 group-data-dragging:bg-surface group-data-dragging:text-accent-ink">
                    <ImageIcon className="size-6" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-base font-medium">
                      {isDragging ? "Release to load your photo" : "Drop a photo here"}
                    </span>
                    <span className="text-sm text-muted">
                      or{" "}
                      <span className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-4 transition-colors group-hover:decoration-accent">
                        browse your files
                      </span>
                    </span>
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={(e) => validateAndLoadFile(e.target.files?.[0])}
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-2">
                  <button
                    type="button"
                    onClick={openCamera}
                    className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground/80 transition duration-200 hover:bg-sunken hover:text-foreground active:scale-[0.98]"
                  >
                    <CameraIcon className="size-4" />
                    Use camera
                  </button>
                  <span className="px-2.5 font-mono text-[11px] text-muted">
                    JPG, PNG, WEBP · up to {formatBytes(MAX_FILE_SIZE)}
                  </span>
                </div>
              </div>
              {errorBanner}
            </div>

            <dl className="animate-rise grid max-w-lg border-t border-border text-sm [animation-delay:200ms] lg:col-start-1 lg:row-start-2 lg:self-start">
              {HIGHLIGHTS.map(({ term, detail }) => (
                <div
                  key={term}
                  className="grid grid-cols-[6rem_1fr] gap-4 border-b border-border py-3"
                >
                  <dt className="font-mono text-xs leading-5 text-muted">{term}</dt>
                  <dd className="text-pretty text-foreground/85">{detail}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : (
          <>
            <h1 className="sr-only">Edit photo</h1>
            {errorBanner}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
              <section aria-label="Crop" className="flex min-w-0 flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div
                    role="group"
                    aria-label="Aspect ratio"
                    className="inline-flex max-w-full overflow-x-auto rounded-[9px] bg-sunken p-0.5 ring-1 ring-border ring-inset"
                  >
                    {ASPECT_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        aria-pressed={aspect === preset.value}
                        onClick={() => handleAspectClick(preset.value)}
                        className={`font-mono ${segmentClass(aspect === preset.value)}`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => rotateBy(-90)}
                      aria-label="Rotate left 90°"
                      title="Rotate left 90°"
                      className={iconButtonClass}
                    >
                      <RotateLeftIcon className="size-4.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => rotateBy(90)}
                      aria-label="Rotate right 90°"
                      title="Rotate right 90°"
                      className={iconButtonClass}
                    >
                      <RotateRightIcon className="size-4.5" />
                    </button>
                  </div>
                </div>

                <div className="mat-grid flex justify-center rounded-2xl border border-border bg-sunken p-4 sm:p-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img ref={originalImgRef} src={imageSrc ?? undefined} alt="" className="hidden" aria-hidden="true" />
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    minWidth={10}
                    minHeight={10}
                    ruleOfThirds
                    className="shadow-photo"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={imgRef}
                      src={rotatedSrc ?? imageSrc}
                      alt="Uploaded image to crop"
                      onLoad={onImageLoad}
                      onError={() => setError("This file could not be read as an image.")}
                      className="max-h-[62dvh] max-w-full"
                    />
                  </ReactCrop>
                </div>

                {originalDims && file && (
                  <p className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted tabular-nums">
                    <span className="max-w-[28ch] truncate text-foreground/80">{file.name}</span>
                    <span>
                      {originalDims.width} × {originalDims.height} px
                    </span>
                    <span>{formatBytes(file.size)}</span>
                    {rotation !== 0 && <span>Rotated {rotation}°</span>}
                  </p>
                )}
              </section>

              <aside
                aria-label="Export settings"
                className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start"
              >
                <div className="divide-y divide-border rounded-2xl border border-border bg-surface shadow-panel">
                  <section aria-labelledby="size-heading" className="flex flex-col gap-4 p-5">
                    <StepHeading step="01" id="size-heading">
                      Output size
                    </StepHeading>

                    <div className="flex flex-col gap-1.5">
                      <p className="text-xs text-muted">Form &amp; ID presets</p>
                      <div role="group" aria-label="Form and ID presets" className="-mx-2 flex flex-col">
                        {FORM_PRESETS.map((preset) => {
                          const active =
                            aspect === preset.aspect &&
                            targetWidth === preset.width &&
                            targetHeight === preset.height;
                          return (
                            <button
                              key={preset.name}
                              type="button"
                              aria-pressed={active}
                              onClick={() => handleFormPresetClick(preset)}
                              className={`group flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-left text-sm transition duration-200 ${
                                active ? "bg-accent-soft" : "hover:bg-sunken"
                              }`}
                            >
                              <span className="flex min-w-0 items-center gap-2.5">
                                <span
                                  aria-hidden="true"
                                  className={`flex size-3.5 shrink-0 items-center justify-center rounded-full border transition duration-200 ${
                                    active ? "border-accent" : "border-border-strong group-hover:border-faint"
                                  }`}
                                >
                                  <span
                                    className={`size-1.5 rounded-full bg-accent transition duration-200 ${
                                      active ? "scale-100" : "scale-0"
                                    }`}
                                  />
                                </span>
                                <span className="font-medium">{preset.name}</span>
                                <span className="truncate text-muted">{preset.spec}</span>
                              </span>
                              <span className="font-mono text-xs text-muted tabular-nums">
                                {preset.width}×{preset.height}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-end gap-2">
                      <PixelInput label="Width" value={targetWidth} onChange={handleWidthChange} />
                      <button
                        type="button"
                        onClick={toggleLockAspect}
                        aria-pressed={lockAspect}
                        aria-label="Lock aspect ratio"
                        title={lockAspect ? "Aspect ratio locked" : "Aspect ratio unlocked"}
                        className={`inline-flex size-9.5 shrink-0 items-center justify-center rounded-lg border transition duration-200 active:scale-95 ${
                          lockAspect
                            ? "border-accent/30 bg-accent-soft text-accent-ink"
                            : "border-border-strong text-muted hover:bg-sunken hover:text-foreground"
                        }`}
                      >
                        {lockAspect ? (
                          <LockIcon className="size-4" />
                        ) : (
                          <LockOpenIcon className="size-4" />
                        )}
                      </button>
                      <PixelInput label="Height" value={targetHeight} onChange={handleHeightChange} />
                    </div>
                  </section>

                  <section aria-labelledby="format-heading" className="flex flex-col gap-4 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <StepHeading step="02" id="format-heading">
                        Format
                      </StepHeading>
                      <div
                        role="group"
                        aria-label="Export format"
                        className="inline-flex rounded-[9px] bg-sunken p-0.5 ring-1 ring-border ring-inset"
                      >
                        {(["png", "jpeg"] as ExportFormat[]).map((f) => (
                          <button
                            key={f}
                            type="button"
                            aria-pressed={format === f}
                            onClick={() => setFormat(f)}
                            className={`min-w-14 font-mono uppercase ${segmentClass(format === f)}`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                    {format === "jpeg" ? (
                      <label className="flex flex-col gap-2">
                        <span className="flex items-center justify-between text-xs text-muted">
                          Quality
                          <span className="font-mono text-foreground tabular-nums">
                            {Math.round(quality * 100)}%
                          </span>
                        </span>
                        <input
                          type="range"
                          min={0.1}
                          max={1}
                          step={0.05}
                          value={quality}
                          onChange={(e) => setQuality(Number(e.target.value))}
                          className="w-full accent-accent"
                        />
                      </label>
                    ) : (
                      <p className="text-xs text-pretty text-muted">
                        Lossless. Switch to JPEG if the form asks for a smaller file.
                      </p>
                    )}
                  </section>

                  <section aria-labelledby="preview-heading" className="flex flex-col gap-3 p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <StepHeading step="03" id="preview-heading">
                        Preview
                      </StepHeading>
                      <span className="font-mono text-xs text-muted tabular-nums">
                        {targetWidth} × {targetHeight} px
                      </span>
                    </div>
                    <div className="checker flex min-h-40 items-center justify-center overflow-hidden rounded-lg p-3 ring-1 ring-border ring-inset">
                      {previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={previewUrl}
                          alt="Cropped and resized preview"
                          className="max-h-52 max-w-full shadow-photo"
                        />
                      ) : showSkeleton ? (
                        <div
                          aria-hidden="true"
                          className="skeleton h-36 max-w-full animate-shimmer rounded"
                          style={{ aspectRatio: `${targetWidth} / ${targetHeight}` }}
                        />
                      ) : (
                        <span className="text-sm text-muted">Adjust the crop to see a preview</span>
                      )}
                    </div>
                  </section>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={!previewUrl}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background shadow-button transition duration-200 hover:bg-ink-hover active:scale-[0.99] disabled:pointer-events-none disabled:opacity-40"
                  >
                    <DownloadIcon className="size-4 transition duration-200 group-hover:translate-y-px" />
                    Download {format === "png" ? "PNG" : "JPEG"}
                    {previewSize !== null && (
                      <span className="font-mono text-xs text-background/55 tabular-nums">
                        ~{formatBytes(previewSize)}
                      </span>
                    )}
                  </button>
                  <div className="flex items-center gap-2">
                    {canShareFiles && (
                      <button
                        type="button"
                        onClick={handleShare}
                        disabled={!previewUrl}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-sm font-medium transition duration-200 hover:bg-sunken active:scale-[0.99] disabled:pointer-events-none disabled:opacity-40"
                      >
                        <ShareIcon className="size-4" />
                        Share
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleReset}
                      className={`rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition duration-200 hover:bg-sunken hover:text-foreground ${
                        canShareFiles ? "" : "mx-auto"
                      }`}
                    >
                      Start over
                    </button>
                  </div>
                </div>
                {canShareFiles && (
                  <p className="text-xs leading-relaxed text-pretty text-muted">
                    Apps like WhatsApp recompress photos sent via Share. For full quality, tap
                    Download, then attach the file as a Document in the app instead.
                  </p>
                )}
              </aside>
            </div>
          </>
        )}
      </div>

      {isCameraOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Take a photo"
          onKeyDown={(e) => {
            if (e.key === "Escape") closeCamera();
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#141310]/90 p-4 backdrop-blur-md"
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="max-h-[70dvh] w-full max-w-2xl rounded-2xl bg-[#0c0b0a] shadow-2xl ring-1 ring-white/10"
          />
          <div className="grid w-full max-w-2xl grid-cols-3 items-center">
            <button
              type="button"
              onClick={closeCamera}
              className="justify-self-start rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition duration-200 hover:bg-white/10 hover:text-white"
            >
              Cancel
            </button>
            <button
              ref={captureButtonRef}
              type="button"
              onClick={capturePhoto}
              aria-label="Capture photo"
              className="group size-16 justify-self-center rounded-full border-2 border-white/80 p-1 transition duration-200 active:scale-95"
            >
              <span className="block size-full rounded-full bg-white transition duration-200 group-hover:scale-95" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
