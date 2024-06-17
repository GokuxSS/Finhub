// books.ts
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { db } from "@/db/drizzle";
import { Account } from "@/db/schema";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    const response = c.json(
      {
        error: "Unauthorize",
      },
      401
    );
    throw new HTTPException(401, { res: response });
  }

  const results = await db.select().from(Account);
  return c.json({ data: results });
});


export default app;
