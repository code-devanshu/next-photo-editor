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
import { PresetOutline } from "@/components/preset-outline";
import {
  canvasToBlob,
  downloadBlob,
  drawCroppedCanvas,
  encodeCanvas,
  formatBytes,
  formatStampDate,
  STAMP_BAND,
  stampNameAndDate,
  TOP_QUALITY,
  type ExportFormat,
  type FitStatus,
} from "@/lib/image-export";
import { EDITOR_TEXT, type EditorText, type Lang } from "@/lib/editor-text";
import type { FormPreset } from "@/lib/presets";
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
  { label: "free", value: undefined },
  { label: "1:1", value: 1 },
  { label: "4:5", value: 4 / 5 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
  { label: "3:2", value: 3 / 2 },
];

// Common upload limits offered as one-tap choices; any other limit can be typed in.
const LIMIT_CHOICES = [20, 50, 100];
// Portals differ on whether a KB is 1000 or 1024 bytes, so each bound uses the stricter reading:
// a maximum counts 1000 bytes per KB and a minimum counts 1024.
const BYTES_PER_KB = 1000;
const MIN_BYTES_PER_KB = 1024;
// Shrink to fit aims for a file that fits at this quality, so the photo stays clean.
const SHRINK_QUALITY = 0.8;
// Enlarge to fit aims this far past the minimum, so small encoder differences don't drop below it.
const ENLARGE_MARGIN = 1.2;
// How close the output's shape must stay to the preset's for the preset's minimum to still apply.
const SHAPE_TOLERANCE = 0.02;


// Outlines in the size registry are drawn at this many px per mm, so they compare at true scale.
const REGISTRY_SCALE = 1.1;
const RAIL_SCALE = 0.62;

function segmentClass(active: boolean, onDark = false) {
  const base =
    "rounded-md px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap transition duration-200 active:scale-[0.97]";
  if (onDark) {
    return `${base} ${active ? "bg-booth text-ink shadow-key" : "text-stage-muted hover:text-stage-text"}`;
  }
  return `${base} ${active ? "bg-ink text-booth shadow-key" : "text-muted hover:text-ink"}`;
}

function StepDisc({ step }: { step: number }) {
  return (
    <span
      aria-hidden="true"
      className="figures flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-[15px] leading-none text-booth"
    >
      {step}
    </span>
  );
}

function StepHeading({
  step,
  id,
  onDark = false,
  children,
}: {
  step: number;
  id: string;
  onDark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <h2 id={id} className="flex items-center gap-3">
      {onDark ? (
        <span
          aria-hidden="true"
          className="figures flex size-7 shrink-0 items-center justify-center rounded-full bg-booth text-[15px] leading-none text-ink"
        >
          {step}
        </span>
      ) : (
        <StepDisc step={step} />
      )}
      <span className="signage text-[22px]">{children}</span>
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
      <span className="text-xs font-medium text-muted">{label}</span>
      <span className="relative">
        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full [appearance:textfield] rounded-lg border border-rule-strong bg-surface py-2.5 pr-9 pl-3 text-[15px] font-semibold tabular-nums transition-[border-color,box-shadow] duration-200 hover:border-faint focus:border-ink focus:ring-3 focus:ring-booth focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-faint"
        >
          px
        </span>
      </span>
    </label>
  );
}

// Wide shapes like a signature are capped at this width, so the guide fits a phone screen.
const FRAME_MAX_WIDTH = 260;

/** Dashed framing guide at the chosen print shape, with a head-and-shoulders silhouette or a pen stroke. */
function FrameGuide({
  aspect,
  caption,
  kind,
  maxHeight = 150,
}: {
  aspect: number;
  caption: string;
  kind?: FormPreset["kind"];
  maxHeight?: number;
}) {
  const height = Math.min(maxHeight, Math.round(FRAME_MAX_WIDTH / aspect));
  return (
    <span className="flex flex-col items-center gap-3">
      {/* Width follows from the aspect ratio; phones get a shorter guide so the upload buttons stay on screen. */}
      <span
        className="relative block h-[min(var(--frame-h),5.5rem)] overflow-hidden rounded-[3px] border-2 border-dashed border-booth/75 transition-[height] duration-500 ease-mech sm:h-(--frame-h)"
        style={{ "--frame-h": `${height}px`, aspectRatio: aspect } as React.CSSProperties}
      >
        {kind === "thumb" ? (
          <svg
            viewBox="0 0 40 40"
            aria-hidden="true"
            focusable="false"
            className="absolute inset-0 size-full text-stage-line"
          >
            {[14, 10, 6].map((r) => (
              <ellipse key={r} cx="20" cy="20" rx={r * 0.8} ry={r} fill="none" stroke="currentColor" strokeWidth="2.5" />
            ))}
          </svg>
        ) : kind === "signature" ? (
          <svg
            viewBox="0 0 120 40"
            aria-hidden="true"
            focusable="false"
            className="absolute inset-0 size-full text-stage-line"
          >
            <path
              d="M14 27C22 4 31 4 34 25S47 9 56 22 75 12 82 21 98 26 106 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 40 40"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
            focusable="false"
            className="absolute inset-x-0 bottom-0 h-[80%] w-full text-stage-line"
          >
            <circle cx="20" cy="15" r="7.5" fill="currentColor" />
            <path d="M5.5 40C5.5 30.5 11.5 26 20 26S34.5 30.5 34.5 40Z" fill="currentColor" />
          </svg>
        )}
      </span>
      <span className="text-xs font-semibold text-booth tabular-nums">{caption}</span>
    </span>
  );
}

/** Text for the Other field: a typed limit, or empty when a one-tap choice (or none) is on. */
function customLimitText(kb: number | null) {
  return kb && !LIMIT_CHOICES.includes(kb) ? String(kb) : "";
}

function presetCaption(t: EditorText, preset: FormPreset | undefined, maxKb?: number | null) {
  if (preset) return `${preset.spec.replace("×", " × ")} · ${preset.width} × ${preset.height} px`;
  return maxKb ? t.anySizeUnder(maxKb) : t.anySize;
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
  preset: initialPreset,
  presets: featuredPresets,
  maxKb: initialMaxKb,
  minKb: initialMinKb,
  kind: initialKind,
  stamp: initialStamp = false,
  lang = "en",
}: {
  title: string;
  titleAccent: string;
  intro: string;
  /** Preset applied to every photo loaded on this page, for the per-size guide pages. */
  preset?: FormPreset;
  /** Presets offered in the size picker. The page's own preset is added when it isn't one of them. */
  presets: FormPreset[];
  /** File size limit the editor starts with, for the per-limit guide pages. */
  maxKb?: number;
  /** Smallest file the page's form accepts, for pages without a preset. */
  minKb?: number;
  /** What the page's upload is, for the framing guide on pages without a preset. */
  kind?: FormPreset["kind"];
  /** Start with the name and date strip turned on. */
  stamp?: boolean;
  lang?: Lang;
}) {
  const t = EDITOR_TEXT[lang];
  const pickerPresets =
    initialPreset && !featuredPresets.some((preset) => preset.slug === initialPreset.slug)
      ? [initialPreset, ...featuredPresets]
      : featuredPresets;

  const imgRef = useRef<HTMLImageElement>(null);
  const originalImgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const captureButtonRef = useRef<HTMLButtonElement>(null);
  const ratioRef = useRef(1);
  const downloadRef = useRef<HTMLButtonElement>(null);

  // The size picked in the registry, applied to the next photo that loads.
  const [chosenPreset, setChosenPreset] = useState<FormPreset | undefined>(initialPreset);

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
  const [format, setFormat] = useState<ExportFormat>(
    initialPreset || initialMaxKb || initialMinKb ? "jpeg" : "png"
  );
  const [quality, setQuality] = useState(0.9);
  // Name and date printed on a strip across the bottom, as some forms ask for.
  const [stampOn, setStampOn] = useState(initialStamp);
  const [stampName, setStampName] = useState("");
  const [stampDate, setStampDate] = useState(() => new Date().toISOString().slice(0, 10));
  const stampText = stampOn ? { name: stampName, date: formatStampDate(stampDate) } : null;
  // File size limit in KB. While one is set, the JPEG quality is chosen to fit it.
  const [maxKb, setMaxKb] = useState<number | null>(initialMaxKb ?? initialPreset?.maxKb ?? null);
  // Kept apart from maxKb so typing 200 doesn't clear the field when it passes through 20.
  const [customKb, setCustomKb] = useState(() => customLimitText(maxKb));
  const [fit, setFit] = useState<{ quality: number; status: FitStatus } | null>(null);
  const limitBytes = format === "jpeg" && maxKb ? maxKb * BYTES_PER_KB : null;
  // The preset's minimum holds while the output keeps the preset's shape. A new shape is a
  // different upload, like a signature cropped on the photo page, with limits of its own.
  const presetMinKb =
    chosenPreset?.minKb &&
    targetHeight > 0 &&
    Math.abs(targetWidth / targetHeight - chosenPreset.width / chosenPreset.height) < SHAPE_TOLERANCE
      ? chosenPreset.minKb
      : null;
  // A minimum typed into the Min field replaces the preset's or the page's; undefined means none typed.
  const [minOverride, setMinOverride] = useState<number | null | undefined>(undefined);
  const minKb =
    minOverride !== undefined ? minOverride : chosenPreset ? presetMinKb : (initialMinKb ?? null);
  const minBytes = format === "jpeg" && minKb ? minKb * MIN_BYTES_PER_KB : null;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewSize, setPreviewSize] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  // Phones get a sticky download bar while the panel's own Download button is off screen.
  const [downloadInView, setDownloadInView] = useState(true);

  const canShareFiles = useSyncExternalStore(
    subscribeNoop,
    getCanShareFilesSnapshot,
    getCanShareFilesServerSnapshot
  );

  /** The cropped, resized output, with the name and date strip when it's on. */
  function renderCanvas(image: HTMLImageElement, crop: PixelCrop, width: number, height: number) {
    const canvas = drawCroppedCanvas(image, crop, width, height);
    if (stampText) stampNameAndDate(canvas, stampText.name, stampText.date);
    return canvas;
  }

  // Regenerate the live preview whenever the crop or output settings change.
  useEffect(() => {
    if (!completedCrop || !imgRef.current || !targetWidth || !targetHeight) {
      return;
    }
    if (completedCrop.width <= 0 || completedCrop.height <= 0) return;

    // Fitting a limit takes several encodes, so a newer change can finish first.
    let cancelled = false;
    const timeout = setTimeout(async () => {
      try {
        const canvas = renderCanvas(imgRef.current!, completedCrop, targetWidth, targetHeight);
        const encoded = await encodeCanvas(canvas, format, quality, {
          min: minBytes,
          max: limitBytes,
        });
        if (cancelled) return;
        if (!encoded) {
          setError(t.errors.preview);
          return;
        }
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(encoded.blob);
        });
        setPreviewSize(encoded.blob.size);
        setFit(
          limitBytes || minBytes ? { quality: encoded.quality, status: encoded.status } : null
        );
      } catch {
        if (!cancelled) setError(t.errors.preview);
      }
    }, 150);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
    // renderCanvas reads the stamp, which is listed by value so typing a name redraws the preview.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCrop, targetWidth, targetHeight, format, quality, limitBytes, minBytes, stampOn, stampName, stampDate]);

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

  useEffect(() => {
    const button = downloadRef.current;
    if (!button) return;
    const observer = new IntersectionObserver(([entry]) => setDownloadInView(entry.isIntersecting));
    observer.observe(button);
    return () => observer.disconnect();
  }, [imageSrc]);

  async function openCamera() {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(t.errors.cameraUnsupported);
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
      setError(t.errors.cameraDenied);
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
      setError(t.errors.fileType);
      return;
    }
    if (candidate.size > MAX_FILE_SIZE) {
      setError(t.errors.fileSize(formatBytes(candidate.size), formatBytes(MAX_FILE_SIZE)));
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
    setAspect(chosenPreset?.aspect);
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

    if (chosenPreset && aspect === chosenPreset.aspect) {
      setTargetWidth(chosenPreset.width);
      setTargetHeight(chosenPreset.height);
      ratioRef.current = chosenPreset.width / chosenPreset.height;
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

  function choosePreset(preset: FormPreset | undefined) {
    setChosenPreset(preset);
    setMinOverride(undefined);
    if (preset) {
      setFormat("jpeg");
      applyLimit(preset.maxKb ?? null);
    }
  }

  function handleFormPresetClick(preset: FormPreset) {
    setChosenPreset(preset);
    setMinOverride(undefined);
    handleAspectClick(preset.aspect);
    setTargetWidth(preset.width);
    setTargetHeight(preset.height);
    setLockAspect(true);
    setFormat("jpeg");
    applyLimit(preset.maxKb ?? null);
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
    const canvas = renderCanvas(imgRef.current, completedCrop, targetWidth, targetHeight);
    const encoded = await encodeCanvas(canvas, format, quality, { min: minBytes, max: limitBytes });
    return encoded?.blob ?? null;
  }

  function applyLimit(kb: number | null) {
    setMaxKb(kb);
    setCustomKb(customLimitText(kb));
  }

  function handleMinInput(raw: string) {
    const value = Math.round(Number(raw));
    setMinOverride(value > 0 ? value : null);
  }

  function handleLimitInput(raw: string) {
    setCustomKb(raw);
    const value = Math.round(Number(raw));
    setMaxKb(value > 0 ? value : null);
  }

  // File size scales roughly with pixel count, so scale both sides by the square root of the overshoot.
  async function shrinkToFit() {
    if (!limitBytes || !completedCrop || !imgRef.current || !targetWidth || !targetHeight) return;
    try {
      const canvas = renderCanvas(imgRef.current, completedCrop, targetWidth, targetHeight);
      const blob = await canvasToBlob(canvas, "jpeg", SHRINK_QUALITY);
      if (!blob || blob.size <= limitBytes) return;
      const scale = Math.sqrt(limitBytes / blob.size) * 0.95;
      setTargetWidth(Math.max(1, Math.round(targetWidth * scale)));
      setTargetHeight(Math.max(1, Math.round(targetHeight * scale)));
    } catch {
      setError(t.errors.shrink);
    }
  }

  // The reverse of shrinkToFit: more pixels for a file that falls short of the form's minimum.
  async function enlargeToFit() {
    if (!minBytes || !completedCrop || !imgRef.current || !targetWidth || !targetHeight) return;
    try {
      const canvas = renderCanvas(imgRef.current, completedCrop, targetWidth, targetHeight);
      const blob = await canvasToBlob(canvas, "jpeg", limitBytes ? TOP_QUALITY : quality);
      if (!blob || blob.size >= minBytes) return;
      const goal = limitBytes
        ? Math.min(minBytes * ENLARGE_MARGIN, (minBytes + limitBytes) / 2)
        : minBytes * ENLARGE_MARGIN;
      const scale = Math.sqrt(goal / blob.size);
      setTargetWidth(Math.ceil(targetWidth * scale));
      setTargetHeight(Math.ceil(targetHeight * scale));
    } catch {
      setError(t.errors.enlarge);
    }
  }

  async function handleDownload() {
    try {
      const blob = await exportBlob();
      if (!blob) {
        setError(t.errors.export);
        return;
      }
      downloadBlob(blob, getExportFilename());
    } catch {
      setError(t.errors.export);
    }
  }

  async function handleShare() {
    try {
      const blob = await exportBlob();
      if (!blob) {
        setError(t.errors.export);
        return;
      }
      const shareFile = new File([blob], getExportFilename(), { type: blob.type });
      if (!navigator.canShare?.({ files: [shareFile] })) {
        setError(t.errors.shareUnsupported);
        return;
      }
      await navigator.share({ files: [shareFile] });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(t.errors.share);
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
    setFit(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const errorBanner = error && (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-curtain-line bg-curtain-soft px-4 py-3 text-sm text-curtain-ink"
    >
      <AlertIcon className="mt-px size-4 shrink-0 text-curtain" />
      <p className="flex-1 text-pretty">{error}</p>
      <button
        type="button"
        onClick={() => setError(null)}
        aria-label={t.dismiss}
        className="-m-1 rounded-md p-1 text-curtain-ink/70 transition duration-200 hover:bg-curtain/10 hover:text-curtain-ink"
      >
        <CloseIcon className="size-4" />
      </button>
    </div>
  );

  const showSkeleton = !previewUrl && !!completedCrop && targetWidth > 0 && targetHeight > 0;
  const formatLabel = format === "png" ? "PNG" : "JPEG";
  const sizeLabel = previewSize !== null ? formatBytes(previewSize) : null;

  return (
    <>
      {!imageSrc ? (
        <section
          aria-labelledby="hero-title"
          className="grid gap-4 pt-4 sm:pt-6 lg:grid-cols-12 lg:gap-x-5 lg:gap-y-0 lg:pt-8"
        >
          {/* On phones the heading, then the upload control, then the intro: the photo picker stays on the first screen. */}
          <div className="rounded-[22px] bg-booth p-5 text-ink sm:p-8 lg:col-span-5 lg:row-start-1 lg:rounded-b-none lg:p-10 lg:pb-0">
            <h1
              id="hero-title"
              className="signage text-[2.25rem] text-balance sm:text-6xl xl:text-[4.5rem]"
            >
              {title}
              <span className="text-ink/55 normal-case">{titleAccent}</span>
            </h1>
          </div>

          <div className="flex min-w-0 flex-col gap-4 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div className="on-dark rounded-[22px] bg-stage p-2.5 text-stage-text shadow-panel">
              <div
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
                onClick={(e) => {
                  // A click on the empty stage opens the file picker, like the button does.
                  if (e.target === e.currentTarget) fileInputRef.current?.click();
                }}
                className="relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-stage-line px-4 py-6 text-center transition-colors duration-200 hover:border-stage-muted data-dragging:border-booth data-dragging:bg-stage-raised sm:min-h-[26rem] sm:gap-6 sm:px-6 sm:py-10"
              >
                <span className="pointer-events-none flex flex-col items-center gap-4 sm:gap-6">
                  <FrameGuide
                    aspect={chosenPreset?.aspect ?? 4 / 5}
                    caption={presetCaption(t, chosenPreset, maxKb)}
                    kind={chosenPreset?.kind ?? initialKind}
                  />
                  <span className="flex flex-col gap-1.5">
                    <span className="signage hidden text-[2rem] sm:block">
                      {isDragging ? t.releaseToLoad : t.dropHere}
                    </span>
                    <span className="text-sm text-stage-muted">JPG, PNG or WEBP, up to 20 MB</span>
                  </span>
                </span>
                <span className="flex flex-wrap items-center justify-center gap-2.5">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-booth px-5 py-3 text-[15px] font-bold text-ink shadow-key transition duration-200 hover:bg-booth-deep active:scale-[0.98] has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-booth">
                    <ImageIcon className="size-4.5" />
                    {t.choosePhoto}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      onChange={(e) => validateAndLoadFile(e.target.files?.[0])}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={openCamera}
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[15px] font-bold text-stage-text ring-2 ring-booth transition duration-200 ring-inset hover:bg-stage-raised active:scale-[0.98]"
                  >
                    <CameraIcon className="size-4.5 text-booth" />
                    {t.useCamera}
                  </button>
                </span>
              </div>
              <p className="flex items-center justify-center gap-1.5 px-3 pt-2.5 pb-1 text-xs text-stage-muted">
                <LockIcon className="size-3.5 text-booth" />
                {t.staysOnDevice}
              </p>
            </div>

            {errorBanner}

            <div className="rounded-[22px] border border-rule bg-surface p-5 shadow-panel sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 id="registry-heading" className="signage text-[22px]">
                  {t.pickSize}
                </h2>
                <p className="text-sm text-muted">{t.changeLater}</p>
              </div>
              <div
                role="group"
                aria-labelledby="registry-heading"
                className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3"
              >
                {[...pickerPresets, undefined].map((preset) => {
                  const active = chosenPreset?.slug === preset?.slug;
                  return (
                    <button
                      key={preset?.slug ?? "custom"}
                      type="button"
                      aria-pressed={active}
                      onClick={() => choosePreset(preset)}
                      className={`flex flex-col gap-3 rounded-xl p-3 text-left transition duration-200 active:scale-[0.98] ${
                        active
                          ? "on-dark bg-ink text-stage-text"
                          : "bg-ground/60 ring-1 ring-rule ring-inset hover:bg-ground hover:ring-rule-strong"
                      }`}
                    >
                      <span className="flex h-15 items-end">
                        {preset ? (
                          <PresetOutline
                            preset={preset}
                            scale={REGISTRY_SCALE}
                            className={active ? "text-booth" : "text-ink"}
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className={`block h-11 w-14 rounded-[2px] border-[1.5px] border-dashed ${
                              active ? "border-booth" : "border-ink/60"
                            }`}
                          />
                        )}
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-sm leading-snug font-semibold">
                          {preset ? preset.name : t.customSize}
                        </span>
                        <span
                          className={`flex flex-col text-xs tabular-nums ${active ? "text-stage-muted" : "text-muted"}`}
                        >
                          {preset ? (
                            <>
                              <span>{preset.spec}</span>
                              <span>
                                {preset.width} × {preset.height} px
                              </span>
                            </>
                          ) : (
                            <>
                              <span>{t.anyWidthHeight}</span>
                              <span>{t.setInPixels}</span>
                            </>
                          )}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7 rounded-[22px] bg-booth p-6 text-ink sm:p-8 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:rounded-t-none lg:p-10 lg:pt-7">
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-pretty text-ink/80">{intro}</p>
            <ol aria-label={t.howItWorks} className="grid grid-cols-2 gap-x-4 gap-y-3 border-t-2 border-ink pt-5 lg:grid-cols-1 lg:pt-6">
              {t.steps.map((step, index) => (
                <li key={step} className="flex items-center gap-3.5">
                  <StepDisc step={index + 1} />
                  <span className="text-[15px] leading-tight font-semibold lg:text-[17px]">{step}</span>
                </li>
              ))}
            </ol>
            <ul
              aria-label={t.whatYouGet}
              className="mt-auto flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold"
            >
              {t.promises.map((promise) => (
                <li key={promise} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1.5 bg-ink" />
                  {promise}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <>
          <h1 className="sr-only">{t.editPhoto}</h1>
          {errorBanner && <div className="pt-4">{errorBanner}</div>}
          <div className="grid grid-cols-1 pt-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:grid-rows-[auto_auto_1fr] lg:gap-x-5">
            <section
              aria-labelledby="size-heading"
              className="mb-4 flex flex-col gap-4 rounded-[22px] bg-booth p-5 text-ink lg:col-start-2 lg:row-start-2 lg:mb-0 lg:rounded-b-none"
            >
              <StepHeading step={2} id="size-heading">
                {t.pickSize}
              </StepHeading>

              <div role="group" aria-label={t.presetsLabel} className="grid grid-cols-3 gap-1.5">
                {pickerPresets.map((preset) => {
                  const active =
                    aspect === preset.aspect &&
                    targetWidth === preset.width &&
                    targetHeight === preset.height;
                  return (
                    <button
                      key={preset.slug}
                      type="button"
                      aria-pressed={active}
                      onClick={() => handleFormPresetClick(preset)}
                      className={`flex flex-col gap-2 rounded-lg p-2 text-left transition duration-200 active:scale-[0.98] ${
                        active ? "on-dark bg-ink text-stage-text" : "ring-1 ring-ink/20 ring-inset hover:bg-ink/8"
                      }`}
                    >
                      <span className="flex h-8 items-end">
                        <PresetOutline
                          preset={preset}
                          scale={RAIL_SCALE}
                          className={active ? "text-booth" : "text-ink"}
                        />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-[13px] leading-tight font-semibold">{preset.name}</span>
                        <span
                          className={`mt-0.5 text-[11px] tabular-nums ${active ? "text-stage-muted" : "text-ink/70"}`}
                        >
                          {preset.width} × {preset.height} px
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-2 border-t border-ink/25 pt-3">
                <div className="flex items-end gap-2">
                  <PixelInput label={t.widthLabel} value={targetWidth} onChange={handleWidthChange} />
                  <button
                    type="button"
                    onClick={toggleLockAspect}
                    aria-pressed={lockAspect}
                    aria-label={t.lockAspect}
                    title={lockAspect ? t.aspectLocked : t.aspectUnlocked}
                    className={`inline-flex size-11 shrink-0 items-center justify-center rounded-lg border transition duration-200 active:scale-95 ${
                      lockAspect
                        ? "border-ink bg-ink text-booth"
                        : "border-ink/40 bg-surface/60 text-ink/70 hover:bg-surface hover:text-ink"
                    }`}
                  >
                    {lockAspect ? <LockIcon className="size-4" /> : <LockOpenIcon className="size-4" />}
                  </button>
                  <PixelInput label={t.heightLabel} value={targetHeight} onChange={handleHeightChange} />
                </div>
              </div>

              {!chosenPreset?.kind && (
                <div className="flex flex-col gap-2.5 border-t border-ink/25 pt-3">
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={stampOn}
                      onChange={(e) => setStampOn(e.target.checked)}
                      className="size-4 accent-ink"
                    />
                    {t.stampToggle}
                  </label>
                  {stampOn && (
                    <div className="flex gap-2">
                      <label className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <span className="text-xs font-medium text-ink/75">{t.stampName}</span>
                        <input
                          type="text"
                          value={stampName}
                          onChange={(e) => setStampName(e.target.value)}
                          placeholder={t.stampNamePlaceholder}
                          autoComplete="name"
                          className="w-full rounded-lg border border-ink/40 bg-surface/60 px-3 py-2 text-[15px] font-semibold uppercase placeholder:font-normal placeholder:normal-case placeholder:text-ink/60 focus:border-ink focus:bg-surface focus:ring-3 focus:ring-ink/20 focus:outline-none"
                        />
                      </label>
                      <label className="flex w-40 shrink-0 flex-col gap-1.5">
                        <span className="text-xs font-medium text-ink/75">{t.stampDate}</span>
                        <input
                          type="date"
                          value={stampDate}
                          onChange={(e) => setStampDate(e.target.value)}
                          className="w-full rounded-lg border border-ink/40 bg-surface/60 px-2.5 py-2 text-[15px] font-semibold tabular-nums focus:border-ink focus:bg-surface focus:ring-3 focus:ring-ink/20 focus:outline-none"
                        />
                      </label>
                    </div>
                  )}
                  {stampOn && (
                    <p className="text-xs text-pretty text-ink/75">
                      {t.stampNote(Math.round(STAMP_BAND * 100))}
                    </p>
                  )}
                </div>
              )}
            </section>

            <div className="on-dark flex flex-wrap items-center gap-x-4 gap-y-3 rounded-t-[22px] bg-ink px-4 py-2.5 text-stage-text lg:col-span-2 lg:row-start-1 lg:mb-4 lg:rounded-[22px]">
              <StepHeading step={3} id="frame-heading" onDark>
                {t.frameFace}
              </StepHeading>
              <div className="flex max-w-full items-center gap-1.5">
                <div
                  role="group"
                  aria-label={t.aspectLabel}
                  className="inline-flex max-w-full overflow-x-auto rounded-lg bg-stage-raised p-1 ring-1 ring-stage-line ring-inset"
                >
                  {ASPECT_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      aria-pressed={aspect === preset.value}
                      onClick={() => handleAspectClick(preset.value)}
                      className={segmentClass(aspect === preset.value, true)}
                    >
                      {preset.label === "free" ? t.free : preset.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => rotateBy(-90)}
                  aria-label={t.rotateLeft}
                  title={t.rotateLeft}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-stage-muted transition duration-200 hover:bg-stage-raised hover:text-stage-text active:scale-95"
                >
                  <RotateLeftIcon className="size-4.5" />
                </button>
                <button
                  type="button"
                  onClick={() => rotateBy(90)}
                  aria-label={t.rotateRight}
                  title={t.rotateRight}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-stage-muted transition duration-200 hover:bg-stage-raised hover:text-stage-text active:scale-95"
                >
                  <RotateRightIcon className="size-4.5" />
                </button>
              </div>
              {originalDims && file && (
                <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stage-muted tabular-nums lg:ml-auto">
                  <span className="max-w-[24ch] truncate text-stage-text">{file.name}</span>
                  <span>
                    {originalDims.width} × {originalDims.height} px
                  </span>
                  <span>{formatBytes(file.size)}</span>
                  {rotation !== 0 && <span>{t.rotated(rotation)}</span>}
                </p>
              )}
            </div>

            <section
              aria-labelledby="frame-heading"
              className="on-dark mb-4 flex min-w-0 items-center justify-center rounded-b-[22px] lg:sticky lg:top-4 lg:self-start bg-stage p-4 text-stage-text lg:col-start-1 lg:row-span-2 lg:row-start-2 lg:mb-0 lg:rounded-[22px] sm:p-8"
            >
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
                // The library's stylesheet makes the image inherit max-height from this container.
                style={{ maxHeight: "min(64dvh, 36rem)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={rotatedSrc ?? imageSrc}
                  alt={t.cropAlt}
                  onLoad={onImageLoad}
                  onError={() => setError(t.errors.unreadable)}
                  className="max-h-[min(64dvh,36rem)] max-w-full"
                />
              </ReactCrop>
            </section>

            <section
              aria-labelledby="download-heading"
              className="flex flex-col gap-4 rounded-[22px] bg-booth p-5 text-ink lg:col-start-2 lg:row-start-3 lg:rounded-t-none lg:shadow-[inset_0_2px_0_var(--ink)]"
            >
              <div className="flex items-center justify-between gap-3">
                <StepHeading step={4} id="download-heading">
                  {t.download}
                </StepHeading>
                <div
                    role="group"
                    aria-label={t.exportFormat}
                    className="inline-flex rounded-lg bg-ink/10 p-1 ring-1 ring-ink/20 ring-inset"
                  >
                    {(["jpeg", "png"] as ExportFormat[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        aria-pressed={format === f}
                        onClick={() => setFormat(f)}
                        className={`min-w-16 ${segmentClass(format === f)} ${format === f ? "" : "text-ink/70"}`}
                      >
                        {f === "png" ? "PNG" : "JPEG"}
                      </button>
                    ))}
                  </div>
              </div>

              <div className="flex flex-col gap-3">
                {format === "jpeg" ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <span id="limit-label" className="text-xs font-semibold text-ink/75">
                        {t.maxFileSize}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div
                          role="group"
                          aria-labelledby="limit-label"
                          className="inline-flex rounded-lg bg-ink/10 p-1 ring-1 ring-ink/20 ring-inset"
                        >
                          {[null, ...LIMIT_CHOICES].map((kb) => (
                            <button
                              key={kb ?? "any"}
                              type="button"
                              aria-pressed={maxKb === kb}
                              onClick={() => applyLimit(kb)}
                              className={`${segmentClass(maxKb === kb)} ${maxKb === kb ? "" : "text-ink/70"}`}
                            >
                              {kb ? `${kb} KB` : t.any}
                            </button>
                          ))}
                        </div>
                        <label className="relative min-w-0 flex-1">
                          <span className="sr-only">{t.otherLimit}</span>
                          <input
                            type="number"
                            min={1}
                            inputMode="numeric"
                            placeholder={t.other}
                            value={customKb}
                            onChange={(e) => handleLimitInput(e.target.value)}
                            className="w-full [appearance:textfield] rounded-lg border border-ink/40 bg-surface/60 py-2 pr-8 pl-2.5 text-[13px] font-semibold tabular-nums transition-[border-color,box-shadow] duration-200 placeholder:font-normal placeholder:text-ink/60 hover:border-ink/60 focus:border-ink focus:bg-surface focus:ring-3 focus:ring-ink/20 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-xs text-ink/60"
                          >
                            KB
                          </span>
                        </label>
                      </div>
                      <label className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-ink/75">{t.minFileSize}</span>
                        <span className="relative w-28">
                          <input
                            type="number"
                            min={1}
                            inputMode="numeric"
                            placeholder={t.none}
                            value={minKb ?? ""}
                            onChange={(e) => handleMinInput(e.target.value)}
                            className="w-full [appearance:textfield] rounded-lg border border-ink/40 bg-surface/60 py-2 pr-8 pl-2.5 text-[13px] font-semibold tabular-nums transition-[border-color,box-shadow] duration-200 placeholder:font-normal placeholder:text-ink/60 hover:border-ink/60 focus:border-ink focus:bg-surface focus:ring-3 focus:ring-ink/20 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-xs text-ink/60"
                          >
                            KB
                          </span>
                        </span>
                      </label>
                    </div>

                    {fit && fit.status !== "fits" ? (
                      <div
                        role="status"
                        className="flex items-start gap-2.5 rounded-lg bg-ink/8 p-3 text-xs leading-relaxed text-pretty"
                      >
                        <AlertIcon className="mt-px size-4 shrink-0" />
                        <div className="flex flex-col items-start gap-2">
                          {fit.status === "too-big" ? (
                            <p>
                              <span className="font-semibold">
                                {t.tooBig(maxKb, targetWidth, targetHeight)}
                              </span>{" "}
                              {t.fewerPixels}
                            </p>
                          ) : (
                            <p>
                              <span className="font-semibold">
                                {t.tooSmall(minKb, targetWidth, targetHeight)}
                              </span>{" "}
                              {maxKb
                                ? t.morePixels
                                : t.fullQualityMorePixels}
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={fit.status === "too-big" ? shrinkToFit : enlargeToFit}
                            className="rounded-md bg-ink px-3 py-1.5 text-[13px] font-semibold text-booth transition duration-200 hover:bg-ink-soft active:scale-[0.97]"
                          >
                            {fit.status === "too-big" ? t.shrinkToFit : t.enlargeToFit}
                          </button>
                        </div>
                      </div>
                    ) : maxKb ? (
                      <p role="status" className="text-xs text-pretty text-ink/75">
                        {fit ? (
                          <>
                            {t.qualitySetTo}{" "}
                            <span className="font-bold text-ink tabular-nums">
                              {Math.round(fit.quality * 100)}%
                            </span>{" "}
                            {minKb ? t.toStayBetween(minKb, maxKb) : t.toStayUnder(maxKb)}
                          </>
                        ) : (
                          <>{t.qualityAuto(maxKb)}</>
                        )}
                      </p>
                    ) : fit && minKb && fit.quality > quality ? (
                      <p role="status" className="text-xs text-pretty text-ink/75">
                        {t.qualityRaisedTo}{" "}
                        <span className="font-bold text-ink tabular-nums">
                          {Math.round(fit.quality * 100)}%
                        </span>{" "}
                        {t.toStayAbove(minKb)}
                      </p>
                    ) : null}

                    {!maxKb && (
                      <label className="flex flex-col gap-2">
                        <span className="flex items-center justify-between gap-3 text-xs font-semibold text-ink/75">
                          {t.quality}
                          <span className="text-sm font-bold text-ink tabular-nums">
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
                          className="w-full"
                        />
                      </label>
                    )}
                  </>
                ) : (
                  <p className="text-xs text-pretty text-ink/75">
                    {t.lossless}
                  </p>
                )}
              </div>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="relative z-10 h-5 rounded-[5px] bg-ink shadow-[inset_0_-4px_0_#000,inset_0_1px_0_rgb(255_255_255/0.12),0_1px_0_rgb(255_255_255/0.35)]"
                />
                <div className="-mt-2 flex min-h-40 justify-center overflow-hidden px-4 pb-2">
                  {previewUrl ? (
                    <figure key={imageSrc} className="relative flex h-fit w-min animate-deliver flex-col bg-surface p-2 pt-3.5 pb-0 shadow-print">
                      {/* The slot's lip shadows the print's top edge as it comes out. */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-4 bg-linear-to-b from-black/30 to-transparent"
                      />
                      <div className={`animate-develop ${format === "png" ? "checker" : ""}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          key={previewUrl}
                          src={previewUrl}
                          alt={t.previewAlt}
                          className="block h-32 w-auto max-w-none animate-refresh"
                        />
                      </div>
                      <figcaption className="py-2 text-center text-[11px] leading-snug font-semibold text-balance text-ink-soft tabular-nums">
                        {targetWidth} × {targetHeight} px · {formatLabel}
                        {sizeLabel && ` · ${sizeLabel}`}
                      </figcaption>
                    </figure>
                  ) : showSkeleton ? (
                    <div className="flex h-fit flex-col bg-surface p-2 pt-3.5 shadow-print" aria-hidden="true">
                      <div
                        className="skeleton h-32 max-w-full animate-shimmer"
                        style={{ aspectRatio: `${targetWidth} / ${targetHeight}` }}
                      />
                      <div className="h-7" />
                    </div>
                  ) : (
                    <p className="pt-12 text-center text-sm text-pretty text-ink/75">
                      {t.printComesOut}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  ref={downloadRef}
                  type="button"
                  onClick={handleDownload}
                  disabled={!previewUrl}
                  className="on-dark group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3.5 text-[15px] font-bold text-booth shadow-key transition duration-200 hover:bg-ink-soft active:scale-[0.99] disabled:pointer-events-none disabled:opacity-45"
                >
                  <DownloadIcon className="size-4.5 transition duration-200 group-hover:translate-y-px" />
                  {t.downloadFormat(formatLabel)}
                  {sizeLabel && (
                    <span className="tabular-nums">
                      · {targetWidth} × {targetHeight} px · {sizeLabel}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-2">
                  {canShareFiles && (
                    <button
                      type="button"
                      onClick={handleShare}
                      disabled={!previewUrl}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-ink/40 bg-surface/60 px-4 py-2.5 text-sm font-semibold transition duration-200 hover:bg-surface active:scale-[0.99] disabled:pointer-events-none disabled:opacity-45"
                    >
                      <ShareIcon className="size-4" />
                      {t.share}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleReset}
                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold text-ink/75 transition duration-200 hover:bg-ink/8 hover:text-ink ${
                      canShareFiles ? "" : "mx-auto"
                    }`}
                  >
                    {t.startOver}
                  </button>
                </div>
              </div>
              {canShareFiles && (
                <p className="text-xs leading-relaxed text-pretty text-ink/75">
                  {t.whatsappNote}
                </p>
              )}
            </section>
          </div>

          <div
            inert={downloadInView}
            className={`on-dark fixed inset-x-0 bottom-0 z-40 bg-ink px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-transform duration-300 ease-mech lg:hidden ${
              downloadInView ? "translate-y-full" : "translate-y-0"
            }`}
          >
            <button
              type="button"
              onClick={handleDownload}
              disabled={!previewUrl}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-booth px-4 py-3 text-[15px] font-bold text-ink transition duration-200 active:scale-[0.99] disabled:opacity-45"
            >
              <DownloadIcon className="size-4.5" />
              {t.downloadFormat(formatLabel)}
              {sizeLabel && (
                <span className="tabular-nums">
                  · {targetWidth} × {targetHeight} px · {sizeLabel}
                </span>
              )}
            </button>
          </div>
        </>
      )}

      {isCameraOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.takePhoto}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeCamera();
          }}
          className="on-dark fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-stage p-4 text-stage-text"
        >
          <p className="flex w-full max-w-2xl items-center gap-2 text-sm font-semibold">
            <span aria-hidden="true" className="size-2 animate-live rounded-full bg-curtain" />
            {t.cameraOn}
            <span className="ml-auto text-xs font-normal text-stage-muted">
              {chosenPreset ? presetCaption(t, chosenPreset) : t.fitHeadShoulders}
            </span>
          </p>
          <div className="relative w-full max-w-2xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="max-h-[68dvh] w-full rounded-2xl bg-black ring-1 ring-stage-line"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 h-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[4px] border-2 border-dashed border-booth/80"
              style={{ aspectRatio: String(chosenPreset?.aspect ?? 4 / 5) }}
            />
          </div>
          <div className="grid w-full max-w-2xl grid-cols-3 items-center">
            <button
              type="button"
              onClick={closeCamera}
              className="justify-self-start rounded-lg px-3 py-2 text-sm font-semibold text-stage-muted transition duration-200 hover:bg-stage-raised hover:text-stage-text"
            >
              {t.cancel}
            </button>
            <button
              ref={captureButtonRef}
              type="button"
              onClick={capturePhoto}
              aria-label={t.capture}
              className="group size-[4.5rem] justify-self-center rounded-full border-[3px] border-booth p-1.5 transition duration-200 active:scale-95"
            >
              <span className="block size-full rounded-full bg-booth transition duration-200 group-hover:scale-95" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
