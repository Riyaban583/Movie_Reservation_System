import { Router } from "express";
import { ShowtimeController } from "../controllers/showtime.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const showtimeController = new ShowtimeController();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  (req, res) => showtimeController.createShowtime(req, res)
);

router.get(
  "/",
  (req, res) => showtimeController.getAllShowtimes(req, res)
);

router.get(
  "/date",
  (req, res) => showtimeController.getShowtimesByDate(req, res)
);

export default router;