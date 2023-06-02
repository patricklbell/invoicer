export const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    schema
      .validate({
        body: req.body,
        query: req.query,
        params: req.params
      })
      .then((parse) => {
        req.body = parse.body;
        req.query = parse.query;
        req.params = parse.params;
        next();
      })
      .catch((err) => {
        err.status = 400;
        next(err);
      });
  };
};
