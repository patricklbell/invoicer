import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useUser = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    [id ? `/user/${id}` : '/user'],
    fetcher
  );

  const loading = isLoading && !error;
  const loggedOut = error;
  if (loggedOut && !id) {
    mutate((v) => v, false);
  }

  return {
    user: data?.user,
    data,
    loading,
    isLoading,
    error,
    loggedOut,
    mutate
  };
};

export default useUser;
