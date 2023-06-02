import Card from 'components/card';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/tooltip';

const ErrorTooltip = ({
  error = '',
  show = false,
  placement = 'top',
  children,
  className,
  tooltipClassName
}) => {
  const reallyShow = show && !!error && error !== '' && error != undefined;
  return (
    <Tooltip
      open={reallyShow}
      doHover={false}
      placement={placement}
      padding={5}
      className="z-[9999]"
    >
      <TooltipTrigger className={className}>{children}</TooltipTrigger>
      {reallyShow && (
        <TooltipContent className={tooltipClassName}>
          <Card className="p-3 border-[2px] border-warn-100 shadow-warn-100 shadow-md z-[9999] relative text-foreground">
            {error}
          </Card>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default ErrorTooltip;
