import { Router } from "express";
import { ReservationController } from "../controllers/reservation.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
const reservationController = new ReservationController();

router.post(
  "/",
  authenticate,
  (req, res) => reservationController.createReservation(req, res)
);

export default router;