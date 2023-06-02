import { array, boolean, number, object, string } from 'yup';
import { objectId } from '#utils/yup-extra.js';
import { requireIdSchema } from './common.js';

const contentsShape = {
  contentsXml: string(),
  contentsJson: string()
};

const requireContentsShape = {
  contentsXml: string().orAlternatives(['contentsJson']),
  contentsJson: string().orAlternatives(['contentsXml'])
};

const detailsShape = {
  documentTitle: string(),
  totalInvoiceValue: number(),
  supplierName: string(),
  supplierEmail: string().email(),
  recipientName: string(),
  recipientEmail: string().email()
};

const requireDetailsShape = {
  documentTitle: string().min(1).required('An invoice needs to have a title'),
  totalInvoiceValue: number().required(
    'An invoice needs to have a monetary value'
  ),
  supplierName: string().required('An invoice needs to name a supplier'),
  supplierEmail: string().email(),
  recipientName: string().required('An invoice needs to name a recipient'),
  recipientEmail: string().email()
};

// -------------------------------------

export const getSchema = object({ params: requireIdSchema });

export const postSchema = object({
  body: object({
    ...requireContentsShape,
    ...requireDetailsShape
  }).noUnknown()
});

export const patchSchema = object({
  body: object({
    ...contentsShape,
    ...detailsShape
  }).noUnknown(),
  params: requireIdSchema
});

export const postPermissionsSchema = object({
  body: object({
    ids: array().of(objectId()).required(),
    view: boolean().required(),
    edit: boolean().required()
  }).noUnknown(),
  params: requireIdSchema
});

export const deleteSchema = object({ params: requireIdSchema });

export const getViewSchema = object({ params: requireIdSchema });

export const postViewSchema = object({ body: object(requireContentsShape) });

export const postSendSchema = object({
  body: object({
    recipients: array().of(string().email()).min(1).required()
  }),
  params: requireIdSchema
});
