<p align="center">
  <a href="https://nitric.io">
    <img src="docs/assets/nitric-logo.svg" width="120" alt="Nitric Logo"/>
  </a>
</p>

<p align="center">
  A fast & fun way to build portable cloud-native applications
</p>

<p align="center">
  <img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/nitrictech/nitric?sort=semver">
  <img alt="GitHub" src="https://img.shields.io/github/license/nitrictech/nitric">
  <!-- <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/nitrictech/cli/total"> -->
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/nitrictech/nitric/Tests?label=build">
  <img alt="codecov" src="https://codecov.io/gh/nitrictech/nitric/branch/develop/graph/badge.svg?token=20TYFIQS2P">
  <!-- <a href="" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a> -->
  <a href="https://twitter.com/nitric_io">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/nitric_io?label=Follow&style=social">
  </a>
  <a href="https://discord.gg/Webemece5C"><img alt="Discord" src="https://img.shields.io/discord/955259353043173427?label=discord"></a>
</p>

## Project Description

Ping a website to determine if it's status is offline or online.

## Usage

### Step 1: Install Nitric

Follow the steps in the [installation guide](https://nitric.io/docs/installation)

### Step 2: Run your project locally Nitric

Refer to the README located in the language specific version of this project.

### Step 3: Test the API

Valid URL

```bash
curl --location 'http://localhost:4001/ping' \
--header 'Content-Type: text/plain' \
--data '{
    "url":"www.google.com"
}'
```

Invalid URL

```bash
curl --location 'http://localhost:4001/ping' \
--header 'Content-Type: text/plain' \
--data '{
    "url":"www.invalidurl123.com"
}'
```

## About Nitric

[Nitric](https://nitric.io) is a framework for rapid development of cloud-native and serverless applications. Define your apps in terms of the resources they need, then write the code for serverless function based APIs, event subscribers and scheduled jobs.

Apps built with Nitric can be deployed to AWS, Azure or Google Cloud all from the same code base so you can focus on your products, not your cloud provider.

Nitric makes it easy to:

- Create smart serverless functions and APIs
- Build reliable distributed apps that use events and/or queues
- Securely store, retrieve and rotate secrets
- Read and write files from buckets

## Documentation

The full documentation is available at [nitric.io/docs](https://nitric.io/docs).

We're completely opensource and encourage [code contributions](https://nitric.io/docs/contributions).

## Get in touch

- Ask questions in [GitHub discussions](https://github.com/nitrictech/nitric/discussions)

- Find us on [Twitter](https://twitter.com/nitric_io)

- Send us an [email](mailto:maintainers@nitric.io)
