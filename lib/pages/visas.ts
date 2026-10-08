import type { Faq, PageEntry } from "@/lib/pages/types";

const NOT_UPLOADED: Faq = {
  question: "Is my photo uploaded to FormPic?",
  answer:
    "No. FormPic crops and resizes the photo in your browser, so it never leaves your device. The only place it goes is the application you upload it to.",
};

export const VISA_PAGES: PageEntry[] = [
  {
    slug: "oci-photo",
    category: "visa",
    name: "OCI photo",
    preset: {
      name: "OCI",
      spec: "51×51 mm",
      printMm: { width: 51, height: 51 },
      aspect: 1,
      width: 600,
      height: 600,
      maxKb: 200,
    },
    title: "OCI photo size (square, 200–900 px, 200 KB)",
    metaDescription:
      "Resize your OCI card photo: square, 200 × 200 to 900 × 900 px, a JPEG up to 200 KB, on a light background that isn't white. Free, in your browser.",
    h1: "OCI photo resizer",
    h1Accent: ", square.",
    intro:
      "The OCI portal wants a square photo between 200 and 900 pixels a side and no bigger than 200 KB. Crop it here and download it, without uploading anything.",
    question: "What is the OCI photo size?",
    answer:
      "The OCI services FAQ asks for a square photo, at least 51 × 51 mm, with the face covering 80% of it, on a plain light-coloured background that is not white, with no border. The height and width must be equal, from 200 × 200 to 900 × 900 pixels, as a JPEG or JPG of at most 200 KB. The signature image has the same 200 KB limit. FormPic makes the photo 600 × 600 pixels.",
    facts: [
      { label: "Shape", value: "Square", note: "height = width" },
      { label: "Pixels", value: "200–900 px", note: "per side" },
      { label: "File", value: "≤ 200 KB", note: "JPEG or JPG" },
      { label: "Background", value: "Light, not white", note: "plain, no border" },
      { label: "FormPic size", value: "600 × 600 px", note: "within 200–900 px" },
    ],
    spec: {
      title: "OCI photo and signature specification",
      rows: [
        {
          item: "Photograph",
          printSize: "at least 51 × 51 mm, square",
          pixels: "200 × 200 to 900 × 900 px",
          maxKb: 200,
          format: "JPEG/JPG",
          background: "Plain light colour, not white",
          notes: "Face covers 80%, head and shoulders, no border",
        },
        { item: "Signature", maxKb: 200, format: "JPEG/JPG" },
      ],
    },
    requirements: {
      title: "OCI photo rules",
      items: [
        "A square photo: height and width must be equal.",
        "A plain light-coloured background. Not white, and no border.",
        "A front view of your head and shoulders, with the full face in the middle.",
        "The face covering about 80% of the photo.",
      ],
      note: "Photos that don't meet the standard are rejected and can delay the application. The Indian Mission, Post or FRRO tells you by email if anything is deficient.",
    },
    steps: {
      title: "How to make an OCI photo",
      items: [
        {
          name: "Pick a background",
          detail: "Stand in front of a light grey or cream wall. A white wall breaks the OCI rule.",
        },
        {
          name: "Crop square",
          detail:
            "Add the photo here. The OCI preset crops a square and frames your head and shoulders, face in the middle.",
        },
        {
          name: "Fill 80% with your face",
          detail: "Shrink the crop box until your face takes up most of the square.",
        },
        {
          name: "Download under 200 KB",
          detail: "The 600 × 600 px JPEG is kept under 200 KB, ready for the OCI portal.",
        },
      ],
    },
    rejections: {
      title: "Why OCI photos get rejected",
      items: [
        "A white background. OCI asks for a light colour that isn't white.",
        "A rectangular photo, since height and width must match.",
        "Smaller than 200 × 200 or larger than 900 × 900 pixels.",
        "A file over 200 KB.",
        "A border, or a face that's too small in the frame.",
      ],
    },
    faqs: [
      {
        question: "Why can't the OCI photo have a white background?",
        answer:
          "The OCI FAQ asks for a plain light-coloured background that is not white, unlike Indian passport photos. Light grey or cream works.",
      },
      {
        question: "Is a 2 × 2 inch US passport photo fine for OCI?",
        answer:
          "The shape is right: OCI wants a square of at least 51 × 51 mm, and 2 × 2 inches is 51 × 51 mm. Check the background, because US photos are on white, and keep the digital file between 200 and 900 pixels a side and under 200 KB.",
      },
      {
        question: "What size is the OCI signature?",
        answer:
          "The FAQ gives a JPEG or JPG of at most 200 KB for the signature too. Crop close around your signature and set Max file size to 200 KB.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "Ministry of Home Affairs, Government of India",
        title: "OCI services: frequently asked questions",
        url: "https://ociservices.gov.in/onlineOCI/faq",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["us-passport-photo", "passport-size-photo", "uk-passport-photo", "resize-image-to-200kb", "schengen-visa-photo"],
  },
  {
    slug: "schengen-visa-photo",
    category: "visa",
    name: "Schengen visa photo",
    preset: {
      name: "Schengen visa",
      spec: "35×45 mm",
      printMm: { width: 35, height: 45 },
      aspect: 35 / 45,
      width: 827,
      height: 1063,
      dpi: 600,
    },
    title: "Schengen visa photo size (35×45 mm)",
    metaDescription:
      "Make a Schengen visa photo: 35 × 45 mm, face 32–36 mm, on a plain light grey background, at 600 DPI for printing. Free, in your browser, no upload.",
    h1: "Schengen visa photo maker",
    h1Accent: ", 35 × 45 mm.",
    intro:
      "Crop a biometric photo to 35 × 45 mm with the face at the right height, and save it at 600 DPI for printing. Your photo stays in your browser.",
    question: "What size is a Schengen visa photo?",
    answer:
      "A Schengen visa photo is 35 mm wide and 45 mm high, to the ICAO biometric standard. Germany's photo rules, which its missions in India link for visa applicants, ask for the face, chin to top of the head, to take up 70–80% of the height: 32 to 36 mm. The background must be plain and light, ideally neutral grey, and the photo printed at 600 DPI or more. FormPic saves 35 × 45 mm at 600 DPI: 827 × 1063 pixels.",
    facts: [
      { label: "Print size", value: "35 × 45 mm", note: "width × height" },
      { label: "Face height", value: "32–36 mm", note: "70–80% of the photo" },
      { label: "Background", value: "Light grey", note: "plain, no pattern" },
      { label: "Print", value: "600 DPI", note: "or more" },
      { label: "FormPic size", value: "827 × 1063 px", note: "at 600 DPI" },
    ],
    spec: {
      title: "Schengen biometric photo specification (Germany)",
      rows: [
        {
          item: "Photograph",
          printSize: "35 × 45 mm",
          pixels: "827 × 1063 px at 600 DPI",
          dpi: 600,
          format: "Print on quality paper",
          background: "Plain, light, ideally neutral grey",
          notes: "Face 32–36 mm chin to crown; rejected under 27 mm or over 40 mm. Colour or black and white",
        },
      ],
    },
    requirements: {
      title: "Biometric photo rules",
      items: [
        "Face centred, chin to top of the head 32–36 mm (70–80% of the height), hair not counted.",
        "Head straight, not tilted or turned; neutral expression with the mouth closed.",
        "Eyes open and clearly visible, not covered by hair or frames. No tinted glasses or reflections.",
        "Even lighting with no shadows on the face or the background, and no red-eye.",
        "Only you in the photo, against a plain light background with no pattern. Light grey suits dark hair; a mid grey suits light hair.",
        "No head covering, except where the authority allows it for religious reasons.",
      ],
      note: "Each Schengen country sets its own details on top of the ICAO standard. These are Germany's rules; check the checklist from the embassy or visa centre you're applying through.",
    },
    steps: {
      title: "How to make a Schengen visa photo",
      items: [
        {
          name: "Shoot against grey",
          detail: "Stand in front of a plain light grey wall, facing a window, with the camera at eye level.",
        },
        {
          name: "Crop 35 × 45 mm",
          detail:
            "Add the photo here. The Schengen preset frames 35 × 45 mm; size the box so your chin to crown fills about three quarters of its height.",
        },
        {
          name: "Download at 600 DPI",
          detail:
            "Choose PNG for a lossless print file, or JPEG for a smaller one. The file is 827 × 1063 px.",
        },
        {
          name: "Print on photo paper",
          detail:
            "Print at 35 × 45 mm on quality photo paper. Many visa centres also take the photo for you.",
        },
      ],
    },
    rejections: {
      title: "Photos the German sample chart rejects",
      items: [
        "The face too big, too small, or off centre.",
        "Blur, low contrast, a colour cast, or visible pixels.",
        "Shadows on the face or background, reflections, or red-eye.",
        "A tilted or turned head, an open mouth, closed eyes or hair over the eyes.",
        "A busy or patterned background, or one without contrast.",
        "Tinted glasses or reflections on the lenses.",
      ],
    },
    faqs: [
      {
        question: "Is a Schengen photo the same as an Indian passport photo?",
        answer:
          "The size is the same, 35 × 45 mm. The background isn't: Indian passports want plain white, while Germany's rules prefer a light neutral grey. Use the background your embassy asks for.",
      },
      {
        question: "How many pixels is a Schengen visa photo?",
        answer:
          "Germany asks for prints at 600 DPI or more, and 35 × 45 mm at 600 DPI is 827 × 1063 pixels. For an upload with its own pixel limit, type that size into Width and Height instead.",
      },
      {
        question: "How old can the photo be?",
        answer:
          "Germany's sample chart doesn't give an age, but your appearance must match. Many Schengen countries ask for a photo from the last 6 months, so check your embassy's checklist.",
      },
      {
        question: "Can I wear glasses?",
        answer:
          "Only if your eyes are clearly visible: no tinted lenses, no reflections and no frames over the eyes. Taking them off is simpler.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "German Federal Foreign Office",
        title: "Biometric photo sample chart (Foto-Mustertafel)",
        url: "https://india.diplo.de/resource/blob/1862508/332690e7c0caef02dd37188bdab3bbd3/fotomustertafel-data.pdf",
      },
      {
        publisher: "German missions in India",
        title: "Submitting a Schengen visa application at a visa application centre",
        url: "https://india.diplo.de/in-en/service/1908750-1908750",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["passport-size-photo", "uk-passport-photo", "australia-visa-photo", "oci-photo", "us-passport-photo"],
  },
  {
    slug: "uk-passport-photo",
    category: "visa",
    name: "UK passport photo",
    preset: {
      name: "UK passport",
      spec: "600×750 px min",
      printMm: { width: 36, height: 45 },
      aspect: 4 / 5,
      width: 900,
      height: 1125,
      minKb: 50,
    },
    title: "UK passport photo size (600×750 px, 50 KB+)",
    metaDescription:
      "Make a UK passport photo for the online application: at least 600 × 750 px and 50 KB, on a plain light background. Or a 35 × 45 mm print. No upload.",
    h1: "UK passport photo",
    h1Accent: ", online & print.",
    intro:
      "GOV.UK wants a digital photo of at least 600 × 750 pixels and 50 KB, or two 35 × 45 mm prints for paper forms. FormPic sizes either, in your browser.",
    question: "What size is a UK passport photo?",
    answer:
      "For an online UK passport application, GOV.UK asks for a clear colour digital photo at least 600 pixels wide and 750 pixels tall, between 50 KB and 10 MB, against a plain light-coloured background, taken in the last month and not altered by software. Paper forms need two identical prints, 45 mm high by 35 mm wide, with the head 29–34 mm from chin to crown, on a plain cream or light grey background.",
    facts: [
      { label: "Digital", value: "≥ 600 × 750 px", note: "width × height" },
      { label: "File", value: "50 KB–10 MB", note: "digital photo" },
      { label: "Print", value: "35 × 45 mm", note: "2 identical photos" },
      { label: "Head (print)", value: "29–34 mm", note: "chin to crown" },
      { label: "Taken", value: "Last month", note: "new photo per passport" },
    ],
    spec: {
      title: "UK passport photo specification",
      rows: [
        {
          item: "Digital photo (online)",
          pixels: "at least 600 × 750 px",
          minKb: 50,
          format: "Colour, unaltered",
          background: "Plain light-coloured",
          notes: "Up to 10 MB. Taken in the last month",
        },
        {
          item: "Printed photos (paper form)",
          printSize: "35 × 45 mm",
          format: "Professional print, no border",
          background: "Plain cream or light grey",
          notes: "Two identical photos. Head 29–34 mm chin to crown",
        },
      ],
    },
    requirements: {
      title: "What a UK passport photo must show",
      items: [
        "Facing forwards, looking straight at the camera, with a plain expression and mouth closed.",
        "Eyes open and visible, with no hair in front of them.",
        "No head covering unless it's for religious or medical reasons, and nothing covering your face.",
        "No shadows on your face or behind you, and no red-eye.",
        "No other objects or people.",
        "No glasses unless you have to; then no sunglasses or tinted lenses, and no glare or frames over the eyes.",
      ],
      note: "GOV.UK says photos from a booth or shop with a photo code are more likely to be approved than ones taken on your own device.",
    },
    steps: {
      title: "How to make a UK passport photo",
      items: [
        {
          name: "Take it in good light",
          detail:
            "Have someone photograph you against a plain light wall, facing a window, with no shadow behind you.",
        },
        {
          name: "Keep it loose",
          detail:
            "Add it here. The UK preset crops a 4 : 5 frame at 900 × 1125 px. Include your head, shoulders and upper body; GOV.UK crops a device photo itself.",
        },
        {
          name: "Stay over 50 KB",
          detail: "The 50 KB minimum is already set. FormPic keeps the quality high so the file passes.",
        },
        {
          name: "For a paper form",
          detail:
            "Use the passport size preset for 35 × 45 mm prints, with a cream or light grey background.",
        },
      ],
    },
    rejections: {
      title: "Why UK passport photos are refused",
      items: [
        "Out of focus, black and white, or altered by software.",
        "Smaller than 600 × 750 pixels or under 50 KB.",
        "Shadows on the face or background, or red-eye.",
        "Hair over the eyes, a head covering, or glare on glasses.",
        "Other people or objects in the photo.",
      ],
    },
    faqs: [
      {
        question: "Should I crop my UK passport photo?",
        answer:
          "For a photo from your own device, GOV.UK says to include your head, shoulders and upper body and not to crop it, because it's cropped for you. FormPic's UK preset leaves room around you; just resize to at least 600 × 750 px.",
      },
      {
        question: "Can my UK passport photo have a white background?",
        answer:
          "Digital photos need a plain light-coloured background in clear contrast to you. Printed photos must be on cream or light grey. Plain white walls often wash out light hair.",
      },
      {
        question: "How old can the photo be?",
        answer:
          "It must have been taken in the last month, and you need a new photo for every new passport, even if you look the same.",
      },
      {
        question: "Is a 35 × 45 mm Indian passport photo fine for a UK passport?",
        answer:
          "The print size matches, but UK prints need a cream or light grey background, not white, and a head height of 29–34 mm.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "GOV.UK",
        title: "Get a passport photo: digital photos",
        url: "https://www.gov.uk/photos-for-passports",
      },
      {
        publisher: "GOV.UK",
        title: "Get a passport photo: printed photos",
        url: "https://www.gov.uk/photos-for-passports/photo-requirements",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["passport-size-photo", "schengen-visa-photo", "australia-visa-photo", "us-passport-photo", "increase-image-size-in-kb"],
  },
  {
    slug: "australia-visa-photo",
    category: "visa",
    name: "Australia visa photo",
    preset: {
      name: "Australia visa",
      spec: "1200×1600 px",
      printMm: { width: 36, height: 48 },
      aspect: 3 / 4,
      width: 1200,
      height: 1600,
      minKb: 70,
    },
    title: "Australia visa photo size (1200×1600 px)",
    metaDescription:
      "Make an Australia visa photo for ImmiAccount: a JPEG of 70 KB–3.5 MB, 1200 × 1600 px preferred, on a neutral or light grey background. Free, no upload.",
    h1: "Australia visa photo",
    h1Accent: ", 1200 × 1600 px.",
    intro:
      "Home Affairs asks for a digital JPEG between 70 KB and 3.5 MB, ideally 1200 × 1600 pixels. Resize your photo to that here, without uploading it anywhere.",
    question: "What size is an Australia visa photo?",
    answer:
      "For visa applications in ImmiAccount, the Department of Home Affairs asks for a digital JPEG between 70 KB and 3.5 MB, with a preferred resolution of 1200 × 1600 pixels. It must be no more than 6 months old, show your full face, head and shoulders, in colour, against a neutral or light grey background, and be unedited. A scan of a photo or a photo of a photo isn't accepted.",
    facts: [
      { label: "Pixels", value: "1200 × 1600 px", note: "preferred" },
      { label: "File", value: "70 KB–3.5 MB", note: "JPEG" },
      { label: "Background", value: "Light grey", note: "or neutral" },
      { label: "Age", value: "≤ 6 months", note: "when you apply" },
    ],
    spec: {
      title: "Australia visa photo specification",
      rows: [
        {
          item: "Photograph",
          pixels: "1200 × 1600 px (preferred)",
          minKb: 70,
          format: "JPEG",
          background: "Neutral or light grey, contrasting with the face",
          notes: "Up to 3.5 MB. Colour, head and shoulders, unedited, no more than 6 months old",
        },
      ],
    },
    requirements: {
      title: "Home Affairs photo rules",
      items: [
        "A full-face view of your head and shoulders, in colour.",
        "A neutral or light grey background that contrasts with your face.",
        "Unedited: don't remove the background, moles, wrinkles, scars or red-eye.",
        "Glasses off, unless you can't remove them for medical reasons; then untinted, with no reflections and frames clear of the eyes.",
        "Religious head coverings are fine if your whole face shows and the material is plain.",
      ],
      note: "Home Affairs recommends a professional passport photo provider, such as Australia Post, which can email you a digital copy. Each applicant, children included, needs their own photo.",
    },
    steps: {
      title: "How to make an Australia visa photo",
      items: [
        {
          name: "Start from a digital original",
          detail: "Use the camera file itself. A scan of a printed photo, or a photo of one, isn't accepted.",
        },
        {
          name: "Crop head and shoulders",
          detail: "Add it here. The Australia preset crops 3 : 4 at 1200 × 1600 px.",
        },
        {
          name: "Stay above 70 KB",
          detail: "The 70 KB minimum is set; a 1200 × 1600 px photo passes it easily.",
        },
        {
          name: "Attach in ImmiAccount",
          detail:
            "Attach it in the Photograph section under the right person's name; there's one for each applicant.",
        },
      ],
    },
    rejections: {
      title: "Why Home Affairs rejects visa photos",
      items: [
        "A scanned print or a photo of a photo.",
        "An edited photo, with the background or blemishes removed.",
        "Tinted glasses, reflections, or frames over the eyes.",
        "A patterned head covering, or one that hides part of the face.",
        "A photo attached under the wrong applicant.",
      ],
    },
    faqs: [
      {
        question: "Does FormPic edit the photo?",
        answer:
          "No. It only crops and resizes, which Home Affairs allows. It doesn't remove backgrounds or retouch, which would break the unedited rule.",
      },
      {
        question: "Is 1200 × 1600 px compulsory?",
        answer:
          "It's the preferred resolution. The firm limits are a JPEG between 70 KB and 3.5 MB. If your camera file is smaller, keep its own size and just crop.",
      },
      {
        question: "Can I use a white background?",
        answer:
          "Home Affairs asks for a neutral or light grey background that contrasts with your face. Light grey is the safe choice.",
      },
      NOT_UPLOADED,
    ],
    sources: [
      {
        publisher: "Australian Government Department of Home Affairs",
        title: "ImmiAccount help: photograph",
        url: "https://immi.homeaffairs.gov.au/help-text/evidence/Pages/et-h0369.aspx",
      },
    ],
    lastVerified: "2026-10-08",
    updated: "2026-10-08",
    related: ["uk-passport-photo", "schengen-visa-photo", "us-passport-photo", "passport-size-photo", "oci-photo"],
  },
  {
    slug: "canada-visa-photo",
    category: "visa",
    name: "Canada visa photo",
    draft: true,
    todo: [
      "IRCC's Temporary Resident Visa photo page (https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/temporary-resident-visa-application-photograph-specifications.html, updated 2023-07-24) gives print rules only: frame at least 35 × 45 mm, head 31–36 mm chin to crown, plain white or light background, taken in the last 6 months.",
      "Find IRCC's official digital photo spec for online visitor visa applications (pixel range, format, file size). A search summary claimed 715 × 1000 to 2000 × 2800 px, JPEG or PNG, up to 4 MB, but that text wasn't on the page above.",
      "Confirm whether IRCC portal uploads count resizing as altering the photo.",
    ],
    title: "Canada visa photo size",
    metaDescription: "Draft: Canada visitor visa photo rules, pending verification of IRCC's digital photo spec.",
    h1: "Canada visa photo",
    h1Accent: ".",
    intro: "Draft page. Not published until the figures are verified.",
    faqs: [],
    sources: [],
    updated: "2026-10-08",
    related: [],
  },
];
