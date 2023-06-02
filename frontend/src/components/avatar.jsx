import { useMemo } from 'react';
import classnames from 'classnames';
import randomColor from 'randomcolor';

const Avatar = ({
  className,
  name,
  show = true,
  hiddenClassName,
  ...other
}) => {
  const intials = name
    .split(' ')
    .reduce((initials, word) => initials + word.charAt(0).toUpperCase(), '');
  const [bgColor, textColor] = useMemo(
    () => [
      randomColor({
        luminosity: 'light',
        seed: name
      }),
      randomColor({
        luminosity: 'dark',
        seed: name
      })
    ],
    [name]
  );

  return (
    <span
      className={classnames(
        'rounded-full h-14 w-14 align-middle font-bold justify-center outline-0 outline-background-100 items-center flex',
        {
          [className]: className,
          [`bg-neutral animate-pulse ${hiddenClassName || ''}`]: !show
        }
      )}
      style={show ? { backgroundColor: bgColor, color: textColor } : {}}
      {...other}
    >
      {show ? intials : ''}
    </span>
  );
};

export default Avatar;
