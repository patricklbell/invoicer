import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { Formik } from 'formik';

import Card from 'components/card';
import PrimaryButton from 'components/primary-button';
import InputText from 'components/input-text';
import ErrorTooltip from 'components/error-tooltip';
import GoBack from 'components/go-back';

import useUser from 'hooks/use-user';
import useBackpath from 'hooks/use-backpath';
import { update } from 'utils/api/user';
import toTitleCase from 'utils/to-title-case';

const SettingsPage = ({ title, schema, properties, names }) => {
  const nav = useNavigate();
  const { user } = useUser();
  const backpath = useBackpath();

  const pick = (a = { ...properties }) => a;

  return (
    <div className="lg:w-full xl:w-1/2 sm:px-10 flex flex-col m-auto">
      <GoBack />
      <Card className="w-full pb-10 relative overflow-hidden">
        <div className="font-semibold text-center text-2xl pb-5">{title}</div>

        <Formik
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={pick(user)}
          validationSchema={schema(user)}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            update({ ...values })
              .then(() => nav(backpath))
              .catch((err) =>
                setErrors({ unknown: err?.response?.data?.message })
              )
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
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-grow flex-col">
              {properties.map((prop, i) => (
                <ErrorTooltip
                  error={errors?.[prop]}
                  show={isSubmitting || touched?.[prop]}
                  className="mb-12"
                  placement="right"
                  key={prop}
                >
                  <div className="flex flex-row w-full items-center px-10">
                    <span className="w-1/4 text-left">
                      {names?.[i] || toTitleCase(prop)}
                    </span>
                    <InputText
                      className="w-3/4"
                      type="text"
                      name={prop}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.[prop]}
                      placeholder={toTitleCase(prop)}
                    />
                  </div>
                </ErrorTooltip>
              ))}

              <ErrorTooltip
                error={errors?.unknown}
                show={true}
                tooltipClassName="text-red-600 mt-12"
              >
                <PrimaryButton
                  className={classnames('text-lg mx-auto', {
                    'mt-14': errors?.unknown
                  })}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Confirm
                </PrimaryButton>
              </ErrorTooltip>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SettingsPage;
