import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.3"],
  experimental: {
    // Most visitors arrive once from search, so styles inline in the HTML beat a cached stylesheet:
    // no render-blocking CSS request before the first paint.
    inlineCss: true,
  },
};

export default nextConfig;
