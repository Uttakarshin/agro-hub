import { Router, type IRouter } from "express";
import { db, userProfilesTable, userSettingsTable, scansTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth, userId, clerkClient } from "../lib/auth";

const router: IRouter = Router();
router.use(requireAuth);

async function getOrCreate(uid: string, email: string) {
  const [existing] = await db.select().from(userProfilesTable).where(eq(userProfilesTable.userId, uid)).limit(1);
  if (existing) return existing;
  const [created] = await db.insert(userProfilesTable).values({ userId: uid }).returning();
  return { ...created, email };
}

async function fetchEmail(uid: string): Promise<string> {
  try {
    const u = await clerkClient.users.getUser(uid);
    const primary = u.emailAddresses.find((e) => e.id === u.primaryEmailAddressId);
    return primary?.emailAddress ?? u.emailAddresses[0]?.emailAddress ?? "";
  } catch {
    return "";
  }
}

router.get("/profile", async (req, res) => {
  const uid = userId(req);
  const email = await fetchEmail(uid);
  const row = await getOrCreate(uid, email);
  res.json({
    id: uid,
    email,
    fullName: row.fullName,
    farmName: row.farmName,
    location: row.location,
    bio: row.bio,
    photoUrl: row.photoUrl,
  });
});

router.put("/profile", async (req, res) => {
  const uid = userId(req);
  const email = await fetchEmail(uid);
  await getOrCreate(uid, email);
  const allowed = ["fullName", "farmName", "location", "bio", "photoUrl"];
  const updates: Record<string, unknown> = {};
  for (const k of allowed) if (k in req.body) updates[k] = req.body[k];
  const [row] = await db.update(userProfilesTable).set(updates).where(eq(userProfilesTable.userId, uid)).returning();
  res.json({
    id: uid,
    email,
    fullName: row.fullName,
    farmName: row.farmName,
    location: row.location,
    bio: row.bio,
    photoUrl: row.photoUrl,
  });
});

router.delete("/profile", async (req, res) => {
  const uid = userId(req);
  await db.delete(scansTable).where(eq(scansTable.userId, uid));
  await db.delete(userSettingsTable).where(eq(userSettingsTable.userId, uid));
  await db.delete(userProfilesTable).where(eq(userProfilesTable.userId, uid));
  try {
    await clerkClient.users.deleteUser(uid);
  } catch (err) {
    req.log?.error({ err }, "clerk user delete failed");
  }
  res.status(204).end();
});

export default router;
