import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '#root/app.js';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Test /ping', () => {
  describe('/GET ping', () => {
    it('it should have status 200', (done) => {
      chai
        .request(app)
        .get('/api/v1/ping')
        .send()
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
