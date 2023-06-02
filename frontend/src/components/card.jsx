import classnames from 'classnames';

const Card = (props) => {
  return (
    <div
      className={classnames(
        'rounded-lg p-6 shadow-lg border border-neutral border-opacity-50 dark:border-opacity-100 bg-background',
        {
          [props.className]: props.className
        }
      )}
    >
      {props?.children}
    </div>
  );
};

export default Card;
