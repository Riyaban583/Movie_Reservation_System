import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

const dashboardService = new DashboardService();

export class DashboardController {
  async getDashboardSummary(req: Request, res: Response) {
    try {
      const summary = await dashboardService.getDashboardSummary();

      return res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}