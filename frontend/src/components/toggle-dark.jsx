import classnames from 'classnames';

import { ReactComponent as DarkModeIcon } from 'assets/dark-mode.svg';
import { ReactComponent as LightModeIcon } from 'assets/light-mode.svg';

const ToggleDark = ({ className }) => {
  const toggleDarkMode = () => {
    if (
      localStorage.getItem('color-theme') === 'light' ||
      !document.documentElement.classList.contains('dark')
    ) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  };

  return (
    <button onClick={toggleDarkMode} className="group">
      <LightModeIcon
        className={classnames('block dark:hidden group-hover:animate-pulse', {
          [className]: className
        })}
      />
      <DarkModeIcon
        className={classnames('hidden dark:block group-hover:animate-pulse', {
          [className]: className
        })}
      />
    </button>
  );
};

export default ToggleDark;
