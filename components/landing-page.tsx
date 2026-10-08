import PhotoEditor from "@/components/photo-editor";
import {
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
import { FEATURED_PRESETS, pagePath, pagePreset, relatedPages, type PageEntry } from "@/lib/pages";
import { pageSchema } from "@/lib/schema";
import { jsonLd } from "@/lib/site";

/** A size, form or file size page: the editor with the page's settings, then the guide below it. */
export function LandingPage({ page }: { page: PageEntry }) {
  const preset = pagePreset(page);
  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-4 pb-20 sm:px-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          pageSchema({
            path: pagePath(page),
            name: page.title,
            description: page.metaDescription,
            dateModified: page.updated,
            faqs: page.faqs,
            breadcrumbName: page.name,
            ...(page.sources.length > 0 && { sources: page.sources }),
          })
        )}
      />
      <PhotoEditor
        title={page.h1}
        titleAccent={page.h1Accent}
        intro={page.intro}
        preset={preset}
        presets={FEATURED_PRESETS}
        maxKb={page.limit?.maxKb}
        minKb={page.limit?.minKb}
        kind={page.limit?.kind}
      />
      <GuideContent>
        {page.question && page.answer && (
          <SizeAnswer question={page.question} answer={page.answer} facts={page.facts ?? []} />
        )}
        {page.spec && (
          <SpecTable
            title={page.spec.title}
            rows={page.spec.rows}
            sources={page.sources}
            verified={page.lastVerified}
          />
        )}
        {page.requirements && (
          <Requirements
            title={page.requirements.title}
            items={page.requirements.items}
            note={page.requirements.note}
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
        <FaqList faqs={page.faqs} />
        {page.sources.length > 0 && (
          <Sources sources={page.sources} updated={page.lastVerified ?? page.updated} />
        )}
        <RelatedPages pages={relatedPages(page)} />
        <Feedback />
      </GuideContent>
    </main>
  );
}
