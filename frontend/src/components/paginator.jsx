import classnames from 'classnames';
import { DOTS, usePagination } from '../hooks/use-pagination';

const Paginator = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage: currentPage + 1,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage < 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1] - 1;
  return (
    <ul
      className={classnames('list-style-none flex justify-end', {
        [className]: className
      })}
    >
      {/* Left navigation arrow */}
      <li>
        <a
          className={classnames(
            'relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-500 hover:bg-gray-light transition-colors duration-200',
            { 'pointer-events-none invisible': currentPage === 0 }
          )}
          onClick={() => onPrevious()}
          href="#!"
        >
          Previous
        </a>
      </li>

      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber}>
              <a
                className="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600"
                href="#!"
              >
                &#8230;
              </a>
            </li>
          );
        }

        if (pageNumber === currentPage + 1) {
          return (
            <li aria-current="page" key={pageNumber}>
              <a
                className="relative block rounded bg-primary-100 py-1.5 px-3 text-sm font-medium text-black bg-blue-light opacity-60 hover:opacity-80 transition-colors duration-200"
                href="#!"
              >
                {pageNumber}
                <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                  (current)
                </span>
              </a>
            </li>
          );
        }

        return (
          <li key={pageNumber}>
            <a
              className="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 hover:bg-gray-light transition-colors duration-200"
              onClick={() => onPageChange(pageNumber - 1)}
              href="#!"
            >
              {pageNumber}
            </a>
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li>
        <a
          className={classnames(
            'relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-500 hover:bg-gray-light transition-colors duration-200',
            { 'pointer-events-none invisible': currentPage === lastPage }
          )}
          onClick={() => onNext()}
          href="#!"
        >
          Next
        </a>
      </li>
    </ul>
  );
};

export default Paginator;
