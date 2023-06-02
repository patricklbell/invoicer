import express from 'express';
import cors from 'cors';

import env from '#utils/env.js';
import { closeConnection } from '#utils/db.js';
import { __dirname } from '#utils/file.js';
import path from 'path';
import { errorLogger, requestLogger } from '#middlewares/loggers.js';
import api from '#routes/api.js';
import handlebars from '#utils/handlebars.js';

const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine', 'hbs');
handlebars();

// don't record logs if testing
/* c8 ignore start */
if (env.NODE_ENV !== 'test') {
  app.use(requestLogger);
}
/* c8 ignore end */

app.use('/api', api);

app.use(express.static('public'));
app.get('/docs/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/docs/index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// don't record logs if testing
/* c8 ignore start */
if (env.NODE_ENV !== 'test') {
  app.use(errorLogger);
}

// error handler
app.use((err, req, res) => {
  if (env.NODE_ENV === 'dev' || env.NODE_ENV === 'test') {
    res
      .status(err?.status || 500)
      .json({ message: err?.message, name: err?.name, stack: err?.stack });
  } else {
    res
      .status(err?.status || 500)
      .json({ message: err?.message, name: err?.name });
  }
});
/* c8 ignore end */

const port = env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    closeConnection();
    console.log('MongoDB connection and server closed');
  });
});

export default app; // For testing
