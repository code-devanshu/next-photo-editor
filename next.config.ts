import type { NextConfig } from "next";
import { OLD_HOSTS, PATH_REDIRECTS } from "./lib/redirects";
import { SITE_URL } from "./lib/site";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.3"],
  experimental: {
    // Most visitors arrive once from search, so styles inline in the HTML beat a cached stylesheet:
    // no render-blocking CSS request before the first paint.
    inlineCss: true,
    // A root layout per language (app/(en), app/(hi)) needs app/global-not-found.tsx for 404s.
    globalNotFound: true,
  },
  // URLs have no trailing slash; Next.js redirects "/page/" to "/page". Uppercase is handled in proxy.ts.
  async redirects() {
    return [
      ...PATH_REDIRECTS.map(({ from, to }) => ({ source: from, destination: to, statusCode: 301 as const })),
      ...OLD_HOSTS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `${SITE_URL}/:path*`,
        statusCode: 301 as const,
      })),
    ];
  },
};

export default nextConfig;
