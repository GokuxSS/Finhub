import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accouts";
import categories from "./categories";
import { HTTPException } from "hono/http-exception";

export const runtime = "edge";
const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse();
  }
  return c.json(
    {
      error: "Internal Error",
    },
    500
  );
});

const routes = app.route("/accounts", accounts).route("/categories",categories);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
