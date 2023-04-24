import { custApi, custCollection, custCreatePub } from "../common/resources";
import { uuid } from 'uuidv4';

custApi.post("/customers", async (ctx) => { 
    let id = uuid();

    let firstname = ctx.req.json().firstname;
    let lastname = ctx.req.json().lastname;
    let email = ctx.req.json().email;

    // Create the new profile
    await custCollection.doc(id).set({ firstname, lastname, email });

    // Set up email template details
    const welcomeMsg = `Glad you're here developing with us ${firstname}.`;
    const subject = `Welcome to Nitric!`;
  
    const template = `<!DOCTYPE html PUBLIC>
    <html lang="en">
        <title>Welcome to Nitric!</title>
        </head>
        <body>
            Hey ${ firstname }!,<br><br>
            Team Nitric would like to thank you for trying this example.<br>                 
            We’d love to hear what you think of our framework and if there is anything we can improve!<br><br>
            Have a great day!<br>
            The Nitric Team.</p>
        </body>
    </html>`;

    // Publish the event 
    await custCreatePub.publish({
        payload: {
          value: {
            id: uuid(),
            recipient: email,
            subject: subject,
            template: template,
            message: welcomeMsg,
            data: {
              firstname: firstname,
            },
          },
        },
    });   

    // Return the id
    ctx.res.json({
        msg: `Customer with id ${id} created.`,
    });
});    

 