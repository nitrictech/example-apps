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

> 🚧 This repository is no longer actively maintained, for up-to-date examples see our [examples repo](https://github.com/nitrictech/examples) 🚧

# Nitric Examples

Example applications with the Nitric Framework demonstrating 'Infrastructure in code'.

Here you'll find examples writen with various languages including python and typescript. Each example can be deployed with Nitric for AWS, GCP and Azure or run locally.

> Note: Refer to the README of each project for setup instructions and more info as sometimes they are reliant on cloud services.

The projects are created with our latest version `v1`.

# Project Summary

| Project Name                                  | Description                                                                                         |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [auth-firebase](./auth-firebase/)             | Integrate with Firebase Auth                                                                        |
| [website-status](./website-status/)           | Perform a ping to check tosee if URL is available                                                   |
| [openai-embeddings](./openai-embeddings/)     | Populate and query a vector db with embeddings of the nitric docs from openai                       |
| [middleware demo](./middleware-demo/)         | A simple example of middleware handlers                                                             |
| [inventory](./product-inventory/)             | Simple inventory with image upload and labels generation with AWS Rekognition                       |
| [user-onboarding](./user-onboarding/)         | Onboard a user and send them an email with AWS SES                                                  |
| [uptime-monitoring](./uptime-monitoring/)     | A website uptime monitor using Events, APIs and Schedules                                           |
| [dynamic-load](./dynamic-load/)               | A simple example of loading a node js resource dynamically within an API                            |
| [upload-secure-url](./upload-secure-url/)     | Generate URLs to upload and download securely and directly from a Bucket                            |
| [graphql-profile-api](./profile-api-graphql/) | Use GraphQL to Create a reliable, scalable, and performant HTTP endpoint                            |
| [stripe-payments](./stripe-payments/)         | Simple example of setting up and redirecting to a stripe payment gateway.                           |
| [cockroach-example](./cockroach-example/)     | Simple example of connecting to and adding entries into a cockroach db.                             |
| [scheduled-tasks](./scheduled-tasks/)         | Delete the items in a bucket (e.g. S3) every 3 days.                                                |
| [neon-postgres](./neon/)                      | Simple example of connecting to and querying a neon postgres auto-scaling db.                       |
| [neon-tasklist](./neon-tasklist/)             | Create a task list with a Neon pg database.                                                         |
| [cloudflare-lb](./cloudflare-lb/)             | Deploy a multi-cloud application with a cloudflare loadbalanced application                         |
| [surveys-auth0](./surveys-auth0/)             | A survey app with NextJS frontend with and without Auth0 integration to save and resume application |
| [nitric-express](./nitric-express/)           | A secure URL upload demonstrating usage with Nitric and Express framework                           |
| [nitric-koa](./nitric-koa/)                   | A secure URL upload demonstrating usage with Nitric and KOA framework                               |
| [nitric-hono](./nitric-hono/)                 | A secure URL upload demonstrating usage with Nitric and Hono                                        |
| [nitric-fastify](./nitric-fastify/)           | A secure URL upload demonstrating usage with Nitric and fastify                                     |
| [websockets](./websockets/)                   | A basic websockets example                                                                          |
| [real-time-chat](./realtime-chat-app/)        | A realtime chat using Websockets, Next.js, Nitric and Clerk                                         |
| [scheduled-report](./scheduled-report/)       | A scheduled report generated with Google Sheets and shared with Google Drive                        |
