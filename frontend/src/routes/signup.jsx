import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import classnames from 'classnames';

import InputText from 'components/input-text';
import PrimaryButton from 'components/primary-button';
import Card from 'components/card';
import AnimatedSvg from 'components/animated-svg';
import { ReactComponent as HomepageIcon } from 'assets/homepage.svg';

import { login, signup } from 'utils/api/user';
import useUser from 'hooks/use-user';
import useBackpath from 'src/hooks/use-backpath';
import { Formik } from 'formik';
import ErrorTooltip from 'src/components/error-tooltip';

const Signup = () => {
  const nav = useNavigate();
  const { loggedOut, mutate, isLoading } = useUser();

  const backpath = useBackpath();

  useEffect(() => {
    if (!isLoading && !loggedOut) {
      nav(backpath === '/login' ? '/dashboard' : backpath);
    }
  }, [loggedOut]);

  return (
    <>
      <div className="flex items-center justify-center align-middle h-[100vh]">
        <Card className="w-[100vw] md:w-128 border-none md:border shadow-none md:shadow-md z-10">
          <div className="sm:p-20 flex flex-col">
            <div className="font-bold text-center text-4xl mb-10">Invoicer</div>

            <Formik
              enableReinitialize={false}
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={{
                username: '',
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                password2: ''
              }}
              validationSchema={yup.object({
                username: yup.string().required('Choose a username'),
                password: yup
                  .string()
                  .min(8, 'Must contain at least 8 characters')
                  .required('Choose a password'),
                password2: yup
                  .string()
                  .test(
                    'duplicate',
                    "Passwords don't match",
                    (value, ctx) => value === ctx?.parent?.password
                  )
                  .required('Please repeat password'),
                firstname: yup.string().required('Enter your given name'),
                lastname: yup
                  .string()
                  .required('Enter your surname or family name'),
                email: yup
                  .string()
                  .email('Must be a valid email')
                  .required('Please enter an email')
              })}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                signup(
                  values?.username,
                  values?.email,
                  values?.password,
                  values?.firstname,
                  values?.lastname
                )
                  .then(() => login(values?.username, values?.password))
                  .then(() => mutate())
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
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-grow flex-col"
                >
                  <div className="font-semibold text-center text-1xl mb-2">
                    Account
                  </div>
                  <ErrorTooltip
                    tooltipClassName="min-w-[15rem]"
                    error={errors?.username}
                    show={isSubmitting || touched?.username}
                    className="mb-12"
                    placement="right"
                  >
                    <InputText
                      type="text"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.username}
                      placeholder="Username"
                    />
                  </ErrorTooltip>

                  <ErrorTooltip
                    tooltipClassName="min-w-[15rem]"
                    error={errors?.password}
                    show={isSubmitting || touched?.password}
                    className="mb-6"
                    placement="right"
                  >
                    <InputText
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.password}
                      placeholder="Password"
                    />
                  </ErrorTooltip>

                  <ErrorTooltip
                    tooltipClassName="min-w-[15rem]"
                    error={errors?.password2}
                    show={isSubmitting || touched?.password2}
                    className="mb-12"
                    placement="right"
                  >
                    <InputText
                      type="password"
                      name="password2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.password2}
                      placeholder="Repeat password"
                    />
                  </ErrorTooltip>

                  <div className="font-semibold text-center text-1xl mb-2">
                    Details
                  </div>

                  <ErrorTooltip
                    tooltipClassName="min-w-[15rem]"
                    error={errors?.email}
                    show={isSubmitting || touched?.email}
                    className="mb-12"
                    placement="right"
                  >
                    <InputText
                      type="text"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.email}
                      placeholder="Email"
                    />
                  </ErrorTooltip>

                  <ErrorTooltip
                    tooltipClassName="min-w-[15rem]"
                    error={errors?.firstname}
                    show={isSubmitting || touched?.firstname}
                    className="mb-6"
                    placement="right"
                  >
                    <InputText
                      type="text"
                      name="firstname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.firstname}
                      placeholder="Firstname"
                    />
                  </ErrorTooltip>

                  <ErrorTooltip
                    error={errors?.lastname}
                    show={isSubmitting || touched?.lastname}
                    className="mb-12"
                    tooltipClassName="min-w-[15rem]"
                    placement="right"
                  >
                    <InputText
                      type="text"
                      name="lastname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.lastname}
                      placeholder="Surname"
                    />
                  </ErrorTooltip>

                  <ErrorTooltip
                    tooltipClassName="text-warn mt-12 min-w-[15rem]"
                    error={errors?.unknown}
                    show={true}
                  >
                    <PrimaryButton
                      className={classnames('text-lg w-full', {
                        'mt-14': errors?.unknown
                      })}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </PrimaryButton>
                  </ErrorTooltip>

                  <p className="mt-5 mb-0 text-md text-foreground-1">
                    Already have an account?
                    <Link
                      to="/login"
                      rel="noopener noreferrer"
                      className="pl-4 font-semibold text-warn-100 transition duration-150 ease-in-out hover:text-warn"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              )}
            </Formik>
          </div>
        </Card>
      </div>
      <AnimatedSvg
        as={HomepageIcon}
        config={{
          start: 'autostart',
          type: 'sync',
          duration: 110,
          reverseStack: false
        }}
        className="motion-reduce:invisible hidden md:block stroke-primary-100 stroke-[0.5px] scale-y-[-1] absolute pointer-events-none top-[10%] -left-14 w-[175%] h-80 md:h-128 lg:top-auto lg:left-auto lg:right-0 lg:bottom-2 lg:w-full lg:h-[75%] lg:max-h-[720px]"
      />
    </>
  );
};

export default Signup;
