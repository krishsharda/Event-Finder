import axios, { AxiosError } from 'axios';
import { Event, CreateEventDTO, EventQueryParams, ApiResponse } from '../types/event.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler for API calls
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse<never>>;
    if (axiosError.response?.data) {
      throw new Error(
        axiosError.response.data.error || 
        axiosError.response.data.message || 
        'An error occurred'
      );
    }
    throw new Error(axiosError.message || 'Network error');
  }
  throw new Error('An unexpected error occurred');
};

export const eventService = {
  // Create a new event
  async createEvent(eventData: CreateEventDTO): Promise<Event> {
    try {
      const response = await api.post<ApiResponse<Event>>('/api/events', eventData);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Failed to create event');
      }
      return response.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get all events with optional filters
  async getAllEvents(params?: EventQueryParams): Promise<Event[]> {
    try {
      const response = await api.get<ApiResponse<Event[]>>('/api/events', { params });
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Failed to fetch events');
      }
      return response.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get event by ID
  async getEventById(id: string): Promise<Event> {
    try {
      const response = await api.get<ApiResponse<Event>>(`/api/events/${id}`);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Failed to fetch event');
      }
      return response.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};
