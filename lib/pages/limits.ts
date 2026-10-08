import type { Faq, PageEntry } from "@/lib/pages/types";

const LIMIT_TIPS_NOTE =
  "If a form gives both a pixel size and a file size, set the pixels first. FormPic then fits the file size without changing them.";

// Shared across the limit pages: how FormPic counts a KB, and that nothing is uploaded.
function limitFaqs(kb: number): Faq[] {
  return [
    {
      question: `Why does FormPic show ${((kb * 1000) / 1024).toFixed(1)} KB instead of ${kb} KB?`,
      answer: `Some portals count a KB as 1,000 bytes and others as 1,024. FormPic keeps the file under ${(kb * 1000).toLocaleString("en-US")} bytes so it passes either check, and shows sizes in 1,024-byte units, so a file right at the limit reads ${((kb * 1000) / 1024).toFixed(1)} KB.`,
    },
    {
      question: "Is my photo uploaded to compress it?",
      answer:
        "No. FormPic compresses the photo inside your browser, so it never leaves your device. That also makes it fast: there's no upload or download wait.",
    },
  ];
}

// One page per file size limit, like "resize image to 20 KB", with the limit preset in the editor.
export const LIMIT_PAGES: PageEntry[] = [
  {
    slug: "resize-image-to-10kb",
    category: "kb",
    name: "Resize image to 10 KB",
    limit: { maxKb: 10 },
    title: "Resize image to 10 KB online (JPEG, no upload)",
    metaDescription:
      "Reduce a signature or photo to under 10 KB for online forms. FormPic picks the best JPEG quality that fits, works on your phone, and never uploads the image.",
    h1: "Resize image to 10 KB",
    h1Accent: ", signatures too.",
    intro:
      "Add a signature or photo and FormPic compresses it to just under 10 KB, at the highest quality that fits. Crop it or set a pixel size if the form asks for one. Nothing is uploaded.",
    question: "How do I resize an image to 10 KB?",
    answer:
      "Add your image, keep Max file size on 10 KB, and download. FormPic tries JPEG qualities until it finds the highest one that stays under 10 KB. If the image has too many pixels to fit at all, Shrink to fit lowers the width and height in proportion. 10 KB is a common limit for signatures, including the PAN card signature.",
    facts: [
      { label: "Limit", value: "10 KB", note: "under 10,000 bytes" },
      { label: "Format", value: "JPEG", note: "what portals accept" },
      { label: "Typical use", value: "Signatures", note: "like the PAN card signature" },
    ],
    requirements: {
      title: "Getting a sharp photo under 10 KB",
      items: [
        "Crop close around a signature. Empty paper still costs bytes.",
        "Photograph the signature in even light, so the paper comes out plain white rather than grey.",
        "Sign with a dark pen. A strong line stays readable after compression.",
        "For a photo, crop to head and shoulders and use the form's pixel size. 10 KB holds a small face photo, not a large one.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: { title: "How to resize an image to 10 KB" },
    faqs: [
      {
        question: "How do I resize a signature to 10 KB?",
        answer:
          "Photograph your signature on white paper and upload it. Choose Free and crop close around it, then download with the 10 KB limit on. For the PAN card signature, also type 354 × 157 px, which is 4.5 × 2 cm at 200 DPI.",
      },
      {
        question: "Can a photo fit in 10 KB?",
        answer:
          "Yes, at small pixel sizes. A face photo around 150 to 200 pixels wide usually fits. If yours doesn't, Shrink to fit lowers the pixels until it does.",
      },
      ...limitFaqs(10),
    ],
    sources: [],
    updated: "2026-10-07",
    related: [
      "resize-image-to-20kb",
      "ssc-signature",
      "pan-card-photo",
      "resize-image-to-50kb",
    ],
  },
  {
    slug: "resize-image-to-20kb",
    category: "kb",
    name: "Resize image to 20 KB",
    limit: { maxKb: 20 },
    title: "Resize image to 20 KB online (JPEG, no upload)",
    metaDescription:
      "Reduce a photo or signature to under 20 KB for online forms. FormPic picks the best JPEG quality that fits, works on your phone, and never uploads the image.",
    h1: "Resize image to 20 KB",
    h1Accent: ", sharp as it can be.",
    intro:
      "Add a photo and FormPic compresses it to just under 20 KB, at the highest quality that fits. Crop it or set a pixel size if the form asks for one. Nothing is uploaded.",
    question: "How do I resize an image to 20 KB?",
    answer:
      "Add your photo, keep Max file size on 20 KB, and download. FormPic tries JPEG qualities until it finds the highest one that stays under 20 KB. If the photo has too many pixels to fit at all, Shrink to fit lowers the width and height in proportion. 20 KB is a common limit for application photos, including the PAN card photo.",
    facts: [
      { label: "Limit", value: "20 KB", note: "under 20,000 bytes" },
      { label: "Format", value: "JPEG", note: "what portals accept" },
      { label: "Typical use", value: "Form photos", note: "and PAN card photos" },
    ],
    requirements: {
      title: "Getting a sharp photo under 20 KB",
      items: [
        "Crop tight to your head and shoulders. Every pixel of background costs bytes.",
        "Use the pixel size the form asks for. Large photos have to be compressed harder to reach 20 KB.",
        "Shoot against a plain, evenly lit wall. Flat areas compress far better than busy ones.",
        "If the form gives no pixel size, try around 200 to 300 pixels wide. That's plenty for a face on screen.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: { title: "How to resize an image to 20 KB" },
    faqs: [
      {
        question: "Will my photo look blurry at 20 KB?",
        answer:
          "Not at the sizes forms ask for. The PAN card photo, 197 × 276 px, is specified to fit in 20 KB. Blur and blockiness appear when a large photo is squeezed into 20 KB, so crop first and use the form's pixel size.",
      },
      {
        question: "What if the form asks for between 10 KB and 20 KB?",
        answer:
          "FormPic always picks the highest quality that fits, so the file usually lands just under 20 KB, well above a 10 KB minimum. Check the size on the Download button before you save.",
      },
      {
        question: "Can I resize a signature to 20 KB?",
        answer:
          "Yes. Upload a photo or scan of your signature, choose Free and crop close around it, then download. A signature on white compresses very well, so it will fit easily.",
      },
      ...limitFaqs(20),
    ],
    sources: [],
    updated: "2026-10-07",
    related: [
      "resize-image-to-10kb",
      "resize-image-to-50kb",
      "pan-card-photo",
      "ibps-photo",
    ],
  },
  {
    slug: "resize-image-to-50kb",
    category: "kb",
    name: "Resize image to 50 KB",
    limit: { maxKb: 50 },
    title: "Resize image to 50 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a photo to under 50 KB for exam, job and visa forms. FormPic finds the best JPEG quality that fits, right in your browser. Free, with no upload.",
    h1: "Resize image to 50 KB",
    h1Accent: ", in your browser.",
    intro:
      "Add a photo and FormPic compresses it to just under 50 KB, at the highest quality that fits. Crop it or set an exact pixel size first if the form asks for one.",
    question: "How do I resize an image to 50 KB?",
    answer:
      "Add your photo, keep Max file size on 50 KB, and download. FormPic searches for the highest JPEG quality that stays under 50 KB and shows the final size on the Download button. If the photo is still too big at the lowest quality, Shrink to fit lowers the width and height in proportion.",
    facts: [
      { label: "Limit", value: "50 KB", note: "under 50,000 bytes" },
      { label: "Format", value: "JPEG", note: "what portals accept" },
      { label: "Typical use", value: "Exam & job forms", note: "photo uploads" },
    ],
    requirements: {
      title: "Getting a sharp photo under 50 KB",
      items: [
        "Crop to the shape the form asks for before compressing, so no bytes go to background.",
        "Type the form's exact pixel size into Width and Height, if it gives one.",
        "Phone photos are several megabytes. Shrink to fit brings them down to a size 50 KB can hold cleanly.",
        "A plain, evenly lit background keeps the face sharp at a small file size.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: { title: "How to resize an image to 50 KB" },
    faqs: [
      {
        question: "How do I reduce a phone photo from 3 MB to 50 KB?",
        answer:
          "Add the photo and keep the 50 KB limit on. A phone photo has millions of pixels, so it usually needs fewer of them to fit: press Shrink to fit, or type the form's pixel size into Width and Height. FormPic then picks the best quality for 50 KB.",
      },
      {
        question: "What if the form asks for between 20 KB and 50 KB?",
        answer:
          "FormPic picks the highest quality that fits, so the file usually lands just under 50 KB, comfortably above a 20 KB minimum. The Download button shows the exact size before you save.",
      },
      ...limitFaqs(50),
    ],
    sources: [],
    updated: "2026-10-07",
    related: [
      "resize-image-to-20kb",
      "resize-image-to-100kb",
      "ibps-photo",
      "passport-size-photo",
    ],
  },
  {
    slug: "resize-image-to-100kb",
    category: "kb",
    name: "Resize image to 100 KB",
    limit: { maxKb: 100 },
    title: "Resize image to 100 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a photo or document scan to under 100 KB, at the best JPEG quality that fits. Works on phones and laptops, free, and the image is never uploaded.",
    h1: "Resize image to 100 KB",
    h1Accent: ", nothing uploaded.",
    intro:
      "Add a photo or scan and FormPic compresses it to just under 100 KB, at the highest quality that fits. Crop and set a pixel size too if you need one.",
    question: "How do I resize an image to 100 KB?",
    answer:
      "Add your image, keep Max file size on 100 KB, and download. FormPic searches for the highest JPEG quality that stays under 100 KB, so the result is as sharp as the limit allows. If it can't fit at the current pixel size, Shrink to fit lowers the width and height in proportion.",
    facts: [
      { label: "Limit", value: "100 KB", note: "under 100,000 bytes" },
      { label: "Format", value: "JPEG", note: "what portals accept" },
      { label: "Typical use", value: "Photos & scans", note: "ID and document uploads" },
    ],
    requirements: {
      title: "Getting a sharp photo under 100 KB",
      items: [
        "Crop away the table or background around a scanned document before compressing.",
        "For text, keep enough pixels to read it: Shrink to fit lowers them only as far as needed.",
        "If a photo already fits, FormPic keeps the quality high instead of shrinking it further.",
        "Rotate sideways scans before downloading so the form shows them the right way up.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: { title: "How to resize an image to 100 KB" },
    faqs: [
      {
        question: "Can I compress a scanned document to 100 KB?",
        answer:
          "Yes, if it's an image (JPG, PNG or WEBP). Crop it to the page, keep the 100 KB limit on, and download. FormPic doesn't open PDFs, so take a photo of the page or export the PDF page as an image first.",
      },
      {
        question: "Will the photo keep its pixel size?",
        answer:
          "Yes. FormPic lowers JPEG quality first and keeps your width and height. Pixels only change if you press Shrink to fit or type a new size.",
      },
      ...limitFaqs(100),
    ],
    sources: [],
    updated: "2026-10-07",
    related: [
      "resize-image-to-50kb",
      "resize-image-to-200kb",
      "neet-photo",
      "passport-size-photo",
    ],
  },
  {
    slug: "resize-image-to-200kb",
    category: "kb",
    name: "Resize image to 200 KB",
    limit: { maxKb: 200 },
    title: "Resize image to 200 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a photo to under 200 KB for exam, job and visa forms, at the best JPEG quality that fits. Free, works on any phone, and nothing is uploaded.",
    h1: "Resize image to 200 KB",
    h1Accent: ", quality kept high.",
    intro:
      "Add a photo and FormPic compresses it to just under 200 KB, at the highest quality that fits. Crop it or set a pixel size first if the form gives one.",
    question: "How do I resize an image to 200 KB?",
    answer:
      "Add your photo, keep Max file size on 200 KB, and download. FormPic searches for the highest JPEG quality that stays under 200 KB and shows the final size on the Download button. A full-resolution phone photo can be too big even at low quality; Shrink to fit then lowers the width and height in proportion. 200 KB is the upper limit for the NEET (UG) photo.",
    facts: [
      { label: "Limit", value: "200 KB", note: "under 200,000 bytes" },
      { label: "Format", value: "JPEG", note: "what portals accept" },
      { label: "Typical use", value: "Exam photos", note: "like the NEET (UG) photo" },
    ],
    requirements: {
      title: "Getting a sharp photo under 200 KB",
      items: [
        "Crop to what the form needs first, so the bytes go to your face rather than the room.",
        "Type the form's pixel size if it gives one. Fewer pixels leave room for higher quality.",
        "Phone photos straight from the camera are several megabytes. Shrink to fit brings them into range in one step.",
        "If the form also sets a minimum, check the size on the Download button before you save.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: { title: "How to resize an image to 200 KB" },
    faqs: [
      {
        question: "How do I reduce a 5 MB photo to 200 KB?",
        answer:
          "Add the photo and keep the 200 KB limit on. If it can't fit at its full pixel size, press Shrink to fit, or type the form's pixel size into Width and Height. FormPic then picks the best quality for 200 KB.",
      },
      {
        question: "Will the photo lose quality?",
        answer:
          "Some, because JPEG compression removes fine detail. FormPic stops at the highest quality that fits, so the photo loses only as much as the limit requires.",
      },
      ...limitFaqs(200),
    ],
    sources: [],
    updated: "2026-10-07",
    related: [
      "resize-image-to-100kb",
      "neet-photo",
      "upsc-photo",
      "us-passport-photo",
    ],
  },
];
