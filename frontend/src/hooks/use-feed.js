import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useFeed = (pageIndex, pageSize) =>
  useSWR([`/invoices/feed?page=${pageIndex}&limit=${pageSize}`], fetcher);

export default useFeed;
