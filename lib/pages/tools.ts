import type { PageEntry } from "@/lib/pages/types";

// Pages built around a FormPic feature rather than one form's rules.
export const TOOL_PAGES: PageEntry[] = [
  {
    slug: "photo-with-name-and-date",
    category: "tool",
    name: "Photo with name and date",
    stamp: true,
    preset: {
      name: "Name & date",
      spec: "35×45 mm",
      printMm: { width: 35, height: 45 },
      aspect: 35 / 45,
      width: 413,
      height: 531,
      dpi: 300,
    },
    title: "Add name and date on photo online (free)",
    metaDescription:
      "Print your name and the photo date on a white strip below your face, as some exam forms ask. Passport size or any size, free, and never uploaded.",
    h1: "Name and date on photo",
    h1Accent: ", printed below.",
    intro:
      "Type your name and the date the photo was taken, and FormPic prints them on a white strip at the bottom of the photo, sized to fit. It all happens in your browser.",
    question: "How do I add my name and date to a photo?",
    answer:
      "Add your photo, then type your name and check the date under Name and date on photo; both are printed in black on a white strip across the bottom 18% of the photo, the name in capitals on the first line and the date (DD/MM/YYYY) on the second. The text shrinks to fit the width. The page starts at passport size, 35 × 45 mm, and the option works with any size except signature and thumb presets.",
    facts: [
      { label: "Strip", value: "Bottom 18%", note: "white, across the photo" },
      { label: "Line 1", value: "NAME", note: "in capitals" },
      { label: "Line 2", value: "DD/MM/YYYY", note: "date the photo was taken" },
      { label: "Size", value: "35 × 45 mm", note: "or any other" },
    ],
    requirements: {
      title: "Framing a photo for the name strip",
      items: [
        "Leave room below your chin: the strip covers the bottom 18% of the photo, usually your shoulders.",
        "Type your name exactly as on the application form, including initials.",
        "Use the date the photo was taken, not the date you apply, unless the notice says otherwise.",
        "Check your notice for the layout it wants. Some forms ask for the name and date in a box, or on a slate held in the photo, which FormPic can't add.",
      ],
      note: "SSC's current notices for CGL, CHSL, MTS and GD capture your photo live in the form, so they don't ask for a printed name and date. Always follow the photo instructions in the notice you're applying under.",
    },
    steps: {
      title: "How to add your name and date",
      items: [
        { name: "Add a photo", detail: "Choose a recent photo or take one with Use camera." },
        {
          name: "Frame with room below",
          detail: "Drag the crop so your face sits in the top three quarters. The strip covers the rest.",
        },
        {
          name: "Type your name and date",
          detail:
            "Under Name and date on photo, type your name and set the date. The preview updates as you type.",
        },
        {
          name: "Set the size and download",
          detail: "Type the form's pixel size and file size limit if it gives them, then download.",
        },
      ],
    },
    faqs: [
      {
        question: "Which forms ask for the name and date on the photo?",
        answer:
          "It varies by notice, so FormPic doesn't keep a list. Look in the photo instructions of your form's notice for words like \"name and date of taking the photograph\". If it isn't mentioned, upload the photo without them.",
      },
      {
        question: "Does SSC need name and date on the photo?",
        answer:
          "Not in the current CGL, CHSL, MTS and GD notices. They capture your photo live with the camera while you fill in the form, and only the signature is uploaded.",
      },
      {
        question: "Will the strip cover my face?",
        answer:
          "Not if you leave room below your chin. The strip is a fixed 18% of the photo's height, so frame your face in the upper part of the crop box.",
      },
      {
        question: "Can I change the font or position?",
        answer:
          "No. FormPic uses a bold, plain font in black on white, centred, name above date, which prints clearly at small sizes. Each line shrinks to fit the width.",
      },
      {
        question: "Can I add the name and date on other pages?",
        answer:
          "Yes. On any photo size page, tick Name and date on photo under Pick the size after you add your photo.",
      },
      {
        question: "Is my photo or name uploaded?",
        answer:
          "No. The text is drawn on the photo in your browser, and nothing is sent anywhere.",
      },
    ],
    sources: [],
    updated: "2026-10-08",
    related: ["passport-size-photo", "ssc-cgl-photo", "resize-image-to-50kb", "resize-image-20kb-to-50kb"],
  },
  {
    slug: "jpg-to-pdf-under-100kb",
    category: "tool",
    name: "JPG to PDF under 100 KB",
    tool: "pdf",
    limit: { maxKb: 100 },
    title: "JPG to PDF under 100 KB, in your browser",
    metaDescription:
      "Convert JPG, PNG or WEBP images to one PDF under 100 KB, or any limit, for exam and job uploads. Made on your device, free, nothing uploaded.",
    h1: "JPG to PDF under 100 KB",
    h1Accent: ", no upload.",
    intro:
      "Add one or more images, put them in order, and FormPic makes a PDF that fits your size limit, one A4 page per image. The PDF is built on your device.",
    question: "How do I convert a JPG to a PDF under 100 KB?",
    answer:
      "Add your images; each becomes one A4 page, in the order shown. With Max PDF size on 100 KB, FormPic gives every page an equal share of the limit, compresses each image to the best JPEG quality that fits, and only lowers the pixel size if it has to. The PDF is assembled in your browser, so the documents never leave your device.",
    facts: [
      { label: "Limit", value: "100 KB", note: "or 50, 200, 300, any" },
      { label: "Pages", value: "Up to 20", note: "one per image" },
      { label: "Page size", value: "A4", note: "portrait or landscape" },
      { label: "Upload", value: "None", note: "made on your device" },
    ],
    spec: {
      title: "Forms that ask for PDF uploads",
      rows: [
        { item: "JEE (Main) 2026 Class 10 certificate", minKb: 50, maxKb: 300, format: "PDF" },
        { item: "CUET (UG) 2026 disability / UDID certificate", minKb: 50, maxKb: 300, format: "PDF" },
        { item: "RRB SC/ST certificate (free travel pass)", maxKb: 400, format: "PDF", notes: "Legible, latest valid certificate" },
      ],
    },
    requirements: {
      title: "Getting a readable PDF under 100 KB",
      items: [
        "Crop each scan to the page edges first in the photo editor; background costs bytes.",
        "Photograph documents flat in daylight, so the paper comes out white.",
        "Fewer pages leave more of the limit for each. A one-page certificate stays very sharp at 100 KB.",
        "If the form also sets a minimum, like 50 KB, pick a higher limit so the PDF lands inside the range.",
      ],
    },
    steps: {
      title: "How to make a PDF under 100 KB",
      items: [
        { name: "Add images", detail: "Choose one or more JPG, PNG or WEBP images. Each becomes an A4 page." },
        { name: "Order the pages", detail: "Use the arrows to reorder pages, or remove one with the cross." },
        { name: "Pick the limit", detail: "Keep 100 KB, choose 50, 200 or 300 KB, or type another limit." },
        { name: "Download", detail: "The button shows the PDF's size. It updates whenever you change the pages or limit." },
      ],
    },
    faqs: [
      {
        question: "Is my document uploaded to make the PDF?",
        answer:
          "No. FormPic compresses the images and writes the PDF inside your browser. Nothing is sent to a server, which matters for certificates and ID documents.",
      },
      {
        question: "Why is my PDF blurry?",
        answer:
          "Too many pages for the limit. Each page gets an equal share, so 5 pages under 100 KB get about 20 KB each. Remove pages you don't need, or raise the limit if the form allows it.",
      },
      {
        question: "Can I turn a PDF back into a JPG?",
        answer:
          "Not here; FormPic reads images, not PDFs. Take a screenshot of the PDF page, crop it in the photo editor, and download it as a JPEG.",
      },
      {
        question: "What page size does the PDF use?",
        answer:
          "A4. Portrait images get a portrait page and landscape images a landscape page, each image scaled to fit and centred.",
      },
      {
        question: "My form wants 50 to 300 KB. Which limit should I pick?",
        answer:
          "Pick 300 KB, or a little under. FormPic aims for the best quality under the limit, so the PDF usually lands well above 50 KB.",
      },
    ],
    sources: [
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
        publisher: "Railway Recruitment Boards",
        title: "CEN 09/2025: recruitment to Level 1 posts",
        url: "https://rrbsecunderabad.gov.in/wp-content/uploads/2026/01/Final-Detailed-CEN-09-2025-Level-1-updated-on-30.01.2026.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["resize-image-to-100kb", "resize-image-to-300kb", "jee-main-photo", "rrb-group-d-photo"],
  },
];
