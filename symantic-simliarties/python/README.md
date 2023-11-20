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

## Project Description

Create a simliarities API method which finds similarities between words in your dictionary and your query based on cosign similarities.

## Usage

### Step 1: Install Nitric

Follow the steps in the [installation guide](https://nitric.io/docs/installation)

<br/>

### Step 2: Env variables

Create .env file based on the template and update the OpenAI key - you'll need this to generate your embedding vectors

### Step 3: Run the API locally with Nitric

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

### Step 4: Consume the API

```bash
curl --location 'http://localhost:4001/similarity' \
--header 'Content-Type: text/plain' \
--data '{
"search_term":"fritters"
}'
```

```bash
{
  "text": {
    "1": "potatoes",
    "6": "crispy",
    "7": "hamburger",
    "14": "french fries",
    "18": "cheeseburger"
  },
  "similarities": {
    "1": 0.8435876166,
    "6": 0.8820958004,
    "7": 0.8445682044,
    "14": 0.8992291243,
    "18": 0.8334017449
  }
}
```

> Note: That this example is more about illustrating vector based simliarties and assumes that your dataset is small. A more performant/cost effective solution would require pre-processed database of vector embeddings.

## What's next?

Explore the [Nitric framework](https://nitric.io/docs) to learn how to deploy to the cloud and much more.

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
