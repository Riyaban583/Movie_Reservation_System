import { Request, Response } from "express";
import { ScreenService } from "../services/screen.service";

const screenService = new ScreenService();

export class ScreenController {
  async createScreen(req: Request, res: Response) {
    try {
      const screen = await screenService.createScreen({
        name: req.body.name,
        theaterId: req.body.theaterId,
      });

      return res.status(201).json({
        success: true,
        message: "Screen created successfully",
        data: screen,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async generateSeats(req: Request, res: Response) {
    try {
      const result = await screenService.generateSeats(
        req.params.screenId,
        Number(req.body.rows),
        Number(req.body.seatsPerRow)
      );

      return res.status(201).json({
        success: true,
        message: "Seats generated successfully",
        data: result,
      });
    } catch (error: any) {
      const errorCode = error?.code;
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (
        errorCode === "P2002" ||
        errorMessage.includes("Unique constraint failed")
      ) {
        return res.status(409).json({
          success: false,
          message: "Seat already exists for this screen",
        });
      }

      return res.status(500).json({
        success: false,
        message: errorMessage || "Failed to generate seats",
      });
    }
  }

  async getSeatsByScreen(req: Request, res: Response) {
    try {
      const seats = await screenService.getSeatsByScreen(
        req.params.screenId
      );

      return res.status(200).json({
        success: true,
        count: seats.length,
        data: seats,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getSeatAvailabilityByShowtime(req: Request, res: Response) {
  try {
    const seats = await screenService.getSeatAvailabilityByShowtime(
      req.params.showtimeId
    );

    return res.status(200).json({
      success: true,
      count: seats.length,
      data: seats,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
}



