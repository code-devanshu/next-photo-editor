import type { PageEntry } from "@/lib/pages/types";

// Category pages. Each lists every published page in its categories, so a new page in a
// category shows up here, in the footer and in the breadcrumbs without further changes.
export const HUB_PAGES: PageEntry[] = [
  {
    slug: "exam-photo-resizer",
    category: "hub",
    hub: ["exam"],
    name: "Exam photo resizer",
    navName: "Exam photos",
    title: "Exam photo resizer: SSC, IBPS, NEET, JEE & more",
    metaDescription:
      "Photo and signature sizes for Indian exam forms, from UPSC, SSC and IBPS to NEET, JEE and GATE, each checked against the official notice. Free, no upload.",
    listTitle: "Pick your exam",
    h1: "Exam photo resizer",
    h1Accent: ", every form.",
    intro:
      "Pick your exam below for its exact photo and signature rules, or choose a size here and start. Each page is checked against the official notice and says when.",
    question: "What photo size do exam forms ask for?",
    answer:
      "It depends on the body running the exam. NTA (NEET, JEE, CUET) wants a passport size photo between 10 and 200 KB. IBPS and SBI prefer 200 × 230 pixels between 20 and 50 KB. UPSC takes 350 to 1000 pixels per side and 20 to 300 KB. SSC and RRB capture your photo live in the form, so only the signature is uploaded. GATE checks pixels and shape: 200 × 260 to 530 × 690 pixels.",
    facts: [
      { label: "NTA", value: "10–200 KB", note: "NEET, JEE, CUET photo" },
      { label: "IBPS & SBI", value: "200 × 230 px", note: "20–50 KB" },
      { label: "UPSC", value: "20–300 KB", note: "350–1000 px per side" },
      { label: "SSC & RRB", value: "Live photo", note: "signature uploaded" },
    ],
    faqs: [
      {
        question: "Why don't SSC and RRB pages have a photo preset?",
        answer:
          "Their current notices capture your photo with the camera while you fill in the form, and reject photos of existing photos. The file you prepare is the signature, so those pages are set up for it.",
      },
      {
        question: "Can I use one photo for several exams?",
        answer:
          "Often, if the rules overlap. NEET, JEE and CUET all take a passport size photo on white between 10 and 200 KB. Bank exams want 200 × 230 px instead, so save a separate copy for them.",
      },
      {
        question: "How do I know the sizes are current?",
        answer:
          "Every exam page shows the date it was last checked and links the notice it was checked against. Notices change between years, so compare with the one you're applying under.",
      },
      {
        question: "My exam isn't listed. What do I do?",
        answer:
          "Choose Custom size, type the pixel size and KB limit from your notice, and download. You can also send a request through the suggestion link below.",
      },
    ],
    sources: [],
    updated: "2026-10-08",
    related: [],
  },
  {
    slug: "signature-resizer",
    category: "hub",
    hub: ["signature"],
    name: "Signature resizer",
    navName: "Signatures",
    title: "Signature resizer for exam forms (KB & pixels)",
    metaDescription:
      "Resize your signature for SSC, IBPS, SBI, RRB, JEE and more: the exact pixels and KB range each form asks for, with official sources. Free, no upload.",
    listTitle: "Pick your form",
    h1: "Signature resizer",
    h1Accent: ", form by form.",
    intro:
      "Every form sets its own signature size and KB range. Pick yours below, or use the table to see the rules side by side. The signature never leaves your browser.",
    question: "What signature size do forms ask for?",
    answer:
      "The range is wide. SSC wants 10 to 20 KB at about 6 × 2 cm. IBPS and SBI prefer 140 × 60 pixels at 10 to 20 KB. RRB asks for 30 to 49 KB in a 35 × 20 mm box. NTA allows 10 to 100 KB for JEE (Main) and 10 to 50 KB for CUET. The most common failure is a file under the minimum, because a signature on white paper compresses very small.",
    facts: [
      { label: "SSC", value: "10–20 KB", note: "about 6 × 2 cm" },
      { label: "IBPS & SBI", value: "140 × 60 px", note: "10–20 KB" },
      { label: "RRB", value: "30–49 KB", note: "35 × 20 mm box" },
      { label: "JEE (Main)", value: "10–100 KB", note: "no pixel size" },
    ],
    spec: {
      title: "Signature rules side by side",
      rows: [
        { item: "SSC (CGL, CHSL, MTS, GD)", printSize: "about 6.0 × 2.0 cm", minKb: 10, maxKb: 20, format: "JPEG/JPG" },
        { item: "IBPS and SBI", pixels: "140 × 60 px", minKb: 10, maxKb: 20, format: "JPG/JPEG", notes: "Black ink, not in capitals" },
        { item: "RRB (NTPC, Group D)", printSize: "35 × 20 mm box", pixels: "at least 140 × 60 px", minKb: 30, maxKb: 49, format: "JPG/JPEG", notes: "Running handwriting, black ink" },
        { item: "JEE (Main) 2026", minKb: 10, maxKb: 100, format: "JPG/JPEG" },
        { item: "CUET (UG) 2026", minKb: 10, maxKb: 50, format: "JPG/JPEG" },
        { item: "CTET", printSize: "3.5 × 1.5 cm", minKb: 3, maxKb: 30, format: "JPG/JPEG" },
        { item: "GATE 2027", pixels: "250 × 80 to 580 × 180 px", minKb: 3, maxKb: 300, format: "JPEG/JPG" },
        { item: "NEET PG 2026", printSize: "3.5 × 1.5 cm box", maxKb: 80, format: "JPG/JPEG" },
      ],
    },
    faqs: [
      {
        question: "Why is my signature under the minimum KB?",
        answer:
          "Black ink on white paper has little detail, so JPEG stores it in very few bytes. FormPic raises the quality first; Enlarge to fit then adds pixels in proportion until the file passes.",
      },
      {
        question: "Black or blue ink?",
        answer:
          "IBPS, SBI and RRB ask for black ink, and RRB lists other ink as a reason for rejection. GATE accepts black or dark blue. When in doubt, use black.",
      },
      {
        question: "Can I sign in capital letters?",
        answer:
          "No, for IBPS, SBI and RRB, which reject signatures in capitals or block letters. Use your normal running signature.",
      },
      {
        question: "How should I photograph my signature?",
        answer:
          "Sign on plain white paper, then photograph it from straight above in daylight, with no shadow from your hand or phone. Crop close in FormPic.",
      },
    ],
    sources: [
      {
        publisher: "Staff Selection Commission",
        title: "Combined Graduate Level Examination, 2026 notice",
        url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2025.pdf",
      },
      {
        publisher: "Institute of Banking Personnel Selection",
        title: "Guidelines for scanning and upload of documents",
        url: "https://ibpsreg.ibps.in/crppoxvjun25/uploads/loadpdf.php?file=k7m5p+fQ15erzNvj0OHb1N7UnJp9sc%2FKYaao1bWrpok%3D&t=1LHArOLA2di0yczXwNDa083LmNWypw%3D%3D",
      },
      {
        publisher: "Railway Recruitment Boards",
        title: "CEN 09/2025: recruitment to Level 1 posts",
        url: "https://rrbsecunderabad.gov.in/wp-content/uploads/2026/01/Final-Detailed-CEN-09-2025-Level-1-updated-on-30.01.2026.pdf",
      },
      {
        publisher: "National Testing Agency",
        title: "JEE (Main) 2026 information bulletin",
        url: "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2025/10/202510311145384616.pdf",
      },
      {
        publisher: "National Testing Agency",
        title: "CUET (UG) 2026 information bulletin",
        url: "https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2026/01/202601031633478370.pdf",
      },
      {
        publisher: "Central Board of Secondary Education",
        title: "CTET September 2026 information bulletin",
        url: "https://cdnbbsr.s3waas.gov.in/s3443dec3062d0286986e21dc0631734c9/uploads/2026/05/202605111250310617.pdf",
      },
      {
        publisher: "IIT Madras (GATE 2027)",
        title: "GATE 2027: photograph and signature",
        url: "https://gate2027.iitm.ac.in/photograph_and_signature",
      },
      {
        publisher: "National Board of Examinations in Medical Sciences",
        title: "NEET-PG 2026 image upload instructions",
        url: "https://g03.tcsion.com//per/g03/pub/726/EForms/image/ImageDocUpload/71161/5/8301129860.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: [],
  },
  {
    slug: "resize-image-kb",
    category: "hub",
    hub: ["kb"],
    limit: { maxKb: 50 },
    name: "Resize image in KB",
    navName: "Resize in KB",
    title: "Resize image in KB: 5 KB to 300 KB, or any size",
    metaDescription:
      "Compress a photo or signature to any KB limit, or raise a small file above a minimum. Pages for 5 KB to 300 KB and common ranges. Free, never uploaded.",
    listTitle: "Common limits and ranges",
    h1: "Resize image in KB",
    h1Accent: ", any limit.",
    intro:
      "Set a maximum, a minimum or both, and FormPic finds the best JPEG quality inside the range. Pick a common limit below, or type your own here.",
    question: "How does resizing to a KB limit work?",
    answer:
      "FormPic keeps your pixel size and searches for the highest JPEG quality whose file fits under the maximum. If the lowest quality still doesn't fit, Shrink to fit lowers the pixels in proportion. For a minimum, it raises the quality, then Enlarge to fit adds pixels. Maximums are counted as 1,000 bytes per KB and minimums as 1,024, so the file passes either way a portal counts.",
    facts: [
      { label: "Maximum", value: "Quality down", note: "then Shrink to fit" },
      { label: "Minimum", value: "Quality up", note: "then Enlarge to fit" },
      { label: "1 KB", value: "1,000 or 1,024", note: "the stricter one wins" },
    ],
    faqs: [
      {
        question: "Does reducing KB change the pixel size?",
        answer:
          "No, unless you press Shrink to fit or type a new size. FormPic lowers the JPEG quality first and keeps your width and height.",
      },
      {
        question: "Which limit should I pick if the form gives a range?",
        answer:
          "Use the range pages, like 10–20 KB or 20–50 KB, which set both ends. FormPic then aims for the best quality under the maximum and above the minimum.",
      },
      {
        question: "Can I compress a PNG to a KB limit?",
        answer:
          "Limits apply to JPEG, which is what most forms want. Add a PNG, keep the format on JPEG, and FormPic converts and compresses it.",
      },
      {
        question: "Is anything uploaded?",
        answer: "No. The compression happens in your browser, so the image never leaves your device.",
      },
    ],
    sources: [],
    updated: "2026-10-08",
    related: [],
  },
  {
    slug: "visa-photo",
    category: "hub",
    hub: ["visa", "id"],
    name: "Passport, visa & ID photos",
    navName: "Passport & visa",
    title: "Passport, visa & ID photo maker (35×45, 2×2 in)",
    metaDescription:
      "Photo sizes for passports, visas and Indian ID: passport size, US 2×2 in, UK, Schengen, Australia, OCI, PAN and voter ID, from official rules. No upload.",
    listTitle: "Pick your document",
    h1: "Passport, visa & ID photos",
    h1Accent: ", to official sizes.",
    intro:
      "Pick the document below for its exact size, background and file rules, or start with a size here. Each page links the official source it was checked against.",
    question: "What size is a passport or visa photo?",
    answer:
      "Most countries use 35 × 45 mm, including India, the UK and the Schengen countries, but the backgrounds differ: Indian passports want white, the UK cream or light grey, Germany a light neutral grey. The US uses a 2 × 2 inch square. Online applications add their own pixel and KB rules, like the UK's 600 × 750 pixel minimum or OCI's 200 KB maximum.",
    facts: [
      { label: "India, UK, Schengen", value: "35 × 45 mm", note: "backgrounds differ" },
      { label: "US", value: "2 × 2 in", note: "600 × 600 px online" },
      { label: "OCI", value: "Square", note: "200–900 px, ≤ 200 KB" },
      { label: "PAN card", value: "25 × 35 mm", note: "≤ 20 KB" },
    ],
    faqs: [
      {
        question: "Can I use the same photo for a passport and a visa?",
        answer:
          "Only if the rules match. The size is often the same, 35 × 45 mm, but backgrounds and head sizes differ between countries, so check each page.",
      },
      {
        question: "Does FormPic change the background?",
        answer:
          "No. It crops and resizes only, which most authorities require anyway: Australia, for one, asks for unedited photos. Take the photo against the right colour wall.",
      },
      {
        question: "Do I need a photo for an Indian passport appointment?",
        answer:
          "Not at a Passport Seva Kendra or Post Office Passport Seva Kendra, where your photo is taken. Paper applications at other collection centres need a 4.5 × 3.5 cm photo on white.",
      },
      {
        question: "Is my photo uploaded?",
        answer: "No. FormPic works entirely in your browser.",
      },
    ],
    sources: [],
    updated: "2026-10-08",
    related: [],
  },
];
