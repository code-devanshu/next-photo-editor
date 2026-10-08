"use client";

import { useEffect, useRef, useState } from "react";
import { downloadBlob, encodeCanvas, formatBytes } from "@/lib/image-export";
import { AlertIcon, CloseIcon, DownloadIcon, ImageIcon, LockIcon } from "@/lib/icons";
import { buildPdf, pdfOverhead, type PdfImage } from "@/lib/pdf";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_PAGES = 20;
// A4 at 150 DPI on the long side: sharp enough to read a scan, small enough to compress.
const MAX_SIDE = 1754;
const LIMIT_CHOICES = [50, 100, 200, 300];
const PROMISES = ["Free", "No sign-up", "No watermark", "Never uploaded"];

type Page = { id: number; file: File; url: string };
type Result = { blob: Blob; url: string };

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not read image"));
    image.src = url;
  });
}

/** Draws the image at `scale` on white (PNG transparency would otherwise turn black in a JPEG). */
function drawScaled(image: HTMLImageElement, scale: number) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is not available");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/** Fits every page into an equal share of the size limit, shrinking pixels only when quality alone can't. */
async function makePdf(pages: Page[], limitBytes: number) {
  const budget = Math.floor((limitBytes - pdfOverhead(pages.length)) / pages.length);
  if (budget < 2000) return null;
  const images: PdfImage[] = [];
  for (const page of pages) {
    const image = await loadImage(page.url);
    let scale = Math.min(1, MAX_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
    let canvas = drawScaled(image, scale);
    let encoded = await encodeCanvas(canvas, "jpeg", 0.85, { min: null, max: budget });
    for (let attempt = 0; encoded?.status === "too-big" && attempt < 6; attempt++) {
      scale *= Math.sqrt(budget / encoded.blob.size) * 0.9;
      canvas = drawScaled(image, scale);
      encoded = await encodeCanvas(canvas, "jpeg", 0.85, { min: null, max: budget });
    }
    if (!encoded) return null;
    images.push({
      jpeg: new Uint8Array(await encoded.blob.arrayBuffer()),
      width: canvas.width,
      height: canvas.height,
    });
  }
  const pdf = buildPdf(images);
  return new Blob([pdf.buffer as ArrayBuffer], { type: "application/pdf" });
}

function segmentClass(active: boolean) {
  return `rounded-md px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap transition duration-200 active:scale-[0.97] ${
    active ? "bg-ink text-booth shadow-key" : "text-ink/70 hover:text-ink"
  }`;
}

export default function PdfMaker({
  title,
  titleAccent,
  intro,
  maxKb: initialMaxKb = 100,
}: {
  title: string;
  titleAccent: string;
  intro: string;
  maxKb?: number;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const [pages, setPages] = useState<Page[]>([]);
  const [maxKb, setMaxKb] = useState(initialMaxKb);
  const [result, setResult] = useState<Result | null>(null);
  const [building, setBuilding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Rebuild the PDF whenever the pages, their order or the limit change.
  useEffect(() => {
    if (pages.length === 0) return;
    let cancelled = false;
    const timeout = setTimeout(async () => {
      setBuilding(true);
      try {
        const blob = await makePdf(pages, maxKb * 1000);
        if (cancelled) return;
        if (!blob) {
          setError(`${maxKb} KB is too small for ${pages.length} pages. Raise the limit or remove a page.`);
          setResult((prev) => {
            if (prev) URL.revokeObjectURL(prev.url);
            return null;
          });
          return;
        }
        setError(null);
        setResult((prev) => {
          if (prev) URL.revokeObjectURL(prev.url);
          return { blob, url: URL.createObjectURL(blob) };
        });
      } catch {
        if (!cancelled) setError("One of the images couldn't be read. Remove it and try again.");
      } finally {
        if (!cancelled) setBuilding(false);
      }
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [pages, maxKb]);

  function addFiles(files: FileList | null) {
    if (!files) return;
    setError(null);
    const accepted: Page[] = [];
    for (const file of Array.from(files)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError(`${file.name} isn't a JPG, PNG or WEBP image.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name} is over 20 MB.`);
        continue;
      }
      accepted.push({ id: nextId.current++, file, url: URL.createObjectURL(file) });
    }
    setPages((prev) => {
      const next = [...prev, ...accepted];
      if (next.length > MAX_PAGES) setError(`A PDF can have up to ${MAX_PAGES} pages here.`);
      next.slice(MAX_PAGES).forEach((page) => URL.revokeObjectURL(page.url));
      return next.slice(0, MAX_PAGES);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePage(id: number) {
    setPages((prev) => {
      const page = prev.find((candidate) => candidate.id === id);
      if (page) URL.revokeObjectURL(page.url);
      const next = prev.filter((candidate) => candidate.id !== id);
      if (next.length === 0) {
        setResult((current) => {
          if (current) URL.revokeObjectURL(current.url);
          return null;
        });
      }
      return next;
    });
  }

  function movePage(index: number, delta: number) {
    setPages((prev) => {
      const target = index + delta;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function handleDownload() {
    if (!result) return;
    const base = pages[0]?.file.name.replace(/\.[^.]+$/, "") ?? "document";
    downloadBlob(result.blob, `${base}.pdf`);
  }

  const sizeLabel = result ? formatBytes(result.blob.size) : null;

  return (
    <section
      aria-labelledby="hero-title"
      className="grid gap-4 pt-4 sm:pt-6 lg:grid-cols-12 lg:gap-x-5 lg:gap-y-0 lg:pt-8"
    >
      <div className="rounded-[22px] bg-booth p-5 text-ink sm:p-8 lg:col-span-5 lg:row-start-1 lg:rounded-b-none lg:p-10 lg:pb-0">
        <h1 id="hero-title" className="signage text-[2.25rem] text-balance sm:text-6xl xl:text-[4.5rem]">
          {title}
          <span className="text-ink/55 normal-case">{titleAccent}</span>
        </h1>
      </div>

      <div className="flex min-w-0 flex-col gap-4 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
        <div className="on-dark rounded-[22px] bg-stage p-2.5 text-stage-text shadow-panel">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFiles(e.dataTransfer.files);
            }}
            className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-stage-line px-4 py-8 text-center sm:min-h-[18rem] sm:gap-6"
          >
            <span className="flex flex-col gap-1.5">
              <span className="signage hidden text-[2rem] sm:block">Drop images here</span>
              <span className="text-sm text-stage-muted">JPG, PNG or WEBP. Each image becomes one A4 page.</span>
            </span>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-booth px-5 py-3 text-[15px] font-bold text-ink shadow-key transition duration-200 hover:bg-booth-deep active:scale-[0.98] has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-booth">
              <ImageIcon className="size-4.5" />
              {pages.length ? "Add more images" : "Choose images"}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => addFiles(e.target.files)}
              />
            </label>
          </div>
          <p className="flex items-center justify-center gap-1.5 px-3 pt-2.5 pb-1 text-xs text-stage-muted">
            <LockIcon className="size-3.5 text-booth" />
            The PDF is made on this device. Nothing is uploaded.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-curtain-line bg-curtain-soft px-4 py-3 text-sm text-curtain-ink"
          >
            <AlertIcon className="mt-px size-4 shrink-0 text-curtain" />
            <p className="flex-1 text-pretty">{error}</p>
          </div>
        )}

        {pages.length > 0 && (
          <div className="flex flex-col gap-4 rounded-[22px] bg-booth p-5 text-ink">
            <h2 className="signage text-[22px]">Pages</h2>
            <ol className="flex flex-col gap-2">
              {pages.map((page, index) => (
                <li key={page.id} className="flex items-center gap-3 rounded-xl bg-surface/70 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={page.url}
                    alt={`Page ${index + 1}: ${page.file.name}`}
                    className="h-14 w-11 shrink-0 rounded-[3px] bg-surface object-contain ring-1 ring-ink/15"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">Page {index + 1}</span>
                    <span className="block truncate text-xs text-ink/70">{page.file.name}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => movePage(index, -1)}
                      disabled={index === 0}
                      aria-label={`Move page ${index + 1} up`}
                      className="inline-flex size-9 items-center justify-center rounded-lg text-ink/70 transition duration-200 hover:bg-ink/8 hover:text-ink disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => movePage(index, 1)}
                      disabled={index === pages.length - 1}
                      aria-label={`Move page ${index + 1} down`}
                      className="inline-flex size-9 items-center justify-center rounded-lg text-ink/70 transition duration-200 hover:bg-ink/8 hover:text-ink disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removePage(page.id)}
                      aria-label={`Remove page ${index + 1}`}
                      className="inline-flex size-9 items-center justify-center rounded-lg text-ink/70 transition duration-200 hover:bg-ink/8 hover:text-ink"
                    >
                      <CloseIcon className="size-4" />
                    </button>
                  </span>
                </li>
              ))}
            </ol>

            <div className="flex flex-col gap-2 border-t border-ink/25 pt-3">
              <span id="pdf-limit-label" className="text-xs font-semibold text-ink/75">
                Max PDF size
              </span>
              <div className="flex items-center gap-1.5">
                <div
                  role="group"
                  aria-labelledby="pdf-limit-label"
                  className="inline-flex rounded-lg bg-ink/10 p-1 ring-1 ring-ink/20 ring-inset"
                >
                  {LIMIT_CHOICES.map((kb) => (
                    <button
                      key={kb}
                      type="button"
                      aria-pressed={maxKb === kb}
                      onClick={() => setMaxKb(kb)}
                      className={segmentClass(maxKb === kb)}
                    >
                      {kb} KB
                    </button>
                  ))}
                </div>
                <label className="relative min-w-0 flex-1">
                  <span className="sr-only">Other limit in KB</span>
                  <input
                    type="number"
                    min={10}
                    inputMode="numeric"
                    placeholder="Other"
                    value={LIMIT_CHOICES.includes(maxKb) ? "" : maxKb}
                    onChange={(e) => {
                      const value = Math.round(Number(e.target.value));
                      if (value >= 10) setMaxKb(value);
                    }}
                    className="w-full [appearance:textfield] rounded-lg border border-ink/40 bg-surface/60 py-2 pr-8 pl-2.5 text-[13px] font-semibold tabular-nums placeholder:font-normal placeholder:text-ink/60 focus:border-ink focus:bg-surface focus:ring-3 focus:ring-ink/20 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-xs text-ink/60">
                    KB
                  </span>
                </label>
              </div>
            </div>

            <p role="status" className="text-xs text-pretty text-ink/75">
              {building
                ? "Making the PDF…"
                : result
                  ? `${pages.length} ${pages.length === 1 ? "page" : "pages"}, ${sizeLabel}, ${
                      result.blob.size <= maxKb * 1000 ? "under" : "just over"
                    } ${maxKb} KB.`
                  : null}
            </p>

            <button
              type="button"
              onClick={handleDownload}
              disabled={!result || building}
              className="on-dark inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3.5 text-[15px] font-bold text-booth shadow-key transition duration-200 hover:bg-ink-soft active:scale-[0.99] disabled:pointer-events-none disabled:opacity-45"
            >
              <DownloadIcon className="size-4.5" />
              Download PDF
              {sizeLabel && <span className="tabular-nums">· {sizeLabel}</span>}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-7 rounded-[22px] bg-booth p-6 text-ink sm:p-8 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:rounded-t-none lg:p-10 lg:pt-7">
        <p className="max-w-[46ch] text-[17px] leading-relaxed text-pretty text-ink/80">{intro}</p>
        <ul aria-label="What you get" className="mt-auto flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          {PROMISES.map((promise) => (
            <li key={promise} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 bg-ink" />
              {promise}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
