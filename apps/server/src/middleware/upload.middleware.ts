import multer from 'multer';

// Use memory storage to completely avoid disk writes, ensuring
// high-performance in-memory processing streams as per architecture rules.
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB absolute ceiling
  }
});
