import type { PageEntry } from "@/lib/pages/types";
import { SITE_DESCRIPTION } from "@/lib/site";

export const HOME_PAGE: PageEntry = {
  slug: "",
  category: "home",
  name: "Home",
  title: "Resize photos for passport, visa & PAN card forms",
  metaDescription: SITE_DESCRIPTION,
  h1: "Crop & resize photos for forms",
  h1Accent: ", in seconds.",
  intro:
    "Get the exact size for passport, visa, PAN card and exam forms. Your photo is processed entirely on your device, never uploaded or stored, and keeps full quality from start to finish.",
  steps: { title: "How to resize a photo for a form" },
  faqs: [
    {
      question: "What is passport size photo size in pixels?",
      answer:
        "A passport size photo is 35 × 45 mm. At 300 DPI, the usual print resolution, that's 413 × 531 pixels. Some portals ask for a different pixel size for uploads, so check the form's instructions and type the exact numbers into the Width and Height fields.",
    },
    {
      question: "How do I reduce a photo to under 20 KB or 50 KB?",
      answer:
        "Choose JPEG and set Max file size to 20 KB or 50 KB, or type any other limit. FormPic picks the highest quality that fits and shows the final size on the Download button. If the photo is too big even at the lowest quality, Shrink to fit lowers the pixel size as well.",
    },
    {
      question: "Are my photos uploaded to a server?",
      answer:
        "No. FormPic crops and resizes the photo inside your browser using the canvas API. The image never leaves your device, and nothing is kept after you close the tab.",
    },
    {
      question: "Can I take the photo with my phone camera?",
      answer:
        "Yes. Tap Use camera to take a photo with your phone or laptop camera, then crop it the same way as an uploaded file.",
    },
    {
      question: "Does FormPic change the background to white?",
      answer:
        "No. FormPic crops and resizes but doesn't edit the background. For a white background, take the photo against a plain white or light wall with even lighting.",
    },
    {
      question: "Should I choose JPEG or PNG?",
      answer:
        "Most application forms ask for JPEG, and the form presets switch to it automatically. PNG is lossless, so use it when you want a full-quality copy for printing; the file will be larger.",
    },
    {
      question: "Is FormPic free?",
      answer: "Yes. There's no account, no sign-up and no watermark on the downloaded photo.",
    },
  ],
  sources: [],
  updated: "2026-10-07",
  related: [],
};
