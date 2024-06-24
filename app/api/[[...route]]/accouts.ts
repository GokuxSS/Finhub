// books.ts
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";

import { createId } from "@paralleldrive/cuid2";

import { accountSchema } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      const response = c.json(
        {
          error: "Unauthorize",
        },
        401
      );
      return response;
    }

    const results = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));
    return c.json({ data: results });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", accountSchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        const response = c.json({ error: "Unauthorize" }, 401);
        throw new HTTPException(401, { res: response });
      }

      const data = c.req.valid("json");
      const insertValues = {
        id: createId(),
        userId: auth.userId,
        ...data,
      };
      const insertedData = await db
        .insert(accounts)
        .values(insertValues)
        .returning();
      return c.json({
        data: insertedData[0],
      });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        const response = c.json({ error: "Unauthorize" }, 401);
        throw new HTTPException(401, { res: response });
      }

      const data = c.req.valid("json");

      const deletedData = await db
        .delete(accounts)
        .where(
          and(eq(accounts.userId, auth.userId), inArray(accounts.id, data.ids))
        )
        .returning({ id: accounts.id });

      console.log('Delete Data',deletedData)

      return c.json({
        data: deletedData,
      });
    }
  );

export default app;
