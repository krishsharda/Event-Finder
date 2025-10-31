import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes';
import { seedEvents } from './storage/seed';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;
// Clean CORS_ORIGIN by trimming whitespace and removing quotes
const CORS_ORIGIN = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .trim()
  .replace(/^["']|["']$/g, ''); // Remove leading/trailing quotes

console.log('🌐 CORS configured for:', CORS_ORIGIN);

// Middleware
app.use(cors({
  origin: CORS_ORIGIN === '*' ? '*' : CORS_ORIGIN,
  credentials: CORS_ORIGIN !== '*'
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

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
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
  console.log(`🌐 CORS enabled for: ${CORS_ORIGIN}`);
});

export default app;
