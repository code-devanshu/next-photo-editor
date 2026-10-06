import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PhotoEditor from "@/components/photo-editor";
import {
  FaqList,
  GuideContent,
  HowToSteps,
  OtherSizes,
  Requirements,
  SizeAnswer,
  Sources,
} from "@/components/guide-sections";
import { GUIDES, getGuide } from "@/lib/guides";
import { getPreset } from "@/lib/presets";
import { pageSchema } from "@/lib/schema";
import { jsonLd, pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Only the guide pages exist; any other path 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const preset = getPreset(slug);
  if (!guide || !preset) notFound();

  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-6 pb-16 sm:px-6"
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
            breadcrumbName: `${preset.name} photo`,
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
        />
        <HowToSteps title={`How to make a ${guide.subject}`} preset={preset} />
        <FaqList faqs={guide.faqs} />
        <Sources sources={guide.sources} updated={guide.updated} />
        <OtherSizes currentSlug={preset.slug} />
      </GuideContent>
    </main>
  );
}
