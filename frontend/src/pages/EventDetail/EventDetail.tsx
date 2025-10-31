import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { eventService } from '../../services/eventService';
import { Event } from '../../types/event.types';
import { formatDate, isEventFull, getAvailabilityPercentage, geocodeLocation, calculateDistance } from '../../utils/helpers';
import { useGeolocation } from '../../hooks/useGeolocation';
import './EventDetail.css';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { location: userLocation, requestLocation } = useGeolocation();

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError('Invalid event ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await eventService.getEventById(id);
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleGetLocation = async () => {
    await requestLocation();
  };

  if (loading) {
    return <LoadingSpinner message="Loading event details..." />;
  }

  if (error || !event) {
    return (
      <div className="event-detail-page">
        <ErrorMessage message={error || 'Event not found'} onRetry={() => navigate('/')} />
      </div>
    );
  }

  const isFull = isEventFull(event.currentParticipants, event.maxParticipants);
  const availabilityPercentage = getAvailabilityPercentage(
    event.currentParticipants,
    event.maxParticipants
  );

  // Calculate distance if user location is available
  let distance: number | null = null;
  if (userLocation) {
    const eventCoords = geocodeLocation(event.location);
    if (eventCoords) {
      distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        eventCoords.lat,
        eventCoords.lng
      );
    }
  }

  return (
    <div className="event-detail-page">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Events
      </button>

      <div className="event-detail-card">
        <div className="event-detail-header">
          <h1 className="event-detail-title">{event.title}</h1>
          {isFull && <span className="status-badge status-full">Full</span>}
          {!isFull && <span className="status-badge status-available">Available</span>}
        </div>

        <div className="event-detail-section">
          <h2 className="section-title">Description</h2>
          <p className="event-detail-description">{event.description}</p>
        </div>

        <div className="event-detail-section">
          <h2 className="section-title">Event Details</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">📍 Location</span>
              <span className="detail-value">{event.location}</span>
              {distance !== null && (
                <span className="detail-distance-badge">{distance} km away</span>
              )}
            </div>

            <div className="detail-item">
              <span className="detail-label">📅 Date & Time</span>
              <span className="detail-value">{formatDate(event.date)}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">👥 Participants</span>
              <span className="detail-value">
                {event.currentParticipants} / {event.maxParticipants}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">📊 Availability</span>
              <span className="detail-value">{100 - availabilityPercentage}% remaining</span>
            </div>
          </div>
        </div>

        <div className="event-detail-section">
          <h2 className="section-title">Capacity</h2>
          <div className="capacity-bar">
            <div
              className="capacity-fill"
              style={{
                width: `${availabilityPercentage}%`,
                backgroundColor: isFull ? '#dc2626' : '#2563eb',
              }}
            />
          </div>
          <p className="capacity-text">
            {event.maxParticipants - event.currentParticipants} spot
            {event.maxParticipants - event.currentParticipants !== 1 ? 's' : ''} remaining
          </p>
        </div>

        {!userLocation && (
          <div className="location-prompt">
            <button onClick={handleGetLocation} className="location-prompt-button">
              📍 Enable location to see distance
            </button>
          </div>
        )}

        <div className="event-detail-footer">
          <p className="created-at">Created {new Date(event.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
