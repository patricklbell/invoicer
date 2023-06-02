import express from 'express';
import jwt from 'jsonwebtoken';

import passport from '#utils/passport.js';
import env from '#utils/env.js';
import { validationMiddleware } from '#middlewares/validation.js';
import { dbCollectionMiddleware } from '#middlewares/db-collection.js';
import { authenticatedMiddleware } from '#middlewares/auth.js';
import {
  deleteSchema,
  patchSchema,
  getSchema,
  postLoginSchema,
  postSignupSchema
} from '../schemas/user.js';

const router = express.Router();

router.post(
  '/login',
  validationMiddleware(postLoginSchema),
  (req, res, next) => {
    const { api = false } = req.body;

    // Call login with custom callback/done function
    passport.authenticate('login', async (err, user, info) => {
      if (err || !user) {
        return res.status(401).json(info);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) {
          return next(err);
        }

        const token = jwt.sign(
          { user: { id: user._id, username: user.username } },
          env.JWT_SECRET,
          { expiresIn: env.JWT_EXPIRES || '1h', noTimestamp: api }
        );

        return res.json({
          message: 'Login successful',
          token
        });
      });
    })(req, res, next);
  }
);

router.post(
  '/signup',
  validationMiddleware(postSignupSchema),
  passport.authenticate('signup', { session: false }),
  async (req, res) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.delete(
  ['/:id', '/'],
  validationMiddleware(deleteSchema),
  authenticatedMiddleware(),
  dbCollectionMiddleware('users'),
  async (req, res, next) => {
    const id = req?.params?.id || req?.user?.id;
    // @note in future there may be managed accounts which can delete others
    if (id !== req?.user?.id) {
      return res.status(401).send('Unauthorized');
    }

    req.collection
      .deleteOne({ _id: id })
      .then((ack) => {
        if (ack?.deletedCount === 0) {
          res.status(404);
        }

        res.json(ack);
      })
      .catch(next);
  }
);

router.get(
  ['/:id', '/'],
  validationMiddleware(getSchema),
  authenticatedMiddleware(true),
  dbCollectionMiddleware('users'),
  async (req, res, next) => {
    const id = req?.params?.id || req?.user?.id;
    if (!id) {
      return res.status(401).send('Unauthorized');
    }

    req.collection
      .findOne({ _id: id })
      .then((data) => {
        if (data === null) {
          return res.status(404).json({ found: false });
        }

        if (req?.user?.id.equals(data._id)) {
          return res.status(200).json({
            user: data,
            found: true
          });
        }

        return res.status(200).json({
          user: {
            _id: data._id,
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            dateCreated: data.dateCreated
          },
          found: true
        });
      })
      .catch(next);
  }
);

router.patch(
  ['/:id', '/'],
  validationMiddleware(patchSchema),
  authenticatedMiddleware(),
  dbCollectionMiddleware('users'),
  async (req, res, next) => {
    const id = req?.params?.id || req?.user?.id;
    // @note in future there may be managed accounts which can patched by others
    if (id !== req?.user?.id) {
      return res.status(401).send('Unauthorized');
    }

    const updates = req.body;
    req.collection
      .updateOne({ _id: id }, { $set: updates })
      .then((ack) => {
        if (ack?.matchedCount === 0) {
          res.status(404);
        }

        res.json(ack);
      })
      .catch((err) => {
        if (err?.code === 11000) {
          err.message = `The username ${updates?.username} is already taken`;
        }
        next(err);
      });
  }
);

export default router;
