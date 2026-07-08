import { Router } from 'express';
import { generatePassword, encodeBase64, decodeBase64 } from './security.controller';

const router = Router();

router.post('/password-generator', generatePassword);
router.post('/base64-encode', encodeBase64);
router.post('/base64-decode', decodeBase64);

export const securityRoutes = router;
