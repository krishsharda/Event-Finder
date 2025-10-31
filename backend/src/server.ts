import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import eventRoutes from './routes/eventRoutes';
import { seedEvents } from './storage/seed';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

// CORS: Allow all origins since we're serving frontend from same origin
// Only needed for local dev when frontend runs on different port
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Event Finder API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      events: '/api/events',
      createEvent: 'POST /api/events',
      getEvent: '/api/events/:id'
    }
  });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/events', eventRoutes);

// Seed demo events (India) if storage is empty
try {
  seedEvents();
  console.log('✅ Seed events loaded');
} catch (error) {
  console.error('⚠️  Failed to seed events:', error);
}

// Serve frontend static files (in production)
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDistPath));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Unhandled error:', err);
  console.error('Error stack:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for all origins (same-origin + dev)`);
});

export default app;
