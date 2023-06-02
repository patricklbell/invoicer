import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useBackpath = () => {
  const loc = useLocation();

  return useMemo(() => {
    if (!loc.state?.from?.pathname) return '/dashboard';

    return loc.state?.from?.pathname + (loc.state?.from?.search || '');
  }, [loc]);
};

export default useBackpath;
