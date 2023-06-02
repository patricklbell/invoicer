import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { useState } from 'react';

import PrimaryButton from 'components/primary-button';
import SecondaryButton from 'components/secondary-button';
import AnimatedSvg from 'components/animated-svg';

import { ReactComponent as LogoIcon } from 'assets/logo.svg';
import { ReactComponent as HomepageIcon } from 'assets/homepage.svg';
import { ReactComponent as ChevronRightIcon } from 'assets/chevron-right.svg';
import { ReactComponent as EastIcon } from 'assets/east.svg';

import useUser from 'hooks/use-user';
import { logout } from 'utils/api/user';

const Home = () => {
  const { loggedOut } = useUser();
  const [sectionInView, setSectionInView] = useState(null);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setSectionInView(e.target.id);
    }
  };

  const scrollToSection = (id) => {
    const section = document.querySelector('#' + id);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSectionInView(id);
  };

  return (
    <>
      <header className="sticky top-0 border-b-2 -mb-2 border-neutral z-[9999] bg-background">
        <div className="flex flex-row justify-between items-baseline py-2">
          <div className="flex flex-row justify-center items-center gap-5 px-5">
            <LogoIcon />
            <div className="hidden lg:inline-block font-bold text-3xl align-middle pl-0 pr-4">
              Invoicer
            </div>

            <Link
              className="hover:cursor-pointer"
              to="#overview"
              onClick={() => scrollToSection('overview')}
            >
              <div
                className={classnames(
                  'inline-block transition-colors duration-300 align-middle text-lg py-4 px-3 border-primary',
                  {
                    '-mb-[2px] border-b-2 text-foreground':
                      sectionInView === 'overview',
                    'text-foreground-100 hover:text-foreground':
                      sectionInView !== 'overview'
                  }
                )}
              >
                Overview
              </div>
            </Link>
            <Link
              className="hover:cursor-pointer"
              to="#features"
              onClick={() => scrollToSection('features')}
            >
              <div
                className={classnames(
                  'inline-block transition-colors duration-300 align-middle text-lg py-4 px-3 border-primary',
                  {
                    '-mb-[2px] border-b-2 text-foreground':
                      sectionInView === 'features',
                    'text-foreground-100 hover:text-foreground':
                      sectionInView !== 'features'
                  }
                )}
              >
                Features
              </div>
            </Link>
            <a className="hover:cursor-pointer" href="/docs/">
              <div
                className={classnames(
                  'inline-block transition-colors duration-300 align-middle text-lg py-4 px-3 border-primary text-foreground-100 hover:text-foreground'
                )}
              >
                Documentation
              </div>
            </a>
          </div>

          <div className="hidden md:flex flex-row gap-3 items-center pr-5 justify-center content-stretch">
            <Link
              onClick={() => {
                if (!loggedOut) logout();
              }}
              to={loggedOut ? '/signup' : '/login'}
              rel="noopener noreferrer"
            >
              <SecondaryButton>
                <span className="block text-lg text-center truncate min-w-[8rem] xl:min-w-[12rem]">
                  {loggedOut ? 'Sign Up' : 'Login'}
                </span>
              </SecondaryButton>
            </Link>
            <Link
              to={loggedOut ? '/login' : '/dashboard'}
              rel="noopener noreferrer"
            >
              <PrimaryButton>
                <span className="block text-lg text-center truncate min-w-[8rem] xl:min-w-[12rem]">
                  {loggedOut ? 'Login' : 'Go to Invoicer'}
                </span>
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-col overflow-x-hidden -mt-20">
        <section
          className="relative h-[100vh] w-full mx-auto flex flex-col justify-center"
          role="banner"
          onWheel={handleScroll}
          id="overview"
        >
          <div className="z-10 flex flex-col mx-auto lg:flex-row lg:justify-center px-10 gap-10 lg:gap-128 -mt-20">
            <span className="font-extrabold text-4xl xl:text-6xl ">
              INVOICER
            </span>
            <div className="flex flex-col gap-5 lg:gap-10">
              <span className="max-w-[20rem]">
                Invoicer is an invoice management platform. Store and send
                invoices from anywhere. Gain powerful accounting insights and
                increase efficiency.
              </span>
              <p>
                <a
                  className="group"
                  href={loggedOut ? '/signup' : '/dashboard'}
                >
                  <span className="text-xl text-primary mr-2 inline-block">
                    {loggedOut ? 'Join Invoicer' : 'Go to Invoicer'}
                  </span>
                  <EastIcon className="fill-primary stroke-primary inline-block max-h-[2rem] transition-all group-hover:pl-10" />
                </a>
              </p>
            </div>
          </div>

          <AnimatedSvg
            as={HomepageIcon}
            config={{
              start: 'autostart',
              type: 'sync',
              duration: 180,
              reverseStack: false
            }}
            className="absolute stroke-foreground-100 opacity-40 stroke-[2px] dark:stroke-[0.2px] mix-blend-difference 
                      top-40 left-0 w-[125%] h-80 md:h-128 lg:w-[105%] lg:h-[75%] lg:max-h-[720px]"
          />

          <div className="absolute transition-colors bottom-20 w-full z-10 text-foreground-100 fill-foreground-100 hover:text-foreground hover:fill-foreground">
            <Link to="#features" onClick={() => scrollToSection('features')}>
              <div className="text-center text-lg mb-2">Features</div>
              <div className="animate-bounce">
                <ChevronRightIcon className="mx-auto rotate-90" />
              </div>
            </Link>
          </div>
        </section>

        <section
          id="features"
          className="flex items-center min-h-[100vh]"
          onWheel={handleScroll}
        >
          <div className="container flex flex-col items-center justify-center mx-auto my-8">
            <div className="text-center">
              <h2 className="mb-8 font-extrabold text-6xl lg:text-8xl pb-10">
                Features
              </h2>
            </div>
            <ul className="list-disc text-md xl:text-lg">
              <li>Storage, transfer and editing of eInvoices</li>
              <li>AI powered searching and filtering</li>
              <li>
                Open API access with extensive{' '}
                <a href="/docs" className="text-primary-100 hover:text-primary">
                  documentation
                </a>
              </li>
            </ul>
          </div>
        </section>
        <footer className="py-2 w-full bottom-0 bg-background-1 bg-opacity-20 align-middle">
          <span className="text-center block text-foreground-100">
            © 2023, Patrick Bell
          </span>
        </footer>
      </div>
    </>
  );
};

export default Home;
