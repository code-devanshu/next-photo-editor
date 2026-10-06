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
import { HOME_FAQS, HOME_UPDATED } from "@/lib/guides";
import { pageSchema } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_NAME, jsonLd, pageMetadata } from "@/lib/site";

const HOME_TITLE = "Resize photos for passport, visa & PAN card forms";

// The root layout's title template only applies to child segments, so the home title is written out in full.
export const metadata: Metadata = pageMetadata({
  title: `${HOME_TITLE} — ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
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
            name: HOME_TITLE,
            description: SITE_DESCRIPTION,
            dateModified: HOME_UPDATED,
            faqs: HOME_FAQS,
          })
        )}
      />
      <PhotoEditor
        title="Crop & resize photos for forms"
        titleAccent=", in seconds."
        intro="Get the exact size for passport, visa, PAN card and exam forms. Your photo is processed entirely on your device, never uploaded or stored, and keeps full quality from start to finish."
      />
      <GuideContent>
        <SizesTable />
        <HowToSteps title="How to resize a photo for a form" />
        <PrivacyNote />
        <FaqList faqs={HOME_FAQS} />
        <Feedback />
      </GuideContent>
    </main>
  );
}
