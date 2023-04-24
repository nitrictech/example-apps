<p align="center">
  <a href="https://nitric.io">
    <img src="https://github.com/nitrictech/nitric/raw/develop/docs/assets/nitric-logo.svg" width="120" alt="Nitric Logo"/>
  </a>
</p>

<h3 align="center">A cloud framework with infrastructure in code</h3>

<p align="center">
  <img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/nitrictech/nitric?style=for-the-badge">
  <img alt="GitHub" src="https://img.shields.io/github/license/nitrictech/nitric?style=for-the-badge">
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/nitrictech/nitric/test.yaml?branch=develop&style=for-the-badge">
  <img alt="Codecov" src="https://img.shields.io/codecov/c/github/nitrictech/nitric?style=for-the-badge">
  <a href="https://discord.gg/Webemece5C"><img alt="Discord" src="https://img.shields.io/discord/955259353043173427?label=discord&style=for-the-badge"></a>
</p>

## Project Description

Onboard a user and send them an email with AWS SES

![Archictecture](arch_diagram.png)

## Usage

### Step 1: Install Nitric

Follow the steps in the [installation guide](https://nitric.io/docs/installation)

<br/>

### Step 2: AWS Configuration

```bash
mv .env-template .env
```

```
AWS_SES_REGION="us-east-1"
AWS_SES_ACCESS_KEY_ID="..."
AWS_SES_SECRET_ACCESS_KEY="..."

SENDER_EMAIL="..."
```

> Note: You'll need to whitelist these emails with amazon to send emails

### Step 3: Run the API locally with Nitric

```bash
yarn install
yarn run dev
```

### Step 4: Consume the API

```bash
curl --location --request POST 'http://{{url}}/customers' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "firstname": "Test",
    "lastname": "User",
    "email" : "user@email.com"
}'
```

## What's next?

Explore the [Nitric framework](https://nitric.io/docs) to learn how to deploy to the cloud and much more.

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

## Status

Nitric is currently in Public Preview. Anyone can use or deploy applications, but work remains and changes are likely. We’d love your feedback as we build additional functionality!

## Get in touch

- Ask questions in [GitHub discussions](https://github.com/nitrictech/nitric/discussions)

- Find us on [Twitter](https://twitter.com/nitric_io)

- Send us an [email](mailto:maintainers@nitric.io)## Description
