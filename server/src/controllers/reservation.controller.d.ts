import { Request, Response } from "express";
export declare class ReservationController {
    createReservation(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserReservations(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    cancelReservation(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllReservations(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=reservation.controller.d.ts.map