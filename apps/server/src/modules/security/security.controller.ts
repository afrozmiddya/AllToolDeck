import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { SecurityService } from './security.service';

const securityService = new SecurityService();

const passwordSchema = z.object({
  length: z.number().min(4).max(128).default(16),
  includeUppercase: z.boolean().default(true),
  includeNumbers: z.boolean().default(true),
  includeSymbols: z.boolean().default(true),
});

const base64Schema = z.object({
  text: z.string().min(1, "Input text is required"),
});

export const generatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = passwordSchema.parse(req.body);
    const password = securityService.generatePassword(
      validated.length,
      validated.includeUppercase,
      validated.includeNumbers,
      validated.includeSymbols
    );

    return res.status(200).json({
      success: true,
      message: "Secure password successfully generated.",
      data: { password },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const encodeBase64 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = base64Schema.parse(req.body);
    const encoded = securityService.base64Encode(text);

    return res.status(200).json({
      success: true,
      message: "Text successfully encoded to Base64.",
      data: { result: encoded },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const decodeBase64 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = base64Schema.parse(req.body);
    const decoded = securityService.base64Decode(text);

    return res.status(200).json({
      success: true,
      message: "Text successfully decoded from Base64.",
      data: { result: decoded },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
