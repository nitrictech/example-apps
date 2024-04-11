"""
About the Module:
Module for implementing simple Nitric-based APIs for
a mock OCR use-case which uses the Google Cloud Vision API.

About OCR:
OCR (Optical Character Recognition) enables a user
to detect and extract text from images and documents.

User Journeys (exposed API operations):
1. A user should be able to create their user profile.
2. A user should be able to retrieve details of their user profile.
No security patterns like Authorization, Authentication, Identification, etc.
have been enforced as the shown APIs are for demonstration purposes only.
A sample (written in JavaScript) for security could be found at:
https://nitric.io/docs/guides/getting-started/nodejs/secure-api-auth0
3. A user should be able to upload an image (single, for demo purposes).
The image upload API should only work for users who have their
user profiles created.
Note: No Authorization, Authentication, Identification, etc. patterns
have been applied and the request is validated just based on the correct
UUID (for user profile).
4. A user should be able to retrieve the text corresponding to the
uploaded image; OCR is applied on the image to retrieve text from the image.
The detected text is uploaded to the user's profile metadata and the same
should be retrievable from the API that returns a user's profile information
based on the UUID supplied.

Where to Run:
This Nitric-powered Python application can be run on any supported
provider (AWS, GCP, Azure, etc.). However, since the application makes
use of the Google Cloud Vision API, having access to the same is necessary.
If extending from this codebase, the Google Cloud Vision API could be replaced
by the OCR API of choice.

Disclaimer:
This codebase is not production-ready and is meant
for demonstration purposes only. The codebase doesn't necessarily
cover API design and security best practices.
"""

# Import the built-in Python packages/libraries.
import json
from datetime import UTC, datetime, timedelta
from uuid import uuid4

# Import the third-party Python packages/libraries or SDKs.
from google.cloud import vision
from nitric.application import Nitric
from nitric.context import HttpContext
from nitric.resources import api, bucket, kv

# Create a Nitric-powered API for the mock OCR use-case.
ocr_api = api("ocr-api")

# Create a Nitric-powered Key-Value Store for storing users'
# profiles and related metadata.
# Also, define the IAM permission categories for the permissions
# which the Python application should be having to the Key-Value
# Store; 'get' and 'set' permissions have been given for the
# 'user_profiles_kv' Key-Value Store.
user_profiles_kv = kv("user_profiles_kv").allow("get", "set")

# Create a Nitric-powered Storage Bucket for storing photos
# which the users could be uploading.
# A user can upload only one photo, as of this demo.
# `reading` and `writing` permissions should be provided
# to this Python application for performing read/write
# operations on the Storage Bucket.
photo_bucket = bucket("photos")
photos = photo_bucket.allow("reading", "writing")


@ocr_api.post("/profiles")
async def create_user_profile(ctx: HttpContext) -> None:
    """
    A POST API to create a user's profile and store
    it in a Key-Value store.

    Args:
        ctx (HttpContext): HTTP Request and Response context for the API.
    """
    # Generate a unique profile id for the user.
    user_profile_id = str(uuid4())

    # Initialize a set of JSON keys which should be present in the
    # HTTP Request Payload.
    required_json_payload_keys = {"name", "age", "city"}

    # If HTTP Request JSON Payload is not empty, proceed with user profile
    # creation, else return an error.
    if ctx.req.json is not None:
        # Check the difference between the desired HTTP Request JSON Payload
        # keys and the ones sent over the actual HTTP Request.
        missing_json_payload_keys = required_json_payload_keys - set(ctx.req.json)

        # If any required keys are missing in the HTTP Request JSON Payload,
        # return an HTTP 400 Bad Request response.
        if missing_json_payload_keys:
            ctx.res.status = 400
            ctx.res.body = {
                "msg": f"Bad Request. Missing required keys: {missing_json_payload_keys}."
            }
            # Return `None` to break the flow and return the intended response.
            return
    else:
        # Return an HTTP 400 Bad Request response in case the HTTP Request JSON Payload
        # is empty.
        ctx.res.status = 400
        ctx.res.body = {
            "msg": f"Bad Request. Missing required keys: {required_json_payload_keys}."
        }
        # Return `None` to break the flow and return the intended response.
        return

    # Store the user profile details in the Key-Value Store.
    # It should be noted that a Python dictionary is expected as the value for the key.
    # Therefore, when retrieving the data from the Key-Value Store, if JSON processing needs to
    # be done, a `json.dumps(data)` would help.
    try:
        await user_profiles_kv.set(
            user_profile_id,
            {
                "name": ctx.req.json["name"],
                "age": ctx.req.json["age"],
                "city": ctx.req.json["city"],
            },
        )

        # Return an HTTP 200 OK message stating that the creation of the user profile
        # happened successfully.
        ctx.res.body = {
            "msg": f"Profile with id '{user_profile_id}' created successfully."
        }
        # Return `None` to break the flow and return the intended response.
        return
    except Exception:
        # Return an HTTP 500 Internal Server Error response in case the Key-Value Store
        # specific `set` operation didn't succeed.
        ctx.res.status = 500
        ctx.res.body = {
            "msg": "An Internal Server Error happened. User profile creation failed."
        }
        # Return `None` to break the flow and return the intended response.
        return


@ocr_api.get("/profiles/:id")
async def get_user_profile(ctx: HttpContext) -> None:
    """
    A GET API to retrieve a user's profile details.

    Args:
        ctx (HttpContext): HTTP Request and Response context for the API.
    """
    # Get the profile id of the user from the HTTP Request.
    user_profile_id = ctx.req.params["id"]

    # Retrieve the details for the user's profile.
    try:
        profile_details = await user_profiles_kv.get(user_profile_id)
        ctx.res.headers["Content-Type"] = "application/json"
        ctx.res.body = f"{json.dumps(profile_details)}"
    except Exception:
        # Return an HTTP 500 Internal Server Error response in case the Key-Value Store
        # specific `get` operation didn't succeed.
        ctx.res.status = 500
        ctx.res.body = {
            "msg": "An Internal Server Error happened. User profile couldn't be fetched or doesn't exist."
        }
        return


@ocr_api.get("/profiles/:id/image/upload")
async def upload_image(ctx: HttpContext) -> None:
    """
    A GET API to retrieve a Signed URL for uploading
    the image.

    Args:
        ctx (HttpContext): HTTP Request and Response context for the API.
    """
    # Get the profile id of the user from the HTTP Request.
    user_profile_id = ctx.req.params["id"]

    # Generate a Signed URL which is valid for a defined duration.
    # It should be noted that having user identifiable information in
    # the URL or HTTP Payload is not a good security practice and could expose the APIs
    # to OWASP API and Web Application exploits. The shown Signed URL
    # generation scheme is just for demonstration purposes.
    photo_url = await photos.file(f"images/{user_profile_id}/photo.png").upload_url(
        expiry=timedelta(seconds=(3600))
    )

    # Set the expiry duration so that the same can be passed in the HTTP Response
    # headers.
    expires = (datetime.now(UTC) + timedelta(seconds=(3600))).strftime(
        "%a, %d %b %Y %H:%M:%S GMT"
    )
    ctx.res.headers["Expires"] = expires

    # Set the HTTP Response body.
    ctx.res.body = photo_url


@photo_bucket.on("write", "images")
async def on_photo_upload(ctx) -> None:
    """
    A Storage Bucket Notification Trigger that performs
    OCR on the uploaded image and updates the user's profile in
    the Key-Value Store.

    Args:
        ctx (_type_): Context for the bucket notification trigger.

    Raises:
        Exception: Raise an exception in case the OCR API'ss response returned an error.
    """
    # Instantiate the Image Annotator Client for Google Cloud Vision API.
    client = vision.ImageAnnotatorClient()

    # Get the context of the request and retrieve the name of the image that
    # got written to the Storage Bucket.
    content = await photos.file(ctx.req.key).read()

    # Define the image to perform OCR operation on.
    image = vision.Image(content=content)

    # Perform text detection on the uploaded image and store the text response.

    response = client.text_detection(image=image)  # pylint: disable=no-member

    # Retrieve the text annotations from the OCR's response.
    texts = response.text_annotations

    # Raise an exception in case the OCR API's response returned an error.
    if response.error.message:
        raise Exception(
            f"{response.error.message} - For more info on error messages, check out: 'https://cloud.google.com/apis/design/errors'."
        )

    # Retrieve the user's profile id from the context.
    user_profile_id = str(ctx.req.key.split("/")[1])

    # Retrieve user's profile details from the Key-Value Store.
    user_profile_details = await user_profiles_kv.get(user_profile_id)

    # Update the user's profile details in the Key-Value Store with the annotated text.
    user_profile_details["annotated_text"] = texts[0].description.replace("\n", " ")

    # Update the 'user_profiles_kv' with the annotated text for the uploaded image.
    await user_profiles_kv.set(user_profile_id, user_profile_details)


# Start the Nitric application.
Nitric.run()
