# How to Run the Mini Event Finder App

## Option 1: Using the Helper Script (Windows)

Double-click `start-both.bat` in the root folder. This will:
1. Open a terminal for the backend server
2. Open a terminal for the frontend server
3. Both will start automatically

## Option 2: Manual Start (Recommended for First Time)

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

Wait for the message: `🚀 Server running on http://localhost:4000`

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Wait for the message about the local server, then open your browser to `http://localhost:5173`

## What You'll See

1. **First Load**: Empty event list with a message "No events found"
2. **Create Button**: Click "Create Event" in the header
3. **Fill Form**: Add event details (title, description, location, date, participants)
4. **View Events**: After creating, you'll see your events in a grid
5. **Search**: Use the search bar to find events by title or description
6. **Filter**: Use location filter to find events in specific cities
7. **Details**: Click any event card to see full details
8. **Distance**: Click "Enable location" to see distances to events

## Sample Event to Create

```
Title: Tech Meetup
Description: Join us for an evening of networking and tech discussions. We'll have presentations on the latest web technologies and time for Q&A.
Location: San Francisco
Date: (Choose any future date)
Max Participants: 50
Current Participants: 5
```

## Supported Cities for Distance Calculation

When creating events, use these cities to see distance calculations:
- New York
- Los Angeles
- Chicago
- San Francisco
- Seattle
- Boston
- Austin
- Denver
- Miami
- Portland

## Troubleshooting

### Backend won't start
- Error: "Port 4000 is already in use"
- Solution: Kill the process using port 4000 or change PORT in `.env`

### Frontend won't start
- Error: "Port 5173 is already in use"
- Solution: Kill the process or use the alternate port offered by Vite

### Can't create events
- Check: Backend is running (you should see console logs)
- Check: Browser console for error messages
- Check: `.env` files exist in both folders

### Search not working
- This is normal - search only works after you create some events
- Try creating 2-3 events first, then use search

### Distance not showing
- Click "Enable location for distance" button
- Allow browser to access your location
- Only works for the supported cities listed above

## Features to Test

1. ✅ Create multiple events
2. ✅ Search by keyword
3. ✅ Filter by location
4. ✅ View event details
5. ✅ Enable geolocation
6. ✅ See distances
7. ✅ Check responsive design (resize browser)
8. ✅ Test form validation (try submitting empty form)
9. ✅ Test past date validation
10. ✅ Test navigation between pages

## API Endpoints (Optional Testing)

You can also test the API directly in Postman or with curl:

**Health Check**
```bash
curl http://localhost:4000/health
```

**Create Event**
```bash
curl -X POST http://localhost:4000/api/events \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Event\",\"description\":\"Testing API\",\"location\":\"Seattle\",\"date\":\"2025-12-01T18:00:00Z\",\"maxParticipants\":30,\"currentParticipants\":0}"
```

**Get All Events**
```bash
curl http://localhost:4000/api/events
```

**Search Events**
```bash
curl "http://localhost:4000/api/events?search=tech"
```

**Filter by Location**
```bash
curl "http://localhost:4000/api/events?location=seattle"
```

## Stop the Servers

To stop either server, press `Ctrl+C` in the terminal window.

## Need More Help?

- Check `QUICKSTART.md` for more details
- Check `README_FULL.md` for comprehensive documentation
- Check `PROJECT_SUMMARY.md` for project overview

---

Enjoy using Mini Event Finder! 🎉
