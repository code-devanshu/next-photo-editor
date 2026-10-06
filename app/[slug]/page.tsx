import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PhotoEditor from "@/components/photo-editor";
import {
  FaqList,
  Feedback,
  GuideContent,
  HowToSteps,
  OtherSizes,
  Requirements,
  SizeAnswer,
  Sources,
} from "@/components/guide-sections";
import { GUIDES, LIMIT_GUIDES, getGuide, getLimitGuide, type LimitGuide } from "@/lib/guides";
import { getPreset, presetTitle } from "@/lib/presets";
import { pageSchema } from "@/lib/schema";
import { jsonLd, pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Only the size and file size limit guides exist; any other path 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...GUIDES, ...LIMIT_GUIDES].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug) ?? getLimitGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const limitGuide = getLimitGuide(slug);
  if (limitGuide) return <LimitGuidePage guide={limitGuide} />;

  const guide = getGuide(slug);
  const preset = getPreset(slug);
  if (!guide || !preset) notFound();

  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-4 pb-20 sm:px-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          pageSchema({
            path: `/${guide.slug}`,
            name: guide.metaTitle,
            description: guide.metaDescription,
            dateModified: guide.updated,
            faqs: guide.faqs,
            breadcrumbName: presetTitle(preset),
            sources: guide.sources,
          })
        )}
      />
      <PhotoEditor
        title={guide.heading}
        titleAccent={guide.headingAccent}
        intro={guide.intro}
        presetSlug={preset.slug}
      />
      <GuideContent>
        <SizeAnswer question={guide.question} answer={guide.answer} facts={guide.facts} />
        <Requirements
          title={`${guide.subject[0].toUpperCase()}${guide.subject.slice(1)} requirements`}
          items={guide.requirements}
          note={preset.kind === "signature" ? SIGNATURE_NOTE : undefined}
        />
        <HowToSteps title={`How to make a ${guide.subject}`} preset={preset} />
        <FaqList faqs={guide.faqs} />
        <Sources sources={guide.sources} updated={guide.updated} />
        <OtherSizes currentSlug={preset.slug} />
        <Feedback />
      </GuideContent>
    </main>
  );
}

const SIGNATURE_NOTE =
  "FormPic crops and resizes but doesn't clean up the image, so sign on plain white paper and photograph it in even light. Rules change from time to time, so check the official notice for your exam before you submit.";

const LIMIT_TIPS_NOTE =
  "If a form gives both a pixel size and a file size, set the pixels first. FormPic then fits the file size without changing them.";

function LimitGuidePage({ guide }: { guide: LimitGuide }) {
  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-4 pb-20 sm:px-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          pageSchema({
            path: `/${guide.slug}`,
            name: guide.metaTitle,
            description: guide.metaDescription,
            dateModified: guide.updated,
            faqs: guide.faqs,
            breadcrumbName: `Resize image to ${guide.kb} KB`,
          })
        )}
      />
      <PhotoEditor
        title={guide.heading}
        titleAccent={guide.headingAccent}
        intro={guide.intro}
        maxKb={guide.kb}
      />
      <GuideContent>
        <SizeAnswer question={guide.question} answer={guide.answer} facts={guide.facts} />
        <Requirements
          title={`Getting a sharp photo under ${guide.kb} KB`}
          items={guide.tips}
          note={LIMIT_TIPS_NOTE}
        />
        <HowToSteps title={`How to resize an image to ${guide.kb} KB`} maxKb={guide.kb} />
        <FaqList faqs={guide.faqs} />
        <OtherSizes currentSlug={guide.slug} />
        <Feedback />
      </GuideContent>
    </main>
  );
}
