## Description

Dynamically load modules for use in a sample API developed with Nitric.

## Usage

### Step 1: Install Nitric

<details>
 <summary>Prerequisites</summary>

- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/)
- [Pulumi](https://www.pulumi.com/docs/reference/cli/)

</details>

<details>
 <summary>MacOs</summary>

Install with [homebrew](https://brew.sh/)

```bash
brew install nitrictech/tap/nitric
```

</details>

<details>
 <summary>Windows</summary>

Install with [scoop](https://scoop.sh/)

```
scoop bucket add nitric https://github.com/nitrictech/scoop-bucket.git
scoop install nitric
```

</details>

<details>
 <summary>Linux</summary>
 
Download as a scripted install via curl.

```bash
curl https://nitric.io/install | bash

```

 </details>

<br/>

> Note: Complete installation guide can be found [here](https://nitric.io/docs/installation)

<br/>

### Step 2: Run the API locally with Nitric

```bash
yarn install
nitric run
```

### Step 3: Consume the API

```bash
curl http://localhost:9001/apis/main/hello/cat
```

```bash
{"message":"meow"}
```

```bash
curl http://localhost:9001/apis/main/hello/donkey
```

```bash
{"message":"No greeting module found for animal - donkey"}
```

## What's next?

Explore the [Nitric framework](https://nitric.io/docs) to learn how to deploy to the cloud and much more.
