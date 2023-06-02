import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '#root/app.js';
import chaiShallowDeepEqual from 'chai-shallow-deep-equal';

chai.use(chaiHttp);
chai.use(chaiShallowDeepEqual);

const expect = chai.expect;
const request = chai.request;

describe('Test invalid route', () => {
  it('it should 404 for invalid route', (done) => {
    request(app)
      .post('/api/v1/invalid')
      .set('content-type', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
