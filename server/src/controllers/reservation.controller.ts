import { Request, Response } from "express";
import { ReservationService } from "../services/reservation.service";
import { createReservationSchema } from "../utils/validations/reservation.validation";

const reservationService = new ReservationService();

export class ReservationController {
  async createReservation(req: Request, res: Response) {
    try {
      const validatedData = createReservationSchema.parse(req.body);

const reservation = await reservationService.createReservation({
  userId: req.user.userId,
  showtimeId: validatedData.showtimeId,
  seatIds: validatedData.seatIds,
});

      return res.status(201).json({
        success: true,
        message: "Reservation created successfully",
        data: reservation,
      });
    } catch (error: any) {
  if (error?.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues,
    });
  }

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

async getAllReservations(req: Request, res: Response) {
  try {
    const reservations = await reservationService.getAllReservations();

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
}