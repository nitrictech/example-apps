import { api } from "@nitric/sdk";
import { addCors } from "../resources/middleware";
import { receiptFiles } from "../resources/buckets";

export const receiptApi = api("receipts", {
  middleware: [addCors],
});

receiptApi.get("/receipts/:submissionId", async (ctx) => {
  const { submissionId } = ctx.req.params;
  ctx.res.headers["Location"] = [
    await receiptFiles.file(`receipts/${submissionId}.pdf`).getDownloadUrl(),
  ];
  ctx.res.status = 303;
});
