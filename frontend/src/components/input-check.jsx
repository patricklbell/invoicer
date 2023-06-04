import classnames from 'classnames';

import { ReactComponent as CheckIcon } from 'assets/check.svg';

const InputCheck = ({ value, setValue, className }) => {
  return (
    <span
      className={classnames(
        'inline-block w-5 h-5 rounded-md hover:bg-transparent relative group hover:cursor-pointer bg-primary-100/50',
        {
          'bg-transparent': value,
          [className]: className
        }
      )}
      onClick={() => {
        setValue(!value);
      }}
    >
      <span className="w-8 h-8 -top-2 -left-1 absolute rounded-full group-hover:bg-background-100"></span>

      <CheckIcon
        className={classnames(
          'w-7 h-7 -top-1 absolute stroke-foreground fill-foreground',
          {
            'invisible group-hover:visible': !value,
            visible: value
          }
        )}
      ></CheckIcon>
    </span>
  );
};

export default InputCheck;
