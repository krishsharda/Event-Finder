import { Request, Response, NextFunction } from 'express';
import { CreateEventDTO } from '../types/event.types';

// Validate event creation request body
export const validateCreateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, description, location, date, maxParticipants } = req.body as CreateEventDTO;

  const errors: string[] = [];

  // Validate title
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  } else if (title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }

  // Validate description
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Description is required and must be a non-empty string');
  } else if (description.length > 1000) {
    errors.push('Description must be less than 1000 characters');
  }

  // Validate location
  if (!location || typeof location !== 'string' || location.trim().length === 0) {
    errors.push('Location is required and must be a non-empty string');
  }

  // Validate date
  if (!date || typeof date !== 'string') {
    errors.push('Date is required and must be a valid ISO 8601 date string');
  } else {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Date must be a valid ISO 8601 date string');
    } else if (parsedDate < new Date()) {
      errors.push('Event date cannot be in the past');
    }
  }

  // Validate maxParticipants
  if (maxParticipants === undefined || maxParticipants === null) {
    errors.push('maxParticipants is required');
  } else if (typeof maxParticipants !== 'number' || !Number.isInteger(maxParticipants)) {
    errors.push('maxParticipants must be an integer');
  } else if (maxParticipants < 1) {
    errors.push('maxParticipants must be at least 1');
  } else if (maxParticipants > 10000) {
    errors.push('maxParticipants cannot exceed 10,000');
  }

  // Validate currentParticipants if provided
  if (req.body.currentParticipants !== undefined) {
    const { currentParticipants } = req.body;
    if (typeof currentParticipants !== 'number' || !Number.isInteger(currentParticipants)) {
      errors.push('currentParticipants must be an integer');
    } else if (currentParticipants < 0) {
      errors.push('currentParticipants cannot be negative');
    } else if (currentParticipants > maxParticipants) {
      errors.push('currentParticipants cannot exceed maxParticipants');
    }
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
    return;
  }

  next();
};

// Validate event ID parameter
export const validateEventId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    res.status(400).json({
      success: false,
      error: 'Invalid event ID'
    });
    return;
  }

  next();
};
