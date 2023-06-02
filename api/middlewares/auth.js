import passport from '#utils/passport.js';

export const authenticatedMiddleware = (allowAnonymous = false) => {
  return passport.authenticate(allowAnonymous ? ['jwt', 'anonymous'] : 'jwt', {
    session: false
  });
};
