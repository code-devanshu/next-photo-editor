import type { Faq, PageEntry, PresetFields, SpecRow } from "@/lib/pages/types";

// RRB notices give a 35 × 20 mm signature box, at least 140 × 60 px and 30–49 KB. At 300 DPI the box
// is 413 × 236 px, which clears the pixel minimum and gives the JPEG enough detail to reach 30 KB.
function rrbSignature(name: string): PresetFields {
  return {
    name,
    kind: "signature",
    spec: "35×20 mm",
    printMm: { width: 35, height: 20 },
    aspect: 35 / 20,
    width: 413,
    height: 236,
    dpi: 300,
    maxKb: 49,
    minKb: 30,
  };
}

const RRB_SIGNATURE_ROW: SpecRow = {
  item: "Signature",
  printSize: "35 × 20 mm box",
  pixels: "at least 140 × 60 px",
  minKb: 30,
  maxKb: 49,
  format: "JPG/JPEG",
  notes: "Scanned at 100 DPI or more. Black ink on white paper, running handwriting",
};

const RRB_SIGNATURE_REJECTIONS = [
  "A non-white background or ink that isn't black.",
  "A signature in BLOCK, CAPITAL or disjointed letters instead of running handwriting.",
  "Poor resolution, or a signature that's incomplete or partly cut off.",
  "A thumb impression, a blank image, or any image other than the signature.",
  "A signature by anyone other than the applicant.",
];

const NOT_UPLOADED: Faq = {
  question: "Is my signature uploaded to FormPic?",
  answer:
    "No. FormPic crops and compresses the image in your browser, so it never leaves your device. The only place it goes is the RRB application.",
};

export const RAILWAY_PAGES: PageEntry[] = [
  {
    slug: "rrb-ntpc-photo",
    category: "exam",
    name: "RRB NTPC photo & signature",
    preset: rrbSignature("RRB NTPC"),
    title: "RRB NTPC photo & signature size (30–49 KB)",
    metaDescription:
      "RRB NTPC takes a live photo in the form; the signature is a 30–49 KB JPG in a 35 × 20 mm box, at least 140 × 60 px. Resize it free, nothing uploaded.",
    h1: "RRB NTPC photo & signature",
    h1Accent: ", 30 to 49 KB.",
    intro:
      "The NTPC application captures your photo with the camera, so the signature is the file to prepare: a JPG between 30 and 49 KB. Crop and size it here, in your browser.",
    question: "What is the RRB NTPC photo and signature size?",
    answer:
      "Under CEN 06/2025 (NTPC Graduate), RRB doesn't take a photo upload. The application captures a live photo through your webcam or phone's front camera. The signature is a JPG or JPEG between 30 KB and 49 KB, at least 140 × 60 pixels, scanned at 100 DPI or more, in running handwriting with black ink inside a 35 × 20 mm box. If you're called for document verification, you upload a true-colour photo and signature again before your DV date.",
    facts: [
      { label: "Photo", value: "Live capture", note: "webcam or front camera" },
      { label: "Signature", value: "30–49 KB", note: "JPG or JPEG" },
      { label: "Signature box", value: "35 × 20 mm", note: "at least 140 × 60 px" },
      { label: "FormPic size", value: "413 × 236 px", note: "35 × 20 mm at 300 DPI" },
    ],
    spec: {
      title: "RRB NTPC (CEN 06/2025) upload rules",
      rows: [
        {
          item: "Live photo",
          notes:
            "Webcam or front camera. No cap, mask or glasses, eyes fully open, face centred in the frame",
        },
        RRB_SIGNATURE_ROW,
        {
          item: "Photo and signature for DV",
          format: "True-colour scans",
          notes: "Uploaded on the RRB DV portal before your document verification date",
        },
      ],
    },
    requirements: {
      title: "What the NTPC notice asks for",
      items: [
        "Keep the camera at eye level and look straight ahead with a neutral expression.",
        "Your whole face clearly visible and centred in the frame, neither too close nor too far.",
        "No cap, mask or glasses. Your eyes must be fully open, or the photo won't be captured.",
        "Preview the captured photo and retake it if you're not happy, before you submit.",
        "Sign in running handwriting with a black pen. Block or capital letters are rejected.",
      ],
      note: "Your appearance through the whole recruitment, from the exam to the medical, must match the live photo. Your signature must also match the ones taken at the exam, document verification, medical and appointment.",
    },
    steps: {
      title: "How to prepare your RRB NTPC signature",
      items: [
        {
          name: "Draw the box",
          detail: "Draw a 35 × 20 mm rectangle on white paper and sign inside it in black ink, in running handwriting.",
        },
        {
          name: "Photograph or scan",
          detail: "Scan at 100 DPI or more, or photograph it from straight above in daylight.",
        },
        {
          name: "Crop to the box",
          detail:
            "Add it here. The RRB NTPC preset frames the 35 × 20 mm box at 413 × 236 px. Keep the whole signature inside.",
        },
        {
          name: "Reach 30–49 KB",
          detail:
            "The 30 KB minimum is high for a signature. FormPic raises the quality first, and Enlarge to fit adds pixels if that's not enough.",
        },
      ],
    },
    rejections: {
      title: "Why RRB rejects NTPC signatures",
      items: RRB_SIGNATURE_REJECTIONS,
    },
    faqs: [
      {
        question: "Why is my NTPC signature under 30 KB?",
        answer:
          "A black signature on white paper compresses to very few bytes. FormPic first raises the JPEG quality; if the file is still under 30 KB, press Enlarge to fit and it adds pixels, keeping the 35 : 20 shape, until it passes.",
      },
      {
        question: "Can I upload an existing photo for RRB NTPC?",
        answer:
          "No. The photo must be captured live in the application. RRB summarily rejects applications where a printed or digital photo was photographed instead.",
      },
      {
        question: "What photo is needed for document verification?",
        answer:
          "Candidates shortlisted for DV upload scanned copies of their photo and signature in true colour on the RRB DV portal before their DV date, and bring the originals of their documents.",
      },
      {
        question: "Does the 49 KB limit mean 49,000 bytes?",
        answer:
          "Portals differ. FormPic keeps the file under 49,000 bytes, which passes either reading, and counts the 30 KB minimum as 30 × 1,024 bytes, so it passes either way too.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "Railway Recruitment Boards",
        title: "CEN 06/2025: Non-Technical Popular Categories (Graduate)",
        url: "https://rrbsecunderabad.gov.in/wp-content/uploads/2025/10/Final-CEN-06-2025-21-10-2025-Publish.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["rrb-signature", "rrb-group-d-photo", "increase-image-size-in-kb", "resize-image-to-40kb", "ssc-cgl-photo"],
  },
  {
    slug: "rrb-group-d-photo",
    category: "exam",
    name: "RRB Group D photo & signature",
    preset: rrbSignature("RRB Group D"),
    title: "RRB Group D photo & signature size (30–49 KB)",
    metaDescription:
      "RRB Group D (Level 1) captures your photo live; the signature is a 30–49 KB JPG, at least 140 × 60 px, in a 35 × 20 mm box. Resize it free, no upload.",
    h1: "RRB Group D photo & signature",
    h1Accent: ", Level 1.",
    intro:
      "The Level 1 (Group D) application takes your photo with the camera. Prepare the signature here: a 35 × 20 mm crop saved as a JPG between 30 and 49 KB.",
    question: "What is the RRB Group D photo and signature size?",
    answer:
      "CEN 09/2025, the Level 1 (Group D) notice, captures a live photo in the application, so there's no photo file to upload. The signature is a JPG or JPEG between 30 KB and 49 KB, at least 140 × 60 pixels, scanned at 100 DPI or more, signed in running handwriting with a black pen and centred in a 35 × 20 mm box. RRB also asks you to wear non-white, preferably dark, clothing for the live photo, so you stand out from the background.",
    facts: [
      { label: "Photo", value: "Live capture", note: "wear dark clothes" },
      { label: "Signature", value: "30–49 KB", note: "JPG or JPEG" },
      { label: "Signature box", value: "35 × 20 mm", note: "at least 140 × 60 px" },
      { label: "FormPic size", value: "413 × 236 px", note: "35 × 20 mm at 300 DPI" },
    ],
    spec: {
      title: "RRB Group D (CEN 09/2025) upload rules",
      rows: [
        {
          item: "Live photo",
          notes:
            "Webcam or front camera. Non-white, preferably dark clothing. No cap, mask or glasses",
        },
        RRB_SIGNATURE_ROW,
        {
          item: "SC/ST certificate",
          format: "PDF",
          notes: "Only for candidates asking for the free train travel pass",
        },
      ],
    },
    requirements: {
      title: "What the Group D notice asks for",
      items: [
        "Dress in non-white clothing, preferably dark, so you contrast with the background.",
        "Camera at eye level, looking straight ahead with a neutral expression.",
        "Your face centred in the frame, with no part of your head outside it.",
        "No cap, mask or glasses. Preview and retake the photo until you're happy with it.",
        "A signature in running handwriting, not in block, capital or disjointed letters.",
      ],
      note: "Persons with Benchmark Disabilities get relaxations in the portal and can pick the relevant options while capturing the photo.",
    },
    steps: {
      title: "How to prepare your RRB Group D signature",
      items: [
        {
          name: "Sign inside the box",
          detail:
            "Draw a 35 × 20 mm box on white paper and sign in the middle with a black pen. The notice asks for the signature to be centred.",
        },
        {
          name: "Capture the page",
          detail: "Scan at 100 DPI or more, or photograph it straight on in daylight.",
        },
        {
          name: "Crop with the preset",
          detail:
            "Add it here. The RRB Group D preset crops the 35 × 20 mm box to 413 × 236 px, well over the 140 × 60 px minimum.",
        },
        {
          name: "Download 30–49 KB",
          detail:
            "Check the size on the Download button. If it's under 30 KB, press Enlarge to fit.",
        },
      ],
    },
    rejections: {
      title: "Why RRB rejects Group D signatures",
      items: RRB_SIGNATURE_REJECTIONS,
    },
    faqs: [
      {
        question: "What should I wear for the Group D live photo?",
        answer:
          "The notice asks for non-white clothing, preferably dark, so you stand out from the background. Skip the cap, mask and glasses.",
      },
      {
        question: "Is the Group D signature the same as NTPC?",
        answer:
          "Yes. CEN 09/2025 and CEN 06/2025 both ask for a 30 to 49 KB JPG, at least 140 × 60 pixels, in a 35 × 20 mm box, signed in running handwriting with black ink.",
      },
      {
        question: "How do I get a signature up to 30 KB?",
        answer:
          "FormPic raises the JPEG quality first, then Enlarge to fit adds pixels. The 413 × 236 px preset usually needs one press of Enlarge to fit for a clean signature on white paper.",
      },
      {
        question: "Can I put a thumb impression instead of signing?",
        answer:
          "No. The notice lists a thumb impression in place of the signature as a ground for rejection.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "Railway Recruitment Boards",
        title: "CEN 09/2025: recruitment to Level 1 posts",
        url: "https://rrbsecunderabad.gov.in/wp-content/uploads/2026/01/Final-Detailed-CEN-09-2025-Level-1-updated-on-30.01.2026.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["rrb-signature", "rrb-ntpc-photo", "increase-image-size-in-kb", "resize-image-to-40kb", "ssc-gd-photo"],
  },
  {
    slug: "rrb-signature",
    category: "signature",
    name: "RRB signature",
    preset: rrbSignature("RRB signature"),
    title: "RRB signature resize (30–49 KB, 35×20 mm)",
    metaDescription:
      "Resize your signature for Railway Recruitment Board forms: a 30–49 KB JPG in a 35 × 20 mm box, at least 140 × 60 px, in running handwriting. No upload.",
    h1: "RRB signature resizer",
    h1Accent: ", 30 to 49 KB.",
    intro:
      "Current RRB notices ask for one signature file: a JPG between 30 and 49 KB, cropped to a 35 × 20 mm box. Make it here; nothing is uploaded.",
    question: "What is the RRB signature size?",
    answer:
      "Recent RRB notices, including CEN 06/2025 (NTPC Graduate) and CEN 09/2025 (Level 1), ask for the signature as a JPG or JPEG between 30 KB and 49 KB, at least 140 pixels wide and 60 pixels high, scanned at 100 DPI or more. Sign in running handwriting with a black pen on white paper, and centre it inside a 35 × 20 mm box.",
    facts: [
      { label: "File", value: "30–49 KB", note: "JPG or JPEG" },
      { label: "Pixels", value: "≥ 140 × 60 px", note: "minimum" },
      { label: "Box", value: "35 × 20 mm", note: "signature centred" },
      { label: "Scan", value: "100 DPI", note: "or more" },
    ],
    spec: { title: "RRB signature specification", rows: [RRB_SIGNATURE_ROW] },
    steps: {
      title: "How to make an RRB signature",
      items: [
        {
          name: "Use a black pen",
          detail: "Sign on white paper with a black pen. Blue ink is a ground for rejection.",
        },
        {
          name: "Write it joined up",
          detail:
            "Use running (cursive) handwriting, not block, capital or disjointed letters. Keep it inside a 35 × 20 mm box.",
        },
        {
          name: "Crop to the box",
          detail: "Add a scan or photo here. The preset crops the box to 413 × 236 px.",
        },
        {
          name: "Land between 30 and 49 KB",
          detail:
            "FormPic picks the highest quality under 49 KB. If the file is below 30 KB, Enlarge to fit adds pixels until it passes.",
        },
      ],
    },
    rejections: { title: "Grounds RRB lists for rejecting signatures", items: RRB_SIGNATURE_REJECTIONS },
    faqs: [
      {
        question: "Why does RRB want at least 30 KB for a signature?",
        answer:
          "The notice doesn't give a reason. A higher floor means a more detailed scan, and RRB compares your uploaded signature with the ones you sign at the exam, document verification, medical and appointment.",
      },
      {
        question: "My signature is bigger than 49 KB. How do I shrink it?",
        answer:
          "FormPic lowers the JPEG quality to fit under 49 KB. If even the lowest quality is too big, press Shrink to fit to lower the pixel size, which stays above 140 × 60 px.",
      },
      {
        question: "Does RRB still use the old 10–40 KB signature size?",
        answer:
          "Not in CEN 06/2025 or CEN 09/2025, which both say 30 to 49 KB. Older notices used other limits, so always check the notice you're applying under.",
      },
      {
        question: "Can I use blue ink?",
        answer:
          "No. Current notices list non-black ink as a ground for rejection.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "Railway Recruitment Boards",
        title: "CEN 09/2025: recruitment to Level 1 posts",
        url: "https://rrbsecunderabad.gov.in/wp-content/uploads/2026/01/Final-Detailed-CEN-09-2025-Level-1-updated-on-30.01.2026.pdf",
      },
      {
        publisher: "Railway Recruitment Boards",
        title: "CEN 06/2025: Non-Technical Popular Categories (Graduate)",
        url: "https://rrbsecunderabad.gov.in/wp-content/uploads/2025/10/Final-CEN-06-2025-21-10-2025-Publish.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["rrb-ntpc-photo", "rrb-group-d-photo", "increase-image-size-in-kb", "resize-image-to-40kb", "ibps-signature"],
  },
];
