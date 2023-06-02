import classnames from 'classnames';
import React, { useId } from 'react';

// Based on https://tailwind-elements.com/docs/standard/components/buttons/
const InputText = ({
  id = useId(),
  className,
  inputClassName,
  value,
  setValue = () => {},
  textarea = false,
  type = 'text',
  placeholder,
  hidePlaceholder = false,
  ...other
}) => {
  return (
    <div
      className={classnames('relative', {
        [className]: className
      })}
    >
      {textarea && (
        <textarea
          type={type || 'text'}
          className={classnames(
            'peer block w-full rounded border border-neutral focus:border-primary bg-background py-[0.32rem] px-3 leading-[1.7]  outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none',
            {
              'placeholder:opacity-100': value !== '',
              'placeholder-transparent': value === '' && !hidePlaceholder,
              [inputClassName]: inputClassName
            }
          )}
          id={id}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder={placeholder}
          {...other}
        />
      )}
      {!textarea && (
        <input
          type={type || 'text'}
          autoComplete="off"
          className={classnames(
            'peer block w-full rounded border border-neutral focus:border-primary bg-background py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none',
            {
              'placeholder:opacity-100': value !== '',
              'placeholder-transparent': value === '' && !hidePlaceholder,
              [inputClassName]: inputClassName
            }
          )}
          id={id}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder={placeholder}
          {...other}
        />
      )}
      {!hidePlaceholder && (
        <label
          htmlFor={id}
          className={classnames(
            'px-2 rounded-md pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate mt-[0.37rem] leading-[2.15] text-foreground-100 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-blue motion-reduce:transition-none peer-focus:bg-background',
            {
              '-translate-y-[1.15rem] scale-[0.8] bg-background': value !== '',
              'leading-[1.5]': textarea
            }
          )}
        >
          {placeholder}
        </label>
      )}
    </div>
  );
};

export default InputText;
