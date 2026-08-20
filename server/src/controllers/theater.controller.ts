import { Request, Response } from "express";
import { TheaterService } from "../services/theater.service";
import { createTheaterSchema } from "../validations/theater.validation";

const theaterService = new TheaterService();

export class TheaterController {
  async createTheater(req: Request, res: Response) {
    try {
      const data = createTheaterSchema.parse(req.body);

      const theater = await theaterService.createTheater(data);

      return res.status(201).json({
        success: true,
        message: "Theater created successfully",
        data: theater,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}