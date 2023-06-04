import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import classnames from 'classnames';

import InputText from 'components/input-text';
import PrimaryButton from 'components/primary-button';
import Card from 'components/card';
import AnimatedSvg from 'components/animated-svg';
import { ReactComponent as HomepageIcon } from 'assets/homepage.svg';

import { login } from 'utils/api/user';
import useUser from 'hooks/use-user';
import useBackpath from 'src/hooks/use-backpath';
import { Formik } from 'formik';
import ErrorTooltip from 'src/components/error-tooltip';

const Login = () => {
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
        <Card className="w-[100vw] md:w-[35rem] border-none md:border shadow-none md:shadow-md z-10">
          <div className="sm:p-20 flex flex-col">
            <div className="font-bold text-center text-4xl mb-10">Invoicer</div>

            <Formik
              enableReinitialize={false}
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={{ username: '', password: '' }}
              validationSchema={yup.object({
                username: yup.string().required('Missing a username'),
                password: yup.string().required('Missing your password')
              })}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                login(values?.username, values?.password)
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
                  <ErrorTooltip
                    error={errors?.username}
                    show={isSubmitting || touched?.username}
                    className="mb-12"
                    tooltipClassName="min-w-[15rem]"
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
                    error={errors?.password}
                    show={isSubmitting || touched?.password}
                    className="mb-12"
                    tooltipClassName="min-w-[15rem]"
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
                    error={errors?.unknown}
                    show={true}
                    tooltipClassName="text-warn-100 mt-12 min-w-[15rem]"
                  >
                    <PrimaryButton
                      className={classnames('text-lg w-full', {
                        'mt-14': errors?.unknown
                      })}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </PrimaryButton>
                  </ErrorTooltip>

                  <p className="mt-5 mb-0 text-md text-foreground-100">
                    Don&apos;t have an account?
                    <Link
                      to="/signup"
                      rel="noopener noreferrer"
                      className="inline pl-2 font-semibold text-warn-100 transition duration-150 ease-in-out hover:text-warn"
                    >
                      Sign Up
                    </Link>{' '}
                    or{' '}
                    <span
                      className="inline font-semibold text-warn-100 transition duration-150 ease-in-out hover:text-warn hover:cursor-pointer"
                      onClick={() => {
                        login('johndoe', 'password').then(() => mutate());
                      }}
                    >
                      Use Demo
                    </span>
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
        className="motion-reduce:invisible hidden md:block stroke-secondary opacity-60 dark:opacity-20 stroke-[1px] scale-x-[-1] absolute pointer-events-none top-[10%] -left-14 w-[175%] h-80 md:h-128 lg:top-auto lg:left-auto lg:right-0 lg:bottom-2 lg:w-full lg:h-[75%] lg:max-h-[720px]"
      />
    </>
  );
};

export default Login;
