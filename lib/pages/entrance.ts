import type { Faq, PageEntry, PresetFields } from "@/lib/pages/types";

// NTA and CBSE give a passport size photo and a file size range, not pixels, so FormPic uses
// passport size at 300 DPI. GATE gives its own pixel range, which 413 × 531 sits inside.
function passportPreset(name: string, minKb: number, maxKb: number): PresetFields {
  return {
    name,
    spec: "35×45 mm",
    printMm: { width: 35, height: 45 },
    aspect: 35 / 45,
    width: 413,
    height: 531,
    dpi: 300,
    minKb,
    maxKb,
  };
}

const NOT_UPLOADED: Faq = {
  question: "Is my photo uploaded to FormPic?",
  answer:
    "No. FormPic crops and compresses the photo in your browser, so it never leaves your device. The only place it goes is the form you upload it to.",
};

const NTA = "National Testing Agency";

export const ENTRANCE_PAGES: PageEntry[] = [
  {
    slug: "jee-main-photo",
    category: "exam",
    name: "JEE Main photo",
    preset: passportPreset("JEE Main", 10, 200),
    title: "JEE Main photo size 2026 (10–200 KB JPG)",
    metaDescription:
      "Resize your photo for JEE (Main) 2026: a passport size JPG of 10–200 KB, 80% face with ears visible, on white. Free, and nothing is uploaded.",
    h1: "JEE Main photo resizer",
    h1Accent: ", 10 to 200 KB.",
    intro:
      "Crop a passport size photo for the JEE (Main) application and download a JPG inside NTA's limits. It all happens in your browser.",
    question: "What size should the JEE Main photo be?",
    answer:
      "The JEE (Main) 2026 information bulletin asks for a recent passport size colour photo, with 80% of the face visible including the ears, no mask, on a white background, as a JPG or JPEG between 10 KB and 200 KB. You also capture a live photo with your webcam or phone while filling in the form. NTA doesn't give a pixel size, so FormPic uses passport size at 300 DPI: 413 × 531 pixels.",
    facts: [
      { label: "Photo", value: "10–200 KB", note: "JPG or JPEG" },
      { label: "Face", value: "80%", note: "ears visible, no mask" },
      { label: "Background", value: "White", note: "colour photo" },
      { label: "Signature", value: "10–100 KB", note: "JPG or JPEG" },
      { label: "FormPic size", value: "413 × 531 px", note: "35 × 45 mm at 300 DPI" },
    ],
    spec: {
      title: "JEE (Main) 2026 upload sizes",
      rows: [
        {
          item: "Photograph",
          printSize: "Passport size",
          minKb: 10,
          maxKb: 200,
          format: "JPG/JPEG",
          background: "White",
          notes: "Colour, 80% face visible including ears, without a mask",
        },
        { item: "Signature", minKb: 10, maxKb: 100, format: "JPG/JPEG", notes: "Clearly legible" },
        { item: "Live photo", notes: "Captured in the form by webcam, or by phone through the QR code" },
        { item: "Class 10 certificate", minKb: 50, maxKb: 300, format: "PDF" },
      ],
    },
    requirements: {
      title: "JEE Main photo rules",
      items: [
        "A recent colour photo, passport size.",
        "80% of your face visible, including both ears, without a mask.",
        "A white background.",
        "Your own photo and signature. NTA gives no chance to correct them later.",
      ],
      note: "For the live photo, sit against a light background with good light and keep 80% of your face visible, ears included. If your computer has no webcam, scan the QR code in the form with your phone.",
    },
    steps: {
      title: "How to make your JEE Main photo",
      items: [
        {
          name: "Take the photo",
          detail:
            "Stand against a white wall facing the light, ears uncovered, and have someone take the photo at eye level.",
        },
        {
          name: "Crop to passport size",
          detail:
            "Add it here. The JEE Main preset frames 35 × 45 mm; size the crop so your face fills most of the frame.",
        },
        {
          name: "Download 10–200 KB",
          detail: "FormPic picks the best JPEG quality under 200 KB and keeps it above 10 KB.",
        },
        {
          name: "Upload, then capture live",
          detail:
            "Upload the photo and signature in the form, then capture the live photo in the same light.",
        },
      ],
    },
    rejections: {
      title: "What gets JEE Main photos rejected",
      items: [
        "Ears hidden, a mask on, or the face too small in the frame.",
        "A background that isn't white.",
        "Someone else's photo, signature or certificate, which NTA treats as unfair means, even if found later.",
        "A live photo that differs noticeably from your Aadhaar photo. NTA reviews mismatches.",
        "Files outside the KB limits, which the form won't accept.",
      ],
    },
    faqs: [
      {
        question: "Did the JEE Main photo limit change?",
        answer:
          "The 2026 bulletin gives 10 to 200 KB for the photo and 10 to 100 KB for the signature. Older years used other limits, so go by the bulletin for the session you're applying to.",
      },
      {
        question: "What if my live photo doesn't match my Aadhaar photo?",
        answer:
          "NTA's FAQ for 2026 says mismatches are reviewed and, if there's a major discrepancy, you'll be told by email or SMS. NTA advises updating your Aadhaar with a recent photo.",
      },
      {
        question: "Can I use the same photo for JEE Main and NEET?",
        answer:
          "Often, yes. Both NTA bulletins ask for a passport size colour photo on white with 80% of the face visible, and the 10 to 200 KB range fits both. Check each bulletin for the date the photo must be taken after.",
      },
      {
        question: "Does NTA need a specific pixel size?",
        answer:
          "No. The bulletin sets a file size and the passport size shape, not pixels. FormPic's 413 × 531 px is passport size at 300 DPI.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: NTA,
        title: "JEE (Main) 2026 information bulletin",
        url: "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2025/10/202510311145384616.pdf",
      },
      {
        publisher: NTA,
        title: "JEE (Main) 2026 frequently asked questions",
        url: "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2025/11/202511201840645521.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["jee-main-signature", "neet-photo", "cuet-photo", "gate-photo", "resize-image-to-200kb"],
  },
  {
    slug: "jee-main-signature",
    category: "signature",
    name: "JEE Main signature",
    limit: { minKb: 10, maxKb: 100, kind: "signature" },
    title: "JEE Main signature size 2026 (10–100 KB)",
    metaDescription:
      "Resize your signature for JEE (Main) 2026: a clearly legible JPG between 10 and 100 KB. Crop it, keep it above the 10 KB minimum, all in your browser.",
    h1: "JEE Main signature resizer",
    h1Accent: ", 10 to 100 KB.",
    intro:
      "NTA wants the JEE (Main) signature as a legible JPG between 10 and 100 KB, with no fixed pixel size. Crop yours here and check the size before you save.",
    question: "What is the JEE Main signature size?",
    answer:
      "The JEE (Main) 2026 information bulletin asks for the signature as a JPG or JPEG between 10 KB and 100 KB, clearly legible. It doesn't set a pixel size or a print size, so crop close around your signature and keep the file inside the range. The usual problem is the 10 KB minimum: a signature on white paper often compresses below it.",
    facts: [
      { label: "File", value: "10–100 KB", note: "JPG or JPEG" },
      { label: "Pixels", value: "Not fixed", note: "no size in the bulletin" },
      { label: "Rule", value: "Clearly legible", note: "your own signature" },
    ],
    spec: {
      title: "JEE (Main) 2026 signature specification",
      rows: [{ item: "Signature", minKb: 10, maxKb: 100, format: "JPG/JPEG", notes: "Clearly legible" }],
    },
    steps: {
      title: "How to resize your JEE Main signature",
      items: [
        {
          name: "Sign on plain paper",
          detail: "Sign with a dark pen on white paper, at your normal size.",
        },
        {
          name: "Photograph it",
          detail: "Take the photo straight on in daylight, with no shadow from your hand or phone.",
        },
        {
          name: "Crop around the ink",
          detail:
            "Add it here and drag the crop close around the signature, with a little white space on each side. The 10–100 KB limit is already set.",
        },
        {
          name: "Clear the 10 KB minimum",
          detail:
            "If the Download button shows under 10 KB, FormPic has already tried full quality; press Enlarge to fit to add pixels.",
        },
      ],
    },
    rejections: {
      title: "What goes wrong with JEE Main signatures",
      items: [
        "A file under 10 KB, which the form won't accept.",
        "A signature too small or faint to read once it's resized.",
        "Someone else's signature, or a wrong or morphed one. NTA lists both as unfair means.",
        "A different signature from the one you sign at the exam centre.",
      ],
    },
    faqs: [
      {
        question: "Does JEE Main need a 3.5 × 1.5 cm signature?",
        answer:
          "The 2026 information bulletin doesn't give a print or pixel size for the signature, only the 10 to 100 KB range and that it be clearly legible. Crop close around your signature at any width.",
      },
      {
        question: "Why is my signature under 10 KB?",
        answer:
          "Black ink on white paper has very little detail for a JPEG to store. FormPic raises the quality to the maximum first; Enlarge to fit then adds pixels until the file passes 10 KB.",
      },
      {
        question: "Is the CUET signature the same size?",
        answer:
          "No. CUET (UG) 2026 asks for 10 to 50 KB, so a 90 KB JEE signature won't fit. Set Max file size to 50 KB here for CUET.",
      },
      {
        question: "Is my signature uploaded to FormPic?",
        answer: "No. It's cropped and compressed in your browser and never leaves your device.",
      },
    ],
    sources: [
      {
        publisher: NTA,
        title: "JEE (Main) 2026 information bulletin",
        url: "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2025/10/202510311145384616.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["jee-main-photo", "cuet-photo", "increase-image-size-in-kb", "resize-image-50kb-to-100kb", "ibps-signature"],
  },
  {
    slug: "cuet-photo",
    category: "exam",
    name: "CUET photo",
    preset: passportPreset("CUET", 10, 200),
    title: "CUET UG photo & signature size 2026",
    metaDescription:
      "Resize your photo for CUET (UG) 2026: a passport size JPG of 10–200 KB on white, with the signature at 10–50 KB. Free, in your browser, never uploaded.",
    h1: "CUET photo resizer",
    h1Accent: ", 10 to 200 KB.",
    intro:
      "Make the passport size photo and signature for the CUET (UG) form. FormPic crops and compresses both in your browser, inside NTA's limits.",
    question: "What is the CUET UG photo and signature size?",
    answer:
      "The CUET (UG) 2026 information bulletin asks for a recent scanned passport size colour photo, with 80% of the face visible including the ears, no mask, on a white background, as a JPG between 10 KB and 200 KB. The signature is a JPG between 10 KB and 50 KB, half the JEE (Main) maximum. You also capture a live photo while filling in the form.",
    facts: [
      { label: "Photo", value: "10–200 KB", note: "JPG, passport size" },
      { label: "Signature", value: "10–50 KB", note: "JPG" },
      { label: "Face", value: "80%", note: "ears visible" },
      { label: "Background", value: "White", note: "colour photo" },
      { label: "FormPic size", value: "413 × 531 px", note: "35 × 45 mm at 300 DPI" },
    ],
    spec: {
      title: "CUET (UG) 2026 upload sizes",
      rows: [
        {
          item: "Photograph",
          printSize: "Passport size",
          minKb: 10,
          maxKb: 200,
          format: "JPG/JPEG",
          background: "White",
          notes: "Colour, 80% face including ears, without a mask",
        },
        { item: "Signature", minKb: 10, maxKb: 50, format: "JPG/JPEG", notes: "Clearly legible" },
        { item: "Live photo", notes: "Webcam, or phone through the QR code. Light background, 80% face" },
      ],
    },
    requirements: {
      title: "CUET photo rules",
      items: [
        "A recent passport size colour photo.",
        "80% of the face visible, ears included, without a mask.",
        "A white background for the uploaded photo, and a light one for the live photo.",
        "Your own photo and signature, both clearly legible.",
      ],
    },
    steps: {
      title: "How to make your CUET uploads",
      items: [
        {
          name: "Crop the photo",
          detail: "Add a recent photo taken on white. The CUET preset crops to passport size and keeps it under 200 KB.",
        },
        {
          name: "Make the signature",
          detail:
            "Photograph your signature, choose Free, crop close, and set Max file size to 50 KB. Keep it over 10 KB.",
        },
        {
          name: "Capture live",
          detail: "Capture the live photo in the form, facing a light, in front of a light wall.",
        },
      ],
    },
    rejections: {
      title: "What gets CUET uploads rejected",
      items: [
        "A signature over 50 KB. CUET's limit is lower than JEE (Main)'s.",
        "Ears covered or a mask on in the photo.",
        "A coloured or cluttered background.",
        "Images of anyone other than the candidate.",
      ],
    },
    faqs: [
      {
        question: "Can I reuse my JEE Main signature for CUET?",
        answer:
          "Only if it's 50 KB or less. JEE (Main) allows up to 100 KB but CUET (UG) 2026 caps the signature at 50 KB. Re-save it here with a 50 KB limit.",
      },
      {
        question: "Does CUET give a pixel size?",
        answer:
          "No. The bulletin gives passport size and 10 to 200 KB. FormPic's 413 × 531 px is passport size at 300 DPI.",
      },
      {
        question: "What if my webcam doesn't work for the live photo?",
        answer:
          "Scan the QR code shown in the form with your phone or tablet and capture the live photo there.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: NTA,
        title: "CUET (UG) 2026 information bulletin",
        url: "https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2026/01/202601031633478370.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["jee-main-photo", "jee-main-signature", "neet-photo", "ctet-photo", "resize-image-to-50kb"],
  },
  {
    slug: "gate-photo",
    category: "exam",
    name: "GATE photo",
    preset: passportPreset("GATE", 5, 600),
    title: "GATE 2027 photo & signature size",
    metaDescription:
      "Resize your photo for GATE 2027: 3.5 × 4.5 cm, 200 × 260 to 530 × 690 px, 5–600 KB JPEG, with the signature rules too. Free, no upload.",
    h1: "GATE photo resizer",
    h1Accent: ", 2027 rules.",
    intro:
      "GATE 2027 checks the photo's pixel size and shape as well as the file size. FormPic crops to passport size at 413 × 531 px, inside every limit.",
    question: "What size should the GATE 2027 photo be?",
    answer:
      "IIT Madras, which organises GATE 2027, asks for a good quality colour passport size photo, 3.5 cm wide and 4.5 cm high, with your face covering 60–70% of it on a white background. The JPEG must be between 200 × 260 and 530 × 690 pixels, with a width-to-height ratio between 0.66 and 0.89, and between 5 KB and 600 KB. The same photo is printed on your admit card and score card.",
    facts: [
      { label: "Print size", value: "3.5 × 4.5 cm", note: "width × height" },
      { label: "Pixels", value: "200 × 260 to 530 × 690", note: "min to max" },
      { label: "File", value: "5–600 KB", note: "JPEG" },
      { label: "Face", value: "60–70%", note: "of the photo" },
      { label: "FormPic size", value: "413 × 531 px", note: "ratio 0.78" },
    ],
    spec: {
      title: "GATE 2027 photo and signature specification",
      rows: [
        {
          item: "Photograph",
          printSize: "3.5 × 4.5 cm",
          pixels: "200 × 260 to 530 × 690 px",
          minKb: 5,
          maxKb: 600,
          format: "JPEG/JPG",
          background: "White",
          notes: "Aspect ratio 0.66 to 0.89. Face 60–70% of the image",
        },
        {
          item: "Signature",
          pixels: "250 × 80 to 580 × 180 px",
          minKb: 3,
          maxKb: 300,
          format: "JPEG/JPG",
          notes: "Height : width of 1 : 2.75 to 1 : 3.75. Signature covers 70–80% of the image",
        },
      ],
    },
    requirements: {
      title: "GATE photo rules",
      items: [
        "Frontal view, looking straight at the camera, with forehead, eyes, nose and chin visible.",
        "A white background with no other objects or people.",
        "No caps, hats, sunglasses or coloured glasses. Normal spectacles are fine without glare; remove them if the glare can't be avoided.",
        "Head coverings only for religious reasons, with the face visible from chin to forehead and edge to edge.",
        "No cloth or shadow over the face.",
      ],
      note: "GATE shows a 3 × 3 grid over the photo: your face should cover cells A2, A3, B2, B3, C2 and C3. Photos that don't meet the rules can get the application rejected, and the fee isn't refunded.",
    },
    steps: {
      title: "How to make your GATE photo and signature",
      items: [
        {
          name: "Crop the photo",
          detail:
            "Add a photo taken on white. The GATE preset crops 3.5 × 4.5 cm at 413 × 531 px, a 0.78 ratio inside GATE's 0.66–0.89 range.",
        },
        {
          name: "Fill 60–70% with your face",
          detail: "Resize the crop box until your face, chin to hairline, takes up about two-thirds of its height.",
        },
        {
          name: "Make the signature",
          detail:
            "Sign in black or dark blue, crop close so the ink covers 70–80% of the image, unlock the aspect ratio and type 450 × 150 px, a 1 : 3 ratio inside GATE's limits.",
        },
        {
          name: "Download",
          detail: "Both files land well inside GATE's KB limits. Check the size on the Download button.",
        },
      ],
    },
    rejections: {
      title: "Photos GATE marks as not acceptable",
      items: [
        "Not matching the size specification.",
        "Sunglasses, a cap, or a mask over the face.",
        "Glare on spectacles.",
        "Shadow on the photo, or an improper background with objects or other people.",
        "A blurred photo, or not looking straight into the camera.",
      ],
    },
    faqs: [
      {
        question: "Why does GATE check the aspect ratio?",
        answer:
          "GATE accepts a width-to-height ratio from 0.66 to 0.89, so a square or landscape crop is refused even if the pixels and KB are right. FormPic's GATE preset is 0.78.",
      },
      {
        question: "What is the GATE signature size?",
        answer:
          "A JPEG from 250 × 80 to 580 × 180 pixels, 3 to 300 KB, with a height-to-width ratio between 1 : 2.75 and 1 : 3.75, signed in black or dark blue ink. The signature should cover 70–80% of the image.",
      },
      {
        question: "Can I wear glasses in my GATE photo?",
        answer:
          "Normal spectacles are allowed if there's no glare. If you can't avoid the glare, take them off. Sunglasses and coloured glasses aren't allowed.",
      },
      {
        question: "Is the photo on my admit card the same?",
        answer:
          "Yes. GATE prints the photo you upload on the admit card and the score card, so it's worth getting right.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "IIT Madras (GATE 2027)",
        title: "GATE 2027: photograph and signature",
        url: "https://gate2027.iitm.ac.in/photograph_and_signature",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["jee-main-photo", "passport-size-photo", "cuet-photo", "upsc-photo", "resize-image-to-300kb"],
  },
  {
    slug: "ctet-photo",
    category: "exam",
    name: "CTET photo",
    preset: passportPreset("CTET", 10, 100),
    title: "CTET photo & signature size (10–100 KB)",
    metaDescription:
      "Resize your photo for CTET: 3.5 × 4.5 cm, a 10–100 KB JPG, with the signature at 3.5 × 1.5 cm and 3–30 KB. Free, in your browser, nothing uploaded.",
    h1: "CTET photo resizer",
    h1Accent: ", 3.5 × 4.5 cm.",
    intro:
      "Make the photo and signature for the CTET application at the sizes CBSE sets, and download JPGs inside the KB limits. Nothing leaves your browser.",
    question: "What is the CTET photo and signature size?",
    answer:
      "The CTET September 2026 information bulletin asks for a scanned photo of 3.5 cm width and 4.5 cm height, between 10 KB and 100 KB, and a scanned signature of 3.5 cm by 1.5 cm, between 3 KB and 30 KB, both as JPG or JPEG. Uploading both is mandatory. At 300 DPI the photo is 413 × 531 pixels and the signature 413 × 177 pixels.",
    facts: [
      { label: "Photo", value: "3.5 × 4.5 cm", note: "10–100 KB" },
      { label: "Signature", value: "3.5 × 1.5 cm", note: "3–30 KB" },
      { label: "Format", value: "JPG", note: "or JPEG" },
      { label: "FormPic photo", value: "413 × 531 px", note: "at 300 DPI" },
      { label: "FormPic signature", value: "413 × 177 px", note: "at 300 DPI" },
    ],
    spec: {
      title: "CTET September 2026 upload sizes",
      rows: [
        { item: "Photograph", printSize: "3.5 × 4.5 cm", minKb: 10, maxKb: 100, format: "JPG/JPEG" },
        { item: "Signature", printSize: "3.5 × 1.5 cm", minKb: 3, maxKb: 30, format: "JPG/JPEG" },
      ],
    },
    requirements: {
      title: "Before you start the CTET form",
      items: [
        "Have the latest photo and signature ready as JPG files at the specified size and dimensions.",
        "Upload both: the photo and the signature are mandatory.",
      ],
      note: "The CTET bulletin sets sizes and formats but no background rule. A plain light background still helps the photo print clearly on the admit card.",
    },
    steps: {
      title: "How to make your CTET uploads",
      items: [
        {
          name: "Crop the photo",
          detail: "Add a recent photo. The CTET preset crops 3.5 × 4.5 cm at 413 × 531 px and keeps it within 10–100 KB.",
        },
        {
          name: "Crop the signature",
          detail:
            "Add a photo of your signature, unlock the aspect ratio, and type 413 × 177 px for 3.5 × 1.5 cm at 300 DPI.",
        },
        {
          name: "Set the signature limit",
          detail: "Type 30 into Max file size and 3 into Min file size, then download.",
        },
      ],
    },
    rejections: {
      title: "Common CTET upload mistakes",
      items: [
        "A photo over 100 KB or a signature over 30 KB, which the form refuses.",
        "A signature cropped to the whole page instead of the 3.5 × 1.5 cm area.",
        "A photo stretched to 3.5 × 4.5 cm from a different shape.",
        "An old photo that doesn't look like you at the exam.",
      ],
    },
    faqs: [
      {
        question: "What DPI should the CTET photo be?",
        answer:
          "The bulletin doesn't say. FormPic uses 300 DPI, giving 413 × 531 px for 3.5 × 4.5 cm, which comes out well inside 100 KB.",
      },
      {
        question: "Is the CTET signature size different from the photo?",
        answer:
          "Yes. The signature is 3.5 cm long and 1.5 cm high, and 3 to 30 KB, a much smaller file than the 10 to 100 KB photo.",
      },
      {
        question: "Do the sizes change between February and September?",
        answer:
          "This page follows the September 2026 bulletin. CBSE publishes a bulletin for each session, so check the one you're applying to.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "Central Board of Secondary Education",
        title: "CTET September 2026 information bulletin",
        url: "https://cdnbbsr.s3waas.gov.in/s3443dec3062d0286986e21dc0631734c9/uploads/2026/05/202605111250310617.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["passport-size-photo", "resize-image-to-100kb", "resize-image-to-30kb", "cuet-photo", "jee-main-photo"],
  },
  {
    slug: "neet-pg-photo",
    category: "exam",
    name: "NEET PG photo",
    limit: { maxKb: 80 },
    title: "NEET PG photo, signature & thumb size",
    metaDescription:
      "Resize your NEET PG photo, signature and thumb impression to NBEMS rules: JPG under 80 KB, white background, signature in a 3.5 × 1.5 cm box. No upload.",
    h1: "NEET PG photo resizer",
    h1Accent: ", under 80 KB.",
    intro:
      "NBEMS rejects more images than most boards. Crop your NEET PG photo, signature and thumb impression to its rules and keep each JPG under 80 KB.",
    question: "What is the NEET PG photo size?",
    answer:
      "NBEMS's image upload instructions for NEET-PG 2026 ask for two photos: a real-time photo taken by your webcam while you fill in the form, and a recent colour photo, no more than 3 months old, on a white background, showing your full face, ears, neck and shoulders, with nothing below the shoulders. Your face should fill 70–80% of the frame, and the JPG must be under 80 KB. The signature and left thumb impression each go in a 3.5 × 1.5 cm box, scanned at 200 DPI and under 80 KB.",
    facts: [
      { label: "Photo", value: "< 80 KB", note: "JPG, white background" },
      { label: "Age", value: "≤ 3 months", note: "recent photo" },
      { label: "Face", value: "70–80%", note: "of the frame" },
      { label: "Signature", value: "3.5 × 1.5 cm", note: "box, < 80 KB" },
      { label: "Thumb", value: "3.5 × 1.5 cm", note: "box, < 80 KB" },
    ],
    spec: {
      title: "NEET-PG 2026 image specification",
      rows: [
        {
          item: "Recent photograph",
          maxKb: 80,
          format: "JPG/JPEG",
          background: "White",
          notes: "Colour, not over 3 months old. Full face, ears, neck and shoulders; face 70–80% of the frame",
        },
        { item: "Real-time photograph", notes: "Captured by webcam in the form, in formal attire, against white" },
        {
          item: "Signature",
          printSize: "3.5 × 1.5 cm box",
          dpi: 200,
          maxKb: 80,
          format: "JPG/JPEG",
          notes: "Full signature, black or dark blue ink",
        },
        {
          item: "Left thumb impression",
          printSize: "3.5 × 1.5 cm box",
          dpi: 200,
          maxKb: 80,
          format: "JPG/JPEG",
          notes: "Blue or black ink pad, horizontal print",
        },
      ],
    },
    requirements: {
      title: "NBEMS photo rules",
      items: [
        "Taken in the last 3 months, preferably at a studio. A gross difference from your real-time photo gets the application rejected.",
        "Formal attire, a white background, and nothing else in the frame.",
        "Full face, ears, neck and shoulders, facing the camera with a neutral expression and eyes open.",
        "No spectacles, cap, goggles, stethoscope, makeup or ornaments.",
        "No selfies: ask someone else to take it, with a camera of more than 5 megapixels.",
        "No retouching or digital enhancement.",
      ],
    },
    steps: {
      title: "How to make your NEET PG images",
      items: [
        {
          name: "Crop the photo",
          detail:
            "Add your photo. The 80 KB limit is already set; crop from just above your head to your shoulders, with your face filling most of the frame.",
        },
        {
          name: "Make the signature",
          detail:
            "Draw a 3.5 × 1.5 cm box on unlined white paper, sign inside in black or dark blue, and crop to the box edges. Keep it under 80 KB.",
        },
        {
          name: "Make the thumb impression",
          detail:
            "Draw another 3.5 × 1.5 cm box, press your left thumb on a fresh ink pad and print it horizontally inside. Crop to the box.",
        },
        {
          name: "Check before submitting",
          detail:
            "NBEMS scrutinises images after the form closes. Getting them right now avoids the selective edit window.",
        },
      ],
    },
    rejections: {
      title: "Why NBEMS rejects NEET PG images",
      items: [
        "Selfies or mobile photos that distort the face.",
        "A cropped image, or one enlarged from a smaller original.",
        "Black and white photos, improper flash or lighting.",
        "An improper background, sunglasses, glare on spectacles or the rim over the eyes.",
        "Signatures that are initials, in capitals, too small, outside the box, or scanned as a whole page.",
        "Signature and thumb impression in the same box.",
      ],
    },
    faqs: [
      {
        question: "Is the NEET PG signature limit 80 KB or 100 KB?",
        answer:
          "The instructions say both. The scanning method says under 80 KB, while the camera method says resize to 20–100 KB. Staying between 20 and 80 KB satisfies both.",
      },
      {
        question: "Why doesn't NBEMS give a pixel size?",
        answer:
          "The instructions set the content, file size and format, and ask you to keep the aspect ratio when resizing so the image isn't distorted. FormPic never stretches the crop, so any size you choose keeps its shape.",
      },
      {
        question: "Can I wear spectacles in my NEET PG photo?",
        answer:
          "No. NBEMS asks you not to wear spectacles, to avoid reflections, nor a cap, goggles, stethoscope, makeup or ornaments.",
      },
      {
        question: "What if my images get flagged after I apply?",
        answer:
          "NBEMS opens a selective edit window to fix deficient images. For NEET-PG 2026 it ran from 31 July to 10 August 2026, through the Image Scrutiny tab in the dashboard.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "National Board of Examinations in Medical Sciences",
        title: "NEET-PG 2026 image upload instructions",
        url: "https://g03.tcsion.com//per/g03/pub/726/EForms/image/ImageDocUpload/71161/5/8301129860.pdf",
      },
      {
        publisher: "National Board of Examinations in Medical Sciences",
        title: "NEET-PG 2026 application portal",
        url: "https://cdn3.digialm.com//EForms/configuredHtml/1815/94357/Index.html",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["neet-photo", "thumb-impression-resize", "resize-image-to-50kb", "resize-image-to-100kb", "passport-size-photo"],
  },
  {
    slug: "agniveer-photo",
    category: "exam",
    name: "Agniveer photo",
    draft: true,
    todo: [
      "Agniveer Vayu: read the official upload guidelines at https://agnipathvayu.cdac.in/AV/uploadDoc (the site returned 503 on 2026-10-08). A search summary of that page said the photo shows the candidate holding a black slate with their name and the photo date in white chalk capitals, 10–50 KB JPG, plus a live photo match; the signature 10–50 KB, and a parent's signature for under-18s. Confirm every figure.",
      "Army Agniveer: find the current notification's photo and signature rules. joinindianarmy.nic.in needs a login, so check the published notification PDF.",
      "Decide whether this page covers Army, Air Force (Vayu) and Navy, or only one of them.",
    ],
    title: "Agniveer photo & signature size",
    metaDescription: "Draft: Agniveer photo and signature rules, pending verification against the official notification.",
    h1: "Agniveer photo resizer",
    h1Accent: ".",
    intro: "Draft page. Not published until the figures are verified.",
    faqs: [],
    sources: [],
    updated: "2026-10-08",
    related: [],
  },
];
