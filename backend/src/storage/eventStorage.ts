import { Event } from '../types/event.types';

// In-memory storage for events
class EventStorage {
  private events: Map<string, Event> = new Map();

  // Create a new event
  create(event: Event): Event {
    this.events.set(event.id, event);
    return event;
  }

  // Get all events
  getAll(): Event[] {
    return Array.from(this.events.values());
  }

  // Get event by ID
  getById(id: string): Event | undefined {
    return this.events.get(id);
  }

  // Update an event
  update(id: string, updatedEvent: Partial<Event>): Event | undefined {
    const event = this.events.get(id);
    if (!event) return undefined;

    const updated = { ...event, ...updatedEvent };
    this.events.set(id, updated);
    return updated;
  }

  // Delete an event
  delete(id: string): boolean {
    return this.events.delete(id);
  }

  // Filter events by location
  filterByLocation(location: string): Event[] {
    return this.getAll().filter(event =>
      event.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Search events by title or description
  search(query: string): Event[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter(event =>
      event.title.toLowerCase().includes(lowerQuery) ||
      event.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Clear all events (useful for testing)
  clear(): void {
    this.events.clear();
  }
}

// Export singleton instance
export const eventStorage = new EventStorage();
