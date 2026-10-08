import type { Faq, PageEntry, Source } from "@/lib/pages/types";

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

// Official sources for the "forms that use this limit" tables.
const SRC = {
  pan: {
    publisher: "Protean (formerly NSDL e-Gov)",
    title: "PAN card documents: scanning and uploading",
    url: "https://www.proteantech.in/articles/pan-card-documents-scanning-uploading-method/",
  },
  ssc: {
    publisher: "Staff Selection Commission",
    title: "Combined Graduate Level Examination, 2026 notice",
    url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2025.pdf",
  },
  ibps: {
    publisher: "Institute of Banking Personnel Selection",
    title: "Guidelines for scanning and upload of documents",
    url: "https://ibpsreg.ibps.in/crppoxvjun25/uploads/loadpdf.php?file=k7m5p+fQ15erzNvj0OHb1N7UnJp9sc%2FKYaao1bWrpok%3D&t=1LHArOLA2di0yczXwNDa083LmNWypw%3D%3D",
  },
  sbi: {
    publisher: "State Bank of India",
    title: "Recruitment of Probationary Officers 2026: detailed advertisement",
    url: "https://sbi.bank.in/csfile/18062026_1_Detailed_Adv.2026.pdf",
  },
  upsc: {
    publisher: "Union Public Service Commission",
    title: "One Time Registration: frequently asked questions",
    url: "https://upsconline.gov.in/OTRP/candidate/faq.php",
  },
  neet: {
    publisher: "National Testing Agency",
    title: "NEET (UG) 2026 information bulletin",
    url: "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/02/202602231394640855.pdf",
  },
  jee: {
    publisher: "National Testing Agency",
    title: "JEE (Main) 2026 information bulletin",
    url: "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2025/10/202510311145384616.pdf",
  },
  cuet: {
    publisher: "National Testing Agency",
    title: "CUET (UG) 2026 information bulletin",
    url: "https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2026/01/202601031633478370.pdf",
  },
  ctet: {
    publisher: "Central Board of Secondary Education",
    title: "CTET September 2026 information bulletin",
    url: "https://cdnbbsr.s3waas.gov.in/s3443dec3062d0286986e21dc0631734c9/uploads/2026/05/202605111250310617.pdf",
  },
  gate: {
    publisher: "IIT Madras (GATE 2027)",
    title: "GATE 2027: photograph and signature",
    url: "https://gate2027.iitm.ac.in/photograph_and_signature",
  },
  oci: {
    publisher: "Ministry of Home Affairs, Government of India",
    title: "OCI services: frequently asked questions",
    url: "https://ociservices.gov.in/onlineOCI/faq",
  },
  rrb: {
    publisher: "Railway Recruitment Boards",
    title: "CEN 09/2025: recruitment to Level 1 posts",
    url: "https://rrbsecunderabad.gov.in/wp-content/uploads/2026/01/Final-Detailed-CEN-09-2025-Level-1-updated-on-30.01.2026.pdf",
  },
  uk: {
    publisher: "GOV.UK",
    title: "Get a passport photo: digital photos",
    url: "https://www.gov.uk/photos-for-passports",
  },
  australia: {
    publisher: "Australian Government Department of Home Affairs",
    title: "ImmiAccount help: photograph",
    url: "https://immi.homeaffairs.gov.au/help-text/evidence/Pages/et-h0369.aspx",
  },
} satisfies Record<string, Source>;

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
    spec: {
      title: "Forms with a 10 KB limit",
      rows: [
        { item: "PAN card signature (Protean)", printSize: "4.5 × 2 cm", maxKb: 10, format: "JPEG" },
        { item: "SSC signature", printSize: "about 6.0 × 2.0 cm", minKb: 10, maxKb: 20, format: "JPEG/JPG", notes: "10 KB is the minimum" },
        { item: "IBPS and SBI signature", pixels: "140 × 60 px", minKb: 10, maxKb: 20, format: "JPG/JPEG", notes: "10 KB is the minimum" },
      ],
    },
    sources: [SRC.pan, SRC.ssc, SRC.ibps],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
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
    spec: {
      title: "Forms with a 20 KB limit",
      rows: [
        { item: "PAN card photo (Protean)", printSize: "2.5 × 3.5 cm", maxKb: 20, format: "JPEG" },
        { item: "SSC signature", printSize: "about 6.0 × 2.0 cm", minKb: 10, maxKb: 20, format: "JPEG/JPG" },
        { item: "IBPS and SBI signature", pixels: "140 × 60 px", minKb: 10, maxKb: 20, format: "JPG/JPEG" },
        { item: "UPSC photo and signature", pixels: "350–1000 px per side", minKb: 20, maxKb: 300, format: "JPG", notes: "20 KB is the minimum" },
      ],
    },
    sources: [SRC.pan, SRC.ssc, SRC.ibps, SRC.upsc],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
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
    spec: {
      title: "Forms with a 50 KB limit",
      rows: [
        { item: "IBPS and SBI photo", pixels: "200 × 230 px", minKb: 20, maxKb: 50, format: "JPG/JPEG" },
        { item: "IBPS and SBI left thumb impression", pixels: "240 × 240 px", minKb: 20, maxKb: 50, format: "JPG/JPEG" },
        { item: "CUET (UG) 2026 signature", minKb: 10, maxKb: 50, format: "JPG/JPEG" },
        { item: "UK passport digital photo", pixels: "at least 600 × 750 px", minKb: 50, notes: "50 KB is the minimum" },
      ],
    },
    sources: [SRC.ibps, SRC.sbi, SRC.cuet, SRC.uk],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
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
    spec: {
      title: "Forms with a 100 KB limit",
      rows: [
        { item: "CTET photo", printSize: "3.5 × 4.5 cm", minKb: 10, maxKb: 100, format: "JPG/JPEG" },
        { item: "JEE (Main) 2026 signature", minKb: 10, maxKb: 100, format: "JPG/JPEG" },
        { item: "NEET (UG) 2026 signature", minKb: 10, maxKb: 100, format: "JPG" },
        { item: "IBPS and SBI hand-written declaration", pixels: "800 × 400 px", minKb: 50, maxKb: 100, format: "JPG/JPEG" },
      ],
    },
    sources: [SRC.ctet, SRC.jee, SRC.neet, SRC.ibps],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
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
    spec: {
      title: "Forms with a 200 KB limit",
      rows: [
        { item: "NEET (UG) 2026 photo", printSize: "Passport size", minKb: 10, maxKb: 200, format: "JPG" },
        { item: "JEE (Main) 2026 photo", printSize: "Passport size", minKb: 10, maxKb: 200, format: "JPG/JPEG" },
        { item: "CUET (UG) 2026 photo", printSize: "Passport size", minKb: 10, maxKb: 200, format: "JPG/JPEG" },
        { item: "OCI photo", pixels: "200–900 px, square", maxKb: 200, format: "JPEG/JPG" },
      ],
    },
    sources: [SRC.neet, SRC.jee, SRC.cuet, SRC.oci],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: [
      "resize-image-to-100kb",
      "neet-photo",
      "upsc-photo",
      "us-passport-photo",
    ],
  },
  {
    slug: "resize-image-to-5kb",
    category: "kb",
    name: "Resize image to 5 KB",
    limit: { maxKb: 5 },
    title: "Resize image to 5 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a signature or tiny photo to under 5 KB. FormPic picks the best JPEG quality that fits and shrinks the pixels only if it must. Free, no upload.",
    h1: "Resize image to 5 KB",
    h1Accent: ", tiny but legible.",
    intro:
      "5 KB holds a small signature or a thumbnail-sized face, not much more. Crop tight, and FormPic finds the best JPEG quality that stays under 5 KB.",
    question: "How do I resize an image to 5 KB?",
    answer:
      "Add the image, keep Max file size on 5 KB, and download. FormPic searches for the highest JPEG quality under 5 KB; if even the lowest quality is too big, Shrink to fit lowers the pixel size. Few forms cap uploads this low. In the forms checked here, 5 KB turns up as a minimum instead: GATE 2027 accepts photos from 5 KB, and CTET signatures from 3 KB.",
    facts: [
      { label: "Limit", value: "5 KB", note: "under 5,000 bytes" },
      { label: "Fits", value: "≈ 150 × 60 px", note: "a signature, cropped close" },
      { label: "Format", value: "JPEG", note: "smallest for photos" },
    ],
    spec: {
      title: "Where 5 KB shows up in official specs",
      rows: [
        { item: "GATE 2027 photo", pixels: "200 × 260 to 530 × 690 px", minKb: 5, maxKb: 600, format: "JPEG", notes: "5 KB is the minimum" },
        { item: "CTET signature", printSize: "3.5 × 1.5 cm", minKb: 3, maxKb: 30, format: "JPG/JPEG", notes: "5 KB fits inside" },
      ],
    },
    requirements: {
      title: "Getting an image under 5 KB",
      items: [
        "Crop to the signature or face only. At 5 KB every pixel of background costs you detail.",
        "Use a small pixel size: a signature around 150 × 60 px or a face around 100 × 120 px.",
        "Shoot on plain white with even light. Flat areas cost almost nothing to store.",
        "Sign with a thick, dark pen so the line survives heavy compression.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: { title: "How to resize an image to 5 KB" },
    faqs: [
      {
        question: "Can a photo fit in 5 KB?",
        answer:
          "Only a small one. Around 100 × 120 pixels a face stays recognisable at 5 KB. If a form wants a larger photo under 5 KB, check the limit again: most photo limits are 20 KB or more.",
      },
      {
        question: "Why does FormPic shrink my image?",
        answer:
          "It only does when you press Shrink to fit, after the lowest JPEG quality still doesn't fit. Fewer pixels is the only way left to reach 5 KB.",
      },
      ...limitFaqs(5),
    ],
    sources: [SRC.gate, SRC.ctet],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["resize-image-to-10kb", "resize-image-to-15kb", "ctet-photo", "gate-photo"],
  },
  {
    slug: "resize-image-to-15kb",
    category: "kb",
    name: "Resize image to 15 KB",
    limit: { maxKb: 15 },
    title: "Resize image to 15 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a signature or photo to under 15 KB, the safe middle of 10–20 KB form limits. Best JPEG quality that fits, free, and the image is never uploaded.",
    h1: "Resize image to 15 KB",
    h1Accent: ", the safe middle.",
    intro:
      "Aim for 15 KB when a form asks for 10 to 20 KB: it clears the minimum and stays well under the maximum. FormPic finds the best quality that fits.",
    question: "How do I resize an image to 15 KB?",
    answer:
      "Add the image, keep Max file size on 15 KB, and download. FormPic picks the highest JPEG quality under 15 KB and shows the final size on the Download button. 15 KB isn't a limit itself in the forms checked here, but it's the middle of the 10–20 KB range SSC, IBPS and SBI use for signatures, so a 15 KB file passes those checks with room either side.",
    facts: [
      { label: "Limit", value: "15 KB", note: "under 15,000 bytes" },
      { label: "Inside", value: "10–20 KB", note: "SSC, IBPS, SBI signatures" },
      { label: "Format", value: "JPEG", note: "what portals accept" },
    ],
    spec: {
      title: "Forms where 15 KB passes",
      rows: [
        { item: "SSC signature", printSize: "about 6.0 × 2.0 cm", minKb: 10, maxKb: 20, format: "JPEG/JPG" },
        { item: "IBPS and SBI signature", pixels: "140 × 60 px", minKb: 10, maxKb: 20, format: "JPG/JPEG" },
        { item: "PAN card photo (Protean)", printSize: "2.5 × 3.5 cm", maxKb: 20, format: "JPEG" },
      ],
    },
    requirements: {
      title: "Hitting 15 KB cleanly",
      items: [
        "Crop close. A signature strip or head-and-shoulders crop leaves the bytes for detail.",
        "Type the form's pixel size first, then let FormPic fit the file size.",
        "If the file lands well under 10 KB, it's too small for a 10–20 KB form: press Enlarge to fit or set a 10 KB minimum.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: { title: "How to resize an image to 15 KB" },
    faqs: [
      {
        question: "Why aim for 15 KB instead of 20 KB?",
        answer:
          "Portals count a KB as either 1,000 or 1,024 bytes, and some re-check the file after upload. Landing in the middle of a 10–20 KB range passes every reading.",
      },
      {
        question: "My signature is only 6 KB. How do I reach 15 KB?",
        answer:
          "Type 10 into Min file size, or use the 10–20 KB range page. FormPic raises the quality, and Enlarge to fit adds pixels if needed.",
      },
      ...limitFaqs(15),
    ],
    sources: [SRC.ssc, SRC.ibps, SRC.pan],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["resize-image-10kb-to-20kb", "resize-image-to-10kb", "resize-image-to-20kb", "ssc-signature"],
  },
  {
    slug: "resize-image-to-30kb",
    category: "kb",
    name: "Resize image to 30 KB",
    limit: { maxKb: 30 },
    title: "Resize image to 30 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a photo or signature to under 30 KB, the CTET signature limit. FormPic picks the highest JPEG quality that fits, in your browser, free.",
    h1: "Resize image to 30 KB",
    h1Accent: ", CTET signatures too.",
    intro:
      "Add a photo or signature and FormPic compresses it to just under 30 KB, at the highest quality that fits. Nothing leaves your browser.",
    question: "How do I resize an image to 30 KB?",
    answer:
      "Add the image, keep Max file size on 30 KB, and download. FormPic finds the highest JPEG quality under 30 KB and shrinks the pixels only if you press Shrink to fit. 30 KB is the CTET signature maximum (3–30 KB). It's also the RRB signature minimum, so for RRB you need a file above 30 KB, not below.",
    facts: [
      { label: "Limit", value: "30 KB", note: "under 30,000 bytes" },
      { label: "CTET signature", value: "3–30 KB", note: "3.5 × 1.5 cm" },
      { label: "RRB signature", value: "30–49 KB", note: "30 KB is the floor" },
    ],
    spec: {
      title: "Forms with a 30 KB limit",
      rows: [
        { item: "CTET signature", printSize: "3.5 × 1.5 cm", minKb: 3, maxKb: 30, format: "JPG/JPEG" },
        { item: "RRB signature", printSize: "35 × 20 mm box", minKb: 30, maxKb: 49, format: "JPG/JPEG", notes: "30 KB is the minimum" },
      ],
    },
    requirements: {
      title: "Getting a sharp image under 30 KB",
      items: [
        "Crop to what the form needs, so no bytes go to background.",
        "For a photo, about 300 × 385 pixels holds a clear face in 30 KB.",
        "For a signature, 30 KB is generous: you can keep a large, crisp scan.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: { title: "How to resize an image to 30 KB" },
    faqs: [
      {
        question: "Is 30 KB enough for an RRB signature?",
        answer:
          "It's the minimum, not the maximum. RRB asks for 30 to 49 KB, so use the RRB signature page, which keeps the file inside that range.",
      },
      {
        question: "How do I make my CTET signature under 30 KB?",
        answer:
          "Crop to the signature, unlock the aspect ratio and type 413 × 177 px for 3.5 × 1.5 cm at 300 DPI, then download with this 30 KB limit.",
      },
      ...limitFaqs(30),
    ],
    sources: [SRC.ctet, SRC.rrb],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["ctet-photo", "rrb-signature", "resize-image-to-20kb", "resize-image-to-40kb"],
  },
  {
    slug: "resize-image-to-40kb",
    category: "kb",
    name: "Resize image to 40 KB",
    limit: { maxKb: 40 },
    title: "Resize image to 40 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a photo or signature to under 40 KB, the safe middle of RRB's 30–49 KB signature range. Best JPEG quality that fits, free and never uploaded.",
    h1: "Resize image to 40 KB",
    h1Accent: ", mid-range.",
    intro:
      "A 40 KB file sits comfortably inside a 30–49 KB range, like RRB's signature limit. FormPic finds the best quality under 40 KB, in your browser.",
    question: "How do I resize an image to 40 KB?",
    answer:
      "Add the image, keep Max file size on 40 KB, and download. FormPic searches for the highest JPEG quality under 40 KB and shows the size on the Download button. In the forms checked here, 40 KB isn't a limit on its own, but it's the middle of RRB's 30–49 KB signature range, and it fits under the 50 KB IBPS and SBI photo limit.",
    facts: [
      { label: "Limit", value: "40 KB", note: "under 40,000 bytes" },
      { label: "Inside", value: "30–49 KB", note: "RRB signature" },
      { label: "Also under", value: "50 KB", note: "IBPS and SBI photo" },
    ],
    spec: {
      title: "Forms where 40 KB passes",
      rows: [
        { item: "RRB signature", printSize: "35 × 20 mm box", minKb: 30, maxKb: 49, format: "JPG/JPEG" },
        { item: "IBPS and SBI photo", pixels: "200 × 230 px", minKb: 20, maxKb: 50, format: "JPG/JPEG" },
      ],
    },
    requirements: {
      title: "Getting a clean 40 KB file",
      items: [
        "If the form has a minimum too, set it in Min file size so FormPic stays above it.",
        "A signature may not reach 40 KB on its own; Enlarge to fit adds pixels when it falls short of a minimum.",
        "A phone photo needs Shrink to fit or the form's pixel size to get down to 40 KB.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: { title: "How to resize an image to 40 KB" },
    faqs: [
      {
        question: "Can I use 40 KB for an RRB signature?",
        answer:
          "Yes, 40 KB is inside RRB's 30–49 KB range. The RRB signature page sets both limits and the 35 × 20 mm crop for you.",
      },
      {
        question: "Why is my file much smaller than 40 KB?",
        answer:
          "40 KB is a maximum. A small or simple image can come out well below it. If the form also has a minimum, type it into Min file size.",
      },
      ...limitFaqs(40),
    ],
    sources: [SRC.rrb, SRC.ibps],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["rrb-signature", "resize-image-to-30kb", "resize-image-to-50kb", "rrb-ntpc-photo"],
  },
  {
    slug: "resize-image-to-150kb",
    category: "kb",
    name: "Resize image to 150 KB",
    limit: { maxKb: 150 },
    title: "Resize image to 150 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a photo or scan to under 150 KB at the best JPEG quality that fits. Room under 200 KB exam limits, free, works on phones, nothing uploaded.",
    h1: "Resize image to 150 KB",
    h1Accent: ", room to spare.",
    intro:
      "150 KB keeps a full-colour passport photo sharp and leaves a margin under 200 KB limits. FormPic finds the best quality that fits, in your browser.",
    question: "How do I resize an image to 150 KB?",
    answer:
      "Add the image, keep Max file size on 150 KB, and download. FormPic picks the highest JPEG quality under 150 KB; a phone photo straight from the camera may also need Shrink to fit. None of the forms checked here sets 150 KB itself, but NEET (UG), JEE (Main) and CUET photos go up to 200 KB, so a 150 KB file passes them with room to spare.",
    facts: [
      { label: "Limit", value: "150 KB", note: "under 150,000 bytes" },
      { label: "Under", value: "200 KB", note: "NEET, JEE, CUET photos" },
      { label: "Format", value: "JPEG", note: "for photos" },
    ],
    spec: {
      title: "Forms where 150 KB passes",
      rows: [
        { item: "NEET (UG) 2026 photo", minKb: 10, maxKb: 200, format: "JPG" },
        { item: "JEE (Main) 2026 photo", minKb: 10, maxKb: 200, format: "JPG/JPEG" },
        { item: "CUET (UG) 2026 photo", minKb: 10, maxKb: 200, format: "JPG/JPEG" },
      ],
    },
    requirements: {
      title: "Getting a sharp photo under 150 KB",
      items: [
        "Crop to head and shoulders first; the face gets the bytes.",
        "At passport size (413 × 531 px), 150 KB is near full quality.",
        "For a document scan, crop to the page edges and rotate it upright before downloading.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: { title: "How to resize an image to 150 KB" },
    faqs: [
      {
        question: "Why not just use 200 KB for NEET?",
        answer:
          "You can; the NEET (UG) page uses the exact 10–200 KB range. 150 KB is useful when you want margin, or when a form's limit is 150 KB.",
      },
      {
        question: "Will the photo lose quality at 150 KB?",
        answer:
          "Hardly, at the sizes forms ask for. A 413 × 531 px photo is close to maximum quality at 150 KB.",
      },
      ...limitFaqs(150),
    ],
    sources: [SRC.neet, SRC.jee, SRC.cuet],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["resize-image-to-100kb", "resize-image-to-200kb", "neet-photo", "jee-main-photo"],
  },
  {
    slug: "resize-image-to-300kb",
    category: "kb",
    name: "Resize image to 300 KB",
    limit: { maxKb: 300 },
    title: "Resize image to 300 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a photo or signature to under 300 KB, the UPSC and GATE signature maximum. Best JPEG quality that fits, free, and nothing is uploaded.",
    h1: "Resize image to 300 KB",
    h1Accent: ", UPSC-ready.",
    intro:
      "Add a photo and FormPic compresses it to just under 300 KB, the most UPSC accepts. A phone photo usually needs only a little compression to fit.",
    question: "How do I resize an image to 300 KB?",
    answer:
      "Add the photo, keep Max file size on 300 KB, and download. FormPic finds the highest JPEG quality under 300 KB. 300 KB is the upper limit for UPSC photos and signatures (20–300 KB, 350 to 1000 pixels per side) and for GATE 2027 signatures (3–300 KB). JEE (Main) also caps the Class 10 certificate at 300 KB, but that one is a PDF.",
    facts: [
      { label: "Limit", value: "300 KB", note: "under 300,000 bytes" },
      { label: "UPSC", value: "20–300 KB", note: "photo and signature" },
      { label: "GATE signature", value: "3–300 KB", note: "250 × 80 to 580 × 180 px" },
    ],
    spec: {
      title: "Forms with a 300 KB limit",
      rows: [
        { item: "UPSC photo and signature", pixels: "350–1000 px per side", minKb: 20, maxKb: 300, format: "JPG" },
        { item: "GATE 2027 signature", pixels: "250 × 80 to 580 × 180 px", minKb: 3, maxKb: 300, format: "JPEG/JPG" },
        { item: "JEE (Main) 2026 Class 10 certificate", minKb: 50, maxKb: 300, format: "PDF", notes: "A PDF, not an image" },
      ],
    },
    requirements: {
      title: "Getting under 300 KB",
      items: [
        "For UPSC, keep each side between 350 and 1000 pixels; a 1000 × 1000 photo fits in 300 KB at high quality.",
        "A full-resolution phone photo is several megabytes; type the form's pixel size first.",
        "Check the minimum too: UPSC refuses files under 20 KB.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: { title: "How to resize an image to 300 KB" },
    faqs: [
      {
        question: "Can FormPic make a 300 KB PDF?",
        answer:
          "No, FormPic saves JPEG or PNG. For a PDF under a limit, convert the compressed JPEG with your phone's print-to-PDF option.",
      },
      {
        question: "What pixel size should a UPSC photo be at 300 KB?",
        answer:
          "Anything from 350 to 1000 pixels per side. The UPSC page uses 413 × 531 px, passport size at 300 DPI, which comes out far under 300 KB.",
      },
      ...limitFaqs(300),
    ],
    sources: [SRC.upsc, SRC.gate, SRC.jee],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["upsc-photo", "gate-photo", "resize-image-to-200kb", "350x350-pixels"],
  },
  {
    slug: "resize-image-10kb-to-20kb",
    category: "kb",
    name: "Resize image to 10–20 KB",
    limit: { minKb: 10, maxKb: 20 },
    title: "Resize image between 10 KB and 20 KB",
    metaDescription:
      "Get a signature or photo between 10 and 20 KB for SSC, IBPS and SBI forms. FormPic stays under 20 KB and lifts small files over 10 KB. Free, no upload.",
    h1: "Resize image to 10–20 KB",
    h1Accent: ", both limits.",
    intro:
      "Forms with a 10–20 KB range reject files that are too small as well as too big. FormPic keeps under 20 KB and lifts small files over 10 KB.",
    question: "How do I get an image between 10 KB and 20 KB?",
    answer:
      "Add the image; both limits are already set. FormPic picks the highest JPEG quality under 20 KB, and if the file is under 10 KB even at full quality, Enlarge to fit adds pixels until it passes. SSC (CGL, CHSL, MTS, GD) and IBPS and SBI all ask for signatures between 10 KB and 20 KB.",
    facts: [
      { label: "Range", value: "10–20 KB", note: "min and max" },
      { label: "Typical use", value: "Signatures", note: "SSC, IBPS, SBI" },
      { label: "Too small?", value: "Enlarge to fit", note: "adds pixels" },
    ],
    spec: {
      title: "Forms with a 10–20 KB range",
      rows: [
        { item: "SSC signature (CGL, CHSL, MTS, GD)", printSize: "about 6.0 × 2.0 cm", minKb: 10, maxKb: 20, format: "JPEG/JPG" },
        { item: "IBPS signature", pixels: "140 × 60 px", minKb: 10, maxKb: 20, format: "JPG/JPEG" },
        { item: "SBI PO and Clerk 2026 signature", pixels: "140 × 60 px", minKb: 10, maxKb: 20, format: "JPG/JPEG" },
      ],
    },
    requirements: {
      title: "Staying inside 10–20 KB",
      items: [
        "Signatures on white often land under 10 KB. That's the usual failure, not being too big.",
        "Set the form's pixel size first; a bigger pixel size raises the file size.",
        "If the form fixes the pixels, FormPic raises JPEG quality before adding pixels.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: {
      title: "How to resize an image to 10–20 KB",
      items: [
        { name: "Add the image", detail: "Add your signature or photo. The 10 KB minimum and 20 KB maximum are already on." },
        { name: "Crop it", detail: "Drag the crop close around the signature or face, then type the form's pixel size if it gives one." },
        { name: "Read the status", detail: "FormPic shows the quality it picked. If it says Under the 10 KB minimum, press Enlarge to fit." },
        { name: "Download", detail: "The Download button shows a size between 10 and 20 KB." },
      ],
    },
    faqs: [
      {
        question: "Why does FormPic count 10 KB as 10,240 bytes?",
        answer:
          "For a minimum, the stricter reading is 1,024 bytes per KB, so 10 KB becomes 10,240 bytes. For the maximum, the stricter reading is 1,000, so 20 KB means under 20,000 bytes. The file passes either way.",
      },
      {
        question: "Enlarge to fit changed my pixel size. Is that allowed?",
        answer:
          "For SSC, which gives the signature in centimetres as an approximate size, yes. IBPS and SBI call 140 × 60 px preferred, not fixed. If a form insists on exact pixels, raise the size of the signature on paper instead.",
      },
      {
        question: "Is my image uploaded?",
        answer: "No. FormPic compresses it inside your browser.",
      },
    ],
    sources: [SRC.ssc, SRC.ibps, SRC.sbi],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["ssc-signature", "ibps-signature", "resize-image-to-15kb", "resize-image-20kb-to-50kb"],
  },
  {
    slug: "resize-image-20kb-to-50kb",
    category: "kb",
    name: "Resize image to 20–50 KB",
    limit: { minKb: 20, maxKb: 50 },
    title: "Resize image between 20 KB and 50 KB",
    metaDescription:
      "Get a photo or thumb impression between 20 and 50 KB for IBPS and SBI forms. FormPic keeps under 50 KB and lifts small files over 20 KB. Free, no upload.",
    h1: "Resize image to 20–50 KB",
    h1Accent: ", bank exam range.",
    intro:
      "IBPS and SBI want photos and thumb impressions between 20 and 50 KB. FormPic keeps the file inside both limits, in your browser.",
    question: "How do I get an image between 20 KB and 50 KB?",
    answer:
      "Add the image; the 20 KB minimum and 50 KB maximum are already set. FormPic picks the highest JPEG quality under 50 KB, and raises it, or adds pixels with Enlarge to fit, if the file is under 20 KB. IBPS and SBI use this range for the photo (200 × 230 px) and the left thumb impression (240 × 240 px).",
    facts: [
      { label: "Range", value: "20–50 KB", note: "min and max" },
      { label: "Photo", value: "200 × 230 px", note: "IBPS and SBI" },
      { label: "Thumb", value: "240 × 240 px", note: "IBPS and SBI" },
    ],
    spec: {
      title: "Forms with a 20–50 KB range",
      rows: [
        { item: "IBPS and SBI photo", pixels: "200 × 230 px", minKb: 20, maxKb: 50, format: "JPG/JPEG" },
        { item: "IBPS and SBI left thumb impression", pixels: "240 × 240 px", dpi: 200, minKb: 20, maxKb: 50, format: "JPG/JPEG" },
      ],
    },
    requirements: {
      title: "Staying inside 20–50 KB",
      items: [
        "A 200 × 230 px photo is small, so the 20 KB floor is the limit you're most likely to miss.",
        "Plain backgrounds compress the most. A slightly textured wall raises the size naturally.",
        "Type the form's pixels first, then let FormPic fit the range.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: {
      title: "How to resize an image to 20–50 KB",
      items: [
        { name: "Add the image", detail: "Add your photo or thumb impression. Both limits are on." },
        { name: "Set the pixels", detail: "Type 200 × 230 for a bank photo or 240 × 240 for a thumb impression, or pick the preset." },
        { name: "Fix a small file", detail: "If the status says Under the 20 KB minimum, press Enlarge to fit." },
        { name: "Download", detail: "The Download button shows a size between 20 and 50 KB." },
      ],
    },
    faqs: [
      {
        question: "Why is my 200 × 230 photo under 20 KB?",
        answer:
          "46,000 pixels on a plain background compress very well. FormPic raises the JPEG quality first, then Enlarge to fit adds pixels in proportion. IBPS and SBI call 200 × 230 the preferred size.",
      },
      {
        question: "Can I use this range for the IBPS signature?",
        answer:
          "No. The signature is 10–20 KB. Use the 10–20 KB page or the IBPS signature page.",
      },
      {
        question: "Is my image uploaded?",
        answer: "No. FormPic compresses it inside your browser.",
      },
    ],
    sources: [SRC.ibps, SRC.sbi],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["ibps-photo", "200x230-pixels", "thumb-impression-resize", "resize-image-50kb-to-100kb"],
  },
  {
    slug: "resize-image-50kb-to-100kb",
    category: "kb",
    name: "Resize image to 50–100 KB",
    limit: { minKb: 50, maxKb: 100 },
    title: "Resize image between 50 KB and 100 KB",
    metaDescription:
      "Get a scan or photo between 50 and 100 KB, like the IBPS and SBI hand-written declaration. FormPic keeps both limits, in your browser. Free, no upload.",
    h1: "Resize image to 50–100 KB",
    h1Accent: ", declarations too.",
    intro:
      "The hand-written declaration for IBPS and SBI must be between 50 and 100 KB. FormPic keeps any image inside that range without uploading it.",
    question: "How do I get an image between 50 KB and 100 KB?",
    answer:
      "Add the image; the 50 KB minimum and 100 KB maximum are already set. FormPic picks the highest JPEG quality under 100 KB, and if that's under 50 KB, Enlarge to fit adds pixels. IBPS and SBI use this range for the hand-written declaration, 800 × 400 px at 200 DPI (10 × 5 cm).",
    facts: [
      { label: "Range", value: "50–100 KB", note: "min and max" },
      { label: "Declaration", value: "800 × 400 px", note: "10 × 5 cm at 200 DPI" },
      { label: "Format", value: "JPEG", note: "JPG or JPEG" },
    ],
    spec: {
      title: "Forms with a 50–100 KB range",
      rows: [
        {
          item: "IBPS and SBI hand-written declaration",
          printSize: "10 × 5 cm",
          pixels: "800 × 400 px",
          dpi: 200,
          minKb: 50,
          maxKb: 100,
          format: "JPG/JPEG",
          notes: "In English, black ink, not in capital letters",
        },
      ],
    },
    requirements: {
      title: "Making a declaration that fits",
      items: [
        "Write the declaration on white paper in black ink, in English, and not in capital letters.",
        "Photograph it flat in daylight so the paper stays white and the text sharp.",
        "Crop to the text, unlock the aspect ratio and type 800 × 400 px.",
      ],
      note: LIMIT_TIPS_NOTE,
    },
    steps: {
      title: "How to resize an image to 50–100 KB",
      items: [
        { name: "Add the scan", detail: "Add a photo of your declaration or document. Both limits are on." },
        { name: "Crop and size", detail: "Crop to the writing, unlock the aspect ratio, and type 800 × 400 for a bank declaration." },
        { name: "Check the range", detail: "Black text on white is light; if it's under 50 KB, press Enlarge to fit." },
      ],
    },
    faqs: [
      {
        question: "Why is my declaration under 50 KB?",
        answer:
          "Text on white paper has little detail, so it compresses small. FormPic raises the quality first, then Enlarge to fit adds pixels. IBPS and SBI call 800 × 400 the preferred size.",
      },
      {
        question: "What's the IBPS declaration text?",
        answer:
          "IBPS gives it in the scanning guidelines: \"I, (name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.\"",
      },
      {
        question: "Is my image uploaded?",
        answer: "No. FormPic compresses it inside your browser.",
      },
    ],
    sources: [SRC.ibps, SRC.sbi],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["ibps-photo", "sbi-po-photo", "resize-image-to-100kb", "resize-image-20kb-to-50kb"],
  },
  {
    slug: "increase-image-size-in-kb",
    category: "kb",
    name: "Increase image size in KB",
    limit: { minKb: 20 },
    title: "Increase image size in KB (raise a small file)",
    metaDescription:
      "Make a photo or signature bigger in KB to pass a form's minimum, like UPSC's 20 KB or RRB's 30 KB. Raises quality, then pixels. Free, never uploaded.",
    h1: "Increase image size in KB",
    h1Accent: ", to pass the minimum.",
    intro:
      "Some forms reject files that are too small. Set the minimum, and FormPic raises the JPEG quality, then adds pixels, until the file is big enough.",
    question: "How do I increase an image's size in KB?",
    answer:
      "Add the image and type the form's minimum into Min file size; it starts at 20 KB. FormPic first raises the JPEG quality, up to 100%. If the file is still too small, press Enlarge to fit and it adds pixels in proportion, without stretching, until the file passes. Forms with minimums include UPSC (20 KB), RRB signatures (30 KB), the UK passport digital photo (50 KB) and Australian visas (70 KB).",
    facts: [
      { label: "Step 1", value: "Quality up", note: "to 100% JPEG" },
      { label: "Step 2", value: "More pixels", note: "Enlarge to fit" },
      { label: "Starts at", value: "20 KB", note: "type any minimum" },
    ],
    spec: {
      title: "Forms with a minimum file size",
      rows: [
        { item: "UPSC photo and signature", minKb: 20, maxKb: 300, format: "JPG" },
        { item: "IBPS and SBI photo", pixels: "200 × 230 px", minKb: 20, maxKb: 50, format: "JPG/JPEG" },
        { item: "RRB signature", printSize: "35 × 20 mm box", minKb: 30, maxKb: 49, format: "JPG/JPEG" },
        { item: "UK passport digital photo", pixels: "at least 600 × 750 px", minKb: 50, notes: "Up to 10 MB" },
        { item: "Australia visa photo", pixels: "1200 × 1600 px preferred", minKb: 70, format: "JPEG", notes: "Up to 3.5 MB" },
      ],
    },
    requirements: {
      title: "Why files come out too small",
      items: [
        "Signatures and documents on white paper have little detail, so JPEG stores them in very few bytes.",
        "Small pixel sizes, like 140 × 60 or 200 × 230, cap how big the file can get.",
        "Heavily compressed originals, such as photos forwarded on chat apps, have lost detail.",
      ],
      note: "Adding pixels doesn't add real detail; it lets the file meet the form's minimum. Starting from the original camera photo or a fresh scan always looks better.",
    },
    steps: {
      title: "How to increase an image's size in KB",
      items: [
        { name: "Add the image", detail: "Add the photo or signature that's too small." },
        { name: "Set the minimum", detail: "Type the form's minimum into Min file size. Set Max file size too if the form has one." },
        { name: "Let quality rise", detail: "FormPic raises the JPEG quality automatically and tells you when it has." },
        { name: "Enlarge if needed", detail: "If it still says Under the minimum, press Enlarge to fit. The Download button shows the final size." },
      ],
    },
    faqs: [
      {
        question: "Does increasing KB make the photo look better?",
        answer:
          "No. It makes the file bigger so it passes the form's check. Higher JPEG quality keeps a little more detail; extra pixels don't add any.",
      },
      {
        question: "Can I increase the size without changing pixels?",
        answer:
          "Yes, up to a point: FormPic raises the JPEG quality to 100% first. Past that, only more pixels make the file bigger.",
      },
      {
        question: "Why not just add a border or noise?",
        answer:
          "Forms check that the photo shows you clearly; borders and noise can get it rejected. FormPic only raises quality and resizes.",
      },
      {
        question: "Will PNG make the file bigger?",
        answer:
          "Usually much bigger, but most forms that set a minimum also require JPEG. Stay on JPEG unless the form accepts PNG.",
      },
      {
        question: "Is my image uploaded?",
        answer: "No. FormPic works inside your browser.",
      },
    ],
    sources: [SRC.upsc, SRC.ibps, SRC.rrb, SRC.uk, SRC.australia],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["rrb-signature", "upsc-photo", "resize-image-10kb-to-20kb", "uk-passport-photo"],
  },
];
