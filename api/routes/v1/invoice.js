import express from 'express';
const xmlParser = new XMLParser({ ignoreAttributes: false });
const xmlBuilder = new XMLBuilder({ ignoreAttributes: false });
import { ObjectId } from 'mongodb';

import { dbCollectionMiddleware } from '#middlewares/db-collection.js';
import { validationMiddleware } from '#middlewares/validation.js';
import { authenticatedMiddleware } from '#middlewares/auth.js';
import { union, difference } from '#utils/sets.js';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { getMailer } from '#utils/mailer.js';
import env from '#utils/env.js';
import {
  deleteSchema,
  getSchema,
  getViewSchema,
  patchSchema,
  postPermissionsSchema,
  postSchema,
  postSendSchema,
  postViewSchema
} from '../schemas/invoice.js';

const router = express.Router();

// All /invoice routes use invoice collection, change this if they don't anymore!
router.use(dbCollectionMiddleware('invoices'));

router.get(
  '/:id',
  authenticatedMiddleware(),
  validationMiddleware(getSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    req.collection
      .findOne({ _id: id, viewIds: userId })
      .then((data) => {
        if (data === null) {
          res.status(404).json({ found: false });
        } else {
          res.json({ invoice: data, found: true });
        }
      })
      .catch(next);
  }
);

router.post(
  '/',
  authenticatedMiddleware(),
  validationMiddleware(postSchema),
  async (req, res, next) => {
    const id = req.user.id;
    const invoice = req.body;

    try {
      if (!invoice?.contentsJson) {
        invoice.contentsJson = JSON.stringify(
          xmlParser.parse(invoice.contentsXml)
        );
      }
      if (!invoice?.contentsXml) {
        invoice.contentsXml = xmlBuilder.build(invoice.contentsJson);
      }
    } catch (err) {
      return next(err);
    }

    invoice.creationTime = new Date();
    invoice.creatorId = id;
    invoice.viewIds = [id];
    invoice.editIds = [id];

    req.collection
      .insertOne(invoice)
      .then((ack) => res.status(200).json(ack))
      .catch(next);
  }
);

router.patch(
  '/:id',
  authenticatedMiddleware(),
  validationMiddleware(patchSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user.id;

    try {
      if (updates?.contentsXml && !updates?.contentsJson) {
        updates.contentsJson = JSON.stringify(
          xmlParser.parse(updates.contentsXml)
        );
      }
      if (updates?.contentsJson && !updates?.contentsXml) {
        updates.contentsXml = xmlBuilder.build(updates.contentsJson);
      }
    } catch (err) {
      return next(err);
    }

    req.collection
      .updateOne({ _id: id, editIds: userId }, { $set: updates })
      .then((ack) => {
        if (ack?.matchedCount === 0) {
          res.status(404);
        }

        res.json(ack);
      })
      .catch(next);
  }
);

router.delete(
  '/:id',
  authenticatedMiddleware(),
  validationMiddleware(deleteSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    req.collection
      .deleteOne({ _id: id, editIds: userId })
      .then((ack) => {
        if (ack?.deletedCount === 0) {
          res.status(404);
        }

        res.json(ack);
      })
      .catch(next);
  }
);

router.post(
  '/permissions/:id',
  authenticatedMiddleware(),
  validationMiddleware(postPermissionsSchema),
  async (req, res, next) => {
    const { ids, view, edit } = req.body;
    const { id } = req.params;
    const userId = req.user.id;
    const idsSet = new Set(ids.map((i) => i.toHexString()));

    // @todo one request to mongodb with pipeline, may not be possible
    req.collection
      .findOne({ _id: id, viewIds: userId, editIds: userId })
      .then((data) => {
        if (data === null) {
          return res.status(404).json({ found: false });
        }
        if (idsSet.has(data?.creatorId.toHexString())) {
          return res.status(400).json({
            found: true,
            message: 'Not allowed to modify permissions of creator'
          });
        }

        let editIdsSet = new Set(data?.editIds.map((i) => i.toHexString()));
        let viewIdsSet = new Set(data?.viewIds.map((i) => i.toHexString()));
        editIdsSet = edit
          ? union(editIdsSet, idsSet)
          : difference(editIdsSet, idsSet);
        viewIdsSet = view
          ? union(viewIdsSet, idsSet)
          : difference(viewIdsSet, idsSet);
        viewIdsSet = union(viewIdsSet, editIdsSet); // Everyone who can edit can also view

        const editIds = [...editIdsSet].map((i) => new ObjectId(i));
        const viewIds = [...viewIdsSet].map((i) => new ObjectId(i));

        req.collection
          .updateOne(
            { _id: id, editIds: userId },
            { $set: { editIds, viewIds } }
          )
          .then((ack) => {
            if (ack?.matchedCount === 0) {
              res.status(404);
            }

            res.json(ack);
          });
      })
      .catch(next);
  }
);

router.get(
  '/view/:id',
  authenticatedMiddleware(),
  validationMiddleware(getViewSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    req.collection
      .findOne({ _id: id, viewIds: userId })
      .then((data) => {
        if (data === null) return res.status(404).json({ found: false });

        return res.render(
          'invoice',
          { ...JSON.parse(data?.contentsJson) },
          (err, html) => {
            if (err) return next(err);

            res.json({ found: true, html });
          }
        );
      })
      .catch(next);
  }
);

router.post(
  '/view',
  validationMiddleware(postViewSchema),
  async (req, res, next) => {
    const { contentsJson, contentsXml } = req.body;
    const contents = !contentsJson
      ? xmlParser.parse(contentsXml)
      : JSON.parse(contentsJson);

    return res.render('invoice', { ...contents }, (err, html) => {
      if (err) return next(err);

      res.json({ found: true, html });
    });
  }
);

router.post(
  '/send/:id',
  authenticatedMiddleware(),
  validationMiddleware(postSendSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const { recipients } = req.body;
    const userId = req.user.id;

    req.collection
      .findOne({ _id: id, viewIds: userId })
      .then((data) => {
        if (data === null)
          return res
            .status(404)
            .json({ sent: false, message: 'No matching invoice found' });

        res.render('invoice', { ...data?.contentsJson }, (err, html) => {
          if (err) return next(err);

          getMailer()
            .send({
              to: recipients,
              from: env.SENDGRID_SENDER,
              subject: `Invoice ${data?.documentTitle}: ${data?.supplierName}`,
              text: data?.contentsXml,
              html
            })
            .then(() => res.json({ sent: true }))
            .catch(next);
        });
      })
      .catch(next);
  }
);

export default router;
