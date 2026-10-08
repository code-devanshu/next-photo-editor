import type { PageEntry } from "@/lib/pages/types";

export const THUMB_PAGE: PageEntry = {
  slug: "thumb-impression-resize",
  category: "signature",
  name: "Thumb impression",
  preset: {
    name: "Left thumb",
    kind: "thumb",
    spec: "30×30 mm",
    printMm: { width: 30, height: 30 },
    aspect: 1,
    width: 240,
    height: 240,
    dpi: 200,
    maxKb: 50,
    minKb: 20,
  },
  title: "Thumb impression resize (240×240 px, 20–50 KB)",
  metaDescription:
    "Resize a left thumb impression for IBPS and SBI (240 × 240 px, 20–50 KB) or NEET PG (3.5 × 1.5 cm box, under 80 KB). Free, in your browser, no upload.",
  h1: "Thumb impression resizer",
  h1Accent: ", 240 × 240 px.",
  intro:
    "Crop a left thumb impression to the square bank exams ask for, or to the NEET PG box, and download a JPEG inside the limit. The image stays on your device.",
  question: "What size is the thumb impression for bank exams?",
  answer:
    "IBPS and SBI ask for the left thumb impression on white paper in black or blue ink, scanned as a JPG or JPEG of 240 × 240 pixels at 200 DPI, which is 3 × 3 cm, between 20 KB and 50 KB. NEET PG asks for it inside a 3.5 × 1.5 cm box, printed horizontally, at 200 DPI and under 80 KB.",
  facts: [
    { label: "Bank exams", value: "240 × 240 px", note: "3 × 3 cm at 200 DPI" },
    { label: "Bank file", value: "20–50 KB", note: "JPG or JPEG" },
    { label: "NEET PG", value: "3.5 × 1.5 cm", note: "box, under 80 KB" },
    { label: "Ink", value: "Black or blue", note: "on white paper" },
  ],
  spec: {
    title: "Thumb impression sizes by form",
    rows: [
      {
        item: "IBPS (PO, Clerk, RRB)",
        printSize: "3 × 3 cm",
        pixels: "240 × 240 px",
        dpi: 200,
        minKb: 20,
        maxKb: 50,
        format: "JPG/JPEG",
        notes: "Left thumb, black or blue ink on white paper",
      },
      {
        item: "SBI PO and Clerk 2026",
        printSize: "3 × 3 cm",
        pixels: "240 × 240 px",
        dpi: 200,
        minKb: 20,
        maxKb: 50,
        format: "JPG/JPEG",
        notes: "Right thumb allowed if there's no left thumb",
      },
      {
        item: "NEET PG 2026",
        printSize: "3.5 × 1.5 cm box",
        dpi: 200,
        maxKb: 80,
        format: "JPG/JPEG",
        notes: "Horizontal print of the left thumb inside the box",
      },
    ],
  },
  requirements: {
    title: "Getting a clean thumb impression",
    items: [
      "Use a fresh black or blue ink pad. Practise on scrap paper until the print is neither too dark nor smudged.",
      "Clean and dry your hands first. Oil and dirt blur the ridges.",
      "Press gently and don't wriggle. Rolling or pressing too hard smudges the print.",
      "For NEET PG, print horizontally inside a 3.5 × 1.5 cm box. Draw a few boxes and pick the best one.",
    ],
    note: "IBPS allows another finger, or the left toe, when the thumbs are missing, in a set order. Name the finger and hand, or the toe, in the uploaded image when you do.",
  },
  steps: {
    title: "How to resize a thumb impression",
    items: [
      {
        name: "Take the print",
        detail: "Press your left thumb on the ink pad, then on white paper. Let the ink dry.",
      },
      {
        name: "Photograph or scan it",
        detail: "Scan at 200 DPI, or photograph it from directly above in good light without flash.",
      },
      {
        name: "Crop to the square",
        detail:
          "Add it here. The thumb preset crops a 3 × 3 cm square at 240 × 240 px. For NEET PG, choose Free and crop to the box instead.",
      },
      {
        name: "Download inside the limit",
        detail:
          "The bank preset keeps the file between 20 and 50 KB. For NEET PG, set Max file size to 80 KB.",
      },
    ],
  },
  rejections: {
    title: "Why thumb impressions get rejected",
    items: [
      "A smudged, too dark or too faint print.",
      "The signature and thumb impression in the same box (NEET PG).",
      "The whole page scanned instead of the cropped print.",
      "A file outside the KB range, or uploaded where the signature goes.",
    ],
  },
  faqs: [
    {
      question: "Left or right thumb?",
      answer:
        "Left. IBPS and SBI allow the right thumb if you don't have a left thumb. IBPS sets an order after that: a finger of the left hand starting from the forefinger, then the right hand, then the left toe.",
    },
    {
      question: "My 240 × 240 px thumb impression is under 20 KB. What now?",
      answer:
        "FormPic raises the JPEG quality first. If it's still short, press Enlarge to fit, which adds pixels and keeps the square. IBPS and SBI call 240 × 240 px the preferred size.",
    },
    {
      question: "Blue or black ink?",
      answer:
        "IBPS and SBI accept either for the thumb impression. NEET PG says a blue or black ink pad. The signature, by contrast, must be in black ink for IBPS and SBI.",
    },
    {
      question: "Is my thumb impression uploaded to FormPic?",
      answer:
        "No. It's cropped and compressed in your browser and never leaves your device.",
    },
  ],
  sources: [
    {
      publisher: "Institute of Banking Personnel Selection",
      title: "Guidelines for scanning and upload of documents",
      url: "https://ibpsreg.ibps.in/crppoxvjun25/uploads/loadpdf.php?file=k7m5p+fQ15erzNvj0OHb1N7UnJp9sc%2FKYaao1bWrpok%3D&t=1LHArOLA2di0yczXwNDa083LmNWypw%3D%3D",
    },
    {
      publisher: "State Bank of India",
      title: "Recruitment of Probationary Officers 2026: detailed advertisement",
      url: "https://sbi.bank.in/csfile/18062026_1_Detailed_Adv.2026.pdf",
    },
    {
      publisher: "National Board of Examinations in Medical Sciences",
      title: "NEET-PG 2026 image upload instructions",
      url: "https://g03.tcsion.com//per/g03/pub/726/EForms/image/ImageDocUpload/71161/5/8301129860.pdf",
    },
  ],
  lastVerified: "2026-10-08",
  updated: "2026-10-08",
  related: ["ibps-signature", "ibps-photo", "sbi-po-photo", "neet-pg-photo", "resize-image-20kb-to-50kb"],
};
