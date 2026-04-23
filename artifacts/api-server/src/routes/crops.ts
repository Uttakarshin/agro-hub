import { Router, type IRouter } from "express";
import { CROPS } from "../lib/crops";

const router: IRouter = Router();

router.get("/crops", (_req, res) => {
  res.json(
    CROPS.map((c) => ({
      id: c.id,
      name: c.name,
      scientificName: c.scientificName,
      emoji: c.emoji,
      description: c.description,
      commonDiseases: c.commonDiseases,
    })),
  );
});

export default router;
