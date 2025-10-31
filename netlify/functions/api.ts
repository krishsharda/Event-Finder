import serverless from 'serverless-http';
import { createApp } from '../../backend/src/app';

// Wrap Express app with serverless-http for Netlify Functions
const app = createApp();

export const handler = serverless(app);
