# Invoicer
Invoicer is a full-stack invoice management system which consists of a public website and API. 
Store, edit, share and send PEPPOL compliant e-Invoices with confidence!

![Invoicer Screenshot](https://github.com/patricklbell/invoicer/blob/main/docs/assets/images/screenshot.png?raw=true)
Access the [online demo](https://evening-caverns-68322.herokuapp.com/) (may take Heroku a few seconds to spin up)

## Documentation
The Invoicer API comes with extensive [documentation](https://evening-caverns-68322.herokuapp.com/docs)

## Tests
All the API routes are unit tested with mocha and chai, a github workflow ensures coverage is above 80% before deploying. This workflow also ensures the entire codebase is linted with eslint and stylelint.

## Deployment
Invoicer is currently continuously delivered to Heroku with a [github workflow](https://github.com/patricklbell/invoicer/blob/main/.github/workflows/heroku.yml), but there is also support for deployment with Elastic Beanstalk with a [different workflow](https://github.com/patricklbell/invoicer/blob/main/.github/workflows/eb.yml).

## Stack
An ExpressJS API is deployed to AWS Elastic Beanstalk or Heroku to handle API requests, this API interacts with MongoDB using the Atlas API to store users and invoices in a database. A separate frontend web application utilizing ReactJS is served statically by the API. Authentication is handled with stateless JWT tokens to avoid needing a CDN. Static documentation is also built with Hugo to be served statically.
