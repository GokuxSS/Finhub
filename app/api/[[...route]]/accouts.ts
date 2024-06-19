// books.ts
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { zValidator } from '@hono/zod-validator'

import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";

import { createId } from '@paralleldrive/cuid2';

import { accountSchema } from '@/db/schema';

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

  const results = await db.select().from(accounts);
  return c.json({ data: results });
}).post("/",clerkMiddleware(),zValidator('json',accountSchema.pick({name:true})) ,async (c)=>{
  const auth = getAuth(c);

  if (!auth?.userId) {
    const response = c.json({error: "Unauthorize"},401);
    throw new HTTPException(401, { res: response });
  }

  const data = c.req.valid('json');
  const insertValues  = {
    id: createId(),
    userId: auth.userId,
    ...data,
  };
  const insertedData = await db.insert(accounts).values(insertValues).returning();
  return c.json({
    data:insertedData[0]
  })

});


export default app;
