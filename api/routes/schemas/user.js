import { boolean, object, string } from 'yup';
import { idSchema } from './common.js';

const passwordRequiredShape = {
  password: string().required('A password is required')
};

const usernameShape = {
  username: string()
};

const usernameRequiredShape = {
  username: string().required('A username is required')
};

const detailsShape = {
  firstname: string(),
  lastname: string(),
  email: string().email()
};

const detailsRequiredShape = {
  firstname: string().required('A user needs a firstname'),
  lastname: string().required('A user needs a surname'),
  email: string().email().required('A user needs an email')
};

// -------------------------------------

export const postLoginSchema = object({
  body: object({
    ...usernameRequiredShape,
    ...passwordRequiredShape,
    api: boolean()
  })
});

export const postSignupSchema = object({
  body: object({
    ...usernameRequiredShape,
    ...passwordRequiredShape,
    ...detailsRequiredShape
  })
});

export const deleteSchema = object({
  params: idSchema
});

export const getSchema = object({
  params: idSchema
});

export const patchSchema = object({
  body: object({
    ...usernameShape,
    ...detailsShape
  }).noUnknown(),
  params: idSchema
});
