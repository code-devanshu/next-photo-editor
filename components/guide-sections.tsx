import Link from "next/link";
import type { Fact, Faq, Source } from "@/lib/guides";
import { FORM_PRESETS, type FormPreset } from "@/lib/presets";

// Server-rendered content below the editor. Headings are phrased as the questions
// people search, with the direct answer first, so search and answer engines can quote them.

function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-x-16 gap-y-6 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
    >
      <div className="flex flex-col gap-2 lg:sticky lg:top-6 lg:self-start">
        <p className="font-mono text-xs text-faint">{kicker}</p>
        <h2 id={id} className="text-2xl leading-tight font-semibold tracking-tight text-balance">
          {title}
        </h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function GuideContent({ children }: { children: React.ReactNode }) {
  return <div className="mt-16 flex flex-col gap-16 sm:mt-24">{children}</div>;
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
    <Section id="size" kicker="Size" title={question}>
      <p className="max-w-[62ch] text-[17px] leading-relaxed text-pretty">{answer}</p>
      <dl className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map(({ label, value, note }) => (
          <div key={label} className="flex flex-col gap-1 border-t border-border py-3.5">
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="flex flex-col">
              <span className="font-mono text-lg tracking-tight tabular-nums">{value}</span>
              {note && <span className="text-xs text-muted">{note}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function SizesTable() {
  return (
    <Section id="sizes" kicker="Sizes" title="Photo sizes for common forms">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] text-left text-sm">
          <thead className="text-xs text-muted">
            <tr className="border-b border-border">
              <th scope="col" className="py-2.5 pr-4 font-normal">
                Document
              </th>
              <th scope="col" className="py-2.5 pr-4 font-normal">
                Print size
              </th>
              <th scope="col" className="py-2.5 pr-4 font-normal">
                Pixels
              </th>
              <th scope="col" className="py-2.5 font-normal">
                Resolution
              </th>
            </tr>
          </thead>
          <tbody>
            {FORM_PRESETS.map((preset) => (
              <tr key={preset.slug} className="border-b border-border">
                <th scope="row" className="py-3.5 pr-4 font-medium">
                  <Link
                    href={`/${preset.slug}`}
                    className="underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:decoration-accent"
                  >
                    {preset.name}
                  </Link>
                </th>
                <td className="py-3.5 pr-4 font-mono tabular-nums">{preset.spec}</td>
                <td className="py-3.5 pr-4 font-mono tabular-nums">
                  {preset.width} × {preset.height} px
                </td>
                <td className="py-3.5 font-mono text-muted tabular-nums">{preset.dpi} DPI</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-pretty text-muted">
        Need a different size? Type any width and height in pixels, and lock the aspect ratio
        to keep the shape.
      </p>
    </Section>
  );
}

export function Requirements({ title, items }: { title: string; items: string[] }) {
  return (
    <Section id="requirements" kicker="Checklist" title={title}>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-pretty">
            <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-accent" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-pretty text-muted">
        FormPic crops and resizes but doesn&apos;t change the background, so start with a photo
        taken against a plain light wall. Rules change from time to time, so check the official
        instructions for your application before you submit.
      </p>
    </Section>
  );
}

export function HowToSteps({ title, preset }: { title: string; preset?: FormPreset }) {
  const steps = [
    {
      name: "Add a photo",
      detail: "Drop a file, browse your files, or use your camera. JPG, PNG and WEBP up to 20 MB.",
    },
    preset
      ? {
          name: "Check the size",
          detail: `The ${preset.name} preset is already on: ${preset.spec}, ${preset.width} × ${preset.height} px, JPEG.`,
        }
      : {
          name: "Pick a size",
          detail: "Choose a form preset, or type an exact width and height in pixels.",
        },
    {
      name: "Frame your face",
      detail: "Drag and resize the crop box. The rule-of-thirds grid helps you centre your face.",
    },
    {
      name: "Download",
      detail:
        "The Download button shows the file size. If it's over the form's limit, lower the JPEG quality.",
    },
  ];

  return (
    <Section id="how-to" kicker="How it works" title={title}>
      <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {steps.map(({ name, detail }, index) => (
          <li key={name} className="flex gap-4">
            <span aria-hidden="true" className="font-mono text-xs leading-6 text-faint tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-medium">{name}</span>
              <span className="text-sm leading-relaxed text-pretty text-muted">{detail}</span>
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function PrivacyNote() {
  return (
    <Section id="privacy" kicker="Privacy" title="Your photo never leaves your device">
      <div className="flex max-w-[62ch] flex-col gap-4 text-[17px] leading-relaxed text-pretty">
        <p>
          FormPic runs entirely in your browser. Your photo is read, cropped and resized with the
          browser&apos;s canvas, and the result is saved straight to your device. There&apos;s no
          upload, no account, and no copy kept anywhere.
        </p>
        <p className="text-muted">
          Once the page has loaded, the editor keeps working even if you go offline.
        </p>
      </div>
    </Section>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Section id="faq" kicker="FAQ" title="Frequently asked questions">
      <div className="flex flex-col">
        {faqs.map(({ question, answer }) => (
          <div
            key={question}
            className="flex flex-col gap-2 border-t border-border py-5 first:border-t-0 first:pt-0"
          >
            <h3 className="font-medium text-pretty">{question}</h3>
            <p className="max-w-[62ch] leading-relaxed text-pretty text-muted">{answer}</p>
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
    <Section id="sources" kicker="Sources" title="Where these numbers come from">
      <ul className="flex flex-col gap-3">
        {sources.map(({ publisher, title, url }) => (
          <li key={url} className="flex flex-col gap-0.5">
            <a
              href={url}
              rel="noopener"
              className="w-fit font-medium underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:decoration-accent"
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

export function OtherSizes({ currentSlug }: { currentSlug: string }) {
  const links = [
    ...FORM_PRESETS.filter((preset) => preset.slug !== currentSlug).map((preset) => ({
      href: `/${preset.slug}`,
      name: `${preset.name} photo`,
      detail: `${preset.spec} · ${preset.width}×${preset.height} px`,
    })),
    { href: "/", name: "Custom size", detail: "Any width × height in pixels" },
  ];

  return (
    <Section id="other-sizes" kicker="More sizes" title="Other photo sizes">
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map(({ href, name, detail }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3.5 transition duration-200 hover:border-border-strong hover:bg-sunken/40"
            >
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-medium">{name}</span>
                <span className="font-mono text-xs text-muted tabular-nums">{detail}</span>
              </span>
              <span
                aria-hidden="true"
                className="text-faint transition duration-200 group-hover:translate-x-0.5 group-hover:text-accent-ink"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
