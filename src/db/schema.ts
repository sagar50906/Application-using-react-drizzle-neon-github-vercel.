import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const thoughtsTable = pgTable("thoughts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
