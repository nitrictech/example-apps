import { HttpMiddleware } from "@nitric/sdk";

export const corsMiddleware: HttpMiddleware = (ctx, next) => {
  ctx.res.headers["Access-Control-Allow-Origin"] = ["*"];
  ctx.res.headers["Access-Control-Allow-Headers"] = [
    "Origin, Content-Type, Accept, Authorization",
  ];
  ctx.res.headers["Access-Control-Allow-Methods"] = ["GET,POST,DELETE,OPTIONS"];

  return next(ctx);
};
