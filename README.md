# Invoicer
Invoicer is a full-stack invoice management system which consists of a public website and an API. 
Store, edit, share and send [PEPPOL](https://peppol.org/) e-Invoices with confidence!

![Invoicer Screenshot](https://github.com/patricklbell/invoicer/blob/main/docs/assets/images/screenshot.png?raw=true)
Access the [online demo](https://invoicer-3l9i.onrender.com/) (may take a few seconds to spin up)

## Documentation
The Invoicer API comes with extensive [documentation](https://invoicer-3l9i.onrender.com/docs)

## Tests
An [Github action](https://github.com/patricklbell/invoicer/blob/main/.github/workflows/CI.yml) ensures all the API routes are unit tested with mocha and chai, and coverage is above 80% before deploying. It also ensures the entire codebase is linted with eslint and stylelint.

## Deployment
Invoicer supports continuously delivery to [Heroku](https://github.com/patricklbell/invoicer/blob/main/.github/workflows/heroku.yml), and [AWS Elastic Beanstalk](https://github.com/patricklbell/invoicer/blob/main/.github/workflows/eb.yml) with Github actions.

## Stack
An ExpressJS API is deployed to handle API requests, this API interacts with MongoDB using the Atlas API to store users and invoices in a database. A separate frontend web application utilizing ReactJS is served statically by the API. Authentication is handled with stateless JWT tokens to avoid needing a CDN. Documentation is also built with Hugo to be served statically.
