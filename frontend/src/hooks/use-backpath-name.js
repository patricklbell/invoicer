import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useBackpathName = () => {
  const loc = useLocation();

  return useMemo(() => {
    if (!loc.state?.from?.pathname) return 'Dashboard';

    const paths = loc.state?.from?.pathname.split('/');
    const end = paths[paths.length - 1];

    return end?.charAt(0).toUpperCase() + end?.substr(1, end?.length - 1);
  }, [loc]);
};

export default useBackpathName;
