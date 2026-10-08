import Link from "next/link";
import { PresetOutline } from "@/components/preset-outline";
import { ArrowIcon, LockIcon, PlusIcon } from "@/lib/icons";
import {
  FEATURED_PRESETS,
  getPage,
  localize,
  pagePath,
  pagePreset,
  type Fact,
  type Faq,
  type PageEntry,
  type Source,
  type SpecRow,
  type Step,
} from "@/lib/pages";
import { presetResolution, presetSizeRange, type FormPreset } from "@/lib/presets";
import { FEEDBACK_URL } from "@/lib/site";
import { UI_TEXT, type Lang } from "@/lib/ui-text";

// Server-rendered content below the editor. Headings are phrased as the questions
// people search, with the direct answer first, so search and answer engines can quote them.

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    // Everything here sits below the editor, so the browser skips rendering it until it's scrolled near.
    <section
      aria-labelledby={id}
      className="grid gap-x-16 gap-y-6 border-t-2 border-ink pt-8 [contain-intrinsic-size:auto_32rem] [content-visibility:auto] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
    >
      <h2
        id={id}
        className="signage text-[2rem] text-balance sm:text-[2.5rem] lg:sticky lg:top-6 lg:self-start"
      >
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function GuideContent({ children }: { children: React.ReactNode }) {
  return <div className="mt-20 flex flex-col gap-20 sm:mt-28">{children}</div>;
}

export function SizeAnswer({
  question,
  answer,
  facts,
}: {
  question: string;
  answer: string;
  facts: Fact[];
}) {
  return (
    <Section id="size" title={question}>
      <p className="max-w-[62ch] text-lg leading-relaxed text-pretty">{answer}</p>
      <dl className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map(({ label, value, note }) => (
          <div key={label} className="flex flex-col gap-1.5 border-t border-rule-strong py-4">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="flex flex-col gap-0.5">
              <span className="figures text-[1.75rem] tabular-nums">{value}</span>
              {note && <span className="text-sm text-muted">{note}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/** A preset's page in the reader's language, falling back to English when it has no translation. */
function sizeLink(slug: string, lang: Lang) {
  const page = getPage(slug);
  return page ? pagePath(page, page.hi ? lang : "en") : `/${slug}`;
}

function sizeName(preset: FormPreset, lang: Lang) {
  const page = getPage(preset.slug);
  return lang === "hi" && page?.hi ? page.hi.name : preset.name;
}

export function SizesTable({ lang = "en" }: { lang?: Lang }) {
  const t = UI_TEXT[lang];
  return (
    <Section id="sizes" title={t.sizesTitle}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[15px]">
          <thead className="text-sm text-muted">
            <tr className="border-b border-rule-strong">
              <th scope="col" className="py-2.5 pr-4 font-normal">
                {t.sizesHead.document}
              </th>
              <th scope="col" className="py-2.5 pr-4 font-normal">
                {t.sizesHead.print}
              </th>
              <th scope="col" className="py-2.5 pr-4 font-normal">
                {t.sizesHead.pixels}
              </th>
              <th scope="col" className="hidden py-2.5 font-normal sm:table-cell">
                {t.sizesHead.resolution}
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURED_PRESETS.map((preset) => (
              <tr key={preset.slug} className="border-b border-rule">
                <th scope="row" className="py-4 pr-4 font-semibold">
                  <Link
                    href={sizeLink(preset.slug, lang)}
                    className="group flex items-end gap-3.5 underline decoration-rule-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink"
                  >
                    <span className="hidden h-14 w-14 shrink-0 items-end justify-center sm:flex">
                      <PresetOutline preset={preset} scale={1.05} />
                    </span>
                    <span className="pb-0.5">{sizeName(preset, lang)}</span>
                  </Link>
                </th>
                <td className="py-4 pr-4 align-bottom tabular-nums">{preset.spec}</td>
                <td className="py-4 pr-4 align-bottom font-semibold tabular-nums">
                  {preset.width} × {preset.height} px
                </td>
                <td className="hidden py-4 align-bottom text-muted tabular-nums sm:table-cell">
                  {preset.dpi ? presetResolution(preset) : t.setInPixels}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-pretty text-muted">{t.sizesNote}</p>
    </Section>
  );
}

export function Requirements({
  title,
  items,
  note,
  lang = "en",
}: {
  title: string;
  items: string[];
  note?: string;
  lang?: Lang;
}) {
  return (
    <Section id="requirements" title={title}>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3.5 border-b border-rule py-3 text-[17px] text-pretty first:pt-0"
          >
            <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 bg-booth ring-1 ring-ink" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-pretty text-muted">
        {note ?? UI_TEXT[lang].requirementsNote}
      </p>
    </Section>
  );
}

/** The editor's own four steps, filled in with the page's preset or limit. */
function defaultSteps(preset?: FormPreset, maxKb?: number): Step[] {
  const signature = preset?.kind === "signature" || preset?.kind === "thumb";
  const sizeRange = preset && presetSizeRange(preset);
  return [
    signature
      ? {
          name: "Add your signature",
          detail:
            "Sign on plain white paper in black ink, then photograph or scan it. JPG, PNG and WEBP up to 20 MB.",
        }
      : {
          name: "Add a photo",
          detail: "Drop a file, browse your files, or use your camera. JPG, PNG and WEBP up to 20 MB.",
        },
    preset
      ? {
          name: "Check the size",
          detail: `The ${preset.name} preset is already on: ${preset.spec}, ${preset.width} × ${preset.height} px, JPEG${
            sizeRange ? `, ${sizeRange}` : ""
          }.`,
        }
      : maxKb
        ? {
            name: "Check the limit",
            detail: `Max file size is already set to ${maxKb} KB. Type the form's pixel size if it gives one.`,
          }
        : {
            name: "Pick a size",
            detail: "Choose a form preset, or type an exact width and height in pixels.",
          },
    signature
      ? {
          name: "Crop the signature",
          detail: "Drag the crop box close around your signature, with a little white space on each side.",
        }
      : {
          name: "Frame your face",
          detail: "Drag and resize the crop box. The rule-of-thirds grid helps you centre your face.",
        },
    {
      name: "Download",
      detail:
        "Set a Max file size and FormPic picks the JPEG quality that fits. The Download button shows the final size.",
    },
  ];
}

export function HowToSteps({
  title,
  items,
  preset,
  maxKb,
}: {
  title: string;
  /** Steps written for the page. Without them, the steps come from the preset or limit. */
  items?: Step[];
  preset?: FormPreset;
  /** The limit a per-limit page starts with. */
  maxKb?: number;
}) {
  const steps = items ?? defaultSteps(preset, maxKb);

  return (
    <Section id="how-to" title={title}>
      <ol className="flex flex-col rounded-[22px] bg-booth px-5 text-ink sm:px-7">
        {steps.map(({ name, detail }, index) => (
          <li
            key={name}
            className="flex gap-4 border-b-2 border-ink/15 py-5 last:border-b-0 sm:gap-5"
          >
            <span
              aria-hidden="true"
              className="figures flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-lg text-booth"
            >
              {index + 1}
            </span>
            <span className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <span className="text-[17px] font-bold sm:w-40 sm:shrink-0 sm:pt-1.5">{name}</span>
              <span className="max-w-[56ch] text-[15px] leading-relaxed text-pretty text-ink/80 sm:pt-1.5">
                {detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function PrivacyNote({ lang = "en" }: { lang?: Lang }) {
  const t = UI_TEXT[lang];
  return (
    <section
      aria-labelledby="privacy"
      className="on-dark grid gap-x-16 gap-y-6 rounded-[22px] bg-stage p-6 text-stage-text sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
    >
      <h2 id="privacy" className="signage flex flex-col gap-4 text-[2rem] text-balance sm:text-[2.5rem]">
        <LockIcon className="size-8 text-booth" />
        {t.privacyTitle}
      </h2>
      <div className="flex max-w-[62ch] flex-col gap-4 text-lg leading-relaxed text-pretty">
        <p>{t.privacyBody}</p>
        <p className="text-stage-muted">{t.privacyOffline}</p>
      </div>
    </section>
  );
}

export function FaqList({ faqs, lang = "en" }: { faqs: Faq[]; lang?: Lang }) {
  return (
    <Section id="faq" title={UI_TEXT[lang].faq}>
      <div className="flex flex-col">
        {faqs.map(({ question, answer }) => (
          <div
            key={question}
            className="flex flex-col gap-2 border-t border-rule py-5 first:border-t-0 first:pt-0"
          >
            <h3 className="text-lg font-bold text-pretty">{question}</h3>
            <p className="max-w-[62ch] text-[17px] leading-relaxed text-pretty text-muted">{answer}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/** "10–20 KB", "under 80 KB", "50 KB or more", or a dash when the source sets no limit. */
function kbRange(row: SpecRow) {
  return presetSizeRange(row) ?? "—";
}

/** The official figures as a table, with the date they were last checked against the first source. */
export function SpecTable({
  title,
  rows,
  sources,
  verified,
  lang = "en",
}: {
  title: string;
  rows: SpecRow[];
  sources: Source[];
  verified?: string;
  lang?: Lang;
}) {
  const [source] = sources;
  const head = UI_TEXT[lang].specHead;
  return (
    <Section id="spec" title={title}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-left text-[15px]">
          <thead className="text-sm text-muted">
            <tr className="border-b border-rule-strong">
              <th scope="col" className="py-2.5 pr-4 font-normal">
                {head.upload}
              </th>
              <th scope="col" className="py-2.5 pr-4 font-normal">
                {head.size}
              </th>
              <th scope="col" className="py-2.5 pr-4 font-normal">
                {head.fileSize}
              </th>
              <th scope="col" className="py-2.5 font-normal">
                {head.format}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.item} className="border-b border-rule align-top">
                <th scope="row" className="py-4 pr-4 font-semibold">
                  {row.item}
                  {(row.background || row.notes) && (
                    <span className="mt-1 block max-w-[28ch] text-sm font-normal text-pretty text-muted">
                      {[row.background, row.notes].filter(Boolean).join(". ")}
                    </span>
                  )}
                </th>
                <td className="py-4 pr-4 tabular-nums">
                  {row.printSize && <span className="block">{row.printSize}</span>}
                  {row.pixels && <span className="block font-semibold">{row.pixels}</span>}
                  {row.dpi && <span className="block text-sm text-muted">{row.dpi} DPI</span>}
                  {!row.printSize && !row.pixels && "—"}
                </td>
                <td className="py-4 pr-4 font-semibold tabular-nums">{kbRange(row)}</td>
                <td className="py-4">{row.format ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {verified && source && (
        <p className="mt-4 text-sm text-pretty text-muted">
          {lang === "hi" ? (
            <>
              <SourceLink source={source} /> ({source.publisher}) के अनुसार,{" "}
              <time dateTime={verified}>{formatDate(verified, lang)}</time> को आख़िरी बार जाँचा गया।
            </>
          ) : (
            <>
              Last verified <time dateTime={verified}>{formatDate(verified)}</time> per{" "}
              <SourceLink source={source} /> ({source.publisher}).
            </>
          )}
        </p>
      )}
    </Section>
  );
}

function SourceLink({ source }: { source: Source }) {
  return (
    <a
      href={source.url}
      rel="noopener"
      className="text-ink underline decoration-rule-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink"
    >
      {source.title}
    </a>
  );
}

export function Rejections({ title, items }: { title: string; items: string[] }) {
  return (
    <Section id="rejections" title={title}>
      <ol className="flex flex-col">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex gap-3.5 border-b border-rule py-3 text-[17px] text-pretty first:pt-0"
          >
            <span aria-hidden="true" className="figures w-6 shrink-0 text-lg text-muted tabular-nums">
              {index + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** "2026-10-07" → "7 October 2026", read as UTC so the date doesn't shift by time zone. */
function formatDate(isoDate: string, lang: Lang = "en") {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString(UI_TEXT[lang].dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function Sources({
  sources,
  updated,
  lang = "en",
}: {
  sources: Source[];
  updated: string;
  lang?: Lang;
}) {
  const [before, , after] = UI_TEXT[lang].checked("");
  return (
    <Section id="sources" title={UI_TEXT[lang].sources}>
      <ul className="flex flex-col gap-3">
        {sources.map(({ publisher, title, url }) => (
          <li key={url} className="flex flex-col gap-0.5">
            <a
              href={url}
              rel="noopener"
              className="w-fit text-[17px] font-semibold underline decoration-rule-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink"
            >
              {title}
            </a>
            <span className="text-sm text-muted">{publisher}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        {before}
        <time dateTime={updated}>{formatDate(updated, lang)}</time>
        {after}
      </p>
    </Section>
  );
}

export function Feedback({ lang = "en" }: { lang?: Lang }) {
  const t = UI_TEXT[lang];
  return (
    <Section id="feedback" title={t.feedbackTitle}>
      <div className="flex items-end gap-8">
        <div className="flex max-w-[62ch] flex-col gap-4">
          <p className="text-lg leading-relaxed text-pretty">{t.feedbackBody}</p>
          <p className="text-[15px] leading-relaxed text-pretty text-muted">{t.feedbackHint}</p>
          <div className="mt-2 flex flex-col items-start gap-3">
            <a
              href={FEEDBACK_URL}
              rel="noopener"
              className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-[15px] font-bold text-booth shadow-key transition duration-200 hover:bg-ink-soft active:scale-[0.98]"
            >
              {t.feedbackButton}
              <ArrowIcon className="size-4.5 transition duration-200 group-hover:translate-x-0.5" />
            </a>
            <span className="text-sm text-muted">{t.feedbackNote}</span>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="mb-1 hidden h-[94px] w-[73px] shrink-0 items-center justify-center rounded-[2px] border-2 border-dashed border-ink/50 text-ink/50 sm:flex"
        >
          <PlusIcon className="size-7" />
        </span>
      </div>
    </Section>
  );
}

/** A related page's link, with its preset outline or KB badge and a one-line spec. */
type RelatedLink = { href: string; name: string; detail: string } & (
  | { preset: FormPreset }
  | { kb: number }
  | object
);

function relatedLink(page: PageEntry, lang: Lang): RelatedLink {
  const t = UI_TEXT[lang];
  const preset = pagePreset(page);
  // Link the page in the reader's language when it has that version, otherwise in English.
  const linkLang = page.hi ? lang : "en";
  const link = { href: pagePath(page, linkLang), name: localize(page, linkLang).name };
  if (preset) {
    const range = presetSizeRange(preset);
    return {
      ...link,
      detail: `${preset.spec} · ${preset.width}×${preset.height} px${range ? ` · ${range}` : ""}`,
      preset,
    };
  }
  const { minKb, maxKb } = page.limit ?? {};
  if (minKb && maxKb) return { ...link, detail: t.between(minKb, maxKb), kb: maxKb };
  if (maxKb) return { ...link, detail: t.under(maxKb), kb: maxKb };
  if (minKb) return { ...link, detail: t.atLeast(minKb), kb: minKb };
  return { ...link, detail: localize(page, linkLang).metaDescription.split(/[.।] /)[0] };
}

/** Linked cards for other pages: the related block on every page, and the full list on hub pages. */
export function RelatedPages({
  pages,
  title,
  id = "related",
  custom = true,
  lang = "en",
}: {
  pages: PageEntry[];
  title?: string;
  id?: string;
  /** End with a link to the home page's custom size editor. */
  custom?: boolean;
  lang?: Lang;
}) {
  const t = UI_TEXT[lang];
  const links: RelatedLink[] = [
    ...pages.map((page) => relatedLink(page, lang)),
    ...(custom ? [{ href: lang === "hi" ? "/hi" : "/", name: t.customSize, detail: t.customDetail }] : []),
  ];

  return (
    <Section id={id} title={title ?? t.related}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map(({ href, name, detail, ...visual }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex items-end gap-4 rounded-2xl border border-rule bg-surface p-4 transition duration-200 hover:border-ink"
            >
              <span className="flex h-14 w-14 shrink-0 items-end justify-center">
                {"preset" in visual ? (
                  <PresetOutline preset={visual.preset} scale={1.05} />
                ) : "kb" in visual ? (
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 flex-col items-center justify-center rounded-[3px] bg-ink text-booth"
                  >
                    <span className="figures text-lg leading-none tabular-nums">{visual.kb}</span>
                    <span className="text-[10px] font-semibold">KB</span>
                  </span>
                ) : (
                  <span aria-hidden="true" className="block h-10 w-12 rounded-[2px] border-[1.5px] border-dashed border-ink/60" />
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-[17px] font-bold">{name}</span>
                <span className="text-sm text-muted tabular-nums">{detail}</span>
              </span>
              <ArrowIcon className="mb-1 size-5 shrink-0 text-muted transition duration-200 group-hover:translate-x-0.5 group-hover:text-ink" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** The visible trail above the editor. The same trail goes into the page's BreadcrumbList data. */
export function Breadcrumbs({
  crumbs,
  lang = "en",
}: {
  crumbs: { name: string; path: string }[];
  lang?: Lang;
}) {
  if (crumbs.length < 2) return null;
  return (
    <nav aria-label={UI_TEXT[lang].breadcrumb} className="pt-4 text-sm text-muted sm:pt-5">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-semibold text-ink">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.path}
                    className="underline decoration-rule-strong underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-ink"
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** The home page's way into the hubs: one card per hub with how many pages it lists. */
export function HubLinks({
  hubs,
  lang = "en",
}: {
  hubs: { page: PageEntry; count: number }[];
  lang?: Lang;
}) {
  const t = UI_TEXT[lang];
  return (
    <Section id="find-your-form" title={t.findYourForm}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {hubs.map(({ page, count }) => (
          <li key={page.slug}>
            <Link
              href={pagePath(page, page.hi ? lang : "en")}
              className="group flex h-full flex-col gap-2 rounded-2xl border border-rule bg-surface p-5 transition duration-200 hover:border-ink"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-lg font-bold">{localize(page, lang).name}</span>
                <ArrowIcon className="size-5 shrink-0 text-muted transition duration-200 group-hover:translate-x-0.5 group-hover:text-ink" />
              </span>
              <span className="text-[15px] text-pretty text-muted">
                {localize(page, lang).metaDescription.split(/(?<=[.।]) /)[0]}
              </span>
              <span className="mt-auto text-sm font-semibold tabular-nums">{t.pageCount(count)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** A link to the same page in the other language, shown only when that version exists. */
export function LanguageSwitch({ href, lang = "en" }: { href: string; lang?: Lang }) {
  const t = UI_TEXT[lang];
  return (
    <Link
      href={href}
      hrefLang={t.switchLanguageLang}
      lang={t.switchLanguageLang}
      className="ml-auto shrink-0 rounded-md px-2 py-1 text-sm font-semibold text-ink underline decoration-rule-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink"
    >
      {t.switchLanguage}
    </Link>
  );
}
