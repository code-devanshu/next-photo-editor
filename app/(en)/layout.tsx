import { RootShell, rootMetadata, rootViewport } from "@/components/root-shell";

// English pages. Hindi pages have their own root layout in app/(hi), so each gets the right html lang.
export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="en">{children}</RootShell>;
}
