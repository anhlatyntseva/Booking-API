import express from 'express';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';

import requestLogger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import bookingRoutes from './routes/bookingRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import hostRoutes from './routes/hostRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import amenityRoutes from './routes/amenityRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());

  app.use(Sentry.Handlers.tracingHandler());
}

app.use(express.json());
app.use(requestLogger);

// Маршруты
app.use('/login', authRoutes);
app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);
app.use('/properties', propertyRoutes);
app.use('/hosts', hostRoutes);
app.use('/reviews', reviewRoutes);
app.use('/amenities', amenityRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
