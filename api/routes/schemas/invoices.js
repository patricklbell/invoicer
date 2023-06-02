import { array, object, string } from 'yup';
import { objectId } from '#utils/yup-extra.js';
import { paginatedShape, searchQuerySchema } from './common.js';

// -------------------------------------

export const getSearchSchema = object({
  query: searchQuerySchema
});

export const getFeedSchema = object({
  query: object(paginatedShape)
});

export const postBatchSchema = object({
  body: object({
    operation: string().oneOf(['delete']).required(),
    ids: array().of(objectId()).required()
  })
});
