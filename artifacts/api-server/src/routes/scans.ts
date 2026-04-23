import { Router, type IRouter } from "express";
import { db, scansTable } from "@workspace/db";
import { and, desc, eq } from "drizzle-orm";
import { requireAuth, userId } from "../lib/auth";
import { findCrop } from "../lib/crops";
import { diagnoseLeaf, validateLeafImage } from "../lib/gemini";

const router: IRouter = Router();

router.use(requireAuth);

router.get("/scans", async (req, res) => {
  const uid = userId(req);
  const rows = await db
    .select()
    .from(scansTable)
    .where(eq(scansTable.userId, uid))
    .orderBy(desc(scansTable.createdAt))
    .limit(50);
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

router.get("/scans/:id", async (req, res) => {
  const uid = userId(req);
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(404).json({ error: "not_found" });
  const [row] = await db
    .select()
    .from(scansTable)
    .where(and(eq(scansTable.id, id), eq(scansTable.userId, uid)))
    .limit(1);
  if (!row) return res.status(404).json({ error: "not_found" });
  res.json({
    id: String(row.id),
    cropId: row.cropId,
    cropName: row.cropName,
    imageDataUrl: row.imageDataUrl,
    status: row.status,
    diseaseName: row.diseaseName ?? "",
    confidence: row.confidence ?? 0,
    severity: row.severity ?? "",
    summary: row.summary,
    symptoms: row.symptoms,
    treatment: row.treatment,
    prevention: row.prevention,
    createdAt: row.createdAt.toISOString(),
  });
});

router.delete("/scans/:id", async (req, res) => {
  const uid = userId(req);
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(404).json({ error: "not_found" });
  await db
    .delete(scansTable)
    .where(and(eq(scansTable.id, id), eq(scansTable.userId, uid)));
  res.status(204).end();
});

router.post("/scans", async (req, res) => {
  const uid = userId(req);
  const { cropId, imageDataUrl } = req.body ?? {};
  if (typeof cropId !== "string" || typeof imageDataUrl !== "string") {
    return res.status(400).json({ error: "invalid_input", reason: "Missing cropId or imageDataUrl" });
  }
  const crop = findCrop(cropId);
  if (!crop) return res.status(400).json({ error: "unknown_crop", reason: `Unknown crop: ${cropId}` });
  if (!imageDataUrl.startsWith("data:image/")) {
    return res.status(400).json({ error: "invalid_image", reason: "Image must be a data URL" });
  }

  let validation;
  try {
    validation = await validateLeafImage(imageDataUrl, crop);
  } catch (err) {
    req.log?.error({ err }, "validation failed");
    return res.status(502).json({ error: "ai_error", reason: "Could not analyze the image. Please try again." });
  }

  if (!validation.isLeaf) {
    return res.status(400).json({
      error: "not_a_leaf",
      reason: `This image does not appear to be a crop leaf. Detected: ${validation.detectedSubject}. Please upload a clear photo of a single ${crop.name} leaf.`,
    });
  }
  if (!validation.isCorrectCrop) {
    return res.status(400).json({
      error: "wrong_crop",
      reason: `This leaf does not appear to be from a ${crop.name} plant. Detected: ${validation.detectedSubject}. Please select the correct crop or upload a ${crop.name} leaf.`,
    });
  }

  let diagnosis;
  try {
    diagnosis = await diagnoseLeaf(imageDataUrl, crop);
  } catch (err) {
    req.log?.error({ err }, "diagnosis failed");
    return res.status(502).json({ error: "ai_error", reason: "Could not diagnose the leaf. Please try again." });
  }

  const [row] = await db
    .insert(scansTable)
    .values({
      userId: uid,
      cropId: crop.id,
      cropName: crop.name,
      imageDataUrl,
      status: diagnosis.status,
      diseaseName: diagnosis.diseaseName,
      confidence: diagnosis.confidence,
      severity: diagnosis.severity,
      summary: diagnosis.summary,
      symptoms: diagnosis.symptoms ?? [],
      treatment: diagnosis.treatment ?? [],
      prevention: diagnosis.prevention ?? [],
    })
    .returning();

  res.json({
    id: String(row.id),
    cropId: row.cropId,
    cropName: row.cropName,
    imageDataUrl: row.imageDataUrl,
    status: row.status,
    diseaseName: row.diseaseName ?? "",
    confidence: row.confidence ?? 0,
    severity: row.severity ?? "",
    summary: row.summary,
    symptoms: row.symptoms,
    treatment: row.treatment,
    prevention: row.prevention,
    createdAt: row.createdAt.toISOString(),
  });
});

export default router;
