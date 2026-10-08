import type { PageEntry } from "@/lib/pages/types";

const IBPS_SOURCE = {
  publisher: "Institute of Banking Personnel Selection",
  title: "Guidelines for scanning and upload of documents",
  url: "https://ibpsreg.ibps.in/crppoxvjun25/uploads/loadpdf.php?file=k7m5p+fQ15erzNvj0OHb1N7UnJp9sc%2FKYaao1bWrpok%3D&t=1LHArOLA2di0yczXwNDa083LmNWypw%3D%3D",
};

// Pages for a bare pixel size. The size is the preset; the forms that ask for it are listed in the spec.
export const SIZE_PAGES: PageEntry[] = [
  {
    slug: "200x230-pixels",
    category: "pixels",
    name: "200 × 230 pixels",
    preset: {
      name: "200 × 230 px",
      spec: "200×230 px",
      printMm: { width: 35, height: 40.25 },
      aspect: 200 / 230,
      width: 200,
      height: 230,
      maxKb: 50,
      minKb: 20,
    },
    title: "Resize photo to 200×230 pixels (20–50 KB)",
    metaDescription:
      "Resize a photo to exactly 200 × 230 pixels, the size IBPS and SBI ask for, as a JPEG between 20 and 50 KB. Cropped, not stretched. Free, no upload.",
    h1: "Resize photo to 200 × 230 px",
    h1Accent: ", not stretched.",
    intro:
      "Crop your photo to the 200 × 230 pixel shape bank exam forms prefer and download a JPEG between 20 and 50 KB, without squashing your face.",
    question: "Which forms ask for a 200 × 230 pixel photo?",
    answer:
      "IBPS (PO, Clerk and RRB recruitments) and SBI (PO and Clerk 2026) give 200 × 230 pixels as the preferred photo size, with the file between 20 KB and 50 KB in JPG or JPEG. The shape is 20 : 23, a little wider than a 35 × 45 mm passport photo, so a passport photo resized straight to 200 × 230 gets stretched sideways. FormPic crops to the 20 : 23 shape first.",
    facts: [
      { label: "Pixels", value: "200 × 230 px", note: "width × height" },
      { label: "Shape", value: "20 : 23", note: "0.87, wider than 7 : 9" },
      { label: "File", value: "20–50 KB", note: "IBPS and SBI" },
      { label: "Format", value: "JPEG", note: "JPG or JPEG" },
    ],
    spec: {
      title: "Forms that use 200 × 230 pixels",
      rows: [
        {
          item: "IBPS photo",
          pixels: "200 × 230 px (preferred)",
          minKb: 20,
          maxKb: 50,
          format: "JPG/JPEG",
          background: "Light, preferably white",
        },
        {
          item: "SBI PO 2026 photo",
          pixels: "200 × 230 px (preferred)",
          minKb: 20,
          maxKb: 50,
          format: "JPG/JPEG",
          background: "Light, preferably white",
        },
        {
          item: "SBI Clerk 2026 photo",
          pixels: "200 × 230 px (preferred)",
          minKb: 20,
          maxKb: 50,
          format: "JPG/JPEG",
          background: "Light, preferably white",
        },
      ],
    },
    steps: {
      title: "How to resize a photo to 200 × 230 pixels",
      items: [
        {
          name: "Add the photo",
          detail: "Use a recent colour photo on a light background. A phone photo is fine.",
        },
        {
          name: "Frame your face",
          detail:
            "The crop box is locked to 20 : 23. Place it from just above your head to your upper chest.",
        },
        {
          name: "Download",
          detail:
            "FormPic saves exactly 200 × 230 px and keeps the JPEG between 20 and 50 KB. The Download button shows the size.",
        },
      ],
    },
    faqs: [
      {
        question: "Why does my photo look stretched at 200 × 230?",
        answer:
          "Most tools resize the whole image to 200 × 230 without cropping, so a 3 : 4 or 7 : 9 photo gets pulled sideways. FormPic crops to 20 : 23 first, so nothing is distorted.",
      },
      {
        question: "What is 200 × 230 pixels in cm?",
        answer:
          "Pixels don't have a fixed size in centimetres; that depends on the DPI it's printed at. IBPS and SBI head the photo rules with 4.5 × 3.5 cm, the print size, then ask for 200 × 230 px for the upload.",
      },
      {
        question: "Why is my 200 × 230 photo under 20 KB?",
        answer:
          "At 46,000 pixels, a photo on a plain background can compress below 20 KB. FormPic raises the quality first; if it's still short, Enlarge to fit adds pixels. IBPS and SBI call 200 × 230 the preferred size, not a fixed one.",
      },
      {
        question: "Is my photo uploaded to FormPic?",
        answer: "No. It's cropped and resized in your browser and never leaves your device.",
      },
    ],
    sources: [
      IBPS_SOURCE,
      {
        publisher: "State Bank of India",
        title: "Recruitment of Probationary Officers 2026: detailed advertisement",
        url: "https://sbi.bank.in/csfile/18062026_1_Detailed_Adv.2026.pdf",
      },
      {
        publisher: "State Bank of India",
        title: "Recruitment of Junior Associates 2026: detailed advertisement",
        url: "https://sbi.bank.in/webfiles/uploads/files_2627/08/JA_2026_Detailed_Advt_Eng.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["ibps-photo", "sbi-po-photo", "sbi-clerk-photo", "resize-image-20kb-to-50kb", "350x350-pixels"],
  },
  {
    slug: "350x350-pixels",
    category: "pixels",
    name: "350 × 350 pixels",
    preset: {
      name: "350 × 350 px",
      spec: "350×350 px",
      printMm: { width: 35, height: 35 },
      aspect: 1,
      width: 350,
      height: 350,
    },
    title: "Resize image to 350×350 pixels online",
    metaDescription:
      "Resize a photo or signature to exactly 350 × 350 pixels, the smallest size UPSC accepts per side. Square crop, JPEG or PNG, free and never uploaded.",
    h1: "Resize image to 350 × 350 px",
    h1Accent: ", square.",
    intro:
      "Crop any photo to a square and save it at exactly 350 × 350 pixels. It's the smallest size UPSC's online application accepts on each side.",
    question: "Where is 350 × 350 pixels used?",
    answer:
      "UPSC's online application accepts photos and signatures between 350 and 1000 pixels in both width and height, as JPGs between 20 KB and 300 KB, so 350 × 350 is the smallest square it takes. The image doesn't have to be square for UPSC: any size from 350 to 1000 pixels per side works. FormPic's square preset gives exactly 350 × 350 when a form or profile asks for it.",
    facts: [
      { label: "Pixels", value: "350 × 350 px", note: "square" },
      { label: "UPSC range", value: "350–1000 px", note: "per side" },
      { label: "UPSC file", value: "20–300 KB", note: "JPG" },
    ],
    spec: {
      title: "Forms that accept 350 × 350 pixels",
      rows: [
        {
          item: "UPSC photo and signature",
          pixels: "350 to 1000 px per side",
          minKb: 20,
          maxKb: 300,
          format: "JPG",
        },
      ],
    },
    steps: {
      title: "How to resize an image to 350 × 350",
      items: [
        {
          name: "Add the image",
          detail: "Add a photo or a scan. The crop box is locked to a square.",
        },
        {
          name: "Place the square",
          detail: "Drag the square over what you want to keep. For a face, include a little space above the head.",
        },
        {
          name: "Set the file size",
          detail:
            "For UPSC, type 300 into Max file size and 20 into Min file size. FormPic shows the final size on the Download button.",
        },
      ],
    },
    faqs: [
      {
        question: "Does UPSC need a square photo?",
        answer:
          "No. UPSC accepts any width and height from 350 to 1000 pixels. A passport size photo at 413 × 531 px fits too; use the UPSC preset for that.",
      },
      {
        question: "My 350 × 350 photo is under 20 KB. What now?",
        answer:
          "Set Min file size to 20 KB and FormPic raises the quality. If the file is still short, Enlarge to fit adds pixels, which UPSC allows up to 1000 per side.",
      },
      {
        question: "Can I make it PNG?",
        answer:
          "Yes. Switch the format to PNG for a lossless file. Forms that ask for JPG, like UPSC, need JPEG.",
      },
      {
        question: "Is my image uploaded to FormPic?",
        answer: "No. It's cropped and resized in your browser and never leaves your device.",
      },
    ],
    sources: [
      {
        publisher: "Union Public Service Commission",
        title: "One Time Registration: frequently asked questions",
        url: "https://upsconline.gov.in/OTRP/candidate/faq.php",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["upsc-photo", "200x230-pixels", "resize-image-to-300kb", "increase-image-size-in-kb", "passport-size-photo"],
  },
];
