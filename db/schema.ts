import { pgTable,text } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';

export const accounts = pgTable("account", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    plaidId:text("plaid_id"),
    userId: text("user_id").notNull(),
  });

export const accountSchema = createInsertSchema(accounts);
