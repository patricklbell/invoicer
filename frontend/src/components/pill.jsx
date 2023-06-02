import classnames from 'classnames';

const Pill = (props) => {
  return (
    <span
      className={classnames(
        'inline-block whitespace-nowrap rounded-full mr-2 bg-primary-200 bg-primary-100/50 px-[1em] py-[0.35em] text-center align-baseline text-[0.75em] leading-none',
        {
          [props.className]: props.className
        }
      )}
      onClick={props?.onClick}
    >
      {props?.children}
    </span>
  );
};

export default Pill;
