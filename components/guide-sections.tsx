import Link from "next/link";
import { LIMIT_GUIDES, type Fact, type Faq, type Source } from "@/lib/guides";
import { PresetOutline } from "@/components/preset-outline";
import { ArrowIcon, LockIcon, PlusIcon } from "@/lib/icons";
import {
  FORM_PRESETS,
  presetResolution,
  presetSizeRange,
  presetTitle,
  type FormPreset,
} from "@/lib/presets";
import { FEEDBACK_URL } from "@/lib/site";

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
    <section
      aria-labelledby={id}
      className="grid gap-x-16 gap-y-6 border-t-2 border-ink pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
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

export function SizesTable() {
  return (
    <Section id="sizes" title="Photo sizes for common forms">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[15px]">
          <thead className="text-sm text-muted">
            <tr className="border-b border-rule-strong">
              <th scope="col" className="py-2.5 pr-4 font-normal">
                Document
              </th>
              <th scope="col" className="py-2.5 pr-4 font-normal">
                Print size
              </th>
              <th scope="col" className="py-2.5 pr-4 font-normal">
                Pixels
              </th>
              <th scope="col" className="hidden py-2.5 font-normal sm:table-cell">
                Resolution
              </th>
            </tr>
          </thead>
          <tbody>
            {FORM_PRESETS.map((preset) => (
              <tr key={preset.slug} className="border-b border-rule">
                <th scope="row" className="py-4 pr-4 font-semibold">
                  <Link
                    href={`/${preset.slug}`}
                    className="group flex items-end gap-3.5 underline decoration-rule-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink"
                  >
                    <span className="hidden h-14 w-14 shrink-0 items-end justify-center sm:flex">
                      <PresetOutline preset={preset} scale={1.05} />
                    </span>
                    <span className="pb-0.5">{preset.name}</span>
                  </Link>
                </th>
                <td className="py-4 pr-4 align-bottom tabular-nums">{preset.spec}</td>
                <td className="py-4 pr-4 align-bottom font-semibold tabular-nums">
                  {preset.width} × {preset.height} px
                </td>
                <td className="hidden py-4 align-bottom text-muted tabular-nums sm:table-cell">
                  {presetResolution(preset)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-pretty text-muted">
        Outlines are drawn to scale. Need a different size? Type any width and height in pixels, and lock the aspect ratio
        to keep the shape.
      </p>
    </Section>
  );
}

const REQUIREMENTS_NOTE =
  "FormPic crops and resizes but doesn't change the background, so start with a photo taken against a plain light wall. Rules change from time to time, so check the official instructions for your application before you submit.";

export function Requirements({
  title,
  items,
  note = REQUIREMENTS_NOTE,
}: {
  title: string;
  items: string[];
  note?: string;
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
      <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-pretty text-muted">{note}</p>
    </Section>
  );
}

export function HowToSteps({
  title,
  preset,
  maxKb,
}: {
  title: string;
  preset?: FormPreset;
  /** The limit a per-limit page starts with. */
  maxKb?: number;
}) {
  const signature = preset?.kind === "signature";
  const sizeRange = preset && presetSizeRange(preset);
  const steps = [
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

export function PrivacyNote() {
  return (
    <section
      aria-labelledby="privacy"
      className="on-dark grid gap-x-16 gap-y-6 rounded-[22px] bg-stage p-6 text-stage-text sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
    >
      <h2 id="privacy" className="signage flex flex-col gap-4 text-[2rem] text-balance sm:text-[2.5rem]">
        <LockIcon className="size-8 text-booth" />
        Your photo never leaves your device
      </h2>
      <div className="flex max-w-[62ch] flex-col gap-4 text-lg leading-relaxed text-pretty">
        <p>
          FormPic runs entirely in your browser. Your photo is read, cropped and resized with the
          browser&apos;s canvas, and the result is saved straight to your device. There&apos;s no
          upload, no account, and no copy kept anywhere.
        </p>
        <p className="text-stage-muted">
          Once the page has loaded, the editor keeps working even if you go offline.
        </p>
      </div>
    </section>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Section id="faq" title="Frequently asked questions">
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

/** "2026-10-07" → "7 October 2026", read as UTC so the date doesn't shift by time zone. */
function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function Sources({ sources, updated }: { sources: Source[]; updated: string }) {
  return (
    <Section id="sources" title="Where these numbers come from">
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
        Last checked against these sources on <time dateTime={updated}>{formatDate(updated)}</time>.
      </p>
    </Section>
  );
}

export function Feedback() {
  return (
    <Section id="feedback" title="Need a size that isn't here?">
      <div className="flex items-end gap-8">
        <div className="flex max-w-[62ch] flex-col gap-4">
          <p className="text-lg leading-relaxed text-pretty">
            FormPic is made by one developer, Devanshu Verma. If your form asks for a photo size
            FormPic doesn&apos;t have yet, something didn&apos;t work, or you have an idea for a feature,
            send a message through the contact form on his portfolio. Size requests decide which
            presets come next.
          </p>
          <p className="text-[15px] leading-relaxed text-pretty text-muted">
            For a new size, it helps to mention the form or country, the size it asks for (in mm or
            pixels), and any file size limit.
          </p>
          <div className="mt-2 flex flex-col items-start gap-3">
            <a
              href={FEEDBACK_URL}
              rel="noopener"
              className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-[15px] font-bold text-booth shadow-key transition duration-200 hover:bg-ink-soft active:scale-[0.98]"
            >
              Send a suggestion
              <ArrowIcon className="size-4.5 transition duration-200 group-hover:translate-x-0.5" />
            </a>
            <span className="text-sm text-muted">
              Opens devanshuverma.in. Nothing from the editor is sent with your message.
            </span>
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

export function OtherSizes({ currentSlug }: { currentSlug: string }) {
  const links = [
    ...FORM_PRESETS.filter((preset) => preset.slug !== currentSlug).map((preset) => ({
      href: `/${preset.slug}`,
      name: presetTitle(preset),
      detail: `${preset.spec} · ${preset.width}×${preset.height} px`,
      preset,
    })),
    ...LIMIT_GUIDES.filter((guide) => guide.slug !== currentSlug).map((guide) => ({
      href: `/${guide.slug}`,
      name: `Resize to ${guide.kb} KB`,
      detail: `JPEG under ${guide.kb} KB, any size`,
      kb: guide.kb,
    })),
    { href: "/", name: "Custom size", detail: "Any width × height in pixels" },
  ];

  return (
    <Section id="other-sizes" title="Other photo sizes">
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
