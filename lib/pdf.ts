export type PdfImage = { jpeg: Uint8Array; width: number; height: number };

// A4 in PDF points (1/72 inch). Landscape images get a landscape page.
const A4 = { width: 595.28, height: 841.89 };

/**
 * Writes a PDF with one image per A4 page, each scaled to fit the page and centred. The JPEG
 * bytes are embedded as they are (DCTDecode), so the PDF is the images plus about 1 KB.
 */
export function buildPdf(images: PdfImage[]): Uint8Array {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let length = 0;

  const push = (chunk: Uint8Array | string) => {
    const bytes = typeof chunk === "string" ? encoder.encode(chunk) : chunk;
    chunks.push(bytes);
    length += bytes.length;
  };
  const object = (id: number, body: string, stream?: Uint8Array) => {
    offsets[id] = length;
    push(`${id} 0 obj\n${body}\n`);
    if (stream) {
      push("stream\n");
      push(stream);
      push("\nendstream\n");
    }
    push("endobj\n");
  };

  // Objects: 1 catalog, 2 page tree, then a page, its image and its content stream per image.
  const pageId = (index: number) => 3 + index * 3;
  push("%PDF-1.4\n%âãÏÓ\n");
  object(1, "<< /Type /Catalog /Pages 2 0 R >>");
  object(
    2,
    `<< /Type /Pages /Kids [${images.map((_, index) => `${pageId(index)} 0 R`).join(" ")}] /Count ${images.length} >>`
  );

  images.forEach(({ jpeg, width, height }, index) => {
    const landscape = width > height;
    const pageWidth = landscape ? A4.height : A4.width;
    const pageHeight = landscape ? A4.width : A4.height;
    const scale = Math.min(pageWidth / width, pageHeight / height);
    const drawWidth = width * scale;
    const drawHeight = height * scale;
    const x = (pageWidth - drawWidth) / 2;
    const y = (pageHeight - drawHeight) / 2;
    const id = pageId(index);
    const content = encoder.encode(
      `q ${drawWidth.toFixed(2)} 0 0 ${drawHeight.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /Im0 Do Q`
    );

    object(
      id,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 ${id + 1} 0 R >> >> /Contents ${id + 2} 0 R >>`
    );
    object(
      id + 1,
      `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>`,
      jpeg
    );
    object(id + 2, `<< /Length ${content.length} >>`, content);
  });

  const count = 3 + images.length * 3;
  const xrefOffset = length;
  push(`xref\n0 ${count}\n0000000000 65535 f \n`);
  for (let id = 1; id < count; id++) push(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
  push(`trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  const pdf = new Uint8Array(length);
  let position = 0;
  for (const chunk of chunks) {
    pdf.set(chunk, position);
    position += chunk.length;
  }
  return pdf;
}

/** Bytes the PDF adds around the images: the fixed header and trailer, and each page's objects. */
export function pdfOverhead(pageCount: number) {
  return 400 + pageCount * 420;
}
