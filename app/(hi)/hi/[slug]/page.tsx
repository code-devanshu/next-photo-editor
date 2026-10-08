import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { HINDI_PAGES, getPage } from "@/lib/pages";
import { buildMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ slug: string }> };

// Only pages with a Hindi version exist under /hi.
export const dynamicParams = false;

export function generateStaticParams() {
  return HINDI_PAGES.filter((page) => page.slug).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPage((await params).slug);
  return page?.hi ? buildMetadata(page, "hi") : {};
}

export default async function HindiPage({ params }: Props) {
  const page = getPage((await params).slug);
  if (!page?.hi) notFound();
  return <LandingPage page={page} lang="hi" />;
}
