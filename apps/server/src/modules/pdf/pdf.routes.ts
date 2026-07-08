import { Router } from 'express';
import { upload } from '../../middleware/upload.middleware';
import { mergePdfsController } from './pdf.controller';

const router = Router();

// Accept up to 10 files under the 'files' field
router.post('/merge', upload.array('files', 10), mergePdfsController);

export const pdfRoutes = router;
