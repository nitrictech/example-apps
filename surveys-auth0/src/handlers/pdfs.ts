import { buildReceipt } from "../forms/form/receipt";
import { submissionTopic } from "../resources";
import { receiptFiles } from "../resources/buckets";

submissionTopic.subscribe(async (ctx) => {
  const submission = ctx.req.json().payload;

  const path = `receipts/${submission.submissionId}.pdf`;

  const pdfContent = await buildReceipt(submission.data);
  await receiptFiles.file(path).write(pdfContent);

  console.log(`PDF receipt written to ${path}`);
});
