import * as Sentry from '@sentry/node';

export default (err, req, res, next) => {
  console.error('Error caught:', err);

  Sentry.captureException(err);

  res.status(err.status || 500).json({
    error: 'An error occurred on the server, please double-check your request!',
    ...(process.env.NODE_ENV === 'development' && {
      details: err.message,
      stack: err.stack,
    }),
  });
};