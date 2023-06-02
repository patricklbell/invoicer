import classnames from 'classnames';
import { useId } from 'react';

// Based on https://tailwind-elements.com/docs/standard/components/buttons/
const WarningButton = ({
  type = 'button',
  children,
  className,
  shadow = false,
  ...other
}) => {
  const id = useId();

  return (
    <button
      type={type}
      id={id}
      className={classnames(
        'block rounded bg-warn/75 px-6 py-2 text-sm text-background-50 dark:text-foreground-100 transition duration-150 ease-in-out hover:bg-warn-100 hover:shadow-md focus:outline-none focus:ring-0 disabled:shadow-none disabled:bg-background-100',
        {
          [className]: className,
          'shadow-warn-100 active:shadow-warn-100 focus:shadow-warn ': shadow
        }
      )}
      {...other}
    >
      {children}
    </button>
  );
};

export default WarningButton;
