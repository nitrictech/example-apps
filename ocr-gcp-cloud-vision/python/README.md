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

## Project Description

An example for implementing simple Nitric-based APIs for a mock OCR use-case which uses the Google Cloud Vision API.

## About OCR

OCR (Optical Character Recognition) enables a user to detect and extract text from images and documents.

## User Journeys (exposed API operations)

1. A user should be able to create their user profile.
2. A user should be able to retrieve details of their user profile. No security patterns like Authorization, Authentication, Identification, etc. have been enforced as the shown APIs are for demonstration purposes only. A sample (written in JavaScript) for security could be found at: [Secure APIs with Auth0](https://nitric.io/docs/guides/getting-started/nodejs/secure-api-auth0)
3. A user should be able to upload an image (single, for demo purposes). The image upload API should only work for users who have their user profiles created.
   Note: No Authorization, Authentication, Identification, etc. patterns have been applied and the request is validated just based on the correct UUID (for user profile).
4. A user should be able to retrieve the text corresponding to the uploaded image; OCR is applied on the image to retrieve text from the image. The detected text is uploaded to the user's profile metadata and the same should be retrievable from the API that returns a user's profile information based on the UUID supplied.

## Where to Run

This Nitric-powered Python application can be run on any supported provider (AWS, GCP, Azure, etc.). However, since the application makes use of the Google Cloud Vision API, having access to the same is necessary. If extending from this codebase, the Google Cloud Vision API could be replaced by the OCR API of choice.

## Usage - Work In Progress

### Step 1: Install Nitric

Follow the steps in the [installation guide](https://nitric.io/docs/installation)

### Step 2: Setup Google Cloud Vision API

### Step 3: Run your Nitric project locally

```bash
pipenv install --dev
nitric start
```

### Step 4: Test the locally deployed APIs

### Step 5: Deploy Nitric project on cloud

### Step 6: Test the APIs deployed on cloud

## About Nitric

[Nitric](https://nitric.io) is a framework for rapid development of cloud-native and serverless applications. Define your apps in terms of the resources they need, then write the code for serverless function based APIs, event subscribers and scheduled jobs.

Apps built with Nitric can be deployed to AWS, Azure or Google Cloud all from the same code base so you can focus on your products, not your cloud provider.

Nitric makes it easy to:

- Create smart serverless functions and APIs
- Build reliable distributed apps that use events and/or queues
- Securely store and retrieve secrets
- Read and write files from buckets

## Documentation

The full documentation is available at [nitric.io/docs](https://nitric.io/docs).

We're completely open-source and encourage [code contributions](https://nitric.io/docs/contributions).

## Get in touch

- Ask questions in [GitHub discussions](https://github.com/nitrictech/nitric/discussions)

- Find us on [Twitter](https://twitter.com/nitric_io)

- Send us an [email](mailto:maintainers@nitric.io)

- Jump into our [Discord server](https://nitric.io/chat)

## Disclaimer

This codebase is not production-ready and is meant for demonstration purposes only. The codebase doesn't necessarily cover API design and security best practices.
