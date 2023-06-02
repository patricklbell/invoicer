import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useUserSearch = (query, page, limit) =>
  useSWR(
    [
      '/users/search',
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

export default useUserSearch;
