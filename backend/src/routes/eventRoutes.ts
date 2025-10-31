import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById
} from '../controllers/eventController';
import { validateCreateEvent, validateEventId } from '../middleware/validation';

const router = Router();

// POST /api/events - Create a new event
router.post('/', validateCreateEvent, createEvent);

// GET /api/events - Get all events with optional filters
router.get('/', getAllEvents);

// GET /api/events/:id - Get event by ID
router.get('/:id', validateEventId, getEventById);

export default router;
