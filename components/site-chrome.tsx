import Link from "next/link";
import { BrandMark } from "@/lib/brand-mark";
import { LockIcon } from "@/lib/icons";
import { PAGES, hubMembers, pagePath, type PageEntry } from "@/lib/pages";
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

const HUBS = PAGES.filter((page) => page.category === "hub");
// Pages no hub lists, like pixel sizes and the PDF maker, get a column of their own.
const OTHER_TOOLS = PAGES.filter((page) => page.slug && page.category !== "hub" && !HUBS.some((hub) => hub.hub?.includes(page.category as never)));
// Each footer column shows this many pages, then a link to the hub for the rest.
const FOOTER_COLUMN_SIZE = 8;

/** KB pages in reading order: single limits smallest first, then ranges and the minimum page. */
function footerOrder(pages: PageEntry[]) {
  return pages.toSorted(
    (a, b) =>
      Number(!!a.limit?.minKb) - Number(!!b.limit?.minKb) || (a.limit?.maxKb ?? 0) - (b.limit?.maxKb ?? 0)
  );
}

const linkClass =
  "text-stage-muted underline-offset-4 transition-colors duration-200 hover:text-stage-text hover:underline";

export function SiteHeader() {
  return (
    <header className="on-dark bg-ink text-stage-text">
      <div className="mx-auto flex h-15 w-full max-w-[88rem] items-center justify-between gap-6 px-4 sm:px-6">
        <Wordmark />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {HUBS.map((hub) => (
              <li key={hub.slug}>
                <Link
                  href={pagePath(hub)}
                  className="rounded-md px-3 py-2 text-sm text-stage-muted transition-colors duration-200 hover:bg-stage-raised hover:text-stage-text"
                >
                  {hub.navName ?? hub.name}
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

function FooterColumn({ title, href, pages }: { title: string; href?: string; pages: PageEntry[] }) {
  const shown = pages.slice(0, FOOTER_COLUMN_SIZE);
  const id = `footer-${(href ?? title).replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className="signage text-lg text-stage-text">
        {href ? (
          <Link href={href} className="underline-offset-4 hover:underline">
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      <ul className="mt-3 flex flex-col gap-2">
        {shown.map((page) => (
          <li key={page.slug}>
            <Link href={pagePath(page)} className={linkClass}>
              {page.name}
            </Link>
          </li>
        ))}
        {href && pages.length > shown.length && (
          <li>
            <Link href={href} className="font-semibold text-booth underline-offset-4 hover:underline">
              All {pages.length} →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-stage-text">
      <div className="mx-auto grid w-full max-w-[88rem] gap-10 px-4 pt-12 pb-14 text-sm sm:grid-cols-2 sm:gap-x-12 sm:px-6 lg:grid-cols-3 xl:grid-cols-[minmax(0,1.2fr)_repeat(5,minmax(0,1fr))]">
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
        {HUBS.map((hub) => (
          <FooterColumn
            key={hub.slug}
            title={hub.navName ?? hub.name}
            href={pagePath(hub)}
            pages={hub.hub?.includes("kb") ? footerOrder(hubMembers(hub)) : hubMembers(hub)}
          />
        ))}
        {OTHER_TOOLS.length > 0 && <FooterColumn title="More tools" pages={OTHER_TOOLS} />}
      </div>
    </footer>
  );
}
