import PdfMaker from "@/components/pdf-maker";
import PhotoEditor from "@/components/photo-editor";
import {
  Breadcrumbs,
  LanguageSwitch,
  FaqList,
  Feedback,
  GuideContent,
  HowToSteps,
  Rejections,
  RelatedPages,
  Requirements,
  SizeAnswer,
  Sources,
  SpecTable,
} from "@/components/guide-sections";
import {
  FEATURED_PRESETS,
  breadcrumbs,
  hubMembers,
  localize,
  pagePath,
  pagePreset,
  pageUrl,
  relatedPages,
  type PageEntry,
} from "@/lib/pages";
import type { FormPreset } from "@/lib/presets";
import { pageSchema } from "@/lib/schema";
import { jsonLd } from "@/lib/site";
import { LANG_TAG, type Lang } from "@/lib/ui-text";

// A hub's editor offers the hub's own sizes, up to this many, instead of the featured ones.
const HUB_PICKER_SIZE = 8;

/** A size, form, file size or hub page: the editor with the page's settings, then the guide below it. */
export function LandingPage({ page: entry, lang = "en" }: { page: PageEntry; lang?: Lang }) {
  const page = localize(entry, lang);
  const preset = pagePreset(page);
  const crumbs = breadcrumbs(entry, lang);
  const other: Lang = lang === "en" ? "hi" : "en";
  const members = page.category === "hub" ? hubMembers(page) : [];
  const memberPresets = members.map(pagePreset).filter((member): member is FormPreset => !!member);
  const pickerPresets = memberPresets.length > 0 ? memberPresets.slice(0, HUB_PICKER_SIZE) : FEATURED_PRESETS;

  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-4 pb-20 sm:px-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          pageSchema({
            url: pageUrl(page, lang),
            name: page.title,
            description: page.metaDescription,
            dateModified: page.updated,
            faqs: page.faqs,
            breadcrumbs: crumbs.map(({ name, url }) => ({ name, url })),
            sources: page.sources,
            inLanguage: LANG_TAG[lang],
          })
        )}
      />
      <div className="flex items-end gap-4">
        <Breadcrumbs crumbs={crumbs} lang={lang} />
        {entry.hi && <LanguageSwitch href={pagePath(entry, other)} lang={lang} />}
      </div>
      {page.tool === "pdf" ? (
        <PdfMaker title={page.h1} titleAccent={page.h1Accent} intro={page.intro} maxKb={page.limit?.maxKb} />
      ) : (
        <PhotoEditor
          title={page.h1}
          titleAccent={page.h1Accent}
          intro={page.intro}
          preset={preset}
          presets={pickerPresets}
          maxKb={page.limit?.maxKb}
          minKb={page.limit?.minKb}
          kind={page.limit?.kind}
          stamp={page.stamp}
          lang={lang}
        />
      )}
      <GuideContent>
        {page.question && page.answer && (
          <SizeAnswer question={page.question} answer={page.answer} facts={page.facts ?? []} />
        )}
        {members.length > 0 && (
          <RelatedPages
            pages={members}
            title={page.listTitle ?? page.name}
            id="all-pages"
            custom={false}
            lang={lang}
          />
        )}
        {page.spec && (
          <SpecTable
            title={page.spec.title}
            rows={page.spec.rows}
            sources={page.sources}
            verified={page.lastVerified}
            lang={lang}
          />
        )}
        {page.requirements && (
          <Requirements
            title={page.requirements.title}
            items={page.requirements.items}
            note={page.requirements.note}
            lang={lang}
          />
        )}
        {page.steps && (
          <HowToSteps
            title={page.steps.title}
            items={page.steps.items}
            preset={preset}
            maxKb={page.limit?.maxKb}
          />
        )}
        {page.rejections && <Rejections title={page.rejections.title} items={page.rejections.items} />}
        <FaqList faqs={page.faqs} lang={lang} />
        {page.sources.length > 0 && (
          <Sources sources={page.sources} updated={page.lastVerified ?? page.updated} lang={lang} />
        )}
        {members.length === 0 && <RelatedPages pages={relatedPages(entry, lang)} lang={lang} />}
        <Feedback lang={lang} />
      </GuideContent>
    </main>
  );
}
