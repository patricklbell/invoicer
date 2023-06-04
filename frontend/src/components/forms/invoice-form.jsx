import React, { useEffect } from 'react';
import classnames from 'classnames';
import { Formik } from 'formik';
import * as yup from 'yup';

import PrimaryButton from 'components/primary-button';
import InputText from 'components/input-text';
import InputCheck from 'components/input-check';
import InputDate from 'components/input-date';
import ErrorTooltip from 'components/error-tooltip';
import ItemsForm from 'components/forms/items-form';
import AddressForm from 'components/forms/address-form';
import { ReactComponent as EastIcon } from 'assets/east.svg';

import { create, send, update } from 'utils/api/invoice';
import { createPeppolXML } from 'utils/peppol';

const InvoiceForm = ({
  data,
  className,
  beforeSubmit = () => {},
  afterSubmit = () => {},
  setData,
  creating = true,
  id
}) => {
  return (
    <Formik
      className={classnames('', {
        [className]: className
      })}
      enableReinitialize={false}
      validateOnChange={false}
      validateOnBlur={true}
      initialValues={data}
      validationSchema={yup.object({
        documentTitle: yup.string().required('A title is required'),
        reference: yup
          .number()
          .integer()
          .required('A reference number is required'),
        supplierName: yup.string().required('A supplier must be named'),
        supplierEmail: yup.string().email('Must be a valid email'),
        recipientName: yup.string().required('A recipient must be named'),
        recipientEmail: yup.string().email('Must be a valid email'),
        items: yup
          .array()
          .of(yup.mixed())
          .min(1, 'At least one item must be listed')
          .required('At least one item must be listed')
      })}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        const totalInvoiceValue =
          values?.items.reduce(
            (sum, item) => sum + parseFloat(item?.amount),
            0
          ) || 0;

        beforeSubmit();
        return (
          creating
            ? create({
                ...values,
                totalInvoiceValue,
                contentsXml: createPeppolXML(values)
              })
            : update(id, {
                ...values,
                totalInvoiceValue,
                contentsXml: createPeppolXML(values)
              })
        )
          .then((res) => {
            if (values?.emailRecipient) {
              return send(res?.insertedId, [values?.recipientEmail]);
            }
          })
          .then(afterSubmit)
          .catch((err) => setErrors({ unknown: err?.response?.data?.message }))
          .finally(() => setSubmitting(false));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting
      }) => {
        useEffect(() => {
          setData(values);
        }, [values]);

        return (
          <form onSubmit={handleSubmit} className="flex flex-col h-full py-5">
            <div className="flex flex-row gap-x-4">
              <ErrorTooltip
                error={errors?.documentTitle}
                show={isSubmitting || touched?.documentTitle}
                className="w-2/3"
              >
                <InputText
                  type="text"
                  name="documentTitle"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.documentTitle}
                  placeholder="Title"
                />
              </ErrorTooltip>
              <ErrorTooltip
                error={errors?.reference}
                show={isSubmitting || touched?.reference}
              >
                <InputText
                  type="number"
                  name="reference"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.reference}
                  placeholder="Reference #"
                />
              </ErrorTooltip>

              <InputDate
                setValue={(v) => setFieldValue('issueDate', v)}
                value={values?.issueDate}
                placeholder="Due Date"
              />
            </div>

            <div className="w-full flex mt-8 flex-row mx-auto">
              <div className="flex flex-col w-2/5 gap-4">
                <span className="block w-full text-center text-foreground/50">
                  Supplier
                </span>

                <ErrorTooltip
                  error={errors?.supplierName}
                  show={isSubmitting || touched?.supplierName}
                >
                  <InputText
                    type="text"
                    name="supplierName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.supplierName}
                    placeholder="Name"
                  />
                </ErrorTooltip>

                <ErrorTooltip
                  error={errors?.supplierEmail}
                  show={isSubmitting || touched?.supplierEmail}
                >
                  <InputText
                    type="text"
                    name="supplierEmail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.supplierEmail}
                    placeholder="Email"
                    formnovalidate="formnovalidate"
                  />
                </ErrorTooltip>
              </div>

              <div className="w-1/5" />

              <div className="flex flex-col w-2/5 gap-4">
                <span className="block w-full text-center text-foreground/50">
                  Recipient
                </span>

                <ErrorTooltip
                  error={errors?.recipientName}
                  show={isSubmitting || touched?.recipientName}
                >
                  <InputText
                    type="text"
                    name="recipientName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.recipientName}
                    placeholder="Name"
                  />
                </ErrorTooltip>

                <ErrorTooltip
                  error={errors?.recipientEmail}
                  show={isSubmitting || touched?.recipientEmail}
                >
                  <InputText
                    type="text"
                    name="recipientEmail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.recipientEmail}
                    placeholder="Email"
                    formnovalidate="formnovalidate"
                  />
                </ErrorTooltip>

                <div
                  className={classnames(
                    'flex flex-row mx-auto my-1 gap-3 items-center',
                    {
                      'text-foreground': values?.emailRecipient,
                      'text-foreground-100': !values?.emailRecipient,
                      invisible: !values?.recipientEmail
                    }
                  )}
                >
                  {creating ? 'Email recipient?' : 'Email recipient updates?'}
                  <InputCheck
                    value={values?.emailRecipient}
                    setValue={(v) => setFieldValue('emailRecipient', v)}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex mb-12 flex-row mx-auto">
              <div className="flex flex-col w-2/5 gap-4">
                <ErrorTooltip
                  error={errors?.supplierAddress}
                  show={isSubmitting || touched?.supplierAddress}
                >
                  <AddressForm
                    title="Supplier Address"
                    className="border-dashed mt-5"
                    setAddress={(v) => setFieldValue('supplierAddress', v)}
                    address={values?.supplierAddress}
                  />
                </ErrorTooltip>
              </div>

              <div className="text-xl px-5 flex flex-grow items-center">
                <EastIcon className="h-[1.5rem] m-auto stroke-foreground-100"></EastIcon>
              </div>

              <div className="flex flex-col w-2/5 gap-4">
                <ErrorTooltip
                  error={errors?.recipientAddress}
                  show={isSubmitting || touched?.recipientAddress}
                >
                  <AddressForm
                    title="Recipient Address"
                    className="border-dashed mt-5"
                    setAddress={(v) => setFieldValue('recipientAddress', v)}
                    address={values?.recipientAddress}
                  />
                </ErrorTooltip>
              </div>
            </div>

            <ErrorTooltip
              error={errors?.items}
              show={
                errors?.items !== undefined && (isSubmitting || touched?.items)
              }
            >
              <ItemsForm
                items={data?.items}
                setItems={(v) => setFieldValue('items', v)}
              />
            </ErrorTooltip>

            <ErrorTooltip
              error={errors?.unknown}
              show={true}
              className="justify-end mt-auto pt-2"
            >
              <PrimaryButton
                className="text-lg min-w-[10rem] mx-auto"
                type="submit"
                disabled={isSubmitting}
              >
                {creating ? 'Add Invoice' : 'Save'}
              </PrimaryButton>
            </ErrorTooltip>
          </form>
        );
      }}
    </Formik>
  );
};

export default InvoiceForm;
