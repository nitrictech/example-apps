import { api, faas } from "@nitric/sdk";
import { formJsonSchema } from "../forms";
import { formStore } from "../resources";
import { addCors, optionsHandler } from "../resources/middleware";
import { receiptFiles } from "../resources/buckets";

export const formApi = api("forms", {
  middleware: [addCors],
});

formApi.get("/forms", async (ctx) => {
  ctx.res.json(formJsonSchema());
});

formApi.get("/reset", async (ctx) => {
  try {
    await formStore.reset();
  } catch (err) {
    console.error(err);
    ctx.res.status = 500;
    ctx.res.body = "An unexpected error has occurred";
  }
});

formApi.get("/submissions", async (ctx) => {
  try {
    ctx.res.json({
      output: await formStore.getSubmissions(),
    });
  } catch (err) {
    console.error(err);
    ctx.res.status = 500;
    ctx.res.body = "An unexpected error has occurred";
  }
});

formApi.get("/submissions/:email", async (ctx) => {
  const { email } = ctx.req.params;
  try {
    ctx.res.json({
      output: await formStore.getSubmissionsByEmail(email),
    });
  } catch (err) {
    console.error(err);
    ctx.res.status = 500;
    ctx.res.body = "An unexpected error has occurred";
  }
});

const saveHandler = async (ctx: faas.HttpContext) => {
  const { submissionId } = ctx.req.params;
  try {
    const result = await formStore.save(ctx.req.json(), submissionId);
    if (!result.success) {
      ctx.res.status = 400;
      ctx.res.json(result.error);
      return ctx;
    } else {
      ctx.res.json({
        type: "saved",
        submissionId: result.submissionId,
      });
      ctx.res.status = 200;
    }
  } catch (err) {
    console.error(err);
    ctx.res.status = 500;
    ctx.res.body = "An unexpected error has occurred";
  }
};

// Save a form.
formApi.post("/forms/", saveHandler);
formApi.post("/forms/:submissionId", saveHandler);

// Resume a form.
formApi.get("/forms/:submissionId", async (ctx) => {
  const { submissionId } = ctx.req.params;
  try {
    const submission = await formStore.get(submissionId);
    if (!submission) {
      ctx.res.status = 404;
      ctx.res.body = `not found ${submissionId}`;
      return;
    }
    if (submission.status === "submitted") {
      ctx.res.status = 401;
      ctx.res.body = "form already submitted";
      return ctx;
    }
    ctx.res.json(submission.data);
  } catch (err) {
    console.error(err);
    ctx.res.status = 500;
    ctx.res.body = "An unexpected error occurred";
  }
});

const submissionHandler = async (ctx: faas.HttpContext) => {
  const { submissionId } = ctx.req.params;
  try {
    const result = await formStore.submit(ctx.req.json(), submissionId);
    console.log(`Handling submission for ${submissionId}`);
    if (!result.success) {
      ctx.res.status = result.error === "not found" ? 404 : 400;
      ctx.res.json(result.error);
      return ctx;
    } else {
      ctx.res.json({
        type: "submitted",
        submissionId: result.submissionId,
      });
      ctx.res.status = 200;
    }
  } catch (err) {
    console.error(err);
    ctx.res.status = 500;
    ctx.res.body = "An unexpected error has occurred";
  }
};

// Submit a form.
formApi.post("/forms/submit/:submissionId", submissionHandler);
formApi.post("/forms/submit", submissionHandler);

formApi.options("/forms/:submissionId", optionsHandler);
formApi.options("/forms/submit/:submissionId", optionsHandler);
formApi.options("/forms/submit", optionsHandler);
formApi.options("/forms", optionsHandler);
formApi.options("/submissions/:email", optionsHandler);

formApi.get("/receipts/:submissionId", async (ctx) => {
  const { submissionId } = ctx.req.params;
  ctx.res.headers["Location"] = [
    await receiptFiles.file(`receipts/${submissionId}.pdf`).getDownloadUrl(),
  ];
  ctx.res.status = 303;
});
