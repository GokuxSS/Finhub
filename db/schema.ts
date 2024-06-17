import { pgTable,text } from "drizzle-orm/pg-core";

export const Account = pgTable("account", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    plaidId:text("plaid_id").notNull(),
    userId: text("user_id").notNull(),
  });