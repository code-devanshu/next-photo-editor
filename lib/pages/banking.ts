import type { Faq, PageEntry, PresetFields, SpecRow } from "@/lib/pages/types";

// SBI and IBPS publish the same four uploads in pixels at 200 DPI, so the crop follows the pixels.
const BANK_PHOTO: Omit<PresetFields, "name"> = {
  spec: "200×230 px",
  printMm: { width: 35, height: 45 },
  aspect: 200 / 230,
  width: 200,
  height: 230,
  maxKb: 50,
  minKb: 20,
};

const BANK_UPLOADS: SpecRow[] = [
  {
    item: "Photograph",
    pixels: "200 × 230 px (preferred)",
    minKb: 20,
    maxKb: 50,
    format: "JPG/JPEG",
    background: "Light-coloured, preferably white",
  },
  {
    item: "Signature",
    pixels: "140 × 60 px (preferred)",
    minKb: 10,
    maxKb: 20,
    format: "JPG/JPEG",
    notes: "Black ink on white paper, not in capital letters",
  },
  {
    item: "Left thumb impression",
    printSize: "3 × 3 cm",
    pixels: "240 × 240 px",
    dpi: 200,
    minKb: 20,
    maxKb: 50,
    format: "JPG/JPEG",
    notes: "Black or blue ink on white paper",
  },
  {
    item: "Hand-written declaration",
    printSize: "10 × 5 cm",
    pixels: "800 × 400 px",
    dpi: 200,
    minKb: 50,
    maxKb: 100,
    format: "JPG/JPEG",
    notes: "In English, black ink, not in capital letters",
  },
];

const NOT_UPLOADED: Faq = {
  question: "Is my photo uploaded to FormPic?",
  answer:
    "No. FormPic crops and compresses the image in your browser, so it never leaves your device. The only place it goes is the bank's application form.",
};

export const BANKING_PAGES: PageEntry[] = [
  {
    slug: "sbi-po-photo",
    category: "exam",
    name: "SBI PO photo",
    preset: { name: "SBI PO", ...BANK_PHOTO },
    title: "SBI PO photo & signature size (200×230 px)",
    metaDescription:
      "Resize your photo for SBI PO 2026: 200 × 230 px, 20–50 KB JPEG, plus the signature, thumb and declaration sizes from the official advertisement. No upload.",
    h1: "SBI PO photo resizer",
    h1Accent: ", 200 × 230 px.",
    intro:
      "Crop your photo to the size the SBI Probationary Officer application asks for and download a JPEG between 20 and 50 KB. Everything happens in your browser.",
    question: "What size is the SBI PO photo?",
    answer:
      "The SBI PO 2026 advertisement (CRPD/PO/2026-27/09) asks for a recent passport style colour photo, preferably 200 × 230 pixels, as a JPG or JPEG between 20 KB and 50 KB, against a light, preferably white, background. You also capture a live photo with your webcam or phone, and keep about 8 prints of the uploaded photo for the later stages.",
    facts: [
      { label: "Photo", value: "200 × 230 px", note: "preferred" },
      { label: "Photo file", value: "20–50 KB", note: "JPG or JPEG" },
      { label: "Signature", value: "140 × 60 px", note: "10–20 KB" },
      { label: "Left thumb", value: "240 × 240 px", note: "20–50 KB" },
      { label: "Declaration", value: "800 × 400 px", note: "50–100 KB" },
    ],
    spec: { title: "SBI PO 2026 upload sizes", rows: BANK_UPLOADS },
    requirements: {
      title: "SBI PO photo rules",
      items: [
        "A recent passport style colour photo, taken against a light-coloured, preferably white, background.",
        "Look straight at the camera with a relaxed face. No harsh shadows, squinting or red-eye.",
        "Glasses only without reflections, with your eyes clearly visible. No caps, hats or dark glasses.",
        "Religious headwear is allowed if it doesn't cover your face.",
        "Keep about 8 copies of the same photo. SBI asks for them later in the selection process.",
      ],
    },
    steps: {
      title: "How to make your SBI PO uploads",
      items: [
        {
          name: "Photo",
          detail:
            "Add a recent photo here. The SBI PO preset crops to 200 × 230 px and keeps the JPEG between 20 and 50 KB.",
        },
        {
          name: "Signature",
          detail:
            "Sign in black ink on white paper, not in capitals. Choose Free, crop to the signature, unlock the aspect ratio, type 140 × 60, and set Max file size to 20 KB.",
        },
        {
          name: "Left thumb impression",
          detail:
            "Press your left thumb on white paper with black or blue ink, crop to a square, and type 240 × 240 px with a 50 KB limit.",
        },
        {
          name: "Declaration",
          detail:
            "Write SBI's declaration text in English, not in capitals, crop to it, and type 800 × 400 px with a 100 KB limit.",
        },
        {
          name: "Live photo",
          detail:
            "In the form, choose Capture Photo or scan the QR code with your phone, against a light background in good light.",
        },
      ],
    },
    rejections: {
      title: "Why SBI PO uploads get rejected",
      items: [
        "A small-size or distorted live photo, or one with shadows on the face.",
        "Coloured glasses, sunglasses or a cap.",
        "A dark or improper background.",
        "A signature or declaration in capital letters.",
        "The photo or signature not matching you at the exam. SBI disqualifies the applicant.",
        "An image uploaded in the wrong slot, such as the photo where the signature goes.",
      ],
    },
    faqs: [
      {
        question: "Is 200 × 230 px compulsory for SBI PO?",
        answer:
          "SBI calls 200 × 230 px the preferred size. The firm limits are the file size, 20 to 50 KB, and the JPG or JPEG format. Keeping to 200 × 230 px avoids a distorted photo on the call letter.",
      },
      {
        question: "My photo is under 20 KB. What do I do?",
        answer:
          "A 200 × 230 px photo can come out small. FormPic raises the JPEG quality to pass 20 KB, and if that isn't enough, Enlarge to fit adds pixels in proportion.",
      },
      {
        question: "What does the SBI PO heading 4.5 cm × 3.5 cm mean?",
        answer:
          "The advertisement heads the photo rules with 4.5 cm × 3.5 cm, the passport print size, then gives 200 × 230 pixels for the upload. Use the pixels for the online form.",
      },
      {
        question: "Why do I need a live photo as well?",
        answer:
          "SBI matches the photo captured live in the form with the one you upload, and with you at the exam. Capture it in the same light and with the same look as your uploaded photo.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "State Bank of India",
        title: "Recruitment of Probationary Officers 2026: detailed advertisement",
        url: "https://sbi.bank.in/csfile/18062026_1_Detailed_Adv.2026.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["sbi-clerk-photo", "ibps-photo", "ibps-signature", "thumb-impression-resize", "200x230-pixels"],
  },
  {
    slug: "sbi-clerk-photo",
    category: "exam",
    name: "SBI Clerk photo",
    preset: { name: "SBI Clerk", ...BANK_PHOTO },
    title: "SBI Clerk photo & signature size (200×230 px)",
    metaDescription:
      "Resize your photo for SBI Clerk (Junior Associates) 2026: 200 × 230 px, 20–50 KB JPEG, with the signature, thumb and declaration sizes. Free, no upload.",
    h1: "SBI Clerk photo resizer",
    h1Accent: ", Junior Associates.",
    intro:
      "Make the photo for the SBI Junior Associates (Clerk) application: 200 × 230 px, a JPEG between 20 and 50 KB. The signature, thumb and declaration sizes are below.",
    question: "What size is the SBI Clerk photo?",
    answer:
      "The SBI Junior Associates 2026 advertisement (CRPD/CR/2026-27/17) asks for a recent passport style colour photo, preferably 200 × 230 pixels, between 20 KB and 50 KB in JPG or JPEG. The signature is 140 × 60 pixels and 10–20 KB, the left thumb impression 240 × 240 pixels and 20–50 KB, and the hand-written declaration 800 × 400 pixels and 50–100 KB.",
    facts: [
      { label: "Photo", value: "200 × 230 px", note: "preferred" },
      { label: "Photo file", value: "20–50 KB", note: "JPG or JPEG" },
      { label: "Signature", value: "140 × 60 px", note: "10–20 KB" },
      { label: "Left thumb", value: "240 × 240 px", note: "20–50 KB" },
      { label: "Declaration", value: "800 × 400 px", note: "50–100 KB" },
    ],
    spec: { title: "SBI Clerk 2026 upload sizes", rows: BANK_UPLOADS },
    requirements: {
      title: "SBI Clerk photo rules",
      items: [
        "A recent passport style colour photo against a light-coloured, preferably white, background.",
        "A relaxed face looking straight at the camera, with no shadows or red-eye.",
        "No caps, hats or dark glasses. Religious headwear is fine if your face is uncovered.",
        "At least 8 copies of the same photo, kept for the later stages of selection.",
      ],
      note: "SBI Clerk applications are for one state or UT only, and the local language test follows the main exam. Neither changes the photo rules.",
    },
    steps: {
      title: "How to make your SBI Clerk uploads",
      items: [
        {
          name: "Crop the photo",
          detail:
            "Add a recent colour photo here. The SBI Clerk preset is on: 200 × 230 px, JPEG, 20 to 50 KB.",
        },
        {
          name: "Size the signature",
          detail:
            "Photograph your signature in black ink, choose Free, crop close, unlock the aspect ratio and type 140 × 60 px. Set Max file size to 20 KB.",
        },
        {
          name: "Thumb and declaration",
          detail:
            "Crop the thumb impression to 240 × 240 px under 50 KB, and the hand-written declaration to 800 × 400 px under 100 KB.",
        },
        {
          name: "Upload each in its own slot",
          detail:
            "If a photo sits where the signature belongs, SBI won't let you sit the exam. Check each preview before you submit.",
        },
      ],
    },
    rejections: {
      title: "Why SBI Clerk uploads get rejected",
      items: [
        "A photo or signature uploaded in the wrong place. SBI won't admit the candidate to the exam.",
        "A signature or declaration in capital letters.",
        "A small, blurred or dark live photo, or one with a cap or sunglasses.",
        "A photo or signature at the exam that doesn't match the uploaded one.",
      ],
    },
    faqs: [
      {
        question: "Are the SBI Clerk and SBI PO photo sizes the same?",
        answer:
          "Yes. Both 2026 advertisements give 200 × 230 px and 20 to 50 KB for the photo, and the same sizes for the signature, thumb impression and declaration. The two applications are separate, so upload the files to each.",
      },
      {
        question: "Where do I need the 8 photo copies?",
        answer:
          "SBI advises keeping at least 8 copies of the photo you upload, for the later stages of selection. Print them from the same photo so they match.",
      },
      {
        question: "What if my signature comes out under 10 KB?",
        answer:
          "At 140 × 60 px a signature can fall short. Try a bigger size with the same shape, such as 280 × 120 px, or press Enlarge to fit.",
      },
      {
        question: "Can I use my right thumb?",
        answer:
          "Yes, if you don't have a left thumb. The advertisement allows the right thumb in that case.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "State Bank of India",
        title: "Recruitment of Junior Associates 2026: detailed advertisement",
        url: "https://sbi.bank.in/webfiles/uploads/files_2627/08/JA_2026_Detailed_Advt_Eng.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["sbi-po-photo", "ibps-photo", "ibps-signature", "thumb-impression-resize", "200x230-pixels"],
  },
  {
    slug: "ibps-signature",
    category: "signature",
    name: "IBPS signature",
    preset: {
      name: "IBPS signature",
      kind: "signature",
      spec: "140×60 px",
      printMm: { width: 35.6, height: 15.2 },
      aspect: 140 / 60,
      width: 140,
      height: 60,
      maxKb: 20,
      minKb: 10,
    },
    title: "IBPS signature resize (140×60 px, 10–20 KB)",
    metaDescription:
      "Resize your signature for IBPS PO, Clerk and RRB forms: 140 × 60 px, a 10–20 KB JPEG, black ink, not in capitals. Free, in your browser, no upload.",
    h1: "IBPS signature resizer",
    h1Accent: ", 140 × 60 px.",
    intro:
      "Crop your signature to the 140 × 60 px strip IBPS asks for and download a JPEG between 10 and 20 KB. The signature never leaves your browser.",
    question: "What is the IBPS signature size?",
    answer:
      "IBPS asks you to sign on white paper with a black ink pen and upload it at 140 × 60 pixels (preferred), as a JPG or JPEG between 10 KB and 20 KB. It must not be in capital letters. The application won't let you move to the next stage until the photo and signature meet the specification.",
    facts: [
      { label: "Size", value: "140 × 60 px", note: "preferred" },
      { label: "File", value: "10–20 KB", note: "JPG or JPEG" },
      { label: "Ink", value: "Black", note: "on white paper" },
      { label: "Letters", value: "Not capitals", note: "running signature" },
    ],
    spec: {
      title: "IBPS signature specification",
      rows: [
        {
          item: "Signature",
          pixels: "140 × 60 px (preferred)",
          minKb: 10,
          maxKb: 20,
          format: "JPG/JPEG",
          notes: "Black ink on white paper, not in capital letters, clearly visible",
        },
      ],
    },
    steps: {
      title: "How to resize your IBPS signature",
      items: [
        {
          name: "Sign in black ink",
          detail:
            "Sign on plain white paper with a black pen, the way you'll sign the attendance sheet at the exam.",
        },
        {
          name: "Photograph it",
          detail: "Photograph the signature from straight above in daylight, with no shadow across it.",
        },
        {
          name: "Crop to 140 × 60",
          detail:
            "Add it here. The IBPS signature preset frames a 7 : 3 strip; drag it close around the ink.",
        },
        {
          name: "Check 10–20 KB",
          detail:
            "A 140 × 60 px file is tiny, so FormPic may need Enlarge to fit to pass 10 KB. If the form insists on 140 × 60, raise quality first.",
        },
      ],
    },
    rejections: {
      title: "Why IBPS signatures get rejected",
      items: [
        "Signed in capital letters.",
        "A signature that doesn't match the one on the attendance sheet or call letter at the exam.",
        "A signature by anyone other than the applicant.",
        "Uploaded in the wrong slot of the form.",
        "Too small or unclear to read.",
      ],
    },
    faqs: [
      {
        question: "Why is my 140 × 60 px signature under 10 KB?",
        answer:
          "140 × 60 is only 8,400 pixels, and black ink on white compresses very well. FormPic raises the JPEG quality first. If it still falls short, try a bigger size with the same shape, like 280 × 120 px; IBPS calls 140 × 60 the preferred size, not a fixed one.",
      },
      {
        question: "Is this the same for IBPS PO, Clerk and RRB?",
        answer:
          "IBPS uses the same scanning guidelines across its common recruitment processes. Check the notice for your exam, because IBPS republishes the guidelines with each one.",
      },
      {
        question: "Can I sign with a blue pen?",
        answer:
          "The guidelines say black ink for the signature. Blue or black is allowed only for the left thumb impression.",
      },
      {
        question: "Can I sign in capitals if that's how I sign?",
        answer:
          "No. IBPS says signatures in capital letters will not be accepted. Use your running signature.",
      },
      {
        question: "Is my signature uploaded to FormPic?",
        answer:
          "No. FormPic works in your browser, so the signature never leaves your device.",
      },
    ],
    sources: [
      {
        publisher: "Institute of Banking Personnel Selection",
        title: "Guidelines for scanning and upload of documents",
        url: "https://ibpsreg.ibps.in/crppoxvjun25/uploads/loadpdf.php?file=k7m5p+fQ15erzNvj0OHb1N7UnJp9sc%2FKYaao1bWrpok%3D&t=1LHArOLA2di0yczXwNDa083LmNWypw%3D%3D",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["ibps-photo", "thumb-impression-resize", "sbi-po-photo", "resize-image-10kb-to-20kb", "ssc-signature"],
  },
];
