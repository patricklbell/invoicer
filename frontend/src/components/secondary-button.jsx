import classnames from 'classnames';
import { useId } from 'react';

// Based on https://tailwind-elements.com/docs/standard/components/buttons/
const SecondaryButton = ({
  type = 'button',
  children,
  className,
  ...other
}) => {
  const id = useId();

  return (
    <button
      type={type}
      id={id}
      className={classnames(
        'block rounded px-6 py-2 text-sm border-2 -m-[2px] border-neutral transition ease-in-out hover:bg-background-50 dark:hover:bg-neutral hover:border-primary-200 disabled:bg-neutral disabled:border-neutral',
        {
          [className]: className
        }
      )}
      {...other}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
