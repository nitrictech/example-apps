import { collection } from "@nitric/sdk";
import { v4 as uuid } from "uuid";
import { FormData, FormDataPartial, FormModel, Submission } from "../forms";
import { submissionTopic } from "./topics";

const submissionEvents = submissionTopic.for("publishing");
type FormSubission = Submission<FormDataPartial>;

const newSubmissionId = (): string => {
  return uuid().split("-")[0];
};

const submissionCollection = collection<FormSubission>("submissions").for(
  "writing",
  "reading",
  "deleting"
);

type StoreResult =
  | { success: true; submissionId: string }
  | { success: false; error: any };

type FindResult =
  | { found: false; reason: "not found" | "already submitted" }
  | { found: true; txn: FormSubission };

const getSubmission = async (
  submissionId?: string
): Promise<FormSubission | undefined> => {
  if (!submissionId) {
    return;
  }
  try {
    return await submissionCollection.doc(submissionId).get();
  } catch (err) {
    return;
  }
};

// TODO: Remove me - this is a convenience method for development...
const getAllSubmissions = async () => {
  try {
    const submissionQuery = submissionCollection.query();
    return await submissionQuery.fetch();
  } catch (err) {
    return;
  }
};

// TODO: Remove me - this is a convenience method for development...
const deleteAllSubmissions = async () => {
  try {
    const submissionQuery = submissionCollection.query();
    const results = await submissionQuery.fetch();

    for (const a of results.documents) {
      await submissionCollection.doc(a.id).delete();
    }
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
    const submissionQuery = submissionCollection.query();
    const results = await submissionQuery.fetch();

    const collectedData = results.documents
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

export const formStore = {
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
      return { success: false, error: { ...validated } };
    } else {
      const submissionData: FormSubission = {
        submissionId: submissionId ?? newSubmissionId(),
        status: "saved",
        data: validated.data,
      };
      await submissionCollection
        .doc(submissionData.submissionId)
        .set(submissionData);
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
      return { success: false, error: { ...validated } };
    } else {
      const submissionData: Submission<FormData> = {
        submissionId: submissionId ?? newSubmissionId(),
        status: "submitted",
        data: validated.data,
      };
      await submissionCollection
        .doc(submissionData.submissionId)
        .set(submissionData);
      await submissionEvents.publish(submissionData);
      return { success: true, submissionId: submissionData.submissionId };
    }
  },
};
