import { object } from 'yup';
import { searchQuerySchema } from './common.js';

// -------------------------------------

export const getSearchSchema = object({
  query: searchQuerySchema
});
