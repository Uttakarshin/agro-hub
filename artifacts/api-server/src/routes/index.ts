import { Router, type IRouter } from "express";
import healthRouter from "./health";
import cropsRouter from "./crops";
import scansRouter from "./scans";
import dashboardRouter from "./dashboard";
import settingsRouter from "./settings";
import profileRouter from "./profile";

const router: IRouter = Router();

router.use(healthRouter);
router.use(cropsRouter);
router.use(scansRouter);
router.use(dashboardRouter);
router.use(settingsRouter);
router.use(profileRouter);

export default router;
