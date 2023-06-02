import classnames from 'classnames';
import { useId } from 'react';

import InputText from 'components/input-text';
import InputCombobox from 'components/input-combobox';

const AddressForm = ({ className, address, setAddress, title = 'Address' }) => {
  const id = useId();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <div
      id={id}
      className={classnames(
        'flex flex-col gap-4 border p-4 rounded-md border-neutral relative',
        {
          [className]: className
        }
      )}
    >
      <label
        htmlFor={id}
        className="px-2 rounded-md pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-foreground-100 transition-all duration-200 ease-out scale-[0.8] motion-reduce:transition-none bg-background -translate-y-[1.15rem]"
      >
        {title}
      </label>
      <InputText
        hidePlaceholder
        onInput={handleChange}
        value={address?.line1 || ''}
        placeholder="Line 1"
        id={id + 'line-1'}
        name="line1"
      />
      <InputText
        hidePlaceholder
        onInput={handleChange}
        value={address?.line2 || ''}
        name="line2"
        placeholder="Line 2"
        id={id + 'line-2'}
      />
      <InputText
        hidePlaceholder
        onInput={handleChange}
        value={address?.city || ''}
        name="city"
        placeholder="City/Town"
        id={id + 'city'}
      />
      <div className="flex flex-row">
        <InputText
          className="flex-grow focus-within:z-10"
          inputClassName="rounded-r-none"
          hidePlaceholder
          onInput={handleChange}
          value={address?.state || ''}
          name="state"
          placeholder="State/Region"
          id={id + 'state'}
        />
        <InputText
          className="flex-grow -ml-[1px] focus-within:z-10"
          inputClassName="rounded-l-none"
          hidePlaceholder
          onInput={handleChange}
          value={address?.zip || ''}
          name="zip"
          placeholder="Zip/Postcode"
          id={id + 'zip'}
        />
      </div>
      <InputCombobox
        setSelected={(v) => setAddress({ ...address, country: v })}
        selected={address?.country}
        placeholder="Country"
        value={address?.country || ''}
        options={['AU', 'NZ', 'UK']} // @todo full list of supported countries
      />
    </div>
  );
};

export default AddressForm;
