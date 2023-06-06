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
  <a href="https://discord.gg/Webemece5C"><img alt="Discord" src="https://img.shields.io/discord/955259353043173427?label=discord"></a>
</p>

# Nitric Examples

Example applications with the Nitric Framework demonstrating 'Infrastructure in code'.

Here you'll find examples writen with various languages including python and typescript. Each example can be deployed with Nitric for AWS, GCP and Azure or run locally.

> Note: Refer to the README of each project for setup instructions and more info as sometimes they are reliant on cloud services.

# Project Summary

## TypeScript

| Project Name                                      | Description                                                                   |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| [website-status](./website-status/)               | Perform a ping to check tosee if URL is available                             |
| [fan out](./fan-out/)                             | An example of fanning out processing for a simple multi-tenant application    |
| [openai-embeddings](./openai-embeddings/)         | Populate and query a vector db with embeddings of the nitric docs from openai |
| [middleware demo](./middleware-demo/)             | A simple example of middleware handlers                                       |
| [inventory](./product-inventory/)                 | Simple inventory with image upload and labels generation with AWS Rekognition |
| [user-onboarding](./user-onboarding/)             | Onboard a user and send them an email with AWS SES                            |
| [dynamic-load](./dynamic-load/)                   | A simple example of loading a node js resource dynamically within an API      |
| [upload-secure-url](./upload-secure-url/)         | Generate URLs to upload and download securely and directly from a Bucket      |
| [graphql-profile-api](./profile-api-graphql/)     | Use GraphQL to Create a reliable, scalable, and performant HTTP endpoint      |
| [semantic-simliarities](./semantic-simliarities/) | Compare a query vector with a vectorized dictionary for similarities          |
| [stripe-payments](./stripe-payments/)             | Simple example of setting up and redirecting to a stripe payment gateway.     |
| [cockroach-example](./cockroach-example/)         | Simple example of connecting to and adding entries into a cockroach db.       |
| [scheduled-tasks](./scheduled-tasks/)             | Delete the items in a bucket (e.g. S3) every 3 days.                          |
| [neon-postgres](./neon/)                          | Simple example of connecting to and querying a neon postgres auto-scaling db. |
