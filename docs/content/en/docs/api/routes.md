---
title: "Routes"
description: "The OpenAPI 3.0 v0.0.1 route documentation."
date: 2023-03-17
lastmod: 2023-03-17
draft: false
images: []
menu:
  docs:
    parent: "API"
    toc: true 
weight: 300
---
## Invoice

CRUD Operations on individual invoices

### POST invoice

> Code samples

```javascript
const inputBody = '{
  "contentsXml": "<Invoice></Invoice>",
  "contentsJson": "string",
  "documentTitle": "Example",
  "totalInvoiceValue": 1000,
  "supplierName": "",
  "recipientName": "Company A LLC"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('<deployment-url>',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /invoice`

*Create a new invoice*

Uses the provided metadata and contents to create a new invoice for the authenticated user. Returns the new invoices id.

> Body parameter

```json
{
  "contentsXml": "<Invoice></Invoice>",
  "contentsJson": "string",
  "documentTitle": "Example",
  "totalInvoiceValue": 1000,
  "supplierName": "",
  "recipientName": "Company A LLC"
}
```

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» contentsXml|body|string|true|none|
|» contentsJson|body|string|false|none|
|» documentTitle|body|string|true|none|
|» totalInvoiceValue|body|number|true|Currency is assumed to be AUD.|
|» supplierName|body|string|true|none|
|» recipientName|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "acknowledged": true,
  "insertedId": "6421d1e887d1e2174b494492"
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully inserted an invoice|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Access token is missing or invalid, possibly because it has expired.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» acknowledged|boolean|true|none|none|
|» insertedId|string|true|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth" />}}

### GET invoice/{id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('<deployment-url>/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /invoice/{id}`

*Retrieve the invoice with the specified id.*

The specified id is searched for. If it is found and the authorizing user can view the invoice, the contents and metadata are returned.

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The objectId of the invoice to be retrieved.|

> Example responses

> 200 Response

```json
{
  "found": true,
  "invoice": {
    "contentsXml": "<Invoice></Invoice>",
    "contentsJson": "string",
    "documentTitle": "Example",
    "totalInvoiceValue": 1000,
    "supplierName": "Company A LLC",
    "recipientName": "Company B LLC",
    "viewIds": [
      "6421d1e887d1e2174b494492"
    ],
    "editIds": [
      "6421d1e887d1e2174b494492"
    ],
    "creationTime": "1975-08-19T23:15:30.000Z"
  }
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Found a viewable invoice with the given id.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|No invoice with the id was found or user is not authorized to view this invoice.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» found|boolean|true|none|none|
|» invoice|[Invoice](#schemainvoice)|false|none|none|
|»» contentsXml|string|false|none|none|
|»» contentsJson|string|false|none|none|
|»» documentTitle|string|true|none|none|
|»» totalInvoiceValue|number|true|none|Currency is assumed to be AUD.|
|»» supplierName|string|true|none|none|
|»» recipientName|string|true|none|none|
|»» viewIds|[string]|true|none|none|
|»» editIds|[string]|true|none|none|
|»» creationTime|string|true|none|Serialized JS Date object, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global/Objects/Date/toJSON|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» found|boolean|true|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth ( Scopes: read:invoice )" />}}

### DELETE invoice/{id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('<deployment-url>/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /invoice/{id}`

*Delete the invoice with the specified id.*

The invoice with the given id is deleted if it is found and the authorizing user has edit permissions.

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The objectId of invoice to be deleted.|

> Example responses

> 200 Response

```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Invoice was found and deleted.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|An invoice with id doesn't exist or user is not authorized to delete it.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» acknowledged|boolean|true|none|none|
|» deletedCount|integer|true|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» acknowledged|boolean|true|none|none|
|» deletedCount|integer|true|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth ( Scopes: edit:invoice )" />}}

### PATCH invoice/{id}

> Code samples

```javascript
const inputBody = '{
  "contentsXml": "<Invoice></Invoice>",
  "contentsJson": "string",
  "documentTitle": "Example",
  "totalInvoiceValue": 1000,
  "supplierName": "Company A LLC",
  "recipientName": "Company B LLC",
  "viewIds": [
    "6421d1e887d1e2174b494492"
  ],
  "editIds": [
    "6421d1e887d1e2174b494492"
  ],
  "creationTime": "1975-08-19T23:15:30.000Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('<deployment-url>/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /invoice/{id}`

*Modify the invoice with the specified id.*

An invoice with the specified id is searched for and if it is found the contents are modified according to the request body. All fields in the body must be valid possible properties of an invoice.

> Body parameter

```json
{
  "contentsXml": "<Invoice></Invoice>",
  "contentsJson": "string",
  "documentTitle": "Example",
  "totalInvoiceValue": 1000,
  "supplierName": "Company A LLC",
  "recipientName": "Company B LLC",
  "viewIds": [
    "6421d1e887d1e2174b494492"
  ],
  "editIds": [
    "6421d1e887d1e2174b494492"
  ],
  "creationTime": "1975-08-19T23:15:30.000Z"
}
```

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|objectId of invoice to be modified.|
|body|body|[Invoice](#schemainvoice)|false|none|

> Example responses

> 200 Response

```json
{
  "aknowledged": true,
  "matchedCount": 1
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The invoice with the given id was successfully modified.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|An invoice with the given id doesn't exist or the user is not authorized to edit it.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» aknowledged|boolean|false|none|none|
|» matchedCount|integer|false|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» aknowledged|boolean|false|none|none|
|» matchedCount|integer|false|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth ( Scopes: read:invoice )" />}}

### GET invoice/view/{id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('<deployment-url>/view/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /invoice/view/{id}`

*View an invoice.*

Returns a HTML page which shows the details of an invoice stored in the database.

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The objectId of the invoice to be viewed.|

> Example responses

> 200 Response

```json
{
  "found": true,
  "html": "<html>Invoice</html>"
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Generated HTML for the invoice.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The invoice was not found or the authenticating user does not have view permissions.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error.|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» found|boolean|true|none|none|
|» html|string|true|none|Generated HTML from the invoice's XML or JSON representation. This expects the data to be formatted according to the PEPPOL regulations. JSON should be a direct transposition of this PEPPOL structure, for reference, we use fast-xml-parser with ingnoreAttributes off, and implicitly expect the JSON to follow the output of this parser.|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» found|boolean|true|none|none|
|» message|string|false|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth ( Scopes: view:invoice )" />}}

### POST invoice/view

> Code samples

```javascript
const inputBody = '{
  "contentsXml": "string",
  "contentsJson": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('<deployment-url>/view',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /invoice/view`

*View an invoice.*

Returns a HTML page which shows the details of an invoice from it's XML or JSON contents.

> Body parameter

```json
{
  "contentsXml": "string",
  "contentsJson": "string"
}
```

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» contentsXml|body|string|false|For the expected document schema check the PEPPOL standard. An example of a valid XML string is shown here https://github.com/A-NZ-PEPPOL/A-NZ-PEPPOL-BIS-3.0/blob/master/Message%20examples/AU%20Freight%20-%20Document%20Level.xml|
|» contentsJson|body|string|false|The JSON form of a PEPPOL standard XML, the JSON structure should directly follows the XML. For reference, we use fast-xml-parser with ingnoreAttributes off to convert from the XML, and implicitly expect the JSON to follow the output of this parser.|

> Example responses

> 200 Response

```json
{
  "found": true,
  "html": "<html>Invoice</html>"
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Generated HTML for the invoice.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error.|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» found|boolean|true|none|none|
|» html|string|true|none|Generated HTML from the invoice's XML or JSON representation.|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

{{< alert icon="⚠️" text="This operation does not require authentication" />}}

### POST invoice/send/{id}

> Code samples

```javascript
const inputBody = '{
  "recipients": [
    "johndoe@example.com"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('<deployment-url>/send/{id}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /invoice/send/{id}`

*Send an email containing an invoice.*

Sends an email to a list of provided recipients providing information about an invoice.

> Body parameter

```json
{
  "recipients": [
    "johndoe@example.com"
  ]
}
```

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The objectId of the invoice to be sent.|
|body|body|object|true|none|
|» recipients|body|[string]|true|A list of emails addresses which will receive the email.|

> Example responses

> 200 Response

```json
{
  "found": true
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Email was succesfully sent. Note that this does not mean the email will show up in the recipient's inbox. The email may take a long time to arrive, may be reported as spam, or even blocked entirely.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The invoice was not found or the authenticating user does not have view permissions.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error.|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» found|boolean|false|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» sent|boolean|true|none|none|
|» message|string|false|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth ( Scopes: view:invoice )" />}}

## Invoices

Access and Edit multiple invoices

### GET invoices/feed

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('<deployment-url>s/feed',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /invoices/feed`

*Gets a page of the users invoices.*

Paginated feed of the the invoices a user has permission to view. The feed is in sorted from newest to oldest (in future there will be a sort parameter).

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|number|false|Zero indexed number representing which page of results to return, each page is of length 'limit.' The first invoice is invoice number 'page' x 'limit.'|
|offset|query|number|false|The number of invoices to offset the page by, this does not affect how many invoices are returned.|
|limit|query|number|false|The size of each page, i.e. the maximum number of invoices which are returned.|

> Example responses

> 200 Response

```json
{
  "page": [
    {
      "contentsXml": "<Invoice></Invoice>",
      "contentsJson": "string",
      "documentTitle": "Example",
      "totalInvoiceValue": 1000,
      "supplierName": "Company A LLC",
      "recipientName": "Company B LLC",
      "viewIds": [
        "6421d1e887d1e2174b494492"
      ],
      "editIds": [
        "6421d1e887d1e2174b494492"
      ],
      "creationTime": "1975-08-19T23:15:30.000Z"
    }
  ],
  "total": 100
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|An object respresenting the specified page of invoices and how many invoices are left in the feed. There can be less than 'limit' invoices in 'page'.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Access token is missing or invalid, possibly because it has expired.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» page|[[Invoice](#schemainvoice)]|true|none|none|
|»» contentsXml|string|false|none|none|
|»» contentsJson|string|false|none|none|
|»» documentTitle|string|true|none|none|
|»» totalInvoiceValue|number|true|none|Currency is assumed to be AUD.|
|»» supplierName|string|true|none|none|
|»» recipientName|string|true|none|none|
|»» viewIds|[string]|true|none|none|
|»» editIds|[string]|true|none|none|
|»» creationTime|string|true|none|Serialized JS Date object, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global/Objects/Date/toJSON|
|» total|integer|true|none|The total number of invoices in the feed.|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth ( Scopes: view:invoice )" />}}

### GET invoices/search

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('<deployment-url>s/search',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /invoices/search`

*Gets a page of invoices which match the provided query.*

Paginated results from a fuzzy search from the invoices the user has permission to view. The results are sorted from newest to oldest (in future there will be a sort parameter).

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|query|query|string|false|A fuzzy search term which determines which invoices are returned.|
|page|query|number|false|Zero indexed number representing which page of results to return, each page is of length 'limit.' The first invoice is invoice number 'page' x 'limit.'|
|offset|query|number|false|The number of invoices to offset the page by, this does not affect how many invoices are returned.|
|limit|query|number|false|The size of each page, i.e. the maximum number of invoices which are returned.|

> Example responses

> 200 Response

```json
{
  "page": {
    "contentsXml": "<Invoice></Invoice>",
    "contentsJson": "string",
    "documentTitle": "Example",
    "totalInvoiceValue": 1000,
    "supplierName": "Company A LLC",
    "recipientName": "Company B LLC",
    "viewIds": [
      "6421d1e887d1e2174b494492"
    ],
    "editIds": [
      "6421d1e887d1e2174b494492"
    ],
    "creationTime": "1975-08-19T23:15:30.000Z"
  },
  "total": 100
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Paginated invoices which match with the query and are viewable by the authorizing user.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Access token is missing or invalid, possibly because it has expired.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» page|[Invoice](#schemainvoice)|true|none|none|
|»» contentsXml|string|false|none|none|
|»» contentsJson|string|false|none|none|
|»» documentTitle|string|true|none|none|
|»» totalInvoiceValue|number|true|none|Currency is assumed to be AUD.|
|»» supplierName|string|true|none|none|
|»» recipientName|string|true|none|none|
|»» viewIds|[string]|true|none|none|
|»» editIds|[string]|true|none|none|
|»» creationTime|string|true|none|Serialized JS Date object, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global/Objects/Date/toJSON|
|» total|integer|true|none|The total number of invoices matching the query which the authorizing user can view.|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth" />}}

### POST invoices/batch

> Code samples

```javascript
const inputBody = '{
  "ids": [
    "6421d1e887d1e2174b494492"
  ],
  "operation": "delete"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('<deployment-url>s/batch',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /invoices/batch`

*Applies an operation to a batch of invoices.*

Given a list of invoice ids and an operation, this operation is performed on all invoices which the authorizing user has edit permissions for. Currently the only supported operation is deletion.

> Body parameter

```json
{
  "ids": [
    "6421d1e887d1e2174b494492"
  ],
  "operation": "delete"
}
```

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» ids|body|[string]|true|Array of the objectIds of the invoices to perform the operation on.|
|» operation|body|string|true|A string reprenting the operation to perform.|

##### Enumerated Values

|Parameter|Value|
|---|---|
|» operation|delete|

> Example responses

> 200 Response

```json
{
  "aknowledged": true,
  "deletedCount": 1
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Acknowledgement and how many invoices the operation was applied to.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Access token is missing or invalid, possibly because it has expired.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» aknowledged|boolean|false|none|none|
|» deletedCount|integer|false|none|If the operation is 'delete' then a delete count is returned. This is tells the caller how many of 'ids' were valid.|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth" />}}

## User

CRUD Operations on individual users and login

### POST user/signup

> Code samples

```javascript
const inputBody = '{
  "username": "johndoe",
  "firstname": "John",
  "lastname": "Doe",
  "password": "XM92eJEFHFTt214v2eetG4",
  "email": "johndoe@example.com"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://node-express-env.eba-9atmj7qr.ap-southeast-2.elasticbeanstalk.com/user/signup',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /user/signup`

*Sign up for a new account.*

Creates a new account with the given details.

> Body parameter

```json
{
  "username": "johndoe",
  "firstname": "John",
  "lastname": "Doe",
  "password": "XM92eJEFHFTt214v2eetG4",
  "email": "johndoe@example.com"
}
```

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» username|body|string|true|none|
|» firstname|body|string|true|none|
|» lastname|body|string|true|none|
|» password|body|string|true|If you are not using HTTPS ensure this password can not be intercepted!|
|» email|body|string|true|Must be valid format for an email.|

> Example responses

> 200 Response

```json
{
  "message": "Signup successful",
  "user": {
    "username": "johndoe",
    "/id": "64226af987d1e2174b494491"
  }
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Details of account which was created.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|
|» user|object|true|none|none|
|»» username|string|true|none|none|
|»» /id|string|true|none|objectId of new user|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

{{< alert icon="⚠️" text="This operation does not require authentication" />}}

### POST user/login

> Code samples

```javascript
const inputBody = '{
  "api": true,
  "username": "johndoe",
  "password": "XM92eJEFHFTt214v2eetG4"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://node-express-env.eba-9atmj7qr.ap-southeast-2.elasticbeanstalk.com/user/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /user/login`

*Login to an existing user's account.*

Checks that the user with the given username has a matching password then returns a JWT authorization token for a new session.

> Body parameter

```json
{
  "api": true,
  "username": "johndoe",
  "password": "XM92eJEFHFTt214v2eetG4"
}
```

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» api|body|boolean|false|Token will never expire if api is true.|
|» username|body|string|true|none|
|» password|body|string|true|If you are not using HTTPS ensure this password can not be intercepted!|

> Example responses

> 200 Response

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyMTQwMzU4N2QxZTIxNzRiNDk0NDhkIiwidXNlcm5hbWUiOiJwYXRyaWNrIn0sImlhdCI6MTY4MDI2NTE2NiwiZXhwIjoxNjgwMjY4NzY2fQ.ecnLCgXQ-JufzFXK7RYl23bQehT3cakZj7Tmd7pwd8A"
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Details of newly authenticated session.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Message describing why the user was not authenticated.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|
|» token|string|true|none|JSON Web Token, add this to headers as a bearer token to authorize future requests. This will expire after a certain time.|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|true|none|none|

{{< alert icon="⚠️" text="This operation does not require authentication" />}}

### GET user/{id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://node-express-env.eba-9atmj7qr.ap-southeast-2.elasticbeanstalk.com/user/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /user/{id}`

*Retrieve a user with the specified id or the authenticating user.*

The specified user id or authenticating user's id is searched and if it is found a description of the user is returned. Does not require authorization, but if authorized the user information returned could be more detailed.

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|false|objectId of the user to be retrieved. If not provided then request must be authenticated and the authenticating user's id is used.|

> Example responses

> 200 Response

```json
{
  "found": true,
  "user": {
    "username": "johndoe",
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "hash": "p7D6jYqPs6x3mL2CBH11Jt4sHOg72MjCNc0QtAwrujB=",
    "salt": "u14rCPA1gV3K6ghnr6HoOQ==",
    "creationDate": "1975-08-19T23:15:30.000Z"
  }
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User details, depending on the authorization a different amount of information is exposed.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Acknowledgement that no user with the specified id exists.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

*If the authorizing user's id does not have permission then only 'firstname', 'lastname', 'username' and 'dateCreated' is sent in 'user'.*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» found|boolean|true|none|none|
|» user|[User](#schemauser)|true|none|none|
|»» username|string|true|none|none|
|»» firstname|string|true|none|none|
|»» lastname|string|true|none|none|
|»» email|string|true|none|Must be valid format for an email.|
|»» hash|string|true|none|Salted hash based on the user's password|
|»» salt|string|true|none|The salt used to hash the password|
|»» creationDate|string|true|none|Serialized JS Date object, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global/Objects/Date/toJSON|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» found|boolean|true|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth ( Scopes: read:user )" />}}

### PATCH user/{id}

> Code samples

```javascript
const inputBody = '{
  "username": "janedoe",
  "firstname": "Jane",
  "lastname": "Doe",
  "email": "janedoe@example.com"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://node-express-env.eba-9atmj7qr.ap-southeast-2.elasticbeanstalk.com/user/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /user/{id}`

*Change the user with the specified id or the authenticating user's details.*

The user with specified id or authenticating user is modified according to body of request.

> Body parameter

```json
{
  "username": "janedoe",
  "firstname": "Jane",
  "lastname": "Doe",
  "email": "janedoe@example.com"
}
```

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|false|objectId of the user to be retrieved. If not provided then request must be authenticated and the authenticating user's id is used.|
|body|body|object|false|none|
|» username|body|string|false|none|
|» firstname|body|string|false|none|
|» lastname|body|string|false|none|
|» email|body|string|false|Must be valid format for an email.|

> Example responses

> 200 Response

```json
{
  "aknowledged": true,
  "matchedCount": 1
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The user with the given id was successfully modified.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Access token is missing or invalid, possibly because it has expired.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|A user with the given id doesn't exist.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» aknowledged|boolean|false|none|none|
|» matchedCount|integer|false|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» aknowledged|boolean|false|none|none|
|» matchedCount|integer|false|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth ( Scopes: edit:user )" />}}

### DELETE user/{id}

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://node-express-env.eba-9atmj7qr.ap-southeast-2.elasticbeanstalk.com/user/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /user/{id}`

*Delete the user with the specified id or the authenticating user.*

Delete the user with the specified id or the authenticating user if the authorizing user has permission.

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|false|objectId of the user to be deleted. If not provided then request must be authenticated and the authenticating user's id is used.|

> Example responses

> 200 Response

```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User was found and deleted.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Access token is missing or invalid, possibly because it has expired.|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|A user with id doesn't exist or user is not authorized to delete it.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» acknowledged|boolean|true|none|none|
|» deletedCount|integer|true|none|none|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

Status Code **404**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» acknowledged|boolean|true|none|none|
|» deletedCount|integer|true|none|none|

{{< alert icon="⚠️" text="To perform this operation, you must be authenticated by means of one of the following methods: bearerAuth ( Scopes: write:user )" />}}

## Users

Operations across multiple users

### GET users/search

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://node-express-env.eba-9atmj7qr.ap-southeast-2.elasticbeanstalk.com/users/search',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /users/search`

*Gets a page of users which match the provided query.*

Paginated results from a fuzzy search of all users. The results are sorted from newest to oldest (in future there will be a sort parameter).

#### Parameters

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|query|query|string|false|A fuzzy search term which determines which users are returned.|
|page|query|number|false|Zero indexed number representing which page of results to return, each page is of length 'limit.' The first invoice is invoice number 'page' x 'limit.'|
|offset|query|number|false|The number of users to offset the page by, this does not affect how many users are returned.|
|limit|query|number|false|The size of each page, i.e. the maximum number of users which are returned.|

> Example responses

> 200 Response

```json
{
  "page": {
    "username": "johndoe",
    "firstname": "John",
    "lastname": "Doe"
  },
  "total": 100
}
```

#### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Paginated users which match with the query.|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Parameters don't match the schema (validated with [YUP](https://www.npmjs.com/package/yup)) or an internal server error was encountered.|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Access token is missing or invalid, possibly because it has expired.|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|None|

#### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» page|object|true|none|none|
|»» username|string|true|none|none|
|»» firstname|string|true|none|none|
|»» lastname|string|true|none|none|
|» total|integer|true|none|The total number of matching users matching the query.|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|An optional message describing the error|

Status Code **401**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

{{< alert icon="⚠️" text="This operation does not require authentication" />}}

## Schemas

### User

```json
{
  "username": "johndoe",
  "firstname": "John",
  "lastname": "Doe",
  "email": "johndoe@example.com",
  "hash": "p7D6jYqPs6x3mL2CBH11Jt4sHOg72MjCNc0QtAwrujB=",
  "salt": "u14rCPA1gV3K6ghnr6HoOQ==",
  "creationDate": "1975-08-19T23:15:30.000Z"
}

```

#### Properties
  
|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|username|string|true|none|none|
|firstname|string|true|none|none|
|lastname|string|true|none|none|
|email|string|true|none|Must be valid format for an email.|
|hash|string|true|none|Salted hash based on the user's password|
|salt|string|true|none|The salt used to hash the password|
|creationDate|string|true|none|Serialized JS Date object, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global/Objects/Date/toJSON|

### Invoice

```json
{
  "contentsXml": "<Invoice></Invoice>",
  "contentsJson": "string",
  "documentTitle": "Example",
  "totalInvoiceValue": 1000,
  "supplierName": "Company A LLC",
  "recipientName": "Company B LLC",
  "viewIds": [
    "6421d1e887d1e2174b494492"
  ],
  "editIds": [
    "6421d1e887d1e2174b494492"
  ],
  "creationTime": "1975-08-19T23:15:30.000Z"
}

```

#### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|contentsXml|string|false|none|none|
|contentsJson|string|false|none|none|
|documentTitle|string|true|none|none|
|totalInvoiceValue|number|true|noneCurrency is assumed to be AUD.|
|supplierName|string|true|none|none|
|recipientName|string|true|none|none|
|viewIds|[string]|true|none|none|
|editIds|[string]|true|none|none|
|creationTime|string|true|none|Serialized JS Date object, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global/Objects/Date/toJSON|

PGenerated with [widdershins](https://www.npmjs.com/package/widdershins)