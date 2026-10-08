import type { Faq, PageEntry, PresetFields } from "@/lib/pages/types";

// SSC captures the photo live in every current application, so these pages are about the
// signature. The notices give it as "about 6.0 cm × 2.0 cm"; FormPic sizes it at 200 DPI,
// except Constable (GD), whose notice says 300 DPI.
function sscSignature(name: string, dpi: 200 | 300 = 200): PresetFields {
  return {
    name,
    kind: "signature",
    spec: "60×20 mm",
    printMm: { width: 60, height: 20 },
    aspect: 3,
    width: dpi === 300 ? 709 : 472,
    height: dpi === 300 ? 236 : 157,
    dpi,
    maxKb: 20,
    minKb: 10,
  };
}

const SSC_SOURCE_PUBLISHER = "Staff Selection Commission";

const NOT_UPLOADED: Faq = {
  question: "Is my signature uploaded to FormPic?",
  answer:
    "No. FormPic crops and compresses the image in your browser, so it never leaves your device. The only place it goes is the SSC form.",
};

export const SSC_PAGES: PageEntry[] = [
  {
    slug: "ssc-cgl-photo",
    category: "exam",
    name: "SSC CGL photo & signature",
    preset: sscSignature("SSC CGL"),
    title: "SSC CGL photo & signature size 2026",
    metaDescription:
      "SSC CGL 2026 takes your photo live in the form, so only the signature is uploaded: a JPEG of 10–20 KB, about 6 × 2 cm. Resize it free, nothing uploaded.",
    h1: "SSC CGL photo & signature",
    h1Accent: ", 2026 rules.",
    intro:
      "The CGL 2026 form captures your photo with the camera, so the file to prepare is your signature. Crop it to a strip and download a JPEG between 10 and 20 KB, right in your browser.",
    question: "What is the SSC CGL 2026 photo and signature size?",
    answer:
      "There's no photo file for SSC CGL 2026. The application captures a live photo through your webcam or phone, and capturing a picture of an existing photo gets the application rejected. The signature goes up as a JPEG or JPG between 10 KB and 20 KB, about 6.0 cm wide and 2.0 cm high (para 9.6 of the notice). FormPic sizes that at 200 DPI: 472 × 157 pixels.",
    facts: [
      { label: "Photo", value: "Live capture", note: "in the form, not uploaded" },
      { label: "Signature", value: "10–20 KB", note: "JPEG or JPG" },
      { label: "Signature size", value: "6.0 × 2.0 cm", note: "about, para 9.6" },
      { label: "FormPic size", value: "472 × 157 px", note: "at 200 DPI" },
      { label: "For DV", value: "2 prints", note: "passport size, colour" },
    ],
    spec: {
      title: "SSC CGL 2026 upload rules",
      rows: [
        {
          item: "Live photo",
          notes:
            "Captured in the form by webcam or phone. Good light, plain background, camera at eye level, no cap, mask or glasses",
        },
        {
          item: "Signature",
          printSize: "about 6.0 × 2.0 cm",
          minKb: 10,
          maxKb: 20,
          format: "JPEG/JPG",
          notes: "Annexure-IV of the same notice says about 4.0 × 2.0 cm",
        },
        {
          item: "Photographs for document verification",
          printSize: "Passport size",
          format: "Colour prints",
          notes: "Two recent prints, with an original photo ID (para 15.10)",
        },
      ],
    },
    requirements: {
      title: "What the CGL notice asks for",
      items: [
        "A place with good light and a plain background for the live photo.",
        "The camera at eye level, and your whole face inside the frame the form draws, neither too close nor too far.",
        "No cap, mask or glasses while the photo is captured.",
        "A clear signature. SSC rejects blurred or miniature signatures summarily.",
        "Two recent passport size colour prints for document verification, if you're shortlisted.",
      ],
      note: "If your webcam doesn't work, the Upload Documents page has a QR code for SSC's Android app, which captures the photo on your phone. Rules change between notices, so check the notice for your exam before you submit.",
    },
    steps: {
      title: "How to prepare your SSC CGL signature",
      items: [
        {
          name: "Sign on white paper",
          detail: "Sign with a dark pen on plain white paper, large enough to fill a strip about 6 cm wide.",
        },
        {
          name: "Photograph it",
          detail:
            "Photograph or scan the page in daylight, holding the phone flat above it so the strip isn't skewed.",
        },
        {
          name: "Crop the strip",
          detail:
            "Add the photo here. The SSC CGL preset frames a 3 : 1 strip; drag it so the signature fills most of the width.",
        },
        {
          name: "Download 10–20 KB",
          detail:
            "Download the JPEG. If the button shows under 10 KB, press Enlarge to fit and FormPic adds pixels until the file passes the minimum.",
        },
        {
          name: "Capture the live photo",
          detail:
            "In the CGL form, capture your photo in front of a plain wall with the light on your face, following the frame on screen.",
        },
      ],
    },
    rejections: {
      title: "Why CGL applications get rejected over images",
      items: [
        "Capturing a photo of an existing photograph instead of yourself (para 9.5).",
        "A cap, mask, spectacles or a side-facing view in the live photo.",
        "A poor quality, miniature or blurred photo.",
        "A blurred or miniature signature.",
        "Looking different at the exam from the photo in the application.",
      ],
    },
    faqs: [
      {
        question: "Is the CGL signature 6 × 2 cm or 4 × 2 cm?",
        answer:
          "The notice says both. Para 9.6 gives about 6.0 × 2.0 cm and Annexure-IV about 4.0 × 2.0 cm, and both call the size approximate. The firm requirement in both places is a JPEG of 10 to 20 KB. FormPic follows para 9.6; for 4 × 2 cm, unlock the aspect ratio and type 315 × 157 px.",
      },
      {
        question: "Do I need a passport size photo for SSC CGL?",
        answer:
          "Not for the application, where the photo is captured live. If you're shortlisted for document verification, para 15.10 asks for two recent passport size colour photographs and an original photo ID. Use the passport size preset to make them.",
      },
      {
        question: "My signature comes out under 10 KB. What do I do?",
        answer:
          "A signature on white paper compresses very well, so it often lands below 10 KB. Press Enlarge to fit: FormPic adds pixels in proportion until the JPEG is above the minimum, without changing the shape.",
      },
      {
        question: "Does Aadhaar authentication change the image rules?",
        answer:
          "Para 9.3 says applications from candidates who choose Aadhaar based authentication during One-Time Registration won't be rejected because the photo or signature misses the standards. A clear signature is still worth uploading.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: SSC_SOURCE_PUBLISHER,
        title: "Combined Graduate Level Examination, 2026 notice",
        url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2025.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["ssc-signature", "ssc-chsl-photo", "ssc-mts-photo", "ssc-gd-photo", "passport-size-photo"],
  },
  {
    slug: "ssc-chsl-photo",
    category: "exam",
    name: "SSC CHSL photo & signature",
    preset: sscSignature("SSC CHSL"),
    title: "SSC CHSL photo & signature size 2026",
    metaDescription:
      "SSC CHSL 2026 captures your photo live; the signature is a 10–20 KB JPEG, about 6 × 2 cm. Applications close 7 October 2026. Resize free, no upload.",
    h1: "SSC CHSL photo & signature",
    h1Accent: ", 2026 form.",
    intro:
      "The CHSL 2026 form takes your photo with the camera while you apply. What you prepare in advance is the signature: a JPEG between 10 and 20 KB, cropped and sized here in your browser.",
    question: "What is the SSC CHSL 2026 photo and signature size?",
    answer:
      "The Combined Higher Secondary (10+2) Level Examination 2026 notice, published on 7 September 2026, asks for a live photo captured in the form, not an uploaded file. The scanned signature must be a JPEG between 10 KB and 20 KB, about 6.0 cm wide and 2.0 cm high (para 9.6). FormPic sizes it at 200 DPI as 472 × 157 pixels.",
    facts: [
      { label: "Photo", value: "Live capture", note: "webcam or phone" },
      { label: "Signature", value: "10–20 KB", note: "JPEG or JPG" },
      { label: "Signature size", value: "6.0 × 2.0 cm", note: "about, para 9.6" },
      { label: "FormPic size", value: "472 × 157 px", note: "at 200 DPI" },
      { label: "Apply by", value: "7 Oct 2026", note: "23:00 hours" },
    ],
    spec: {
      title: "SSC CHSL 2026 upload rules",
      rows: [
        {
          item: "Live photo",
          notes:
            "Captured while applying. Good light, plain background, camera at eye level, no cap, mask or spectacles",
        },
        {
          item: "Signature",
          printSize: "about 6.0 × 2.0 cm",
          minKb: 10,
          maxKb: 20,
          format: "JPEG/JPG",
          notes: "The application form annexure says about 4.0 × 2.0 cm",
        },
      ],
    },
    requirements: {
      title: "What the CHSL notice asks for",
      items: [
        "Sit or stand in good light against a plain background when the form prompts for the photo.",
        "Keep the camera at eye level and look straight ahead.",
        "No cap, mask or spectacles.",
        "If the captured photo isn't right, recapture it before you submit. The notice asks you to.",
        "A legible signature. Illegible or blurred signatures are rejected.",
      ],
      note: "If your computer has no camera, the Upload Documents page has a QR code for SSC's Android app. Specimens of acceptable and unacceptable photos are in Annexure-V of the notice.",
    },
    steps: {
      title: "How to prepare your SSC CHSL signature",
      items: [
        {
          name: "Sign in a box",
          detail:
            "Draw a light rectangle about 6 cm by 2 cm on white paper and sign inside it with a dark pen, filling most of it.",
        },
        {
          name: "Photograph it flat",
          detail: "Photograph the paper from directly above in daylight, with no shadow from your hand or phone.",
        },
        {
          name: "Crop with the preset",
          detail:
            "Add the photo here. The SSC CHSL preset is already on and frames a 3 : 1 strip around the signature.",
        },
        {
          name: "Check the size",
          detail:
            "The Download button shows the final size. Keep it between 10 and 20 KB; Enlarge to fit fixes a file that's too small.",
        },
      ],
    },
    rejections: {
      title: "Why CHSL applications get rejected over images",
      items: [
        "A photo that doesn't match the acceptable specimen in Annexure-V.",
        "A capture of an existing photograph instead of a live photo.",
        "Cap, mask or spectacles in the photo, or a face that isn't frontal.",
        "An illegible, blurred or miniature signature.",
      ],
    },
    faqs: [
      {
        question: "When does the CHSL 2026 application close?",
        answer:
          "The notice gives 7 September to 7 October 2026, with applications closing at 23:00 on 7 October and fee payment the next day. The correction window runs from 14 to 16 October 2026.",
      },
      {
        question: "Is the CHSL signature 6 × 2 cm or 4 × 2 cm?",
        answer:
          "Para 9.6 says about 6.0 × 2.0 cm and the application form annexure says about 4.0 × 2.0 cm. Both say 10 to 20 KB in JPEG, which is the part to get exactly right. FormPic uses 6.0 × 2.0 cm; for 4 × 2 cm, unlock the aspect ratio and type 315 × 157 px.",
      },
      {
        question: "Can I use the same signature as my CGL application?",
        answer:
          "Yes, if it meets the same rules: CHSL and CGL 2026 both ask for a 10 to 20 KB JPEG of about 6 × 2 cm. Use the same signature you'll sign at the exam, because SSC compares them.",
      },
      {
        question: "What if my signature file is too small?",
        answer:
          "Press Enlarge to fit. FormPic adds pixels in proportion until the JPEG passes 10 KB, keeping the 3 : 1 shape.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: SSC_SOURCE_PUBLISHER,
        title: "Combined Higher Secondary (10+2) Level Examination, 2026 notice",
        url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_chsl_2026.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["ssc-cgl-photo", "ssc-signature", "ssc-mts-photo", "ssc-gd-photo", "resize-image-10kb-to-20kb"],
  },
  {
    slug: "ssc-mts-photo",
    category: "exam",
    name: "SSC MTS photo & signature",
    preset: sscSignature("SSC MTS"),
    title: "SSC MTS photo & signature size",
    metaDescription:
      "SSC MTS and Havaldar forms capture your photo live; the signature is a 10–20 KB JPEG, about 6 × 2 cm. Crop and resize it free, without uploading.",
    h1: "SSC MTS photo & signature",
    h1Accent: ", MTS & Havaldar.",
    intro:
      "The MTS and Havaldar application captures your photo with the camera, so the signature is the file you upload. Crop it and save a JPEG between 10 and 20 KB, in your browser.",
    question: "What is the SSC MTS photo and signature size?",
    answer:
      "The latest Multi-Tasking (Non-Technical) Staff and Havaldar notice, from June 2025, captures a live photo in the application instead of taking an upload. The signature is a JPEG or JPG between 10 KB and 20 KB, about 6.0 cm wide and 2.0 cm high (para 10.6). FormPic sizes it at 200 DPI as 472 × 157 pixels. The next MTS notice may change this, so check it when it's out.",
    facts: [
      { label: "Photo", value: "Live capture", note: "in the form" },
      { label: "Signature", value: "10–20 KB", note: "JPEG or JPG" },
      { label: "Signature size", value: "6.0 × 2.0 cm", note: "about, para 10.6" },
      { label: "FormPic size", value: "472 × 157 px", note: "at 200 DPI" },
    ],
    spec: {
      title: "SSC MTS & Havaldar upload rules",
      rows: [
        {
          item: "Live photo",
          notes: "Captured in the form. No cap or spectacles, full frontal view",
        },
        {
          item: "Signature",
          printSize: "about 6.0 × 2.0 cm",
          minKb: 10,
          maxKb: 20,
          format: "JPEG/JPG",
        },
      ],
    },
    requirements: {
      title: "What the MTS notice asks for",
      items: [
        "A live photo taken while you fill in the form, not a photo of a photo.",
        "No cap or spectacles, with a full frontal view of your face.",
        "A signature that isn't blurred or miniature.",
        "Your name and date of birth exactly as in your matriculation certificate. SSC checks them against your documents.",
      ],
      note: "MTS and Havaldar share one application. Havaldar candidates also go through a physical test, where your appearance is checked against the application photo.",
    },
    steps: {
      title: "How to prepare your SSC MTS signature",
      items: [
        {
          name: "Sign on plain paper",
          detail: "Sign in black or blue on plain white paper, at your normal size; don't shrink it to fit.",
        },
        {
          name: "Take a straight photo",
          detail: "Photograph the signature from directly above in even light.",
        },
        {
          name: "Crop to a strip",
          detail: "Add it here. The SSC MTS preset frames a 3 : 1 strip; leave a little white space around the ink.",
        },
        {
          name: "Download",
          detail:
            "FormPic picks the highest JPEG quality under 20 KB. If it shows less than 10 KB, press Enlarge to fit.",
        },
      ],
    },
    rejections: {
      title: "Why MTS applications get rejected over images",
      items: [
        "A photo captured of an existing photograph.",
        "A cap or spectacles, or a face that isn't frontal, in the live photo.",
        "A blurred or miniature photo or signature (para 10.6).",
        "A name or date of birth that doesn't match the matriculation certificate.",
      ],
    },
    faqs: [
      {
        question: "Is there an SSC MTS 2026 notice yet?",
        answer:
          "This page follows the MTS and Havaldar 2025 notice, published on 26 June 2025, the latest one on ssc.gov.in when it was checked. When the next notice is out, compare its signature rules with these before you apply.",
      },
      {
        question: "Do Havaldar candidates need a different signature?",
        answer:
          "No. MTS and Havaldar use one application and one signature upload, a 10 to 20 KB JPEG of about 6 × 2 cm.",
      },
      {
        question: "Why does SSC reject miniature signatures?",
        answer:
          "A tiny signature on a large white image becomes unreadable once it's resized onto the admit card. Crop close so the ink fills most of the strip.",
      },
      {
        question: "My signature is under 10 KB. How do I make it bigger?",
        answer:
          "Press Enlarge to fit. FormPic adds pixels in proportion until the JPEG passes 10 KB, without changing the shape.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: SSC_SOURCE_PUBLISHER,
        title: "Multi-Tasking (Non-Technical) Staff and Havaldar Examination, 2025 notice",
        url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_mts_2025.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["ssc-signature", "ssc-gd-photo", "ssc-chsl-photo", "ssc-cgl-photo", "resize-image-10kb-to-20kb"],
  },
  {
    slug: "ssc-gd-photo",
    category: "exam",
    name: "SSC GD photo & signature",
    preset: sscSignature("SSC GD", 300),
    title: "SSC GD Constable photo & signature size",
    metaDescription:
      "SSC GD 2026 takes a live photo; the signature is a 10–20 KB JPEG, about 6 × 2 cm at 300 DPI (709 × 236 px). Crop and resize it free, nothing uploaded.",
    h1: "SSC GD photo & signature",
    h1Accent: ", 300 DPI.",
    intro:
      "The Constable (GD) form captures your photo with the camera. The signature is the file to prepare: about 6 × 2 cm at 300 DPI, between 10 and 20 KB, sized here in your browser.",
    question: "What is the SSC GD photo and signature size?",
    answer:
      "The Constable (GD) 2026 notice captures a live photo while you apply, with your face inside the red rectangle the form draws. The signature is a JPEG or JPG between 10 KB and 20 KB, about 6.0 cm wide and 2.0 cm high at a resolution of 300 DPI, and it must be horizontally aligned. At 300 DPI that's 709 × 236 pixels, which FormPic uses.",
    facts: [
      { label: "Photo", value: "Live capture", note: "inside the red rectangle" },
      { label: "Signature", value: "10–20 KB", note: "JPEG or JPG" },
      { label: "Signature size", value: "6.0 × 2.0 cm", note: "about, at 300 DPI" },
      { label: "FormPic size", value: "709 × 236 px", note: "6 × 2 cm at 300 DPI" },
    ],
    spec: {
      title: "SSC GD 2026 upload rules",
      rows: [
        {
          item: "Live photo",
          notes:
            "Face fully inside the red rectangle. No cap, mask, glasses, earphones or other devices",
        },
        {
          item: "Signature",
          printSize: "about 6.0 × 2.0 cm",
          pixels: "709 × 236 px",
          dpi: 300,
          minKb: 10,
          maxKb: 20,
          format: "JPEG/JPG",
          notes: "Horizontally aligned",
        },
      ],
    },
    requirements: {
      title: "What the GD notice asks for",
      items: [
        "Good light and a plain background for the live photo.",
        "The camera at your eye level, looking straight ahead.",
        "Your face fully inside the red rectangle, neither too close nor too far.",
        "No cap, mask, glasses, earphones or any other device while the photo is captured.",
        "A horizontally aligned signature at about 6 × 2 cm, 300 DPI.",
      ],
      note: "Annexure-III of the notice shows specimens of acceptable and rejected photos and signatures. Candidates who can't use a camera can scan the QR code at S. No. 1 of Upload Documents for SSC's Android app.",
    },
    steps: {
      title: "How to prepare your SSC GD signature",
      items: [
        {
          name: "Sign across the paper",
          detail:
            "Sign in a dark pen on white paper, in a straight horizontal line. The notice asks for a horizontally aligned signature.",
        },
        {
          name: "Photograph it level",
          detail: "Hold the phone flat above the paper, with the paper's edges parallel to the screen.",
        },
        {
          name: "Crop with the GD preset",
          detail:
            "Add the photo here. The SSC GD preset frames 6 × 2 cm at 300 DPI. Rotate if the signature slopes.",
        },
        {
          name: "Download 10–20 KB",
          detail:
            "FormPic picks the best JPEG quality under 20 KB. Under 10 KB? Press Enlarge to fit.",
        },
      ],
    },
    rejections: {
      title: "Why GD applications get rejected over images",
      items: [
        "Miniature signatures. The notice names this as the main reason signatures are rejected.",
        "A photo that doesn't match the acceptable specimen in Annexure-III.",
        "A capture of an existing photograph instead of a live photo.",
        "Illegible, blurred or sloping signatures.",
        "A cap, mask, glasses or earphones in the live photo.",
      ],
    },
    faqs: [
      {
        question: "Why is the GD signature 709 × 236 pixels?",
        answer:
          "The GD notice gives the size as about 6.0 × 2.0 cm at a resolution of 300 DPI. Six centimetres at 300 DPI is 709 pixels and two centimetres is 236. Other SSC notices don't name a DPI, so FormPic uses 200 DPI there.",
      },
      {
        question: "What counts as a miniature signature?",
        answer:
          "A small signature in a large white image, so the ink is only a fraction of the picture. Crop close and let the signature span most of the 6 cm width.",
      },
      {
        question: "Can I wear glasses for the GD live photo?",
        answer:
          "No. The notice says not to wear a cap, mask, glasses or spectacles, and not to wear earphones or any other device while the photo is captured.",
      },
      {
        question: "Does Aadhaar authentication help?",
        answer:
          "The notice says applications from candidates who opt for Aadhaar authentication won't be rejected because the photo or signature doesn't meet the standards. Uploading a clear signature still avoids trouble later.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: SSC_SOURCE_PUBLISHER,
        title: "Constable (GD) in CAPFs, SSF and Rifleman (GD) in Assam Rifles Examination, 2026 notice",
        url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_CTGD_2026.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["ssc-signature", "ssc-mts-photo", "ssc-cgl-photo", "agniveer-photo", "resize-image-10kb-to-20kb"],
  },
];
