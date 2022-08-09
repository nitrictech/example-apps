import { api } from "@nitric/sdk";

// Create a secure api
const animalsApi = api("main");

// Create and expose a GET method on our api
animalsApi.get("/hello/:animal", async (ctx) => {
  const { animal } = ctx.req.params;
  try {
    // Dynamically load the module
    const handler = await require(`../animals/${animal}/greeting`);
    ctx.res.json({
      message: `${handler.sayHello()}`,
    });
  } catch (error) {
    ctx.res.json({
      message: `No module found for animal with name ${animal}`,
    });
    ctx.res.status = 501;
  }
});
