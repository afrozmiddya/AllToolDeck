import { Request, Response, NextFunction } from 'express';
import { PdfService } from './pdf.service';

const pdfService = new PdfService();

export const mergePdfsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least two PDF files to merge.",
        errorCode: "INVALID_INPUT",
        timestamp: new Date().toISOString()
      });
    }

    // Ensure all uploaded files are PDFs
    const nonPdfs = files.filter(f => f.mimetype !== 'application/pdf');
    if (nonPdfs.length > 0) {
      return res.status(400).json({
        success: false,
        message: "All files must be valid PDF documents.",
        errorCode: "INVALID_MIME_TYPE",
        timestamp: new Date().toISOString()
      });
    }

    // Map multer files to Buffer arrays
    const buffers = files.map(file => file.buffer);

    // Merge in-memory
    const mergedBuffer = await pdfService.mergePdfs(buffers);

    // Send back the raw buffer as a downloadable stream
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="merged-document.pdf"');
    return res.status(200).send(mergedBuffer);

  } catch (error) {
    next(error);
  }
};
