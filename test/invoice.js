import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '#root/app.js';
import { makeUser } from './setup-teardown.js';
import chaiShallowDeepEqual from 'chai-shallow-deep-equal';

chai.use(chaiHttp);
chai.use(chaiShallowDeepEqual);

const expect = chai.expect;
const request = chai.request;

describe('Test /invoice', () => {
  let user = {};
  before((done) => {
    makeUser('invoiceuser', (res) => {
      user = res;
      done();
    });
  });

  let insertedId;
  describe('POST /', () => {
    it('it should fail for missing parameters', (done) => {
      request(app)
        .post('/api/v1/invoice')
        .set({ Authorization: `Bearer ${user.token}` })
        .set('content-type', 'application/json')
        .send({ contentsXml: '<title>Test</title>' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
    it('it should succeed for valid parameters', (done) => {
      request(app)
        .post('/api/v1/invoice')
        .set({ Authorization: `Bearer ${user.token}` })
        .set('content-type', 'application/json')
        .send({
          contentsXml: '<title>Test</title>',
          documentTitle: 'Test',
          totalInvoiceValue: 10,
          supplierName: 'Business 1',
          recipientName: 'Business 2'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('insertedId');
          insertedId = res.body.insertedId;
          done();
        });
    });
  });

  describe('GET /:id', () => {
    it('it should fail for invalid ids', (done) => {
      request(app)
        .get('/api/v1/invoice/invalidId')
        .set({ Authorization: `Bearer ${user.token}` })
        .send()
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should succeed for valid ids', (done) => {
      request(app)
        .get('/api/v1/invoice/' + insertedId)
        .set({ Authorization: `Bearer ${user.token}` })
        .send()
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.shallowDeepEqual({
            found: true,
            invoice: {
              _id: insertedId,
              contentsXml: '<title>Test</title>',
              documentTitle: 'Test',
              totalInvoiceValue: 10,
              supplierName: 'Business 1',
              recipientName: 'Business 2',
              contentsJson: '{"title":"Test"}',
              creatorId: user.id,
              viewIds: [user.id],
              editIds: [user.id]
            }
          });
          done();
        });
    });

    it('it should fail when unauthorized', (done) => {
      request(app)
        .get('/api/v1/invoice/' + insertedId)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('PATCH /:id', () => {
    it('it should fail for invalid ids', (done) => {
      request(app)
        .patch('/api/v1/invoice/invalidId')
        .set({ Authorization: `Bearer ${user.token}` })
        .send()
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should succeed for valid ids', () => {
      return request(app)
        .patch('/api/v1/invoice/' + insertedId)
        .set({ Authorization: `Bearer ${user.token}` })
        .set('content-type', 'application/json')
        .send({
          documentTitle: 'Test Title'
        })
        .then((res) => {
          expect(res).to.have.status(200);
          return chai
            .request(app)
            .get('/api/v1/invoice/' + insertedId)
            .set({ Authorization: `Bearer ${user.token}` })
            .send()
            .then((res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.shallowDeepEqual({
                invoice: {
                  documentTitle: 'Test Title'
                }
              });
            });
        });
    });
  });

  describe('POST /permissions/:id', () => {
    let user2;
    before((done) => {
      makeUser('invoiceuser2', (res) => {
        user2 = res;
        done();
      });
    });

    it('it should fail for invalid ids', (done) => {
      request(app)
        .post('/api/v1/invoice/permissions/invalidId')
        .set({ Authorization: `Bearer ${user.token}` })
        .send({
          view: true,
          edit: true,
          ids: []
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should fail when unauthorized', (done) => {
      request(app)
        .post('/api/v1/invoice/permissions/' + insertedId)
        .send({
          view: true,
          edit: true,
          ids: []
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should fail when creatorId is included', (done) => {
      request(app)
        .post('/api/v1/invoice/permissions/' + insertedId)
        .set({ Authorization: `Bearer ${user.token}` })
        .send({
          view: true,
          edit: true,
          ids: [user.id]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should fail when authorizer does not have view permissions', (done) => {
      request(app)
        .post('/api/v1/invoice/permissions/' + insertedId)
        .set({ Authorization: `Bearer ${user2.token}` })
        .send({
          view: true,
          edit: true,
          ids: [user2.id]
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('it should succeed for valid ids', (done) => {
      request(app)
        .post('/api/v1/invoice/permissions/' + insertedId)
        .set({ Authorization: `Bearer ${user.token}` })
        .send({
          view: false,
          edit: true,
          ids: [user2.id]
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.shallowDeepEqual({
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1
          });

          request(app)
            .get('/api/v1/invoice/' + insertedId)
            .set({ Authorization: `Bearer ${user.token}` })
            .send()
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body).to.shallowDeepEqual({
                invoice: {
                  creatorId: user.id,
                  viewIds: [user.id, user2.id],
                  editIds: [user.id, user2.id]
                }
              });
              done();
            });
        });
    });
  });

  describe('DELETE /:id', () => {
    it('it should succeed for valid ids', () => {
      return request(app)
        .del('/api/v1/invoice/' + insertedId)
        .set({ Authorization: `Bearer ${user.token}` })
        .send()
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.shallowDeepEqual({
            acknowledged: true,
            deletedCount: 1
          });

          return chai
            .request(app)
            .get('/api/v1/invoice/' + insertedId)
            .set({ Authorization: `Bearer ${user.token}` })
            .send()
            .then((res) => {
              expect(res).to.have.status(404);
            });
        });
    });
  });
});
