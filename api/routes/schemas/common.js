import { number, object, string } from 'yup';
import { objectId } from '#utils/yup-extra.js';

export const idSchema = object({
  id: objectId()
});

export const requireIdSchema = object({
  id: objectId().required()
});

export const paginatedShape = {
  page: number().min(0).default(0),
  offset: number().min(0).default(0),
  limit: number().positive().max(100).default(10)
};

export const searchQuerySchema = object({
  ...paginatedShape,
  query: string()
    .transform((val) => (val === '' ? '*' : val))
    .required('A search query is required')
});
