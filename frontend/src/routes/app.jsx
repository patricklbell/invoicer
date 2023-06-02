import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';

import Avatar from 'components/avatar';
import Profile from 'components/profile';
import SearchBar from 'components/search-bar';
import Card from 'components/card';

import { ReactComponent as LogoIcon } from 'assets/logo.svg';

import useUser from 'hooks/use-user';

const App = (props) => {
  const nav = useNavigate();
  const loc = useLocation();
  const { isLoading, loggedOut, user } = useUser();

  useEffect(() => {
    if (!isLoading && loggedOut) {
      nav('/login', { state: { from: loc } });
    }
  }, [isLoading, loggedOut]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex relative bg-background md:shadow-md shadow-neutral dark:border-b border-neutral items-center">
        <Link to="/" className="absolute left-5 ">
          <LogoIcon className="hover:fill-primary-100 hover:cursor-pointer" />
        </Link>
        <div className="flex-auto flex justify-start items-center py-6">
          <SearchBar />
        </div>
        {!loggedOut && (
          <Popover className="flex justify-end align-middle items-center relative">
            <Popover.Button className="relative focus:outline-none focus:ring-0 lg:absolute">
              <div className="flex justify-end items-center h-full">
                <div className="mr-10">
                  <Avatar
                    show={!isLoading && !loggedOut}
                    className="hover:cursor-pointer text-[1.3rem] transition-all outline-none hover:outline-4 "
                    name={`${user?.firstname} ${user?.lastname}`}
                  />
                </div>
              </div>
            </Popover.Button>

            <Transition
              className="z-20"
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel>
                <div className="absolute right-0 top-20 md:mr-10 sm:max-w-[100vw]">
                  <Card>
                    <Profile />
                  </Card>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        )}
      </header>
      <div className="bg-background-50 py-5 flex-1">
        {props.children}
        <Outlet />
      </div>
    </div>
  );
};

export default App;
