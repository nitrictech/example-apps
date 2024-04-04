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

Generate a scheduled report with Google Sheets and share it with Google Drive.

## Usage

### Step 1: Install Nitric

Follow the steps in the [installation guide](https://nitric.io/docs/installation)

### Step 2: Create Google credentials file and update environment variables

1. Login into Google Cloud and create a new project.
2. Ensure the Google Sheets and Drive APIs are enabled for your project.
3. Navigate to "IAM & Admin" > "Service Accounts".
   Click "Create Service Account", enter the account details, and confirm by clicking "Create".
4. Inside the service account details, go to the "Keys" section.
   Select "Add Key" > "Create new key", choose "JSON", and click "Create" to download the credentials file.
5. Rename env.template to .env and update the values.

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-file.json
ADMIN_EMAIL=admin@example.com
```

### Step 3: Run your Nitric project locally

```bash
pipenv install --dev
nitric start
```

The schedule can be triggered from the local dashboard.

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
