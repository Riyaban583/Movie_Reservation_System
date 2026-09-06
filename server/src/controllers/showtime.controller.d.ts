import { Request, Response } from "express";
export declare class ShowtimeController {
    createShowtime(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllShowtimes(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getShowtimesByDate(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateShowtime(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteShowtime(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=showtime.controller.d.ts.map