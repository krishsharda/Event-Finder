import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { CreateEventDTO } from '../../types/event.types';
import { formatDateForInput } from '../../utils/helpers';
import './CreateEvent.css';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateEventDTO>({
    title: '',
    description: '',
    location: '',
    date: formatDateForInput(),
    maxParticipants: 10,
    currentParticipants: 0,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'maxParticipants' || name === 'currentParticipants' 
        ? parseInt(value) || 0 
        : value,
    }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      errors.title = 'Title must be less than 200 characters';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length > 1000) {
      errors.description = 'Description must be less than 1000 characters';
    }

    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }

    if (!formData.date) {
      errors.date = 'Date is required';
    } else if (new Date(formData.date) < new Date()) {
      errors.date = 'Event date cannot be in the past';
    }

    if (formData.maxParticipants < 1) {
      errors.maxParticipants = 'Must have at least 1 participant';
    } else if (formData.maxParticipants > 10000) {
      errors.maxParticipants = 'Cannot exceed 10,000 participants';
    }

    if (formData.currentParticipants !== undefined) {
      if (formData.currentParticipants < 0) {
        errors.currentParticipants = 'Cannot be negative';
      } else if (formData.currentParticipants > formData.maxParticipants) {
        errors.currentParticipants = 'Cannot exceed max participants';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await eventService.createEvent(formData);

      // Navigate back to home page
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Events
      </button>

      <div className="create-event-card">
        <h1 className="create-event-title">Create New Event</h1>
        <p className="create-event-subtitle">Fill in the details to create your event</p>

        {error && (
          <div className="form-error-banner">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="create-event-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${validationErrors.title ? 'form-input-error' : ''}`}
              placeholder="Enter event title"
              disabled={loading}
            />
            {validationErrors.title && (
              <span className="form-error">{validationErrors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-textarea ${validationErrors.description ? 'form-input-error' : ''}`}
              placeholder="Describe your event..."
              rows={5}
              disabled={loading}
            />
            {validationErrors.description && (
              <span className="form-error">{validationErrors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`form-input ${validationErrors.location ? 'form-input-error' : ''}`}
              placeholder="e.g., New York, Los Angeles"
              disabled={loading}
            />
            {validationErrors.location && (
              <span className="form-error">{validationErrors.location}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`form-input ${validationErrors.date ? 'form-input-error' : ''}`}
              disabled={loading}
            />
            {validationErrors.date && (
              <span className="form-error">{validationErrors.date}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="maxParticipants" className="form-label">
                Max Participants *
              </label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                className={`form-input ${validationErrors.maxParticipants ? 'form-input-error' : ''}`}
                min="1"
                max="10000"
                disabled={loading}
              />
              {validationErrors.maxParticipants && (
                <span className="form-error">{validationErrors.maxParticipants}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="currentParticipants" className="form-label">
                Current Participants
              </label>
              <input
                type="number"
                id="currentParticipants"
                name="currentParticipants"
                value={formData.currentParticipants}
                onChange={handleChange}
                className={`form-input ${validationErrors.currentParticipants ? 'form-input-error' : ''}`}
                min="0"
                disabled={loading}
              />
              {validationErrors.currentParticipants && (
                <span className="form-error">{validationErrors.currentParticipants}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
