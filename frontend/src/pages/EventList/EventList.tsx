import React, { useState, useCallback } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEvents } from '../../hooks/useEvents';
import { useGeolocation } from '../../hooks/useGeolocation';
import './EventList.css';

const EventList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const { events, loading, error, refetch } = useEvents({
    search: searchQuery,
    location: locationFilter,
  });

  const { location: userLocation, loading: locationLoading, requestLocation } = useGeolocation();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleLocationFilter = useCallback((location: string) => {
    setLocationFilter(location);
  }, []);

  const handleGetLocation = async () => {
    await requestLocation();
  };

  return (
    <div className="event-list-page">
      <div className="page-header">
        <h1 className="page-title">Discover Events</h1>
        <p className="page-subtitle">Find and join exciting events near you</p>
      </div>

      <div className="location-section">
        {!userLocation ? (
          <button
            onClick={handleGetLocation}
            disabled={locationLoading}
            className="location-button"
          >
            {locationLoading ? '📍 Getting location...' : '📍 Enable location for distance'}
          </button>
        ) : (
          <div className="location-enabled">
            Location enabled - distances shown
          </div>
        )}
      </div>

      <SearchBar
        onSearch={handleSearch}
        onLocationFilter={handleLocationFilter}
        placeholder="Search by title or description..."
      />

      {loading ? (
        <LoadingSpinner message="Loading events..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : events.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3 className="empty-title">No events found</h3>
          <p className="empty-text">
            {searchQuery || locationFilter
              ? 'Try adjusting your search filters'
              : 'Be the first to create an event!'}
          </p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} userLocation={userLocation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
