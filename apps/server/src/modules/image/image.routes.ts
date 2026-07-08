import { Router } from 'express';
import { upload } from '../../middleware/upload.middleware';
import { 
  convertImageController, 
  resizeImageController,
  compressImageController,
  cropImageController,
  rotateImageController
} from './image.controller';

const router = Router();

// Accept a single file under the 'file' field
router.post('/convert', upload.single('file'), convertImageController);
router.post('/resize', upload.single('file'), resizeImageController);
router.post('/compress', upload.single('file'), compressImageController);
router.post('/crop', upload.single('file'), cropImageController);
router.post('/rotate', upload.single('file'), rotateImageController);

export const imageRoutes = router;
