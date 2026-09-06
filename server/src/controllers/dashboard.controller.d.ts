import { Request, Response } from "express";
export declare class DashboardController {
    getDashboardSummary(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getOccupancySummary(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getBookingTrendSummary(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getRevenueSummary(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=dashboard.controller.d.ts.map