---
title: "Introduction"
lead: "Invoicer is a full stack invoice management system which consists of a public website and API. This site documents the Invoicer API, which can be used to store and search invoices with complete flexibility."
date: 2020-10-06T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 100
toc: true
---

## Get started

### Quick Start

{{< alert icon="👉" text="The Quick Start is intended for intermediate to advanced users." />}}

One page summary of how to use the Invoicer API in a javascript project. [Quick Start →]({{< relref "quick-start" >}})

## Go further

The full API documentation for every routes. [API →](/docs/api/routes)

## Open API Documentation

The old Swagger UI documentation. [Swagger →](/swagger)

## Architecture

An [Express.js](https://expressjs.com/) API is deployed to [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) or [Heroku](https://www.heroku.com/) to handle API requests, this API interacts with [MongoDB Atlas](https://www.mongodb.com/atlas/database) to store users and invoices in a database. The frontend web application utilizing [React.js](https://react.dev/) leverages is served statically with this API, together with these docs.
