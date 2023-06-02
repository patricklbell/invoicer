---
title: "Changelog"
description: "History of changes to the API."
date: 2023-03-17
lastmod: 2023-03-17
draft: false
images: []
menu:
  docs:
    parent: "API"
weight: 400
toc: true
---
<br/>

This page contains a list of the changes which were made to the API, potentially breaking changes will be marked with ⚠️.

## Changes
➕ GET /user/{id}

➕ PATCH /user/{id}

➕ DELETE /user/{id}

➕ GET /users/search

➕ POST /invoice/permissions/{id}

➕ POST /invoice/view/{id} and /invoice/view

➕ POST /invoice/send/{id}

ℹ️ Internal XML parser into JSON moved from `xml2js` to `fast-xml-parser`