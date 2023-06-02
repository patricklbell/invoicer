import { getConnection } from '#utils/db.js';

export const dbCollectionMiddleware = (name) => {
  return async (req, res, next) => {
    getConnection()
      .then((db) => {
        req.collection = db.collection(name);
        next();
      })
      .catch(next);
  };
};
