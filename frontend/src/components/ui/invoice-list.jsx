import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import Pill from 'components/pill';
import { ReactComponent as LockIcon } from 'assets/lock.svg';
import { ReactComponent as CalendarIcon } from 'assets/calendar.svg';
import { ReactComponent as ChevronRightIcon } from 'assets/chevron-right.svg';
import { ReactComponent as CheckIcon } from 'assets/check.svg';
import { ReactComponent as NoResultsIcon } from 'assets/no-results.svg';

import useUser from 'hooks/use-user';
import useClickaway from 'hooks/use-clickaway';
import isTextInput from 'utils/is-textinput';
import makeLink from 'utils/make-link';

const InvoiceList = ({
  invoices = [],
  minRows = 10,
  loading = false,
  selectable = true,
  selection = [],
  setSelection
}) => {
  const { user, isLoading: isUserLoading } = useUser();

  const clickawayRef = useRef();
  useClickaway(clickawayRef, () => {
    setSelection([]);
  });
  const [lastSelection, setLastSelection] = useState(null);
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const selectAll = (event) => {
      if (isTextInput(document.activeElement)) {
        return;
      }

      if (event.key === 'a' && event.ctrlKey) {
        event.preventDefault();
        setSelection(invoices.map((i) => i._id));
      }
    };

    if (selectable) {
      document.addEventListener('keydown', selectAll, false);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', selectAll, false);
    };
  });

  const toggleSelection = (id) => {
    setSelection(
      selection.includes(id)
        ? selection.filter((i) => i !== id)
        : [...selection, id]
    );
  };

  const handleSelectionEvent = (event, id, index) => {
    if (event.ctrlKey) {
      toggleSelection(id);
    } else if (event.shiftKey && lastSelection !== null) {
      setSelection(
        invoices
          .slice(
            Math.min(index, lastSelection),
            Math.max(index, lastSelection) + 1
          )
          .map((i) => i._id)
      );
    } else {
      setSelection(selection.length === 1 && selection[0] === id ? [] : [id]);
    }

    setLastSelection(selection == [] ? null : index);
  };

  if (!loading && invoices.length === 0)
    return (
      <div className="w-full py-14 flex flex-col items-center gap-5">
        <NoResultsIcon />
        <div className="text-xl">No invoices found</div>
        <Link
          className="text-xl hover:text-primary-100 font-bold"
          {...makeLink(loc, '/edit')}
        >
          Create One
        </Link>
      </div>
    );

  if (loading || isUserLoading) {
    return (
      <table
        className="table-fixed p-5 text-md w-full select-none"
        ref={clickawayRef}
      >
        <thead>
          <tr>
            <th className=""></th>
            <th className="hidden md:block"></th>
            <th className="w-1/3"></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(Math.max(minRows - invoices.length, 0)).keys()].map(
            (i) => (
              <tr
                key={'dummy' + i}
                className="odd:bg-background-50 w-max group"
              >
                <td className="p-5 border-neutral animate-pulse">
                  <div className="h-2 bg-background-100 rounded w-1/6 inline-block group-odd:w-1/6" />
                  <div className="inline-block h-2 ml-4 bg-background-100 rounded w-1/3 group-odd:w-1/5" />
                  <br></br>
                  <div className="h-2 bg-background-100 rounded w-1/3 my-2 group-odd:w-1/4" />
                </td>
                <td className=" p-5 border-neutral animate-pulse">
                  <div className="inline-block h-2 bg-background-100 rounded w-1/4" />
                  <div className="inline-block h-2 ml-4 bg-background-100 rounded w-1/2" />
                </td>
                <td className="p-5 border-neutral animate-pulse w-1/2">
                  <div className="h-2 bg-background-100 rounded w-1/2 inline-block" />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  }

  return (
    <table
      className="table-fixed p-5 text-md w-full select-none"
      ref={clickawayRef}
    >
      <thead>
        <tr>
          <th className=""></th>
          <th className="hidden md:block"></th>
          <th className="w-1/3"></th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice, index) => (
          <tr
            key={invoice?._id || index}
            className={classnames(
              'transition-all ease-in border-primary duration-100 text-md',
              {
                'hover:bg-primary-100/[0.15] hover:cursor-pointer ': selectable,
                'bg-primary-100/10': selection.includes(invoice._id),
                'odd:bg-background-50': !selection.includes(invoice._id)
              }
            )}
            onClick={(event) =>
              selectable && handleSelectionEvent(event, invoice._id, index)
            }
            onDoubleClick={(event) => {
              event.stopPropagation();
              nav(`/view?id=${invoice?._id}`, { state: { from: loc } });
            }}
          >
            <td className="p-2 md:p-5 rounded-md">
              <div className="flex flex-row rounded-md">
                {selectable && (
                  <div className="max-w-20 flex-initial pl-2 pr-6 my-auto">
                    <span
                      className={classnames(
                        'block w-5 h-5 rounded-md hover:bg-transparent relative group',
                        {
                          'bg-primary/10': !selection.includes(invoice._id)
                        }
                      )}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleSelection(invoice._id);
                      }}
                    >
                      <span className="w-8 h-8 -top-2 -left-1 absolute rounded-full group-hover:bg-background-100"></span>

                      <CheckIcon
                        className={classnames('w-7 h-7 -top-1 absolute', {
                          'invisible group-hover:visible': !selection.includes(
                            invoice._id
                          ),
                          visible: selection.includes(invoice._id)
                        })}
                      ></CheckIcon>
                    </span>
                  </div>
                )}
                <div className="flex-grow flex flex-col justify-start">
                  <div className=" flex flex-row items-center pl-1">
                    {!invoice.editIds.includes(user?._id) ? (
                      <div className="hidden md:block">
                        <Pill className="mb-1 pr-3 flex flex-row align-middle items-center">
                          <LockIcon className="inline w-4 py-1 mr-2" />
                          <span>View Only</span>
                        </Pill>
                      </div>
                    ) : (
                      <></>
                    )}
                    {invoice.supplierName} <br />
                  </div>
                  <i className="text-foreground-100 text-sm flex items-center">
                    <CalendarIcon className="fill-foreground-100 inline w-5 p-[2px] pl-0 pb-[5px]" />
                    {dayjs(invoice.creationTime).format('DD/MM/YYYY')}
                  </i>
                </div>
              </div>
            </td>
            <td className="hidden md:block px-10 border-neutral py-5 truncate">
              {invoice.documentTitle}
            </td>
            <td className="p-2 md:p-5 border-neutral truncate">
              <div className="flex flex-row">
                <div className="flex-grow">
                  {/* @todo currency type */}${invoice.totalInvoiceValue} <br />
                  <i className="text-foreground-100 text-sm">
                    {dayjs(invoice.creationTime).fromNow()}
                  </i>
                </div>
                <div className=" my-auto max-w-20 h-fit flex-initial flex flex-row items-center hover:bg-background-100 rounded-full">
                  <Link
                    className="rounded-md justify-center align-middle flex"
                    to={`/view?id=${invoice?._id}`}
                    state={{ from: loc }}
                  >
                    <ChevronRightIcon className="w-8 h-8"></ChevronRightIcon>
                  </Link>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceList;
