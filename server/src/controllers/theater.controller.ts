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

  async getAllTheaters(req: Request, res: Response) {
  try {
    const theaters = await theaterService.getAllTheaters();

    return res.status(200).json({
      success: true,
      count: theaters.length,
      data: theaters,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async getTheaterById(req: Request, res: Response) {
  try {
    const theater = await theaterService.getTheaterById(req.params.id);

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: "Theater not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: theater,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async updateTheater(req: Request, res: Response) {
  try {
    const theater = await theaterService.updateTheater(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Theater updated successfully",
      data: theater,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async deleteTheater(req: Request, res: Response) {
  try {
    const theater = await theaterService.deleteTheater(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Theater deleted successfully",
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