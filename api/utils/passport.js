import passport from 'passport';
import crypto from 'crypto';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';
import { env } from 'process';
import { ObjectId } from 'mongodb';
import { getConnection } from '#utils/db.js';

// Authenticate token based requests
passport.use(
  new JwtStrategy(
    {
      secretOrKey: env.JWT_SECRET,
      // @todo cookies see https://www.passportjs.org/packages/passport-jwt/
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromHeader('token')
      ])
    },
    async (token, done) => {
      try {
        return done(null, {
          username: token.user.username,
          id: new ObjectId(token.user.id)
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Passthrough, for routes that want optional authentication
passport.use(new AnonymousStrategy());

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const { firstname, lastname, email } = req.body;

      // make sure users with the same password have different hashes
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, hash) => {
        if (err) {
          return done(err);
        }

        const creationDate = new Date();
        const user = {
          username,
          firstname,
          lastname,
          email,
          hash,
          salt,
          creationDate
        };

        getConnection()
          .then((db) => db.collection('users').insertOne(user))
          .then((ack) => {
            done(null, { username, _id: ack.insertedId });
          })
          .catch((err) => {
            if (err?.code === 11000) {
              err.message = `The username ${username} is already taken`;
            }
            done(err);
          });
      });
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      getConnection()
        .then((db) => db.collection('users').findOne({ username }))
        .then((user) => {
          if (user === null) {
            return done(null, false, {
              message: 'Incorrect username or password.'
            });
          }

          // Checks if password is valid
          crypto.pbkdf2(
            password,
            user.salt.buffer,
            310000,
            32,
            'sha256',
            (err, hash) => {
              if (err) {
                return done(err);
              }

              if (!crypto.timingSafeEqual(user.hash.buffer, hash)) {
                return done(null, false, {
                  message: 'Incorrect username or password.'
                });
              }

              done(null, user);
            }
          );
        })
        .catch(done);
    }
  )
);

export default passport;
