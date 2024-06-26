
import { integer, pgTable,text,timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';
import { z } from "zod";


export const accounts = pgTable("account", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    plaidId:text("plaid_id"),
    userId: text("user_id").notNull(),
  });

export const accountSchema = createInsertSchema(accounts);

export const accountRelations = relations(accounts,({many})=>({
  transactions: many(transactions)
}))


export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  plaidId:text("plaid_id"),
  userId: text("user_id").notNull(),
});

export const categoriesSchema = createInsertSchema(categories);

export const categoriesRelations = relations(categories,({many})=>({
  transactions: many(transactions)
}))

export const transactions = pgTable("transactions",{
  id: text("id").primaryKey(),
  amount: integer("amount").notNull(),
  payee:text("payee").notNull(),
  notes:text("notes"),
  date: timestamp("date",{mode:"date"}).notNull(),
  accountId: text("account_id").references(()=>accounts.id,{
    onDelete:"cascade",
  }).notNull(),
  categoryId: text("category_id").references(()=>categories.id,{
    onDelete:"set null"
  })
})

export const transcationRelation = relations(transactions,({one})=>({
  account: one(accounts,{
    fields:[transactions.accountId],
    references: [accounts.id],
  }),
  categories: one(categories,{
    fields:[transactions.categoryId],
    references:[categories.id]
  })
}))

export const transactionSchema = createInsertSchema(transactions,{
  date: z.coerce.date()
})