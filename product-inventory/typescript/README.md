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

Product inventory with image upload and labels generation with Rekognition.

## Usage

### Step 1: Install Nitric

Follow the steps in the [installation guide](https://nitric.io/docs/installation)

### Step 2: AWS Configuration

Update env settings

```bash
mv env-template .env
```

```
AWS_SES_REGION="us-east-1"
AWS_SES_ACCESS_KEY_ID="..."
AWS_SES_SECRET_ACCESS_KEY="..."

SENDER_EMAIL="..."
SYS_ADMIN_EMAIL="..."
```

> Note: Get the {{bucket-id}} from the created resource in S3 AWS Console - this is required by the request to Rekognition.
> Note: You'll need to whitelist these emails with amazon to send emails.

### Step 3: Run the API locally with Nitric

```bash
yarn install
yarn run dev
```

### Step 4: Deploy to the cloud

```bash
nitric up
```

### Step 5: Consume the API

Create a product

```bash
curl --location --request POST 'https://XXXXXXXXXXXXXX.amazonaws.com/products' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "name": "Dog",
    "description" : "Best friend!"
}'
```

```bash
{
    "msg": "Product with id {{id}} created."
}
```

Get the photo upload URL

```bash
curl --location --request GET 'https://{{url}}/products/{{id}}/image/upload'
```

```bash
{
    "url": "..."
}
```

Get product info (with Rekognition labels)

```bash
curl --location --request GET 'https://{{url}}/products/{{id}}'
```

```bash
{
    "description": "Best friend.",
    "labels": {
        "Labels": [
            {
                "Name": "Dog",
                "Confidence": 99.73765563964844,
                "Instances": [
                    {
                        "BoundingBox": {
                            "Width": 0.7164074778556824,
                            "Height": 0.8895376324653625,
                            "Left": 0.1641775667667389,
                            "Top": 0.10807080566883087
                        },
                        "Confidence": 99.73765563964844
                    }
                ]
                ...
                ...
        "LabelModelVersion": "2.0"
    },
    "name": "Dog",
    "rekognition": true,
    "url": "..."
}
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
