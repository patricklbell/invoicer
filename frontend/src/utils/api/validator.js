import fetcher from 'utils/fetcher';

export async function validatePeppol(xml) {
  const data = new FormData();
  data.append('file', new Blob([xml]));
  return fetcher([
    '/report/peppol/v1',
    {
      method: 'post',
      data
    },
    import.meta.env.VITE_VALIDATOR_BACKEND
  ]);
}
