import type { Metadata } from "next";
import PhotoEditor from "@/components/photo-editor";
import {
  FaqList,
  Feedback,
  GuideContent,
  HowToSteps,
  PrivacyNote,
  SizesTable,
} from "@/components/guide-sections";
import { FEATURED_PRESETS, HOME_PAGE as page } from "@/lib/pages";
import { pageSchema } from "@/lib/schema";
import { SITE_NAME, jsonLd, pageMetadata } from "@/lib/site";

// The root layout's title template only applies to child segments, so the home title is written out in full.
export const metadata: Metadata = pageMetadata({
  title: `${page.title} — ${SITE_NAME}`,
  description: page.metaDescription,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-4 pb-20 sm:px-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          pageSchema({
            path: "/",
            name: page.title,
            description: page.metaDescription,
            dateModified: page.updated,
            faqs: page.faqs,
          })
        )}
      />
      <PhotoEditor
        title={page.h1}
        titleAccent={page.h1Accent}
        intro={page.intro}
        presets={FEATURED_PRESETS}
      />
      <GuideContent>
        <SizesTable />
        <HowToSteps title={page.steps?.title ?? ""} />
        <PrivacyNote />
        <FaqList faqs={page.faqs} />
        <Feedback />
      </GuideContent>
    </main>
  );
}
