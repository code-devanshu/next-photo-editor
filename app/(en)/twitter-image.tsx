import { renderShareImage } from "@/lib/og-image";

export const alt = "FormPic — resize photos for passport, visa and PAN card forms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderShareImage({
    title: "Photos sized for forms",
    detail: "Passport, visa & PAN card · in your browser, no upload",
  });
}
