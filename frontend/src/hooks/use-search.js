import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useSearch = (query, page, limit) =>
  useSWR(
    [
      '/invoices/search',
      {
        params: {
          query,
          page,
          limit
        }
      }
    ],
    fetcher
  );

export default useSearch;
