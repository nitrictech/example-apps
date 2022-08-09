## Description

Product inventory with image upload and labels generation with Rekognition. 

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

BUCKETNAME="images-{{bucket-id}}" 
```

> Note: Get the {{bucket-id}} from the created resource in S3 AWS Console.
> Note: You'll need to whitelist these emails with amazon to send emails.

### Step 3: Run the API locally with Nitric

```bash
yarn install
nitric run
```

### Step 4: Consume the API

Create a product 
```bash
curl --location --request POST '{{url}}' \
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