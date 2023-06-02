import classnames from 'classnames';
import { useId } from 'react';

// Based on https://tailwind-elements.com/docs/standard/components/buttons/
const PrimaryButton = ({
  type = 'button',
  children,
  shadow = false,
  className,
  ...other
}) => {
  const id = useId();

  return (
    <button
      type={type || 'button'}
      id={id}
      className={classnames(
        'block rounded bg-primary dark:bg-primary-100 text-background dark:text-foreground px-6 py-2 text-sm transition ease-in-out hover:bg-primary-100 dark:hover:bg-primary focus:outline-none focus:ring-0 hover:shadow-md disabled:bg-neutral disabled:shadow-none',
        {
          'hover:shadow-background-50 focus:shadow-background-50 active:shadow-background-50':
            shadow,
          [className]: className
        }
      )}
      {...other}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
