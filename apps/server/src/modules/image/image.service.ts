import sharp from 'sharp';

export class ImageService {
  /**
   * Converts an image buffer to the specified format.
   * Operations happen entirely in memory.
   */
  public async convertImage(imageBuffer: Buffer, targetFormat: 'png' | 'jpeg' | 'webp'): Promise<Buffer> {
    if (!imageBuffer) {
      throw new Error("An image buffer is required for conversion.");
    }

    try {
      const convertedBuffer = await sharp(imageBuffer)
        .toFormat(targetFormat)
        .toBuffer();
        
      return convertedBuffer;
    } catch (error) {
      throw new Error("Failed to process the image. The file may be corrupt or unsupported.");
    }
  }

  public async resizeImage(imageBuffer: Buffer, width: number, height: number): Promise<Buffer> {
    try {
      return await sharp(imageBuffer).resize(width, height, { fit: 'fill' }).toBuffer();
    } catch (error) {
      throw new Error("Failed to resize the image.");
    }
  }

  public async compressImage(imageBuffer: Buffer, quality: number): Promise<Buffer> {
    try {
      const metadata = await sharp(imageBuffer).metadata();
      const format = metadata.format || 'jpeg';
      
      let pipeline = sharp(imageBuffer);
      if (format === 'jpeg') {
        pipeline = pipeline.jpeg({ quality });
      } else if (format === 'png') {
        pipeline = pipeline.png({ quality });
      } else if (format === 'webp') {
        pipeline = pipeline.webp({ quality });
      }
      
      return await pipeline.toBuffer();
    } catch (error) {
      throw new Error("Failed to compress the image.");
    }
  }

  public async cropImage(imageBuffer: Buffer, left: number, top: number, width: number, height: number): Promise<Buffer> {
    try {
      return await sharp(imageBuffer).extract({ left, top, width, height }).toBuffer();
    } catch (error) {
      throw new Error("Failed to crop the image.");
    }
  }

  public async rotateImage(imageBuffer: Buffer, angle: number): Promise<Buffer> {
    try {
      return await sharp(imageBuffer).rotate(angle).toBuffer();
    } catch (error) {
      throw new Error("Failed to rotate the image.");
    }
  }
}
