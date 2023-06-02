import express from 'express';

import { dbCollectionMiddleware } from '#middlewares/db-collection.js';
import { validationMiddleware } from '#middlewares/validation.js';
import { authenticatedMiddleware } from '#middlewares/auth.js';
import {
  getFeedSchema,
  getSearchSchema,
  postBatchSchema
} from '../schemas/invoices.js';

const router = express.Router();

// All /invoices routes use invoice collection, change this if they don't anymore!
router.use(dbCollectionMiddleware('invoices'));

router.get(
  '/search',
  authenticatedMiddleware(),
  validationMiddleware(getSearchSchema),
  async (req, res, next) => {
    const { query, page, limit, offset } = req.query;
    const userId = req.user.id;

    const searchq = {
      index: 'default',
      text: {
        query,
        fuzzy: {},
        path: {
          wildcard: '*'
        }
      }
    };

    req.collection
      .aggregate([
        { $search: searchq },
        { $match: { viewIds: userId } },
        {
          $facet: {
            page: [{ $skip: page * limit + offset }, { $limit: limit }],
            total: [{ $count: 'count' }]
          }
        }
      ])
      .toArray()
      .then((result) => {
        const page = result[0].page;
        const total = result[0].total[0]?.count || 0;

        res.json({ page, total });
      })
      .catch(next);
  }
);

router.get(
  '/feed',
  authenticatedMiddleware(),
  validationMiddleware(getFeedSchema),
  authenticatedMiddleware(false),
  async (req, res, next) => {
    const { page, limit, offset } = req.query;
    const userId = req.user.id;

    req.collection
      .aggregate([
        { $match: { viewIds: userId } },
        {
          $facet: {
            page: [{ $skip: page * limit + offset }, { $limit: limit }],
            total: [{ $count: 'count' }]
          }
        }
      ])
      .toArray()
      .then((result) => {
        const page = result[0].page;
        const total = result[0].total[0]?.count || 0;

        res.json({ page, total });
      })
      .catch(next);
  }
);

router.post(
  '/batch',
  authenticatedMiddleware(),
  validationMiddleware(postBatchSchema),
  authenticatedMiddleware(false),
  async (req, res, next) => {
    const { operation, ids } = req.body;

    switch (operation) {
      case 'delete':
        req.collection
          .deleteMany({
            _id: { $in: ids }
          })
          .then((ack) => res.json(ack))
          .catch(next);
        break;

      default:
        return next(new Error('Operation validated by YUP was missed'));
    }
  }
);

export default router;
