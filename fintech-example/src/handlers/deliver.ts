import { submissionTopic } from "../resources";
import { FormData } from "../forms/form/schema";

const workflowToken = process.env.ALLOY_WORKFLOW_TOKEN;
const workflowSecret = process.env.ALLOY_WORKFLOW_SECRET;
const apiBaseUrl = process.env.ALLOY_BASE_URL;
const journeyToken = process.env.ALLOY_JOURNEY_TOKEN;

export const getBasicAuthToken = () => {
  return `Basic ${Buffer.from(`${workflowToken}:${workflowSecret}`).toString(
    "base64"
  )}`;
};

const alloyPayload = (data: FormData) => {
  const { primary } = data;

  return JSON.stringify({
    persons: [
      {
        birth_date: primary.birthDate,
        name_first: primary.firstName,
        name_last: primary.lastName,
        document_ssn: primary.taxId,
        phone_number: primary.phone,
        email_address: primary.email,
        addresses: [
          {
            type: "primary",
            city: primary.address.city,
            state: primary.address.state,
            line_1: `${primary.address.streetNumber} ${primary.address.street}`,
            postal_code: primary.address.postCode,
          },
        ],
      },
    ],
  });
};

submissionTopic.subscribe(async (ctx) => {
  const submission = ctx.req.json().payload;
  const payload = alloyPayload(submission.data);

  console.log(`Delivering submission ${submission.submissionId}`);

  if (apiBaseUrl && journeyToken) {
    const apiUrl = apiBaseUrl + journeyToken + "/applications";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: getBasicAuthToken(),
        "Content-Type": "application/json",
        "alloy-journey-application-sync": "true",
      },
      body: payload,
    });

    const output = await response.json();
    console.log(JSON.stringify(output, null, 4));

    ctx.res.success = true;
  }
  ctx.res.success = false;
});
