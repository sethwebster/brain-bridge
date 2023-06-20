import { Router } from "express";
import training from "./training/training.route.ts";

const router: Router = Router();
router.use("/train", training);
// router.use("/projects", projects);

export default router;
