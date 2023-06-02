import InputText from 'components/input-text';

const InvoiceXml = ({ xml, setXml }) => {
  return (
    <InputText
      className="h-full"
      inputClassName="resize-none h-full min-h-[65vh] m-0"
      setValue={setXml}
      value={xml}
      placeholder="Valid UBL"
      textarea
      id="xml"
    />
  );
};

export default InvoiceXml;
