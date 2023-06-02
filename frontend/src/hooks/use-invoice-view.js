import useSWR from 'swr';

import fetcher from 'utils/fetcher';

const useInvoiceView = (
  { contentsXml, contentsJson, id },
  shouldFetch = true
) => {
  if (contentsXml || contentsJson) {
    return useSWR(
      [
        shouldFetch ? '/invoice/view' : undefined,
        {
          method: 'post',
          data: {
            contentsXml,
            contentsJson
          }
        }
      ],
      fetcher
    );
  } else {
    return useSWR([shouldFetch ? `/invoice/view/${id}` : undefined], fetcher);
  }
};

export default useInvoiceView;
