import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/error.middleware';

const app = express();
const PORT = process.env.PORT || 5000;

// Core Middleware
app.use(helmet());
app.use(cors({
  origin: '*', // For MVP, open CORS. Restrict in production.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging HTTP requests

// Health Check Endpoint
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy and running.',
    data: { uptime: process.uptime() },
    timestamp: new Date().toISOString()
  });
});

import { pdfRoutes } from './modules/pdf/pdf.routes';
import { imageRoutes } from './modules/image/image.routes';
import { securityRoutes } from './modules/security/security.routes';

// Modular Routes
app.use('/api/v1/pdf', pdfRoutes);
app.use('/api/v1/image', imageRoutes);
// app.use('/api/v1/text', textRoutes);
app.use('/api/v1/security', securityRoutes);

// Global Error Handler (Must be registered last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server initialized and listening on port ${PORT}`);
});
