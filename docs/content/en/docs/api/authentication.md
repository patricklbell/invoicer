---
title: "Authentication"
description: "Authentication of API."
date: 2023-03-17
lastmod: 2023-03-17
draft: false
images: []
menu:
  docs:
    parent: "API"
toc: true
weight: 200
---
<br/>

There are different methods to authenticate a request. For a code example see the [quickstart guide](/docs/prologue/quick-start).

## Bearer Tokens

Add a bearer token to the HTTP headers. The token can be obtained by [logging in](../routes/#post-userlogin) to a user.

`Authorization: Bearer <token>`

## Classic

Alternatively the same token can be added to the 'token' header as so

`token: <token>`