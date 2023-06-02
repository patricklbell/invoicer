import chai from 'chai';
import chaiHttp from 'chai-http';
import async from 'async';
import app from '#root/app.js';
import { makeUser } from './setup-teardown.js';
import chaiShallowDeepEqual from 'chai-shallow-deep-equal';

chai.use(chaiHttp);
chai.use(chaiShallowDeepEqual);

const expect = chai.expect;
const request = chai.request;

describe('Test /invoices', () => {
  let user = {};
  before((done) => {
    makeUser('invoicesuser', (res) => {
      user = res;
      const addInvoice = async (title) => {
        await request(app)
          .post('/api/v1/invoice')
          .set({ Authorization: `Bearer ${user.token}` })
          .set('content-type', 'application/json')
          .send({
            contentsXml: `<title>${title}</title>`,
            documentTitle: title,
            totalInvoiceValue: 10,
            supplierName: 'X',
            recipientName: 'X'
          });
      };

      async
        .eachSeries(['invoiceA', 'b', 'c', 'd'], addInvoice)
        .then((res) => {
          done();
        })
        .catch(done);
    });
  });

  describe('GET /feed', () => {
    it('it should return paginated results', () => {
      return request(app)
        .get('/api/v1/invoices/feed?page=0&offset=0&limit=2')
        .set({ Authorization: `Bearer ${user.token}` })
        .set('content-type', 'application/json')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.shallowDeepEqual({
            page: [
              {
                documentTitle: 'invoiceA'
              },
              { documentTitle: 'b' }
            ],
            total: 4
          });

          return request(app)
            .get('/api/v1/invoices/feed?page=1&offset=0&limit=2')
            .set({ Authorization: `Bearer ${user.token}` })
            .set('content-type', 'application/json');
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.shallowDeepEqual({
            page: [
              {
                documentTitle: 'c'
              },
              { documentTitle: 'd' }
            ],
            total: 4
          });

          return request(app)
            .get('/api/v1/invoices/feed?page=0&offset=0&limit=5')
            .set({ Authorization: `Bearer ${user.token}` })
            .set('content-type', 'application/json');
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.shallowDeepEqual({
            page: [
              { documentTitle: 'invoiceA' },
              { documentTitle: 'b' },
              {
                documentTitle: 'c'
              },
              { documentTitle: 'd' }
            ],
            total: 4
          });
        });
    });
  });

  describe('GET /search', () => {
    it('handles unknown query', () => {
      return request(app)
        .get(
          `/api/v1/invoices/search?query=${'das91nkjhisay0912hioans'}&page=0&offset=0&limit=2`
        )
        .set({ Authorization: `Bearer ${user.token}` })
        .set('content-type', 'application/json')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.shallowDeepEqual({
            page: [],
            total: 0
          });
        });
    });
  });
});
