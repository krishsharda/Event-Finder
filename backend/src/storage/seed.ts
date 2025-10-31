import { v4 as uuidv4 } from 'uuid';
import { eventStorage } from './eventStorage';
import { Event } from '../types/event.types';

const addDays = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  // Set a default time to 18:00 local to make it friendly
  d.setHours(18, 0, 0, 0);
  return d.toISOString();
};

export const seedEvents = (): void => {
  if (eventStorage.getAll().length > 0) return; // Prevent duplicate seeding

  const seeds: Omit<Event, 'createdAt'>[] = [
    {
      id: uuidv4(),
      title: 'Mumbai Tech Meetup',
      description:
        'Join developers across Mumbai for lightning talks, networking, and chai. All levels welcome.',
      location: 'Mumbai, India',
      date: addDays(7),
      maxParticipants: 150,
      currentParticipants: 45,
    },
    {
      id: uuidv4(),
      title: 'Delhi Startup Pitch Night',
      description:
        'Early-stage founders pitch to mentors and VCs. Feedback, connections, and pizza included.',
      location: 'New Delhi, India',
      date: addDays(10),
      maxParticipants: 120,
      currentParticipants: 60,
    },
    {
      id: uuidv4(),
      title: 'Bengaluru AI & ML Forum',
      description:
        'Hands-on sessions on LLMs, MLOps, and productionizing models. Bring your laptop!',
      location: 'Bengaluru, India',
      date: addDays(14),
      maxParticipants: 200,
      currentParticipants: 150,
    },
    {
      id: uuidv4(),
      title: 'Hyderabad Cloud Day',
      description:
        'Workshops on AWS, Azure, and GCP best practices. Live demos and labs throughout the day.',
      location: 'Hyderabad, India',
      date: addDays(5),
      maxParticipants: 180,
      currentParticipants: 80,
    },
    {
      id: uuidv4(),
      title: 'Chennai Design Systems Workshop',
      description:
        'Designers and frontend engineers collaborate to build scalable UI systems and patterns.',
      location: 'Chennai, India',
      date: addDays(21),
      maxParticipants: 90,
      currentParticipants: 30,
    },
    {
      id: uuidv4(),
      title: 'Kolkata Open Source Sprint',
      description:
        'Contribute to open-source projects. Maintainers will guide issues for first-time contributors.',
      location: 'Kolkata, India',
      date: addDays(12),
      maxParticipants: 100,
      currentParticipants: 20,
    },
    {
      id: uuidv4(),
      title: 'Pune DevOps Camp',
      description:
        'CI/CD pipelines, IaC, and observability deep dives with real-world case studies.',
      location: 'Pune, India',
      date: addDays(17),
      maxParticipants: 140,
      currentParticipants: 70,
    },
  ];

  seeds.forEach((e) => {
    const event: Event = { ...e, createdAt: new Date().toISOString() };
    eventStorage.create(event);
  });
};
