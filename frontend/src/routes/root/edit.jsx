import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { XMLParser } from 'fast-xml-parser';
const xmlParser = new XMLParser({ ignoreAttributes: false });

import Card from 'components/card';
import InvoiceXml from 'components/forms/invoice-xml';
import InvoiceForm from 'components/forms/invoice-form';
import InvoiceViewer from 'components/ui/invoice-viewer';
import GoBack from 'components/go-back';
import Throbber from 'components/throbber';

import useQuery from 'hooks/use-query';
import useInvoice from 'hooks/use-invoice';
import useBackpath from 'hooks/use-backpath';
import { createPeppolXML, invoiceFromJson } from 'utils/peppol';
import uid from 'utils/uid';

const Edit = () => {
  const nav = useNavigate();
  const backpath = useBackpath();
  const query = useQuery();
  const [creating, setCreating] = useState(false);
  const [staleInvoice, setStaleInvoice] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);

  const id = useMemo(() => {
    setCreating(query.get('id') === null);
    return query.get('id');
  }, [query]);

  const { data, isLoading, error } = useInvoice(id, !creating, false);
  const [invoice, setInvoice] = useState({
    documentTitle: '',
    reference: uid(),
    issueDate: new Date(),
    supplierName: '',
    supplierEmail: '',
    supplierAddress: {},
    recipientName: '',
    recipientEmail: '',
    recipientAddress: {},
    items: []
  });
  const [ready, setReady] = useState(creating);

  const setInvoiceProperty = (property) => (value) => {
    setInvoice({ ...invoice, [property]: value });
  };

  const updateXmlFromInvoice = (invoice) => {
    setInvoiceProperty('contentsXml')(createPeppolXML(invoice));
  };

  const updateInvoiceFromXml = (invoice) => {
    try {
      setInvoice({
        ...invoice,
        ...invoiceFromJson(xmlParser.parse(invoice?.contentsXml))
      });
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (!isLoading && !error) {
      const updated = {
        issueDate: data?.creationTime || new Date(),
        ...invoice,
        ...data?.invoice
      };

      setInvoice(updated);
      updateInvoiceFromXml(updated);
      setReady(true);
    }
  }, [data, isLoading]);

  return (
    <div className="lg:w-full xl:w-1/2 sm:px-10 flex flex-col m-auto">
      <GoBack />

      <Tab.Group
        selectedIndex={selectedTab}
        onChange={(i) => {
          if (i == 1 && (selectedTab == 0 || selectedTab == 2)) {
            setStaleInvoice(true);
          }
          if (i != 0 && selectedTab == 0) {
            updateXmlFromInvoice(invoice);
          }
          if (i == 0 && staleInvoice) {
            setStaleInvoice(false);
            updateInvoiceFromXml(invoice);
          }

          setSelectedTab(i);
        }}
      >
        <Tab.List className="flex pl-5">
          <Tab className="border-neutral md:mx-2 px-2 md:px-6 bg-background-50 focus:outline-none focus:ring-0 py-1 -mb-[1px] rounded-t-md ui-selected:z-10 ui-selected:bg-background ui-selected:border-x ui-selected:border-t ui-not-selected:border">
            Edit
          </Tab>
          <Tab className="border-neutral md:mx-2 px-2 md:px-6 bg-background-50 focus:outline-none focus:ring-0 py-1 -mb-[1px] rounded-t-md ui-selected:z-10 ui-selected:bg-background ui-selected:border-x ui-selected:border-t ui-not-selected:border">
            XML
          </Tab>
          <Tab className="border-neutral md:mx-2 px-2 md:px-6 bg-background-50 focus:outline-none focus:ring-0 py-1 -mb-[1px] rounded-t-md ui-selected:z-10 ui-selected:bg-background ui-selected:border-x ui-selected:border-t ui-not-selected:border">
            Preview
          </Tab>
        </Tab.List>

        <Card className="w-full min-h-[80vh] flex">
          <Tab.Panels className="flex-grow flex max-w-full">
            <Tab.Panel className="flex-grow">
              {ready ? (
                <InvoiceForm
                  data={invoice}
                  setData={setInvoice}
                  afterSubmit={() => nav(backpath)}
                  creating={creating}
                  id={id}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <Throbber svgClassName="w-16 h-16" />
                </div>
              )}
            </Tab.Panel>

            <Tab.Panel className="flex-grow flex flex-col">
              <InvoiceXml
                xml={invoice?.contentsXml}
                setXml={setInvoiceProperty('contentsXml')}
              />
            </Tab.Panel>

            <Tab.Panel className="flex-grow h-full max-w-[100%]">
              <InvoiceViewer xml={invoice?.contentsXml}></InvoiceViewer>
            </Tab.Panel>
          </Tab.Panels>
        </Card>
      </Tab.Group>
    </div>
  );
};

export default Edit;
