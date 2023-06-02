import express from 'express';

import { dbCollectionMiddleware } from '#middlewares/db-collection.js';
import { validationMiddleware } from '#middlewares/validation.js';
import { authenticatedMiddleware } from '#middlewares/auth.js';
import { getSearchSchema } from '../schemas/users.js';

const router = express.Router();

router.use(dbCollectionMiddleware('users'));

// @note can't tests this part because MongoDB has a limit of 3 search indexes for free accounts which are taken up by dev and prod
/* c8 ignore start */
router.get(
  '/search',
  authenticatedMiddleware(true), // @todo private users and contacts
  validationMiddleware(getSearchSchema),
  async (req, res, next) => {
    const { query, page, limit, offset } = req.query;

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
        { $project: { _id: 1, username: 1, firstname: 1, lastname: 1 } },
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
/* c8 ignore end */

export default router;
