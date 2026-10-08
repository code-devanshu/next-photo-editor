import type { Metadata } from "next";
import { NotFoundPage } from "@/components/not-found-page";
import { RootShell, rootMetadata, rootViewport } from "@/components/root-shell";

// With a root layout per language there's no single layout to wrap a 404, so this one renders the
// whole document. It covers every unmatched URL, including slugs outside lib/pages and draft pages.
export const metadata: Metadata = {
  ...rootMetadata,
  title: "Page not found",
  robots: { index: false, follow: true },
};
export const viewport = rootViewport;

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFoundPage />
    </RootShell>
  );
}
