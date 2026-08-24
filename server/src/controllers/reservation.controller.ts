import { Request, Response } from "express";
import { ReservationService } from "../services/reservation.service";

const reservationService = new ReservationService();

export class ReservationController {
  async createReservation(req: Request, res: Response) {
    try {
      const reservation = await reservationService.createReservation({
        userId: req.user.userId,
        showtimeId: req.body.showtimeId,
        seatIds: req.body.seatIds,
      });

      return res.status(201).json({
        success: true,
        message: "Reservation created successfully",
        data: reservation,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}