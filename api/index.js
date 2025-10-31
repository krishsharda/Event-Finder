// Vercel serverless function for Event Finder API
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

// In-memory storage (Vercel serverless is stateless, so this resets on each cold start)
const events = new Map();

// Seed events function
function seedEvents() {
  if (events.size > 0) return;

  const addDays = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(18, 0, 0, 0);
    return d.toISOString();
  };

  const seeds = [
    {
      id: uuidv4(),
      title: 'Mumbai Tech Meetup',
      description: 'Join developers across Mumbai for lightning talks, networking, and chai. All levels welcome.',
      location: 'Mumbai, India',
      date: addDays(7),
      maxParticipants: 150,
      currentParticipants: 45,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: 'Delhi Startup Pitch Night',
      description: 'Early-stage founders pitch to mentors and VCs. Feedback, connections, and pizza included.',
      location: 'New Delhi, India',
      date: addDays(10),
      maxParticipants: 120,
      currentParticipants: 60,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: 'Bengaluru AI & ML Forum',
      description: 'Hands-on sessions on LLMs, MLOps, and productionizing models. Bring your laptop!',
      location: 'Bengaluru, India',
      date: addDays(14),
      maxParticipants: 200,
      currentParticipants: 150,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: 'Hyderabad Cloud Day',
      description: 'AWS, Azure, and GCP experts share real-world cloud architecture patterns.',
      location: 'Hyderabad, India',
      date: addDays(12),
      maxParticipants: 180,
      currentParticipants: 90,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: 'Chennai Open Source Summit',
      description: 'Celebrating open-source contributions. Beginners encouraged!',
      location: 'Chennai, India',
      date: addDays(20),
      maxParticipants: 250,
      currentParticipants: 120,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: 'Kolkata DevOps Meetup',
      description: 'CI/CD pipelines, Kubernetes, and automation best practices.',
      location: 'Kolkata, India',
      date: addDays(15),
      maxParticipants: 100,
      currentParticipants: 55,
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: 'Pune Product Management Panel',
      description: 'PMs from top startups discuss roadmaps, user research, and metrics.',
      location: 'Pune, India',
      date: addDays(18),
      maxParticipants: 80,
      currentParticipants: 40,
      createdAt: new Date().toISOString()
    }
  ];

  seeds.forEach(event => events.set(event.id, event));
  console.log('✅ Seeded', events.size, 'events');
}

// CORS and middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Seed on cold start
seedEvents();

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Event Finder API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      events: '/api/events',
      createEvent: 'POST /api/events',
      getEvent: '/api/events/:id'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Get all events with filters
app.get('/api/events', (req, res) => {
  try {
    const { location, search, date } = req.query;
    let allEvents = Array.from(events.values());

    // Apply filters
    if (location) {
      allEvents = allEvents.filter(e => 
        e.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (search) {
      const searchLower = search.toLowerCase();
      allEvents = allEvents.filter(e =>
        e.title.toLowerCase().includes(searchLower) ||
        e.description.toLowerCase().includes(searchLower)
      );
    }
    if (date) {
      allEvents = allEvents.filter(e => 
        e.date.startsWith(date)
      );
    }

    // Sort by date
    allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    res.json({ success: true, data: allEvents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create event
app.post('/api/events', (req, res) => {
  try {
    const { title, description, location, date, maxParticipants } = req.body;

    // Validation
    if (!title || title.length < 3) {
      return res.status(400).json({ success: false, error: 'Title must be at least 3 characters' });
    }
    if (!description || description.length < 10) {
      return res.status(400).json({ success: false, error: 'Description must be at least 10 characters' });
    }
    if (!location || location.length < 3) {
      return res.status(400).json({ success: false, error: 'Location must be at least 3 characters' });
    }
    if (!date) {
      return res.status(400).json({ success: false, error: 'Date is required' });
    }
    if (!maxParticipants || maxParticipants < 1) {
      return res.status(400).json({ success: false, error: 'Max participants must be at least 1' });
    }

    const event = {
      id: uuidv4(),
      title,
      description,
      location,
      date,
      maxParticipants: parseInt(maxParticipants),
      currentParticipants: 0,
      createdAt: new Date().toISOString()
    };

    events.set(event.id, event);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single event
app.get('/api/events/:id', (req, res) => {
  try {
    const event = events.get(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }
    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Export for Vercel
module.exports = app;
