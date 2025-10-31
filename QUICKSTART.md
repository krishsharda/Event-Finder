# Mini Event Finder - Quick Start Guide

## What You Have

A complete full-stack application with:

**Backend (Node.js + Express + TypeScript)**
- ✅ 3 REST API endpoints fully implemented
- ✅ In-memory storage for events
- ✅ Comprehensive validation and error handling
- ✅ CORS configured for frontend
- ✅ TypeScript with strict mode

**Frontend (React + TypeScript + Vite)**
- ✅ Event list page with search and filters
- ✅ Event detail page
- ✅ Create event page with form validation
- ✅ Geolocation support with distance calculations
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ React Router for navigation

## How to Run

### Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

Server will start on http://localhost:4000

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

App will open on http://localhost:5173

## Quick Test Flow

1. Open http://localhost:5173 in your browser
2. You'll see an empty event list
3. Click "Create Event" in the header
4. Fill out the form:
   - Title: "Tech Meetup"
   - Description: "Monthly tech discussion"
   - Location: "San Francisco" (try cities like: New York, Los Angeles, Chicago, Seattle, Boston, Austin, Denver, Miami, Portland)
   - Date: Select any future date
   - Max Participants: 50
   - Current Participants: 0
5. Click "Create Event"
6. You'll be redirected to the event list
7. Click on your event to see details
8. Go back and create more events
9. Try the search bar (searches title and description)
10. Try the location filter
11. Click "Enable location for distance" to see distances to events

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Testing (Optional)

You can also test the API directly using curl or Postman:

### Create Event
```bash
curl -X POST http://localhost:4000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Community Garden Day",
    "description": "Join us for a day of planting and community building",
    "location": "Portland",
    "date": "2025-11-20T10:00:00Z",
    "maxParticipants": 30,
    "currentParticipants": 5
  }'
```

### Get All Events
```bash
curl http://localhost:4000/api/events
```

### Get All Events with Filters
```bash
curl "http://localhost:4000/api/events?location=portland&search=garden"
```

### Get Event by ID
```bash
curl http://localhost:4000/api/events/{event-id}
```

## Project Structure

```
Slanup_full_stack/
├── backend/
│   ├── src/
│   │   ├── controllers/eventController.ts    # Handles requests
│   │   ├── middleware/validation.ts          # Validates input
│   │   ├── routes/eventRoutes.ts             # Defines routes
│   │   ├── storage/eventStorage.ts           # In-memory DB
│   │   ├── types/event.types.ts              # TypeScript types
│   │   └── server.ts                          # Express setup
│   ├── .env                                   # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/                        # Reusable components
    │   ├── pages/                             # Page components
    │   ├── hooks/                             # Custom React hooks
    │   ├── services/eventService.ts           # API calls
    │   ├── utils/helpers.ts                   # Utility functions
    │   └── App.tsx                            # Main app
    ├── .env                                   # Environment variables
    └── package.json
```

## Next Steps

1. **Test All Features**
   - Create multiple events
   - Test search functionality
   - Test location filtering
   - Enable geolocation
   - Check responsive design on mobile

2. **Review Code**
   - Check `README_FULL.md` for detailed documentation
   - Review API endpoints in `backend/src/controllers/eventController.ts`
   - Review React components in `frontend/src/pages/`

3. **Deployment** (Optional)
   - Backend: Deploy to Railway, Render, or Heroku
   - Frontend: Deploy to Vercel or Netlify
   - See `README_FULL.md` for deployment instructions

## Troubleshooting

**Backend won't start:**
- Make sure you're in the `backend` directory
- Check if port 4000 is already in use
- Run `npm install` again if needed

**Frontend won't start:**
- Make sure you're in the `frontend` directory
- Check if port 5173 is already in use
- Run `npm install` again if needed

**API calls failing:**
- Make sure backend is running on port 4000
- Check browser console for CORS errors
- Verify `.env` file exists in both folders

**TypeScript errors:**
- Run `npm install` in both folders
- Check `tsconfig.json` is present
- Restart your code editor

## Key Features Implemented

✅ REST API with TypeScript
✅ In-memory event storage
✅ Input validation and error handling
✅ React with TypeScript
✅ React Router for navigation
✅ Search and filter functionality
✅ Geolocation and distance calculation
✅ Loading states
✅ Error handling with user feedback
✅ Responsive design
✅ Clean code organization
✅ Comprehensive documentation

## Technologies Used

- **Backend:** Node.js, Express, TypeScript, CORS, UUID
- **Frontend:** React 18, TypeScript, Vite, React Router, Axios
- **Styling:** CSS (no framework for simplicity)
- **Dev Tools:** Nodemon, ts-node, ESLint

## Need Help?

Check the comprehensive documentation in `README_FULL.md` which includes:
- Detailed setup instructions
- Complete API documentation
- Environment variables explanation
- Challenges faced and solutions
- AI tools usage
- Deployment guide
- Testing checklist

Enjoy building with Mini Event Finder! 🎉
