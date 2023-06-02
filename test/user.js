import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '#root/app.js';
import { makeUser } from './setup-teardown.js';
import chaiShallowDeepEqual from 'chai-shallow-deep-equal';

chai.use(chaiHttp);
chai.use(chaiShallowDeepEqual);

const expect = chai.expect;
const request = chai.request;

describe('Test /user', () => {
  let user1, user2;
  before((done) => {
    makeUser('user1', (res) => {
      user1 = res;
      makeUser('user2', (res) => {
        user2 = res;
        done();
      });
    });
  });

  describe('GET /:id', () => {
    it('it should fail for invalid user id', (done) => {
      request(app)
        .get('/api/v1/user/invalidid')
        .set({ Authorization: `Bearer ${user1.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should reveal limited information for unauthenticated user', (done) => {
      request(app)
        .get(`/api/v1/user/${user1.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.shallowDeepEqual({
            user: { _id: user1.id, username: user1.username },
            found: true
          });
          done();
        });
    });

    it('it should reveal limited information for authenticated user != id', (done) => {
      request(app)
        .get(`/api/v1/user/${user1.id}`)
        .set({ Authorization: `Bearer ${user2.token}` })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.shallowDeepEqual({
            user: { _id: user1.id, username: user1.username },
            found: true
          });
          done();
        });
    });

    it('it should reveal more information for authenticated user == id', (done) => {
      request(app)
        .get(`/api/v1/user/${user1.id}`)
        .set({ Authorization: `Bearer ${user1.token}` })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.shallowDeepEqual({
            user: {
              _id: user1.id,
              username: user1.username,
              firstname: 'John',
              lastname: 'Doe',
              email: 'johndoe@email.com'
            },
            found: true
          });
          done();
        });
    });
  });
});
