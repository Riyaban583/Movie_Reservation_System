import { Request, Response } from "express";
export declare class ScreenController {
    createScreen(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    generateSeats(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getSeatsByScreen(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllScreens(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getSeatAvailabilityByShowtime(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=screen.controller.d.ts.map