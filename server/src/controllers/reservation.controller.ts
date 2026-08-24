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

  async getUserReservations(req: Request, res: Response) {
  try {
    const reservations = await reservationService.getUserReservations(
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async cancelReservation(req: Request, res: Response) {
  try {
    const reservation = await reservationService.cancelReservation(
      req.params.id,
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      message: "Reservation cancelled successfully",
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