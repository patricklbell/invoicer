import classnames from 'classnames';

import Avatar from 'components/avatar';
import Pill from 'components/pill';
import { ReactComponent as CloseIcon } from 'assets/close.svg';

import useUser from 'src/hooks/use-user';

const UserPill = ({
  id,
  closeable = true,
  edit = false,
  onClose = () => {},
  ...other
}) => {
  const { user, error, isLoading } = useUser(id);

  return error ? (
    <></>
  ) : (
    <Pill
      key={user?._id}
      className={classnames(
        'flex flex-row items-center justify-center align-middle gap-2 bg-opacity-[41%] my-1 bg-primary rounded-[2rem]',
        {
          'bg-secondary/20': edit
        }
      )}
      {...other}
    >
      <Avatar
        className="-ml-[0.3rem] text-[0.8rem] outline-none h-[2rem] w-[2rem]"
        name={`${user?.firstname} ${user?.lastname}`}
        show={!isLoading}
      />
      {isLoading ? (
        <>
          <div className="h-2 bg-background-100 rounded w-9 inline-block animate-pulse" />
          <div className="ml-1 h-2 bg-background-100 rounded w-5 inline-block animate-pulse" />
        </>
      ) : (
        <span className="text-foreground-100 text-md">
          {user?.firstname} {user?.lastname}
        </span>
      )}
      {closeable && (
        <CloseIcon
          className="w-4 h-4 hover:cursor-pointer fill-foreground-100 hover:fill-foreground"
          onClick={onClose}
        />
      )}
    </Pill>
  );
};

export default UserPill;
