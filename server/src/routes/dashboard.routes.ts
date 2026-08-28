import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const dashboardController = new DashboardController();

router.get(
  "/summary",
  authenticate,
  authorize("ADMIN"),
  (req, res) => dashboardController.getDashboardSummary(req, res)
);

router.get(
  "/occupancy",
  authenticate,
  authorize("ADMIN"),
  (req, res) => dashboardController.getOccupancySummary(req, res)
);

router.get(
  "/booking-trends",
  authenticate,
  authorize("ADMIN"),
  (req, res) => dashboardController.getBookingTrendSummary(req, res)
);
export default router;