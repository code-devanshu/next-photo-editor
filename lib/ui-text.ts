import type { Lang } from "@/lib/editor-text";

export type { Lang };

/** The language tag for each version, used in hreflang, `inLanguage` and the `lang` attribute. */
export const LANG_TAG: Record<Lang, string> = { en: "en-IN", hi: "hi-IN" };

// Headings and fixed text in the guide sections and the site's header and footer.
const en = {
  skip: "Skip to content",
  onDevice: "Processed on your device",
  onDeviceShort: "On-device",
  mainNav: "Main",
  breadcrumb: "Breadcrumb",
  switchLanguage: "हिंदी में पढ़ें",
  switchLanguageLang: "hi" as Lang,
  faq: "Frequently asked questions",
  sources: "Where these numbers come from",
  checked: (date: string): [string, string, string] => ["Last checked against these sources on ", date, "."],
  specHead: { upload: "Upload", size: "Size", fileSize: "File size", format: "Format" },
  related: "Related sizes and forms",
  customSize: "Custom size",
  customDetail: "Any width × height in pixels",
  under: (kb: number) => `JPEG under ${kb} KB, any size`,
  between: (min: number, max: number) => `JPEG between ${min} and ${max} KB`,
  atLeast: (kb: number) => `JPEG of at least ${kb} KB`,
  requirementsNote:
    "FormPic crops and resizes but doesn't change the background, so start with a photo taken against a plain light wall. Rules change from time to time, so check the official instructions for your application before you submit.",
  privacyTitle: "Your photo never leaves your device",
  privacyBody:
    "FormPic runs entirely in your browser. Your photo is read, cropped and resized with the browser's canvas, and the result is saved straight to your device. There's no upload, no account, and no copy kept anywhere.",
  privacyOffline: "Once the page has loaded, the editor keeps working even if you go offline.",
  feedbackTitle: "Need a size that isn't here?",
  feedbackBody:
    "FormPic is made by one developer, Devanshu Verma. If your form asks for a photo size FormPic doesn't have yet, something didn't work, or you have an idea for a feature, send a message through the contact form on his portfolio. Size requests decide which presets come next.",
  feedbackHint:
    "For a new size, it helps to mention the form or country, the size it asks for (in mm or pixels), and any file size limit.",
  feedbackButton: "Send a suggestion",
  feedbackNote: "Opens devanshuverma.in. Nothing from the editor is sent with your message.",
  sizesTitle: "Photo sizes for common forms",
  sizesHead: { document: "Document", print: "Print size", pixels: "Pixels", resolution: "Resolution" },
  setInPixels: "Set in pixels",
  sizesNote:
    "Outlines are drawn to scale. Need a different size? Type any width and height in pixels, and lock the aspect ratio to keep the shape.",
  findYourForm: "Find your form",
  pageCount: (count: number) => `${count} pages`,
  footerBlurb: "Photos for forms, sized in your browser. No uploads, no accounts, no watermark.",
  builtBy: "Built by",
  missing: "Missing a size or feature?",
  moreTools: "More tools",
  allCount: (count: number) => `All ${count} →`,
  dateLocale: "en-GB",
};

export type UiText = typeof en;

const hi: UiText = {
  skip: "मुख्य सामग्री पर जाएँ",
  onDevice: "आपके डिवाइस पर प्रोसेस",
  onDeviceShort: "डिवाइस पर",
  mainNav: "मुख्य",
  breadcrumb: "आप यहाँ हैं",
  switchLanguage: "Read in English",
  switchLanguageLang: "en",
  faq: "अक्सर पूछे जाने वाले सवाल",
  sources: "ये नंबर कहाँ से आए",
  checked: (date) => ["", date, " को इन स्रोतों से आख़िरी बार मिलान किया गया।"],
  specHead: { upload: "अपलोड", size: "साइज़", fileSize: "फ़ाइल साइज़", format: "फ़ॉर्मेट" },
  related: "मिलते-जुलते साइज़ और फ़ॉर्म",
  customSize: "कस्टम साइज़",
  customDetail: "कोई भी चौड़ाई × ऊँचाई, पिक्सल में",
  under: (kb) => `${kb} KB से कम JPEG, कोई भी साइज़`,
  between: (min, max) => `${min} से ${max} KB के बीच JPEG`,
  atLeast: (kb) => `कम से कम ${kb} KB का JPEG`,
  requirementsNote:
    "FormPic क्रॉप और रीसाइज़ करता है, बैकग्राउंड नहीं बदलता, इसलिए फ़ोटो सादी, हल्के रंग की दीवार के सामने खींचें। नियम समय-समय पर बदलते हैं, इसलिए सबमिट करने से पहले अपने आवेदन के आधिकारिक निर्देश ज़रूर देखें।",
  privacyTitle: "आपकी फ़ोटो आपके डिवाइस से बाहर नहीं जाती",
  privacyBody:
    "FormPic पूरी तरह आपके ब्राउज़र में चलता है। फ़ोटो ब्राउज़र के canvas से पढ़ी, क्रॉप और रीसाइज़ की जाती है, और नतीजा सीधे आपके डिवाइस में सेव होता है। न कोई अपलोड, न अकाउंट, न कहीं कोई कॉपी।",
  privacyOffline: "पेज एक बार लोड हो जाए, तो इंटरनेट बंद होने पर भी एडिटर चलता रहता है।",
  feedbackTitle: "जो साइज़ चाहिए, वो यहाँ नहीं है?",
  feedbackBody:
    "FormPic एक डेवलपर, देवांशु वर्मा, का बनाया हुआ है। अगर आपके फ़ॉर्म का फ़ोटो साइज़ यहाँ नहीं है, कुछ ठीक से काम नहीं किया, या किसी फ़ीचर का आइडिया है, तो उनके पोर्टफ़ोलियो के कॉन्टैक्ट फ़ॉर्म से मैसेज भेजें। अगले प्रीसेट इन्हीं रिक्वेस्ट से तय होते हैं।",
  feedbackHint:
    "नए साइज़ के लिए फ़ॉर्म या देश का नाम, माँगा गया साइज़ (mm या पिक्सल में) और KB लिमिट लिख दें, तो आसानी होगी।",
  feedbackButton: "सुझाव भेजें",
  feedbackNote: "devanshuverma.in खुलेगा। एडिटर से कुछ भी आपके मैसेज के साथ नहीं जाता।",
  sizesTitle: "आम फ़ॉर्म के फ़ोटो साइज़",
  sizesHead: { document: "डॉक्यूमेंट", print: "प्रिंट साइज़", pixels: "पिक्सल", resolution: "रेज़ोल्यूशन" },
  setInPixels: "पिक्सल में तय",
  sizesNote:
    "आउटलाइन असली अनुपात में बनी हैं। कोई और साइज़ चाहिए? पिक्सल में कोई भी चौड़ाई और ऊँचाई लिखें, और शेप बनाए रखने के लिए अनुपात लॉक करें।",
  findYourForm: "अपना फ़ॉर्म चुनें",
  pageCount: (count) => `${count} पेज`,
  footerBlurb: "फ़ॉर्म के लिए फ़ोटो, आपके ब्राउज़र में सही साइज़ में। न अपलोड, न अकाउंट, न वॉटरमार्क।",
  builtBy: "निर्माता:",
  missing: "कोई साइज़ या फ़ीचर नहीं मिला?",
  moreTools: "और टूल",
  allCount: (count) => `सभी ${count} →`,
  dateLocale: "hi-IN",
};

export const UI_TEXT: Record<Lang, UiText> = { en, hi };
