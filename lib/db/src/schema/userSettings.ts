import { pgTable, text, boolean } from "drizzle-orm/pg-core";

export const userSettingsTable = pgTable("user_settings", {
  userId: text("user_id").primaryKey(),
  language: text("language").notNull().default("en"),
  theme: text("theme").notNull().default("system"),
  units: text("units").notNull().default("metric"),
  temperatureUnit: text("temperature_unit").notNull().default("celsius"),
  notificationsEnabled: boolean("notifications_enabled").notNull().default(true),
  scanReminders: boolean("scan_reminders").notNull().default(true),
  weatherAlerts: boolean("weather_alerts").notNull().default(true),
  marketingEmails: boolean("marketing_emails").notNull().default(false),
  autoSaveScans: boolean("auto_save_scans").notNull().default(true),
  highAccuracyMode: boolean("high_accuracy_mode").notNull().default(true),
  offlineMode: boolean("offline_mode").notNull().default(false),
});

export type UserSettings = typeof userSettingsTable.$inferSelect;
export type InsertUserSettings = typeof userSettingsTable.$inferInsert;
