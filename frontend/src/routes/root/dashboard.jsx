import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Card from 'components/card';
import Paginator from 'components/paginator';
import Pill from 'components/pill';
import PrimaryButton from 'components/primary-button';
import Modal from 'components/modal';
import WarningButton from 'components/warning-button';
import InvoiceList from 'components/ui/invoice-list';
import { ReactComponent as DeleteIcon } from 'assets/delete.svg';

import useFeed from 'hooks/use-feed';
import useUser from 'hooks/use-user';
import makeLink from 'utils/make-link';
import { batch } from 'utils/api/invoices';

const Dashboard = () => {
  const loc = useLocation();

  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const [selection, setSelection] = useState([]);

  const [isDeletorOpen, setIsDeletorOpen] = useState(false);
  const [deletorSelectionCount, setDeletorSelectionCount] = useState(0);

  const { data, isLoading, mutate } = useFeed(pageIndex, pageSize);

  const { mutate: mutateUser } = useUser();
  useEffect(() => mutateUser);

  return (
    <>
      <Modal
        isOpen={isDeletorOpen}
        setIsOpen={setIsDeletorOpen}
        className="max-w-md"
      >
        <h2 className="py-5 font-semibold text-foreground">
          Delete {deletorSelectionCount} invoice
          {deletorSelectionCount === 1 ? '' : 's'}?
        </h2>
        <i className=" text-foreground-100">This action cannot be undone</i>
        <WarningButton
          shadow
          className="mt-5 mx-auto"
          onClick={() => {
            batch(selection, 'delete').then(() => {
              mutate();
              setIsDeletorOpen(false);
              setSelection([]);
            });
          }}
        >
          Confirm
        </WarningButton>
      </Modal>
      <div className="lg:w-full xl:w-1/2 sm:px-10 flex flex-col m-auto">
        <div className="text-slate-600 py-2 pl-2">Dashboard</div>
        <Card className="w-full mb-10 sticky -top-1 z-10">
          <div className="flex text-xl w-full items-center relative">
            <Pill className="flex dark:bg-secondary/50 bg-secondary/50 px-4">
              <div className="py-2">
                {data?.total || 0} Invoice{data?.total == 1 ? '' : 's'}
              </div>
            </Pill>
            {selection.length !== 0 && (
              <Pill
                className="flex bg-primary-100/50 px-4 hover:cursor-pointer hover:bg-primary-200/50"
                onClick={() => setSelection([])}
              >
                <div className="py-2">{selection.length} Selected</div>
              </Pill>
            )}
            <div className="flex absolute right-0 gap-3">
              {selection.length !== 0 && (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setDeletorSelectionCount(selection.length);
                    setIsDeletorOpen(true);
                  }}
                >
                  <DeleteIcon className="inline w-8 h-8 p-[4px] bg-warn hover:bg-warn-100 rounded-md" />
                </button>
              )}
              {selection.length === 1 && (
                <Link {...makeLink(loc, '/view?id=' + selection[0])}>
                  <PrimaryButton>Open</PrimaryButton>
                </Link>
              )}
              <Link {...makeLink(loc, '/edit')}>
                <PrimaryButton>Create Invoice</PrimaryButton>
              </Link>
            </div>
          </div>
        </Card>
        <Card className="w-full overflow-hidden">
          <InvoiceList
            invoices={data?.page}
            minRows={pageSize}
            loading={isLoading}
            selection={selection}
            setSelection={setSelection}
          />
          <Paginator
            totalCount={data?.total}
            currentPage={pageIndex}
            pageSize={pageSize}
            onPageChange={setPageIndex}
            siblingCount={1}
          />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
