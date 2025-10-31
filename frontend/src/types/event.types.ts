// Event data types matching backend

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
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
  details?: string[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}
