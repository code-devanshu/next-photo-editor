import Link from "next/link";
import { BrandMark } from "@/lib/brand-mark";
import { LockIcon } from "@/lib/icons";
import { HINDI_PAGES, PAGES, hubMembers, localize, pagePath, type PageEntry } from "@/lib/pages";
import { FEEDBACK_URL, SITE_NAME } from "@/lib/site";
import { UI_TEXT, type Lang } from "@/lib/ui-text";

export function SkipLink({ lang = "en" }: { lang?: Lang }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-booth focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
    >
      {UI_TEXT[lang].skip}
    </a>
  );
}

function Wordmark({ lang = "en" }: { lang?: Lang }) {
  return (
    <Link href={lang === "hi" ? "/hi" : "/"} className="-m-1 flex items-center gap-2.5 rounded-lg p-1">
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
// The Hindi header links the first few Hindi pages, since most hubs are English only.
const HINDI_NAV = HINDI_PAGES.filter((page) => page.slug).slice(0, 4);
const HINDI_SUBPAGES = HINDI_PAGES.filter((page) => page.slug);

/** KB pages in reading order: single limits smallest first, then ranges and the minimum page. */
function footerOrder(pages: PageEntry[]) {
  return pages.toSorted(
    (a, b) =>
      Number(!!a.limit?.minKb) - Number(!!b.limit?.minKb) || (a.limit?.maxKb ?? 0) - (b.limit?.maxKb ?? 0)
  );
}

const linkClass =
  "text-stage-muted underline-offset-4 transition-colors duration-200 hover:text-stage-text hover:underline";

export function SiteHeader({ lang = "en" }: { lang?: Lang }) {
  const t = UI_TEXT[lang];
  const links =
    lang === "hi"
      ? HINDI_NAV.map((page) => ({ href: pagePath(page, "hi"), label: localize(page, "hi").navName ?? localize(page, "hi").name }))
      : HUBS.map((hub) => ({ href: pagePath(hub), label: hub.navName ?? hub.name }));
  return (
    <header className="on-dark bg-ink text-stage-text">
      <div className="mx-auto flex h-15 w-full max-w-[88rem] items-center justify-between gap-6 px-4 sm:px-6">
        <Wordmark lang={lang} />
        <nav aria-label={t.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-md px-3 py-2 text-sm text-stage-muted transition-colors duration-200 hover:bg-stage-raised hover:text-stage-text"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="flex items-center gap-1.5 text-xs text-stage-muted">
          <LockIcon className="size-3.5 text-booth" />
          <span className="hidden sm:inline">{t.onDevice}</span>
          <span className="sm:hidden">{t.onDeviceShort}</span>
        </p>
      </div>
    </header>
  );
}

function FooterColumn({
  title,
  href,
  pages,
  lang = "en",
}: {
  title: string;
  href?: string;
  pages: PageEntry[];
  lang?: Lang;
}) {
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
            <Link href={pagePath(page, lang)} className={linkClass}>
              {localize(page, lang).name}
            </Link>
          </li>
        ))}
        {href && pages.length > shown.length && (
          <li>
            <Link href={href} className="font-semibold text-booth underline-offset-4 hover:underline">
              {UI_TEXT[lang].allCount(pages.length)}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export function SiteFooter({ lang = "en" }: { lang?: Lang }) {
  const t = UI_TEXT[lang];
  return (
    <footer className="on-dark bg-ink text-stage-text">
      <div className="mx-auto grid w-full max-w-[88rem] gap-10 px-4 pt-12 pb-14 text-sm sm:grid-cols-2 sm:gap-x-12 sm:px-6 lg:grid-cols-3 xl:grid-cols-[minmax(0,1.2fr)_repeat(5,minmax(0,1fr))]">
        <div className="flex flex-col gap-3">
          <Wordmark lang={lang} />
          <p className="max-w-[44ch] text-pretty text-stage-muted">{t.footerBlurb}</p>
          <p className="text-stage-muted">
            {t.builtBy}{" "}
            <a
              href="https://www.devanshuverma.in/"
              className="text-stage-text underline decoration-stage-line underline-offset-4 transition-colors duration-200 hover:decoration-booth"
            >
              Devanshu Verma
            </a>
          </p>
          <p className="text-stage-muted">
            {t.missing}{" "}
            <a
              href={FEEDBACK_URL}
              rel="noopener"
              className="text-stage-text underline decoration-stage-line underline-offset-4 transition-colors duration-200 hover:decoration-booth"
            >
              {t.feedbackButton}
            </a>
          </p>
        </div>
        {lang === "hi" && <FooterColumn title="हिंदी में" pages={HINDI_SUBPAGES} lang="hi" />}
        {HUBS.map((hub) => (
          <FooterColumn
            key={hub.slug}
            title={hub.navName ?? hub.name}
            href={pagePath(hub)}
            pages={hub.hub?.includes("kb") ? footerOrder(hubMembers(hub)) : hubMembers(hub)}
          />
        ))}
        {lang === "en" && OTHER_TOOLS.length > 0 && <FooterColumn title={t.moreTools} pages={OTHER_TOOLS} />}
      </div>
    </footer>
  );
}
