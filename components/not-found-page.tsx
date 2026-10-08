import Link from "next/link";
import { PAGES, pagePath } from "@/lib/pages";

const HUBS = PAGES.filter((page) => page.category === "hub");

/** The 404 page body: where to go instead, starting with the hubs. */
export function NotFoundPage() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col gap-10 px-4 pt-10 pb-20 sm:px-6 sm:pt-16">
      <div className="flex flex-col gap-4 rounded-[22px] bg-booth p-6 text-ink sm:p-10">
        <p className="figures text-[1.75rem] tabular-nums">404</p>
        <h1 className="signage text-[2.25rem] text-balance sm:text-6xl">This page isn&apos;t here</h1>
        <p className="max-w-[52ch] text-[17px] leading-relaxed text-pretty text-ink/80">
          The link may be old or mistyped. Pick what you were resizing a photo for, or start with any size.
        </p>
        <p className="text-[15px] text-ink/80" lang="hi">
          यह पेज नहीं मिला। <Link href="/hi" className="font-semibold underline underline-offset-4">हिंदी होम पर जाएँ</Link>
        </p>
      </div>
      <nav aria-label="Where to go instead">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...HUBS, { slug: "", name: "Any size", metaDescription: "Crop and resize to any width, height and KB limit." }].map(
            (page) => (
              <li key={page.slug || "home"}>
                <Link
                  href={pagePath(page)}
                  className="flex h-full flex-col gap-1.5 rounded-2xl border border-rule bg-surface p-5 transition duration-200 hover:border-ink"
                >
                  <span className="text-lg font-bold">{page.name}</span>
                  <span className="text-[15px] text-pretty text-muted">{page.metaDescription.split(". ")[0]}.</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </main>
  );
}
