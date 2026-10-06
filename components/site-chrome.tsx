import Link from "next/link";
import { CropMark } from "@/lib/brand-mark";
import { LockIcon } from "@/lib/icons";
import { FORM_PRESETS } from "@/lib/presets";
import { SITE_NAME } from "@/lib/site";

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
    >
      Skip to content
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="-m-1 flex items-center gap-2.5 rounded-lg p-1">
          <CropMark size={26} radius={7} />
          <span className="text-[15px] font-semibold tracking-tight">{SITE_NAME}</span>
        </Link>
        <p className="hidden items-center gap-1.5 text-xs text-muted sm:flex">
          <LockIcon className="size-3.5" />
          Processed on your device
        </p>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 pt-8 pb-10 text-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:px-6">
        <div className="flex flex-col gap-1.5">
          <span className="font-semibold tracking-tight">{SITE_NAME}</span>
          <span className="max-w-[44ch] text-pretty text-muted">
            Photos for forms, sized in your browser. No uploads, no accounts.
          </span>
          <span className="text-muted">
            Built by{" "}
            <a
              href="https://www.devanshuverma.in/"
              className="underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
            >
              Devanshu Verma
            </a>
          </span>
        </div>
        <nav aria-label="Photo sizes">
          <ul className="flex flex-col gap-1.5">
            {FORM_PRESETS.map((preset) => (
              <li key={preset.slug}>
                <Link
                  href={`/${preset.slug}`}
                  className="text-muted underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
                >
                  {preset.name} photo{" "}
                  <span className="font-mono text-xs text-faint">{preset.spec}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
