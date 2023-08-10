import mainApi from "../resources/main.api";

mainApi.get("/hello/:name", async (ctx) => {
    const { name } = ctx.req.params;

    ctx.res.body = `Hello ${name}`;

    return ctx;
});