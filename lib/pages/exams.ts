import type { PageEntry } from "@/lib/pages/types";

const SIGNATURE_NOTE =
  "FormPic crops and resizes but doesn't clean up the image, so sign on plain white paper and photograph it in even light. Rules change from time to time, so check the official notice for your exam before you submit.";

// Exam and recruitment forms, with their signature uploads.
export const EXAM_PAGES: PageEntry[] = [
  {
    slug: "upsc-photo",
    category: "exam",
    name: "UPSC photo",
    featured: true,
    // UPSC accepts 350 to 1000 px per side; passport size at 300 DPI sits inside that range.
    preset: {
      name: "UPSC",
      spec: "35×45 mm",
      printMm: { width: 35, height: 45 },
      aspect: 35 / 45,
      width: 413,
      height: 531,
      dpi: 300,
      maxKb: 300,
      minKb: 20,
    },
    title: "UPSC photo and signature size (JPG, 20–300 KB)",
    metaDescription:
      "Resize your photo for the UPSC online application: a JPG between 20 KB and 300 KB, 350 to 1000 pixels per side. Signature steps too. Free, and nothing is uploaded.",
    h1: "UPSC photo resizer",
    h1Accent: ", 20 to 300 KB.",
    intro:
      "Crop a photo to a size UPSC's online application accepts and download a JPG between 20 and 300 KB. It all happens in your browser.",
    question: "What size should a UPSC photo be?",
    answer:
      "UPSC asks for the photo and the signature as JPG files between 20 KB and 300 KB, each between 350 × 350 and 1000 × 1000 pixels. UPSC doesn't set a print size, so FormPic uses passport size, 35 × 45 mm at 300 DPI (413 × 531 pixels), which sits inside that range. For the Civil Services Examination you also capture a live photo with your camera while filling in the form.",
    facts: [
      { label: "File size", value: "20–300 KB", note: "photo and signature" },
      { label: "Pixels", value: "350–1000 px", note: "width and height" },
      { label: "File type", value: "JPG", note: "photo ID goes up as a PDF" },
      { label: "FormPic size", value: "413 × 531 px", note: "35 × 45 mm at 300 DPI" },
      { label: "Signature", value: "Signed 3 times", note: "one below the other" },
    ],
    requirements: {
      title: "UPSC photo requirements",
      items: [
        "A clear, recent photo in which your face is easy to make out.",
        "Between 350 and 1000 pixels in both width and height.",
        "For the Civil Services Examination, a signature signed three times, one below the other, on plain white paper in black ink.",
        "A live photo, captured with your camera in the application form, alongside the uploaded one.",
      ],
    },
    steps: { title: "How to make a UPSC photo" },
    faqs: [
      {
        question: "How do I resize my UPSC signature?",
        answer:
          "Sign three times, one below the other, on plain white paper in black ink, and photograph the page. Upload it here, choose Free and crop around all three signatures, then check that Width and Height are both between 350 and 1000 px. Type 300 into Max file size, and make sure the Download button shows at least 20 KB.",
      },
      {
        question: "What if my UPSC photo is under 20 KB?",
        answer:
          "UPSC doesn't accept files under 20 KB. With the UPSC preset, FormPic raises the JPEG quality to stay above it, and if the file is still too small, Enlarge to fit adds pixels without changing the shape.",
      },
      {
        question: "Can I use a passport size photo for UPSC?",
        answer:
          "Yes. UPSC sets a pixel range, not a print size, and a passport size photo at 413 × 531 pixels is inside it. Any other size from 350 to 1000 pixels per side works too: type it into Width and Height.",
      },
      {
        question: "Is my photo uploaded to FormPic?",
        answer:
          "No. FormPic crops and compresses the photo in your browser, so it never leaves your device. The only place it goes is the form you upload it to.",
      },
    ],
    sources: [
      {
        publisher: "Union Public Service Commission",
        title: "One Time Registration: frequently asked questions",
        url: "https://upsconline.gov.in/OTRP/candidate/faq.php",
      },
      {
        publisher: "Union Public Service Commission",
        title: "Civil Services (Preliminary) Examination 2026 notice",
        url: "https://www.upsc.gov.in/sites/default/files/Notif-CSP-2026-Engl-060226Rev.pdf",
      },
    ],
    lastVerified: "2026-10-07",
    updated: "2026-10-07",
    related: [
      "neet-photo",
      "ibps-photo",
      "ssc-signature",
      "passport-size-photo",
      "resize-image-to-200kb",
    ],
  },
  {
    slug: "neet-photo",
    category: "exam",
    name: "NEET photo",
    featured: true,
    preset: {
      name: "NEET",
      spec: "35×45 mm",
      printMm: { width: 35, height: 45 },
      aspect: 35 / 45,
      width: 413,
      height: 531,
      dpi: 300,
      maxKb: 200,
      minKb: 10,
    },
    title: "NEET photo size (JPG, 10–200 KB) and signature resizer",
    metaDescription:
      "Resize your photo for the NEET (UG) application: a passport size JPG between 10 KB and 200 KB on a white background, face filling 80% of the photo. Free, no upload.",
    h1: "NEET photo resizer",
    h1Accent: ", 10 to 200 KB.",
    intro:
      "Crop a passport size photo for the NEET (UG) application and download a JPG inside NTA's size limits. Your photo stays in your browser.",
    question: "What size should the NEET photo be?",
    answer:
      "The NEET (UG) 2026 information bulletin asks for a recent passport size photo, in colour or black and white, as a JPG between 10 KB and 200 KB. Your face, with both ears visible, should fill about 80% of the photo, against a white background. The signature goes up separately as a JPG between 10 KB and 100 KB. NTA doesn't give a pixel size, so FormPic uses passport size at 300 DPI: 413 × 531 pixels.",
    facts: [
      { label: "Photo", value: "10–200 KB", note: "JPG, passport size" },
      { label: "Signature", value: "10–100 KB", note: "JPG" },
      { label: "Face", value: "80%", note: "of the photo, ears visible" },
      { label: "Background", value: "White", note: "colour or black and white photo" },
      { label: "FormPic size", value: "413 × 531 px", note: "35 × 45 mm at 300 DPI" },
    ],
    requirements: {
      title: "NEET photo requirements",
      items: [
        "Recent. The 2026 bulletin asked for a photo taken after 1 January 2026.",
        "White background. Colour and black and white photos are both accepted.",
        "Face without a mask, filling about 80% of the photo, with both ears visible.",
        "Glasses only if you wear them regularly.",
        "Keep prints of the same photo: 6 to 8 passport size and 4 to 6 postcard size (4 × 6 in), for the exam centre and counselling.",
      ],
    },
    steps: { title: "How to make a NEET photo" },
    faqs: [
      {
        question: "Does NEET still ask for a postcard size photo upload?",
        answer:
          "Not in the 2026 bulletin. It lists a passport size photo for upload and asks you to keep 4 to 6 postcard size (4 × 6 in) prints with a white background. NTA has changed this between years, so check the bulletin for your year.",
      },
      {
        question: "What is the live photo in the NEET form?",
        answer:
          "While filling in the form, you capture a live photo with your webcam or phone camera, and NTA matches it against your Aadhaar photo. That happens inside the NEET form. FormPic is for the passport size photo you upload as well.",
      },
      {
        question: "How do I resize my NEET signature?",
        answer:
          "Sign on plain white paper and photograph it. Upload it here, choose Free and crop close around the signature, then type 100 into Max file size. NTA's minimum is 10 KB, so check the size on the Download button before you save.",
      },
      {
        question: "Is my photo uploaded to FormPic?",
        answer:
          "No. FormPic crops and compresses the photo in your browser, so it never leaves your device. The only place it goes is the form you upload it to.",
      },
    ],
    sources: [
      {
        publisher: "National Testing Agency",
        title: "NEET (UG) 2026 information bulletin",
        url: "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/02/202602231394640855.pdf",
      },
    ],
    lastVerified: "2026-10-07",
    updated: "2026-10-07",
    related: [
      "upsc-photo",
      "resize-image-to-200kb",
      "resize-image-to-100kb",
      "passport-size-photo",
      "ibps-photo",
    ],
  },
  {
    slug: "ibps-photo",
    category: "exam",
    name: "IBPS photo",
    featured: true,
    // IBPS gives a 4.5 × 3.5 cm print but prefers 200 × 230 px, so the crop follows the pixels.
    preset: {
      name: "IBPS",
      spec: "35×45 mm",
      printMm: { width: 35, height: 45 },
      aspect: 200 / 230,
      width: 200,
      height: 230,
      maxKb: 50,
      minKb: 20,
    },
    title: "IBPS photo and signature size (200×230 px, 20–50 KB)",
    metaDescription:
      "Resize your photo for IBPS bank exam forms: a 200 × 230 px JPEG between 20 and 50 KB, plus the signature, thumb impression and declaration sizes. Free, no upload.",
    h1: "IBPS photo resizer",
    h1Accent: ", 200 × 230 px.",
    intro:
      "Crop a photo to the size IBPS application forms ask for and download a JPEG between 20 and 50 KB. Everything runs in your browser.",
    question: "What size is the IBPS photo?",
    answer:
      "IBPS asks for a recent passport style colour photo, preferably 200 × 230 pixels, as a JPG or JPEG between 20 KB and 50 KB. The signature is 140 × 60 pixels and 10–20 KB, the left thumb impression 240 × 240 pixels and 20–50 KB, and the handwritten declaration 800 × 400 pixels and 50–100 KB. You also capture a live photo with your webcam or phone during the application.",
    facts: [
      { label: "Photo", value: "200 × 230 px", note: "preferred size" },
      { label: "Photo file", value: "20–50 KB", note: "JPG or JPEG" },
      { label: "Signature", value: "140 × 60 px", note: "10–20 KB, black ink" },
      { label: "Left thumb", value: "240 × 240 px", note: "20–50 KB" },
      { label: "Declaration", value: "800 × 400 px", note: "50–100 KB, handwritten" },
    ],
    requirements: {
      title: "IBPS photo requirements",
      items: [
        "A recent colour photo against a light, preferably white, background.",
        "Looking straight at the camera with a relaxed face, with no harsh shadows or red-eye.",
        "Glasses only if there are no reflections and your eyes are clearly visible. No caps, hats or dark glasses.",
        "Religious headwear is allowed, as long as it doesn't cover your face.",
      ],
    },
    steps: { title: "How to make a IBPS photo" },
    faqs: [
      {
        question: "How do I resize my IBPS signature to 140 × 60 px?",
        answer:
          "Sign on white paper with a black pen, not in capital letters, and photograph it. Upload it here, choose Free and drag the crop into a wide strip around the signature, then turn off the aspect lock and type 140 and 60. Type 20 into Max file size. A signature this small can come out under the 10 KB minimum; if the Download button shows less, try a larger size with the same shape, such as 280 × 120.",
      },
      {
        question: "How do I make the thumb impression and handwritten declaration?",
        answer:
          "The same way as the signature. For the thumb, press your left thumb on white paper with black or blue ink, crop to it, type 240 × 240 px and a Max file size of 50 KB. For the declaration, write the text IBPS gives in English, not in capitals, on white paper in black ink, crop to it, and type 800 × 400 px with a Max file size of 100 KB.",
      },
      {
        question: "What if my IBPS photo is under 20 KB?",
        answer:
          "A 200 × 230 px photo can come out small. With the IBPS preset, FormPic raises the JPEG quality to get above 20 KB, and if that isn't enough, Enlarge to fit adds pixels without changing the shape. IBPS calls 200 × 230 px the preferred size rather than a fixed one.",
      },
      {
        question: "Is my photo uploaded to FormPic?",
        answer:
          "No. FormPic crops and compresses the photo in your browser, so it never leaves your device. The only place it goes is the form you upload it to.",
      },
    ],
    sources: [
      {
        publisher: "Institute of Banking Personnel Selection",
        title: "Guidelines for scanning and upload of documents",
        url: "https://ibpsreg.ibps.in/crppoxvjun25/uploads/loadpdf.php?file=k7m5p+fQ15erzNvj0OHb1N7UnJp9sc%2FKYaao1bWrpok%3D&t=1LHArOLA2di0yczXwNDa083LmNWypw%3D%3D",
      },
    ],
    lastVerified: "2026-10-07",
    updated: "2026-10-07",
    related: [
      "ssc-signature",
      "upsc-photo",
      "resize-image-to-50kb",
      "resize-image-to-20kb",
    ],
  },
  {
    slug: "ssc-signature",
    category: "signature",
    name: "SSC signature",
    featured: true,
    preset: {
      name: "SSC signature",
      kind: "signature",
      spec: "60×20 mm",
      printMm: { width: 60, height: 20 },
      aspect: 3,
      width: 472,
      height: 157,
      dpi: 200,
      maxKb: 20,
      minKb: 10,
    },
    title: "SSC signature resize (6 × 2 cm, 10–20 KB) and photo rules",
    metaDescription:
      "Resize your signature for SSC exam forms: a JPEG between 10 and 20 KB, about 6.0 × 2.0 cm. SSC captures your photo live in the form, so the signature is what you upload.",
    h1: "SSC signature resizer",
    h1Accent: ", 10 to 20 KB.",
    intro:
      "SSC takes your photo with the camera while you fill in the form, so the signature is the image to prepare. Crop it and download a JPEG between 10 and 20 KB, right in your browser.",
    question: "What is the SSC photo and signature size?",
    answer:
      "SSC asks for a scanned signature as a JPEG between 10 KB and 20 KB, about 6.0 cm wide and 2.0 cm high. There's no photo to upload: the application captures a live photo with your device's camera, and SSC rejects applications where the camera is pointed at an existing photo. At 200 DPI the signature works out to 472 × 157 pixels.",
    facts: [
      { label: "Signature", value: "10–20 KB", note: "JPEG or JPG" },
      { label: "Print size", value: "6.0 × 2.0 cm", note: "width × height, about" },
      { label: "Pixels", value: "472 × 157 px", note: "at 200 DPI" },
      { label: "Photo", value: "Live capture", note: "taken in the form, not uploaded" },
    ],
    requirements: {
      title: "SSC signature requirements",
      items: [
        "Signature as a JPEG or JPG between 10 and 20 KB.",
        "About 6.0 cm wide and 2.0 cm high.",
        "Clear and full size. SSC rejects blurred or miniature signatures.",
        "For the live photo: good light, a plain background, the camera at eye level, and no cap, mask or glasses.",
      ],
      note: SIGNATURE_NOTE,
    },
    steps: { title: "How to make a SSC signature" },
    faqs: [
      {
        question: "Do I need to upload a photo for SSC?",
        answer:
          "No. Current SSC notices, such as the Stenographer 2026 notice, say the application captures your photo with the camera. Capturing a photo of an existing photo gets the application rejected, so sit in front of the camera yourself.",
      },
      {
        question: "How do I get my SSC signature between 10 and 20 KB?",
        answer:
          "Keep the SSC signature preset. It sets 472 × 157 px with a 20 KB limit and checks the 10 KB minimum. A signature on white paper can come out under 10 KB; if it does, press Enlarge to fit and FormPic adds pixels until the file is big enough.",
      },
      {
        question: "Does Aadhaar authentication change the photo and signature rules?",
        answer:
          "SSC says applications from candidates who choose Aadhaar based authentication during One-Time Registration won't be rejected because the photo or signature doesn't meet the standards. A clear signature is still worth uploading.",
      },
      {
        question: "Is my signature uploaded to FormPic?",
        answer:
          "No. FormPic crops and compresses the image in your browser, so it never leaves your device. The only place it goes is the SSC form.",
      },
    ],
    sources: [
      {
        publisher: "Staff Selection Commission",
        title: "Stenographer Grade C & D Examination 2026 notice",
        url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_steno_2026.pdf",
      },
    ],
    lastVerified: "2026-10-07",
    updated: "2026-10-07",
    related: [
      "ibps-photo",
      "resize-image-to-20kb",
      "resize-image-to-10kb",
      "upsc-photo",
    ],
  },
];
