import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter, SiteHeader, SkipLink } from "@/components/site-chrome";
import { siteSchema } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, jsonLd } from "@/lib/site";
import type { Lang } from "@/lib/ui-text";
import "@/app/globals.css";

// One variable family: the width axis gives the condensed booth signage, normal width the UI.
// Self-hosted and trimmed to what the site uses, so the preloaded file is 55 KB instead of 90 KB:
// Archivo v2.001 (SIL OFL, assets/fonts/Archivo-OFL.txt) from google/fonts, instanced with
//   fonttools varLib.instancer Archivo[wdth,wght].ttf wght=400:800 wdth=75:100
// then subset to Google's latin range plus ₹ → ↑ ↓ ≤ ≥ with pyftsubset --no-hinting
//   --layout-features=kern,liga,calt,tnum,lnum,case,rvrn,ccmp,locl,mark,mkmk --flavor=woff2.
// It has no Devanagari, so Hindi text falls back to the system's Devanagari font.
const archivo = localFont({
  src: "../assets/fonts/Archivo-latin-wght400-800-wdth75-100.woff2",
  variable: "--font-archivo",
  weight: "400 800",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});

// Set these in the Vercel project's environment variables to verify the site
// in Google Search Console and Bing Webmaster Tools.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

/** Metadata shared by both root layouts. Pages set their own title, description and alternates. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    ...(googleVerification && { google: googleVerification }),
    ...(bingVerification && { other: { "msvalidate.01": bingVerification } }),
  },
};

export const rootViewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "light",
};

/** The document around every page: `lang` sets the html attribute and the chrome's language. */
export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteSchema)} />
        <SkipLink lang={lang} />
        <SiteHeader lang={lang} />
        {children}
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
