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

  async getOccupancySummary(req: Request, res: Response) {
  try {
    const occupancy = await dashboardService.getOccupancySummary();

    return res.status(200).json({
      success: true,
      data: occupancy,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async getBookingTrendSummary(req: Request, res: Response) {
  try {
    const trend = await dashboardService.getBookingTrendSummary();

    return res.status(200).json({
      success: true,
      data: trend,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async getRevenueSummary(req: Request, res: Response) {
  try {
    const revenue = await dashboardService.getRevenueSummary();

    return res.status(200).json({
      success: true,
      data: revenue,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
}