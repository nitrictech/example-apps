<p align="center">
  <a href="https://nitric.io">
    <img src="https://raw.githubusercontent.com/nitrictech/nitric/main/docs/assets/nitric-logo.svg" width="120" alt="Nitric Logo"/>
  </a>
</p>

<p align="center">
  A fast & fun way to build portable cloud-native applications
</p>

<p align="center">
  <img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/nitrictech/nitric?sort=semver">
  <a href="https://twitter.com/nitric_io">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/nitric_io?label=Follow&style=social">
  </a>
  <a href="https://nitric.io/chat"><img alt="Discord" src="https://img.shields.io/discord/955259353043173427?label=discord"></a>
</p>

# Nitric Examples

Example applications with the Nitric Framework demonstrating 'Infrastructure in code'.

Here you'll find examples writen with various languages including python and typescript. Each example can be deployed with Nitric for AWS, GCP and Azure or run locally.

> Note: Refer to the README of each project for setup instructions and more info as sometimes they are reliant on cloud services.

The projects are separated into a our archived `v0` framework and our latest version `v1`.

# Project Summary

## TypeScript

| Project Name                                         | Description                                                                                         |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [website-status](./v1/website-status/)               | Perform a ping to check tosee if URL is available                                                   |
| [fan out](./v1/fan-out/)                             | An example of fanning out processing for a simple multi-tenant application                          |
| [openai-embeddings](./v1/openai-embeddings/)         | Populate and query a vector db with embeddings of the nitric docs from openai                       |
| [middleware demo](./v1/middleware-demo/)             | A simple example of middleware handlers                                                             |
| [inventory](./v1/product-inventory/)                 | Simple inventory with image upload and labels generation with AWS Rekognition                       |
| [user-onboarding](./v1/user-onboarding/)             | Onboard a user and send them an email with AWS SES                                                  |
| [dynamic-load](./v1/dynamic-load/)                   | A simple example of loading a node js resource dynamically within an API                            |
| [upload-secure-url](./v1/upload-secure-url/)         | Generate URLs to upload and download securely and directly from a Bucket                            |
| [graphql-profile-api](./v1/profile-api-graphql/)     | Use GraphQL to Create a reliable, scalable, and performant HTTP endpoint                            |
| [semantic-similarities](./v1/semantic-similarities/) | Compare a query vector with a vectorized dictionary for similarities                                |
| [stripe-payments](./v1/stripe-payments/)             | Simple example of setting up and redirecting to a stripe payment gateway.                           |
| [cockroach-example](./v1/cockroach-example/)         | Simple example of connecting to and adding entries into a cockroach db.                             |
| [scheduled-tasks](./v1/scheduled-tasks/)             | Delete the items in a bucket (e.g. S3) every 3 days.                                                |
| [neon-postgres](./v1/neon/)                          | Simple example of connecting to and querying a neon postgres auto-scaling db.                       |
| [neon-tasklist](./v1/neon-tasklist/)                 | Create a task list with a Neon pg database.                                                         |
| [cloudflare-lb](./v1/cloudflare-lb/)                 | Deploy a multi-cloud application with a cloudflare loadbalanced application                         |
| [surveys-auth0](./v1/surveys-auth0/)                 | A survey app with NextJS frontend with and without Auth0 integration to save and resume application |
| [nitric-express](./v1/nitric-express/)               | A secure URL upload demonstrating usage with Nitric and Express framework                           |
| [nitric-koa](./v1/nitric-koa/)                       | A secure URL upload demonstrating usage with Nitric and KOA framework                               |
| [nitric-hono](./v1/nitric-hono/)                     | A secure URL upload demonstrating usage with Nitric and Hono                                        |
| [nitric-fastify](./v1/nitric-fastify/)               | A secure URL upload demonstrating usage with Nitric and fastify                                     |
| [websockets](./v1/websockets/)                       | A basic websockets example                                                                          |
| [real-time-chat](./v1/realtime-chat-app/)            | A realtime chat using Websockets, Next.js, Nitric and Clerk                                         |
