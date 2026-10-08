import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { SUBPAGES, getPage, pagePath } from "@/lib/pages";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Only pages in lib/pages exist; any other path, drafts included, 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return SUBPAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPage((await params).slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: pagePath(page),
  });
}

export default async function Page({ params }: Props) {
  const page = getPage((await params).slug);
  if (!page) notFound();
  return <LandingPage page={page} />;
}
