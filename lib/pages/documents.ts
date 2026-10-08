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
      "Make a passport size photo online: crop to 35 × 45 mm (3.5 × 4.5 cm) and download a 413 × 531 px JPEG. Free, on your phone, never uploaded.",
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
      { label: "Background", value: "White", note: "Indian passport; UK wants light grey" },
    ],
    spec: {
      title: "Passport size photo rules by document",
      rows: [
        {
          item: "Indian passport (paper form)",
          printSize: "35 × 45 mm",
          format: "Colour print",
          background: "Plain white",
          notes: "Only for applications at a DPC, SPC or CSC. Passport Seva Kendras take your photo",
        },
        {
          item: "UK passport (paper form)",
          printSize: "35 × 45 mm",
          format: "Professional print, no border",
          background: "Plain cream or light grey",
          notes: "Head 29–34 mm chin to crown. Taken in the last month",
        },
        {
          item: "Schengen visa (Germany)",
          printSize: "35 × 45 mm",
          dpi: 600,
          format: "Print, 600 DPI or more",
          background: "Plain light, ideally neutral grey",
          notes: "Face 32–36 mm chin to top of head",
        },
      ],
    },
    requirements: {
      title: "Passport size photo requirements",
      items: [
        "A recent colour photo with a frontal view of the full face, both ears visible and eyes open.",
        "A plain white background for Indian passports, worn with dark-coloured clothes. UK prints need cream or light grey.",
        "A natural expression: no grinning, frowning or raised eyebrows.",
        "No dark or coloured glasses, and no glare on spectacles. Head coverings only for religious reasons, with the face fully visible.",
        "Not signed, not a computer print, and not cut from a group photo.",
      ],
      note: "Passport Seva Kendras and Post Office Passport Seva Kendras take your photo at the appointment, so a printed photo is only needed at other collection centres. Rules change from time to time, so check the official instructions before you submit.",
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
        question: "Do I need a photo for my Passport Seva Kendra appointment?",
        answer:
          "No. The Passport Seva instructions say a photograph isn't required for applications submitted at a Passport Seva Kendra or Post Office Passport Seva Kendra, because it's taken there. You only paste one when you apply at another collection centre.",
      },
      {
        question: "Can I make a passport size photo on my phone?",
        answer:
          "Yes. Open this page on your phone, tap Use camera or pick a photo from your gallery, then crop and download. It works in any modern mobile browser.",
      },
    ],
    sources: [
      {
        publisher: "Passport Seva, Ministry of External Affairs",
        title: "Instructions for filling the passport application form",
        url: "https://www.passportindia.gov.in/AppOnlineProject/pdf/ApplicationformInstructionBooklet-V3.0.pdf",
      },
      {
        publisher: "GOV.UK",
        title: "Get a passport photo: printed photos",
        url: "https://www.gov.uk/photos-for-passports/photo-requirements",
      },
      {
        publisher: "German Federal Foreign Office",
        title: "Biometric photo sample chart (Foto-Mustertafel)",
        url: "https://india.diplo.de/resource/blob/1862508/332690e7c0caef02dd37188bdab3bbd3/fotomustertafel-data.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
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
      "Make a US passport or visa photo: a 2 × 2 inch square, saved as a 600 × 600 px JPEG under 240 KB for the DS-160. Free and private, no upload.",
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
    spec: {
      title: "US passport and visa photo specification",
      rows: [
        { item: "Printed photo", printSize: "2 × 2 in (51 × 51 mm)", notes: "Head 50–69% of the image height" },
        { item: "Digital photo (DS-160)", pixels: "600 × 600 to 1200 × 1200 px, square", maxKb: 240, format: "JPEG" },
      ],
    },
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
      "Resize a photo for your PAN application: 2.5 × 3.5 cm at 200 DPI (197 × 276 px), a JPEG under 20 KB. Free, and the photo is never uploaded.",
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
    spec: {
      title: "PAN card upload specification (Protean)",
      rows: [
        { item: "Photograph", printSize: "2.5 × 3.5 cm", dpi: 200, maxKb: 20, format: "JPEG", notes: "Colour. Protean writes the size as 3.5 × 2.5 cm, height first" },
        { item: "Signature", printSize: "4.5 × 2 cm", dpi: 200, maxKb: 10, format: "JPEG" },
      ],
    },
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
  {
    slug: "voter-id-photo",
    category: "id",
    name: "Voter ID photo",
    preset: {
      name: "Voter ID",
      spec: "35×45 mm",
      printMm: { width: 35, height: 45 },
      aspect: 35 / 45,
      width: 413,
      height: 531,
      dpi: 300,
    },
    title: "Voter ID photo size for Form 6 (3.5×4.5 cm)",
    metaDescription:
      "Make the photo for a new voter ID (Form 6): passport size 4.5 × 3.5 cm, colour, white background, unsigned. Crop and resize it free; nothing is uploaded.",
    h1: "Voter ID photo maker",
    h1Accent: ", Form 6.",
    intro:
      "Crop a passport size photo for Form 6, the application for a new voter ID (EPIC). It's sized in your browser and never uploaded to FormPic.",
    question: "What size is the voter ID photo?",
    answer:
      "The Election Commission's Form 6 guidelines ask for a recent, good quality, passport size colour photograph of 4.5 cm × 3.5 cm, unsigned, with a white background, showing a frontal view of the full face with the eyes open and both edges of the face clearly visible. The guidelines don't set a pixel size or file size, so FormPic uses passport size at 300 DPI: 413 × 531 pixels.",
    facts: [
      { label: "Print size", value: "3.5 × 4.5 cm", note: "width × height" },
      { label: "Background", value: "White", note: "colour photo" },
      { label: "Face", value: "Frontal", note: "eyes open, both edges visible" },
      { label: "Signed", value: "No", note: "leave it unsigned" },
      { label: "FormPic size", value: "413 × 531 px", note: "at 300 DPI" },
    ],
    spec: {
      title: "Form 6 photograph specification",
      rows: [
        {
          item: "Photograph",
          printSize: "4.5 × 3.5 cm (height × width)",
          format: "Colour, unsigned",
          background: "White",
          notes: "Frontal view of the full face, eyes open, both edges of the face clearly visible",
        },
      ],
    },
    requirements: {
      title: "Form 6 photo rules",
      items: [
        "A recent, good quality photo, not an old one from another ID.",
        "In colour, passport size: 4.5 cm high and 3.5 cm wide.",
        "A white background.",
        "A frontal view of the full face, eyes open, both edges of the face clearly visible.",
        "Unsigned. Don't sign across the photo.",
      ],
      note: "On the paper Form 6, the photo is pasted in the space provided. Check the Election Commission's current guidelines before you apply, as forms are revised from time to time.",
    },
    steps: {
      title: "How to make a voter ID photo",
      items: [
        {
          name: "Stand against white",
          detail: "Stand in front of a plain white wall, facing the light, looking straight at the camera.",
        },
        {
          name: "Crop to passport size",
          detail:
            "Add the photo here. The voter ID preset crops 3.5 × 4.5 cm; keep both edges of your face inside the frame.",
        },
        {
          name: "Download",
          detail:
            "Choose JPEG for the online form, or PNG for a lossless file to print and paste on a paper Form 6.",
        },
      ],
    },
    rejections: {
      title: "What makes a Form 6 photo unusable",
      items: [
        "A coloured or patterned background instead of white.",
        "A side view, closed eyes, or part of the face cut off.",
        "A signature across the photo.",
        "An old photo that no longer looks like you.",
      ],
    },
    faqs: [
      {
        question: "Is the voter ID photo the same as a passport size photo?",
        answer:
          "Yes. Form 6 asks for passport size, 4.5 × 3.5 cm, with a white background, the same as the Indian passport paper form.",
      },
      {
        question: "Is there a KB limit for the online Form 6 photo?",
        answer:
          "The Form 6 guidelines don't give one. A 413 × 531 px JPEG from FormPic is usually well under 100 KB; if the portal asks for less, set Max file size before you download.",
      },
      {
        question: "Can I use a black and white photo?",
        answer:
          "No. The guidelines ask for a colour photograph.",
      },
      {
        question: "Is my photo uploaded to FormPic?",
        answer:
          "No. FormPic crops and resizes the photo in your browser, so it never leaves your device.",
      },
    ],
    sources: [
      {
        publisher: "Election Commission of India",
        title: "Guidelines for filling up Form-6",
        url: "https://voters.eci.gov.in/guidelines/Form-6_en.pdf",
      },
      {
        publisher: "Election Commission of India",
        title: "Form 6: application for new voters",
        url: "https://voters.eci.gov.in/formspdf/Form_6_English.pdf",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["passport-size-photo", "pan-card-photo", "resize-image-to-100kb", "resize-image-to-50kb", "upsc-photo"],
  },
  {
    slug: "driving-licence-photo",
    category: "id",
    name: "Driving licence photo",
    draft: true,
    todo: [
      "Find the official photo and signature upload spec for learner's and driving licence applications on Sarathi (sarathi.parivahan.gov.in). Parivahan's FAQ (https://parivahan.gov.in/index.php/en/node/169) only says the files must be JPEG and that the service varies by state.",
      "Note any state-specific differences in pixel size or KB limits, and cite each.",
    ],
    title: "Driving licence photo size",
    metaDescription: "Draft: driving licence photo and signature rules, pending verification on Sarathi.",
    h1: "Driving licence photo",
    h1Accent: ".",
    intro: "Draft page. Not published until the figures are verified.",
    faqs: [],
    sources: [],
    updated: "2026-10-08",
    related: [],
  },
];
