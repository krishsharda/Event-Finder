import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { eventStorage } from '../storage/eventStorage';
import { CreateEventDTO, Event, EventQueryParams, ApiResponse } from '../types/event.types';

// Create a new event
export const createEvent = (req: Request, res: Response): void => {
  try {
    const eventData: CreateEventDTO = req.body;

    const newEvent: Event = {
      id: uuidv4(),
      title: eventData.title.trim(),
      description: eventData.description.trim(),
      location: eventData.location.trim(),
      date: eventData.date,
      maxParticipants: eventData.maxParticipants,
      currentParticipants: eventData.currentParticipants || 0,
      createdAt: new Date().toISOString()
    };

    const createdEvent = eventStorage.create(newEvent);

    const response: ApiResponse<Event> = {
      success: true,
      data: createdEvent,
      message: 'Event created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create event'
    });
  }
};

// Get all events with optional filters
export const getAllEvents = (req: Request, res: Response): void => {
  try {
    const { location, search, date } = req.query as EventQueryParams;

    let events = eventStorage.getAll();

    // Apply location filter
    if (location && location.trim().length > 0) {
      events = events.filter(event =>
        event.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Apply search filter (title and description)
    if (search && search.trim().length > 0) {
      const searchLower = search.toLowerCase();
      events = events.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply date filter
    if (date && date.trim().length > 0) {
      const filterDate = new Date(date).toISOString().split('T')[0];
      events = events.filter(event => {
        const eventDate = new Date(event.date).toISOString().split('T')[0];
        return eventDate === filterDate;
      });
    }

    // Sort by date (ascending)
    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const response: ApiResponse<Event[]> = {
      success: true,
      data: events,
      message: `Found ${events.length} event(s)`
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events'
    });
  }
};

// Get event by ID
export const getEventById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;

    const event = eventStorage.getById(id);

    if (!event) {
      res.status(404).json({
        success: false,
        error: 'Event not found'
      });
      return;
    }

    const response: ApiResponse<Event> = {
      success: true,
      data: event
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch event'
    });
  }
};
