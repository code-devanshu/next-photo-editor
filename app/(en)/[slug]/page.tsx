import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { SUBPAGES, getPage } from "@/lib/pages";
import { buildMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ slug: string }> };

// Only pages in lib/pages exist; any other path, drafts included, 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return SUBPAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPage((await params).slug);
  return page ? buildMetadata(page, "en") : {};
}

export default async function Page({ params }: Props) {
  const page = getPage((await params).slug);
  if (!page) notFound();
  return <LandingPage page={page} lang="en" />;
}
