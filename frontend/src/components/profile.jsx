import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSWRConfig } from 'swr';
import { Popover } from '@headlessui/react';

import Avatar from 'components/avatar';
import PrimaryButton from 'components/primary-button';
import { ReactComponent as LogoutIcon } from 'assets/logout.svg';
import { ReactComponent as SettingsIcon } from 'assets/settings.svg';

import useUser from 'hooks/use-user';
import { logout } from 'utils/api/user';
import ToggleDark from './toggle-dark';
import makeLink from 'src/utils/make-link';

const Profile = () => {
  const nav = useNavigate();
  const loc = useLocation();

  const { mutate } = useSWRConfig();
  const onLogout = () => {
    logout();
    mutate(([url]) => url == '/user');
    nav('/');
  };
  const { user, loading } = useUser();

  return (
    <div className="block z-50 relative">
      <div className="flex justify-end items-center gap-4 absolute w-[100%]">
        <ToggleDark className="w-8 h-8" />
        <Link {...makeLink(loc, '/settings')} className="flex items-center">
          <Popover.Button>
            <SettingsIcon className="w-8 stroke-foreground-100 hover:animate-[spin_4s_linear_infinite] duration-700 hover:cursor-pointer" />
          </Popover.Button>
        </Link>
      </div>
      <div className="flex">
        <div className="flex items-center relative">
          <div className="flex items-center relative">
            <div className="absolute h-full w-full bg-background-100 animate-pulse scale-110 rounded-full" />
            <Avatar
              show={!loading}
              className="z-10 w-24 h-24 text-3xl"
              name={`${user?.firstname} ${user?.lastname}`}
            />
          </div>
        </div>
        <div className="flex items-center px-5 w-[60vw] md:w-[17rem] truncate">
          <div className="truncate">
            <strong>
              {user?.firstname} {user?.lastname}
            </strong>
            <br />
            <i className="text-foreground-100">@ {user?.username}</i>
            <br />
          </div>
        </div>
      </div>
      <PrimaryButton
        className="mt-10 w-full flex items-center justify-center gap-3"
        onClick={onLogout}
      >
        <LogoutIcon className="stroke-2 fill-background dark:fill-foreground stroke-background dark:stroke-foreground inline w-8 p-1" />
        <span className="font-semibold text-center text-xl">Logout</span>
      </PrimaryButton>
    </div>
  );
};

export default Profile;
