export const deprecatedMiddleware = (deprecated, sunset, message) => {
  return async (req, res, next) => {
    res.header({
      Deprecation: deprecated,
      Sunset: sunset,
      Message: message
    });
    next();
  };
};
