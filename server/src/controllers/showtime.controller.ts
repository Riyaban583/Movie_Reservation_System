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

  async getAllShowtimes(req: Request, res: Response) {
  try {
    const showtimes = await showtimeService.getAllShowtimes();

    return res.status(200).json({
      success: true,
      count: showtimes.length,
      data: showtimes,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async getShowtimesByDate(req: Request, res: Response) {
  try {
    const date = new Date(req.query.date as string);

    if (isNaN(date.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    const showtimes = await showtimeService.getShowtimesByDate(date);

    return res.status(200).json({
      success: true,
      count: showtimes.length,
      data: showtimes,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async updateShowtime(req: Request, res: Response) {
  try {
    const showtime = await showtimeService.updateShowtime(
      req.params.id,
      {
        movieId: req.body.movieId,
        screenId: req.body.screenId,
        startTime: req.body.startTime
          ? new Date(req.body.startTime)
          : undefined,
        endTime: req.body.endTime
          ? new Date(req.body.endTime)
          : undefined,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Showtime updated successfully",
      data: showtime,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async deleteShowtime(req: Request, res: Response) {
  try {
    const showtime = await showtimeService.deleteShowtime(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Showtime deleted successfully",
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