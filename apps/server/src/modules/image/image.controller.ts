import { Request, Response, NextFunction } from 'express';
import { ImageService } from './image.service';

const imageService = new ImageService();

export const convertImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    const format = req.body.format as string;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file to convert.",
        errorCode: "INVALID_INPUT",
        timestamp: new Date().toISOString()
      });
    }

    if (!format || !['png', 'jpeg', 'webp'].includes(format.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid target format. Supported formats are: png, jpeg, webp.",
        errorCode: "INVALID_FORMAT",
        timestamp: new Date().toISOString()
      });
    }

    // Convert in-memory
    const targetFormat = format.toLowerCase() as 'png' | 'jpeg' | 'webp';
    const convertedBuffer = await imageService.convertImage(file.buffer, targetFormat);

    // Send back the raw buffer as a downloadable stream
    const originalName = file.originalname.split('.')[0];
    res.setHeader('Content-Type', `image/${targetFormat}`);
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}-converted.${targetFormat}"`);
    return res.status(200).send(convertedBuffer);

  } catch (error) {
    next(error);
  }
};

export const resizeImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    const width = parseInt(req.body.width);
    const height = parseInt(req.body.height);

    if (!file || isNaN(width) || isNaN(height)) {
      return res.status(400).json({ success: false, message: "Valid file, width, and height are required." });
    }

    const processedBuffer = await imageService.resizeImage(file.buffer, width, height);
    
    const originalName = file.originalname.split('.')[0];
    const format = file.originalname.split('.').pop() || 'png';
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}-resized.${format}"`);
    return res.status(200).send(processedBuffer);
  } catch (error) {
    next(error);
  }
};

export const compressImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    const quality = parseInt(req.body.quality) || 80;

    if (!file) {
      return res.status(400).json({ success: false, message: "Valid file is required." });
    }

    const processedBuffer = await imageService.compressImage(file.buffer, quality);
    
    const originalName = file.originalname.split('.')[0];
    const format = file.originalname.split('.').pop() || 'png';
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}-compressed.${format}"`);
    return res.status(200).send(processedBuffer);
  } catch (error) {
    next(error);
  }
};

export const cropImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    const left = parseInt(req.body.left);
    const top = parseInt(req.body.top);
    const width = parseInt(req.body.width);
    const height = parseInt(req.body.height);

    if (!file || isNaN(left) || isNaN(top) || isNaN(width) || isNaN(height)) {
      return res.status(400).json({ success: false, message: "Valid file, left, top, width, and height are required." });
    }

    const processedBuffer = await imageService.cropImage(file.buffer, left, top, width, height);
    
    const originalName = file.originalname.split('.')[0];
    const format = file.originalname.split('.').pop() || 'png';
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}-cropped.${format}"`);
    return res.status(200).send(processedBuffer);
  } catch (error) {
    next(error);
  }
};

export const rotateImageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    const angle = parseInt(req.body.angle) || 90;

    if (!file) {
      return res.status(400).json({ success: false, message: "Valid file is required." });
    }

    const processedBuffer = await imageService.rotateImage(file.buffer, angle);
    
    const originalName = file.originalname.split('.')[0];
    const format = file.originalname.split('.').pop() || 'png';
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}-rotated.${format}"`);
    return res.status(200).send(processedBuffer);
  } catch (error) {
    next(error);
  }
};
