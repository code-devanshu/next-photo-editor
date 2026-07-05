export type Faq = { question: string; answer: string };
export type Fact = { label: string; value: string; note?: string };

export type Guide = {
  /** Matches the preset slug in lib/presets.ts. */
  slug: string;
  /** What the page makes, mid-sentence: "a {subject}". */
  subject: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  headingAccent: string;
  intro: string;
  /** The question the page answers first, phrased the way people search it. */
  question: string;
  answer: string;
  facts: Fact[];
  requirements: string[];
  faqs: Faq[];
};

export const HOME_FAQS: Faq[] = [
  {
    question: "What is passport size photo size in pixels?",
    answer:
      "A passport size photo is 35 × 45 mm. At 300 DPI, the usual print resolution, that's 413 × 531 pixels. Some portals ask for a different pixel size for uploads, so check the form's instructions and type the exact numbers into the Width and Height fields.",
  },
  {
    question: "How do I reduce a photo to under 20 KB or 50 KB?",
    answer:
      "Choose JPEG, then lower the quality slider. The Download button shows the file size before you save, so you can stop as soon as it's under the limit. A smaller pixel size also makes the file smaller.",
  },
  {
    question: "Are my photos uploaded to a server?",
    answer:
      "No. FormPic crops and resizes the photo inside your browser using the canvas API. The image never leaves your device, and nothing is kept after you close the tab.",
  },
  {
    question: "Can I take the photo with my phone camera?",
    answer:
      "Yes. Tap Use camera to take a photo with your phone or laptop camera, then crop it the same way as an uploaded file.",
  },
  {
    question: "Does FormPic change the background to white?",
    answer:
      "No. FormPic crops and resizes but doesn't edit the background. For a white background, take the photo against a plain white or light wall with even lighting.",
  },
  {
    question: "Should I choose JPEG or PNG?",
    answer:
      "Most application forms ask for JPEG, and the form presets switch to it automatically. PNG is lossless, so use it when you want a full-quality copy for printing; the file will be larger.",
  },
  {
    question: "Is FormPic free?",
    answer: "Yes. There's no account, no sign-up and no watermark on the downloaded photo.",
  },
];

export const GUIDES: Guide[] = [
  {
    slug: "passport-size-photo",
    subject: "passport size photo",
    metaTitle: "Passport size photo maker (35×45 mm, 413×531 px)",
    metaDescription:
      "Make a passport size photo online: crop to 35 × 45 mm (3.5 × 4.5 cm) and download a 413 × 531 px JPEG. Free, works on your phone, and the photo is never uploaded.",
    heading: "Passport size photo maker",
    headingAccent: ", 35 × 45 mm.",
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
    requirements: [
      "Taken in the last six months.",
      "Plain white or off-white background, with no shadows.",
      "Facing the camera with a neutral expression and both eyes open.",
      "No filters or retouching. Most countries no longer accept glasses.",
    ],
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
          "Keep the format on JPEG and lower the quality slider. The Download button shows the file size before you save, so stop once it's under the limit.",
      },
      {
        question: "Can I make a passport size photo on my phone?",
        answer:
          "Yes. Open this page on your phone, tap Use camera or pick a photo from your gallery, then crop and download. It works in any modern mobile browser.",
      },
    ],
  },
  {
    slug: "us-passport-photo",
    subject: "US passport or visa photo",
    metaTitle: "US passport & visa photo (2×2 in, 600×600 px)",
    metaDescription:
      "Make a US passport or visa photo online: a square 2 × 2 inch crop, exported as a 600 × 600 px JPEG under 240 KB for the DS-160. Free and private, with no upload.",
    heading: "US passport & visa photo",
    headingAccent: ", 2 × 2 in.",
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
    requirements: [
      "Taken in the last six months.",
      "Plain white or off-white background.",
      "Head 1 to 1⅜ inches (25–35 mm) from chin to the top of the head.",
      "Neutral expression or a natural smile, with both eyes open.",
      "No glasses.",
    ],
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
          "Choose JPEG and lower the quality slider until the size shown on the Download button is under 240 KB. A 600 × 600 px JPEG is usually well under the limit.",
      },
    ],
  },
  {
    slug: "pan-card-photo",
    subject: "PAN card photo",
    metaTitle: "PAN card photo resizer (25×35 mm, 197×276 px)",
    metaDescription:
      "Resize a photo for your PAN card application: 2.5 × 3.5 cm at 200 DPI (197 × 276 px), saved as a small JPEG for the upload limit. Free, and the photo is never uploaded.",
    heading: "PAN card photo resizer",
    headingAccent: ", 2.5 × 3.5 cm.",
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
    requirements: [
      "A recent colour photo.",
      "Plain white or light background.",
      "Face clearly visible and centred, looking straight at the camera.",
      "Check the limits on the form you're filling in. Protean and UTIITSL each publish their own.",
    ],
    faqs: [
      {
        question: "How do I resize a PAN card photo to under 20 KB?",
        answer:
          "Keep the PAN card preset, which exports a 197 × 276 px JPEG, and lower the quality slider until the size on the Download button is under 20 KB.",
      },
      {
        question: "Can I resize my PAN card signature here too?",
        answer:
          "Yes. Upload a photo or scan of your signature, choose Free and draw the crop around it, turn off the aspect lock, and set the size to 354 × 157 px (4.5 × 2 cm at 200 DPI). Export as JPEG under 10 KB.",
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
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug);
}
