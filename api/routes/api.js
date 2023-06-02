import express from 'express';
import errorHandler from 'http-errors';

import env from '#utils/env.js';

import v1 from './v1/v1.js';

const router = express.Router();

router.use('/v1', v1);

router.use((req, res, next) => {
  res
    .status(404)
    .send(
      `404 Invalid API route, check the <a href="${env.REDIRECT_URL}">documentation</a> for a list of routes.`
    );
  next(errorHandler(404));
});

export default router;
