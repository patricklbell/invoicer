import async from 'async';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '#root/app.js';
import { getConnection } from '#utils/db.js';

chai.use(chaiHttp);
const request = chai.request;

export const makeUser = (username, done) => {
  let id, token;
  async.series(
    [
      (cb) => {
        request(app)
          .post('/api/v1/user/signup')
          .set('content-type', 'application/json')
          .send({
            username,
            password: 'validPassword123',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@email.com'
          })
          .then((res) => {
            id = res.body.user._id;
            cb();
          });
      },
      (cb) => {
        request(app)
          .post('/api/v1/user/login')
          .set('content-type', 'application/json')
          .send({
            username,
            password: 'validPassword123'
          })
          .then((res) => {
            token = res.body.token;
            cb();
          });
      }
    ],
    (err) => done({ id, token, username })
  );
};

before(async () => {
  return getConnection()
    .then((db) =>
      db
        .collection('invoices')
        .drop()
        .then((ack) => db.collection('users').drop())
    )
    .catch((err) =>
      console.log('Test database does not exist, skipping deletion')
    );
});

after(async () => {
  return getConnection()
    .then((db) =>
      db
        .collection('invoices')
        .drop()
        .then((ack) => db.collection('users').drop())
    )
    .catch((err) => console.error('Error clearing test database', err));
});
