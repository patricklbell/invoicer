import classnames from 'classnames';

import Throbber from 'components/throbber';

import useInvoiceView from 'hooks/use-invoice-view';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const InvoiceViewer = forwardRef(
  ({ id, xml: contentsXml, json: contentsJson, className }, ref) => {
    const { isLoading, error, data } = useInvoiceView({
      id,
      contentsXml,
      contentsJson
    });

    if (isLoading || error) {
      return isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Throbber svgClassName="w-16 h-16" />
        </div>
      ) : (
        <span>
          Network error. Failed to load invoice view (your invoice may be
          invalid).
        </span>
      );
    }

    return (
      <div
        className={classnames('relative max-w-full', {
          [className]: className
        })}
        ref={ref}
      >
        <div className="text-xl p-5 overflow-y-auto">
          <div dangerouslySetInnerHTML={{ __html: data?.html }} />
        </div>
      </div>
    );
  }
);

export default InvoiceViewer;
