import { PDFDocument } from 'pdf-lib';

export class PdfService {
  /**
   * Merges multiple PDF Buffers into a single PDF Buffer.
   * Operations happen entirely in memory.
   */
  public async mergePdfs(pdfBuffers: Buffer[]): Promise<Buffer> {
    if (!pdfBuffers || pdfBuffers.length < 2) {
      throw new Error("At least two PDF files are required for merging.");
    }

    const mergedPdf = await PDFDocument.create();

    for (const buffer of pdfBuffers) {
      const pdf = await PDFDocument.load(buffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    return Buffer.from(mergedBytes);
  }
}
