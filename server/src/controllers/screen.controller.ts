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
}