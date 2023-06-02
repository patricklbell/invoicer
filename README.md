# Invoicer
Invoicer is a full-stack invoice management system which consists of a public website and API.

## Stack
An ExpressJS API (running on NodeJS) is deployed to AWS Elastic Beanstalk or Heroku to handle API requests, this API interacts with MongoDB using the Atlas API to store users and invoices in a database. A separate frontend web application utilizing ReactJs is served statically by the API. Authentication is handled with stateless JWT tokens to avoid paying for a CDN.
