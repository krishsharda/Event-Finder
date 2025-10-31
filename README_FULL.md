# Mini Event Finder

A full-stack event discovery application built with Node.js/Express (backend) and React/TypeScript (frontend). Users can create events, browse all events, view event details, search/filter events by location, and see distance calculations from their current location.

## Features

**Backend**
- RESTful API with Express and TypeScript
- Three main endpoints:
  - `POST /api/events` - Create new events
  - `GET /api/events` - List all events with optional location/search filters
  - `GET /api/events/:id` - Get specific event details
- In-memory storage for fast development
- Comprehensive input validation and error handling
- CORS enabled for frontend integration

**Frontend**
- Modern React with TypeScript and Vite
- Three main pages:
  - Event List - Browse all events with search and filtering
  - Event Detail - View complete event information
  - Create Event - Form to create new events
- Real-time search with debouncing
- Location-based distance calculations
- Responsive design for mobile and desktop
- Loading states and error handling throughout
- Geolocation support to show distances to events

## Tech Stack

**Backend**
- Node.js
- Express.js
- TypeScript
- UUID for ID generation
- CORS for cross-origin requests
- Dotenv for environment configuration

**Frontend**
- React 18
- TypeScript
- Vite (build tool)
- React Router for navigation
- Axios for API calls
- CSS for styling

## Project Structure

```
Slanup_full_stack/
├── backend/
│   ├── src/
│   │   ├── controllers/         # API endpoint handlers
│   │   ├── middleware/          # Request validation middleware
│   │   ├── routes/              # API route definitions
│   │   ├── storage/             # In-memory data storage
│   │   ├── types/               # TypeScript interfaces
│   │   └── server.ts            # Express server setup
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/          # Reusable UI components
    │   ├── hooks/               # Custom React hooks
    │   ├── pages/               # Page components
    │   ├── services/            # API service layer
    │   ├── types/               # TypeScript interfaces
    │   ├── utils/               # Helper functions
    │   └── App.tsx              # Main app component
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   copy .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```
   PORT=4000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   The backend will start on `http://localhost:4000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   copy .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:4000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## Running the Project

1. Start both servers (backend and frontend) in separate terminals
2. Open your browser and navigate to `http://localhost:5173`
3. You can now create events, browse the event list, and view event details

## API Documentation

### Base URL
```
http://localhost:4000
```

### Endpoints

**POST /api/events**
Create a new event

Request Body:
```json
{
  "title": "Tech Meetup",
  "description": "Monthly tech discussion",
  "location": "San Francisco",
  "date": "2025-11-15T18:00:00Z",
  "maxParticipants": 50,
  "currentParticipants": 0
}
```

Response (201):
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "Tech Meetup",
    "description": "Monthly tech discussion",
    "location": "San Francisco",
    "date": "2025-11-15T18:00:00Z",
    "maxParticipants": 50,
    "currentParticipants": 0,
    "createdAt": "2025-10-30T10:00:00Z"
  },
  "message": "Event created successfully"
}
```

**GET /api/events**
List all events with optional filters

Query Parameters:
- `location` (optional) - Filter by location
- `search` (optional) - Search in title and description
- `date` (optional) - Filter by specific date

Example:
```
GET /api/events?location=san francisco&search=tech
```

Response (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "title": "Tech Meetup",
      "description": "Monthly tech discussion",
      "location": "San Francisco",
      "date": "2025-11-15T18:00:00Z",
      "maxParticipants": 50,
      "currentParticipants": 15,
      "createdAt": "2025-10-30T10:00:00Z"
    }
  ],
  "message": "Found 1 event(s)"
}
```

**GET /api/events/:id**
Get specific event details

Response (200):
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "Tech Meetup",
    "description": "Monthly tech discussion",
    "location": "San Francisco",
    "date": "2025-11-15T18:00:00Z",
    "maxParticipants": 50,
    "currentParticipants": 15,
    "createdAt": "2025-10-30T10:00:00Z"
  }
}
```

### Error Responses

400 Bad Request - Validation error:
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "Title is required and must be a non-empty string"
  ]
}
```

404 Not Found:
```json
{
  "success": false,
  "error": "Event not found"
}
```

500 Internal Server Error:
```json
{
  "success": false,
  "error": "Failed to create event"
}
```

## Environment Variables

**Backend (.env)**
```
PORT=4000                                 # Server port
NODE_ENV=development                      # Environment mode
CORS_ORIGIN=http://localhost:5173        # Allowed frontend origin
```

**Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:4000  # Backend API URL
```

## Build for Production

**Backend**
```bash
cd backend
npm run build      # Compile TypeScript to JavaScript
npm start          # Run production build
```

**Frontend**
```bash
cd frontend
npm run build      # Build optimized production bundle
npm run preview    # Preview production build locally
```

## Deployment

**Backend Deployment (Railway, Render, or similar)**

1. Create a new service on your platform
2. Connect your GitHub repository
3. Set environment variables:
   - `PORT` (usually auto-configured)
   - `NODE_ENV=production`
   - `CORS_ORIGIN` (your frontend URL)
4. Set build command: `cd backend && npm install && npm run build`
5. Set start command: `cd backend && npm start`

**Frontend Deployment (Vercel, Netlify)**

1. Create a new project
2. Connect your GitHub repository
3. Set root directory: `frontend`
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Add environment variable:
   - `VITE_API_BASE_URL` (your backend URL)

## Challenges Faced and Solutions

**Challenge 1: TypeScript Strict Mode Errors**
When implementing TypeScript with strict mode enabled, optional properties caused type errors throughout the codebase.

Solution: Added proper type guards and null checks, especially for `currentParticipants` in the form validation and geolocation hooks.

**Challenge 2: CORS Issues During Development**
Initial API calls from frontend to backend were blocked due to CORS policy.

Solution: Configured CORS middleware in Express to accept requests from the frontend origin, and used Vite's proxy configuration as a fallback.

**Challenge 3: Search Debouncing**
Real-time search was causing too many API requests on every keystroke.

Solution: Implemented debouncing using `useEffect` with cleanup in the SearchBar component, waiting 300ms after user stops typing.

**Challenge 4: Geolocation Distance Calculation**
Calculating distances between user location and events required coordinate data for city names.

Solution: Created a mock geocoding function with common city coordinates for demonstration. In production, this would integrate with Google Maps Geocoding API or similar service.

**Challenge 5: Form Validation UX**
Validation errors appeared before users completed typing, creating a poor user experience.

Solution: Implemented field-level error clearing on change, and only validated on form submission. Errors are displayed inline with clear messaging.

## AI Tools Used

**GitHub Copilot**
- Used for generating boilerplate code for React components and Express routes
- Assisted with TypeScript interface definitions
- Helped write CSS styling for consistent component design
- Generated helper functions for date formatting and distance calculations
- Accelerated development by suggesting complete function implementations

**Key Benefits**
- Reduced development time by ~40% through code suggestions
- Helped maintain consistent code patterns across the project
- Provided quick solutions for common TypeScript typing issues
- Generated comprehensive validation logic with edge cases covered

**Custom Modifications**
- All AI-generated code was reviewed and modified for project-specific needs
- Added custom error handling and user feedback mechanisms
- Enhanced UI/UX beyond basic suggestions
- Implemented project-specific business logic for event management

## Testing

Manual testing checklist:

- [x] Create event with valid data
- [x] Validate form inputs (empty fields, past dates, etc.)
- [x] View event list
- [x] Search events by title/description
- [x] Filter events by location
- [x] View event details
- [x] Enable geolocation and see distances
- [x] Responsive design on mobile devices
- [x] API error handling (network errors, 404, etc.)
- [x] Loading states for all async operations

## Future Enhancements

- Add user authentication and authorization
- Implement event registration/RSVP system
- Add real geocoding API integration (Google Maps)
- Implement persistent database (MongoDB or PostgreSQL)
- Add event editing and deletion features
- Implement real-time updates with WebSockets
- Add event categories and tags
- Implement pagination for large event lists
- Add image upload for events
- Create admin dashboard for event management

## License

MIT

## Author

Built as a full-stack development challenge showcasing modern web development practices with TypeScript, React, and Node.js.
