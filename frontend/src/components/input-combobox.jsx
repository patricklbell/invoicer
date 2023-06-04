import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import classnames from 'classnames';

import { ReactComponent as ChevronRight } from '../assets/chevron-right.svg';
import { ReactComponent as Check } from '../assets/check.svg';

const InputCombobox = ({
  selected = '',
  setSelected,
  options,
  placeholder,
  filter = (option, query) =>
    option
      .toLowerCase()
      .replace(/\s+/g, '')
      .includes(query.toLowerCase().replace(/\s+/g, '')),
  setInput = () => {}
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    setInput(query);
  }, [query]);

  const filteredOptions = options?.filter
    ? options.filter((option) => filter(option, query))
    : options;

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg border border-neutral focus-within:border-primary sm:text-sm transition-colors">
          <Combobox.Input
            className="w-full py-3 pl-3 pr-10 text-sm leading-5 text-foreground placeholder:text-foreground-100 bg-background"
            displayValue={(option) => option}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <Combobox.Button
            className={classnames(
              'absolute inset-y-0 right-0 flex items-center pr-2',
              { invisible: !options?.length }
            )}
          >
            <ChevronRight
              className="h-5 w-5 text-neutral rotate-90"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          className="z-10"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options
            className={classnames(
              'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-background text-base ring-1 ring-neutral focus:outline-none sm:text-sm',
              { invisible: !options?.length }
            )}
          >
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-foreground-100">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option}
                  className={({ active }) =>
                    classnames(
                      'relative cursor-default select-none py-2 pl-10 pr-4 hover:cursor-pointer group',
                      {
                        'bg-primary-100/10 dark:bg-primary text-foreground':
                          active,
                        'text-foreground-100': !active
                      }
                    )
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={classnames('block truncate', {
                          'font-medium': selected,
                          'font-normal': !selected
                        })}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 stroke-foreground fill-foreground">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default InputCombobox;
