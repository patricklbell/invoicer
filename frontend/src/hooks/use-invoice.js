import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useInvoice = (id, shouldFetch = true, refetch = true) => {
  if (!refetch) {
    return useSWR(
      [shouldFetch ? `/invoice/${id}` : undefined],
      {
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0
      },
      fetcher
    );
  }
  return useSWR([shouldFetch ? `/invoice/${id}` : undefined], fetcher);
};

export default useInvoice;
