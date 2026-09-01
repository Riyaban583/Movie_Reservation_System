import { Router } from "express";
import { ReservationController } from "../controllers/reservation.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const reservationController = new ReservationController();

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a reservation
 *     tags:
 *       - Reservations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - showtimeId
 *               - seatIds
 *             properties:
 *               showtimeId:
 *                 type: string
 *                 example: cmtbujk6z0001cdb0az1nztyk
 *               seatIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - cmt2lqafq0002cd8chfs29mjx
 *                   - cmt2lqafq0003cd8ckvfllj2r
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Internal server error
 */

router.post(
  "/",
  authenticate,
  (req, res) => reservationController.createReservation(req, res)
);

router.get(
  "/my",
  authenticate,
  (req, res) => reservationController.getUserReservations(req, res)
);

router.patch(
  "/:id/cancel",
  authenticate,
  (req, res) => reservationController.cancelReservation(req, res)
);

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => reservationController.getAllReservations(req, res)
);

export default router;