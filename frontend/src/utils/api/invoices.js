import fetcher from 'utils/fetcher';

export async function batch(ids, operation) {
  return fetcher([
    '/invoices/batch',
    {
      method: 'post',
      data: {
        ids,
        operation
      }
    }
  ]);
}
