import { Router, type IRouter } from "express";
import { db, userSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth, userId } from "../lib/auth";

const router: IRouter = Router();
router.use(requireAuth);

const DEFAULTS = {
  language: "en",
  theme: "system",
  units: "metric",
  temperatureUnit: "celsius",
  notificationsEnabled: true,
  scanReminders: true,
  weatherAlerts: true,
  marketingEmails: false,
  autoSaveScans: true,
  highAccuracyMode: true,
  offlineMode: false,
};

async function getOrCreate(uid: string) {
  const [existing] = await db.select().from(userSettingsTable).where(eq(userSettingsTable.userId, uid)).limit(1);
  if (existing) return existing;
  const [created] = await db.insert(userSettingsTable).values({ userId: uid, ...DEFAULTS }).returning();
  return created;
}

router.get("/settings", async (req, res) => {
  const row = await getOrCreate(userId(req));
  res.json(row);
});

router.put("/settings", async (req, res) => {
  const uid = userId(req);
  await getOrCreate(uid);
  const allowed = [
    "language", "theme", "units", "temperatureUnit",
    "notificationsEnabled", "scanReminders", "weatherAlerts", "marketingEmails",
    "autoSaveScans", "highAccuracyMode", "offlineMode",
  ];
  const updates: Record<string, unknown> = {};
  for (const k of allowed) if (k in req.body) updates[k] = req.body[k];
  const [row] = await db.update(userSettingsTable).set(updates).where(eq(userSettingsTable.userId, uid)).returning();
  res.json(row);
});

export default router;
