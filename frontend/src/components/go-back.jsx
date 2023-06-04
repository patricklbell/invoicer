import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as EastIcon } from 'assets/east.svg';
import useBackpath from 'src/hooks/use-backpath';
import useBackpathName from 'src/hooks/use-backpath-name';

const GoBack = () => {
  const loc = useLocation();
  const name = useBackpathName();
  const path = useBackpath();

  return (
    <div className="py-2">
      <Link
        className="text-foreground-100 rounded-md hover:text-foreground p-2 -ml-2 align-middle group"
        to={path}
        state={{ ...loc.state?.from?.state }}
      >
        {/* @todo back to previous page including search */}
        <EastIcon className="rotate-180 h-[1rem] inline mr-2 mb-[4px] ml-4 stroke-foreground-100 group-hover:stroke-foreground fill-foreground-100 group-hover:fill-foreground transition-transform group-hover:-translate-x-[4px]" />
        {name}
      </Link>
    </div>
  );
};

export default GoBack;
