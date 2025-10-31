import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '../../types/event.types';
import { formatDate, isEventFull, getAvailabilityPercentage, geocodeLocation, calculateDistance } from '../../utils/helpers';
import { UserLocation } from '../../types/event.types';
import './EventCard.css';

interface EventCardProps {
  event: Event;
  userLocation?: UserLocation | null;
}

const EventCard: React.FC<EventCardProps> = ({ event, userLocation }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

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
    <div className="event-card" onClick={handleClick}>
      <div className="event-card-header">
        <h3 className="event-title">{event.title}</h3>
        {isFull && <span className="event-badge event-badge-full">Full</span>}
      </div>

      <p className="event-description">{event.description}</p>

      <div className="event-details">
        <div className="event-detail-item">
          <span className="detail-icon">📍</span>
          <span className="detail-text">{event.location}</span>
          {distance !== null && (
            <span className="detail-distance">({distance} km away)</span>
          )}
        </div>

        <div className="event-detail-item">
          <span className="detail-icon">📅</span>
          <span className="detail-text">{formatDate(event.date)}</span>
        </div>

        <div className="event-detail-item">
          <span className="detail-icon">👥</span>
          <span className="detail-text">
            {event.currentParticipants} / {event.maxParticipants} participants
          </span>
        </div>
      </div>

      <div className="event-progress">
        <div
          className="event-progress-bar"
          style={{
            width: `${availabilityPercentage}%`,
            backgroundColor: isFull ? '#dc2626' : '#2563eb',
          }}
        />
      </div>
    </div>
  );
};

export default EventCard;
