// Redirects, kept as data so next.config.ts generates them. Every rule answers 301.

/**
 * Old paths on this domain and where they live now. Add one whenever a page's slug changes,
 * so links and rankings to the old URL carry over. Paths are lowercase, without a trailing slash.
 */
export const PATH_REDIRECTS: { from: string; to: string }[] = [];

/**
 * Hosts the site used to live on. When the domain moves, change SITE_URL in lib/site.ts, point the
 * old domain at the same deployment, and list it here: every old URL then 301s to the same path on
 * the new domain. Empty while formpic.devanshuverma.in is the only domain.
 */
export const OLD_HOSTS: string[] = [];
