import { RootShell, rootMetadata, rootViewport } from "@/components/root-shell";

// Hindi pages under /hi. A separate root layout so the html element says lang="hi".
export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function HindiLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="hi">{children}</RootShell>;
}
