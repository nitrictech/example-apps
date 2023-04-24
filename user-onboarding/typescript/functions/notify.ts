import { createEmailRequest, sendEmail } from "../common/email";
import { custCreateSub } from "../common/resources";

custCreateSub.subscribe(async (ctx) => { 
  // Send the email notification
  sendEmail(
    createEmailRequest({
      sender: process.env.SENDER_EMAIL as string,
      recipient: [ctx.req.json().value.recipient],
      body: "",
      html: ctx.req.json().value.template,
      subject: ctx.req.json().value.subject,
    })
  );
  return ctx;
});