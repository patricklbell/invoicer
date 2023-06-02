import { useDatePicker } from '@rehookify/datepicker';
import { Popover, Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import dayjs from 'dayjs';
import {
  FloatingPortal,
  useFloating,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate
} from '@floating-ui/react';

import { ReactComponent as ChevronRightIcon } from 'assets/chevron-right.svg';
import { ReactComponent as ChevronLeftIcon } from 'assets/chevron-left.svg';
import InputText from 'components/input-text';

const InputDate = ({
  value,
  setValue,
  placeholder,
  className = '',
  popoverClassName = ''
}) => {
  const [selectedDates, onDatesChange] = useState([new Date(value)]);
  const {
    data: { calendars, weekDays },
    propGetters: { dayButton, nextMonthButton, previousMonthButton }
  } = useDatePicker({
    selectedDates,
    onDatesChange,
    calendar: {
      startDay: 1
    }
  });
  const { month, year, days } = calendars[0];
  useEffect(() => {
    setValue(selectedDates[0]);
  }, [selectedDates]);

  const { x, y, strategy, refs, context } = useFloating({
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate
  });
  const role = useRole(context, { role: 'menu' });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([role]);

  return (
    <Popover
      className={classnames('relative flex', { [className]: className })}
    >
      <Popover.Button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="flex-1 group"
        disabled={false}
      >
        <InputText
          inputClassName="pointer-events-none hover:cursor-pointer group-focus:border-primary ui-open:border-primary disabled:bg-background disabled:text-foreground"
          value={dayjs(value).format('DD/MM/YYYY')}
          tabindex="-1"
          disabled={true}
          placeholder={placeholder}
        />
      </Popover.Button>

      <FloatingPortal>
        <div
          className="z-10"
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: 'max-content'
          }}
          {...getFloatingProps()}
        >
          <Transition
            className="min-w-[10rem] max-w-[20rem] bg-background"
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel>
              <div
                className={classnames(
                  'block p-4 border border-neutral rounded fill-foreground text-foreground',
                  { [popoverClassName]: popoverClassName }
                )}
              >
                <section className="flex flex-col">
                  <header className="flex flex-row items-center mb-2">
                    <button
                      className="group"
                      type="button"
                      {...previousMonthButton({ step: 12 })}
                    >
                      <ChevronLeftIcon className="w-8 fill-foreground-100 group-hover:fill-foreground" />
                    </button>
                    <p className="text-center text-sm flex-1">{year}</p>
                    <button
                      className="group"
                      type="button"
                      {...nextMonthButton({ step: 12 })}
                    >
                      <ChevronRightIcon className="w-8 fill-foreground-100 group-hover:fill-foreground" />
                    </button>
                  </header>

                  <header className="flex flex-row items-center mb-2">
                    <button
                      className="group"
                      type="button"
                      {...previousMonthButton()}
                    >
                      <ChevronLeftIcon className="w-8 fill-foreground-100 group-hover:fill-foreground" />
                    </button>
                    <p className="text-center text-sm flex-1">{month}</p>
                    <button
                      className="group"
                      type="button"
                      {...nextMonthButton()}
                    >
                      <ChevronRightIcon className="w-8 fill-foreground-100 group-hover:fill-foreground" />
                    </button>
                  </header>

                  <div className="grid grid-cols-7 gap-y-1 gap-x-2 mb-2 items-center h-8">
                    {weekDays.map((d) => (
                      <p key={d} className="text-xs text-center">
                        {d}
                      </p>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-y-1 gap-x-2 items-center">
                    {days.map((d) => (
                      <button
                        type="button"
                        key={d.$date.toString()}
                        className={classnames('w-7 h-7 text-xs rounded-md', {
                          'bg-background-100': d?.now,
                          'bg-primary/50 text-foreground hover:cursor-default':
                            d?.selected,
                          'hover:bg-primary/20': !d?.selected,
                          'opacity-25 cursor-not-allowed': d?.disabled,
                          'opacity-50': !d?.inCurrentMonth
                        })}
                        {...dayButton(d)}
                      >
                        {d.day}
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      </FloatingPortal>
    </Popover>
  );
};

export default InputDate;
