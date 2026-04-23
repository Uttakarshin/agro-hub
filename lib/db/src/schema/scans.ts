import { pgTable, serial, text, integer, real, timestamp, jsonb } from "drizzle-orm/pg-core";

export const scansTable = pgTable("scans", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  cropId: text("crop_id").notNull(),
  cropName: text("crop_name").notNull(),
  imageDataUrl: text("image_data_url").notNull(),
  status: text("status").notNull(),
  diseaseName: text("disease_name"),
  confidence: real("confidence"),
  severity: text("severity"),
  summary: text("summary").notNull(),
  symptoms: jsonb("symptoms").$type<string[]>().notNull().default([]),
  treatment: jsonb("treatment").$type<string[]>().notNull().default([]),
  prevention: jsonb("prevention").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Scan = typeof scansTable.$inferSelect;
export type InsertScan = typeof scansTable.$inferInsert;
