import { UserLocation } from '../types/event.types';

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Get user's current location
export const getUserLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(`Failed to get location: ${error.message}`));
      }
    );
  });
};

// Simple geocoding (mock - in production, use Google Maps API or similar)
// This is a placeholder that returns approximate coordinates for demo purposes
export const geocodeLocation = (location: string): { lat: number; lng: number } | null => {
  // Simple mock geocoding for common cities (for demo purposes)
  const cities: Record<string, { lat: number; lng: number }> = {
    // US sample cities
    'new york': { lat: 40.7128, lng: -74.006 },
    'los angeles': { lat: 34.0522, lng: -118.2437 },
    'chicago': { lat: 41.8781, lng: -87.6298 },
    'san francisco': { lat: 37.7749, lng: -122.4194 },
    'seattle': { lat: 47.6062, lng: -122.3321 },
    'boston': { lat: 42.3601, lng: -71.0589 },
    'austin': { lat: 30.2672, lng: -97.7431 },
    'denver': { lat: 39.7392, lng: -104.9903 },
    'miami': { lat: 25.7617, lng: -80.1918 },
    'portland': { lat: 45.5152, lng: -122.6784 },
    // India cities
    'mumbai': { lat: 19.076, lng: 72.8777 },
    'new delhi': { lat: 28.6139, lng: 77.209 },
    'delhi': { lat: 28.6139, lng: 77.209 },
    'bengaluru': { lat: 12.9716, lng: 77.5946 },
    'bangalore': { lat: 12.9716, lng: 77.5946 },
    'hyderabad': { lat: 17.385, lng: 78.4867 },
    'chennai': { lat: 13.0827, lng: 80.2707 },
    'kolkata': { lat: 22.5726, lng: 88.3639 },
    'pune': { lat: 18.5204, lng: 73.8567 },
  };

  const normalizedLocation = location.toLowerCase().trim();
  
  // Check for exact city match
  for (const [city, coords] of Object.entries(cities)) {
    if (normalizedLocation.includes(city)) {
      return coords;
    }
  }

  return null;
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format date for input field (YYYY-MM-DDTHH:mm)
export const formatDateForInput = (dateString?: string): string => {
  const date = dateString ? new Date(dateString) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Check if event is full
export const isEventFull = (currentParticipants: number, maxParticipants: number): boolean => {
  return currentParticipants >= maxParticipants;
};

// Get availability percentage
export const getAvailabilityPercentage = (
  currentParticipants: number,
  maxParticipants: number
): number => {
  return Math.round((currentParticipants / maxParticipants) * 100);
};
