import Link from "next/link";
import { BrandMark } from "@/lib/brand-mark";
import { LockIcon } from "@/lib/icons";
import { FEATURED_PRESETS, getPage, pagesIn } from "@/lib/pages";
import { presetSizeRange, presetTitle, type FormPreset } from "@/lib/presets";
import { FEEDBACK_URL, SITE_NAME } from "@/lib/site";

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-booth focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
    >
      Skip to content
    </a>
  );
}

function Wordmark() {
  return (
    <Link href="/" className="-m-1 flex items-center gap-2.5 rounded-lg p-1">
      <BrandMark size={30} />
      <span className="figures text-[26px] text-booth">{SITE_NAME}</span>
    </Link>
  );
}

// Passport and ID documents lead the header nav; exam forms are grouped after them.
function presetCategory(preset: FormPreset) {
  return getPage(preset.slug)?.category;
}
const ID_PRESETS = FEATURED_PRESETS.filter((preset) => {
  const category = presetCategory(preset);
  return category === "id" || category === "visa";
});
const EXAM_PRESETS = FEATURED_PRESETS.filter((preset) => !ID_PRESETS.includes(preset));
const LIMIT_PAGES = pagesIn("kb");

function FooterPresetList({
  presets,
  detail,
}: {
  presets: FormPreset[];
  detail: (preset: FormPreset) => string | null;
}) {
  return (
    <ul className="mt-3 flex flex-col gap-2">
      {presets.map((preset) => (
        <li key={preset.slug}>
          <Link
            href={`/${preset.slug}`}
            className="group flex items-baseline gap-3 text-stage-muted transition-colors duration-200 hover:text-stage-text"
          >
            <span className="underline-offset-4 group-hover:underline">{presetTitle(preset)}</span>
            <span className="text-xs text-stage-muted/80">{detail(preset)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  return (
    <header className="on-dark bg-ink text-stage-text">
      <div className="mx-auto flex h-15 w-full max-w-[88rem] items-center justify-between gap-6 px-4 sm:px-6">
        <Wordmark />
        <nav aria-label="Photo sizes" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {ID_PRESETS.map((preset) => (
              <li key={preset.slug}>
                <Link
                  href={`/${preset.slug}`}
                  className="rounded-md px-3 py-2 text-sm text-stage-muted transition-colors duration-200 hover:bg-stage-raised hover:text-stage-text"
                >
                  {preset.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="flex items-center gap-1.5 text-xs text-stage-muted">
          <LockIcon className="size-3.5 text-booth" />
          <span className="hidden sm:inline">Processed on your device</span>
          <span className="sm:hidden">On-device</span>
        </p>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-stage-text">
      <div className="mx-auto grid w-full max-w-[88rem] gap-10 px-4 pt-12 pb-14 text-sm sm:grid-cols-2 sm:gap-x-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
        <div className="flex flex-col gap-3">
          <Wordmark />
          <p className="max-w-[44ch] text-pretty text-stage-muted">
            Photos for forms, sized in your browser. No uploads, no accounts, no watermark.
          </p>
          <p className="text-stage-muted">
            Built by{" "}
            <a
              href="https://www.devanshuverma.in/"
              className="text-stage-text underline decoration-stage-line underline-offset-4 transition-colors duration-200 hover:decoration-booth"
            >
              Devanshu Verma
            </a>
          </p>
          <p className="text-stage-muted">
            Missing a size or feature?{" "}
            <a
              href={FEEDBACK_URL}
              rel="noopener"
              className="text-stage-text underline decoration-stage-line underline-offset-4 transition-colors duration-200 hover:decoration-booth"
            >
              Send a suggestion
            </a>
          </p>
        </div>
        <nav aria-labelledby="footer-sizes">
          <h2 id="footer-sizes" className="signage text-lg text-stage-text">
            Photo sizes
          </h2>
          <FooterPresetList presets={ID_PRESETS} detail={(preset) => preset.spec} />
        </nav>
        <nav aria-labelledby="footer-exams">
          <h2 id="footer-exams" className="signage text-lg text-stage-text">
            Exam forms
          </h2>
          <FooterPresetList presets={EXAM_PRESETS} detail={presetSizeRange} />
        </nav>
        <nav aria-labelledby="footer-limits">
          <h2 id="footer-limits" className="signage text-lg text-stage-text">
            File size
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            {LIMIT_PAGES.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/${page.slug}`}
                  className="text-stage-muted underline-offset-4 transition-colors duration-200 hover:text-stage-text hover:underline"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
