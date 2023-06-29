import { faas } from "@nitric/sdk";

// Add cors headers to responses
export const addCors: faas.HttpMiddleware = async (ctx, next) => {
  ctx.res.headers["Access-Control-Allow-Origin"] = ["*"];
  ctx.res.headers["Access-Control-Max-Age"] = ["7200"];
  ctx.res.headers["Access-Control-Allow-Headers"] = [
    "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  ];
  ctx.res.headers["Access-Control-Allow-Methods"] = [
    "GET,PUT,POST,PATCH,DELETE,OPTIONS",
  ];

  return next ? next(ctx) : ctx;
};

// Handle options/preflight requests
export const optionsHandler: faas.HttpMiddleware = async (ctx, next) => {
  if (ctx.req.method == "OPTIONS") {
    ctx.res.headers["Content-Type"] = ["text/html; charset=ascii"];
    ctx.res.body = "OK";
    ctx.res.status = 204;
    return ctx;
  }
  return next ? next(ctx) : ctx;
};
