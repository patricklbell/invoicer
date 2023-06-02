import React, { useEffect, useMemo, useState, useReducer, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { useReactToPrint } from 'react-to-print';

import Card from 'components/card';
import Modal from 'components/modal';
import InvoiceViewer from 'components/ui/invoice-viewer';
import InputCombobox from 'components/input-combobox';
import InputCheck from 'components/input-check';
import PrimaryButton from 'components/primary-button';
import SecondaryButton from 'components/secondary-button';
import GoBack from 'components/go-back';
import Avatar from 'components/avatar';
import UserPill from 'components/user-pill';
import Pill from 'components/pill';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import { ReactComponent as ShareIcon } from 'assets/share.svg';
import { ReactComponent as PrintIcon } from 'assets/print.svg';
import { ReactComponent as LockIcon } from 'assets/lock.svg';

import useInvoice from 'hooks/use-invoice';
import useQuery from 'hooks/use-query';
import useUserSearch from 'hooks/use-user-search';
import useUser from 'hooks/use-user';
import { share } from 'src/utils/api/invoice';

const View = () => {
  const loc = useLocation();
  const query = useQuery();
  const { user } = useUser();

  const id = useMemo(() => {
    return query.get('id');
  }, [query]);
  const { data: invoiceData, isLoading, error, mutate } = useInvoice(id);

  const printRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printRef.current });
  useEffect(() => {
    const print = (event) => {
      if (event.key === 'p' && event.ctrlKey) {
        event.preventDefault();
        handlePrint();
      }
    };

    document.addEventListener('keydown', print, false);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', print, false);
    };
  });

  const [isShareOpen, setIsShareOpenShare] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);

  const [shareList, updateShareList] = useReducer(
    (state, { id, add = true, clear = false, edit = allowEdit }) => {
      if (clear) return [];

      const filtered = state.filter((u) => u.id !== id);
      return add ? [...filtered, { id, edit }] : filtered;
    },
    []
  );
  useEffect(() => {
    if (!isShareOpen) {
      updateShareList({ clear: true });
    }

    invoiceData?.invoice?.viewIds?.forEach((id) =>
      updateShareList({ id, edit: false })
    );
    invoiceData?.invoice?.editIds?.forEach((id) =>
      updateShareList({ id, edit: true })
    );
  }, [invoiceData]);

  const [shareInput, setShareInput] = useState('');
  const { data: shareSearchData, mutate: updateAutocomplete } = useUserSearch(
    shareInput,
    0,
    5
  );
  useEffect(() => {
    updateAutocomplete();
  }, [shareInput]);

  const shareAutocomplete = useMemo(() => {
    return (
      shareSearchData?.page?.map((user) => (
        <div key={user?._id} className="flex flex-row items-center gap-5">
          <Avatar
            className="text-[0.8rem] transition-all outline-none h-8 w-8"
            name={`${user?.firstname} ${user?.lastname}`}
          />
          <span>
            {user.firstname} {user.lastname}
          </span>
        </div>
      )) || []
    );
  }, [shareSearchData]);

  return (
    <>
      <Modal
        isOpen={isShareOpen}
        setIsOpen={setIsShareOpenShare}
        className="max-w-md flex flex-col overflow-visible"
      >
        <span className="pb-3 pl-3 font-semibold text-center text-foreground">
          Share &lsquo;{invoiceData?.invoice?.documentTitle}&rsquo;
        </span>
        <div className="flex flex-row flex-wrap max-w-full pb-5">
          {shareList.map((u) => (
            <UserPill
              id={u.id}
              key={u.id}
              edit={u.edit}
              closeable={invoiceData?.invoice?.creatorId != u.id}
              onClose={() => updateShareList({ id: u.id, add: false })}
            />
          ))}
        </div>

        <InputCombobox
          setInput={setShareInput}
          setSelected={(el) => {
            const sel = shareSearchData?.page?.find((u) => u?._id == el?.key);
            if (sel) {
              updateShareList({
                id: sel._id,
                add: true
              });
            }
          }}
          placeholder="Add user..."
          value={shareInput}
          filter={(el) => shareList.every((u) => u?.id != el?.key)}
          options={shareAutocomplete} // @todo full list of supported countries
        />

        <div
          className={classnames('flex flex-row ml-1 mb-4 mt-3 gap-3', {
            'text-foreground': allowEdit,
            'text-foreground-100': !allowEdit
          })}
        >
          <InputCheck
            className="bg-secondary/50"
            setValue={setAllowEdit}
            value={allowEdit}
          />
          Allow Editing
        </div>

        <PrimaryButton
          onClick={() => {
            share(
              id,
              shareList
                .filter(
                  (u) => u.edit && u.id != invoiceData?.invoice?.creatorId
                )
                .map((u) => u.id),
              true,
              true
            )
              .then(() =>
                share(
                  id,
                  shareList
                    .filter(
                      (u) => !u.edit && u.id != invoiceData?.invoice?.creatorId
                    )
                    .map((u) => u.id),
                  true,
                  false
                )
              )
              .then(() =>
                share(
                  id,
                  invoiceData?.invoice?.viewIds.filter(
                    (id) => !shareList.find((u) => u.id == id)
                  ),
                  false,
                  false
                )
              )
              .then(() => {
                mutate();
                setIsShareOpenShare(false);
              });
          }}
        >
          Save Changes
        </PrimaryButton>
      </Modal>

      <div className="lg:w-full xl:w-1/2 sm:px-10 flex flex-col m-auto">
        <GoBack />

        <Card className="w-full sticky -top-2 mb-10 z-[1]">
          <div className="flex flex-row items-center">
            {isLoading || invoiceData?.invoice?.editIds.includes(user?._id) ? (
              <>
                <Link to={`/edit?id=${id}`} state={{ from: loc }}>
                  <PrimaryButton
                    disabled={error || isLoading}
                    className={classnames('', { 'animate-pulse': isLoading })}
                  >
                    <EditIcon className="h-6 w-6 inline fill-background dark:fill-foreground mr-2 -ml-3" />{' '}
                    Edit
                  </PrimaryButton>
                </Link>

                <SecondaryButton
                  disabled={error || isLoading}
                  className={classnames('ml-5', { 'animate-pulse': isLoading })}
                  onClick={() => setIsShareOpenShare(true)}
                >
                  <ShareIcon className="h-6 w-6 inline fill-primary mr-2 -ml-3" />{' '}
                  Share
                </SecondaryButton>
              </>
            ) : (
              <Pill className="my-auto">
                <LockIcon className="inline w-5 p-[2px] mr-1 pb-[5px]" />
                View Only
              </Pill>
            )}

            <div className="flex-grow flex flex-row justify-end">
              <PrimaryButton
                disabled={error || isLoading}
                onClick={handlePrint}
                className={classnames('ml-5', { 'animate-pulse': isLoading })}
              >
                <PrintIcon className="h-6 w-6 inline fill-background dark:fill-foreground mr-2 -ml-3" />
                Print
              </PrimaryButton>
            </div>
          </div>
        </Card>

        <Card className="w-full">
          <InvoiceViewer id={id} ref={printRef} />
        </Card>
      </div>
    </>
  );
};

export default View;
