export type Faq = { question: string; answer: string };
export type Fact = { label: string; value: string; note?: string };
export type Source = { publisher: string; title: string; url: string };

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
  /** Official pages the figures were checked against. */
  sources: Source[];
  /** When the page content last changed, as YYYY-MM-DD. Feeds the sitemap and structured data. */
  updated: string;
};

/** When the home page content last changed, as YYYY-MM-DD. */
export const HOME_UPDATED = "2026-10-07";

export const HOME_FAQS: Faq[] = [
  {
    question: "What is passport size photo size in pixels?",
    answer:
      "A passport size photo is 35 × 45 mm. At 300 DPI, the usual print resolution, that's 413 × 531 pixels. Some portals ask for a different pixel size for uploads, so check the form's instructions and type the exact numbers into the Width and Height fields.",
  },
  {
    question: "How do I reduce a photo to under 20 KB or 50 KB?",
    answer:
      "Choose JPEG and set Max file size to 20 KB or 50 KB, or type any other limit. FormPic picks the highest quality that fits and shows the final size on the Download button. If the photo is too big even at the lowest quality, Shrink to fit lowers the pixel size as well.",
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
    updated: "2026-10-07",
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
    updated: "2026-10-07",
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
    updated: "2026-10-07",
  },
  {
    slug: "upsc-photo",
    subject: "UPSC photo",
    metaTitle: "UPSC photo and signature size (JPG, 20–300 KB)",
    metaDescription:
      "Resize your photo for the UPSC online application: a JPG between 20 KB and 300 KB, 350 to 1000 pixels per side. Signature steps too. Free, and nothing is uploaded.",
    heading: "UPSC photo resizer",
    headingAccent: ", 20 to 300 KB.",
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
    requirements: [
      "A clear, recent photo in which your face is easy to make out.",
      "Between 350 and 1000 pixels in both width and height.",
      "For the Civil Services Examination, a signature signed three times, one below the other, on plain white paper in black ink.",
      "A live photo, captured with your camera in the application form, alongside the uploaded one.",
    ],
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
    updated: "2026-10-07",
  },
  {
    slug: "neet-photo",
    subject: "NEET photo",
    metaTitle: "NEET photo size (JPG, 10–200 KB) and signature resizer",
    metaDescription:
      "Resize your photo for the NEET (UG) application: a passport size JPG between 10 KB and 200 KB on a white background, face filling 80% of the photo. Free, no upload.",
    heading: "NEET photo resizer",
    headingAccent: ", 10 to 200 KB.",
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
    requirements: [
      "Recent. The 2026 bulletin asked for a photo taken after 1 January 2026.",
      "White background. Colour and black and white photos are both accepted.",
      "Face without a mask, filling about 80% of the photo, with both ears visible.",
      "Glasses only if you wear them regularly.",
      "Keep prints of the same photo: 6 to 8 passport size and 4 to 6 postcard size (4 × 6 in), for the exam centre and counselling.",
    ],
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
    updated: "2026-10-07",
  },
  {
    slug: "ibps-photo",
    subject: "IBPS photo",
    metaTitle: "IBPS photo and signature size (200×230 px, 20–50 KB)",
    metaDescription:
      "Resize your photo for IBPS bank exam forms: a 200 × 230 px JPEG between 20 and 50 KB, plus the signature, thumb impression and declaration sizes. Free, no upload.",
    heading: "IBPS photo resizer",
    headingAccent: ", 200 × 230 px.",
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
    requirements: [
      "A recent colour photo against a light, preferably white, background.",
      "Looking straight at the camera with a relaxed face, with no harsh shadows or red-eye.",
      "Glasses only if there are no reflections and your eyes are clearly visible. No caps, hats or dark glasses.",
      "Religious headwear is allowed, as long as it doesn't cover your face.",
    ],
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
    updated: "2026-10-07",
  },
  {
    slug: "ssc-signature",
    subject: "SSC signature",
    metaTitle: "SSC signature resize (6 × 2 cm, 10–20 KB) and photo rules",
    metaDescription:
      "Resize your signature for SSC exam forms: a JPEG between 10 and 20 KB, about 6.0 × 2.0 cm. SSC captures your photo live in the form, so the signature is what you upload.",
    heading: "SSC signature resizer",
    headingAccent: ", 10 to 20 KB.",
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
    requirements: [
      "Signature as a JPEG or JPG between 10 and 20 KB.",
      "About 6.0 cm wide and 2.0 cm high.",
      "Clear and full size. SSC rejects blurred or miniature signatures.",
      "For the live photo: good light, a plain background, the camera at eye level, and no cap, mask or glasses.",
    ],
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
    updated: "2026-10-07",
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug);
}

/** A page for one file size limit, like "resize image to 20 KB", with the limit preset in the editor. */
export type LimitGuide = {
  slug: string;
  kb: number;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  headingAccent: string;
  intro: string;
  question: string;
  answer: string;
  facts: Fact[];
  /** Ways to keep the photo sharp at this size, most effective first. */
  tips: string[];
  faqs: Faq[];
  updated: string;
};

// Shared across the limit pages: how FormPic counts a KB, and that nothing is uploaded.
function limitFaqs(kb: number): Faq[] {
  return [
    {
      question: `Why does FormPic show ${((kb * 1000) / 1024).toFixed(1)} KB instead of ${kb} KB?`,
      answer: `Some portals count a KB as 1,000 bytes and others as 1,024. FormPic keeps the file under ${(kb * 1000).toLocaleString("en-US")} bytes so it passes either check, and shows sizes in 1,024-byte units, so a file right at the limit reads ${((kb * 1000) / 1024).toFixed(1)} KB.`,
    },
    {
      question: "Is my photo uploaded to compress it?",
      answer:
        "No. FormPic compresses the photo inside your browser, so it never leaves your device. That also makes it fast: there's no upload or download wait.",
    },
  ];
}

export const LIMIT_GUIDES: LimitGuide[] = [
  {
    slug: "resize-image-to-10kb",
    kb: 10,
    metaTitle: "Resize image to 10 KB online (JPEG, no upload)",
    metaDescription:
      "Reduce a signature or photo to under 10 KB for online forms. FormPic picks the best JPEG quality that fits, works on your phone, and never uploads the image.",
    heading: "Resize image to 10 KB",
    headingAccent: ", signatures too.",
    intro:
      "Add a signature or photo and FormPic compresses it to just under 10 KB, at the highest quality that fits. Crop it or set a pixel size if the form asks for one. Nothing is uploaded.",
    question: "How do I resize an image to 10 KB?",
    answer:
      "Add your image, keep Max file size on 10 KB, and download. FormPic tries JPEG qualities until it finds the highest one that stays under 10 KB. If the image has too many pixels to fit at all, Shrink to fit lowers the width and height in proportion. 10 KB is a common limit for signatures, including the PAN card signature.",
    facts: [
      { label: "Limit", value: "10 KB", note: "under 10,000 bytes" },
      { label: "Format", value: "JPEG", note: "what portals accept" },
      { label: "Typical use", value: "Signatures", note: "like the PAN card signature" },
    ],
    tips: [
      "Crop close around a signature. Empty paper still costs bytes.",
      "Photograph the signature in even light, so the paper comes out plain white rather than grey.",
      "Sign with a dark pen. A strong line stays readable after compression.",
      "For a photo, crop to head and shoulders and use the form's pixel size. 10 KB holds a small face photo, not a large one.",
    ],
    faqs: [
      {
        question: "How do I resize a signature to 10 KB?",
        answer:
          "Photograph your signature on white paper and upload it. Choose Free and crop close around it, then download with the 10 KB limit on. For the PAN card signature, also type 354 × 157 px, which is 4.5 × 2 cm at 200 DPI.",
      },
      {
        question: "Can a photo fit in 10 KB?",
        answer:
          "Yes, at small pixel sizes. A face photo around 150 to 200 pixels wide usually fits. If yours doesn't, Shrink to fit lowers the pixels until it does.",
      },
      ...limitFaqs(10),
    ],
    updated: "2026-10-07",
  },
  {
    slug: "resize-image-to-20kb",
    kb: 20,
    metaTitle: "Resize image to 20 KB online (JPEG, no upload)",
    metaDescription:
      "Reduce a photo or signature to under 20 KB for online forms. FormPic picks the best JPEG quality that fits, works on your phone, and never uploads the image.",
    heading: "Resize image to 20 KB",
    headingAccent: ", sharp as it can be.",
    intro:
      "Add a photo and FormPic compresses it to just under 20 KB, at the highest quality that fits. Crop it or set a pixel size if the form asks for one. Nothing is uploaded.",
    question: "How do I resize an image to 20 KB?",
    answer:
      "Add your photo, keep Max file size on 20 KB, and download. FormPic tries JPEG qualities until it finds the highest one that stays under 20 KB. If the photo has too many pixels to fit at all, Shrink to fit lowers the width and height in proportion. 20 KB is a common limit for application photos, including the PAN card photo.",
    facts: [
      { label: "Limit", value: "20 KB", note: "under 20,000 bytes" },
      { label: "Format", value: "JPEG", note: "what portals accept" },
      { label: "Typical use", value: "Form photos", note: "and PAN card photos" },
    ],
    tips: [
      "Crop tight to your head and shoulders. Every pixel of background costs bytes.",
      "Use the pixel size the form asks for. Large photos have to be compressed harder to reach 20 KB.",
      "Shoot against a plain, evenly lit wall. Flat areas compress far better than busy ones.",
      "If the form gives no pixel size, try around 200 to 300 pixels wide. That's plenty for a face on screen.",
    ],
    faqs: [
      {
        question: "Will my photo look blurry at 20 KB?",
        answer:
          "Not at the sizes forms ask for. The PAN card photo, 197 × 276 px, is specified to fit in 20 KB. Blur and blockiness appear when a large photo is squeezed into 20 KB, so crop first and use the form's pixel size.",
      },
      {
        question: "What if the form asks for between 10 KB and 20 KB?",
        answer:
          "FormPic always picks the highest quality that fits, so the file usually lands just under 20 KB, well above a 10 KB minimum. Check the size on the Download button before you save.",
      },
      {
        question: "Can I resize a signature to 20 KB?",
        answer:
          "Yes. Upload a photo or scan of your signature, choose Free and crop close around it, then download. A signature on white compresses very well, so it will fit easily.",
      },
      ...limitFaqs(20),
    ],
    updated: "2026-10-07",
  },
  {
    slug: "resize-image-to-50kb",
    kb: 50,
    metaTitle: "Resize image to 50 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a photo to under 50 KB for exam, job and visa forms. FormPic finds the best JPEG quality that fits, right in your browser. Free, with no upload.",
    heading: "Resize image to 50 KB",
    headingAccent: ", in your browser.",
    intro:
      "Add a photo and FormPic compresses it to just under 50 KB, at the highest quality that fits. Crop it or set an exact pixel size first if the form asks for one.",
    question: "How do I resize an image to 50 KB?",
    answer:
      "Add your photo, keep Max file size on 50 KB, and download. FormPic searches for the highest JPEG quality that stays under 50 KB and shows the final size on the Download button. If the photo is still too big at the lowest quality, Shrink to fit lowers the width and height in proportion.",
    facts: [
      { label: "Limit", value: "50 KB", note: "under 50,000 bytes" },
      { label: "Format", value: "JPEG", note: "what portals accept" },
      { label: "Typical use", value: "Exam & job forms", note: "photo uploads" },
    ],
    tips: [
      "Crop to the shape the form asks for before compressing, so no bytes go to background.",
      "Type the form's exact pixel size into Width and Height, if it gives one.",
      "Phone photos are several megabytes. Shrink to fit brings them down to a size 50 KB can hold cleanly.",
      "A plain, evenly lit background keeps the face sharp at a small file size.",
    ],
    faqs: [
      {
        question: "How do I reduce a phone photo from 3 MB to 50 KB?",
        answer:
          "Add the photo and keep the 50 KB limit on. A phone photo has millions of pixels, so it usually needs fewer of them to fit: press Shrink to fit, or type the form's pixel size into Width and Height. FormPic then picks the best quality for 50 KB.",
      },
      {
        question: "What if the form asks for between 20 KB and 50 KB?",
        answer:
          "FormPic picks the highest quality that fits, so the file usually lands just under 50 KB, comfortably above a 20 KB minimum. The Download button shows the exact size before you save.",
      },
      ...limitFaqs(50),
    ],
    updated: "2026-10-07",
  },
  {
    slug: "resize-image-to-100kb",
    kb: 100,
    metaTitle: "Resize image to 100 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a photo or document scan to under 100 KB, at the best JPEG quality that fits. Works on phones and laptops, free, and the image is never uploaded.",
    heading: "Resize image to 100 KB",
    headingAccent: ", nothing uploaded.",
    intro:
      "Add a photo or scan and FormPic compresses it to just under 100 KB, at the highest quality that fits. Crop and set a pixel size too if you need one.",
    question: "How do I resize an image to 100 KB?",
    answer:
      "Add your image, keep Max file size on 100 KB, and download. FormPic searches for the highest JPEG quality that stays under 100 KB, so the result is as sharp as the limit allows. If it can't fit at the current pixel size, Shrink to fit lowers the width and height in proportion.",
    facts: [
      { label: "Limit", value: "100 KB", note: "under 100,000 bytes" },
      { label: "Format", value: "JPEG", note: "what portals accept" },
      { label: "Typical use", value: "Photos & scans", note: "ID and document uploads" },
    ],
    tips: [
      "Crop away the table or background around a scanned document before compressing.",
      "For text, keep enough pixels to read it: Shrink to fit lowers them only as far as needed.",
      "If a photo already fits, FormPic keeps the quality high instead of shrinking it further.",
      "Rotate sideways scans before downloading so the form shows them the right way up.",
    ],
    faqs: [
      {
        question: "Can I compress a scanned document to 100 KB?",
        answer:
          "Yes, if it's an image (JPG, PNG or WEBP). Crop it to the page, keep the 100 KB limit on, and download. FormPic doesn't open PDFs, so take a photo of the page or export the PDF page as an image first.",
      },
      {
        question: "Will the photo keep its pixel size?",
        answer:
          "Yes. FormPic lowers JPEG quality first and keeps your width and height. Pixels only change if you press Shrink to fit or type a new size.",
      },
      ...limitFaqs(100),
    ],
    updated: "2026-10-07",
  },
  {
    slug: "resize-image-to-200kb",
    kb: 200,
    metaTitle: "Resize image to 200 KB online (JPEG, no upload)",
    metaDescription:
      "Compress a photo to under 200 KB for exam, job and visa forms, at the best JPEG quality that fits. Free, works on any phone, and nothing is uploaded.",
    heading: "Resize image to 200 KB",
    headingAccent: ", quality kept high.",
    intro:
      "Add a photo and FormPic compresses it to just under 200 KB, at the highest quality that fits. Crop it or set a pixel size first if the form gives one.",
    question: "How do I resize an image to 200 KB?",
    answer:
      "Add your photo, keep Max file size on 200 KB, and download. FormPic searches for the highest JPEG quality that stays under 200 KB and shows the final size on the Download button. A full-resolution phone photo can be too big even at low quality; Shrink to fit then lowers the width and height in proportion. 200 KB is the upper limit for the NEET (UG) photo.",
    facts: [
      { label: "Limit", value: "200 KB", note: "under 200,000 bytes" },
      { label: "Format", value: "JPEG", note: "what portals accept" },
      { label: "Typical use", value: "Exam photos", note: "like the NEET (UG) photo" },
    ],
    tips: [
      "Crop to what the form needs first, so the bytes go to your face rather than the room.",
      "Type the form's pixel size if it gives one. Fewer pixels leave room for higher quality.",
      "Phone photos straight from the camera are several megabytes. Shrink to fit brings them into range in one step.",
      "If the form also sets a minimum, check the size on the Download button before you save.",
    ],
    faqs: [
      {
        question: "How do I reduce a 5 MB photo to 200 KB?",
        answer:
          "Add the photo and keep the 200 KB limit on. If it can't fit at its full pixel size, press Shrink to fit, or type the form's pixel size into Width and Height. FormPic then picks the best quality for 200 KB.",
      },
      {
        question: "Will the photo lose quality?",
        answer:
          "Some, because JPEG compression removes fine detail. FormPic stops at the highest quality that fits, so the photo loses only as much as the limit requires.",
      },
      ...limitFaqs(200),
    ],
    updated: "2026-10-07",
  },
];

export function getLimitGuide(slug: string) {
  return LIMIT_GUIDES.find((guide) => guide.slug === slug);
}
