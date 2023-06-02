---
title: "Quick Start"
lead: "One page summary of how to use Invoicer API with JS"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 110
toc: true
---

## Requirements

- [Node.js](https://nodejs.org/) — latest LTS version or newer

{{< details "Why Node.js?" >}}
This tutorial uses the npm (included with Node.js) package axios to simplify requests, but you could use the [builtin libraries](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) just as well.
{{< /details >}}

## Setup a NodeJS project

Create a project, install dependencies, and run the file.

### Create a project

Make a new directory and enter it. Follow the instructions from `npm init` to create a new project.

```bash
mkdir example-project
cd example-project
npm init
```

### Install dependencies

```bash
npm install axios
```

## Create a user and obtain a token

Create a javascript module in your project, for example `index.mjs`. We will use axios to send a `/user/signup` request to create a new user and `/user/login` to obtain an authentication token. For more details see [/user/login](/docs/api/routes/#post-userlogin) and [/user/signup](/docs/api/routes/#post-usersignup).

{{< alert icon="⚠️" text="Settings api to true in the login body creates a permanent token (doesn't expire), this is equivalent to a password so be careful how you store it" />}}

```javascript
import axios from 'axios';
const URL = <deployment url>
...
// Create a new user, this can be done using the Invoicer website as well
await axios.post(URL + "/user/signup", {
  username: "<username>",
  firstname: "Example",
  lastname: "User",
  email: "example@example.com",
  password: "password",
});

// Get token for your user
let res = await axios.post(URL + "/user/login", {
  username: "exampleuser",
  password: "password",
  api: true
});

const token = res.data.token;
```

{{< alert icon="ℹ️" text="Replace <strong>&lt;deployment url&gt;</strong> with the deployment you want to use and <strong>&lt;username&gt;</strong> with a unique username" />}}

Now we can use this token to authenticate our requests.

## Store and Retrieve Invoices

Send a post request to `/invoice` to create an invoice, for more details see [/invoice](/docs/api/routes/#post-invoice).
```javascript
// Create an invoice
await axios.post(
  URL + "/invoice",
  {
    contentsXml: "<Invoice></Invoice>",
    documentTitle: "Title",
    totalInvoiceValue: 0,
    supplierName: "supplier",
    recipientName: "recipient",
  },
  {
    headers: { token },
  }
);
```


Retrieve a list of the users invoices, for more details see [/invoices/feed](/docs/api/routes/#get-invoicesfeed).
```javascript
// Print a list of your invoices
res = await axios.get(URL + "/invoices/feed", {
  headers: { token },
});

console.log(res.data);
```

Running your file, you should see the invoice you just created.
```bash
node index.js
```
For example
```
{
  page: [
    {
      ...
      contentsXml: '<Invoice></Invoice>',
      documentTitle: 'Title',
      totalInvoiceValue: 0,
      supplierName: 'supplier',
      recipientName: 'recipient',
      ...
    }
  ],
  total: 1
}
```