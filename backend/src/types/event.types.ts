// Event data model and related types

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string; // ISO 8601 date string
  maxParticipants: number;
  currentParticipants: number;
  createdAt: string;
}

export interface CreateEventDTO {
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
  currentParticipants?: number;
}

export interface EventQueryParams {
  location?: string;
  search?: string;
  date?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
