import { Router, type IRouter } from "express";
import { db, scansTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { requireAuth, userId } from "../lib/auth";
import { generateDailyTips } from "../lib/gemini";
import { CROPS } from "../lib/crops";

const router: IRouter = Router();
router.use(requireAuth);

router.get("/dashboard/summary", async (req, res) => {
  const uid = userId(req);
  const rows = await db.select().from(scansTable).where(eq(scansTable.userId, uid));
  const total = rows.length;
  const healthy = rows.filter((r) => r.status === "healthy").length;
  const diseased = rows.filter((r) => r.status === "diseased").length;
  const healthScore = total === 0 ? 100 : Math.round((healthy / total) * 100);

  const breakdown: Record<string, number> = {};
  for (const r of rows) {
    if (r.status === "diseased" && r.diseaseName) {
      breakdown[r.diseaseName] = (breakdown[r.diseaseName] ?? 0) + 1;
    }
  }
  const diseaseBreakdown = Object.entries(breakdown).map(([name, count]) => ({ name, count }));

  const now = Date.now();
  const weeklyTrend: { day: string; scans: number; healthy: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const dayStart = new Date(now - i * 86400000);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart.getTime() + 86400000);
    const dayScans = rows.filter((r) => r.createdAt >= dayStart && r.createdAt < dayEnd);
    weeklyTrend.push({
      day: dayStart.toLocaleDateString("en-US", { weekday: "short" }),
      scans: dayScans.length,
      healthy: dayScans.filter((r) => r.status === "healthy").length,
    });
  }

  res.json({ totalScans: total, healthyCount: healthy, diseasedCount: diseased, healthScore, diseaseBreakdown, weeklyTrend });
});

router.get("/dashboard/recent", async (req, res) => {
  const uid = userId(req);
  const rows = await db
    .select()
    .from(scansTable)
    .where(eq(scansTable.userId, uid))
    .orderBy(desc(scansTable.createdAt))
    .limit(6);
  res.json(
    rows.map((r) => ({
      id: String(r.id),
      cropId: r.cropId,
      cropName: r.cropName,
      status: r.status,
      diseaseName: r.diseaseName ?? "",
      confidence: r.confidence ?? 0,
      severity: r.severity ?? "",
      summary: r.summary,
      createdAt: r.createdAt.toISOString(),
    })),
  );
});

let tipsCache: { ts: number; data: { id: string; title: string; body: string; category: string }[] } | null = null;
router.get("/dashboard/tips", async (_req, res) => {
  if (tipsCache && Date.now() - tipsCache.ts < 6 * 60 * 60 * 1000) {
    return res.json(tipsCache.data);
  }
  const cropNames = CROPS.slice(0, 5).map((c) => c.name);
  const data = await generateDailyTips(cropNames);
  if (data.length > 0) tipsCache = { ts: Date.now(), data };
  res.json(data);
});

export default router;
