import PhotoEditor from "@/components/photo-editor";
import {
  FaqList,
  Feedback,
  GuideContent,
  HowToSteps,
  HubLinks,
  LanguageSwitch,
  PrivacyNote,
  SizesTable,
} from "@/components/guide-sections";
import { FEATURED_PRESETS, HOME_PAGE, PAGES, hubMembers, localize, pagePath, pageUrl } from "@/lib/pages";
import { pageSchema } from "@/lib/schema";
import { jsonLd } from "@/lib/site";
import { LANG_TAG, type Lang } from "@/lib/ui-text";

const HUBS = PAGES.filter((page) => page.category === "hub");

/** The home page in either language: the editor with every featured size, then the overview. */
export function HomePage({ lang = "en" }: { lang?: Lang }) {
  const page = localize(HOME_PAGE, lang);
  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-4 pb-20 sm:px-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          pageSchema({
            url: pageUrl(HOME_PAGE, lang),
            name: page.title,
            description: page.metaDescription,
            dateModified: page.updated,
            faqs: page.faqs,
            inLanguage: LANG_TAG[lang],
          })
        )}
      />
      {HOME_PAGE.hi && (
        <div className="flex pt-3">
          <LanguageSwitch href={pagePath(HOME_PAGE, lang === "en" ? "hi" : "en")} lang={lang} />
        </div>
      )}
      <PhotoEditor
        title={page.h1}
        titleAccent={page.h1Accent}
        intro={page.intro}
        presets={FEATURED_PRESETS}
        lang={lang}
      />
      <GuideContent>
        <HubLinks hubs={HUBS.map((hub) => ({ page: hub, count: hubMembers(hub).length }))} lang={lang} />
        <SizesTable lang={lang} />
        <HowToSteps title={page.steps?.title ?? ""} items={page.steps?.items} />
        <PrivacyNote lang={lang} />
        <FaqList faqs={page.faqs} lang={lang} />
        <Feedback lang={lang} />
      </GuideContent>
    </main>
  );
}
