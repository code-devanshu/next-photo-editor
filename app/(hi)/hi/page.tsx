import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { HOME_PAGE } from "@/lib/pages";
import { buildMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildMetadata(HOME_PAGE, "hi");

export default function HindiHome() {
  return <HomePage lang="hi" />;
}
