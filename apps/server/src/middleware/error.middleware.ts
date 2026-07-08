import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(`[Error] ${err.message || 'Unknown error'}`);
  
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        message: 'Upload file size exceeds the 100 MB limit.',
        errorCode: 'PAYLOAD_SIZE_LIMIT_EXCEEDED',
        timestamp: new Date().toISOString()
      });
    }
  }

  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected system conversion error occurred.',
    errorCode: err.errorCode || 'SERVER_ERROR',
    timestamp: new Date().toISOString()
  });
}
