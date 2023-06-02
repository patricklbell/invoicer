import { ObjectId } from 'mongodb';
import yup from 'yup';

export const objectId = () =>
  yup
    .mixed()
    .test(
      'is-objectid',
      '${path} is not a valid ObjectId',
      (value) => value === undefined || ObjectId.isValid(value)
    )
    .transform((value) => new ObjectId(value));

yup.addMethod(
  yup.Schema,
  'orAlternatives',
  function orAlternatives(alternatives, errorMessage) {
    return this.test('or-alternatives', (value, ctx) => {
      const { path, parent, createError } = ctx;

      const dependsExist = alternatives.find((key) => parent?.[key]);

      if (!dependsExist && value == null)
        return createError({ path, message: errorMessage });
      return true;
    });
  }
);

export const shapeRequireAllFields = (shape) =>
  Object.keys(shape).reduce((reqShape, key) => {
    reqShape[key] = shape[key].required();
    return reqShape;
  }, {});
