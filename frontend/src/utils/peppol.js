import dayjs from 'dayjs';
import uid from './uid';
import isEmpty from './is-empty';
import { isNumeric } from './is-numeric';

const numberToString = (val) => {
  return val === undefined || isNaN(val) || isNaN(parseFloat(val))
    ? '0'
    : parseFloat(val).toFixed(2);
};

export const createPeppolXML = ({
  documentTitle = '',
  issueDate = new Date(),
  reference = uid(),
  supplierName = '',
  supplierEmail = '',
  supplierAddress = '',
  supplierABN = '51824753556',
  recipientName = '',
  recipientEmail = '',
  recipientAddress = '',
  recipientABN = '51824753556',
  paymentReference = uid(),
  buyerReference = uid(),
  items = [],
  typeCode = 380,
  paymentMeansCode = 30,
  currency = 'AUD'
}) => {
  let total = items
    .reduce((sum, item) => sum + parseFloat(item?.amount), 0)
    .toFixed(2);
  total = total == 'NaN' ? '0.00' : total;
  const issueDateF = dayjs(issueDate).format('YYYY-MM-DD');

  return `<?xml version="1.0" encoding="UTF-8"?><Invoice xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
      xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
      xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
      <cbc:CustomizationID>urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0</cbc:CustomizationID>
      <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
      <cbc:ID>${reference}</cbc:ID>
      <cbc:IssueDate>${issueDateF}</cbc:IssueDate>
      <cbc:InvoiceTypeCode>${typeCode}</cbc:InvoiceTypeCode>
      <cbc:DocumentCurrencyCode>${currency}</cbc:DocumentCurrencyCode>
      <cbc:BuyerReference>${buyerReference}</cbc:BuyerReference>
      <cbc:DocumentDescription>${documentTitle}</cbc:DocumentDescription>

      <cac:AccountingSupplierParty>
        <cac:Party>
          <cbc:EndpointID schemeID="0151">${supplierABN}</cbc:EndpointID>
          <cac:PartyName>
            <cbc:Name>${supplierName}</cbc:Name>
          </cac:PartyName>
          
          <cac:PostalAddress>
            ${
              supplierAddress?.line1
                ? `<cbc:StreetName>${supplierAddress?.line1}</cbc:StreetName>`
                : ``
            }
            ${
              supplierAddress?.line2
                ? `<cbc:AdditionalStreetName>${supplierAddress?.line2}</cbc:AdditionalStreetName>`
                : ``
            }
            ${
              supplierAddress?.city
                ? `<cbc:CityName>${supplierAddress?.city}</cbc:CityName>`
                : ``
            }
            ${
              supplierAddress?.state
                ? `<cbc:CountrySubentity>${supplierAddress?.state}</cbc:CountrySubentity>`
                : ``
            }
            ${
              supplierAddress?.zip
                ? `<cbc:PostalZone>${supplierAddress?.zip}</cbc:PostalZone>`
                : ``
            }
            <cac:Country>
              <cbc:IdentificationCode>${
                supplierAddress?.country || 'AU'
              }</cbc:IdentificationCode>
            </cac:Country>
          </cac:PostalAddress>

          <cac:PartyLegalEntity>
            <cbc:RegistrationName>${supplierName}</cbc:RegistrationName>
            <cbc:CompanyID schemeID="0151">${supplierABN}</cbc:CompanyID>
          </cac:PartyLegalEntity>

          ${
            supplierEmail
              ? `<cac:Contact>
                  <cbc:ElectronicMail>${supplierEmail}</cbc:ElectronicMail>
                </cac:Contact>`
              : ``
          }
        </cac:Party>
      </cac:AccountingSupplierParty>

      <cac:AccountingCustomerParty>
        <cac:Party>
          <cbc:EndpointID schemeID="0151">${recipientABN}</cbc:EndpointID>
          <cac:PartyName>
            <cbc:Name>${recipientName}</cbc:Name>
          </cac:PartyName>

          
          <cac:PostalAddress>
            ${
              recipientAddress?.line1
                ? `<cbc:StreetName>${recipientAddress?.line1}</cbc:StreetName>`
                : ``
            }
            ${
              recipientAddress?.line2
                ? `<cbc:AdditionalStreetName>${recipientAddress?.line2}</cbc:AdditionalStreetName>`
                : ``
            }
            ${
              recipientAddress?.city
                ? `<cbc:CityName>${recipientAddress?.city}</cbc:CityName>`
                : ``
            }
            ${
              recipientAddress?.state
                ? `<cbc:CountrySubentity>${recipientAddress?.state}</cbc:CountrySubentity>`
                : ``
            }
            ${
              recipientAddress?.zip
                ? `<cbc:PostalZone>${recipientAddress?.zip}</cbc:PostalZone>`
                : ``
            }
            <cac:Country>
              <cbc:IdentificationCode>${
                recipientAddress?.country || 'AU'
              }</cbc:IdentificationCode>
            </cac:Country>
          </cac:PostalAddress>

          <cac:PartyLegalEntity>
            <cbc:RegistrationName>${recipientName}</cbc:RegistrationName>
            <cbc:CompanyID schemeID="0151">${recipientABN}</cbc:CompanyID>
          </cac:PartyLegalEntity>

          ${
            recipientEmail
              ? `<cac:Contact>
                  <cbc:ElectronicMail>${recipientEmail}</cbc:ElectronicMail>
                </cac:Contact>`
              : ``
          }
        </cac:Party>
      </cac:AccountingCustomerParty>

      <cac:PaymentMeans>
        <cbc:PaymentMeansCode>${paymentMeansCode}</cbc:PaymentMeansCode>
        <cbc:PaymentID>${paymentReference}</cbc:PaymentID>
      </cac:PaymentMeans>

      <cac:PaymentTerms>
        <cbc:Note>As agreed</cbc:Note>
      </cac:PaymentTerms>

      
      <cac:TaxTotal>
        <cbc:TaxAmount currencyID="${currency}">0.0</cbc:TaxAmount>
        <cac:TaxSubtotal>
          <cbc:TaxableAmount currencyID="${currency}">${total}</cbc:TaxableAmount>
          <cbc:TaxAmount currencyID="AUD">0.0</cbc:TaxAmount>
          <cac:TaxCategory>
            <cbc:ID>S</cbc:ID>
            <cbc:Percent>0</cbc:Percent>
            <cac:TaxScheme>
              <cbc:ID>GST</cbc:ID>
            </cac:TaxScheme>
          </cac:TaxCategory>
        </cac:TaxSubtotal>
      </cac:TaxTotal>
      
      <cac:LegalMonetaryTotal>
        <cbc:LineExtensionAmount currencyID="${currency}">${total}</cbc:LineExtensionAmount>
        <cbc:TaxExclusiveAmount currencyID="${currency}">${total}</cbc:TaxExclusiveAmount>
        <cbc:TaxInclusiveAmount currencyID="${currency}">${total}</cbc:TaxInclusiveAmount>
        <cbc:PrepaidAmount currencyID="${currency}">0.00</cbc:PrepaidAmount>
        <cbc:PayableAmount currencyID="${currency}">${total}</cbc:PayableAmount>
      </cac:LegalMonetaryTotal>

      ${items
        .map(
          (item, index) =>
            `<cac:InvoiceLine>
        <cbc:ID>${index}</cbc:ID>
        <cbc:InvoicedQuantity unitCode="XBX">${numberToString(
          item?.qty
        )}</cbc:InvoicedQuantity>
        <cbc:LineExtensionAmount currencyID="${currency}">${numberToString(
              item?.amount
            )}</cbc:LineExtensionAmount>

        <cac:Item>
            <cbc:Name>${item?.name || 'Unknown'}</cbc:Name>
            ${
              item?.description
                ? `<cbc:Description>${item?.description}</cbc:Description>`
                : ``
            }
            <cac:ClassifiedTaxCategory>
              <cbc:ID>S</cbc:ID>
              <cbc:Percent>0</cbc:Percent>
              <cac:TaxScheme>
                <cbc:ID>GST</cbc:ID>
              </cac:TaxScheme>
            </cac:ClassifiedTaxCategory>
        </cac:Item>
        

        <cac:Price>
          <cbc:PriceAmount currencyID="${currency}">${numberToString(
              item?.price
            )}</cbc:PriceAmount>
        </cac:Price>
      </cac:InvoiceLine>`
        )
        .join()} 
  </Invoice>`;
};

const getString = (json, ...keys) => {
  const value = keys.reduce((cjson, key) => cjson?.[key], json);

  return value?.['#text'] || value || '';
};

// @hardcoded @todo clean this up
export const invoiceFromJson = (json) => {
  const updates = {};
  const invoice = json?.Invoice;
  updates.reference = getString(invoice, 'cbc:ID');
  updates.issueDate = dayjs(getString(invoice, 'cbc:IssueDate'));
  updates.documentTitle = getString(invoice, 'cbc:DocumentDescription');

  const extractAddress = (addressJson) => {
    const address = {};
    address.line1 = getString(addressJson, 'cbc:StreetName');
    address.line2 = getString(addressJson, 'cbc:AdditionalStreetName');
    address.city = getString(addressJson, 'cbc:CityName');
    address.zip = getString(addressJson, 'cbc:PostalZone');
    address.state = getString(addressJson, 'cbc:CountrySubentity');
    address.country = getString(
      addressJson,
      'cac:Country',
      'cbc:IdentificationCode'
    );
    return address;
  };

  const supplierJson = getString(
    invoice,
    'cac:AccountingSupplierParty',
    'cac:Party'
  );
  if (supplierJson) {
    updates.supplierName = getString(supplierJson, 'cac:PartyName', 'cbc:Name');
    updates.supplierEmail = getString(
      supplierJson,
      'cac:Contact',
      'cbc:ElectronicMail'
    );

    const addressJson = getString(supplierJson, 'cac:PostalAddress');
    if (addressJson) {
      updates.supplierAddress = extractAddress(addressJson);
    }
  }

  const recipientJson = getString(
    invoice,
    'cac:AccountingCustomerParty',
    'cac:Party'
  );
  if (recipientJson) {
    updates.recipientName = getString(
      recipientJson,
      'cac:PartyName',
      'cbc:Name'
    );
    updates.recipientEmail = getString(
      recipientJson,
      'cac:Contact',
      'cbc:ElectronicMail'
    );

    const addressJson = getString(recipientJson, 'cac:PostalAddress');
    if (addressJson) {
      updates.recipientAddress = extractAddress(addressJson);
    }
  }

  let itemsJson = getString(invoice, 'cac:InvoiceLine');
  itemsJson = itemsJson?.length ? itemsJson : [itemsJson];
  if (itemsJson?.length) {
    updates.items = itemsJson.map((itemJson) => {
      const item = {};

      const qty = getString(itemJson, 'cbc:InvoicedQuantity');
      item.qty = isNumeric(qty) ? parseFloat(qty) : undefined;

      const price = getString(itemJson, 'cac:Price', 'cbc:PriceAmount');
      item.price = isNumeric(price) ? parseFloat(price) : undefined;

      const amount = getString(itemJson, 'cbc:LineExtensionAmount');
      item.amount = isNumeric(amount) ? parseFloat(amount) : undefined;

      item.name = getString(itemJson, 'cac:Item', 'cbc:Name');
      item.description = getString(itemJson, 'cac:Item', 'cbc:Description');
      return item;
    });
    updates.items = updates.items.filter((item) => !isEmpty(item));
  }

  return updates;
};
