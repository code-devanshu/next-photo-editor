import type { PageEntry } from "@/lib/pages/types";

// Passport, visa and ID document photos. Pixel sizes are the physical size at the DPI each
// document is specified at: 300 DPI for print-quality passport photos, 200 DPI per Protean's PAN scan spec.
export const DOCUMENT_PAGES: PageEntry[] = [
  {
    slug: "passport-size-photo",
    category: "visa",
    name: "Passport size photo",
    featured: true,
    preset: {
      name: "Passport size",
      spec: "35×45 mm",
      printMm: { width: 35, height: 45 },
      aspect: 35 / 45,
      width: 413,
      height: 531,
      dpi: 300,
    },
    title: "Passport size photo maker (35×45 mm, 413×531 px)",
    metaDescription:
      "Make a passport size photo online: crop to 35 × 45 mm (3.5 × 4.5 cm) and download a 413 × 531 px JPEG. Free, works on your phone, and the photo is never uploaded.",
    h1: "Passport size photo maker",
    h1Accent: ", 35 × 45 mm.",
    intro:
      "Crop a photo to the standard passport size and download it at the exact pixel size application forms accept. Everything runs in your browser, so the photo never leaves your device.",
    question: "What size is a passport size photo?",
    answer:
      "A passport size photo is 35 mm wide and 45 mm high (3.5 × 4.5 cm). At 300 DPI that's 413 × 531 pixels. It's the standard size for Indian and UK passports, Schengen visas, and many Indian exam and job application forms.",
    facts: [
      { label: "Print size", value: "35 × 45 mm", note: "3.5 × 4.5 cm" },
      { label: "Pixels", value: "413 × 531 px", note: "at 300 DPI" },
      { label: "Aspect ratio", value: "7 : 9", note: "portrait" },
      { label: "File type", value: "JPEG", note: "for online uploads" },
      { label: "Head size", value: "70–80%", note: "of the photo height, chin to crown" },
    ],
    requirements: {
      title: "Passport size photo requirements",
      items: [
        "Taken in the last six months.",
        "Plain white or off-white background, with no shadows.",
        "Facing the camera with a neutral expression and both eyes open.",
        "No filters or retouching. Most countries no longer accept glasses.",
      ],
    },
    steps: { title: "How to make a passport size photo" },
    faqs: [
      {
        question: "How many pixels is a 3.5 × 4.5 cm photo?",
        answer:
          "413 × 531 pixels at 300 DPI, or 276 × 354 pixels at 200 DPI. If a form gives its own pixel size, type it into the Width and Height fields instead.",
      },
      {
        question: "Is a 2 × 2 inch photo the same as passport size?",
        answer:
          "No. 2 × 2 inches (51 × 51 mm) is the square photo used for US passports and visas. Passport size in India, the UK and Europe is 35 × 45 mm. Use the US passport preset for US applications.",
      },
      {
        question: "How do I make a passport size photo under 50 KB?",
        answer:
          "Keep the format on JPEG and choose 50 KB under Max file size. FormPic picks the highest quality that fits, and the Download button shows the final size.",
      },
      {
        question: "Can I make a passport size photo on my phone?",
        answer:
          "Yes. Open this page on your phone, tap Use camera or pick a photo from your gallery, then crop and download. It works in any modern mobile browser.",
      },
    ],
    sources: [
      {
        publisher: "GOV.UK",
        title: "Get a passport photo: photo requirements",
        url: "https://www.gov.uk/photos-for-passports/photo-requirements",
      },
    ],
    lastVerified: "2026-10-07",
    updated: "2026-10-07",
    related: [
      "us-passport-photo",
      "pan-card-photo",
      "upsc-photo",
      "neet-photo",
      "resize-image-to-50kb",
      "resize-image-to-20kb",
    ],
  },
  {
    slug: "us-passport-photo",
    category: "visa",
    name: "US passport & visa photo",
    featured: true,
    preset: {
      name: "US passport & visa",
      spec: "2×2 in",
      printMm: { width: 50.8, height: 50.8 },
      aspect: 1,
      width: 600,
      height: 600,
      dpi: 300,
      maxKb: 240,
    },
    title: "US passport & visa photo (2×2 in, 600×600 px)",
    metaDescription:
      "Make a US passport or visa photo online: a square 2 × 2 inch crop, exported as a 600 × 600 px JPEG under 240 KB for the DS-160. Free and private, with no upload.",
    h1: "US passport & visa photo",
    h1Accent: ", 2 × 2 in.",
    intro:
      "Crop a square 2 × 2 inch photo and export it at the pixel size the State Department's online forms accept. The photo is processed in your browser and never uploaded.",
    question: "What size is a US passport or visa photo?",
    answer:
      "A US passport or visa photo is 2 × 2 inches (51 × 51 mm). For online visa applications such as the DS-160, the digital photo must be a square JPEG between 600 × 600 and 1200 × 1200 pixels, 240 KB or smaller, with the head taking up 50–69% of the image height.",
    facts: [
      { label: "Print size", value: "2 × 2 in", note: "51 × 51 mm" },
      { label: "Pixels", value: "600 × 600 px", note: "up to 1200 × 1200" },
      { label: "Aspect ratio", value: "1 : 1", note: "square" },
      { label: "File type", value: "JPEG", note: "sRGB colour" },
      { label: "File size", value: "≤ 240 KB", note: "for digital uploads" },
      { label: "Head size", value: "50–69%", note: "of the image height" },
    ],
    requirements: {
      title: "US passport or visa photo requirements",
      items: [
        "Taken in the last six months.",
        "Plain white or off-white background.",
        "Head 1 to 1⅜ inches (25–35 mm) from chin to the top of the head.",
        "Neutral expression or a natural smile, with both eyes open.",
        "No glasses.",
      ],
    },
    steps: { title: "How to make a US passport or visa photo" },
    faqs: [
      {
        question: "What size should a DS-160 photo be in pixels?",
        answer:
          "Between 600 × 600 and 1200 × 1200 pixels, square, as a JPEG of 240 KB or less. The preset exports at 600 × 600 px. For a sharper image, type 1200 into the Width field and the height follows.",
      },
      {
        question: "Can I wear glasses in a US passport photo?",
        answer:
          "No. Glasses haven't been allowed in US passport and visa photos since November 2016, except in rare medical cases backed by a signed statement from a doctor.",
      },
      {
        question: "Is the US photo size the same as Indian passport size?",
        answer:
          "No. The US uses a square 2 × 2 inch photo. Indian passports use 35 × 45 mm, which is taller than it is wide.",
      },
      {
        question: "How do I keep the file under 240 KB?",
        answer:
          "The US preset sets a 240 KB limit for you, so FormPic picks the highest JPEG quality that fits. A 600 × 600 px JPEG is usually well under it anyway.",
      },
    ],
    sources: [
      {
        publisher: "U.S. Department of State",
        title: "Digital image requirements for visa photos",
        url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/digital-image-requirements.html",
      },
      {
        publisher: "U.S. Department of State",
        title: "Passport photos",
        url: "https://travel.state.gov/en/passports/apply/help/photos.html",
      },
    ],
    lastVerified: "2026-10-07",
    updated: "2026-10-07",
    related: [
      "passport-size-photo",
      "resize-image-to-200kb",
      "resize-image-to-100kb",
      "pan-card-photo",
    ],
  },
  {
    slug: "pan-card-photo",
    category: "id",
    name: "PAN card photo",
    featured: true,
    preset: {
      name: "PAN card",
      spec: "25×35 mm",
      printMm: { width: 25, height: 35 },
      aspect: 25 / 35,
      width: 197,
      height: 276,
      dpi: 200,
      maxKb: 20,
    },
    title: "PAN card photo resizer (25×35 mm, 197×276 px)",
    metaDescription:
      "Resize a photo for your PAN card application: 2.5 × 3.5 cm at 200 DPI (197 × 276 px), saved as a small JPEG for the upload limit. Free, and the photo is never uploaded.",
    h1: "PAN card photo resizer",
    h1Accent: ", 2.5 × 3.5 cm.",
    intro:
      "Crop and shrink a photo to the size the PAN application asks for, then download a JPEG small enough to upload. It all happens in your browser.",
    question: "What size is a PAN card photo?",
    answer:
      "A PAN card application photo is 2.5 cm wide and 3.5 cm high (25 × 35 mm). Protean (formerly NSDL) asks for a colour JPEG scanned at 200 DPI, which works out to 197 × 276 pixels, with a maximum file size of 20 KB.",
    facts: [
      { label: "Print size", value: "25 × 35 mm", note: "2.5 × 3.5 cm" },
      { label: "Pixels", value: "197 × 276 px", note: "at 200 DPI" },
      { label: "File type", value: "JPEG", note: "colour" },
      { label: "File size", value: "≤ 20 KB", note: "Protean scan spec" },
      { label: "Signature", value: "354 × 157 px", note: "4.5 × 2 cm, ≤ 10 KB" },
    ],
    requirements: {
      title: "PAN card photo requirements",
      items: [
        "A recent colour photo.",
        "Plain white or light background.",
        "Face clearly visible and centred, looking straight at the camera.",
        "Check the limits on the form you're filling in. Protean and UTIITSL each publish their own.",
      ],
    },
    steps: { title: "How to make a PAN card photo" },
    faqs: [
      {
        question: "How do I resize a PAN card photo to under 20 KB?",
        answer:
          "Keep the PAN card preset. It exports a 197 × 276 px JPEG with a 20 KB limit already set, and FormPic picks the highest quality that fits.",
      },
      {
        question: "Can I resize my PAN card signature here too?",
        answer:
          "Yes. Upload a photo or scan of your signature, choose Free and draw the crop around it, turn off the aspect lock, and set the size to 354 × 157 px (4.5 × 2 cm at 200 DPI). Then type 10 into the Max file size field.",
      },
      {
        question: "Is 3.5 × 2.5 cm the same as 2.5 × 3.5 cm?",
        answer:
          "Yes, they describe the same photo. Protean writes the height first (3.5 × 2.5 cm) and FormPic writes the width first. Either way, the photo is 2.5 cm wide and 3.5 cm high.",
      },
      {
        question: "Is my photo uploaded to FormPic?",
        answer:
          "No. The photo is cropped and compressed in your browser. FormPic has no upload step, so the only place your photo goes is the PAN portal you submit it to.",
      },
    ],
    sources: [
      {
        publisher: "Protean (formerly NSDL e-Gov)",
        title: "PAN card documents: scanning and uploading",
        url: "https://www.proteantech.in/articles/pan-card-documents-scanning-uploading-method/",
      },
    ],
    lastVerified: "2026-10-07",
    updated: "2026-10-07",
    related: [
      "resize-image-to-20kb",
      "resize-image-to-10kb",
      "passport-size-photo",
      "ssc-signature",
    ],
  },
];
