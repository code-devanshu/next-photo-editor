// Crawls a running production build and checks every published page's SEO basics.
// Usage: npm run build && npm run start, then: npm run check:seo [http://localhost:3000]
// Exits with code 1 when any check fails.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const SITE_URL = readFileSync("lib/site.ts", "utf8").match(/SITE_URL = "([^"]+)"/)[1];
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

const failures = [];
const warnings = [];
const fail = (url, message) => failures.push(`${url}: ${message}`);

const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");
const local = (url) => url.replace(SITE_URL, BASE);
const site = (path) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

/** Draft slugs, read straight from the config so the check doesn't depend on the build. */
function draftSlugs() {
  const slugs = [];
  for (const file of readdirSync("lib/pages")) {
    const source = readFileSync(join("lib/pages", file), "utf8");
    const entries = source.split(/\n\s{2,4}slug: "/).slice(1);
    for (const entry of entries) {
      const slug = entry.slice(0, entry.indexOf('"'));
      const body = entry.split(/\n\s{2,4}slug: "/)[0];
      if (/\n\s+draft: true,/.test(body.split(/\n {2}\},?\n/)[0])) slugs.push(slug);
    }
  }
  return slugs;
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`));
  return match ? decode(match[1]) : null;
}

/** Visible text of the page body, with scripts and styles removed, for comparing against structured data. */
function visibleText(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ");
}

async function fetchText(url, init) {
  const response = await fetch(url, { redirect: "manual", ...init });
  return { status: response.status, text: await response.text(), headers: response.headers };
}

// Sitemap and robots.txt
const sitemap = await fetchText(`${BASE}/sitemap.xml`);
const sitemapUrls = [...sitemap.text.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
  url: block.match(/<loc>(.*?)<\/loc>/)[1],
  lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  alternates: Object.fromEntries(
    [...block.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href])
  ),
}));
const inSitemap = new Set(sitemapUrls.map((entry) => entry.url));
for (const entry of sitemapUrls) if (!entry.lastmod) fail(entry.url, "sitemap entry has no lastmod");
const robots = await fetchText(`${BASE}/robots.txt`);
if (!robots.text.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) fail("/robots.txt", "doesn't link the sitemap");

const pages = new Map();
const titles = new Map();
const descriptions = new Map();
const ogTitles = new Map();
const linked = new Set();

for (const { url } of sitemapUrls) {
  const { status, text: html } = await fetchText(local(url));
  if (status !== 200) {
    fail(url, `status ${status}`);
    continue;
  }
  const head = html.slice(0, html.indexOf("</head>"));
  const title = decode(head.match(/<title>(.*?)<\/title>/)?.[1] ?? "");
  const description = attribute(head.match(/<meta name="description"[^>]*>/)?.[0] ?? "", "content") ?? "";
  const canonical = attribute(head.match(/<link rel="canonical"[^>]*>/)?.[0] ?? "", "href");
  const ogTitle = attribute(head.match(/<meta property="og:title"[^>]*>/)?.[0] ?? "", "content");
  const ogUrl = attribute(head.match(/<meta property="og:url"[^>]*>/)?.[0] ?? "", "content");
  const ogImage = head.match(/<meta property="og:image"/);
  const lang = html.match(/<html lang="([^"]+)"/)?.[1];
  const hreflangs = Object.fromEntries(
    [...head.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map(([, code, href]) => [code, href])
  );

  if (!title) fail(url, "no <title>");
  if (title.length > TITLE_MAX) warnings.push(`${url}: title is ${title.length} characters`);
  if (!description) fail(url, "no meta description");
  if (description.length > DESCRIPTION_MAX) warnings.push(`${url}: description is ${description.length} characters`);
  if (canonical !== url) fail(url, `canonical is ${canonical}`);
  if (!ogTitle || ogUrl !== url) fail(url, `og:title or og:url missing or wrong (og:url ${ogUrl})`);
  if (!ogImage) fail(url, "no og:image");
  const expectedLang = new URL(url).pathname.startsWith("/hi") ? "hi" : "en";
  if (lang !== expectedLang) fail(url, `html lang is ${lang}, expected ${expectedLang}`);

  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) fail(url, `${h1s.length} <h1> elements`);

  // Structured data: every block parses, and FAQ entries match the visible questions and answers.
  const text = visibleText(html);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) fail(url, "no JSON-LD");
  for (const [, json] of blocks) {
    let data;
    try {
      data = JSON.parse(json);
    } catch (error) {
      fail(url, `JSON-LD doesn't parse: ${error.message}`);
      continue;
    }
    const nodes = data["@graph"] ?? [data];
    for (const node of nodes) {
      for (const question of node.mainEntity ?? []) {
        if (!text.includes(question.name)) fail(url, `FAQ question not on the page: "${question.name}"`);
        if (!text.includes(question.acceptedAnswer.text)) fail(url, `FAQ answer not on the page: "${question.name}"`);
      }
      if (node["@type"] === "BreadcrumbList") {
        const last = node.itemListElement.at(-1);
        if (last.item !== url) fail(url, `breadcrumb ends at ${last.item}`);
      }
    }
  }

  for (const [map, value, label] of [
    [titles, title, "title"],
    [descriptions, description, "description"],
    [ogTitles, ogTitle, "og:title"],
  ]) {
    if (map.has(value)) fail(url, `${label} duplicates ${map.get(value)}`);
    else map.set(value, url);
  }

  for (const [, href] of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) linked.add(site(href === "" ? "/" : href));
  pages.set(url, { hreflangs });
}

// hreflang: each alternate lists the same set back, and matches the sitemap's alternates.
for (const [url, { hreflangs }] of pages) {
  const codes = Object.keys(hreflangs);
  if (codes.length === 0) continue;
  if (!Object.values(hreflangs).includes(url)) fail(url, "hreflang set doesn't include the page itself");
  if (!hreflangs["x-default"]) fail(url, "hreflang set has no x-default");
  for (const href of Object.values(hreflangs)) {
    const other = pages.get(href);
    if (!other) {
      fail(url, `hreflang points to ${href}, which isn't a published page`);
      continue;
    }
    if (JSON.stringify(other.hreflangs) !== JSON.stringify(hreflangs)) fail(url, `hreflang isn't reciprocal with ${href}`);
  }
  const sitemapAlternates = sitemapUrls.find((entry) => entry.url === url)?.alternates ?? {};
  if (JSON.stringify(sitemapAlternates) !== JSON.stringify(hreflangs)) fail(url, "sitemap alternates differ from the page's hreflang");
}

// Links: every internal page link is in the sitemap, and no draft is linked or listed.
const assetPattern = /\/(opengraph-image|twitter-image|icon|apple-icon)|\.(png|ico|svg|txt|xml|webmanifest)$/;
for (const href of linked) {
  if (assetPattern.test(href)) continue;
  if (!inSitemap.has(href)) fail(href, "linked from a page but not in the sitemap");
}
const drafts = draftSlugs();
for (const slug of drafts) {
  const url = site(`/${slug}`);
  if (inSitemap.has(url)) fail(url, "draft page is in the sitemap");
  if (linked.has(url)) fail(url, "draft page is linked");
  const { status } = await fetchText(local(url));
  if (status !== 404) fail(url, `draft page returns ${status}, expected 404`);
}

console.log(`Checked ${pages.size} pages from the sitemap, ${linked.size} internal links, ${drafts.length} drafts (${drafts.join(", ")}).`);
for (const warning of warnings) console.log(`warning  ${warning}`);
for (const failure of failures) console.log(`FAIL     ${failure}`);
console.log(failures.length === 0 ? "All checks passed." : `${failures.length} checks failed.`);
process.exit(failures.length === 0 ? 0 : 1);
