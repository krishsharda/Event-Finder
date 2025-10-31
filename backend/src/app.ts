import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes';
import { seedEvents } from './storage/seed';

// Load environment variables (no-op on Netlify unless vars are set)
dotenv.config();

export const createApp = (): Express => {
  const app: Express = express();

  // CORS: allow all origins; for Netlify same-origin this is fine
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Root endpoint
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Event Finder API',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        events: '/api/events',
        createEvent: 'POST /api/events',
        getEvent: '/api/events/:id',
      },
    });
  });

  // Health check
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
    });
  });

  // API routes
  app.use('/api/events', eventRoutes);

  // Seed demo events (idempotent)
  try {
    seedEvents();
    console.log('✅ Seed events loaded');
  } catch (error) {
    console.error('⚠️  Failed to seed events:', error);
  }

  // Global error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('❌ Unhandled error:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  });

  return app;
};

export default createApp;
