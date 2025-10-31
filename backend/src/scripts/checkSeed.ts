import { seedEvents } from '../storage/seed';
import { eventStorage } from '../storage/eventStorage';

// Run seed and print a concise summary to stdout
(async () => {
  seedEvents();
  const events = eventStorage.getAll();
  console.log(JSON.stringify({
    count: events.length,
    titles: events.map(e => e.title),
    locations: events.map(e => e.location),
  }, null, 2));
})();
