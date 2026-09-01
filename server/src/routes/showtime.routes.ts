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

/**
 * @swagger
 * /api/showtimes:
 *   get:
 *     summary: Get all showtimes
 *     tags:
 *       - Showtimes
 *     responses:
 *       200:
 *         description: Successfully fetched all showtimes
 *       500:
 *         description: Internal server error
 */

router.get(
  "/",
  (req, res) => showtimeController.getAllShowtimes(req, res)
);

router.get(
  "/date",
  (req, res) => showtimeController.getShowtimesByDate(req, res)
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  (req, res) => showtimeController.updateShowtime(req, res)
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  (req, res) => showtimeController.deleteShowtime(req, res)
);

export default router;