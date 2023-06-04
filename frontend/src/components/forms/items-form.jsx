import classnames from 'classnames';
import { useEffect, useId, useState } from 'react';
import isEmpty from 'utils/is-empty';

const ItemsForm = ({ className = '', items = [], setItems }) => {
  const id = useId();
  const [data, setData] = useState({ rowId: 0, items }); // Required to batch updates together to avoid loss of focus

  useEffect(() => {
    setItems(data?.items);
  }, [data]);

  const numberOnKeyPress = (e) => {
    const value = e.target.value;
    if (
      !/[0-9.]/.test(e.key) ||
      (value !== '' && (isNaN(value) || isNaN(parseFloat(value))))
    ) {
      e.preventDefault();
    }
  };

  const handleChange = (i) => (e) => {
    const { name, value } = e.target;
    if (i >= items?.length) {
      setData({
        rowId: data?.rowId + 1,
        items: [...(data?.items ?? []), { [name]: value, id: data?.rowId }]
      });
    } else {
      setData({
        rowId: data?.rowId + 1,
        items: (data?.items ?? [])
          .map((item, index) => {
            if (index === i) {
              item[name] = value;
              if (item?.qty && item?.price) {
                item.amount = parseFloat(item?.qty) * parseFloat(item?.price);
              } else {
                item.amount = '';
              }
            }
            return item;
          })
          .filter((item) => !isEmpty(item))
      });
    }
  };

  const showExtra = items?.length == 0 || !isEmpty(items[items?.length - 1]);

  return (
    <table
      className={classnames(
        'table-fixed p-2 text-md select-none text-sm bg-background',
        {
          [className]: className
        }
      )}
    >
      <thead>
        <tr>
          <th className="cursor-default border border-neutral py-2 text-md w-1/3">
            Item
          </th>
          <th className="cursor-default border border-neutral py-2 text-md w-1/4">
            Description
          </th>
          <th className="cursor-default border border-neutral py-2 text-md w-1/12">
            Qty
          </th>
          <th className="cursor-default border border-neutral py-2 text-md w-1/6">
            Price
          </th>
          <th className="cursor-default border border-neutral py-2 text-md">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {(showExtra
          ? [...(data?.items ?? []), { id: data?.rowId }]
          : data?.items ?? []
        ).map((item, index) => (
          <tr key={item?.id}>
            <td className="p-0 border border-neutral">
              <input
                className="bg-background p-4 w-full ring-neutral focus-within:ring-1 focus-within:ring-primary"
                onInput={handleChange(index)}
                value={item?.name}
                placeholder="Name"
                id={`${id}-${index}-name`}
                name="name"
              />
            </td>
            <td className="p-0 border border-neutral">
              <input
                className="bg-background p-4 w-full ring-neutral focus-within:ring-1 focus-within:ring-primary"
                onInput={handleChange(index)}
                value={item?.description}
                placeholder="Description"
                id={`${id}-${index}-description`}
                name="description"
              />
            </td>
            <td className="p-0 border border-neutral">
              <input
                className="bg-background p-4 w-full ring-neutral focus-within:ring-1 focus-within:ring-primary"
                onInput={handleChange(index)}
                value={item?.qty}
                onKeyPress={numberOnKeyPress}
                placeholder="Qty"
                id={`${id}-${index}-qty`}
                name="qty"
              />
            </td>
            <td className="p-0 border border-neutral">
              <input
                className="bg-background p-4 w-full ring-neutral focus-within:ring-1 focus-within:ring-primary"
                onInput={handleChange(index)}
                value={item?.price}
                onKeyPress={numberOnKeyPress}
                placeholder="Price"
                id={`${id}-${index}-price`}
                name="price"
              />
            </td>
            <td className="p-0 border border-neutral">
              <input
                className="p-4 w-full outline-none disabled:bg-background-50 text-right"
                disabled
                value={
                  item?.amount ? '$' + parseFloat(item?.amount).toFixed(2) : ''
                }
                placeholder="Amount"
                id={`${id}-${index}-amount`}
              />
            </td>
          </tr>
        ))}
        <tr key="totalrow">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td className="p-0 border border-neutral">
            <input
              className="p-4 w-full outline-none bg-background disabled:bg-background-50 text-right"
              disabled
              value={
                '$' +
                items
                  .reduce((sum, item) => sum + parseFloat(item?.amount) || 0, 0)
                  .toFixed(2)
              }
              placeholder="Total"
              id={id + 'total'}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ItemsForm;
