import { collection } from "@nitric/sdk";
import { v4 as uuid } from "uuid";
import { FormData, FormDataPartial, FormModel, Submission } from "../forms";
import { submissionTopic } from "./topics";

const submissionEvents = submissionTopic.for("publishing");
type SurveySubmission = Submission<FormDataPartial>;

const newSubmissionId = (): string => {
  return uuid().split("-")[0];
};

const surveyCollection = collection<SurveySubmission>("submissions").for(
  "writing",
  "reading",
  "deleting"
);

type StoreResult =
  | { success: true; submissionId: string }
  | { success: false; error: any };

const getSubmission = async (
  submissionId?: string
): Promise<SurveySubmission | undefined> => {
  if (!submissionId) {
    return;
  }
  try {
    const allSubmissions = await surveyCollection.get("submissions");
    return allSubmissions.find((s) => s.submissionId === submissionId);
  } catch (err) {
    return;
  }
};

// TODO: Remove me - this is a convenience method for development...
const getAllSubmissions = async () => {
  try {
    return await surveyCollection.get("submissions");
  } catch (err) {
    return;
  }
};

// TODO: Remove me - this is a convenience method for development...
const deleteAllSubmissions = async () => {
  try {
    await surveyCollection.delete("submissions");
  } catch (err) {
    return;
  }
};

// TODO: This should be done with a where, but it won't query 5 levels deep into the json.
const getSubmissionIdsByEmail = async (email?: string) => {
  if (!email) {
    return;
  }
  try {
    const results = await surveyCollection.get("submissions");

    const collectedData = results
      .filter(
        (doc) =>
          doc?.content?.data?.primary?.email === email &&
          doc?.content?.status == "saved"
      )
      .map((doc) => ({
        email: doc?.content?.data?.primary?.email,
        id: doc?.content?.submissionId,
      }));
    return collectedData;
  } catch (err) {
    return;
  }
};

const removeEmptyOrNull = (obj: { [x: string]: any }) => {
  Object.keys(obj).forEach(
    (k) =>
      (obj[k] && typeof obj[k] === "object" && removeEmptyOrNull(obj[k])) ||
      (!obj[k] && obj[k] !== undefined && delete obj[k])
  );
  return obj;
};

export const surveyStore = {
  get: getSubmission,
  getSubmissions: getAllSubmissions,
  reset: deleteAllSubmissions,
  getSubmissionsByEmail: getSubmissionIdsByEmail,
  save: async (data: any, submissionId?: string): Promise<StoreResult> => {
    const existing = await getSubmission(submissionId);
    if (submissionId && !existing) {
      return { success: false, error: "not found" };
    }
    if (existing && existing.status === "submitted") {
      return { success: false, error: "already submitted" };
    }

    // We don't want zod to validate empty fields here, so trim the data
    const validated = FormModel.deepPartial().safeParse(
      removeEmptyOrNull(data)
    );
    if (!validated.success) {
      return { ...validated };
    } else {
      const submissionData: SurveySubmission = {
        submissionId: submissionId ?? newSubmissionId(),
        status: "saved",
        data: validated.data,
      };
      const allSurveys = await surveyCollection.get("submissions");
      await surveyCollection.set([...allSurveys, submissionData]);
      return { success: true, submissionId: submissionData.submissionId };
    }
  },
  submit: async (data: unknown, submissionId: string): Promise<StoreResult> => {
    const existing = await getSubmission(submissionId);
    if (submissionId && !existing) {
      return { success: false, error: "not found" };
    }
    if (existing && existing.status === "submitted") {
      return { success: false, error: "already submitted" };
    }
    const validated = FormModel.safeParse(data);
    if (!validated.success) {
      return { ...validated };
    } else {
      const submissionData: Submission<FormData> = {
        submissionId: submissionId ?? newSubmissionId(),
        status: "submitted",
        data: validated.data,
      };
      const allSurveys = await surveyCollection.get("submissions");
      await surveyCollection.set([...allSurveys, submissionData]);
      await submissionEvents.publish(submissionData);
      return { success: true, submissionId: submissionData.submissionId };
    }
  },
};
