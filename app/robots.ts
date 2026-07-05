import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Allows every crawler, including AI search bots (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
