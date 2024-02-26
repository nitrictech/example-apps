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

Create an API which captures profile information using graphQL.

## Usage

### Step 1: Install Nitric

Follow the steps in the [installation guide](https://nitric.io/docs/installation)

### Step 2: Run the API locally with Nitric

Start nitric services:

```bash
nitric start
```

Install dependencies and run your project:

```bash
pipenv install --dev
pipenv run dev
```

You'll see your services connect in your nitric start terminal.

> This will automatically restart when you make changes to your functions

### Step 3: Run your project.

We can use cURL, postman or any other HTTP Client to test our application, however it's better if the client has GraphQL support.

#### Get all Profiles using cURL

```bash
curl --location -X POST \
  'http://localhost:4001' \
  --header 'Content-Type: application/json' \
  --data-raw '{"query":"query { getProfiles { pid name age home }}","variables":{}}'
```

```json
{
  "data": {
    "getProfiles": [
      {
        "pid": "3f70ca58-25ed-4e88-8a45-eea1fbbb45d8",
        "name": "Tony Stark",
        "age": 53,
        "home": "Manhattan, New York City"
      },
      {
        "pid": "9c53bd95-199c-4151-a2a6-0da3ae24c29d",
        "name": "Peter Parker",
        "age": 22,
        "home": "Queens, New York City"
      },
      {
        "pid": "9ff191b0-0fbe-4e49-b944-85e79b5caa21",
        "name": "Steve Rogers",
        "age": 105,
        "home": "New York City"
      }
    ]
  }
}
```

#### Get a single profile

```bash
curl --location -X POST \
  'http://localhost:4001' \
  --header 'Content-Type: application/json' \
  --data-raw '{"query":"query { getProfile(pid: \"3f70ca58-25ed-4e88-8a45-eea1fbbb45d8\") { pid name age home }}","variables":{}}'

```

```json
{
  "data": {
    "getProfile": {
      "pid": "3f70ca58-25ed-4e88-8a45-eea1fbbb45d8",
      "name": "Tony Stark",
      "age": 53,
      "home": "Manhattan, New York City"
    }
  }
}
```

#### Create a profile

```bash
curl --location -X POST \
  'http://localhost:4001' \
  --header 'Content-Type: application/json' \
  --data-raw '{"query":"mutation { createProfile(profile: { name: \"Tony Stark\", age: 53, home: \"Manhattan, New York City\" }){ pid name age home }}","variables":{}}'
```

```json
{
  "data": {
    "getProfile": {
      "pid": "3f70ca58-25ed-4e88-8a45-eea1fbbb45d8",
      "name": "Tony Stark",
      "age": 53,
      "home": "Manhattan, New York City"
    }
  }
}
```

#### Update a profile

```bash
curl --location -X POST \
  'http://localhost:4001' \
  --header 'Content-Type: application/json' \
  --data-raw '{"query":"mutation { updateProfile(pid: \"3f70ca58-25ed-4e88-8a45-eea1fbbb45d8\",profile: { name: \"Peter Parker\", age: 22, home: \"Queens, New York City\" }){ pid name age home }}","variables":{}}'
```

```json
{
  "data": {
    "getProfile": {
      "pid": "3f70ca58-25ed-4e88-8a45-eea1fbbb45d8",
      "name": "Peter Parker",
      "age": 22,
      "home": "Queens, New York City"
    }
  }
}
```

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
