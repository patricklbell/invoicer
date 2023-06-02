import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

import Card from 'components/card';
import Avatar from 'components/avatar';
import Modal from 'components/modal';
import WarningButton from 'components/warning-button';
import GoBack from 'components/go-back';
import { ReactComponent as ChevronRightIcon } from 'assets/chevron-right.svg';

import { remove } from 'utils/api/user';
import useUser from 'hooks/use-user';
import toTitleCase from 'src/utils/to-title-case';

const Settings = () => {
  const loc = useLocation();
  const [isDeletorOpen, setIsDeletorOpen] = useState(false);
  const { user, loading, mutate } = useUser();
  const nav = useNavigate();

  return (
    <>
      <Modal
        isOpen={isDeletorOpen}
        setIsOpen={setIsDeletorOpen}
        className="max-w-md flex flex-col items-center"
      >
        <h2 className="py-5 font-semibold text-foreground">
          Delete your account?
        </h2>
        <i className=" text-foreground-100">This action cannot be undone</i>
        <WarningButton
          shadow
          className="mt-5"
          onClick={() => {
            remove().then(mutate);
          }}
        >
          Confirm
        </WarningButton>
      </Modal>
      <div className="lg:w-full xl:w-1/2 sm:px-10 flex flex-col m-auto">
        <GoBack />
        <Card className="w-full pb-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 p-4 text-foreground-100">
            Joined {dayjs(user?.creationDate).format('LL')}
          </div>
          <div className="font-semibold text-center text-2xl py-5">
            Account Settings
          </div>
          <div className="flex py-2">
            <div className="flex items-center">
              <div className="flex items-center relative">
                <div className="absolute h-full w-full bg-background-100 animate-pulse scale-110 rounded-full" />
                <Avatar
                  show={!loading}
                  className="z-[2] w-24 h-24 text-3xl hidden md:flex"
                  name={`${user?.firstname} ${user?.lastname}`}
                />
              </div>
            </div>
            <div className="flex items-center pl-14 -mx-6 pt-5 text-lg font-light flex-grow">
              <div className="flex flex-col flex-grow">
                <table className="table-auto w-full">
                  <tbody>
                    {[
                      {
                        prop: 'name',
                        value: user
                          ? `${user?.firstname} ${user?.lastname}`
                          : ''
                      },
                      { prop: 'username', value: user?.username },
                      { prop: 'email', value: user?.email }
                    ].map(({ prop, value }) => (
                      <tr
                        className="w-max hover:bg-background-50 hover:cursor-pointer border-y border-neutral group"
                        onClick={() =>
                          nav(`/settings/${prop}`, { state: { from: loc } })
                        }
                        key={prop}
                      >
                        <td className="py-2 pl-4 text-foreground-100 text-lg align-middle">
                          {toTitleCase(prop)}
                        </td>
                        <td className="py-2 w-full pl-10 align-middle">
                          {value}
                        </td>
                        <td className="py-2 flex items-center">
                          <ChevronRightIcon className="group-hover:translate-x-[4px] transition-transform w-8 h-8" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <WarningButton
            className="mx-auto mt-5"
            onClick={() => setIsDeletorOpen(true)}
          >
            Delete Account
          </WarningButton>
        </Card>
      </div>
    </>
  );
};

export default Settings;
