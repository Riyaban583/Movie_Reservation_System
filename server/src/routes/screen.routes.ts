import { Router } from "express";
import { ScreenController } from "../controllers/screen.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const screenController = new ScreenController();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  (req, res) => screenController.createScreen(req, res)
);

router.post(
  "/:screenId/seats",
  authenticate,
  authorize("ADMIN"),
  (req, res) => screenController.generateSeats(req, res)
);

export default router;