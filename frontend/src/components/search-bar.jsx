import { useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as MangnifierIcon } from 'assets/magnifier.svg';
import SecondaryButton from 'components/secondary-button';

const SearchBar = (props) => {
  const loc = useLocation();

  const [input, setInput] = useState(props?.value ?? '');
  const navigate = useNavigate();
  const handleSearch = () =>
    navigate({
      pathname: '/search',
      search: createSearchParams({
        q: input
      }).toString(),
      state: { from: loc }
    });
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-[80%] lg:w-144">
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            onKeyDown={handleKeyDown}
            value={input}
            onInput={(e) => setInput(e.target.value)}
            type="search"
            className="relative block w-[1%] min-w-0 flex-auto rounded-l-md -m-[1px] border-[1px] border-r-[0px] border-solid border-neutral bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-foreground-1 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-foreground focus:shadow-te-primary focus:outline-none"
            placeholder="Search your invoices"
            aria-label="Search"
            aria-describedby="button-addon3"
          />
          <SecondaryButton
            onClick={handleSearch}
            className="border-[1px] rounded-none -m-[1px] -my-[1px] ml-[0px] rounded-r-md"
          >
            <MangnifierIcon className="h-5 w-5 inline transition-colors mr-2 -ml-1 mt-[-0.21rem]" />
            Search
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
