import mainApi from "../resources/main.api";

mainApi.get("/goodbye/:name", async (ctx) => {
    const { name } = ctx.req.params;

    ctx.res.body = `Goodbye ${name}`;

    return ctx;
});