import { sendGAEvent } from "@next/third-parties/google";

/**
 * Sends a GA4 event. Does nothing on the server, in dev, or when GA isn't loaded
 * (no NEXT_PUBLIC_GA_ID), since <GoogleAnalytics> in root-shell.tsx creates the dataLayer.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  sendGAEvent("event", name, params ?? {});
}
