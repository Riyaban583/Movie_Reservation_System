import { Request, Response } from "express";
import { ShowtimeService } from "../services/showtime.service";
import { createShowtimeSchema } from "../validations/showtime.validation";

const showtimeService = new ShowtimeService();

export class ShowtimeController {
  async createShowtime(req: Request, res: Response) {
    try {
      const data = createShowtimeSchema.parse(req.body);

      const showtime = await showtimeService.createShowtime({
        movieId: data.movieId,
        screenId: data.screenId,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      });

      return res.status(201).json({
        success: true,
        message: "Showtime created successfully",
        data: showtime,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}