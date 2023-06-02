import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';

import Card from 'components/card';
import Paginator from 'components/paginator';
import InvoiceList from 'components/ui/invoice-list';
import { ReactComponent as MagnifierIcon } from 'assets/magnifier.svg';

import useSearch from 'hooks/use-search';
import useQuery from 'hooks/use-query';
import GoBack from 'src/components/go-back';

const Search = () => {
  const query = useQuery();
  const [pageIndex, setPageIndex] = useState(0);
  const [invoices, setInvoices] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const pageSize = 10;

  const q = useMemo(() => {
    return query.get('q');
  }, [query]);

  const { data, error, isLoading } = useSearch(q, pageIndex, pageSize);

  useEffect(() => {
    if (data && !error) {
      setInvoices(data.page);
      setTotalInvoices(data.total);
    }
  }, [data, error]);

  return (
    <div className="lg:w-full xl:w-1/2 sm:px-10 flex flex-col m-auto">
      <GoBack />
      <Card className="w-full">
        {totalInvoices !== 0 && (
          <>
            <InvoiceList invoices={invoices} minRows={0} selectable={false} />
          </>
        )}
        <Paginator
          totalCount={totalInvoices}
          currentPage={pageIndex}
          pageSize={pageSize}
          onPageChange={setPageIndex}
          siblingCount={1}
        />
        {totalInvoices === 0 && (
          <div className="text-center py-10 w-full text-xl leading-10">
            <MagnifierIcon
              className={classnames('block m-auto mb-5', {
                'animate-bounce': isLoading
              })}
            />
            {isLoading && (
              <p>
                Searching for &lsquo;{q}&rsquo; <br />
              </p>
            )}
            {error && <p>Network error, are you offline?</p>}
            {!isLoading && !error && totalInvoices === 0 && (
              <p>
                No invoices found matching &lsquo;{q}&rsquo; <br />
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Search;
